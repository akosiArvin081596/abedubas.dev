"use client";

import Link from "next/link";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useTheme } from "@/components/ThemeProvider";

// Pages a command can open, by name.
const PAGES = {
  about: "/about",
  projects: "/projects",
  skills: "/skills",
  blog: "/blog",
  contact: "/contact",
} as const;
type Page = keyof typeof PAGES;

const isPage = (name: string): name is Page => Object.hasOwn(PAGES, name);

// A path as a page or file name: "~/projects/" → "projects".
const nameOf = (path: string) =>
  path.replace(/^~?\/*/, "").replace(/\/+$/, "").toLowerCase();

const FILES = ["about.md", "engineer.ts", "role.txt"] as const;
type File = (typeof FILES)[number];

const isFile = (name: string): name is File =>
  (FILES as readonly string[]).includes(name);

const HELP: [command: string, what: string][] = [
  ["about", "who I am and how I work"],
  ["projects", "things I've built"],
  ["skills", "the full stack, in detail"],
  ["blog", "notes and write-ups"],
  ["contact", "start a conversation"],
  ["ls, cat <file>", "look around (try cat engineer.ts)"],
  ["ai --pair", "my AI coding peers"],
  ["date", "my local time"],
  ["theme", "switch between light and dark"],
  ["clear", "clear the screen"],
];

// What Tab completes, in order of preference.
const COMPLETIONS = [
  "help",
  "about",
  "projects",
  "skills",
  "blog",
  "contact",
  "ls",
  "ls links/",
  "cat engineer.ts",
  "cat about.md",
  "cat role.txt",
  "ai --pair",
  "date",
  "theme",
  "clear",
  "whoami",
  "pwd",
  "echo",
];

const commonPrefix = (words: string[]) =>
  words.reduce((prefix, word) => {
    let k = 0;
    while (k < prefix.length && prefix[k] === word[k]) k++;
    return prefix.slice(0, k);
  });

const dateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  year: "numeric",
  hourCycle: "h23",
});

// `date`, in Philippine time, the way the command prints it.
function philippineDate() {
  const parts = Object.fromEntries(
    dateFormat.formatToParts(new Date()).map((part) => [part.type, part.value]),
  );
  return `${parts.weekday} ${parts.month} ${parts.day.padStart(2)} ${parts.hour}:${parts.minute}:${parts.second} PHT ${parts.year}`;
}

const MAX_ENTRIES = 40;

interface Entry {
  id: number;
  command: string;
  output: ReactNode;
}

interface HeroShellProps {
  /** When the prompt appears, in ms (the hero's boot timeline). */
  start: number;
  /** What `cat` prints for each file, rendered on the server. */
  files: Record<File, ReactNode>;
  /** What `ai --pair` prints. */
  peers: ReactNode;
}

const outClass = "shell-out text-sm leading-relaxed sm:text-[0.9375rem]";

// The last prompt of the hero's terminal session, live. Visitors can type
// commands: `help` lists them, page names open that page (through the route
// curtain, which catches the link click), `cat engineer.ts` prints the
// source, and so on. While there's output, the pane carries data-shell: from
// lg it then scrolls inside a screen-tall hero (styles/motion/home.css), and
// on smaller screens it simply grows with the page. The caret is a block
// drawn over the input at the cursor, in `ch`, since the type is monospace.
export function HeroShell({ start, files, peers }: HeroShellProps) {
  const { toggleTheme } = useTheme();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [caret, setCaret] = useState(0);
  // How far the input has scrolled sideways, so the caret can follow.
  const [offset, setOffset] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLAnchorElement>(null);
  const navPending = useRef(false);
  const navTimer = useRef(0);
  const nextId = useRef(0);
  const history = useRef<string[]>([]);
  const historyAt = useRef(-1);
  // What was being typed before ArrowUp, restored on the way back down.
  const draft = useRef("");
  // The line Tab last listed options for, so a second Tab moves focus on.
  const listed = useRef<string | null>(null);

  // A mouse click anywhere in the pane focuses the prompt, like a terminal,
  // unless it lands on a link or ends a text selection. Touch taps don't,
  // so scrolling a phone never pops the keyboard.
  useEffect(() => {
    const session = rootRef.current?.closest<HTMLElement>(".hero-session");
    const input = inputRef.current;
    if (!session || !input) return;
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if ((event.target as Element).closest("a, button, input")) return;
      if (!window.getSelection()?.isCollapsed) return;
      input.focus({ preventScroll: true });
    };
    session.addEventListener("pointerup", onPointerUp);
    return () => session.removeEventListener("pointerup", onPointerUp);
  }, []);

  // Mark the pane while there's output, and keep the newest output in view:
  // scrolled into view inside the pane where it scrolls (from lg), or on
  // the page where it grows.
  useEffect(() => {
    const session = rootRef.current?.closest<HTMLElement>(".hero-session");
    if (!session) return;
    if (entries.length === 0) {
      delete session.dataset.shell;
      session.scrollTop = 0;
      return;
    }
    session.dataset.shell = "on";
    if (session.scrollHeight > session.clientHeight) {
      session.scrollTop = session.scrollHeight;
    } else {
      inputRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [entries]);

  // A page link still waiting to be followed is dropped with the hero.
  useEffect(() => {
    const timer = navTimer;
    return () => window.clearTimeout(timer.current);
  }, []);

  const open = (page: Page) => {
    navPending.current = true;
    return (
      <p className={`${outClass} text-slate-400`}>
        opening{" "}
        <Link
          ref={navRef}
          href={PAGES[page]}
          className="text-indigo-300 underline decoration-indigo-300/40 underline-offset-4 transition-colors hover:text-green-300"
        >
          ~/{page}
        </Link>
        <span className="shell-dots" aria-hidden="true" />
      </p>
    );
  };

  const error = (message: string) => (
    <div className={outClass}>
      <p className="text-rose-400">{message}</p>
      <p className="text-slate-400">
        Type <span className="text-slate-200">help</span> to see what&apos;s
        here.
      </p>
    </div>
  );

  const run = (line: string): ReactNode => {
    const [name = "", ...args] = line.trim().split(/\s+/);
    const command = name.toLowerCase();
    const arg = nameOf(args[0] ?? "");

    if (!command) return null;
    if (isPage(command)) return open(command);

    switch (command) {
      case "help":
      case "man":
        return (
          <div
            className={`${outClass} grid grid-cols-[auto_minmax(0,1fr)] gap-x-6`}
          >
            {HELP.map(([cmd, what]) => (
              <Fragment key={cmd}>
                <span className="text-green-300">{cmd}</span>
                <span className="text-slate-400">{what}</span>
              </Fragment>
            ))}
          </div>
        );

      case "cd":
      case "open":
        if (!arg || arg === "~" || arg === "home") return null;
        if (isPage(arg)) return open(arg);
        return error(`cd: no such file or directory: ${args[0]}`);

      case "ls":
        if (arg === "links") {
          return (
            <p className={`${outClass} flex flex-wrap gap-x-5`}>
              {(Object.keys(PAGES) as Page[]).map((page) => (
                <Link
                  key={page}
                  href={PAGES[page]}
                  className="font-semibold text-sky-400 transition-colors hover:text-green-300"
                >
                  {page}/
                </Link>
              ))}
            </p>
          );
        }
        if (arg && !arg.startsWith("-")) {
          return error(`ls: ${args[0]}: No such file or directory`);
        }
        return (
          <p className={`${outClass} flex flex-wrap gap-x-5 text-slate-200`}>
            {FILES.map((file) => (
              <span key={file}>{file}</span>
            ))}
            <span className="font-semibold text-sky-400">links/</span>
          </p>
        );

      case "cat":
      case "bat":
      case "less":
        if (!arg) return error("usage: cat <file>  (try: cat engineer.ts)");
        if (isFile(arg)) return <div className={outClass}>{files[arg]}</div>;
        return error(`cat: ${args[0]}: No such file or directory`);

      case "ai":
      case "claude":
      case "cursor":
      case "gemini":
      case "chatgpt":
        return <div className={outClass}>{peers}</div>;

      case "date":
        return <p className={outClass}>{philippineDate()}</p>;

      case "theme": {
        const next = document.documentElement.classList.contains("dark")
          ? "light"
          : "dark";
        toggleTheme();
        return <p className={outClass}>theme: switched to {next}</p>;
      }

      case "whoami":
        return <p className={outClass}>arvin</p>;

      case "pwd":
        return <p className={outClass}>/home/arvin</p>;

      case "echo":
        return <p className={outClass}>{args.join(" ")}</p>;

      case "sudo":
        if (/hire/i.test(args.join(" "))) {
          return (
            <>
              <p className={`${outClass} text-slate-400`}>
                [sudo] password for visitor: ********
              </p>
              <p className={`${outClass} text-green-300`}>
                Permission granted. Let&apos;s talk.
              </p>
              {open("contact")}
            </>
          );
        }
        return error(
          "visitor is not in the sudoers file. This incident will be reported.",
        );

      case "exit":
      case "logout":
        return (
          <p className={outClass}>
            Thanks for stopping by. Type{" "}
            <span className="text-green-300">contact</span> to say hello first.
          </p>
        );

      default:
        return error(`zsh: command not found: ${name}`);
    }
  };

  const append = (command: string, output: ReactNode) => {
    const id = nextId.current++;
    setEntries((current) =>
      [...current, { id, command, output }].slice(-MAX_ENTRIES),
    );
  };

  const submit = () => {
    const line = value;
    setValue("");
    setCaret(0);
    setOffset(0);
    historyAt.current = -1;
    draft.current = "";
    listed.current = null;
    if (line.trim()) history.current = [line, ...history.current].slice(0, 50);

    const command = line.trim().split(/\s+/)[0]?.toLowerCase();
    if (command === "clear") {
      setEntries([]);
      return;
    }

    append(line, run(line));

    // A page command: follow its link once the line has shown for a moment.
    // Scheduled here, not in an effect, so more output can't cancel it. A
    // link gone by then (`clear`) is skipped: clicking a detached link would
    // load the page in full, without the curtain.
    if (navPending.current) {
      navPending.current = false;
      window.clearTimeout(navTimer.current);
      navTimer.current = window.setTimeout(() => {
        const link = navRef.current;
        if (link?.isConnected) link.click();
      }, 650);
    }
  };

  // Tab: fill in as much as the options share, or list them, as zsh does.
  // It returns false when there's nothing more to do (a complete command, or
  // options already listed for this line), so Tab moves focus on.
  const complete = () => {
    const typed = value.toLowerCase();
    const matches = COMPLETIONS.filter((option) => option.startsWith(typed));
    if (matches.length === 0) return false;
    const prefix = commonPrefix(matches);
    if (prefix.length > typed.length) {
      setValue(prefix);
      setCaret(prefix.length);
      return true;
    }
    if (matches.length === 1 || listed.current === value) return false;
    listed.current = value;
    append(
      value,
      <p className={`${outClass} flex flex-wrap gap-x-5 text-slate-400`}>
        {matches.map((option) => (
          <span key={option}>{option}</span>
        ))}
      </p>,
    );
    return true;
  };

  // ArrowUp and ArrowDown walk the history. At the ends they do nothing,
  // and coming back down past the newest entry restores the draft.
  const recall = (step: 1 | -1) => {
    const at = Math.min(
      Math.max(historyAt.current + step, -1),
      history.current.length - 1,
    );
    if (at === historyAt.current) return;
    if (historyAt.current === -1) draft.current = value;
    historyAt.current = at;
    const line = at === -1 ? draft.current : history.current[at];
    setValue(line);
    setCaret(line.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Keys that confirm an IME composition aren't commands.
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      recall(1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      recall(-1);
    } else if (event.key === "Tab" && value.trim() && !event.shiftKey) {
      // Only completes something typed: with an empty prompt, Tab still
      // moves focus on.
      if (complete()) event.preventDefault();
    } else if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setEntries([]);
    } else if (event.ctrlKey && event.key.toLowerCase() === "c") {
      if (event.currentTarget.selectionStart !== event.currentTarget.selectionEnd) {
        return; // copying a selection
      }
      event.preventDefault();
      append(`${value}^C`, null);
      setValue("");
      setCaret(0);
      setOffset(0);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    listed.current = null;
    setValue(input.value);
    setCaret(input.selectionStart ?? input.value.length);
    setOffset(input.scrollLeft);
  };

  const syncCaret = () => {
    const input = inputRef.current;
    if (!input) return;
    setCaret(input.selectionStart ?? input.value.length);
    setOffset(input.scrollLeft);
  };

  return (
    <div ref={rootRef} className="flex flex-col">
      <div
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="flex flex-col"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="shell-entry flex flex-col gap-1.5">
            <p className="text-sm text-slate-400 sm:text-base">
              <span aria-hidden="true" className="text-green-400">
                $
              </span>{" "}
              <span className="text-slate-100">{entry.command}</span>
            </p>
            {entry.output}
          </div>
        ))}
      </div>

      <div
        className="shell-prompt boot-line flex items-center gap-[1ch] text-sm text-slate-400 sm:text-base"
        style={{ "--t": `${start}ms` } as CSSProperties}
      >
        <span aria-hidden="true" className="text-green-400">
          $
        </span>
        <label className="relative flex min-w-0 flex-1 cursor-text items-center overflow-hidden text-base">
          <span className="sr-only">
            Run a command in the terminal. Type help to see the commands.
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onSelect={syncCaret}
            onScroll={syncCaret}
            type="text"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            className="shell-input w-full min-w-0 bg-transparent text-slate-100 caret-transparent outline-none"
          />
          <span
            aria-hidden="true"
            className="term-caret pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{
              left: `calc(${Math.min(caret, value.length)}ch - ${offset}px)`,
            }}
          />
          {!value && (
            <span
              aria-hidden="true"
              className="shell-hint pointer-events-none absolute left-[1.6ch] right-0 truncate text-slate-400"
            >
              type <span className="text-slate-200">help</span> and press
              enter
            </span>
          )}
        </label>
      </div>
    </div>
  );
}
