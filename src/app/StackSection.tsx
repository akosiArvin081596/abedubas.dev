import { Glyph, SectionLabel, SkillBadge, type GlyphName } from "@/components";
import { toneStyle, type Tone } from "@/lib/tone";
import { Spotlight } from "./Spotlight";

// A generic mark for each skill without a brand logo in data/brand-marks.ts:
// the conceptual skills, and AWS, Playwright and ChatGPT, which
// simple-icons doesn't carry.
const glyphs: Record<string, GlyphName> = {
  "REST APIs": "braces",
  SQL: "database",
  "Database Design": "schema",
  AWS: "cloud",
  "CI/CD": "pipeline",
  Playwright: "flask",
  "Secure Coding": "shield",
  "Authentication & Authorization": "key",
  "Access Control": "lock",
  "SSL/TLS": "certificate",
  "Network Security": "globe",
  ChatGPT: "chat",
  "AI Pair Programming": "users",
  "AI Code Review": "eye",
  "AI-Assisted Refactoring": "refactor",
  "Edge-Case Discovery": "alert",
  "AI-Assisted Documentation": "doc",
};

// `path` is the category's folder in the card's mono path line
// (~/stack/<path>), echoing the hero terminal and What I Do's `ls` lines.
const skillCategories: {
  category: string;
  path: string;
  icon: GlyphName;
  tone: Tone;
  description: string;
  skills: string[];
  featured?: boolean;
}[] = [
  {
    category: "Frontend",
    path: "frontend",
    icon: "monitor",
    tone: "accent",
    description: "Building beautiful, responsive, and accessible user interfaces",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux",
      "React Query",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    path: "backend",
    icon: "server",
    tone: "green",
    description: "Developing scalable and secure server-side applications",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Python",
      "Django",
      "FastAPI",
      "PHP",
      "Laravel",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    category: "Database",
    path: "database",
    icon: "database",
    tone: "orange",
    description: "Designing efficient data storage and retrieval systems",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Prisma",
      "Drizzle ORM",
      "SQL",
      "Database Design",
    ],
  },
  {
    category: "Tools & DevOps",
    path: "devops",
    icon: "pipeline",
    tone: "violet",
    description: "Streamlining development and deployment processes",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "AWS",
      "Vercel",
      "CI/CD",
      "Linux",
      "Nginx",
      "Jest",
      "Playwright",
    ],
  },
  {
    category: "Cybersecurity",
    path: "security",
    icon: "shield",
    tone: "red",
    description:
      "Building and running systems with security in mind, from the first line of code to production",
    skills: [
      "Secure Coding",
      "OWASP Top 10",
      "Authentication & Authorization",
      "Access Control",
      "SSL/TLS",
      "Network Security",
    ],
  },
  {
    category: "AI-Assisted Development",
    path: "ai",
    icon: "sparkle",
    tone: "primary",
    description:
      "Pairing with AI as a coding peer for ideas, refactors, edge cases, and documentation, while I own the final decisions",
    skills: [
      "Claude Code (CLI)",
      "Cursor AI",
      "Gemini",
      "ChatGPT",
      "AI Pair Programming",
      "AI Code Review",
      "AI-Assisted Refactoring",
      "Edge-Case Discovery",
      "AI-Assisted Documentation",
    ],
    // Highlighted. It closes the grid's last row, beside Cybersecurity.
    featured: true,
  },
];

// #stack (nav: Skills): the six skill categories as a 3x2 grid from lg,
// with compact badges so the grid fits one screen (`short:` and `tight:`
// trim the spacing on short screens). Each card has its own tone
// (styles/tone.css): an icon tile, the category's mono path, and skill
// chips that carry each brand's logo in monochrome, colored on hover
// (SkillBadge). Each card, and the heading, gets its own `wipe` panel.
//
// In the snap layout (lg, at least 700px tall) the grid takes the height the
// heading leaves, the two rows sharing what their content doesn't use, and
// each card runs from its header down to a footer (the skill count) pinned
// to its bottom edge. The rows stay auto, not 1fr: equal rows would all
// match the tall AI card and push the section past one screen. `tight:`
// screens have no height to spare for the footer, so there the count stays
// a pill in the card's header, as it is below lg.
//
// `mid` covers narrow laptops (lg to xl, under 1280px wide) between
// `short:` (820px) and 960px tall: too tall for `short:` and too narrow for
// the full spacing, because the cards wrap their badges onto more rows
// there. It takes `short:`'s spacing and `tight:`'s header pill.
const mid = {
  head: "[@media(max-width:1279px)_and_(min-height:821px)_and_(max-height:959px)]:lg:mb-3",
  title: "[@media(max-width:1279px)_and_(min-height:821px)_and_(max-height:959px)]:lg:mt-1 [@media(max-width:1279px)_and_(min-height:821px)_and_(max-height:959px)]:lg:text-3xl",
  grid: "[@media(max-width:1279px)_and_(min-height:821px)_and_(max-height:959px)]:lg:gap-4",
  card: "[@media(max-width:1279px)_and_(min-height:821px)_and_(max-height:959px)]:lg:p-4",
  cardHead: "[@media(max-width:1279px)_and_(min-height:821px)_and_(max-height:959px)]:lg:mb-3",
  badges: "[@media(max-width:1279px)_and_(min-height:821px)_and_(max-height:959px)]:lg:gap-1.5",
  pill: "[@media(max-width:1279px)_and_(min-height:821px)_and_(max-height:959px)]:lg:inline",
  footer: "[@media(max-width:1279px)_and_(min-height:821px)_and_(max-height:959px)]:lg:hidden",
};

export function StackSection() {
  return (
    <section id="stack" data-nav="skills" className="relative py-16 lg:py-6 tight:py-5">
      <div className="container-site lg:flex lg:flex-1 lg:flex-col">
        <div data-reveal="wipe" className={`relative mb-6 w-fit xl:mb-8 short:mb-4 tight:mb-3 ${mid.head}`}>
          <SectionLabel>technical skills</SectionLabel>
          <h2 className={`mt-2 text-3xl font-bold text-foreground sm:text-4xl short:mt-1 short:text-3xl tight:text-2xl ${mid.title}`}>
            Technical Skills
          </h2>
        </div>
        <div className={`grid gap-5 md:grid-cols-2 lg:flex-1 lg:grid-cols-3 xl:gap-6 short:gap-4 tight:gap-3 ${mid.grid}`}>
          {skillCategories.map((category) => (
            <div
              key={category.category}
              data-reveal="wipe"
              style={toneStyle(category.tone)}
              className={`tone-card relative flex flex-col rounded-2xl border p-5 xl:p-6 short:p-4 tight:p-3 ${mid.card} ${
                category.featured
                  ? "border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card"
                  : "border-border bg-card"
              }`}
            >
              <Spotlight />
              <span aria-hidden="true" className="tone-hairline" />
              <div className={`relative mb-4 flex items-start justify-between gap-3 short:mb-3 tight:mb-2.5 ${mid.cardHead}`}>
                <div className="flex min-w-0 items-center gap-3">
                  <span className="tone-tile h-10 w-10 short:h-9 short:w-9 tight:h-8 tight:w-8">
                    <Glyph name={category.icon} className="h-5 w-5 tight:h-4 tight:w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold leading-snug text-card-foreground xl:text-xl tight:text-base">
                      {category.category}
                    </h3>
                    <p aria-hidden="true" className="truncate font-mono text-[11px] leading-4 text-muted-foreground">
                      <span className="tone-text">~/stack/</span>
                      {category.path}
                    </p>
                  </div>
                </div>
                {/* The count heads the card below lg, on the shortest
                    screens and in the `mid` band, where the grid has no
                    height to spare; from lg it's otherwise the card's
                    footer. Only one of the two is ever displayed. */}
                <span className={`shrink-0 rounded-md border border-border bg-background/50 px-2 py-0.5 font-mono text-xs text-muted-foreground lg:hidden tight:inline ${mid.pill}`}>
                  {category.skills.length} skills
                </span>
              </div>
              {/* On short screens only the badges show; screen readers
                  still get the line. The line needs more height than
                  `short:` allows for: the narrower the grid, the more the
                  line and the badges wrap. */}
              <p className="relative mb-4 text-sm text-muted-foreground short:sr-only [@media(max-height:869px),(max-width:1399px)_and_(max-height:959px),(max-width:1279px)_and_(max-height:1079px)]:lg:sr-only">
                {category.description}
              </p>
              <div className={`relative flex flex-wrap gap-2 short:gap-1.5 ${mid.badges}`}>
                {category.skills.map((skill) => (
                  <SkillBadge
                    key={skill}
                    name={skill}
                    glyph={glyphs[skill]}
                    revealItem
                    compact
                  />
                ))}
              </div>
              {/* The footer: a ruled line ending in the skill count, pinned
                  to the card's bottom when the grid stretches it. */}
              <p className={`relative mt-auto hidden items-center gap-2 pt-4 font-mono text-[11px] leading-4 text-muted-foreground lg:flex short:pt-3 tight:hidden ${mid.footer}`}>
                <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-border" />
                <span>
                  <span className="tone-text">{category.skills.length}</span> skills
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
