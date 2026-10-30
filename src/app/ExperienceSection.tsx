import { SectionLabel } from "@/components";
import { Timeline, type TimelineEntry } from "./Timeline";

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

// #experience (nav: About): the work history as a git log (`gitlog`, one
// reveal per commit). From lg the log sits in a pane that scrolls itself
// (.snap-pane in home.css), so the section stays one screen tall and
// HomeSnap leaves a wheel over the pane alone.
export function ExperienceSection() {
  return (
    <section
      id="experience"
      data-nav="about"
      className="snap-fit relative py-16 lg:py-8"
    >
      <div className="snap-body container-site">
        <div
          data-reveal="gitlog"
          className="gitlog-head mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-2"
        >
          <div>
            <SectionLabel>git log --graph</SectionLabel>
            <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl xl:text-5xl">
              Experience{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Timeline
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {timeline.length} commits, newest first
          </p>
        </div>
        <div
          role="region"
          aria-label="Experience timeline"
          tabIndex={0}
          className="snap-pane rounded-xl border border-border bg-card/40 px-4 py-6 sm:px-6 lg:px-8"
        >
          <Timeline items={timeline} />
        </div>
      </div>
    </section>
  );
}
