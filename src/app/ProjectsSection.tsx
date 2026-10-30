import type { CSSProperties } from "react";
import { SplitText } from "@/components";
import { projects } from "@/data/projects";
import { ProjectExplorer } from "./ProjectExplorer";

// The command the header types out (the `type` effect in work.css)
const PROMPT = "ls ~/projects";

// #projects: every project on one screen. The header types `ls ~/projects`
// (`type`), then the explorer opens like two browser windows (`window`):
// the list, then the selected project's card. From lg the section is
// exactly one screen tall and the explorer takes what the header leaves.
export function ProjectsSection() {
  return (
    <section
      id="projects"
      data-nav="projects"
      className="snap-fit relative py-16 lg:py-6"
    >
      <div className="snap-body container-site">
        <div
          data-reveal="type"
          className="mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 xl:mb-8"
        >
          <div>
            {/* A decorative shell prompt. --chars sets the typing steps. */}
            <p
              aria-hidden="true"
              className="mb-2 font-mono text-sm text-muted-foreground"
              style={{ "--chars": PROMPT.length + 2 } as CSSProperties}
            >
              <span className="type-line inline-block">
                <span className="text-primary">$</span> {PROMPT}
              </span>
              <span className="type-caret ml-1 inline-block h-[1.15em] w-[1ch] bg-primary/60 align-[-0.2em]" />
            </p>
            {/* Words drop out of their own masks; --si numbers them. */}
            <h2 className="type-title text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              <SplitText text="Projects" />
            </h2>
          </div>
          <p className="type-sub max-w-xl text-base text-muted-foreground lg:text-right xl:text-lg">
            <SplitText
              text={`${projects.length} projects, each with a live link, strongest production work first. Staging hosts are marked.`}
            />
          </p>
        </div>

        <div data-reveal="window" className="explorer-wrap flex min-h-0 flex-col">
          <ProjectExplorer projects={projects} />
        </div>
      </div>
    </section>
  );
}
