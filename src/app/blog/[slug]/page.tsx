import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { mdxComponents } from "@/components/MDXComponents";
import { TagBadge } from "@/components/TagBadge";
import { SplitText } from "@/components/motion";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

// Inline stagger index for the on-load header (see styles/motion/core.css)
const at = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container-site py-16 md:py-24">
      {/* A wide header over a body kept to a readable measure */}
      <div className="mx-auto max-w-5xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-2 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header data-reveal="rule" data-reveal-on="load" className="mb-12 md:mb-16">
          {/* The source file and a rule that draws left to right */}
          <div aria-hidden="true" className="mb-6 flex items-center gap-4">
            <span className="rule-file truncate font-mono text-xs text-muted-foreground md:text-sm">
              {slug}.mdx
            </span>
            <span className="rule-line h-px min-w-8 flex-1 bg-gradient-to-r from-primary via-accent/60 to-transparent" />
          </div>
          <div
            className="rule-drop mb-5 flex items-center gap-3 font-mono text-sm text-muted-foreground"
            style={at(1)}
          >
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
          {/* Words drop out of their own masks; --si numbers them. */}
          <h1 className="rule-title mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <SplitText text={post.title} />
          </h1>
          <p
            className="rule-drop max-w-3xl text-lg text-muted-foreground md:text-xl"
            style={at(3)}
          >
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="rule-drop mt-6 flex flex-wrap gap-2" style={at(4)}>
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>
      </div>

      {/* Content */}
      <div className="prose-custom mx-auto max-w-[72ch]">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </div>
    </article>
  );
}
