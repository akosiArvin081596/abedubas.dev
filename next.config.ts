import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // 75 is the default. The hero photo asks for 90: it's a crop of a
    // modest-resolution photo, shown large, so heavier compression shows.
    qualities: [75, 90],
  },
  // The site is one page now. The old pages' URLs land on their sections,
  // permanently (308). Redirects run before the filesystem; /blog/:slug
  // isn't matched, so posts stay pages.
  async redirects() {
    return ["about", "skills", "projects", "blog", "contact"].map((section) => ({
      source: `/${section}`,
      destination: `/#${section}`,
      permanent: true,
    }));
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
