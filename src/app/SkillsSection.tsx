import { Glyph, SectionLabel, type GlyphName } from "@/components";
import { Decode } from "@/components/Decode";
import { projects } from "@/data/projects";
import { toneStyle, type Tone } from "@/lib/tone";
import { Spotlight } from "./Spotlight";

// Each strength names the shipped projects that show it (`proof`, slugs in
// data/projects.ts), so the card says where, not just what. Only production
// projects are listed, since the card says "shipped in"; a slug that leaves
// projects.ts simply drops out.
const coreStrengths: {
  title: string;
  description: string;
  icon: GlyphName;
  tone: Tone;
  proof: string[];
}[] = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end development from database design to frontend implementation, ensuring cohesive and efficient applications.",
    icon: "layers",
    tone: "accent",
    proof: ["lendyph", "vendora"],
  },
  {
    title: "System Architecture",
    description:
      "Designing scalable system architectures that handle growth and maintain performance under load.",
    icon: "nodes",
    tone: "violet",
    proof: ["logisx", "dromic"],
  },
  {
    title: "API Design",
    description:
      "Creating well-documented, secure, and intuitive APIs that enable seamless integration.",
    icon: "braces",
    tone: "green",
    proof: ["dox", "ect"],
  },
  {
    title: "Performance Optimization",
    description:
      "Identifying and resolving bottlenecks to deliver fast, responsive applications.",
    icon: "gauge",
    tone: "orange",
    proof: ["ect-validation", "masterlist-deduplication"],
  },
];

function shippedIn(slugs: string[]) {
  return slugs.flatMap((slug) => {
    const project = projects.find((p) => p.slug === slug && p.stage === "production");
    return project ? [project.title] : [];
  });
}

// #skills: the Skills & Expertise header (`decode`: the title churns
// through code glyphs once the section reveals and the page is still), then
// the core strengths, each swept by a scan bar (`scan`). Each strength card
// has its own tone (styles/tone.css) and ends on the projects that show it.
// The cards share four grid rows (subgrid), so titles, text and the
// "shipped in" lines align across a row however each one wraps.
//
// In the snap layout (lg, at least 700px tall) the section fills the screen
// under the header: the heading keeps its natural height and the cards take
// the rest. Their third row (the description) absorbs the extra height, so
// each card reads header, title and text from the top with its "shipped in"
// footer pinned to the bottom. `[@media(min-height:900px)]:` steps the type
// and spacing up on tall screens, where `short:`/`tight:` no longer apply.
export function SkillsSection() {
  return (
    <section id="skills" data-nav="skills" className="relative py-16 lg:py-6">
      <div className="container-site lg:flex lg:flex-1 lg:flex-col">
        <div data-reveal="decode" className="mb-12 text-center xl:mb-14 short:mb-5 tight:mb-4 [@media(min-height:821px)_and_(max-height:899px)]:lg:mb-8">
          <SectionLabel className="decode-sub mb-4 short:mb-2">what i bring</SectionLabel>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl short:mb-3 short:text-5xl tight:mb-2 tight:text-4xl">
            <Decode text="Skills & Expertise" />
          </h2>
          <p className="decode-sub mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl short:text-lg tight:text-base">
            A comprehensive toolkit built over years of professional experience
            across various technologies and domains
          </p>
        </div>

        <div data-reveal="scan" className="lg:flex lg:flex-1 lg:flex-col">
          {/* On short screens the eyebrow alone heads the cards; screen
              readers still get the heading. */}
          <div data-reveal-item className="scan-sweep mb-6 w-fit short:mb-3 [@media(min-height:821px)_and_(max-height:899px)]:lg:mb-3">
            <SectionLabel>core strengths</SectionLabel>
            <h3 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl short:sr-only [@media(min-height:821px)_and_(max-height:899px)]:lg:sr-only">
              Core Strengths
            </h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:flex-1 lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr_auto] short:gap-5 tight:gap-4">
            {coreStrengths.map((strength, index) => {
              const shipped = shippedIn(strength.proof);
              return (
                <div
                  key={strength.title}
                  data-reveal-item
                  style={toneStyle(strength.tone)}
                  className="scan-card tone-card relative row-span-4 grid grid-rows-subgrid gap-0 overflow-hidden rounded-2xl border border-border bg-card p-6 xl:p-7 short:p-6 tight:p-4 [@media(min-height:900px)]:xl:p-8"
                >
                  <Spotlight />
                  <span aria-hidden="true" className="tone-hairline" />
                  <div className="scan-sweep relative row-span-4 grid grid-rows-subgrid gap-0">
                    <div className="mb-4 flex items-center justify-between gap-3 short:mb-4 tight:mb-3 [@media(min-height:900px)]:lg:mb-6">
                      <span className="tone-tile h-10 w-10 tight:h-9 tight:w-9 [@media(min-height:900px)]:lg:h-12 [@media(min-height:900px)]:lg:w-12">
                        <Glyph name={strength.icon} className="h-5 w-5 [@media(min-height:900px)]:lg:h-6 [@media(min-height:900px)]:lg:w-6" />
                      </span>
                      <span aria-hidden="true" className="font-mono text-xs text-muted-foreground [@media(min-height:900px)]:lg:text-sm">
                        <span className="tone-text">{String(index + 1).padStart(2, "0")}</span>
                        {" / "}
                        {String(coreStrengths.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-card-foreground xl:text-xl [@media(min-height:900px)]:lg:mb-3">
                      {strength.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground xl:text-base tight:text-sm">
                      {strength.description}
                    </p>
                    {shipped.length > 0 ? (
                      <div className="pt-5 short:pt-4 tight:pt-3 [@media(min-height:900px)]:lg:pt-6">
                        <div>
                          <p className="flex items-center gap-2 font-mono text-[11px] leading-4 text-muted-foreground [@media(min-height:900px)]:lg:text-xs">
                            <span>
                              <span aria-hidden="true">{"// "}</span>shipped in
                            </span>
                            <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-border" />
                          </p>
                          <ul className="mt-2 flex flex-wrap gap-1.5 [@media(min-height:900px)]:lg:mt-3 [@media(min-height:900px)]:lg:gap-2">
                            {shipped.map((title) => (
                              <li
                                key={title}
                                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs font-medium text-card-foreground"
                              >
                                <span aria-hidden="true" className="tone-dot" />
                                {title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
