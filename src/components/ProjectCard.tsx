import Image from "next/image";
import type { Project } from "@/types";
import { WindowDots } from "./WindowDots";

interface ProjectCardProps {
  project: Project;
  /** Make the card a stagger item of the reveal container around it. */
  revealItem?: boolean;
}

// The address-bar text: the live site's hostname, else the repo's.
function hostOf(project: Project) {
  const url = project.liveUrl ?? project.githubUrl;
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// A project framed as a browser window: a title bar with an address pill,
// the cover (when there is one), then the details. The `window` effect in
// styles/motion/work.css targets .window-bar, .window-cover and .window-body.
export function ProjectCard({ project, revealItem = false }: ProjectCardProps) {
  const host = hostOf(project);

  return (
    <article
      data-reveal-item={revealItem ? "" : undefined}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-xl"
    >
      {/* Browser chrome. Decorative: the links below carry the URLs. */}
      <div
        aria-hidden="true"
        className="window-bar flex items-center gap-3 border-b border-border bg-muted/70 px-4 py-3"
      >
        <WindowDots />
        {host && (
          <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border bg-background/80 px-2.5 py-1 font-mono text-xs text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">{host}</span>
          </span>
        )}
      </div>
      {project.image && (
        <div className="window-cover relative aspect-video overflow-hidden border-b border-border bg-muted">
          {/* The cover is an illustration, and the title follows right
              after it, so it's decorative. */}
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1600px) 700px, (min-width: 1024px) 45vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="window-body flex flex-1 flex-col p-6 md:p-8">
        <h3 className="mb-3 text-xl font-semibold text-card-foreground md:text-2xl">
          {project.title}
        </h3>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/70 dark:bg-background/60 dark:text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
