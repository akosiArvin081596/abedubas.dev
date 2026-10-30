"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { glideTo, HEADER } from "@/lib/glide";
import type { Project } from "@/types";

// Below lg the card stacks under the list, often off screen, so a pick
// brings the card into view: the least scroll that shows it whole under the
// header (or its top, if it's taller than the screen). With motion the page
// glides there (lib/glide.ts); without, it jumps. Run a frame after the
// click, once React has rendered the new card, so its height is current.
const showCard = () => {
  if (!window.matchMedia("(max-width: 1023px)").matches) return;
  requestAnimationFrame(() => {
    const card = document.getElementById("project-panel");
    if (!card) return;
    const { top, bottom } = card.getBoundingClientRect();
    if (top >= HEADER && bottom <= window.innerHeight) return;
    const by = top < HEADER ? top - HEADER : Math.min(top - HEADER, bottom - window.innerHeight);
    const to = Math.round(window.scrollY + by);
    if (document.documentElement.classList.contains("motion")) glideTo(to);
    else window.scrollTo({ top: to, behavior: "instant" });
  });
};

interface ProjectExplorerProps {
  projects: Project[];
}

// Every project on one screen: `ls ~/projects` output down the left, one
// row per project, and the selected one's browser-window card on the
// right. Stacked on phones, list first.
//
// The list is a vertical tablist with a roving tabindex: ArrowUp/ArrowDown,
// Home and End move the selection (and call preventDefault, so HomeSnap
// doesn't page the document). It scrolls itself, so HomeSnap leaves a
// wheel over it alone. The server renders the first project selected; the
// selection only ever changes in event handlers. Stacked, below lg, a
// click on a project also brings its card into view (showCard).
//
// The list and the card are the `window` reveal's two items, so both open
// like browser windows on the first reveal. After the first switch the
// card carries data-swapped, which takes it out of the entrance (work.css),
// so new content just swaps in.
export function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const [selected, setSelected] = useState(0);
  const [swapped, setSwapped] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    setSelected(index);
    if (index !== selected) setSwapped(true);
    if (focus) {
      const tab = tabs.current[index];
      tab?.focus({ preventScroll: true });
      tab?.scrollIntoView({ block: "nearest" });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = projects.length - 1;
    const to =
      event.key === "ArrowDown"
        ? Math.min(selected + 1, last)
        : event.key === "ArrowUp"
          ? Math.max(selected - 1, 0)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (to === null) return;
    event.preventDefault();
    select(to, true);
  };

  const project = projects[selected];
  const tabId = (slug: string) => `project-tab-${slug}`;

  return (
    <div className="explorer grid min-h-0 gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-8 xl:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      {/* The list: `ls -l ~/projects`, as a terminal prints it */}
      <div
        data-reveal-item
        className="explorer-list relative flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-card/70 font-mono text-sm backdrop-blur-md"
      >
        <p
          aria-hidden="true"
          className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-muted/70 px-4 py-2.5 text-xs text-muted-foreground"
        >
          <span>
            total {projects.length}
          </span>
          <span>↑↓ to browse</span>
        </p>
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Projects"
          className="explorer-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5"
        >
          {projects.map((item, index) => {
            const isSelected = index === selected;
            return (
              <button
                key={item.slug}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={tabId(item.slug)}
                aria-selected={isSelected}
                aria-controls="project-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  select(index);
                  showCard();
                }}
                onKeyDown={onKeyDown}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-1.5 text-left transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-foreground ring-1 ring-inset ring-primary/40"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`w-3 shrink-0 ${isSelected ? "text-primary" : "text-transparent"}`}
                >
                  ›
                </span>
                <span className="min-w-0 flex-1 truncate">
                  <span className="font-semibold text-sky-600 dark:text-sky-400">
                    {item.slug}
                  </span>
                  <span aria-hidden="true" className="text-muted-foreground">
                    /
                  </span>
                  <span className="sr-only">, {item.title}</span>
                </span>
                {item.stage === "staging" && (
                  <span className="shrink-0 rounded border border-amber-500/40 bg-amber-500/10 px-1 text-[10px] leading-4 text-amber-700 dark:text-amber-300">
                    staging
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <ProjectCard
        project={project}
        revealItem
        className="explorer-card min-h-0"
        rootProps={{
          role: "tabpanel",
          id: "project-panel",
          "aria-labelledby": tabId(project.slug),
          tabIndex: 0,
          "data-swapped": swapped ? "" : undefined,
        }}
      />
    </div>
  );
}
