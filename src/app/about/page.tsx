import type { Metadata } from "next";
import { ScrollReveal } from "@/components";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Arvin Baghari Edubas, a Web Developer and Software Engineer with expertise in modern web technologies.",
};

const timeline = [
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
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <ScrollReveal animation="fade-down" duration={800}>
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Get to know me
          </span>
          <h1 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
            About <span className="text-primary">Me</span>
          </h1>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </ScrollReveal>

      {/* Bio Section */}
      <section className="mb-20">
        <ScrollReveal animation="fade-up" duration={800} delay={100}>
          <div className="relative">
            <span className="absolute -left-4 top-0 text-8xl font-bold text-primary/10 select-none hidden md:block">
              &ldquo;
            </span>
            <h2 className="mb-6 inline-flex items-center gap-3 text-2xl font-semibold text-foreground">
              <span className="h-px w-8 bg-primary" />
              Professional Bio
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:pl-8">
              <p>
                <span className="text-foreground font-medium">
                  I&apos;m Arvin Baghari Edubas
                </span>
                , a web developer and software engineer with 5+ years of
                experience building modern web applications. I focus on creating
                scalable, maintainable, and user-friendly products that solve
                real business problems.
              </p>
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
              <p>
                To move faster without sacrificing quality, I also use AI tools
                as a coding partner—like a peer reviewer for ideas, refactors,
                edge cases, and documentation. I stay accountable for the final
                decisions, architecture, and code quality.
              </p>
              <p>
                I&apos;ve collaborated with enterprise teams, government
                agencies, and startups to deliver solutions built for real-world
                constraints: security, performance, and reliability at scale.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Philosophy Section */}
      <section className="mb-20">
        <ScrollReveal animation="blur-in" duration={800}>
          <h2 className="mb-10 inline-flex items-center gap-3 text-2xl font-semibold text-foreground">
            <span className="h-px w-8 bg-primary" />
            Engineering Philosophy
          </h2>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-2">
          {philosophyItems.map((item, index) => (
            <ScrollReveal
              key={index}
              animation={index % 2 === 0 ? "fade-right" : "fade-left"}
              delay={index * 150}
              duration={700}
              easing="bounce"
            >
              <div className="group relative pl-16 py-4 border-b border-border/50 hover:border-primary/30 transition-all">
                <div className="absolute left-0 top-4 flex flex-col items-center">
                  <span className="text-5xl font-black text-primary/20 group-hover:text-primary/60 transition-colors leading-none">
                    {item.number}
                  </span>
                  <span className="mt-1 h-8 w-px bg-gradient-to-b from-primary/40 to-transparent group-hover:from-primary transition-colors" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section>
        <ScrollReveal animation="blur-in" duration={800}>
          <h2 className="mb-10 inline-flex items-center gap-3 text-2xl font-semibold text-foreground">
            <span className="h-px w-8 bg-primary" />
            Experience Timeline
          </h2>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent" />
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <ScrollReveal
                key={index}
                animation="slide-left"
                delay={index * 200}
                duration={800}
                easing="elastic"
              >
                <div className="group relative pl-10">
                  <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background transition-all group-hover:scale-125 group-hover:bg-primary" />
                  <div className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">
                      {item.year}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.company}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
