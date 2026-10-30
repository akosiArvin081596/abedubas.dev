"use client";

import type { ReactNode } from "react";
import { glideTo } from "@/lib/glide";

interface BackToTopProps {
  className?: string;
  children: ReactNode;
}

// The footer's Back to top. With motion it glides up (lib/glide.ts), on the
// home page and on a post alike; without, it jumps. On the home page it
// also drops the section hash from the URL, as the Home link does. Focus
// moves to the page's first link, so keyboard users land where they see.
export function BackToTop({ className, children }: BackToTopProps) {
  const onClick = () => {
    const html = document.documentElement;
    const done = () => {
      document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
    };
    if (html.classList.contains("motion")) {
      if (!glideTo(0, done)) done();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
      done();
    }
    if (location.pathname === "/" && location.hash) {
      history.pushState(null, "", "/");
    }
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
