"use client";

import { useEffect, useRef } from "react";

// A soft glow that follows the pointer across its parent card (styles in
// motion/home.css, .stat-spotlight). It writes the pointer position to the
// card as --mx/--my, so moving never re-renders anything.
export function Spotlight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = ref.current?.parentElement;
    if (!card) return;
    const move = (event: PointerEvent) => {
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - box.left}px`);
      card.style.setProperty("--my", `${event.clientY - box.top}px`);
    };
    card.addEventListener("pointermove", move);
    return () => card.removeEventListener("pointermove", move);
  }, []);

  return <span ref={ref} aria-hidden="true" className="stat-spotlight" />;
}
