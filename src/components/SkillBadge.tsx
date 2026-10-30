import type { CSSProperties } from "react";
import { brandMarks } from "@/data/brand-marks";
import { isAchromatic, legibleOn } from "@/lib/tone";
import { Glyph, type GlyphName } from "./Glyph";

interface SkillBadgeProps {
  name: string;
  /** Make the badge a stagger item of the reveal container around it. */
  revealItem?: boolean;
  /** A smaller badge, for dense grids that must fit one screen. */
  compact?: boolean;
  /** A generic mark, for a skill with no brand logo in data/brand-marks. */
  glyph?: GlyphName;
}

// --card in globals.css, light and dark: each brand color is checked
// against the card it sits on.
const CARD_LIGHT = "#ffffff";
const CARD_DARK = "#1e293b";

// A skill chip. A skill with a brand logo (data/brand-marks.ts) shows it
// in monochrome, and the logo takes the brand's color on hover, nudged per
// theme until it reads on the card, or the card's text color for a black or
// grey brand (.skill-badge in styles/tone.css).
// Otherwise it shows `glyph`, if given, or just the name.
export function SkillBadge({ name, revealItem = false, compact = false, glyph }: SkillBadgeProps) {
  const mark = brandMarks[name];
  const style = !mark
    ? undefined
    : isAchromatic(mark.hex)
      ? ({
          "--brand-l": "var(--card-foreground)",
          "--brand-d": "var(--card-foreground)",
        } as CSSProperties)
      : ({
          "--brand-l": legibleOn(mark.hex, CARD_LIGHT),
          "--brand-d": legibleOn(mark.hex, CARD_DARK),
        } as CSSProperties);
  const icon = compact ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <span
      data-reveal-item={revealItem ? "" : undefined}
      style={style}
      className={`skill-badge inline-flex items-center rounded-lg border border-border bg-card font-medium text-card-foreground ${
        compact ? "gap-1.5 px-2 py-1 text-xs short:py-0.5" : "gap-2 px-4 py-2 text-sm"
      } ${mark ? "skill-badge-brand" : ""}`}
    >
      {mark ? (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`skill-mark shrink-0 ${icon}`}
        >
          <path d={mark.path} />
        </svg>
      ) : glyph ? (
        <Glyph name={glyph} className={`skill-mark shrink-0 ${icon}`} />
      ) : null}
      {name}
    </span>
  );
}
