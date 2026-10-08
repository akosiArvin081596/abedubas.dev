import Link from "next/link";
import type { BlogPostMeta } from "@/types";
import { TagBadge } from "./TagBadge";

interface BlogCardProps {
  post: BlogPostMeta;
  /** Make the card a stagger item of the reveal container around it. */
  revealItem?: boolean;
}

// The `stack` effect in styles/motion/work.css grows .stack-bar downward.
export function BlogCard({ post, revealItem = false }: BlogCardProps) {
  return (
    <article
      data-reveal-item={revealItem ? "" : undefined}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 pl-7 transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-lg md:p-8 md:pl-9"
    >
      <span
        aria-hidden="true"
        className="stack-bar absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-primary to-accent opacity-70 transition-opacity group-hover:opacity-100"
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
        {/* The post's source file, as a dev touch */}
        <span aria-hidden="true" className="flex min-w-0 items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-3.5 w-3.5 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          <span className="truncate">{post.slug}.mdx</span>
        </span>
      </div>
      <Link href={`/blog/${post.slug}`}>
        <h3 className="mb-3 text-xl font-semibold text-card-foreground transition-colors group-hover:text-primary md:text-2xl">
          {post.title}
        </h3>
      </Link>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
        {post.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
}
