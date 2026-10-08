"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { projects } from "@/data/projects";
import { WEB_DEV_SINCE, yearsOfExperience } from "@/lib/career";

// How long Bintoy "types" before each reply, in ms.
const TYPING_MS = 650;
// How long the window takes to close (bintoy-close in site.css), in ms.
const CLOSE_MS = 240;

// Bintoy's face: a robot mascot made in Higgsfield from Arvin's photo, on
// the site's indigo-to-sky gradient.
const AVATAR = "/images/bintoy/bintoy.webp";

interface Message {
  id: number;
  from: "bintoy" | "visitor";
  body: ReactNode;
}

const QUICK_REPLIES = [
  "What does Arvin do?",
  "Show me his projects",
  "What's his tech stack?",
  "Is he available?",
  "How can I contact him?",
];

const linkClass =
  "font-medium text-indigo-300 underline decoration-indigo-300/40 underline-offset-4 transition-colors hover:text-green-300";

// Bintoy's canned answers, picked by keyword. It's a placeholder until a
// real assistant is wired in: this is the one function to replace.
function answer(question: string, close: () => void): ReactNode {
  const q = question.toLowerCase();
  const to = (href: string, label: string) => (
    <Link href={href} onClick={close} className={linkClass}>
      {label}
    </Link>
  );

  if (/\b(hi|hello|hey|kumusta|musta)\b/.test(q)) {
    return <>Hello! Ask me about Arvin&apos;s work, his stack, or how to reach him.</>;
  }
  if (/(project|work|portfolio|built|app)/.test(q)) {
    const names = projects.map((project) => project.title.split(" ")[0]);
    return (
      <>
        He has shipped {names.slice(0, -1).join(", ")} and {names.at(-1)},
        among others. {to("/projects", "See the projects →")}
      </>
    );
  }
  if (/(stack|skill|tech|language|framework|tools?)\b/.test(q)) {
    return (
      <>
        Vue and Nuxt or React and Next.js on the front end, Laravel, Node.js
        and Python on the back end, with MySQL, PostgreSQL and MongoDB.{" "}
        {to("/skills", "All his skills →")}
      </>
    );
  }
  if (/(available|availability|freelance|open to|hiring|hire)/.test(q)) {
    return (
      <>
        Yes, Arvin is available for new projects.{" "}
        {to("/contact", "Start a conversation →")}
      </>
    );
  }
  if (/(contact|email|reach|message|talk|call)/.test(q)) {
    return (
      <>
        The quickest way is the contact form, or email{" "}
        <a href="mailto:arvin.edubas15@gmail.com" className={linkClass}>
          arvin.edubas15@gmail.com
        </a>
        . {to("/contact", "Contact page →")}
      </>
    );
  }
  if (/(blog|article|post|write)/.test(q)) {
    return <>He writes about web development. {to("/blog", "Read the blog →")}</>;
  }
  if (/(\bwho\b|\babout\b|arvin|background|experience|\brole\b|what (does|do) (he|you))/.test(q)) {
    return (
      <>
        Arvin is an Information Technologist &amp; Software Engineer from the
        Philippines, building for the web since {WEB_DEV_SINCE} (
        {yearsOfExperience()}+ years). {to("/about", "More about him →")}
      </>
    );
  }
  return (
    <>
      I&apos;m still a preview, so I can&apos;t answer that one yet. Arvin can,
      though. {to("/contact", "Ask him directly →")}
    </>
  );
}

function Avatar({ size }: { size: number }) {
  return (
    <Image
      src={AVATAR}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="eager"
      className="shrink-0 rounded-full ring-1 ring-white/15"
    />
  );
}

const closeIcon = (className: string) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
  </svg>
);

// Bintoy, the site's chat assistant: for now a placeholder with canned
// answers (see `answer`). A floating button with Bintoy's face, on every
// page, opens a small dark chat window, styled like the hero terminal. It
// settles in as it opens and drops away as it closes. Bintoy greets the
// visitor with quick replies, "types" for a moment before each answer, and
// links on to the right page. Escape closes it and puts focus back on the
// button. From lg it sits clear of the home hero's tmux status bar.
export function Bintoy() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [closing, setClosing] = useState(false);

  const panelId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const timers = useRef<number[]>([]);

  // Focus the field when the window opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, typing]);

  // Drop pending replies with the component.
  useEffect(() => {
    const pending = timers;
    return () => pending.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  // With motion, the window plays its exit before it unmounts.
  const close = () => {
    if (!open || closing) return;
    launcherRef.current?.focus();
    if (!document.documentElement.classList.contains("motion")) {
      setOpen(false);
      return;
    }
    setClosing(true);
    timers.current.push(
      window.setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, CLOSE_MS),
    );
  };

  const say = (from: Message["from"], body: ReactNode) => {
    const id = nextId.current++;
    setMessages((current) => [...current, { id, from, body }]);
  };

  const greet = () => {
    if (messages.length > 0) return;
    say(
      "bintoy",
      <>
        Hi, I&apos;m Bintoy, Arvin&apos;s assistant. I&apos;m still in training,
        but I can point you around. What would you like to know?
      </>,
    );
  };

  const toggle = () => {
    if (open) {
      close();
      return;
    }
    greet();
    setOpen(true);
  };

  const ask = (question: string) => {
    const text = question.trim();
    if (!text || typing) return;
    say("visitor", text);
    setDraft("");
    setTyping(true);
    timers.current.push(
      window.setTimeout(() => {
        setTyping(false);
        say("bintoy", answer(text, () => setOpen(false)));
      }, TYPING_MS),
    );
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(draft);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
    }
  };

  const asked = messages.some((message) => message.from === "visitor");

  return (
    <div className="bintoy" data-snap-ignore="">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Chat with Bintoy"
          data-closing={closing ? "" : undefined}
          onKeyDown={onKeyDown}
          className="bintoy-panel fixed right-4 z-40 flex w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120] font-sans text-slate-200 shadow-2xl shadow-black/50"
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-[#111a2e] px-4 py-3">
            <Avatar size={36} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-white">Bintoy</span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Arvin&apos;s assistant · preview
              </span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close the chat"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              {closeIcon("h-4 w-4")}
            </button>
          </div>

          {/* Messages */}
          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            className="flex max-h-[min(22rem,55vh)] min-h-48 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4 text-sm leading-relaxed"
          >
            {messages.map((message) =>
              message.from === "bintoy" ? (
                <div key={message.id} className="bintoy-msg flex items-end gap-2">
                  <Avatar size={26} />
                  <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5">
                    <span className="sr-only">Bintoy: </span>
                    {message.body}
                  </p>
                </div>
              ) : (
                <p
                  key={message.id}
                  className="bintoy-msg max-w-[85%] self-end rounded-2xl rounded-br-md bg-indigo-600 px-3.5 py-2.5 text-white"
                >
                  <span className="sr-only">You: </span>
                  {message.body}
                </p>
              ),
            )}
            {typing && (
              <div className="flex items-end gap-2" aria-label="Bintoy is typing">
                <Avatar size={26} />
                <span className="bintoy-typing flex gap-1 rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-3">
                  <span /><span /><span />
                </span>
              </div>
            )}
            {!asked && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => ask(reply)}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-sky-400/60 hover:bg-sky-400/10 hover:text-white"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Field */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 px-3 py-3">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Message Bintoy</span>
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask Bintoy something…"
                autoComplete="off"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-base text-white placeholder:text-slate-400 focus:border-indigo-400/60 focus:outline-none sm:text-sm"
              />
            </label>
            <button
              type="submit"
              aria-label="Send"
              disabled={!draft.trim() || typing}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white transition-[filter,opacity] hover:brightness-110 disabled:opacity-40"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
          <p className="px-4 pb-3 text-[11px] text-slate-400">
            Bintoy is a preview: its answers are prewritten for now.
          </p>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        aria-label={open ? "Close the chat with Bintoy" : "Chat with Bintoy"}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        data-open={open && !closing ? "" : undefined}
        className="bintoy-launcher group fixed right-4 z-40 h-14 w-14 rounded-full shadow-lg shadow-indigo-950/50 ring-2 ring-indigo-400/50 transition-[filter,box-shadow] duration-300 hover:shadow-indigo-500/40 hover:brightness-110"
      >
        {/* Bintoy's face, and the close icon that turns in while open */}
        <span className="bintoy-face absolute inset-0 overflow-hidden rounded-full">
          {/* Eager: lazy loading never starts inside the fixed button */}
          <Image src={AVATAR} alt="" fill sizes="56px" loading="eager" className="object-cover" />
        </span>
        <span className="bintoy-x absolute inset-0 grid place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
          {closeIcon("h-6 w-6")}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#0b1120] bg-green-400"
        />
        {!open && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#0b1120] px-3 py-1.5 text-xs font-medium text-slate-200 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            Ask Bintoy
          </span>
        )}
      </button>
    </div>
  );
}
