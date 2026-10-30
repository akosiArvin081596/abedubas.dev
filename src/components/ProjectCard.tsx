import Image from "next/image";
import type { Project } from "@/types";
import { ExternalIcon } from "./icons";
import { WindowDots } from "./WindowDots";

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
// the cover (a placeholder frame when there's none), then the details and
// the one live link. Staging hosts get a "staging" badge, and login-only
// systems say so. The `window` effect in styles/motion/work.css targets
// .window-bar, .window-cover and .window-body. The cover fills whatever
// height the card leaves it (`.explorer-card` in work.css, where the card
// has a fixed height), and is 16:9 otherwise.
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
      {/* Browser chrome. Decorative: the link below carries the URL. */}
      <div
        aria-hidden="true"
        className="window-bar flex shrink-0 items-center gap-3 border-b border-border bg-muted/70 px-4 py-2.5"
      >
        <WindowDots />
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
      </div>
      <div className="window-cover relative aspect-video shrink-0 overflow-hidden border-b border-border bg-muted">
        {project.image ? (
          // A screenshot of the live site; the title follows right after
          // it, so it's decorative.
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1600px) 900px, (min-width: 1024px) 55vw, 95vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          // No cover passed review: an empty page in the window, with the
          // host on it.
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/10 via-muted to-accent/10"
          >
            <span className="rounded-lg border border-border bg-background/70 px-3 py-1.5 font-mono text-sm text-muted-foreground backdrop-blur-sm">
              {host}
            </span>
          </div>
        )}
      </div>
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
