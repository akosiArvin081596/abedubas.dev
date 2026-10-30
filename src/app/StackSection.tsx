import { SectionLabel, SkillBadge } from "@/components";

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
    // Highlighted. It closes the grid's last row, beside Cybersecurity.
    featured: true,
  },
];

// #stack (nav: Skills): the six skill categories as a 3x2 grid from lg,
// with compact badges so the grid fits one screen (`short:` and `tight:`
// trim the spacing on short screens). Each card, and the heading, gets its
// own `wipe` panel.
export function StackSection() {
  return (
    <section id="stack" data-nav="skills" className="relative py-16 lg:py-8 tight:py-5">
      <div className="container-site">
        <div data-reveal="wipe" className="relative mb-6 w-fit xl:mb-8 short:mb-4">
          <SectionLabel>technical skills</SectionLabel>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl short:mt-1 short:text-3xl">
            Technical Skills
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 short:gap-4 tight:gap-3">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              data-reveal="wipe"
              className={`relative rounded-xl border bg-card p-5 transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-lg xl:p-6 short:p-4 tight:p-3 ${
                category.featured
                  ? "border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card"
                  : "border-border"
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-4 short:mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground xl:text-xl">
                    {category.category}
                  </h3>
                  {/* On short screens only the badges show; screen
                      readers still get the line. */}
                  <p className="mt-1 text-sm text-muted-foreground short:sr-only">
                    {category.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  {category.skills.length} skills
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} revealItem compact />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
