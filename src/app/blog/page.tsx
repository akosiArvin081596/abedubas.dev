import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard, ScrollReveal } from "@/components";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles and insights on web development, software engineering, and best practices by Arvin Baghari Edubas.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <ScrollReveal animation="fade-down" duration={800}>
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts on web development, software engineering, and technology
          </p>
        </div>
      </ScrollReveal>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <ScrollReveal
              key={post.slug}
              animation="fade-up"
              delay={index * 150}
              duration={700}
              easing="elastic"
            >
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <ScrollReveal animation="fade-up" duration={800}>
          <div className="text-center">
            <p className="text-muted-foreground">
              No blog posts yet. Check back soon!
            </p>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
