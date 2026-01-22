import type { Metadata } from "next";
import { SkillBadge } from "@/components";

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

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">
          Skills & Expertise
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          A comprehensive toolkit built over years of professional experience
          across various technologies and domains
        </p>
      </div>

      {/* Core Strengths */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          Core Strengths
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {coreStrengths.map((strength) => (
            <div
              key={strength.title}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h3 className="mb-2 text-lg font-medium text-card-foreground">
                {strength.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          Technical Skills
        </h2>
        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-card-foreground">
                  {category.category}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
