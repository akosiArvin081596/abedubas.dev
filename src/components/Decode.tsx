"use client";

import { useEffect, useRef } from "react";

// Code-flavored glyphs the letters cycle through before they settle.
const GLYPHS = "<>/{}[]()=+*#$%&;:_01";

// In ms: the churn before the first letter settles, the gap between settles
// (left to right), how long each random glyph stays up, and how long the
// last letter's settle flash runs before the plain text comes back. With 16
// letters, the churn runs about 1.4 s.
const LEAD = 420;
const STEP = 64;
const HOLD = 60;
const FLASH = 700;

interface DecodeProps {
  /** The final text. The server renders exactly this. */
  text: string;
}

// Run `start` once the route curtain (components/motion/RouteCurtain.tsx)
// has lifted, so the effect plays where it can be seen. Returns a canceller.
function afterCurtain(start: () => void) {
  const html = document.documentElement;
  if (!html.hasAttribute("data-curtain")) {
    start();
    return () => {};
  }
  const observer = new MutationObserver(() => {
    if (html.hasAttribute("data-curtain")) return;
    observer.disconnect();
    start();
  });
  observer.observe(html, { attributes: true, attributeFilter: ["data-curtain"] });
  return () => observer.disconnect();
}

// Text that scrambles through code glyphs on mount, then settles left to
// right, one character at a time. It runs only under `.motion`, after the
// web font is ready and the route curtain has lifted, and writes to the DOM
// through a ref, so there's no React state and no re-render. Each character
// gets a box sized to its final glyph, so the line never reflows. Screen
// readers get the sr-only copy, never the scramble. The CSS for the
// `decode` effect is in styles/motion/work.css.
export function Decode({ text }: DecodeProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const settle = () => {
      host.textContent = text;
      host.dataset.decode = "done";
    };
    if (!document.documentElement.classList.contains("motion")) {
      settle();
      return;
    }

    // Hidden until it starts (see work.css), including after a remount.
    host.dataset.decode = "";
    let frame = 0;
    let flash = 0;
    let cancelled = false;
    let stopWaiting = () => {};

    const begin = () => {
      if (cancelled) return;
      // The CSS hold has run out, so the visitor is already reading the
      // title; don't scramble it under them.
      if (getComputedStyle(host).opacity !== "0") {
        settle();
        return;
      }

      // Split into one span per character. Words stay unbreakable, so the
      // line wraps only where the plain text would.
      const cells: { el: HTMLSpanElement; char: string }[] = [];
      const nodes: (Node | string)[] = [];
      text.split(" ").forEach((word, w) => {
        if (w > 0) nodes.push(" ");
        const wordEl = document.createElement("span");
        wordEl.style.whiteSpace = "nowrap";
        for (const char of word) {
          const el = document.createElement("span");
          el.textContent = char;
          wordEl.append(el);
          cells.push({ el, char });
        }
        nodes.push(wordEl);
      });
      host.replaceChildren(...nodes);

      // Measure every final glyph before swapping any, then lock the boxes.
      const widths = cells.map(({ el }) => el.getBoundingClientRect().width);
      const randomGlyph = () =>
        GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      cells.forEach(({ el }, k) => {
        el.className = "decode-cell";
        el.style.cssText = `display:inline-block;width:${widths[k]}px;text-align:center`;
        el.textContent = randomGlyph();
      });
      host.dataset.decode = "running";

      let start = 0;
      let lastSwap = 0;
      let next = 0; // the first cell that hasn't settled
      const tick = (now: number) => {
        if (!start) start = lastSwap = now;
        const elapsed = now - start;
        while (next < cells.length && elapsed >= LEAD + next * STEP) {
          const { el, char } = cells[next++];
          el.textContent = char;
          el.dataset.settled = "";
        }
        if (next === cells.length) {
          // Let the last letter's flash finish, then restore the plain text.
          flash = window.setTimeout(settle, FLASH);
          return;
        }
        if (now - lastSwap >= HOLD) {
          lastSwap = now;
          for (let k = next; k < cells.length; k++) {
            cells[k].el.textContent = randomGlyph();
          }
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // Measure with the web font, not the fallback it swaps in for.
    document.fonts.ready.then(() => {
      if (!cancelled) stopWaiting = afterCurtain(begin);
    });

    // A printout gets the plain title, never a mid-scramble one.
    const onBeforePrint = () => {
      cancelled = true;
      stopWaiting();
      cancelAnimationFrame(frame);
      clearTimeout(flash);
      settle();
    };
    window.addEventListener("beforeprint", onBeforePrint);

    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      cancelled = true;
      stopWaiting();
      cancelAnimationFrame(frame);
      clearTimeout(flash);
      settle();
    };
  }, [text]);

  return (
    <>
      <span className="sr-only select-none">{text}</span>
      <span ref={ref} aria-hidden="true" data-decode="">
        {text}
      </span>
    </>
  );
}
