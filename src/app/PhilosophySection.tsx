import { SectionLabel } from "@/components";

const principles = [
  {
    number: "01",
    title: "Clean Code First",
    description:
      "I believe in writing code that is readable, maintainable, and self-documenting. Good code should tell a story that any developer can understand.",
  },
  {
    number: "02",
    title: "User-Centric Design",
    description:
      "Technology should serve users, not the other way around. I focus on creating intuitive interfaces that make complex tasks simple.",
  },
  {
    number: "03",
    title: "Continuous Learning",
    description:
      "The tech landscape evolves rapidly. I stay current with emerging technologies and best practices to deliver cutting-edge solutions.",
  },
  {
    number: "04",
    title: "Performance Matters",
    description:
      "Every millisecond counts. I optimize applications for speed, ensuring fast load times and smooth user experiences.",
  },
];

// #philosophy (nav: About): the four principles, four across from lg, each
// swinging down on its hinge (`hinge`).
export function PhilosophySection() {
  return (
    <section id="philosophy" data-nav="about" className="relative py-16 lg:py-8">
      <div data-reveal="hinge" className="container-site">
        <div data-reveal-item className="mb-10 xl:mb-14">
          <SectionLabel>how i work</SectionLabel>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl xl:text-5xl">
            Engineering{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Philosophy
            </span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:gap-8">
          {principles.map((item) => (
            <div
              key={item.number}
              className="group relative rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40 xl:p-8"
              data-reveal-item
            >
              <span className="block text-5xl font-black leading-none text-primary/20 transition-colors group-hover:text-primary/60">
                {item.number}
              </span>
              <span className="mb-5 mt-4 block h-px w-12 bg-gradient-to-r from-primary/40 to-transparent transition-colors group-hover:from-primary" />
              <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground xl:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
