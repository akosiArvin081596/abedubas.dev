import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Arvin Baghari Edubas, a Web Developer and Software Engineer with expertise in modern web technologies.",
};

const timeline = [
  {
    year: "2024 - Present",
    title: "Senior Full-Stack Developer",
    company: "Enterprise Solutions Inc.",
    description:
      "Leading development of mission-critical web applications using React, Next.js, and Node.js. Architecting scalable solutions for government and enterprise clients.",
  },
  {
    year: "2022 - 2024",
    title: "Full-Stack Developer",
    company: "Tech Startup",
    description:
      "Built and maintained multiple SaaS products. Implemented CI/CD pipelines and improved application performance by 40%.",
  },
  {
    year: "2020 - 2022",
    title: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Developed responsive web applications for diverse clients. Specialized in React and modern CSS frameworks.",
  },
  {
    year: "2019 - 2020",
    title: "Junior Web Developer",
    company: "Local Tech Company",
    description:
      "Started professional career building websites and web applications. Gained foundational experience in HTML, CSS, JavaScript, and PHP.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">About Me</h1>
        <p className="text-lg text-muted-foreground">
          Passionate about building exceptional digital experiences
        </p>
      </div>

      {/* Bio Section */}
      <section className="mb-16">
        <div className="rounded-lg border border-border bg-card p-8">
          <h2 className="mb-4 text-2xl font-semibold text-card-foreground">
            Professional Bio
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              I&apos;m Arvin Baghari Edubas, a Web Developer and Software Engineer with
              over 5 years of experience building modern web applications. I
              specialize in creating scalable, maintainable, and user-friendly
              solutions that solve real business problems.
            </p>
            <p>
              My expertise spans the full stack, from crafting pixel-perfect
              user interfaces with React and Next.js to designing robust backend
              systems with Node.js and various databases. I&apos;m passionate
              about clean code, best practices, and continuous learning.
            </p>
            <p>
              I&apos;ve had the privilege of working with enterprise clients,
              government agencies, and startups, delivering solutions that
              handle high traffic and meet strict security requirements. My
              approach combines technical excellence with a deep understanding
              of user needs.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          Engineering Philosophy
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-lg font-medium text-card-foreground">
              Clean Code First
            </h3>
            <p className="text-sm text-muted-foreground">
              I believe in writing code that is readable, maintainable, and
              self-documenting. Good code should tell a story that any developer
              can understand.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-lg font-medium text-card-foreground">
              User-Centric Design
            </h3>
            <p className="text-sm text-muted-foreground">
              Technology should serve users, not the other way around. I focus
              on creating intuitive interfaces that make complex tasks simple.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-lg font-medium text-card-foreground">
              Continuous Learning
            </h3>
            <p className="text-sm text-muted-foreground">
              The tech landscape evolves rapidly. I stay current with emerging
              technologies and best practices to deliver cutting-edge solutions.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-lg font-medium text-card-foreground">
              Performance Matters
            </h3>
            <p className="text-sm text-muted-foreground">
              Every millisecond counts. I optimize applications for speed,
              ensuring fast load times and smooth user experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          Experience Timeline
        </h2>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="relative border-l-2 border-border pl-6 pb-6 last:pb-0"
            >
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">
                {item.year}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.company}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
