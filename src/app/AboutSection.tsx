import { SectionLabel, SplitText } from "@/components";
import { yearsOfExperience } from "@/lib/career";
import { LOCATION } from "@/data/contact";

// Quick facts for the bio's side column, all drawn from the bio itself and
// the Contact section.
const facts = [
  { label: "Experience", value: `${yearsOfExperience()}+ years` },
  { label: "Frontend", value: "Vue · Nuxt.js · React · Next.js" },
  { label: "Backend", value: "Laravel · Node.js" },
  { label: "Based in", value: LOCATION },
];

const em = "font-medium text-primary";

// #about: the About Me header (`letters`) heads the side column, over the
// quick facts; the bio reads beside it (`highlight`). The header is its
// own reveal inside the bio's, so its letters drop as the band starts its
// pass. Kept to one screen from lg (home.css), so the bio sets a little
// smaller on short screens.
export function AboutSection() {
  return (
    <section id="about" data-nav="about" className="relative py-16 lg:py-8">
      <div
        data-reveal="highlight"
        className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16"
      >
        <div className="lg:col-span-4">
          <div data-reveal="letters" className="mb-8 xl:mb-10">
            <SectionLabel className="letters-label mb-3">Get to know me</SectionLabel>
            <h2 className="text-5xl font-bold text-foreground md:text-6xl xl:text-7xl">
              <SplitText text="About" by="char" />{" "}
              <span className="text-primary">
                <SplitText text="Me" by="char" start={5} />
              </span>
            </h2>
            <div className="letters-bar mt-6 h-1 w-32 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
          </div>

          <h3
            className="highlight-side mb-5 inline-flex items-center gap-3 text-xl font-semibold text-foreground xl:text-2xl"
            data-reveal-item
          >
            <span className="h-px w-8 bg-primary" />
            Professional Bio
          </h3>
          <dl
            className="highlight-side grid grid-cols-2 gap-x-6 gap-y-4 border-l border-border pl-5 text-sm lg:grid-cols-1 xl:grid-cols-2"
            data-reveal-item
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-8 lg:self-center">
          <span
            aria-hidden="true"
            className="highlight-quote absolute -left-6 -top-10 hidden select-none text-8xl font-bold text-primary/10 md:block"
          >
            &ldquo;
          </span>
          <div className="max-w-[78ch] space-y-4 text-base leading-relaxed text-muted-foreground lg:text-[0.9375rem] [@media(min-height:820px)]:lg:text-lg [@media(min-height:820px)]:lg:leading-relaxed">
            <div className="highlight-line" data-reveal-item>
              <p>
                <span className="font-medium text-foreground">
                  I&apos;m Arvin Baghari Edubas
                </span>
                , an information technologist and software engineer with{" "}
                {yearsOfExperience()}+ years of experience building modern web
                applications. I focus on creating scalable, maintainable, and
                user-friendly products that solve real business problems.
              </p>
            </div>
            <div className="highlight-line" data-reveal-item>
              <p>
                I work across the stack—crafting thoughtful interfaces with{" "}
                <span className={em}>Vue</span> and{" "}
                <span className={em}>Nuxt.js</span>, and also building with{" "}
                <span className={em}>React</span> and{" "}
                <span className={em}>Next.js</span> when needed. On the
                backend, I develop <span className={em}>Laravel</span>-based
                RESTful APIs and build reliable services with{" "}
                <span className={em}>Node.js</span>, supported by relational
                and non-relational databases. I care a lot about clean code,
                practical best practices, and shipping work that&apos;s easy to
                maintain.
              </p>
            </div>
            <div className="highlight-line" data-reveal-item>
              <p>
                To move faster without sacrificing quality, I also use AI tools
                as a coding partner: <span className={em}>Claude Code</span> in
                the terminal, <span className={em}>Cursor AI</span> in the
                editor, and <span className={em}>Gemini</span> and{" "}
                <span className={em}>ChatGPT</span> alongside them, like a peer
                reviewer for ideas, refactors, edge cases, and documentation. I
                stay accountable for the final decisions, architecture, and
                code quality.
              </p>
            </div>
            <div className="highlight-line" data-reveal-item>
              <p>
                I&apos;ve collaborated with enterprise teams, government
                agencies, and startups to deliver solutions built for
                real-world constraints: security, performance, and reliability
                at scale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
