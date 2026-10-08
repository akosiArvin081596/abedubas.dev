"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

const CONTAINERS = '[data-reveal]:not([data-reveal-on="load"])';

// Items whose tops are this close (in px) share a row.
const ROW_TOLERANCE = 12;

// Layout position, ignoring transforms, so an effect's from-state can't
// change the order.
function layoutPosition(el: HTMLElement) {
  let x = 0;
  let y = 0;
  for (
    let node: HTMLElement | null = el;
    node;
    node = node.offsetParent as HTMLElement | null
  ) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  return { x, y };
}

// Group elements into rows (top to bottom), each sorted left to right.
function readingRows(elements: HTMLElement[]) {
  const placed = elements
    .map((el) => ({ el, ...layoutPosition(el) }))
    .sort((a, b) => a.y - b.y || a.x - b.x);
  const rows: (typeof placed)[] = [];
  for (const entry of placed) {
    const row = rows[rows.length - 1];
    if (row && Math.abs(entry.y - row[0].y) <= ROW_TOLERANCE) row.push(entry);
    else rows.push([entry]);
  }
  return rows.map((row) => row.sort((a, b) => a.x - b.x).map(({ el }) => el));
}

// Number a batch of containers, and their items, in reading order. The
// count runs on across the batch, so sections revealed together cascade.
function reveal(containers: HTMLElement[]) {
  let base = 0;
  for (const container of readingRows(containers).flat()) {
    container.style.setProperty("--i", String(base));
    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal-item]"),
    ).filter((item) => item.closest("[data-reveal]") === container);
    let i = 0;
    readingRows(items).forEach((row, r) =>
      row.forEach((item, c) => {
        item.style.setProperty("--i", String(base + i++));
        item.style.setProperty("--d", String(base + r + c));
      }),
    );
    base += Math.max(i, 1);
    container.setAttribute("data-revealed", "");
    container.dispatchEvent(new CustomEvent("reveal"));
  }
}

// Mounted once in the root layout. Reveals each [data-reveal] container as it
// scrolls into view, including content added by client-side navigation. It
// writes to the DOM directly, so it never re-renders anything.
export function RevealObserver() {
  useEffect(() => {
    window.__revealReady = true;
    if (!document.documentElement.classList.contains("motion")) return;

    const pending = new Set<HTMLElement>();

    const flush = (hits: HTMLElement[]) => {
      const fresh = hits.filter((el) => pending.delete(el));
      fresh.forEach((el) => io.unobserve(el));
      if (fresh.length > 0) reveal(fresh);
    };

    const io = new IntersectionObserver(
      (entries) =>
        flush(
          entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) => entry.target as HTMLElement),
        ),
      { rootMargin: "0px 0px -12% 0px" },
    );

    // Near the end of a page the last sections may never reach the trigger
    // line, so once the page can't scroll further, reveal what's on screen.
    let frame = 0;
    const revealAtBottom = () => {
      frame = 0;
      if (pending.size === 0) return;
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight < doc.scrollHeight - 2) return;
      flush(
        [...pending].filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        }),
      );
    };
    const scheduleBottomCheck = () => {
      if (!frame) frame = requestAnimationFrame(revealAtBottom);
    };

    const watch = (el: HTMLElement) => {
      if (el.hasAttribute("data-revealed") || pending.has(el)) return;
      pending.add(el);
      io.observe(el);
    };
    const unwatch = (el: HTMLElement) => {
      pending.delete(el);
      io.unobserve(el);
    };
    const each = (node: Node, fn: (el: HTMLElement) => void) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches(CONTAINERS)) fn(node);
      node.querySelectorAll<HTMLElement>(CONTAINERS).forEach(fn);
    };

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => each(node, watch));
        mutation.removedNodes.forEach((node) => each(node, unwatch));
      }
      scheduleBottomCheck();
    });

    // Keyboard users can reach content before it scrolls in, so reveal every
    // pending container around whatever takes focus.
    const onFocus = (event: FocusEvent) => {
      const hits: HTMLElement[] = [];
      for (
        let el = (event.target as Element | null)?.closest?.<HTMLElement>(
          CONTAINERS,
        );
        el;
        el = el.parentElement?.closest<HTMLElement>(CONTAINERS)
      ) {
        if (pending.has(el)) hits.push(el);
      }
      flush(hits);
    };

    // A printout shows everything.
    const onBeforePrint = () => flush([...pending]);

    each(document.body, watch);
    mo.observe(document.body, { childList: true, subtree: true });
    scheduleBottomCheck();
    window.addEventListener("scroll", scheduleBottomCheck, { passive: true });
    window.addEventListener("resize", scheduleBottomCheck, { passive: true });
    document.addEventListener("focusin", onFocus);
    window.addEventListener("beforeprint", onBeforePrint);

    return () => {
      window.removeEventListener("scroll", scheduleBottomCheck);
      window.removeEventListener("resize", scheduleBottomCheck);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("beforeprint", onBeforePrint);
      if (frame) cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
