import { Fragment, type CSSProperties } from "react";
import Link from "next/link";
import {
  CodeWindow,
  SectionLabel,
  SplitText,
} from "@/components";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroPortrait } from "./HeroPortrait";
import { Odometer } from "./Odometer";
import { ParallaxHero } from "./ParallaxHero";

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

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

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
const ROLE_PROMPT = "> ";

// When a hero step starts (the `boot` effect in styles/motion/home.css). The
// hero builds strictly in reading order: the portrait, then the intro top to
// bottom, then engineer.ts, each step once the one before has landed.
const startAt = (ms: number) => ({ "--t": `${ms}ms` }) as CSSProperties;
const HERO_START = {
  portrait: 150,
  badge: 750,
  heading: 1000,
  role: 1700,
  paragraph: 2450,
  work: 3000,
  contact: 3150,
  code: 3450,
};

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
          className="container-site flex min-h-[calc(100svh-4.5rem)] items-center py-12 lg:py-16"
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

            {/* Intro. A size container, so the heading scales to it. */}
            <div className="@container w-full min-w-0 text-center lg:text-left">
              {/* The copy sits on a soft clearing (.hero-halo) over the
                  color fields, video and grid, so it always reads at AA. */}
              <div className="relative isolate">
                <div
                  aria-hidden="true"
                  className="hero-halo pointer-events-none absolute -z-10"
                />

                {/* Status Badge */}
                <div
                  data-reveal-item
                  className="boot-type mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm"
                  style={startAt(HERO_START.badge)}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 motion-safe:animate-ping"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    Available for new projects
                  </span>
                </div>

                {/* Main Heading: the name always gets a line of its own */}
                <h1
                  data-reveal-item
                  className="boot-heading mb-5 text-[clamp(1.75rem,10cqi,4.5rem)] font-bold leading-[1.08] tracking-tight text-foreground"
                  style={startAt(HERO_START.heading)}
                >
                  <SplitText text="Hi, I'm" />{" "}
                  <span className="block whitespace-nowrap">
                    <SplitText
                      text="Arvin Baghari Edubas"
                      start={2}
                      className="boot-name bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-[gradient_3s_linear_infinite]"
                    />
                  </span>
                </h1>

                {/* Role, typed on like a terminal line */}
                <p
                  data-reveal-item
                  className="mb-5 font-mono text-[clamp(0.8125rem,4.4cqi,1.25rem)] font-medium text-foreground/80"
                  style={startAt(HERO_START.role)}
                >
                  <span
                    className="relative inline-block"
                    style={
                      {
                        "--n": ROLE_PROMPT.length + ROLE.length,
                      } as CSSProperties
                    }
                  >
                    <span className="boot-role inline-block">
                      <span aria-hidden="true" className="text-primary">
                        {ROLE_PROMPT}
                      </span>
                      {ROLE}
                    </span>
                    <span aria-hidden="true" className="boot-caret" />
                  </span>
                </p>

                {/* Description */}
                <p
                  data-reveal-item
                  className="boot-paragraph mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg lg:mx-0 xl:text-base 2xl:text-lg"
                  style={startAt(HERO_START.paragraph)}
                >
                  Clean code, intuitive user experiences, and scalable,
                  enterprise-ready architecture—brought together to build
                  modern web applications. Open to collaborating on something
                  meaningful.
                </p>

                {/* CTA Links */}
                <div className="flex flex-col items-center justify-center gap-6 sm:flex-row lg:justify-start">
                  <Link
                    href="/projects"
                    data-reveal-item
                    className="boot-drop group relative inline-flex items-center text-base font-medium text-foreground transition-colors hover:text-primary"
                    style={startAt(HERO_START.work)}
                  >
                    <span className="relative">
                      View My Work
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                    {arrow("ml-2 h-4 w-4 transition-transform group-hover:translate-x-1")}
                  </Link>
                  <Link
                    href="/contact"
                    data-reveal-item
                    className="boot-drop group relative inline-flex items-center text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                    style={startAt(HERO_START.contact)}
                  >
                    <span className="relative">
                      Get in Touch
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                    {arrow("ml-2 h-4 w-4 transition-transform group-hover:translate-x-1")}
                  </Link>
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

      {/* Stats Section */}
      <section
        data-reveal="count"
        className="relative overflow-hidden border-y border-border bg-muted/30 py-16 xl:py-20"
      >
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
        <div className="container-site grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-reveal-item className="text-center">
              <div className="count-num mb-3 text-5xl font-bold leading-none tabular-nums text-primary md:text-6xl xl:text-7xl">
                <Odometer value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="count-label text-sm font-medium text-muted-foreground xl:text-base">
                {stat.label}
              </div>
            </div>
          ))}
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
