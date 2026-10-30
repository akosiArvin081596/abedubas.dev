import { Glyph, SectionLabel, type GlyphName } from "@/components";
import { toneStyle, type Tone } from "@/lib/tone";
import { PhilosophyArt, type PhilosophyArtName } from "./PhilosophyArt";
import { Spotlight } from "./Spotlight";

const principles: {
  number: string;
  title: string;
  description: string;
  icon: GlyphName;
  art: PhilosophyArtName;
  tone: Tone;
}[] = [
  {
    number: "01",
    title: "Clean Code First",
    description:
      "I believe in writing code that is readable, maintainable, and self-documenting. Good code should tell a story that any developer can understand.",
    icon: "code",
    art: "clean",
    tone: "primary",
  },
  {
    number: "02",
    title: "User-Centric Design",
    description:
      "Technology should serve users, not the other way around. I focus on creating intuitive interfaces that make complex tasks simple.",
    icon: "cursor",
    art: "user",
    tone: "violet",
  },
  {
    number: "03",
    title: "Continuous Learning",
    description:
      "The tech landscape evolves rapidly. I stay current with emerging technologies and best practices to deliver cutting-edge solutions.",
    icon: "book",
    art: "learning",
    tone: "green",
  },
  {
    number: "04",
    title: "Performance Matters",
    description:
      "Every millisecond counts. I optimize applications for speed, ensuring fast load times and smooth user experiences.",
    icon: "bolt",
    art: "performance",
    tone: "orange",
  },
];

// #philosophy (nav: About): the four principles, four across from lg, each
// swinging down on its hinge (`hinge`). Each card has its own tone
// (styles/tone.css): an icon tile and an outlined numeral up top, and a
// small scene at its foot (PhilosophyArt) that draws on once the card
// lands. The cards share four grid rows (subgrid), so their parts align
// across a row. From lg the section is one screen (home.css) and the cards
// take the height under the heading: the text row takes the slack, so the
// scenes sit along the cards' feet, and on tall wide screens everything
// sets a step larger.
export function PhilosophySection() {
  return (
    <section id="philosophy" data-nav="about" className="relative py-16 lg:py-8 short:py-6">
      <div data-reveal="hinge" className="container-site lg:flex lg:flex-1 lg:flex-col">
        <div data-reveal-item className="mb-10 xl:mb-14 short:mb-8">
          <SectionLabel>how i work</SectionLabel>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl xl:text-5xl [@media(min-height:900px)]:xl:text-6xl">
            Engineering{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Philosophy
            </span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:flex-1 lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr_auto] xl:gap-8">
          {principles.map((item) => (
            <article
              key={item.number}
              style={toneStyle(item.tone)}
              className="tone-card group relative row-span-4 grid grid-rows-subgrid gap-0 rounded-2xl border border-border bg-card/60 p-6 xl:p-7 [@media(min-height:900px)]:xl:p-8"
              data-reveal-item
            >
              <Spotlight />
              <span aria-hidden="true" className="tone-hairline" />
              <div className="relative flex items-start justify-between gap-4">
                <span className="tone-tile h-11 w-11 [@media(min-height:900px)]:xl:h-14 [@media(min-height:900px)]:xl:w-14">
                  <Glyph name={item.icon} className="h-5 w-5 [@media(min-height:900px)]:xl:h-6 [@media(min-height:900px)]:xl:w-6" />
                </span>
                <span
                  aria-hidden="true"
                  className="tone-numeral text-5xl font-black leading-none tracking-tight xl:text-6xl [@media(min-height:900px)]:xl:text-7xl"
                >
                  {item.number}
                </span>
              </div>
              <h3 className="relative mb-3 mt-5 text-xl font-semibold text-foreground [@media(min-height:900px)]:xl:mt-8 [@media(min-height:900px)]:xl:text-2xl">
                {item.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground xl:text-base [@media(min-height:900px)]:xl:text-lg">
                {item.description}
              </p>
              <div className="relative self-end pt-6 tight:pt-4">
                <div className="bg-grid rounded-xl border border-border/70 bg-background/40 px-3 py-3 [@media(min-height:900px)]:xl:py-7">
                  <PhilosophyArt name={item.art} className="block h-12 w-full xl:h-14" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
