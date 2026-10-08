import { Fragment, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { SectionLabel, SplitText } from "@/components";
import githubStats from "@/data/github-stats.json";
import { otherLiveSites } from "@/data/live-sites";
import { projects } from "@/data/projects";
import { WEB_DEV_SINCE, yearsOfExperience } from "@/lib/career";
import { WindowDots } from "@/components/WindowDots";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroClock } from "./HeroClock";
import { HeroPortrait } from "./HeroPortrait";
import { HeroShell } from "./HeroShell";
import { HomeSnap } from "./HomeSnap";
import { Odometer } from "./Odometer";
import { ParallaxHero } from "./ParallaxHero";
import { Spotlight } from "./Spotlight";

// The hero's stack, DevOps and security lists (its fastfetch readout and
// engineer.ts): the stack runs frontend, backend, then databases; DevOps
// and security match their categories on the Skills page.
const techStack = [
  "Vue",
  "Nuxt",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Laravel",
  "Node.js",
  "Express.js",
  "Python",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
];

const devOps = ["Docker", "CI/CD", "Linux", "Nginx", "AWS", "Vercel"];

const security = [
  "Secure Coding",
  "OWASP Top 10",
  "Auth & Access Control",
  "SSL/TLS",
  "Network Security",
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

// Everything running live on its own domain, for the band's wide card: the
// Projects page's live projects, then the other live sites.
const liveProjects = [
  ...projects.flatMap((project) =>
    project.liveUrl
      ? [{ name: project.title.split(" ")[0], url: project.liveUrl }]
      : [],
  ),
  ...otherLiveSites,
].map((site) => ({ ...site, host: new URL(site.url).host }));

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

// engineer.ts, as syntax-colored tokens, for the hero terminal's
// `cat engineer.ts`. The colors are the blog's --code-* palette; the
// terminal pins its dark values (.hero-window in styles/motion/home.css).
type TokenKind = "keyword" | "title" | "property" | "string" | "literal";
type Token = readonly [text: string, kind?: TokenKind];

const tokenColor: Record<TokenKind, string> = {
  keyword: "text-(--code-keyword)",
  title: "text-(--code-title)",
  property: "text-(--code-constant)",
  string: "text-(--code-string)",
  literal: "text-(--code-constant)",
};

// A list as engineer.ts lines of three: each a quoted, comma-separated row.
const arrayRows = (list: readonly string[]) =>
  range(Math.ceil(list.length / 3)).map((row): Token[] => [
    ["    "],
    ...list
      .slice(row * 3, row * 3 + 3)
      .flatMap((item): Token[] => [[`"${item}"`, "string"], [","], [" "]])
      .slice(0, -1),
  ]);

// The AI tools Arvin pairs with: the terminal's `ai --pair` and engineer.ts.
const AI_PEERS = ["Claude Code (CLI)", "Cursor AI", "Gemini", "ChatGPT"];

const engineerTs: Token[][] = [
  [["export", "keyword"], [" "], ["const", "keyword"], [" "], ["engineer", "title"], [" = {"]],
  [["  "], ["name", "property"], [": "], ['"Arvin Baghari Edubas"', "string"], [","]],
  [["  "], ["role", "property"], [": "], ['"Information Technologist & Software Engineer"', "string"], [","]],
  [["  "], ["location", "property"], [": "], ['"Philippines"', "string"], [","]],
  [["  "], ["since", "property"], [": "], [String(WEB_DEV_SINCE), "literal"], [","]],
  [["  "], ["stack", "property"], [": ["]],
  ...arrayRows(techStack),
  [["  ],"]],
  [["  "], ["devops", "property"], [": ["]],
  ...arrayRows(devOps),
  [["  ],"]],
  [["  "], ["security", "property"], [": ["]],
  ...arrayRows(security),
  [["  ],"]],
  [
    ["  "],
    ["aiPeers", "property"],
    [": ["],
    ...AI_PEERS.flatMap((tool): Token[] => [[`"${tool}"`, "string"], [", "]]).slice(0, -1),
    ["],"],
  ],
  [["  "], ["available", "property"], [": "], ["true", "literal"], [","]],
  [["} "], ["as", "keyword"], [" "], ["const", "keyword"], [";"]],
];

// What `cat engineer.ts` prints in the hero's terminal
const engineerSource = (
  <pre className="shell-code">
    <code className="block">
      {engineerTs.map((tokens, line) => (
        <span key={line} className="block w-max">
          <span
            aria-hidden="true"
            className="mr-4 inline-block w-5 select-none text-right text-(--code-comment)"
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
);

// The role line types one character per step, so it needs its length.
const ROLE = "Information Technologist & Software Engineer";

// The hero's summary, in plain professional prose. `cat about.md` prints it
// too.
const SUMMARY =
  "I build modern web applications end to end, combining intuitive user experiences with clean, maintainable code and scalable, enterprise-ready architecture. I welcome opportunities to collaborate on meaningful projects.";

const sparkle = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-3 w-3 shrink-0 text-sky-400"
  >
    <path d="M12 2.5 13.9 9.6 21 12l-7.1 2.4L12 21.5l-1.9-7.1L3 12l7.1-2.4z" />
  </svg>
);

// The AI tools, as chips. In the boot they pop in left to right (--c).
function AiPeers() {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5 align-middle">
      {AI_PEERS.map((tool, c) => (
        <span
          key={tool}
          className="boot-chip inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 leading-[1.4] text-indigo-200"
          style={{ "--c": c } as CSSProperties}
        >
          {sparkle}
          {tool}
        </span>
      ))}
    </span>
  );
}

// A list joined with dots. Each dot stays with the name before it, so no
// line starts with one when the list wraps.
const dotted = (list: readonly string[]) =>
  list.map((item, k) => (
    <Fragment key={item}>
      <span className="whitespace-nowrap">
        {item}
        {k < list.length - 1 && <span className="text-slate-500"> ·</span>}
      </span>{" "}
    </Fragment>
  ));

// `fastfetch`'s readout: engineer.ts's facts as system info, keys in the
// accent color, then the terminal's color palette, as fastfetch prints it.
const fetchRows: { key: string; value: ReactNode }[] = [
  { key: "location", value: "Philippines (UTC+8)" },
  {
    key: "uptime",
    value: `${yearsOfExperience()} years, since ${WEB_DEV_SINCE}`,
  },
  { key: "stack", value: dotted(techStack) },
  { key: "devops", value: dotted(devOps) },
  { key: "security", value: dotted(security) },
  { key: "ai peers", value: <AiPeers /> },
];

const PALETTE = [
  "#1e293b",
  "#f87171",
  "#4ade80",
  "#facc15",
  "#818cf8",
  "#e879f9",
  "#38bdf8",
  "#e2e8f0",
];

// When a hero step starts (the `boot` effect in styles/motion/home.css). The
// hero builds in reading order: the window, then the left pane (the photo
// renders in), then the right pane top to bottom (each command, then its
// output; then the summary and the buttons), and last the tmux status bar.
const startAt = (ms: number) => ({ "--t": `${ms}ms` }) as CSSProperties;
const HERO_START = {
  window: 150,
  divider: 450,
  imgCmd: 600,
  image: 1150,
  whoami: 1700,
  heading: 1950,
  role: 2550,
  fetchCmd: 3300,
  fetch: 3600,
  summary: 4500,
  work: 5250,
  contact: 5400,
  prompt: 5750,
  status: 5900,
};

// A shell prompt line in the hero's terminal, typed on during the boot.
// Decorative: the content is the output under each one.
function TermLine({ command, start }: { command: string; start: number }) {
  return (
    <p
      aria-hidden="true"
      className="boot-line text-sm text-slate-400 sm:text-base"
      style={startAt(start)}
    >
      <span className="text-green-400">$</span>{" "}
      <span
        className="boot-cmd inline-block"
        style={{ "--n": command.length } as CSSProperties}
      >
        {command}
      </span>
    </p>
  );
}

// A segment of the tmux status bar; they slide in left to right (--c).
const segment = (c: number) => ({ "--c": c }) as CSSProperties;

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

// The hero buttons' icons: a 2x2 grid of tiles (top left, top right,
// bottom left, bottom right) and a paper plane.
const GRID_TILES = [
  [3.75, 3.75],
  [13.5, 3.75],
  [3.75, 13.5],
  [13.5, 13.5],
] as const;

const plane = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.75}
    stroke="currentColor"
    className="h-full w-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
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
      <HomeSnap />
      {/* Hero: a full-screen terminal, edge to edge under the navbar and at
          least the rest of the screen tall. tmux splits it in two: the
          photo, as imgcat prints it, and the intro as a shell session. Side
          by side from lg, stacked below. The window is dark in both themes,
          like a real terminal, and its panes are translucent, so the
          backdrop's circuit loop glows faintly through. */}
      <section className="relative">
        <div
          data-reveal="boot"
          data-reveal-on="load"
          className="flex min-h-[calc(100svh-4.5rem)] flex-col"
        >
          <div className="hero-window flex w-full flex-1 flex-col">
            <div
              className="boot-term flex flex-1 flex-col overflow-hidden bg-[#0b1120]/85 lg:min-h-0"
              style={startAt(HERO_START.window)}
            >
              {/* Title bar, with a highlight along its top edge */}
              <div className="relative flex items-center gap-3 border-b border-white/10 bg-[#111a2e] px-4 py-2.5">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
                <WindowDots />
                <span className="hidden min-w-0 flex-1 truncate text-center font-mono text-xs text-slate-400 sm:block">
                  arvin@abedubas.dev: ~ — tmux
                </span>
                {/* Status */}
                <span className="ml-auto flex shrink-0 items-center gap-2 font-mono text-xs text-slate-300">
                  <span className="relative flex h-2 w-2">
                    <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Available for new projects
                </span>
              </div>

              <div className="grid flex-1 lg:min-h-0 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:grid-rows-[minmax(0,1fr)] xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] 2xl:grid-cols-[minmax(0,42rem)_minmax(0,1fr)]">
                {/* Left pane: the photos, rendered in like terminal images,
                    one after another */}
                <div className="hero-pane relative flex flex-col border-b border-white/10 p-4 font-mono sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
                  {/* tmux marks the active pane's border */}
                  <span
                    aria-hidden="true"
                    className="tmux-active pointer-events-none absolute z-10"
                    style={startAt(HERO_START.divider)}
                  />
                  <TermLine
                    command="imgcat ~/photos/*.jpg"
                    start={HERO_START.imgCmd}
                  />
                  <div
                    className="relative h-72 sm:h-96 lg:h-auto lg:max-h-[46rem] lg:min-h-72 lg:flex-1"
                    style={startAt(HERO_START.image)}
                  >
                    <HeroPortrait />
                  </div>
                </div>

                {/* Right pane: the session. Each command types on, then its
                    output appears, top to bottom. The prompts are decoration;
                    the heading, role, readout, paragraph and links are the
                    content. Its last prompt is live (HeroShell). */}
                <div className="hero-pane hero-session @container flex min-w-0 flex-col p-5 font-mono text-slate-200 sm:p-7 lg:p-8 xl:px-12">
                  <TermLine command="whoami" start={HERO_START.whoami} />
                  <div className="flex flex-col gap-1.5">
                    {/* Main Heading: the name always gets a line of its own */}
                    <h1
                      className="boot-heading font-bold tracking-tight text-white"
                      style={startAt(HERO_START.heading)}
                    >
                      <span className="block text-[clamp(1.125rem,3.4cqi,1.875rem)] leading-tight text-slate-300">
                        <SplitText text="Hi, I'm" />
                      </span>{" "}
                      <span className="block whitespace-nowrap text-[clamp(1.375rem,7.4cqi,4.25rem)] leading-[1.12]">
                        <SplitText
                          text="Arvin Baghari Edubas"
                          start={2}
                          className="boot-name bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-[gradient_3s_linear_3]"
                        />
                      </span>
                    </h1>
                    {/* Role, typed on */}
                    <p
                      className="text-[clamp(0.9375rem,2.8cqi,1.375rem)] font-medium text-slate-100"
                      style={startAt(HERO_START.role)}
                    >
                      <span
                        className="boot-role inline-block"
                        style={{ "--n": ROLE.length } as CSSProperties}
                      >
                        {ROLE}
                      </span>
                    </p>
                  </div>

                  <TermLine command="fastfetch" start={HERO_START.fetchCmd} />
                  <dl
                    className="fetch my-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2 text-sm sm:text-[0.9375rem]"
                    style={startAt(HERO_START.fetch)}
                  >
                    {fetchRows.map((row, r) => (
                      <Fragment key={row.key}>
                        <dt
                          className="fetch-key font-semibold text-indigo-300"
                          style={{ "--r": r } as CSSProperties}
                        >
                          {row.key}
                        </dt>
                        <dd
                          className="fetch-value text-slate-200"
                          style={{ "--r": r } as CSSProperties}
                        >
                          {row.value}
                        </dd>
                      </Fragment>
                    ))}
                    <dd aria-hidden="true" className="col-start-2 flex pt-1.5">
                      {PALETTE.map((color, c) => (
                        <span
                          key={color}
                          className="fetch-swatch h-3 w-6 sm:w-7"
                          style={{ background: color, "--c": c } as CSSProperties}
                        />
                      ))}
                    </dd>
                  </dl>

                  {/* Summary: plain, professional prose in the sans face,
                      set off by an accent rule. It opens a line at a time. */}
                  <p
                    className="hero-summary boot-paragraph mt-1.5 max-w-3xl border-l-2 border-indigo-400/70 pl-4 font-sans text-[0.9375rem] leading-relaxed text-slate-200 sm:text-base 2xl:text-lg"
                    style={startAt(HERO_START.summary)}
                  >
                    {SUMMARY}
                  </p>

                  {/* Calls to action, each led by an icon that animates on
                      hover: the grid lights up a tile at a time, and the
                      paper plane flies off to the right as another follows.
                      Styles in styles/motion/home.css (.cta-*). */}
                  <div className="hero-ctas mt-1.5 flex flex-wrap items-center gap-3 font-sans">
                    <Link
                      href="/projects"
                      className="cta-primary group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/60 ring-1 ring-inset ring-white/20 transition-[box-shadow,filter] duration-300 hover:shadow-indigo-500/40 hover:brightness-110 sm:text-[0.9375rem] 2xl:px-6 2xl:py-3 2xl:text-base"
                      style={startAt(HERO_START.work)}
                    >
                      {/* A light sweep crosses left to right on hover, then
                          snaps back unseen */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-0 ease-out group-hover:translate-x-[250%] group-hover:duration-700 motion-reduce:hidden"
                      />
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.75}
                        className="cta-grid h-[1.125rem] w-[1.125rem] shrink-0"
                      >
                        {GRID_TILES.map(([x, y], k) => (
                          <rect
                            key={k}
                            x={x}
                            y={y}
                            width={6.75}
                            height={6.75}
                            rx={1.5}
                            style={{ "--k": k } as CSSProperties}
                          />
                        ))}
                      </svg>
                      View My Work
                    </Link>
                    <Link
                      href="/contact"
                      className="cta-secondary boot-drop group relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors duration-300 hover:border-sky-400/60 hover:bg-sky-400/10 hover:text-white sm:text-[0.9375rem] 2xl:px-6 2xl:py-3 2xl:text-base"
                      style={startAt(HERO_START.contact)}
                    >
                      <span
                        aria-hidden="true"
                        className="cta-plane relative h-[1.125rem] w-[1.125rem] shrink-0 overflow-hidden text-sky-300 transition-colors duration-300 group-hover:text-white"
                      >
                        {plane}
                        {plane}
                      </span>
                      Get in Touch
                    </Link>
                  </div>

                  <HeroShell
                    start={HERO_START.prompt}
                    files={{
                      "about.md": <p>{SUMMARY}</p>,
                      "engineer.ts": engineerSource,
                      "role.txt": <p>{ROLE}</p>,
                    }}
                    peers={<AiPeers />}
                  />
                </div>
              </div>

              {/* tmux's status bar: the session, its windows, and the clock */}
              <div
                aria-hidden="true"
                className="tmux-status flex items-center justify-between gap-4 border-t border-white/10 bg-[#0d1527] py-1.5 pl-3 pr-10 font-mono text-[11px] leading-4 text-slate-400"
                style={startAt(HERO_START.status)}
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <span
                    className="tmux-seg rounded-[3px] bg-green-400 px-1.5 font-semibold text-[#0b1120]"
                    style={segment(0)}
                  >
                    abedubas
                  </span>
                  <span
                    className="tmux-seg rounded-[3px] bg-indigo-500/25 px-1.5 text-indigo-100"
                    style={segment(1)}
                  >
                    0:zsh*
                  </span>
                  <span className="tmux-seg px-1" style={segment(2)}>
                    1:nvim
                  </span>
                  <span className="tmux-seg hidden px-1 sm:inline" style={segment(3)}>
                    2:claude
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="tmux-seg hidden sm:inline" style={segment(4)}>
                    Philippines
                  </span>
                  <HeroClock
                    part="time"
                    className="tmux-seg rounded-[3px] bg-white/5 px-1.5 text-slate-200 empty:invisible"
                    style={segment(5)}
                  />
                  <HeroClock
                    part="date"
                    className="tmux-seg hidden empty:invisible sm:inline"
                    style={segment(6)}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <HeroBackdrop />
      </section>

      {/* Stats Section: a row of live metric cards */}
      <section
        data-reveal="count"
        className="stat-band relative overflow-hidden border-y border-border bg-muted/30 py-12 lg:py-6"
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
          <div data-reveal-item className="stat-eyebrow mb-6 lg:mb-4">
            <SectionLabel>by the numbers</SectionLabel>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
            {stats.map((stat) => (
              <article
                key={stat.label}
                data-reveal-item
                className="stat-card group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_0_32px_-8px_var(--primary)] xl:p-6"
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

                <div className="stat-value count-num relative mt-4 text-5xl font-bold leading-none tabular-nums text-foreground xl:text-6xl">
                  <Odometer value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="count-label relative mt-2 text-sm font-medium text-muted-foreground xl:text-base">
                  {stat.label}
                </div>

                <div className="relative mt-4 flex min-h-14 flex-1 items-end">
                  <StatChart chart={stat.chart} />
                </div>
              </article>
            ))}

            {/* The live projects, by domain, across the whole row */}
            <article
              data-reveal-item
              className="stat-card group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_0_32px_-8px_var(--primary)] sm:col-span-2 lg:col-span-4 lg:flex-row lg:items-center lg:gap-10 lg:p-5"
            >
              <Spotlight />
              <span aria-hidden="true" className="stat-scan" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
              />

              <div className="relative flex shrink-0 flex-col lg:w-64">
                <div className="flex items-center justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="stat-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25 transition-shadow duration-300 group-hover:shadow-[0_0_20px_-4px_var(--primary)]"
                  >
                    {/* Heroicons "globe-alt" */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </span>
                  <span
                    aria-hidden="true"
                    className="stat-key truncate font-mono text-xs text-muted-foreground"
                    style={{ "--n": "projects.live".length } as CSSProperties}
                  >
                    projects.live
                  </span>
                </div>
                <div className="stat-value count-num relative mt-4 text-5xl font-bold leading-none tabular-nums text-foreground xl:text-6xl">
                  <Odometer value={liveProjects.length} suffix="" />
                </div>
                <div className="count-label relative mt-2 text-sm font-medium text-muted-foreground xl:text-base">
                  Live Projects, on their own domains
                </div>
              </div>

              {/* A cloud of domain chips, each linking to its live site.
                  The project's name shows on hover and to screen readers. */}
              <ul className="relative flex flex-1 flex-wrap content-center gap-2">
                {liveProjects.map((project, c) => (
                  <li
                    key={project.host}
                    className="live-row"
                    style={{ "--c": c } as CSSProperties}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={project.name}
                      className="group/live inline-flex items-center gap-2 rounded-lg border border-border bg-background/50 px-2.5 py-1.5 font-mono text-xs text-foreground transition-colors duration-200 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
                      {project.host}
                      <span className="sr-only">
                        , {project.name} (opens in a new tab)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p
            data-reveal-item
            className="stat-source mt-4 text-right font-mono text-xs text-muted-foreground lg:pr-16"
          >
            <span aria-hidden="true">{"// "}</span>
            GitHub data from {githubStats.accounts} accounts, updated{" "}
            {githubUpdated}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="container-site relative py-24 lg:py-10">
        <div data-reveal="curtain" className="services-head mb-16 text-center lg:mb-12">
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
      <section className="relative overflow-hidden border-t border-border py-24 lg:py-12">
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
