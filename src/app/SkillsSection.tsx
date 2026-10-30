import { SectionLabel } from "@/components";
import { Decode } from "@/components/Decode";

const coreStrengths = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end development from database design to frontend implementation, ensuring cohesive and efficient applications.",
  },
  {
    title: "System Architecture",
    description:
      "Designing scalable system architectures that handle growth and maintain performance under load.",
  },
  {
    title: "API Design",
    description:
      "Creating well-documented, secure, and intuitive APIs that enable seamless integration.",
  },
  {
    title: "Performance Optimization",
    description:
      "Identifying and resolving bottlenecks to deliver fast, responsive applications.",
  },
];

// #skills: the Skills & Expertise header (`decode`: the title churns
// through code glyphs once the section reveals and the page is still), then
// the core strengths, each swept by a scan bar (`scan`).
export function SkillsSection() {
  return (
    <section id="skills" data-nav="skills" className="relative py-16 lg:py-8">
      <div className="container-site">
        <div data-reveal="decode" className="mb-12 text-center xl:mb-16 short:mb-7">
          <SectionLabel className="decode-sub mb-4 short:mb-2">what i bring</SectionLabel>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl short:mb-3 short:text-5xl">
            <Decode text="Skills & Expertise" />
          </h2>
          <p className="decode-sub mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl short:text-lg">
            A comprehensive toolkit built over years of professional experience
            across various technologies and domains
          </p>
        </div>

        <div data-reveal="scan">
          <div data-reveal-item className="scan-sweep mb-6 w-fit short:mb-4">
            <SectionLabel>core strengths</SectionLabel>
            <h3 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl short:mt-1 short:text-2xl">
              Core Strengths
            </h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreStrengths.map((strength, index) => (
              <div
                key={strength.title}
                data-reveal-item
                className="scan-card relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 xl:p-8 short:p-6"
              >
                <div className="scan-sweep">
                  <span
                    aria-hidden="true"
                    className="mb-5 block font-mono text-xs text-muted-foreground short:mb-3"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mb-3 text-lg font-medium text-card-foreground xl:text-xl">
                    {strength.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground xl:text-base short:text-sm">
                    {strength.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
