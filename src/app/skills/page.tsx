import type { Metadata } from "next";
import { SectionLabel, SkillBadge } from "@/components";
import { Decode } from "@/components/Decode";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills and expertise of Arvin Baghari Edubas in frontend, backend, database, and DevOps technologies.",
};

const skillCategories = [
  {
    category: "Frontend",
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
    // Highlighted. With Cybersecurity beside it, the six cards fill three
    // rows of two.
    featured: true,
  },
];

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

// Inline stagger index for the on-load header (see styles/motion/core.css)
const at = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function SkillsPage() {
  return (
    <div className="container-site py-16 md:py-24">
      {/* Header */}
      <div
        data-reveal="decode"
        data-reveal-on="load"
        className="mb-16 text-center md:mb-24"
      >
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          <Decode text="Skills & Expertise" />
        </h1>
        <p
          className="decode-sub mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl"
          style={at(1)}
        >
          A comprehensive toolkit built over years of professional experience
          across various technologies and domains
        </p>
      </div>

      {/* Core Strengths */}
      <section data-reveal="scan" className="mb-20 md:mb-28">
        <div data-reveal-item className="scan-sweep mb-8 w-fit">
          <SectionLabel>core strengths</SectionLabel>
          <h2 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
            Core Strengths
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {coreStrengths.map((strength, index) => (
            <div
              key={strength.title}
              data-reveal-item
              className="scan-card relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 md:p-8"
            >
              <div className="scan-sweep">
                <span
                  aria-hidden="true"
                  className="mb-6 block font-mono text-xs text-muted-foreground"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-lg font-medium text-card-foreground md:text-xl">
                  {strength.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {strength.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section>
        <div data-reveal="wipe" className="relative mb-8 w-fit">
          <SectionLabel>technical skills</SectionLabel>
          <h2 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
            Technical Skills
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              data-reveal="wipe"
              className={`relative rounded-xl border bg-card p-6 transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-lg md:p-8 ${
                category.featured
                  ? "border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card"
                  : "border-border"
              }`}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground md:text-2xl">
                    {category.category}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground md:text-base">
                    {category.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  {category.skills.length} skills
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} revealItem />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
