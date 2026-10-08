#!/usr/bin/env node
// Refreshes src/data/github-stats.json, the numbers behind the home page's
// stats band, from GitHub. It reads every account through your gh CLI
// login and writes totals only (no repository names), so private work
// stays private.
//
// Usage: npm run stats:github [-- account ...]
// Each account must be logged in to gh (`gh auth login`). Commit the
// updated JSON to publish the new numbers.

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const ACCOUNTS = process.argv.length > 2
  ? process.argv.slice(2)
  : ["akosiArvin081596", "abedubas-alchemydev"];
const OUT = new URL("../src/data/github-stats.json", import.meta.url);
const DAY = 24 * 60 * 60 * 1000;

// Run the gh binary (not a shell wrapper) so GH_TOKEN picks the account.
const gh = (token, args) =>
  execFileSync("gh", args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, GH_TOKEN: token },
  });

const now = new Date();
const repos = new Map();
const bytes = {};
let since = null;

for (const account of ACCOUNTS) {
  const token = execFileSync("gh", ["auth", "token", "--user", account], {
    encoding: "utf8",
  }).trim();
  const user = JSON.parse(gh(token, ["api", "user"]));
  if (user.login !== account) {
    throw new Error(`gh's token for ${account} signs in as ${user.login}`);
  }
  if (!since || user.created_at < since) since = user.created_at;

  const pages = JSON.parse(
    gh(token, [
      "api",
      "--paginate",
      "--slurp",
      "/user/repos?per_page=100&affiliation=owner,collaborator,organization_member",
    ]),
  );
  for (const repo of pages.flat()) {
    // Forks aren't his work, and a repo two accounts share counts once.
    if (repo.fork || repos.has(repo.full_name)) continue;
    repos.set(repo.full_name, {
      private: repo.private,
      pushedAt: repo.pushed_at,
    });
    const languages = JSON.parse(
      gh(token, ["api", `/repos/${repo.full_name}/languages`]),
    );
    for (const [language, size] of Object.entries(languages)) {
      bytes[language] = (bytes[language] ?? 0) + size;
    }
  }
}

const all = [...repos.values()];
const languages = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
const totalBytes = languages.reduce((sum, [, size]) => sum + size, 0);

const stats = {
  generatedAt: now.toISOString().slice(0, 10),
  accounts: ACCOUNTS.length,
  // The oldest account's creation date
  since: since.slice(0, 10),
  years: Math.floor((now - new Date(since)) / (365.25 * DAY)),
  repos: {
    total: all.length,
    public: all.filter((repo) => !repo.private).length,
    private: all.filter((repo) => repo.private).length,
  },
  // Pushed to within the past year
  active: all.filter((repo) => now - new Date(repo.pushedAt) <= 365 * DAY)
    .length,
  languages: {
    count: languages.length,
    top: languages.slice(0, 5).map(([name, size]) => ({
      name,
      share: Math.round((1000 * size) / totalBytes) / 10,
    })),
  },
};

writeFileSync(OUT, `${JSON.stringify(stats, null, 2)}\n`);
console.log(
  `github-stats: ${stats.repos.total} repos (${stats.active} active), ` +
    `${stats.languages.count} languages, on GitHub since ${stats.since}; ` +
    `wrote src/data/github-stats.json`,
);
