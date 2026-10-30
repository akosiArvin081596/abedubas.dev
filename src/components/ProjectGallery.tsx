"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import type { Project } from "@/types";
import { WindowDots } from "./WindowDots";

interface ProjectGalleryProps {
  project: Project;
  /** The live site's hostname, for the address bar and the placeholder. */
  host: string;
}

// A swipe has to travel this far sideways, and mostly sideways, to count.
const SWIPE_MIN = 40;

// The card's title bar and screenshots, as a small gallery. The address bar
// shows the live host plus the current shot's path, so it lives here too.
//
// The frame keeps the cover's size (16:9, or what `.explorer-card` gives it
// in the snap layout, work.css), so changing shots never moves the layout.
// Previous/next buttons sit over the image, and a status strip under it
// holds the caption (a polite live region), "n / total" and a dot per shot.
// ArrowLeft/ArrowRight move between shots while focus is anywhere in the
// gallery, and a sideways swipe on the image does too; touch-action keeps
// vertical page scrolling and pinch zoom with the browser. HomeSnap never
// pages on ArrowLeft/ArrowRight, and the explorer's list keeps the vertical
// arrows, Home and End. Both ends wrap around.
//
// The server renders the first shot. The index changes only in event
// handlers, and ProjectCard keys this by slug, so a new project starts at
// its first shot. Only the current shot and the next one are mounted (plus,
// after a change, the one it came from, under the new one while it fades
// in), so the next is already loaded when it's asked for. Under `.motion`
// the new shot fades in (work.css); without it, it swaps instantly.
// With one shot there are no controls, only the caption; with none, the
// placeholder frame.
export function ProjectGallery({ project, host }: ProjectGalleryProps) {
  const { shots, title } = project;
  const count = shots.length;
  const [{ index, from }, setView] = useState<{ index: number; from: number | null }>({
    index: 0,
    from: null,
  });
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const swipe = useRef<{ id: number; x: number; y: number } | null>(null);

  const go = (to: number) => {
    const target = ((to % count) + count) % count;
    setView((view) => (view.index === target ? view : { index: target, from: view.index }));
    return target;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const target = go(index + step);
    // On a dot, focus follows the selection.
    if (event.target instanceof HTMLElement && event.target.dataset.dot !== undefined) {
      dots.current[target]?.focus();
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch" || !event.isPrimary) return;
    if (event.target instanceof Element && event.target.closest("button")) return;
    swipe.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  };

  // The browser cancels the pointer when it takes the gesture for a
  // vertical scroll or a pinch, so a scroll never changes shots.
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    go(index + (dx < 0 ? 1 : -1));
  };

  const shot = shots[index];
  const many = count > 1;
  const next = many ? (index + 1) % count : null;
  // Mounted, in index order so React never moves a node: the one it came
  // from (under), the current one (on top) and the next (transparent).
  const mounted = [...new Set([from, index, next])]
    .filter((i): i is number => i !== null)
    .sort((a, b) => a - b);

  const address = shot?.path ? `${host}${shot.path}` : host;

  return (
    <>
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
          <span className="truncate">{address}</span>
        </span>
      </div>

      <div
        className="window-gallery flex shrink-0 flex-col border-b border-border"
        role={many ? "group" : undefined}
        aria-roledescription={many ? "carousel" : undefined}
        aria-label={many ? `Screenshots of ${title}` : undefined}
        onKeyDown={many ? onKeyDown : undefined}
      >
        <div
          className={`window-cover relative isolate aspect-video shrink-0 overflow-hidden bg-muted ${
            many ? "touch-pan-y touch-pinch-zoom" : ""
          }`}
          data-moved={from !== null ? "" : undefined}
          onPointerDown={many ? onPointerDown : undefined}
          onPointerUp={many ? onPointerUp : undefined}
          onPointerCancel={
            many
              ? () => {
                  swipe.current = null;
                }
              : undefined
          }
        >
          {shot ? (
            mounted.map((i) => {
              const role = i === index ? "current" : i === from ? "from" : "next";
              return (
                // A screenshot of the live site; the caption under it
                // names it, so the image itself is decorative.
                <Image
                  key={i}
                  src={shots[i].src}
                  alt=""
                  fill
                  sizes="(min-width: 1600px) 900px, (min-width: 1024px) 55vw, 95vw"
                  draggable={false}
                  className={`pointer-events-none object-cover object-top transition-transform duration-300 select-none group-hover:scale-[1.03] ${
                    role === "current"
                      ? `z-[1] ${from !== null ? "shot-in" : ""}`
                      : role === "from"
                        ? "z-0"
                        : "z-0 opacity-0"
                  }`}
                />
              );
            })
          ) : (
            // No screenshot passed review: an empty page in the window,
            // with the host on it.
            <div
              aria-hidden="true"
              className="bg-grid absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/10 via-muted to-accent/10"
            >
              <span className="rounded-lg border border-border bg-background/70 px-3 py-1.5 font-mono text-sm text-muted-foreground backdrop-blur-sm">
                {host}
              </span>
            </div>
          )}

          {many && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() => go(index - 1)}
                className={`${arrow} left-2 sm:left-3`}
              >
                <Chevron className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() => go(index + 1)}
                className={`${arrow} right-2 sm:right-3`}
              >
                <Chevron className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {shot && (
          // The window's status strip: caption, counter and dots.
          <div className="window-strip flex h-8 shrink-0 items-center gap-3 border-t border-border bg-muted/70 pr-2 pl-4 font-mono text-xs text-muted-foreground">
            <p
              className="min-w-0 flex-1 truncate"
              aria-live={many ? "polite" : undefined}
              aria-atomic={many ? "true" : undefined}
            >
              <span className="text-foreground/80">{shot.caption}</span>
              {many && (
                <span className="sr-only">
                  , screenshot {index + 1} of {count}
                </span>
              )}
            </p>
            {many && (
              <>
                <span aria-hidden="true" className="shrink-0 tabular-nums">
                  {index + 1} / {count}
                </span>
                <div className="-my-1 flex shrink-0 items-center">
                  {shots.map((item, i) => {
                    const current = i === index;
                    return (
                      <button
                        key={i}
                        ref={(el) => {
                          dots.current[i] = el;
                        }}
                        type="button"
                        data-dot=""
                        aria-label={`Show screenshot ${i + 1} of ${count}: ${item.caption}`}
                        aria-current={current ? "true" : undefined}
                        onClick={() => go(i)}
                        className="group/dot grid h-6 w-6 place-items-center rounded-md focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-[width,background-color] duration-200 ${
                            current
                              ? "w-4 bg-primary"
                              : "w-1.5 bg-muted-foreground/50 group-hover/dot:bg-foreground/70"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// A round button over the image's left or right edge.
const arrow =
  "absolute top-1/2 z-[2] grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-md backdrop-blur-sm transition-[background-color] hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function Chevron({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
