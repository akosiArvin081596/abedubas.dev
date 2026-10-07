#!/usr/bin/env bash
#
# Deploys abedubas.dev on the VPS. The CI/CD workflow (.github/workflows/ci-cd.yml)
# runs it on every push to main; root can also run it by hand.
#
# It clones a commit of main beside the live copy and runs `npm ci` and
# `npm run build` there. It smoke-tests the result with `next start` on a spare
# port, swaps it in, and restarts only the abedubas.dev pm2 app. If the
# restarted app doesn't answer, it swaps the old release back. The release it
# replaced stays in /var/www/abedubas.dev.rollback until the next deploy.
#
#   deploy-abedubas-dev.sh          deploy the tip of main
#   deploy-abedubas-dev.sh <sha>    deploy, or roll back to, a commit on main
#
# CI connects with a key that /root/.ssh/authorized_keys pins to this script,
# so the key can run nothing else:
#
#   restrict,command="/usr/local/bin/deploy-abedubas-dev.sh" ssh-ed25519 AAAA... github-actions-deploy@abedubas.dev
#
# The commit to deploy arrives as the SSH command line, in SSH_ORIGINAL_COMMAND.
#
# The VPS runs its own copy at /usr/local/bin/deploy-abedubas-dev.sh. Editing
# this file changes nothing there until it is reinstalled (see the README).

set -euo pipefail

readonly REPO_URL=https://github.com/akosiArvin081596/abedubas.dev.git
readonly BRANCH=main
readonly APP=abedubas.dev # the pm2 app
readonly LIVE_DIR=/var/www/abedubas.dev
readonly NEW_DIR=/var/www/abedubas.dev.new
readonly ROLLBACK_DIR=/var/www/abedubas.dev.rollback
readonly FAILED_DIR=/var/www/abedubas.dev.failed
readonly PORT=3002 # nginx proxies abedubas.dev here
readonly SMOKE_PORT=3402
readonly LOG_DIR=/var/log/deploy-abedubas-dev
readonly LOCK_FILE=/run/lock/deploy-abedubas-dev.lock
readonly KEEP_LOGS=30

export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export HOME=/root # so pm2 talks to root's daemon, which runs the site
export NEXT_TELEMETRY_DISABLED=1

smoke_pid=

log() { printf '[%(%Y-%m-%d %H:%M:%S)T] %s\n' -1 "$*"; }
die() { log "ERROR: $*"; exit 1; }

main() {
  (( EUID == 0 )) || die "run this as root"
  if [[ ${1-} == --locked ]]; then
    deploy "$2"
  else
    start_deploy "${SSH_ORIGINAL_COMMAND-${1-}}"
  fi
}

# Validates the request, runs the deploy detached, and streams its log back.
start_deploy() {
  local request=$1 sha
  if [[ -z $request ]]; then
    sha=$(git ls-remote --exit-code "$REPO_URL" "refs/heads/$BRANCH") ||
      die "couldn't look up $BRANCH on GitHub"
    sha=${sha%%[[:space:]]*}
  elif [[ $request =~ ^[0-9a-f]{40}$ ]]; then
    sha=$request
  else
    echo "usage: ${0##*/} [<full 40-character sha of a commit on $BRANCH>]" >&2
    exit 2
  fi

  mkdir -p "$LOG_DIR"
  prune_logs
  local log_file
  printf -v log_file '%s/%(%Y%m%d-%H%M%S)T-%s.log' "$LOG_DIR" -1 "${sha:0:7}"
  : >>"$log_file"

  if ! flock -n "$LOCK_FILE" true; then
    log "another deploy is running; this one starts when it finishes"
  fi

  # The deploy gets its own session and writes only to the log file. That way a
  # dropped SSH connection or a cancelled CI job can't kill it halfway through
  # the swap. flock -o keeps the lock fd out of everything the deploy starts.
  setsid -w flock -o -w 1800 -E 75 "$LOCK_FILE" "$0" --locked "$sha" \
    </dev/null >>"$log_file" 2>&1 &
  local pid=$!
  follow "$log_file" "$pid"

  local status=0
  wait "$pid" || status=$?
  (( status != 75 )) || log "ERROR: gave up after waiting 30 minutes for the other deploy"
  return "$status"
}

# Prints the log as it grows, until process $2 exits.
follow() {
  local file=$1 pid=$2 line running=1
  exec 3<"$file"
  while (( running )); do
    kill -0 "$pid" 2>/dev/null || running=0
    while IFS= read -r line <&3; do printf '%s\n' "$line"; done
    [[ -z $line ]] || printf '%s' "$line" # a line still being written
    (( ! running )) || sleep 1
  done
  exec 3<&-
}

# Keeps the newest $KEEP_LOGS logs. Their names start with a timestamp, so the
# glob lists them oldest first.
prune_logs() {
  local logs=("$LOG_DIR"/*.log)
  local excess=$(( ${#logs[@]} - KEEP_LOGS ))
  (( excess <= 0 )) || rm -f -- "${logs[@]:0:excess}"
}

deploy() {
  local sha=$1
  trap on_exit EXIT
  trap 'exit 143' TERM INT HUP
  cd /
  log "deploying $sha with node $(node -v), npm $(npm -v)"

  rm -rf "$NEW_DIR" "$FAILED_DIR"
  git clone --quiet --single-branch --branch "$BRANCH" --no-tags "$REPO_URL" "$NEW_DIR"
  git -C "$NEW_DIR" merge-base --is-ancestor "$sha" HEAD 2>/dev/null ||
    die "$sha isn't a commit on $BRANCH"
  git -C "$NEW_DIR" reset --quiet --hard "$sha"
  log "checked out $(git -C "$NEW_DIR" log -1 --format='%h %s')"

  # Low priority and a capped heap: the VPS is small and shared with other apps.
  log "installing dependencies"
  (cd "$NEW_DIR" && timeout 900 nice -n 10 npm ci --no-audit --no-fund)
  log "building"
  (cd "$NEW_DIR" && NODE_OPTIONS=--max-old-space-size=1536 timeout 1200 nice -n 10 npm run build)

  smoke_test

  log "swapping the new release in"
  rm -rf "$ROLLBACK_DIR"
  mv -T "$LIVE_DIR" "$ROLLBACK_DIR"
  mv -T "$NEW_DIR" "$LIVE_DIR"
  restart_app
  if wait_healthy "$PORT" 90; then
    log "deployed $(git -C "$LIVE_DIR" log -1 --format='%h %s')"
  else
    roll_back
  fi
}

smoke_test() {
  if port_in_use "$SMOKE_PORT"; then
    die "port $SMOKE_PORT is already in use, so the new release can't be smoke-tested"
  fi
  log "smoke-testing the new release on 127.0.0.1:$SMOKE_PORT"
  # In its own process group, so stopping it can't leave a child behind.
  (cd "$NEW_DIR" && exec setsid node_modules/.bin/next start -p "$SMOKE_PORT" -H 127.0.0.1) &
  smoke_pid=$!
  wait_healthy "$SMOKE_PORT" 60 || die "the new release didn't answer on port $SMOKE_PORT"
  kill -0 "$smoke_pid" 2>/dev/null || die "something else answered on port $SMOKE_PORT"
  stop_smoke_server
  log "smoke test passed"
}

stop_smoke_server() {
  [[ -n $smoke_pid ]] || return 0
  kill -TERM -- "-$smoke_pid" 2>/dev/null || true
  local i
  for (( i = 0; i < 20; i++ )); do
    kill -0 "$smoke_pid" 2>/dev/null || break
    sleep 0.5
  done
  kill -KILL -- "-$smoke_pid" 2>/dev/null || true
  wait "$smoke_pid" 2>/dev/null || true
  smoke_pid=
}

restart_app() {
  # pm2 prints a table of every app on the VPS, and the CI log is public.
  pm2 restart "$APP" >/dev/null
  log "restarted pm2 app $APP"
}

roll_back() {
  log "the new release isn't answering on port $PORT; rolling back"
  mv -T "$LIVE_DIR" "$FAILED_DIR"
  mv -T "$ROLLBACK_DIR" "$LIVE_DIR"
  restart_app
  if wait_healthy "$PORT" 90; then
    log "rolled back to $(git -C "$LIVE_DIR" log -1 --format='%h %s'); the failed release is in $FAILED_DIR until the next deploy"
  else
    log "ERROR: the previous release isn't answering either; check pm2 logs $APP"
  fi
  exit 1
}

# shellcheck disable=SC2317 # only called by the EXIT trap
on_exit() {
  local status=$?
  stop_smoke_server
  # Stopped between the two moves of a swap: put the previous release back.
  if [[ ! -e $LIVE_DIR && -d $ROLLBACK_DIR ]]; then
    mv -T "$ROLLBACK_DIR" "$LIVE_DIR"
    log "put the previous release back in $LIVE_DIR"
  fi
  rm -rf "$NEW_DIR" # a release that never went live
  (( status == 0 )) || log "deploy failed"
}

# Succeeds once http://127.0.0.1:$1/ answers with a 2xx, or fails after $2 seconds.
wait_healthy() {
  local port=$1 deadline=$(( SECONDS + $2 ))
  until curl -fs -o /dev/null --max-time 5 "http://127.0.0.1:$port/"; do
    (( SECONDS < deadline )) || return 1
    sleep 2
  done
}

port_in_use() { (exec 3<>"/dev/tcp/127.0.0.1/$1") 2>/dev/null; }

main "$@"; exit
