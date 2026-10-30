"use client";

import { useEffect } from "react";
import { cancelGlide, glideTo, isGliding, stopFor } from "@/lib/glide";
import { holdSpy, releaseSpy } from "@/lib/scroll-spy";

// A wheel stream quiet for this long has ended, a trackpad's momentum
// included.
const QUIET_MS = 180;
// Wheel deltas smaller than this are noise.
const MIN_DELTA = 4;

// The home page's sections are a screen tall each, and this pages through
// them: each wheel or trackpad gesture glides the page one stop up or down
// (lib/glide.ts), eased in and out. The rest of that gesture's stream, a
// trackpad's momentum included, is swallowed, so one flick never skips two
// sections. PageUp/PageDown, the arrow keys and Space page too, and
// Home/End go to the top and the bottom. The stops are each section's top,
// the footer's (data-snap-stop) and the page's end.
//
// It leaves alone: a wheel over something that scrolls itself (the
// terminal's output, the timeline, the project list), keys while focus is
// in something that can still scroll that way, keys someone else already
// handled (the project list's arrows), keys typed into a field, Space on a
// button or link, touch scrolling, pinch zoom, and scrollbar drags (a click
// cancels a glide). Paging only runs where the sections fit a screen (the
// same media query as `.home-snap` in home.css) with motion on.
//
// It also glides same-page links, at any width with motion on: a click on
// a link to "/" or to "/#<id>" of an element on this page glides there,
// then pushes the URL. Scroll-spy holds the nav on the target meanwhile.
// Without motion, the browser (and next/link) jump there instead.
export function HomeSnap() {
  useEffect(() => {
    const html = document.documentElement;
    const fits = window.matchMedia(
      "(min-width: 1024px) and (min-height: 700px)",
    );
    const motion = () => html.classList.contains("motion");
    const active = () => fits.matches && motion();

    let locked = false;
    let quiet = 0;

    // Where the page can rest: each section's top, the footer's, and the
    // page's end.
    const stops = () => {
      const end = html.scrollHeight - window.innerHeight;
      const tops = Array.from(
        document.querySelectorAll(".home-snap > section, [data-snap-stop]"),
        stopFor,
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

    const glide = (to: number | undefined) =>
      to === undefined ? false : glideTo(to);

    // Is `target`, or something around it, able to scroll further that way
    // itself? `direction` is 1 for down, -1 for up.
    const scrollsItself = (target: EventTarget | null, direction: number) => {
      for (
        let node = target instanceof Element ? target : null;
        node && node !== document.body && node !== html;
        node = node.parentElement
      ) {
        if (node.scrollHeight <= node.clientHeight + 1) continue;
        if (!/(auto|scroll)/.test(getComputedStyle(node).overflowY)) continue;
        const room =
          direction > 0
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
      if (scrollsItself(event.target, Math.sign(event.deltaY))) return;
      event.preventDefault();
      // The gesture's stream keeps the lock until it goes quiet.
      window.clearTimeout(quiet);
      quiet = window.setTimeout(() => {
        locked = false;
      }, QUIET_MS);
      if (isGliding() || locked || Math.abs(event.deltaY) < MIN_DELTA) return;
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
      let direction: 1 | -1;
      if (["PageDown", "ArrowDown", "End"].includes(event.key) || (event.key === " " && !event.shiftKey)) {
        direction = 1;
      } else if (["PageUp", "ArrowUp", "Home"].includes(event.key) || (event.key === " " && event.shiftKey)) {
        direction = -1;
      } else {
        return;
      }
      // Focus is in a pane that can still scroll that way: let it.
      if (scrollsItself(target, direction)) return;
      event.preventDefault();
      if (isGliding()) return;
      if (event.key === "Home") glide(0);
      else if (event.key === "End") glide(html.scrollHeight - window.innerHeight);
      else glide(next(direction));
    };

    // A same-page link: "/" or "/#<id>" of something on this page.
    const onClick = (event: MouseEvent) => {
      if (
        !motion() ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname !== "/" || location.pathname !== "/") {
        return;
      }
      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (id && !target) return;

      event.preventDefault();
      const key = target
        ? (target.closest("[data-nav]")?.getAttribute("data-nav") ?? null)
        : "home";
      holdSpy(key);
      if (!glideTo(target ? stopFor(target) : 0, releaseSpy)) releaseSpy();
      const href = url.pathname + url.search + url.hash;
      if (href !== location.pathname + location.search + location.hash) {
        history.pushState(null, "", href);
      }
    };

    // A click (a scrollbar drag, say) takes over from any glide.
    const onPointer = () => cancelGlide();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer, { passive: true });
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(quiet);
      cancelGlide();
    };
  }, []);

  return null;
}
