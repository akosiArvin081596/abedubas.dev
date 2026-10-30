import type { CSSProperties } from "react";

// A card's accent ("tone"), drawn from the theme's own tokens: the brand
// pair and the syntax palette (--code-*), which already meets WCAG AA in
// both themes. A card sets --tone inline; styles/tone.css does the rest
// (its icon tile, gradient ring, hover glow and Spotlight color).
export type Tone = "primary" | "accent" | "violet" | "green" | "orange" | "red";

const toneVar: Record<Tone, string> = {
  primary: "var(--primary)",
  accent: "var(--accent)",
  violet: "var(--code-title)",
  green: "var(--code-tag)",
  orange: "var(--code-builtin)",
  red: "var(--code-keyword)",
};

export function toneStyle(tone: Tone): CSSProperties {
  return { "--tone": toneVar[tone] } as CSSProperties;
}

// Brand colors on the skill chips are the brands' own, so some (black, or
// a pale yellow) vanish against one theme's card. Each mark gets a color
// per theme, mixed toward black or white until it reaches 3:1 against
// that theme's card (WCAG's floor for graphics).
type Rgb = [number, number, number];

function parse(hex: string): Rgb {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance([r, g, b]: Rgb) {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: Rgb, b: Rgb) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t)) as Rgb;
}

// Black, white and grey marks (Next.js, Vercel, GitHub...) have no hue to
// show, so on hover they take the card's text color instead.
export function isAchromatic(hex: string) {
  const c = parse(hex);
  return Math.max(...c) - Math.min(...c) < 24;
}

const toHex = (c: Rgb) => `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;

export function legibleOn(hex: string, card: string, min = 3) {
  const color = parse(hex);
  const bg = parse(card);
  const toward: Rgb = luminance(bg) > 0.5 ? [0, 0, 0] : [255, 255, 255];
  for (let t = 0; t <= 1; t += 0.05) {
    const c = mix(color, toward, t);
    if (contrast(c, bg) >= min) return toHex(c);
  }
  return toHex(toward);
}
