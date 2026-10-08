import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard, SectionLabel } from "@/components";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles and insights on web development, software engineering, and best practices by Arvin Baghari Edubas.",
};

// Inline stagger index for the on-load header (see styles/motion/core.css)
const at = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container-site py-16 md:py-24">
      {/* Header */}
      <div
        data-reveal="focus"
        data-reveal-on="load"
        className="mb-16 text-center md:mb-24"
      >
        <p className="mb-4" style={at(0)}>
          <SectionLabel>
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </SectionLabel>
        </p>
        <h1
          className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl"
          style={at(1)}
        >
          Blog
        </h1>
        <p
          className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl"
          style={at(2)}
        >
          Thoughts on web development, software engineering, and technology
        </p>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div data-reveal="stack" className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} revealItem />
          ))}
        </div>
      ) : (
        <div data-reveal="stack" className="text-center">
          <p data-reveal-item className="text-muted-foreground">
            No blog posts yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
