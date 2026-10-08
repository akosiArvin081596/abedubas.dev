"use client";

import { useEffect } from "react";

// The sticky header's height (4.5rem), which each section starts under.
const HEADER = 72;
// How long a glide of one screen takes, in ms. Longer moves take a little
// longer, shorter ones a little less.
const DURATION = 900;
// A wheel stream quiet for this long has ended, a trackpad's momentum
// included.
const QUIET_MS = 180;
// Wheel deltas smaller than this are noise.
const MIN_DELTA = 4;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

// The home page's sections are a screen tall each, and this pages through
// them: each wheel or trackpad gesture glides the page one section up or
// down, eased in and out. The rest of that gesture's stream, a trackpad's
// momentum included, is swallowed, so one flick never skips two sections.
// PageUp/PageDown, the arrow keys and Space page too, and Home/End go to the
// top and the bottom (the footer).
//
// It leaves alone: a wheel over something that scrolls itself (the
// terminal's output), keys typed into a field, Space on a button or link,
// touch scrolling, pinch zoom, and scrollbar drags (a click cancels a
// glide). It only runs where the sections fit a screen (the same media
// query as `.home-snap` in home.css) with motion on. Its glide counts as
// scrolling, so each section's entrance waits for the page to come to rest.
export function HomeSnap() {
  useEffect(() => {
    const html = document.documentElement;
    const fits = window.matchMedia(
      "(min-width: 1024px) and (min-height: 700px)",
    );
    const active = () => fits.matches && html.classList.contains("motion");

    let frame = 0;
    let moving = false;
    let locked = false;
    let quiet = 0;

    // Where the page can rest: each section's top, and the page's end (the
    // footer).
    const stops = () => {
      const end = html.scrollHeight - window.innerHeight;
      const tops = Array.from(
        document.querySelectorAll<HTMLElement>(".home-snap > section"),
        (section) =>
          Math.round(section.getBoundingClientRect().top + window.scrollY - HEADER),
      );
      return [...new Set([...tops, end])]
        .filter((top) => top >= 0 && top <= end)
        .sort((a, b) => a - b);
    };

    const next = (direction: 1 | -1) => {
      const y = window.scrollY;
      const points = stops();
      return direction > 0
        ? points.find((point) => point > y + 2)
        : points.findLast((point) => point < y - 2);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      moving = false;
    };

    const glide = (to: number | undefined) => {
      if (to === undefined) return false;
      const from = window.scrollY;
      const distance = to - from;
      if (Math.abs(distance) < 2) return false;
      const screens = Math.abs(distance) / window.innerHeight;
      const duration = DURATION * Math.min(1.3, Math.max(0.6, screens));
      const start = performance.now();
      moving = true;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        window.scrollTo({ top: from + distance * easeInOutCubic(t), behavior: "instant" });
        if (t < 1) frame = requestAnimationFrame(step);
        else moving = false;
      };
      frame = requestAnimationFrame(step);
      return true;
    };

    // Is the wheel over something that can still scroll that way itself?
    const scrollsItself = (target: EventTarget | null, deltaY: number) => {
      for (
        let node = target instanceof Element ? target : null;
        node && node !== document.body;
        node = node.parentElement
      ) {
        if (node.scrollHeight <= node.clientHeight + 1) continue;
        if (!/(auto|scroll)/.test(getComputedStyle(node).overflowY)) continue;
        const room =
          deltaY > 0
            ? node.scrollTop + node.clientHeight < node.scrollHeight - 1
            : node.scrollTop > 0;
        if (room) return true;
      }
      return false;
    };

    // Floating UI (the Bintoy chat) handles its own wheel and keys.
    const ignored = (target: EventTarget | null) =>
      target instanceof Element && target.closest("[data-snap-ignore]") !== null;

    const onWheel = (event: WheelEvent) => {
      if (!active() || event.ctrlKey || ignored(event.target)) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (scrollsItself(event.target, event.deltaY)) return;
      event.preventDefault();
      // The gesture's stream keeps the lock until it goes quiet.
      window.clearTimeout(quiet);
      quiet = window.setTimeout(() => {
        locked = false;
      }, QUIET_MS);
      if (moving || locked || Math.abs(event.deltaY) < MIN_DELTA) return;
      if (glide(next(event.deltaY > 0 ? 1 : -1))) locked = true;
    };

    const onKey = (event: KeyboardEvent) => {
      if (!active() || event.defaultPrevented || ignored(event.target)) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      if (event.key === " " && target?.closest("a, button, summary, [role='button']")) {
        return;
      }
      let to: number | undefined;
      if (["PageDown", "ArrowDown"].includes(event.key) || (event.key === " " && !event.shiftKey)) {
        to = next(1);
      } else if (["PageUp", "ArrowUp"].includes(event.key) || (event.key === " " && event.shiftKey)) {
        to = next(-1);
      } else if (event.key === "Home") {
        to = 0;
      } else if (event.key === "End") {
        to = html.scrollHeight - window.innerHeight;
      } else {
        return;
      }
      event.preventDefault();
      if (!moving) glide(to);
    };

    // A click (a scrollbar drag, say) takes over from any glide.
    const onPointer = () => stop();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.clearTimeout(quiet);
      stop();
    };
  }, []);

  return null;
}
