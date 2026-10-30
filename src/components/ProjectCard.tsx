import type { Project } from "@/types";
import { ExternalIcon } from "./icons";
import { ProjectGallery } from "./ProjectGallery";

interface ProjectCardProps {
  project: Project;
  /** Make the card a stagger item of the reveal container around it. */
  revealItem?: boolean;
  /** Extra props for the card's root, such as a tabpanel's role and id. */
  rootProps?: React.HTMLAttributes<HTMLElement> & {
    [data: `data-${string}`]: string | undefined;
  };
  className?: string;
}

// The address-bar text: the live site's hostname.
function hostOf(project: Project) {
  try {
    return new URL(project.liveUrl).hostname;
  } catch {
    return project.liveUrl;
  }
}

// A small mono tag beside the title.
const tag =
  "rounded-md border px-1.5 py-0.5 font-mono text-[11px] leading-4 whitespace-nowrap";

// A project framed as a browser window: a title bar with an address pill,
// the screenshots as a small gallery (ProjectGallery; a placeholder frame
// when there are none), then the details and the one live link. Staging
// hosts get a "staging" badge, and login-only systems say so. The `window`
// effect in styles/motion/work.css targets .window-bar, .window-cover,
// .window-strip and .window-body. The gallery fills whatever height the card
// leaves it (`.explorer-card` in work.css, where the card has a fixed
// height), and its image is 16:9 otherwise. The gallery is keyed by slug,
// so each project starts at its first shot.
export function ProjectCard({
  project,
  revealItem = false,
  rootProps,
  className = "",
}: ProjectCardProps) {
  const host = hostOf(project);
  const staging = project.stage === "staging";

  return (
    <article
      {...rootProps}
      data-reveal-item={revealItem ? "" : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-xl ${className}`}
    >
      <ProjectGallery key={project.slug} project={project} host={host} />
      <div className="window-body flex shrink-0 flex-col p-5 xl:p-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h3 className="mr-1 text-xl font-semibold text-card-foreground xl:text-2xl">
            {project.title}
          </h3>
          {staging && (
            <span className={`${tag} border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300`}>
              staging
            </span>
          )}
          {project.access === "login" && (
            <span className={`${tag} border-border bg-muted text-muted-foreground`}>
              sign-in only
            </span>
          )}
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground xl:text-[0.9375rem]">
          {project.description}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <ul aria-label="Built with" className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground/70 dark:bg-background/60 dark:text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {staging ? "Visit staging site" : "Visit site"}
            <ExternalIcon />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
