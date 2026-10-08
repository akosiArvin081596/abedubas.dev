"use client";

import { useEffect, useRef } from "react";

// From navigation start, the screen stays up at least MIN_MS, so a fast load
// never just flashes it, and at most MAX_MS.
const MIN_MS = 1000;
const MAX_MS = 3500;

// How long the bar takes to glide to a new value (core.css, --sl-pct).
const GLIDE_MS = 600;

// The loading screen, on every full page load (styles in
// styles/motion/core.css). Moving between pages is a client navigation, so
// it never shows then; the route curtain plays instead. The head script in
// the root layout sets html[data-loader] before paint when motion is on,
// which shows the screen and holds the page's own entrance effects. Without
// JS or with reduced motion it never shows.
//
// The progress it shows is real: the head script moves --sl-pct as the page
// loads. Here the screen waits for the load event and the fonts (and
// MIN_MS), lets the bar glide to 100, then sets data-loader="out", which
// releases the page's effects and wipes the screen down and away. MAX_MS
// caps the wait. Then it removes the attribute and the progress. All of it
// is direct DOM writes.
export function SiteLoader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const screen = ref.current;
    if (!screen || html.dataset.loader !== "") return;

    let active = true;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, Math.max(0, ms)));
      });

    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    Promise.race([
      Promise.all([
        loaded,
        document.fonts.ready,
        wait(MIN_MS - performance.now()),
      ]).then(() => {
        html.style.setProperty("--sl-pct", "100");
        return wait(GLIDE_MS);
      }),
      wait(MAX_MS - performance.now()),
    ])
      .catch(() => {})
      .then(async () => {
        if (!active) return;
        html.style.setProperty("--sl-pct", "100");
        html.dataset.loader = "out";
        await wait(800);
        if (html.dataset.loader === "out") delete html.dataset.loader;
        html.style.removeProperty("--sl-pct");
      });

    return () => {
      active = false;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div ref={ref} className="site-loader" aria-hidden="true">
      <div className="sl-body">
        <p className="sl-logo">
          <span className="sl-mark">&lt;</span>
          <span className="sl-name">abedubas</span>
          <span className="sl-tld">.dev</span>
          <span className="sl-mark"> /&gt;</span>
        </p>
        <p className="sl-role">Information Technologist &amp; Software Engineer</p>
        <div className="sl-track">
          <span className="sl-fill" />
        </div>
        <p className="sl-status">
          <span>Loading portfolio</span>
          <span className="sl-pct" />
        </p>
      </div>
    </div>
  );
}
