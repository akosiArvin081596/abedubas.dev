import { ImageResponse } from "next/og";
import { OgLogo, OgRule, ogBackground, ogFrame } from "@/lib/og";

export const alt =
  "Arvin Baghari Edubas, Information Technologist & Software Engineer, abedubas.dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered with ImageResponse's built-in font, so nothing is fetched.
export default async function Image() {
  return new ImageResponse(
    (
      <div style={ogFrame(await ogBackground())}>
        <div style={{ display: "flex" }}>
          <OgLogo fontSize={30} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Arvin Baghari Edubas
          </div>
          <OgRule />
          <div style={{ marginTop: 28, fontSize: 36, color: "#cbd5e1" }}>
            Information Technologist & Software Engineer
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#93c5fd" }}>
          https://abedubas.dev
        </div>
      </div>
    ),
    { ...size },
  );
}
