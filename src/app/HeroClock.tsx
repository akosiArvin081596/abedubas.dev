"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

interface HeroClockProps {
  /** "time" prints 14:05 PHT; "date" prints Thu 8 Oct. */
  part: "time" | "date";
  className?: string;
  style?: CSSProperties;
}

// Arvin's local time (Philippine time) for the hero's tmux status bar, like
// tmux's own clock. It renders empty on the server, then writes the time
// straight to the DOM and keeps it current, so it never re-renders.
export function HeroClock({ part, className, style }: HeroClockProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const clock = ref.current;
    if (!clock) return;
    const tick = () => {
      const now = Object.fromEntries(
        format.formatToParts(new Date()).map(({ type, value }) => [type, value]),
      );
      clock.textContent =
        part === "time"
          ? `${now.hour}:${now.minute} PHT`
          : `${now.weekday} ${now.day} ${now.month}`;
    };
    tick();
    const timer = window.setInterval(tick, 15_000);
    return () => window.clearInterval(timer);
  }, [part]);

  return <span ref={ref} className={className} style={style} />;
}
