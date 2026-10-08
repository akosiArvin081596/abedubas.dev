import { ImageResponse } from "next/og";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { OgLogo, OgRule, ogBackground, ogFrame } from "@/lib/og";

export const alt = "A blog post by Arvin Baghari Edubas on abedubas.dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerender one card per post at build time, like the post pages. An image
// route doesn't inherit the page's generateStaticParams, so it has its own.
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// The site card's layout (app/opengraph-image.tsx) with the post's title,
// description and date. Uses ImageResponse's built-in font, so nothing is
// fetched.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return new ImageResponse(
    (
      <div style={ogFrame(await ogBackground())}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <OgLogo fontSize={26} />
          <div style={{ marginLeft: 20, fontSize: 24, color: "#94a3b8" }}>
            {`blog/${slug}.mdx`}
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}
        >
          <div
            style={{
              display: "block",
              fontSize: 60,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              lineClamp: 3,
            }}
          >
            {post.title}
          </div>
          <OgRule />
          <div
            style={{
              display: "block",
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#cbd5e1",
              lineClamp: 2,
            }}
          >
            {post.description}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#93c5fd" }}>
          {`${date} · ${post.readingTime} · abedubas.dev`}
        </div>
      </div>
    ),
    { ...size },
  );
}
