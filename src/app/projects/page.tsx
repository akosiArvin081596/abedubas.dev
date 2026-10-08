import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard, SplitText } from "@/components";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio of web development and software engineering projects by Arvin Baghari Edubas.",
};

// The command the header types out (the `type` effect in work.css)
const PROMPT = "ls ~/projects";

export default function ProjectsPage() {
  return (
    <div className="container-site py-16 md:py-24">
      {/* Header */}
      <div
        data-reveal="type"
        data-reveal-on="load"
        className="mb-16 text-center md:mb-24"
      >
        {/* A decorative shell prompt. --chars sets the typing steps. */}
        <p
          aria-hidden="true"
          className="mb-6 font-mono text-sm text-muted-foreground md:text-base"
          style={{ "--chars": PROMPT.length + 2 } as React.CSSProperties}
        >
          <span className="type-line inline-block">
            <span className="text-primary">$</span> {PROMPT}
          </span>
          <span className="type-caret ml-1 inline-block h-[1.15em] w-[1ch] bg-primary/60 align-[-0.2em]" />
        </p>
        {/* Words drop out of their own masks; --si numbers them. */}
        <h1 className="type-title mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          <SplitText text="Projects" />
        </h1>
        <p className="type-sub mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
          <SplitText text="A selection of projects I've worked on, showcasing my expertise in full-stack development and system design" />
        </p>
      </div>

      {/* Projects Grid */}
      <div data-reveal="window" className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} revealItem />
        ))}
      </div>

      {/* CTA Section */}
      <section className="mt-20 text-center md:mt-28">
        <div
          data-reveal="trace"
          className="relative rounded-xl border border-border bg-card px-6 py-12 transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-lg md:px-12 md:py-16"
        >
          <div className="trace-content">
            <h2 className="mb-4 text-2xl font-semibold text-card-foreground md:text-4xl">
              Interested in working together?
            </h2>
            <p className="mb-8 text-muted-foreground md:text-lg">
              I&apos;m always open to discussing new projects and
              opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover md:px-8 md:text-base"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
