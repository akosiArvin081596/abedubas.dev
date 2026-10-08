import { Fragment, type CSSProperties } from "react";
import Link from "next/link";
import {
  CodeWindow,
  SectionLabel,
  SplitText,
} from "@/components";
import githubStats from "@/data/github-stats.json";
import { WEB_DEV_SINCE, yearsOfExperience } from "@/lib/career";
import { WindowDots } from "@/components/WindowDots";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroPortrait } from "./HeroPortrait";
import { Odometer } from "./Odometer";
import { ParallaxHero } from "./ParallaxHero";
import { Spotlight } from "./Spotlight";

const techStack = [
  "Vue",
  "Nuxt",
  "Laravel",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
];

// The stats band's metric cards. Experience counts from WEB_DEV_SINCE; the
// other three are GitHub totals across Arvin's personal and Alchemy
// accounts, from the snapshot `npm run stats:github` writes to
// src/data/github-stats.json. Each card's chart shows its own number.
const githubSince = Number(githubStats.since.slice(0, 4));
const thisYear = WEB_DEV_SINCE + yearsOfExperience();

const stats = [
  {
    value: yearsOfExperience(),
    suffix: "+",
    label: "Years Experience",
    metric: "experience.years",
    chart: "years",
    // Heroicons "clock"
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    value: githubStats.repos.total,
    suffix: "",
    label: "GitHub Repositories",
    metric: "github.repos",
    chart: "repos",
    // Heroicons "folder"
    icon: "M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z",
  },
  {
    value: githubStats.languages.count,
    suffix: "",
    label: "Languages",
    metric: "github.languages",
    chart: "languages",
    // Heroicons "code-bracket"
    icon: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
  },
  {
    value: githubStats.active,
    suffix: "",
    label: "Active in the Past Year",
    metric: "github.active",
    chart: "active",
    // Heroicons "bolt"
    icon: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  },
] as const;

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

// Numbers a chart piece with --c (its order) plus any extra properties, for
// the `count` effect in styles/motion/home.css.
const piece = (c: number, extra?: Record<string, string | number>) =>
  ({ "--c": c, ...extra }) as CSSProperties;

const caption = "font-mono text-[10px] leading-4 text-muted-foreground";

// A card's chart. All of it is decorative: the number and label carry it.
function StatChart({ chart }: { chart: (typeof stats)[number]["chart"] }) {
  if (chart === "years") {
    // A column per year since WEB_DEV_SINCE, rising, with the years on
    // GitHub lit.
    const years = range(thisYear - WEB_DEV_SINCE + 1).map(
      (k) => WEB_DEV_SINCE + k,
    );
    const githubAt = ((githubSince - WEB_DEV_SINCE) / years.length) * 100;
    return (
      <div aria-hidden="true" className="w-full">
        <div className="flex h-10 items-end gap-1">
          {years.map((year, c) => (
            <span
              key={year}
              className="stat-year flex-1 rounded-sm bg-gradient-to-b from-accent to-primary"
              style={piece(c, {
                "--h": `${35 + (65 * c) / Math.max(years.length - 1, 1)}%`,
                "--level": year >= githubSince ? 1 : 0.3,
              })}
            />
          ))}
        </div>
        <div className={`relative mt-1.5 h-4 ${caption}`}>
          <span className="absolute left-0">{WEB_DEV_SINCE}</span>
          <span className="absolute" style={{ left: `${githubAt}%` }}>
            github {githubSince}
          </span>
          <span className="absolute right-0">now</span>
        </div>
      </div>
    );
  }

  if (chart === "repos") {
    // A cell per repository, three rows: public ones lit, private ones dim.
    const { total, public: open, private: closed } = githubStats.repos;
    return (
      <div aria-hidden="true" className="w-full">
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(total / 3)}, minmax(0, 1fr))`,
          }}
        >
          {range(total).map((cell) => (
            <span
              key={cell}
              className="stat-cell aspect-square rounded-[2px] bg-primary"
              style={piece(cell, { "--level": cell < open ? 1 : 0.35 })}
            />
          ))}
        </div>
        <div className={`mt-1.5 flex gap-3 ${caption}`}>
          <span>
            <span className="mr-1 inline-block h-2 w-2 rounded-[2px] bg-primary" />
            {open} public
          </span>
          <span>
            <span className="mr-1 inline-block h-2 w-2 rounded-[2px] bg-primary/35" />
            {closed} private
          </span>
        </div>
      </div>
    );
  }

  if (chart === "languages") {
    // The top five by code size. Bars are scaled to the largest; the labels
    // give the true shares.
    const top = githubStats.languages.top;
    return (
      <ul aria-hidden="true" className="w-full space-y-1.5">
        {top.map((language, c) => (
          <li key={language.name} className={`flex items-center gap-2 ${caption}`}>
            <span className="w-16 shrink-0 truncate text-foreground/80">
              {language.name}
            </span>
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
              <span
                className="stat-bar absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
                style={piece(c, {
                  "--w": `${(language.share / top[0].share) * 100}%`,
                })}
              />
            </span>
            <span className="w-9 shrink-0 text-right">{language.share}%</span>
          </li>
        ))}
      </ul>
    );
  }

  // active: the repositories pushed to in the past year, out of all of them
  const total = githubStats.repos.total;
  return (
    <div aria-hidden="true" className="w-full">
      <span className="relative block h-2 overflow-hidden rounded-full bg-foreground/10">
        <span
          className="stat-bar absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
          style={piece(0, {
            "--w": `${(githubStats.active / total) * 100}%`,
          })}
        />
      </span>
      <div className={`mt-1.5 flex justify-between gap-2 ${caption}`}>
        <span>pushed in the last 12 months</span>
        <span>
          {githubStats.active}/{total}
        </span>
      </div>
    </div>
  );
}

// When the GitHub snapshot was taken, for the band's footnote
const githubUpdated = new Date(
  `${githubStats.generatedAt}T00:00:00Z`,
).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const services = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Building responsive, performant user interfaces with React, Next.js, Vue, Nuxt.js, and modern CSS frameworks. Focused on creating seamless experiences across all devices.",
  },
  {
    number: "02",
    title: "Backend Development",
    description:
      "Designing scalable APIs and server architectures with Laravel, Node.js, and various databases. Building secure, reliable systems that power modern applications.",
  },
  {
    number: "03",
    title: "Full-Stack Solutions",
    description:
      "End-to-end development from concept to deployment. Combining frontend expertise with backend knowledge to deliver complete, production-ready applications.",
  },
];

// engineer.ts, as syntax-colored tokens. The colors are the blog's --code-*
// palette, which meets AA on --muted (the <pre> background).
type TokenKind = "keyword" | "title" | "property" | "string" | "literal";
type Token = readonly [text: string, kind?: TokenKind];

const tokenColor: Record<TokenKind, string> = {
  keyword: "text-(--code-keyword)",
  title: "text-(--code-title)",
  property: "text-(--code-constant)",
  string: "text-(--code-string)",
  literal: "text-(--code-constant)",
};

const stackRows = [0, 3, 6].map((start) => techStack.slice(start, start + 3));

const engineerTs: Token[][] = [
  [["export", "keyword"], [" "], ["const", "keyword"], [" "], ["engineer", "title"], [" = {"]],
  [["  "], ["name", "property"], [": "], ['"Arvin Baghari Edubas"', "string"], [","]],
  [["  "], ["role", "property"], [": "], ['"Web Developer & Software Engineer"', "string"], [","]],
  [["  "], ["stack", "property"], [": ["]],
  ...stackRows.map((row): Token[] => [
    ["    "],
    ...row.flatMap((tech): Token[] => [[`"${tech}"`, "string"], [","], [" "]]).slice(0, -1),
  ]),
  [["  ],"]],
  [["  "], ["available", "property"], [": "], ["true", "literal"], [","]],
  [["} "], ["as", "keyword"], [" "], ["const", "keyword"], [";"]],
];

// The role line types one character per step, so it needs its length.
const ROLE = "Web Developer & Software Engineer";

// The AI tools Arvin pairs with, shown by the terminal's `ai --pair`.
const AI_PEERS = ["Claude Code (CLI)", "Cursor AI"];

// When a hero step starts (the `boot` effect in styles/motion/home.css). The
// hero builds strictly in reading order: the portrait, then the terminal
// session top to bottom (each command, then its output), then engineer.ts,
// each step once the one before has landed.
const startAt = (ms: number) => ({ "--t": `${ms}ms` }) as CSSProperties;
const HERO_START = {
  portrait: 150,
  terminal: 600,
  whoami: 850,
  heading: 1050,
  roleCmd: 1650,
  role: 1950,
  aiCmd: 2650,
  ai: 2950,
  aboutCmd: 3400,
  paragraph: 3700,
  linksCmd: 4450,
  work: 4700,
  contact: 4850,
  prompt: 5050,
  code: 5250,
};

// A shell prompt line in the hero's terminal, typed on during the boot. With
// no command, it's the last prompt, waiting with a cursor. Decorative: the
// content is the output under each one.
function TermLine({ command, start }: { command?: string; start: number }) {
  return (
    <p
      aria-hidden="true"
      className="boot-line text-sm text-slate-400 sm:text-base"
      style={startAt(start)}
    >
      <span className="text-green-400">$</span>{" "}
      {command ? (
        <span
          className="boot-cmd inline-block"
          style={{ "--n": command.length } as CSSProperties}
        >
          {command}
        </span>
      ) : (
        <span className="term-caret" />
      )}
    </p>
  );
}

const arrow = (className: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    />
  </svg>
);

const check = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden="true"
    className="h-4 w-4 text-primary"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export default function HomePage() {
  return (
    <ParallaxHero>
      {/* Hero: one screen tall. Three columns from xl (portrait, intro,
          engineer.ts), two at lg, stacked below. */}
      <section className="relative">
        <div
          data-reveal="boot"
          data-reveal-on="load"
          className="hero-frame container-site flex min-h-[calc(100svh-4.5rem)] items-center py-12 lg:py-16"
        >
          <div className="grid w-full items-center justify-items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:justify-items-stretch lg:gap-x-14 lg:gap-y-10 xl:grid-cols-[auto_minmax(0,1fr)_clamp(25rem,30vw,30rem)] xl:gap-x-12 2xl:gap-x-16">
            {/* Profile Image */}
            <div
              data-reveal-item
              className="boot-slide lg:row-span-2 xl:row-span-1"
              style={startAt(HERO_START.portrait)}
            >
              <HeroPortrait
                video={{
                  webm: "/media/portrait.webm",
                  mp4: "/media/portrait.mp4",
                }}
              />
            </div>

            {/* Intro, as a terminal session: each command types on, then its
                output appears, top to bottom. The prompts are decoration;
                the heading, role, paragraph and links are the content. The
                window stays dark in both themes, like a real terminal. */}
            <div className="@container w-full min-w-0 text-left">
              <div
                data-reveal-item
                className="boot-term overflow-hidden rounded-xl border border-white/10 bg-[#0b1120] shadow-2xl shadow-primary/10"
                style={startAt(HERO_START.terminal)}
              >
                <div className="flex items-center gap-3 border-b border-white/10 bg-[#111a2e] px-4 py-2.5">
                  <WindowDots />
                  <span className="hidden min-w-0 flex-1 truncate text-center font-mono text-xs text-slate-400 sm:block">
                    arvin@abedubas.dev: ~
                  </span>
                  {/* Status */}
                  <span className="ml-auto flex shrink-0 items-center gap-2 font-mono text-xs text-slate-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    Available for new projects
                  </span>
                </div>

                <div className="hero-term-body flex flex-col gap-3 p-5 font-mono text-slate-200 sm:p-7">
                  <TermLine command="whoami" start={HERO_START.whoami} />
                  {/* Main Heading: the name always gets a line of its own */}
                  <h1
                    className="boot-heading text-[clamp(1.5rem,7.2cqi,3.75rem)] font-bold leading-[1.1] tracking-tight text-white"
                    style={startAt(HERO_START.heading)}
                  >
                    <SplitText text="Hi, I'm" />{" "}
                    <span className="block whitespace-nowrap">
                      <SplitText
                        text="Arvin Baghari Edubas"
                        start={2}
                        className="boot-name bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-[gradient_3s_linear_infinite]"
                      />
                    </span>
                  </h1>

                  <TermLine command="cat role.txt" start={HERO_START.roleCmd} />
                  {/* Role, typed on */}
                  <p
                    className="text-[clamp(0.8125rem,4cqi,1.125rem)] font-medium text-slate-100"
                    style={startAt(HERO_START.role)}
                  >
                    <span
                      className="boot-role inline-block"
                      style={{ "--n": ROLE.length } as CSSProperties}
                    >
                      {ROLE}
                    </span>
                  </p>

                  <TermLine command="ai --pair" start={HERO_START.aiCmd} />
                  {/* AI as a coding peer: the tools pop in left to right */}
                  <p
                    className="flex flex-wrap items-center gap-2 text-sm text-slate-300 sm:text-[0.9375rem]"
                    style={startAt(HERO_START.ai)}
                  >
                    {AI_PEERS.map((tool, c) => (
                      <span
                        key={tool}
                        className="boot-chip inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-indigo-200"
                        style={{ "--c": c } as CSSProperties}
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-3.5 w-3.5 text-sky-400"
                        >
                          <path d="M12 2.5 13.9 9.6 21 12l-7.1 2.4L12 21.5l-1.9-7.1L3 12l7.1-2.4z" />
                        </svg>
                        {tool}
                      </span>
                    ))}
                    <span
                      className="boot-chip text-slate-400"
                      style={{ "--c": AI_PEERS.length } as CSSProperties}
                    >
                      — my coding peers
                    </span>
                  </p>

                  <TermLine command="cat about.md" start={HERO_START.aboutCmd} />
                  {/* Description */}
                  <p
                    className="boot-paragraph max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[0.9375rem]"
                    style={startAt(HERO_START.paragraph)}
                  >
                    Clean code, intuitive user experiences, and scalable,
                    enterprise-ready architecture—brought together to build
                    modern web applications. Open to collaborating on
                    something meaningful.
                  </p>

                  <TermLine command="ls links/" start={HERO_START.linksCmd} />
                  {/* CTA Links */}
                  <div className="flex flex-wrap gap-x-6 gap-y-3 pt-0.5">
                    <Link
                      href="/projects"
                      className="boot-drop group relative inline-flex items-center text-sm font-medium text-indigo-300 transition-colors hover:text-green-300 sm:text-base"
                      style={startAt(HERO_START.work)}
                    >
                      <span className="relative">
                        View My Work
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                      </span>
                      {arrow("ml-2 h-4 w-4 transition-transform group-hover:translate-x-1")}
                    </Link>
                    <Link
                      href="/contact"
                      className="boot-drop group relative inline-flex items-center text-sm font-medium text-slate-300 transition-colors hover:text-green-300 sm:text-base"
                      style={startAt(HERO_START.contact)}
                    >
                      <span className="relative">
                        Get in Touch
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                      </span>
                      {arrow("ml-2 h-4 w-4 transition-transform group-hover:translate-x-1")}
                    </Link>
                  </div>

                  <TermLine start={HERO_START.prompt} />
                </div>
              </div>
            </div>

            {/* Tech Stack, as code. A colored panel passes over it first. */}
            <div
              data-reveal-item
              className="boot-window relative w-full max-w-lg text-left lg:col-start-2 lg:max-w-xl xl:col-start-3 xl:max-w-none"
              style={startAt(HERO_START.code)}
            >
              <CodeWindow title="engineer.ts">
                <pre className="hero-code overflow-x-auto text-foreground">
                  <code className="block">
                    {engineerTs.map((tokens, line) => (
                      <span
                        key={line}
                        className="boot-code-line block w-max"
                        style={{ "--line": line } as CSSProperties}
                      >
                        <span
                          aria-hidden="true"
                          className="mr-4 hidden w-5 select-none text-right text-(--code-comment) sm:inline-block"
                        >
                          {line + 1}
                        </span>
                        {tokens.map(([text, kind], t) =>
                          kind ? (
                            <span key={t} className={tokenColor[kind]}>
                              {text}
                            </span>
                          ) : (
                            <Fragment key={t}>{text}</Fragment>
                          ),
                        )}
                      </span>
                    ))}
                  </code>
                </pre>
              </CodeWindow>
              <span
                aria-hidden="true"
                className="boot-sweep pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </div>
        </div>

        <HeroBackdrop />
      </section>

      {/* Stats Section: a row of live metric cards */}
      <section
        data-reveal="count"
        className="stat-band relative overflow-hidden border-y border-border bg-muted/30 py-16 xl:py-20"
      >
        <span
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
        />
        <span
          aria-hidden="true"
          className="count-panel pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-px h-0.5 overflow-hidden"
        >
          <span className="count-beam block h-full w-2/5 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </span>

        <div className="container-site relative">
          <div data-reveal-item className="stat-eyebrow mb-8 xl:mb-10">
            <SectionLabel>by the numbers</SectionLabel>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
            {stats.map((stat) => (
              <article
                key={stat.label}
                data-reveal-item
                className="stat-card group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_0_32px_-8px_var(--primary)] xl:p-7"
              >
                <Spotlight />
                <span aria-hidden="true" className="stat-scan" />
                {/* A hairline of the brand gradient along the top edge */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                />

                <div className="relative flex items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="stat-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25 transition-shadow duration-300 group-hover:shadow-[0_0_20px_-4px_var(--primary)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                    </svg>
                  </span>
                  <span
                    aria-hidden="true"
                    className="stat-key truncate font-mono text-xs text-muted-foreground"
                    style={{ "--n": stat.metric.length } as CSSProperties}
                  >
                    {stat.metric}
                  </span>
                </div>

                <div className="stat-value count-num relative mt-6 text-5xl font-bold leading-none tabular-nums text-foreground xl:text-6xl">
                  <Odometer value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="count-label relative mt-2 text-sm font-medium text-muted-foreground xl:text-base">
                  {stat.label}
                </div>

                <div className="relative mt-6 flex min-h-16 flex-1 items-end">
                  <StatChart chart={stat.chart} />
                </div>
              </article>
            ))}
          </div>
          <p
            data-reveal-item
            className="stat-source mt-6 text-right font-mono text-xs text-muted-foreground"
          >
            <span aria-hidden="true">{"// "}</span>
            GitHub data from {githubStats.accounts} accounts, updated{" "}
            {githubUpdated}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="container-site relative py-24 xl:py-32">
        <div data-reveal="curtain" className="mb-16 text-center xl:mb-20">
          <div data-reveal-item className="curtain-open mb-4">
            <SectionLabel>services</SectionLabel>
          </div>
          <h2
            data-reveal-item
            className="curtain-open mb-4 text-4xl font-bold text-foreground sm:text-5xl xl:text-6xl"
          >
            What I <span className="text-primary">Do</span>
          </h2>
          <div
            data-reveal-item
            aria-hidden="true"
            className="curtain-rule mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <p
            data-reveal-item
            className="curtain-open mx-auto mt-6 max-w-2xl text-lg text-muted-foreground xl:text-xl"
          >
            Building end-to-end web solutions that are fast, accessible, and
            built to scale.
          </p>
        </div>

        <div className="grid gap-14 md:grid-cols-3 xl:gap-20">
          {services.map((service) => (
            <div
              key={service.number}
              data-reveal="curtain"
              className="curtain-card group relative text-center md:text-left"
            >
              <div className="curtain-body">
                <div className="mb-6 flex flex-col items-center md:items-start">
                  <span className="curtain-mask block overflow-hidden">
                    <span className="curtain-number block text-7xl font-black leading-none text-primary/15 transition-colors group-hover:text-primary/30 xl:text-8xl">
                      {service.number}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="curtain-line mt-2 h-12 w-px bg-gradient-to-b from-primary/50 to-transparent transition-colors group-hover:from-primary"
                  />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-foreground transition-colors group-hover:text-primary xl:text-3xl">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground xl:text-lg">
                  {service.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="curtain-panel pointer-events-none absolute -inset-3 rounded-2xl bg-gradient-to-r from-primary to-accent"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border py-24 xl:py-32">
        {/* Background effects */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="home-orb absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl xl:h-96 xl:w-96" />
          <div
            className="home-orb absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl xl:h-[28rem] xl:w-[28rem]"
            style={{ "--orb-time": "10s" } as CSSProperties}
          />

          {/* Sparkle dots */}
          <div className="absolute left-[10%] top-16 h-2 w-2 rounded-full bg-primary/40 motion-safe:animate-[sparkle_3s_ease-in-out_infinite]" />
          <div className="absolute right-[15%] top-32 h-1.5 w-1.5 rounded-full bg-accent/50 motion-safe:animate-[sparkle_4s_ease-in-out_infinite_0.5s]" />
          <div className="absolute bottom-24 left-[20%] h-2 w-2 rounded-full bg-primary/30 motion-safe:animate-[sparkle_3.5s_ease-in-out_infinite_1s]" />
          <div className="absolute bottom-16 right-[25%] h-1.5 w-1.5 rounded-full bg-accent/40 motion-safe:animate-[sparkle_2.5s_ease-in-out_infinite_0.3s]" />
        </div>

        <div
          data-reveal="words"
          className="container-site relative text-center"
        >
          {/* Icon */}
          <div
            data-reveal-item
            className="words-follow mb-8 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent p-4 text-white shadow-lg shadow-primary/25 xl:p-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className="h-8 w-8 xl:h-10 xl:w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
          </div>

          <h2
            data-reveal-item
            className="words-head mx-auto mb-6 max-w-5xl text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl md:text-6xl xl:text-7xl"
          >
            <SplitText text="Ready to Start a" />{" "}
            <span className="whitespace-nowrap">
              <SplitText
                text="Project"
                start={4}
                className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              />
              <SplitText text="?" start={5} />
            </span>
          </h2>

          <p
            data-reveal-item
            className="words-follow words-after mx-auto mb-10 max-w-2xl text-lg text-muted-foreground xl:text-xl"
          >
            I&apos;m always excited to work on new challenges. Let&apos;s
            discuss how I can help bring your ideas to life.
          </p>

          <Link
            href="/contact"
            data-reveal-item
            className="words-follow words-after group relative inline-flex items-center text-lg font-medium text-foreground transition-colors hover:text-primary xl:text-xl"
          >
            <span className="relative">
              Let&apos;s Talk
              <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary/30 transition-all duration-300 group-hover:bg-primary" />
            </span>
            {arrow("ml-2 h-5 w-5 transition-transform group-hover:translate-x-1")}
          </Link>

          {/* Trust indicators */}
          <div className="words-after mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground xl:text-base">
            {["Quick Response", "Free Consultation", "No Commitment"].map(
              (label) => (
                <span
                  key={label}
                  data-reveal-item
                  className="words-follow flex items-center gap-2"
                >
                  {check}
                  {label}
                </span>
              ),
            )}
          </div>
        </div>
      </section>
    </ParallaxHero>
  );
}
