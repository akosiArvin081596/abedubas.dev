// Line glyphs on a 16px grid, drawn in currentColor: the card icons of the
// About, Philosophy, Strengths and Technical Skills sections, and the
// generic mark on a skill chip that has no brand logo. Decorative: the text
// beside each one carries its meaning.

const paths = {
  alert: "M8 2 14.5 13.5h-13zM8 6.5v3M8 11.6v.01",
  bolt: "M9 1.5 3.5 9H8l-1 5.5L12.5 7H8z",
  book: "M8 4C6.5 3 4.5 2.5 2 2.5V12c2.5 0 4.5.5 6 1.5 1.5-1 3.5-1.5 6-1.5V2.5c-2.5 0-4.5.5-6 1.5zM8 4v9.5",
  braces:
    "M5.5 2.5H5A1.5 1.5 0 0 0 3.5 4v2.25L2 8l1.5 1.75V12A1.5 1.5 0 0 0 5 13.5h.5M10.5 2.5h.5A1.5 1.5 0 0 1 12.5 4v2.25L14 8l-1.5 1.75V12a1.5 1.5 0 0 1-1.5 1.5h-.5",
  briefcase: "M2 5h12v8.5H2zM5.5 5V3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V5M2 9h12",
  certificate:
    "M6 10.5H2.5v-8h11v8h-4M5 5h6M5 7.5h2M7.75 7.25a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM6.5 10.5V14l1.25-.9L9 14v-3.5",
  chat: "M3.5 2.5h9a1 1 0 0 1 1 1V10a1 1 0 0 1-1 1H7l-3 2.5V11h-.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z",
  cloud: "M4.5 12.5a3 3 0 0 1-.4-5.97A4 4 0 0 1 11.8 6a3.25 3.25 0 0 1-.3 6.5z",
  code: "M5.5 4.5 2 8l3.5 3.5M10.5 4.5 14 8l-3.5 3.5M9 3 7 13",
  cursor: "M3 2.5 12.5 6.5 8.5 8 7 12zM8.5 8l4.5 4.5",
  database:
    "M3 4c0-1.1 2.2-2 5-2s5 .9 5 2-2.2 2-5 2-5-.9-5-2zM3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4M3 8c0 1.1 2.2 2 5 2s5-.9 5-2",
  doc: "M3.5 1.5h6l3 3v10h-9zM9.5 1.5v3h3M5.75 8h4.5M5.75 10.75h4.5",
  eye: "M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
  flask:
    "M6 1.75h4M6.75 1.75v4.5L2.9 12.6a1.1 1.1 0 0 0 .95 1.65h8.3a1.1 1.1 0 0 0 .95-1.65L9.25 6.25v-4.5M4.6 10h6.8",
  gauge: "M2.5 12a5.5 5.5 0 1 1 11 0M8 12l3-4M4.1 8.1l.9.6M8 6.5v1M11.9 8.1l-.9.6",
  globe:
    "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM1.5 8h13M8 1.5C9.8 3.3 10.6 5.5 10.6 8S9.8 12.7 8 14.5C6.2 12.7 5.4 10.5 5.4 8S6.2 3.3 8 1.5z",
  grid: "M2.5 2.5H7V7H2.5zM9 2.5h4.5V7H9zM2.5 9H7v4.5H2.5zM9 9h4.5v4.5H9z",
  key: "M3 10.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0M7.3 8.7 13 3M11 5l1.5 1.5M9.5 6.5l1 1",
  layers: "M8 2l6 3-6 3-6-3zM2 8l6 3 6-3M2 11l6 3 6-3",
  lock: "M3.5 7.5h9V14h-9zM5.5 7.5V5a2.5 2.5 0 0 1 5 0v2.5M8 10v1.5",
  monitor: "M1.75 2.5h12.5V11H1.75zM6 14h4M8 11v3",
  nodes:
    "M8 1.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zM3 10.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zM13 10.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zM7.1 4.5 3.9 11M8.9 4.5l3.2 6.5M4.75 12.5h6.5",
  pipeline: "M13 6.5A5 5 0 0 0 3.5 5M3 9.5A5 5 0 0 0 12.5 11M3.5 2.25V5h2.75M12.5 13.75V11H9.75",
  refactor: "M2.5 5.5h10L10 3M13.5 10.5h-10L6 13",
  schema: "M1.75 2.5h5v4h-5zM9.25 9.5h5v4h-5zM4.25 6.5v5h5",
  server: "M2 2.5h12V7H2zM2 9h12v4.5H2zM4.5 4.75h.01M4.5 11.25h.01",
  shield: "M8 1.5l5 2v4c0 3.2-2.1 5.7-5 7-2.9-1.3-5-3.8-5-7v-4zM5.75 8l1.6 1.6 3.15-3.2",
  sparkle:
    "M8 1.5l1.4 3.6 3.6 1.4-3.6 1.4L8 11.5 6.6 7.9 3 6.5l3.6-1.4zM12.5 10.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z",
  users:
    "M5.5 7a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5zM1.5 13.5c.4-2.4 2-3.75 4-3.75s3.6 1.35 4 3.75M10.5 2.6a2.25 2.25 0 0 1 0 4.3M11.5 9.9c1.6.4 2.7 1.6 3 3.6",
} as const;

export type GlyphName = keyof typeof paths;

interface GlyphProps {
  name: GlyphName;
  className?: string;
}

export function Glyph({ name, className = "h-4 w-4" }: GlyphProps) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
