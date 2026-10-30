import { Glyph, SectionLabel, SplitText, type GlyphName } from "@/components";
import { yearsOfExperience } from "@/lib/career";
import { toneStyle } from "@/lib/tone";
import { timeline } from "./ExperienceSection";
import { Spotlight } from "./Spotlight";

// The facts beside the bio say only what nothing else on the page does:
// the hero's readout and the stats band already give the location, the
// years and the stack, and the bio's last paragraph names who he builds for.
// "Currently" is the Experience timeline's "Present" entries; "Industries"
// are the fields of the projects in data/projects.ts (LogisX; Lendy.PH; Vendora;
// DROMIC, ECT and AKIIP; DOX, OQG and the SEC Compliance Matrix; Serum 72
// and Calm Canine).
const current = timeline.filter((entry) => entry.year.endsWith("Present"));

const facts: { label: string; icon: GlyphName; value: React.ReactNode }[] = [
  {
    label: "Currently",
    icon: "briefcase",
    value: (
      <ul className="space-y-1.5">
        {current.map((role) => (
          <li key={role.title}>
            <span className="block font-medium text-foreground">{role.title}</span>
            <span className="block text-xs text-muted-foreground">{role.company}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: "Industries",
    icon: "grid",
    value: (
      <ul className="mt-0.5 flex flex-wrap gap-1.5">
        {[
          "Logistics",
          "Lending",
          "Retail & POS",
          "Government social services",
          "Finance & compliance",
          "E-commerce",
        ].map((industry) => (
          <li
            key={industry}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs font-medium text-foreground"
          >
            <span aria-hidden="true" className="tone-dot" />
            {industry}
          </li>
        ))}
      </ul>
    ),
  },
];

const em = "font-medium text-primary";

// #about: the About Me header (`letters`) heads the side column, over a
// card of facts found nowhere else on the page; the bio reads beside it
// (`highlight`). The header is its own reveal inside the bio's, so its
// letters drop as the band starts its pass. Kept to one screen from lg
// (home.css), so the bio sets a little smaller on short screens.
export function AboutSection() {
  return (
    <section id="about" data-nav="about" className="relative py-16 lg:py-8">
      <div
        data-reveal="highlight"
        className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16"
      >
        <div className="lg:col-span-4">
          <div data-reveal="letters" className="mb-8 xl:mb-10 short:mb-6">
            <SectionLabel className="letters-label mb-3">Get to know me</SectionLabel>
            <h2 className="text-5xl font-bold text-foreground md:text-6xl xl:text-7xl short:text-6xl tight:text-5xl">
              <SplitText text="About" by="char" />{" "}
              <span className="text-primary">
                <SplitText text="Me" by="char" start={5} />
              </span>
            </h2>
            <div className="letters-bar mt-6 h-1 w-32 bg-gradient-to-r from-primary via-primary/60 to-transparent short:mt-4" />
          </div>

          <div
            style={toneStyle("primary")}
            className="highlight-side tone-card relative rounded-2xl border border-border bg-card/60 p-5 short:p-4"
            data-reveal-item
          >
            <Spotlight />
            <span aria-hidden="true" className="tone-hairline" />
            <h3 className="relative mb-4 flex items-center justify-between gap-3 short:mb-3">
              <span className="text-base font-semibold text-foreground">At a glance</span>
              <span aria-hidden="true" className="font-mono text-[11px] text-muted-foreground">
                <span className="text-green-600 dark:text-green-400">$</span> whoami --now
              </span>
            </h3>
            <dl className="relative space-y-4 text-sm short:space-y-3">
              {facts.map((fact) => (
                <div key={fact.label} className="flex gap-3">
                  <span aria-hidden="true" className="tone-tile mt-0.5 h-8 w-8 rounded-lg">
                    <Glyph name={fact.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {fact.label}
                    </dt>
                    <dd className="mt-1">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
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
                I work across the stack and like to own a feature{" "}
                <span className={em}>end to end</span>, from the database and
                the APIs to the interface people use every day. I care a lot
                about <span className={em}>clean code</span>, practical best
                practices, and shipping work that&apos;s easy to maintain.
              </p>
            </div>
            <div className="highlight-line" data-reveal-item>
              <p>
                To move faster without sacrificing quality, I also use AI as a{" "}
                <span className={em}>coding partner</span>, like a peer
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
