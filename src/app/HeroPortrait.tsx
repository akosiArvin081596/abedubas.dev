"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

// The hero's photos (public/images/hero), all 4:5 crops, shown whole in a
// 4:5 frame.
const SLIDES = [
  {
    src: "/images/hero/speaking.jpg",
    file: "speaking.jpg",
    alt: "Arvin Baghari Edubas speaking at an event",
  },
  {
    src: "/images/hero/workspace.jpg",
    file: "workspace.jpg",
    alt: "Arvin Baghari Edubas at work",
  },
  {
    src: "/images/hero/studio-blue.jpg",
    file: "studio-blue.jpg",
    alt: "Studio portrait of Arvin Baghari Edubas in a light blue shirt",
  },
  {
    src: "/images/hero/studio-black.jpg",
    file: "studio-black.jpg",
    alt: "Studio portrait of Arvin Baghari Edubas in a black T-shirt",
  },
];

// The first photo shrunk to 12, 24 and 48 pixels wide, for its
// terminal-style render. Each pass prints over the one before, a row of
// blocks at a time: `at` is when it starts after --t, `ms` how long it runs.
const PASSES = [
  { width: 12, rows: 15, at: 0, ms: 420 },
  { width: 24, rows: 30, at: 360, ms: 520 },
  { width: 48, rows: 60, at: 820, ms: 640 },
] as const;

// The frame is at most the pane's width, and narrower when the pane is
// short, so these are upper bounds.
const SIZES = "(min-width: 1536px) 608px, (min-width: 1024px) 38vw, 92vw";

const pauseIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
    <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
  </svg>
);

const playIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
    <path d="M7.5 5.14v13.72a1 1 0 0 0 1.5.86l10-6.86a1 1 0 0 0 0-1.72l-10-6.86a1 1 0 0 0-1.5.86Z" />
  </svg>
);

const nextIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.25}
    className="h-3 w-3"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
  </svg>
);

// The hero's photos, as `imgcat` prints them in the terminal's left pane:
// whole, in a 4:5 frame as large as fits its parent, centered in it.
//
// With motion on, the first photo renders in like a terminal image: three
// pixelated passes print top to bottom, each sharper than the last, then
// the photo wipes down behind a scan line (the `boot` effect in
// styles/motion/home.css; the passes sit under the photo, so without motion
// only the photo shows).
//
// Once the hero's entrance has finished, it becomes a slideshow. The other
// photos load then, a caption bar shows the file name with pause and next
// buttons, and each photo prints down over the last behind the scan line.
// A progress line times each photo: the next one comes when it finishes, so
// pausing it (hover, focus or the button) pauses the slideshow. It only
// runs with motion on; with reduced motion the buttons still switch photos.
export function HeroPortrait() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [changed, setChanged] = useState(false);
  const [paused, setPaused] = useState(false);

  // Start once the hero's entrance has played: every one-shot animation in
  // its reveal container (loops, like the buttons' shimmer, don't count).
  // The promises wait out the loading screen and the route curtain too.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let active = true;
    const hero = frame.closest<HTMLElement>("[data-reveal]") ?? frame;
    const entrance = hero
      .getAnimations({ subtree: true })
      .filter((animation) => animation.effect?.getTiming().iterations === 1)
      .map((animation) => animation.finished);
    const start = () => {
      if (active) setStarted(true);
    };
    Promise.all(entrance).then(start, start);
    return () => {
      active = false;
    };
  }, []);

  const next = () => {
    setChanged(true);
    setIndex((current) => (current + 1) % SLIDES.length);
  };

  const previous = (index - 1 + SLIDES.length) % SLIDES.length;

  return (
    <div className="absolute inset-0 grid place-items-center [container-type:size]">
      {/* The photos carry a baked-in watermark. Blocking the context menu
          and dragging here only stops casual saving. */}
      <div
        ref={frameRef}
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
        className="imgcat relative aspect-[4/5] w-[min(100cqw,80cqh)] select-none overflow-hidden rounded-lg bg-[#060a14] ring-1 ring-white/10"
      >
        {PASSES.map((pass) => (
          <Image
            key={pass.width}
            src={`/images/hero/mosaic-${pass.width}.png`}
            alt=""
            aria-hidden="true"
            width={pass.width}
            height={pass.rows}
            unoptimized
            loading="eager"
            className="imgcat-pass absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
            style={
              {
                "--rows": pass.rows,
                "--pass-at": `${pass.at}ms`,
                "--pass-ms": `${pass.ms}ms`,
              } as CSSProperties
            }
          />
        ))}

        {SLIDES.map((slide, k) => {
          // The other photos load once the slideshow starts.
          if (k > 0 && !started) return null;
          const state =
            k === index
              ? "current"
              : changed && k === previous
                ? "previous"
                : "idle";
          return (
            <div
              key={slide.src}
              data-state={state}
              data-enter={changed && k === index ? "" : undefined}
              aria-hidden={k !== index}
              // The first photo's own entrance is the boot's render, until the
              // slideshow first moves on.
              className={`slide absolute inset-0${k === 0 && !changed ? " imgcat-photo" : ""}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={SIZES}
                quality={90}
                preload={k === 0}
                className="object-cover"
              />
            </div>
          );
        })}

        {/* The scan line that leads each print down: the first photo's in the
            boot, and a fresh one for every photo after. Parked out of view
            otherwise. */}
        <span
          key={changed ? `scan-${index}` : "scan"}
          aria-hidden="true"
          className={`${changed ? "slide-scan" : "imgcat-scan"} pointer-events-none absolute inset-0 z-[5]`}
        />

        {started && (
          <div className="slide-bar absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pb-2.5 pt-12 font-mono text-[11px] text-slate-200">
            <span className="truncate pb-1">
              <span aria-hidden="true" className="text-green-400">
                ~/photos/
              </span>
              {SLIDES[index].file}
            </span>
            <span className="flex shrink-0 items-center gap-1">
              <span aria-hidden="true" className="mr-1 tabular-nums text-slate-400">
                {index + 1}/{SLIDES.length}
              </span>
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? "Play the photo slideshow" : "Pause the photo slideshow"}
                className="grid h-7 w-7 place-items-center rounded text-slate-300 transition-colors hover:bg-white/15 hover:text-white"
              >
                {paused ? playIcon : pauseIcon}
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="grid h-7 w-7 place-items-center rounded text-slate-300 transition-colors hover:bg-white/15 hover:text-white"
              >
                {nextIcon}
              </button>
            </span>
            {/* Times the photo on show; the next one comes when it fills. */}
            <span
              key={index}
              aria-hidden="true"
              data-paused={paused ? "" : undefined}
              onAnimationEnd={next}
              className="slide-progress absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-sky-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
