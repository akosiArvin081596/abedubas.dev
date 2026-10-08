import type { Metadata } from "next";
import { SectionLabel, SplitText } from "@/components";
import { yearsOfExperience } from "@/lib/career";
import { Timeline, type TimelineEntry } from "./Timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Arvin Baghari Edubas, a Web Developer and Software Engineer with expertise in modern web technologies.",
};

const timeline: TimelineEntry[] = [
  {
    year: "2024 - Present",
    title: "Computer Programmer (DRMD-DRIM Section Head)",
    company: "Department of Social Welfare and Development",
    description:
      "Contributing to disaster response efforts by leading the information management section. Focused on building web-based tools that help teams coordinate relief operations, track beneficiaries, and generate reports—all in service of communities when they need it most.",
  },
  {
    year: "2018 - 2024",
    title: "Information Technology Officer",
    company: "Gingoog City Water District",
    description:
      "Supported the organization by managing IT operations and developing systems for billing, customer records, and inventory. A fulfilling role where I could contribute to improving daily workflows and helping deliver reliable service to the community.",
  },
  {
    year: "2017 - 2018",
    title: "Multimedia Officer",
    company: "Axelum Resources Corporation (Coconut Milk Powder)",
    description:
      "Contributed to employee development by creating audio-visual training modules and instructional content. A meaningful experience in using creativity to support learning, safety awareness, and team growth within the organization.",
  },
  {
    year: "2016 - 2017",
    title: "IT Staff / IT Officer",
    company: "Mindanao Forge Company Inc.",
    description:
      "Started my career here, handling IT support and maintenance while also developing the company's first mobile e-commerce app. A valuable learning experience that built my foundation in both technical problem-solving and software development.",
  },
  {
    year: "2016",
    title: "Bachelor of Science in Information Technology",
    company: "Christ the King College",
    description:
      "Completed my degree with a solid foundation in programming, database management, networking, and systems analysis. This education equipped me with the technical knowledge and problem-solving mindset that continues to guide my professional journey.",
  },
  {
    year: "2015 - 2016",
    title: "Software Developer Intern",
    company: "Philippine Long Distance Telephone Company (PLDT)",
    description:
      "Gained hands-on experience in software development during my internship at one of the Philippines' largest telecommunications companies. Worked alongside experienced developers, contributing to internal tools and learning industry-standard practices in a corporate environment.",
  },
  {
    year: "2013 - 2016",
    title: "Freelance Web Developer",
    company: "OnlineJobs.ph",
    description:
      "Worked as a freelance web developer while pursuing my degree, building websites and web applications for international clients. This experience taught me self-discipline, client communication, and time management—balancing real-world projects with academic responsibilities to support my studies.",
  },
];

// Quick facts for the bio's side column, all drawn from the bio itself and
// the contact page.
const facts = [
  { label: "Experience", value: `${yearsOfExperience()}+ years` },
  { label: "Frontend", value: "Vue · Nuxt.js · React · Next.js" },
  { label: "Backend", value: "Laravel · Node.js" },
  { label: "Based in", value: "Philippines" },
];

export default function AboutPage() {
  const philosophyItems = [
    {
      title: "Clean Code First",
      description:
        "I believe in writing code that is readable, maintainable, and self-documenting. Good code should tell a story that any developer can understand.",
      number: "01",
    },
    {
      title: "User-Centric Design",
      description:
        "Technology should serve users, not the other way around. I focus on creating intuitive interfaces that make complex tasks simple.",
      number: "02",
    },
    {
      title: "Continuous Learning",
      description:
        "The tech landscape evolves rapidly. I stay current with emerging technologies and best practices to deliver cutting-edge solutions.",
      number: "03",
    },
    {
      title: "Performance Matters",
      description:
        "Every millisecond counts. I optimize applications for speed, ensuring fast load times and smooth user experiences.",
      number: "04",
    },
  ];

  return (
    <div className="container-site py-16 lg:py-24">
      {/* Header: `letters`, on load */}
      <div
        className="mb-20 text-center lg:mb-28"
        data-reveal="letters"
        data-reveal-on="load"
      >
        <SectionLabel className="letters-label mb-4">
          Get to know me
        </SectionLabel>
        <h1 className="mb-4 text-5xl font-bold text-foreground md:text-7xl lg:text-8xl">
          <SplitText text="About" by="char" />{" "}
          <span className="text-primary">
            <SplitText text="Me" by="char" start={5} />
          </span>
        </h1>
        <div className="letters-bar mx-auto mt-8 h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Bio: `highlight`. A side column of quick facts stays in view while
          the bio reads at a comfortable measure beside it. */}
      <section
        className="mb-24 grid gap-10 lg:mb-32 lg:grid-cols-12 lg:gap-16"
        data-reveal="highlight"
      >
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              className="highlight-side mb-8 inline-flex items-center gap-3 text-2xl font-semibold text-foreground lg:text-3xl"
              data-reveal-item
            >
              <span className="h-px w-8 bg-primary" />
              Professional Bio
            </h2>
            <dl
              className="highlight-side space-y-4 border-l border-border pl-5 text-sm"
              data-reveal-item
            >
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <span
            aria-hidden="true"
            className="highlight-quote absolute -left-6 -top-10 hidden select-none text-8xl font-bold text-primary/10 md:block"
          >
            &ldquo;
          </span>
          <div className="max-w-[68ch] space-y-6 text-lg leading-relaxed text-muted-foreground lg:text-xl lg:leading-relaxed">
            <div className="highlight-line" data-reveal-item>
              <p>
                <span className="text-foreground font-medium">
                  I&apos;m Arvin Baghari Edubas
                </span>
                , a web developer and software engineer with{" "}
                {yearsOfExperience()}+ years of experience building modern web
                applications. I focus on creating
                scalable, maintainable, and user-friendly products that solve
                real business problems.
              </p>
            </div>
            <div className="highlight-line" data-reveal-item>
              <p>
                I work across the stack—crafting thoughtful interfaces with{" "}
                <span className="text-primary font-medium">Vue</span> and{" "}
                <span className="text-primary font-medium">Nuxt.js</span>, and
                also building with{" "}
                <span className="text-primary font-medium">React</span> and{" "}
                <span className="text-primary font-medium">Next.js</span> when
                needed. On the backend, I develop{" "}
                <span className="text-primary font-medium">Laravel</span>-based
                RESTful APIs and build reliable services with{" "}
                <span className="text-primary font-medium">Node.js</span>,
                supported by relational and non-relational databases. I care a
                lot about clean code, practical best practices, and shipping
                work that&apos;s easy to maintain.
              </p>
            </div>
            <div className="highlight-line" data-reveal-item>
              <p>
                To move faster without sacrificing quality, I also use AI tools
                as a coding partner:{" "}
                <span className="text-primary font-medium">Claude Code</span> in
                the terminal and{" "}
                <span className="text-primary font-medium">Cursor AI</span> in
                the editor, like a peer reviewer for ideas, refactors, edge
                cases, and documentation. I stay accountable for the final
                decisions, architecture, and code quality.
              </p>
            </div>
            <div className="highlight-line" data-reveal-item>
              <p>
                I&apos;ve collaborated with enterprise teams, government
                agencies, and startups to deliver solutions built for real-world
                constraints: security, performance, and reliability at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy: `hinge`, four across on wide screens */}
      <section className="mb-24 lg:mb-32" data-reveal="hinge">
        <h2
          className="mb-12 inline-flex items-center gap-3 text-2xl font-semibold text-foreground lg:text-3xl"
          data-reveal-item
        >
          <span className="h-px w-8 bg-primary" />
          Engineering Philosophy
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {philosophyItems.map((item) => (
            <div
              key={item.number}
              className="group relative rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40 lg:p-8"
              data-reveal-item
            >
              <span className="block text-5xl font-black leading-none text-primary/20 transition-colors group-hover:text-primary/60">
                {item.number}
              </span>
              <span className="mt-4 mb-5 block h-px w-12 bg-gradient-to-r from-primary/40 to-transparent transition-colors group-hover:from-primary" />
              <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Timeline: `gitlog`, one reveal per commit */}
      <section>
        <h2
          className="gitlog-head mb-12 inline-flex items-center gap-3 text-2xl font-semibold text-foreground lg:mb-16 lg:text-3xl"
          data-reveal="gitlog"
        >
          <span className="h-px w-8 bg-primary" />
          Experience Timeline
        </h2>
        <Timeline items={timeline} />
      </section>
    </div>
  );
}
