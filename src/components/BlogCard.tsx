import Link from "next/link";
import type { BlogPostMeta } from "@/types";
import { TagBadge } from "./TagBadge";

interface BlogCardProps {
  post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
      <Link href={`/blog/${post.slug}`}>
        <h3 className="mb-2 text-xl font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>
      </Link>
      <p className="mb-4 text-sm text-muted-foreground">{post.description}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
}
