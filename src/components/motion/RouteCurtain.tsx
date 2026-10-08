"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// A panel's box as fractions of the viewport: [left, top, width, height].
type Box = [number, number, number, number];

interface Pattern {
  boxes: Box[];
  /** "x" sweeps left to right; "y" drops top to bottom. */
  axis: "x" | "y";
  /** Delay between consecutive panels, in ms. */
  stagger: number;
  /** Lean the panels for a diagonal edge, in degrees. */
  skew?: number;
  /** Grow as a circle from the top-left corner instead. */
  iris?: boolean;
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

// One pattern per page, so every page arrives its own way.
const PATTERNS = {
  home: { boxes: [[0, 0, 1, 1]], axis: "x", stagger: 0, iris: true },
  about: {
    boxes: range(4).map((i): Box => [0, i / 4, 1, 1 / 4]),
    axis: "x",
    stagger: 70,
  },
  skills: {
    boxes: range(6).map((i): Box => [i / 6, 0, 1 / 6, 1]),
    axis: "y",
    stagger: 55,
  },
  projects: { boxes: [[0, 0, 1, 1]], axis: "x", stagger: 0, skew: -14 },
  blog: { boxes: [[0, 0, 1, 1]], axis: "y", stagger: 0 },
  contact: {
    boxes: range(10).map((i): Box => [0, i / 10, 1, 1 / 10]),
    axis: "x",
    stagger: 28,
  },
  sweep: { boxes: [[0, 0, 1, 1]], axis: "x", stagger: 0 },
} satisfies Record<string, Pattern>;

// "/blog/" and "/blog" are the same page.
const normalize = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

function patternFor(path: string): Pattern {
  if (path === "/") return PATTERNS.home;
  if (path.startsWith("/blog/")) return PATTERNS.sweep;
  const section = path.split("/")[1];
  return Object.hasOwn(PATTERNS, section)
    ? PATTERNS[section as keyof typeof PATTERNS]
    : PATTERNS.sweep;
}

// What the prompt types: `cd` into a page, `cat` a post.
function commandFor(path: string) {
  const post = path.match(/^\/blog\/([^/]+)\/?$/);
  if (post) return `cat ~/blog/${post[1]}.mdx`;
  return path === "/" ? "cd ~" : `cd ~${path.replace(/\/$/, "")}`;
}

const cwdFor = (path: string) => (path === "/" ? "~" : `~${path}`);

const LAYER_GAP = 60;
const IN_MS = 520;
const OUT_MS = 560;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
// The prompt types at this pace, but never takes longer than TYPE_MAX_MS,
// so a long post slug doesn't hold the curtain down.
const TYPE_PER_CHAR = 26;
const TYPE_MAX_MS = 560;

function keyframes(pattern: Pattern, phase: "in" | "out"): Keyframe[] {
  if (pattern.iris) {
    return phase === "in"
      ? [
          { transform: "none", clipPath: "circle(0% at 0% 0%)" },
          { transform: "none", clipPath: "circle(150% at 0% 0%)" },
        ]
      : [
          { transform: "none", clipPath: "circle(150% at 100% 100%)" },
          { transform: "none", clipPath: "circle(0% at 100% 100%)" },
        ];
  }
  // In: grow from the leading edge. Out: shrink toward the far edge, so the
  // panel keeps travelling the same way and the page shows behind it.
  const [scale, from, to] =
    pattern.axis === "x"
      ? ["scaleX", "0 50%", "100% 50%"]
      : ["scaleY", "50% 0", "50% 100%"];
  return phase === "in"
    ? [
        { transform: `${scale}(0)`, transformOrigin: from },
        { transform: `${scale}(1)`, transformOrigin: from },
      ]
    : [
        { transform: `${scale}(1)`, transformOrigin: to },
        { transform: `${scale}(0)`, transformOrigin: to },
      ];
}

// Build the pattern's panels, three layers each, and return the layers.
function build(stage: HTMLElement, pattern: Pattern) {
  stage.replaceChildren();
  // A skewed panel's corners lean out by tan(skew) × half its height, so
  // widen it by that much on each side (as a fraction of the width), or a
  // tall, narrow screen shows the page in two corners.
  const lean = pattern.skew
    ? (Math.tan((Math.abs(pattern.skew) * Math.PI) / 180) * innerHeight) /
        2 /
        innerWidth +
      0.02
    : 0;
  return pattern.boxes.map(([left, top, width, height]) => {
    const panel = document.createElement("div");
    panel.className = "rc-panel";
    // Each panel overlaps its neighbor by a pixel, so fractional sizes
    // (844px / 10 slats) can't leave hairline seams showing the page.
    Object.assign(panel.style, {
      left: `${(left - lean) * 100}%`,
      top: `${top * 100}%`,
      width: `calc(${(width + 2 * lean) * 100}% + 1px)`,
      height: `calc(${height * 100}% + 1px)`,
      transform: pattern.skew ? `skewX(${pattern.skew}deg)` : "",
    });
    const layers = range(3).map(() => {
      const layer = document.createElement("div");
      layer.className = "rc-layer";
      return layer;
    });
    panel.append(...layers);
    stage.append(panel);
    return layers;
  });
}

// Sweep every panel's layers in or out, and resolve when all have finished.
// In: accent, primary, then the dark stage. Out: the reverse.
function sweep(layers: HTMLElement[][], pattern: Pattern, phase: "in" | "out") {
  const frames = keyframes(pattern, phase);
  return Promise.all(
    layers.flatMap((panel, p) =>
      panel.map((layer, l) => {
        const order = phase === "in" ? l : panel.length - 1 - l;
        return layer.animate(frames, {
          duration: phase === "in" ? IN_MS : OUT_MS,
          delay: p * pattern.stagger + order * LAYER_GAP,
          easing: EASE,
          fill: "both",
        }).finished;
      }),
    ),
  );
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const nextPaint = () =>
  new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );

// Page changes run through a "terminal curtain": layered panels sweep across
// to cover the page while a shell prompt types the destination, the new page
// renders underneath, and the panels sweep out the far side. Each page has
// its own panel pattern, and every move runs left to right or top to bottom.
// It works by catching clicks on internal links, so it covers next/link and
// plain anchors alike, and without `.motion` it never engages.
export function RouteCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const cwdRef = useRef<HTMLSpanElement>(null);
  const cmdRef = useRef<HTMLSpanElement>(null);
  // The navigation in flight: its destination, and what to call once the
  // new page has rendered there.
  const flight = useRef<{ path: string; arrived: () => void } | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const term = termRef.current;
    const cwd = cwdRef.current;
    const cmd = cmdRef.current;
    if (!root || !stage || !term || !cwd || !cmd) return;
    if (!document.documentElement.classList.contains("motion")) return;

    let busy = false;

    const run = async (url: URL) => {
      busy = true;
      const html = document.documentElement;
      const href = url.pathname + url.search + url.hash;
      let pushed = false;
      // Back or Forward mid-transition: don't push, just lift.
      let onPop = () => {};
      const popped = new Promise<void>((resolve) => {
        onPop = () => resolve();
      });
      window.addEventListener("popstate", onPop);

      try {
        const pattern = patternFor(url.pathname);
        const layers = build(stage, pattern);
        cwd.textContent = cwdFor(normalize(location.pathname));
        cmd.textContent = commandFor(url.pathname);
        const chars = cmd.textContent.length;
        // Sizes the type so the command (plus the caret) fits on its line.
        term.style.setProperty("--cmd-chars", String(chars + 1));
        router.prefetch(href);

        root.dataset.active = "";
        html.dataset.curtain = "";
        const arrived = new Promise<void>((resolve) => {
          flight.current = { path: normalize(url.pathname), arrived: resolve };
        });

        // The prompt types once the dark stage is mostly in, then holds a
        // beat so it can be read.
        const typed = Promise.all([
          term.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 160,
            delay: 380,
            fill: "both",
          }).finished,
          cmd.animate(
            [
              { clipPath: "inset(0 100% 0 0)" },
              { clipPath: "inset(0 0 0 0)" },
            ],
            {
              duration: Math.min(chars * TYPE_PER_CHAR, TYPE_MAX_MS),
              delay: 440,
              easing: `steps(${chars}, end)`,
              fill: "both",
            },
          ).finished,
        ]).then(() => wait(90));

        // Start the navigation as soon as the page is covered, so loading
        // overlaps the typing instead of waiting for it.
        const covered = await Promise.race([
          sweep(layers, pattern, "in").then(() => true),
          popped.then(() => false),
        ]);
        if (covered) {
          router.push(href);
          pushed = true;
        }

        // Lift once the prompt is done and the page has rendered (or the
        // visitor went back). A slow page keeps it down for at most 8 s.
        await Promise.race([
          Promise.all([typed, arrived]),
          popped,
          wait(8000),
        ]);
        flight.current = null;
        await nextPaint();

        // Lift: the prompt fades as the panels sweep out the far side, and
        // the new page's own entrance plays underneath.
        delete html.dataset.curtain;
        await Promise.all([
          term.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 160,
            fill: "both",
          }).finished,
          sweep(layers, pattern, "out"),
        ]);
      } catch {
        // Something broke mid-transition; still get the visitor there.
        if (!pushed) router.push(href);
      } finally {
        // Whatever happened, never leave the curtain up or links dead.
        window.removeEventListener("popstate", onPop);
        flight.current = null;
        delete html.dataset.curtain;
        delete root.dataset.active;
        stage.replaceChildren();
        term.getAnimations().forEach((animation) => animation.cancel());
        cmd.getAnimations().forEach((animation) => animation.cancel());
        busy = false;
      }
    };

    // Capture phase, ahead of next/link. preventDefault() alone stops Link
    // (it skips default-prevented clicks), and other handlers, such as the
    // mobile menu closing, still run.
    const onClick = (event: MouseEvent) => {
      if (
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
      if (
        !anchor ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download")
      ) {
        return;
      }
      const url = new URL(anchor.href, location.href);
      if (
        url.origin !== location.origin ||
        normalize(url.pathname) === normalize(location.pathname) ||
        url.pathname.startsWith("/api/") ||
        /\.[a-z0-9]+$/i.test(url.pathname)
      ) {
        return;
      }
      event.preventDefault();
      if (!busy) void run(url);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new page has rendered, so the curtain can lift.
  useEffect(() => {
    if (flight.current?.path === normalize(pathname)) {
      flight.current.arrived();
    }
  }, [pathname]);

  return (
    <div ref={rootRef} className="route-curtain" aria-hidden="true">
      <div ref={stageRef} className="rc-stage" />
      <div ref={termRef} className="rc-term">
        <span className="rc-prompt">
          <b className="rc-host">arvin@abedubas.dev:</b>
          <span ref={cwdRef} />$
        </span>{" "}
        <span className="rc-line">
          <span ref={cmdRef} className="rc-cmd" />
          <span className="rc-caret" />
        </span>
      </div>
    </div>
  );
}
