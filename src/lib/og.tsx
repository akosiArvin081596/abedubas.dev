import type { CSSProperties } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared by the OG cards (app/opengraph-image.tsx and
// app/blog/[slug]/opengraph-image.tsx). They can't share from each other,
// because Next treats every export of an image route as route config.

let background: Promise<string> | undefined;

// The Higgsfield artwork as a CSS background, read once. If the file is
// missing, a gradient stands in, so the card never fails to render.
export function ogBackground() {
  background ??= readFile(join(process.cwd(), "src/assets/og-background.jpg"))
    .then((data) => `url(data:image/jpeg;base64,${data.toString("base64")})`)
    .catch(
      () => "linear-gradient(135deg, #020617 0%, #0f172a 55%, #1e1b4b 100%)",
    );
  return background;
}

// The card itself: dark, padded, with the artwork behind it.
export function ogFrame(backgroundImage: string): CSSProperties {
  return {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "64px 80px",
    backgroundColor: "#0b1120",
    backgroundImage,
    backgroundSize: "1200px 630px",
    color: "#f8fafc",
  };
}

// The site's logo, set like a JSX tag.
export function OgLogo({ fontSize }: { fontSize: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: `${Math.round(fontSize / 3)}px ${Math.round((fontSize * 2) / 3)}px`,
        borderRadius: 12,
        border: "1px solid rgba(129, 140, 248, 0.35)",
        backgroundColor: "rgba(15, 23, 42, 0.7)",
        fontSize,
      }}
    >
      <span style={{ color: "#818cf8" }}>&lt;</span>
      <span style={{ color: "#e0e7ff" }}>abedubas</span>
      <span style={{ color: "#94a3b8" }}>.dev</span>
      <span style={{ color: "#818cf8", marginLeft: 8 }}>/&gt;</span>
    </div>
  );
}

// The short gradient rule between a card's title and its subtitle.
export function OgRule() {
  return (
    <div
      style={{
        marginTop: 28,
        width: 160,
        height: 4,
        borderRadius: 2,
        backgroundImage: "linear-gradient(to right, #818cf8, #60a5fa)",
      }}
    />
  );
}
