"use client";

import { useEffect, useState, useCallback } from "react";

interface TypeWriterProps {
  text: string;
  delay?: number;
  deleteDelay?: number;
  pauseDelay?: number;
  loop?: boolean;
  className?: string;
}

export function TypeWriter({
  text,
  delay = 100,
  deleteDelay = 50,
  pauseDelay = 2000,
  loop = false,
  className = "",
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (displayText.length < text.length) {
        setDisplayText(text.slice(0, displayText.length + 1));
      } else if (loop) {
        // Finished typing, pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(text.slice(0, displayText.length - 1));
      } else {
        // Finished deleting, pause before typing again
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(false);
        }, pauseDelay / 2);
      }
    }
  }, [displayText, isDeleting, isPaused, loop, pauseDelay, text]);

  useEffect(() => {
    const currentDelay = isDeleting ? deleteDelay : delay;
    const timeout = setTimeout(tick, currentDelay);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting, delay, deleteDelay]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[0.5em] h-[4px] bg-primary animate-blink rounded-sm" />
    </span>
  );
}
