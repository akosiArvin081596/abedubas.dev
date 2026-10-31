import type { CSSProperties } from "react";
import { Glyph, SectionLabel, SplitText, type GlyphName } from "@/components";
import { toneStyle } from "@/lib/tone";
import { timeline } from "./ExperienceSection";
import { Spotlight } from "./Spotlight";

// About says only what nothing else on the page does. The hero already
// introduces him (his name, role, years, stack and summary) and the stats
// band repeats the years, so the bio doesn't introduce him again: it says
// who he builds for, that he leads teams, and how he works with AI.
// Beside it, "Currently" is the Experience timeline's "Present" entries, a
// one-line status the timeline expands on; "Industries" are the fields of
// the projects in data/projects.ts (LogisX; Lendy.PH; Vendora; DROMIC, ECT
// and AKIIP; DOX, OQG and the SEC Compliance Matrix; Serum 72 and Calm
// Canine).
const current = timeline.filter((entry) => entry.year.endsWith("Present"));

// From lg the card takes the side column's free height, and Industries
// (`grow`) takes the card's: its list spreads down the card as a ledger.
const facts: {
  label: string;
  icon: GlyphName;
  value: React.ReactNode;
  grow?: boolean;
}[] = [
  {
    label: "Currently",
    icon: "briefcase",
    value: (
      <ul className="space-y-1.5">
        {current.map((role) => (
          <li key={role.title}>
            <span className="block font-medium text-foreground [@media(min-height:900px)]:xl:text-base">
              {role.title}
            </span>
            <span className="block text-xs text-muted-foreground [@media(min-height:900px)]:xl:text-sm">
              {role.company}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: "Industries",
    icon: "grid",
    grow: true,
    value: (
      <ul className="mt-0.5 flex flex-wrap gap-1.5 lg:flex-1 lg:flex-col lg:flex-nowrap lg:justify-between lg:gap-0">
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
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs font-medium text-foreground lg:gap-2.5 lg:rounded-none lg:border-0 lg:border-b lg:border-border/70 lg:bg-transparent lg:px-0 lg:py-1.5 lg:text-sm lg:last:border-b-0 [@media(min-height:900px)]:xl:py-2 [@media(min-height:900px)]:xl:text-base"
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

// The bio leads with who he builds for, set large; these two notes sit
// side by side under it. The longer one goes first, so the shorter ends
// higher on the right and leaves the corner clear for Bintoy's launcher.
const notes: { label: string; text: React.ReactNode }[] = [
  {
    label: "Working with AI",
    text: (
      <>
        To move faster without sacrificing quality, I use AI as a{" "}
        <span className={em}>coding partner</span>, like a peer reviewer for
        ideas, refactors, edge cases, and documentation. I stay accountable
        for the final decisions, architecture, and code quality.
      </>
    ),
  },
  {
    label: "Leadership",
    text: (
      <>
        I <span className={em}>lead technical teams</span> and translate
        complex business requirements into reliable software products.
      </>
    ),
  },
];

// From lg the lead and the notes spread down the column's height, with a
// hairline midway between them. Under `highlight` the rule draws on after
// the lead's pass (--k counts the passes before it).
function BioRule({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ "--k": n } as CSSProperties}
      className="highlight-rule hidden h-px bg-border/70 lg:block"
    />
  );
}

// #about: the About Me header (`letters`) heads the side column, over a
// card of facts; the bio reads beside it (`highlight`). The header is its
// own reveal inside the bio's, so its letters drop as the band starts its
// pass. From lg the section is one screen (home.css) and its content takes
// that height: the header tops a side column that the facts card fills to
// the foot, and beside it the bio's lead tops the column and its notes end
// it, a step larger on wide and on tall screens.
export function AboutSection() {
  return (
    <section id="about" data-nav="about" className="relative py-16 lg:py-8 short:py-6">
      <div
        data-reveal="highlight"
        className="container-site grid gap-10 lg:flex-1 lg:grid-cols-12 lg:gap-12 xl:gap-16"
      >
        <div className="lg:col-span-4 lg:flex lg:flex-col">
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
            className="highlight-side tone-card relative rounded-2xl border border-border bg-card/60 p-5 lg:flex lg:flex-1 lg:flex-col short:p-4 [@media(min-height:900px)]:xl:p-7"
            data-reveal-item
          >
            <Spotlight />
            <span aria-hidden="true" className="tone-hairline" />
            <h3 className="relative mb-4 flex items-center justify-between gap-3 short:mb-3 [@media(min-height:900px)]:xl:mb-6">
              <span className="text-base font-semibold text-foreground [@media(min-height:900px)]:xl:text-lg">
                At a glance
              </span>
              <span aria-hidden="true" className="font-mono text-[11px] text-muted-foreground">
                <span className="text-green-600 dark:text-green-400">$</span> ls ~/about
              </span>
            </h3>
            <dl className="relative space-y-4 text-sm lg:flex lg:flex-1 lg:flex-col short:space-y-3 [@media(min-height:900px)]:xl:space-y-6">
              {facts.map((fact) => (
                <div key={fact.label} className={`flex gap-3 ${fact.grow ? "lg:flex-1" : ""}`}>
                  <span
                    aria-hidden="true"
                    className="tone-tile mt-0.5 h-8 w-8 rounded-lg [@media(min-height:900px)]:xl:h-10 [@media(min-height:900px)]:xl:w-10"
                  >
                    <Glyph name={fact.icon} className="h-4 w-4" />
                  </span>
                  <div className={`min-w-0 flex-1 ${fact.grow ? "lg:flex lg:flex-col" : ""}`}>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground [@media(min-height:900px)]:xl:text-xs">
                      {fact.label}
                    </dt>
                    <dd className={`mt-1 ${fact.grow ? "lg:flex lg:flex-1 lg:flex-col" : ""}`}>
                      {fact.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="relative lg:col-span-8 lg:flex lg:flex-col">
          <span
            aria-hidden="true"
            className="highlight-quote absolute -left-6 -top-10 hidden select-none text-8xl font-bold text-primary/10 md:block lg:-left-10 lg:-top-6 xl:-left-12"
          >
            &ldquo;
          </span>
          <div className="space-y-8 text-base leading-relaxed text-muted-foreground lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:space-y-0 lg:text-lg xl:text-xl [@media(min-height:820px)]:lg:text-xl [@media(min-height:900px)]:xl:text-2xl">
            <div className="highlight-line" data-reveal-item>
              <p className="text-2xl leading-snug font-medium text-foreground lg:text-[1.75rem] xl:text-[2.125rem] short:text-[2rem] tight:text-[1.75rem] [@media(min-height:820px)]:lg:text-[2.125rem] [@media(min-height:820px)]:xl:text-[2.5rem] [@media(min-height:900px)]:xl:text-[2.875rem]">
                I&apos;ve collaborated with enterprise teams, government
                agencies, and startups to deliver solutions built for{" "}
                <span className="text-primary">real-world constraints</span>:
                security, performance, and reliability at scale.
              </p>
            </div>
            <BioRule n={1} />
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 xl:gap-14">
              {notes.map((note) => (
                <div key={note.label} className="highlight-line" data-reveal-item>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-wider [@media(min-height:900px)]:xl:mb-3 [@media(min-height:900px)]:xl:text-xs">
                    {note.label}
                  </p>
                  <p>{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
