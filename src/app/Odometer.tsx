import type { CSSProperties } from "react";

interface OdometerProps {
  value: number;
  /** Shown after the digits, such as "+" or "%". */
  suffix?: string;
}

// The `count` effect's numbers (styles/motion/home.css). Every digit is real
// text, so the server, no-JS and reduced motion all show the final value.
// With motion on, each digit hides behind a strip of digits (CSS generated
// content from data-strip) that rolls down a full turn and lands on it.
export function Odometer({ value, suffix = "" }: OdometerProps) {
  return (
    <span className="odometer">
      {String(value)
        .split("")
        .map((digit, k) => {
          const n = Number(digit);
          // Top to bottom: the digit itself, counting down to 0, then 9 to 0.
          const strip = [
            ...Array.from({ length: n + 1 }, (_, j) => n - j),
            9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
          ];
          return (
            <span
              key={k}
              className="odo-col"
              style={{ "--k": k } as CSSProperties}
            >
              {digit}
              <span
                aria-hidden="true"
                className="odo-strip"
                data-strip={strip.join("\n")}
                style={{ "--n": strip.length - 1 } as CSSProperties}
              />
            </span>
          );
        })}
      <span className="odo-suffix">{suffix}</span>
    </span>
  );
}
