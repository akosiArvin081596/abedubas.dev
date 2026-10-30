import { BlogCard, SectionLabel } from "@/components";
import { getAllPosts } from "@/lib/blog";

// #blog: a header that comes into focus (`focus`), then every post, newest
// first, cascading in with depth (`stack`). From lg the list sits in a pane
// that scrolls itself once there are more posts than fit the screen.
//
// The pane takes all the height the header leaves (.snap-pane in home.css
// only shrinks to fit, hence `grow!`), and the grid fills the pane, so one
// row of posts reaches the bottom of the screen, each card's tags pinned
// to its foot. More rows than fit keep their natural height, and the pane
// scrolls as before.
export function BlogSection() {
  const posts = getAllPosts();

  return (
    <section id="blog" data-nav="blog" className="snap-fit relative py-16 lg:py-6">
      <div className="snap-body container-site">
        <div
          data-reveal="focus"
          className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 xl:mb-10 short:mb-6 tight:mb-5"
        >
          <div>
            <p data-reveal-item>
              <SectionLabel>
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </SectionLabel>
            </p>
            <h2
              data-reveal-item
              className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
            >
              Blog
            </h2>
          </div>
          <p
            data-reveal-item
            className="max-w-xl text-base text-muted-foreground lg:text-right xl:text-lg"
          >
            Thoughts on web development, software engineering, and technology
          </p>
        </div>

        <div
          role="region"
          aria-label="Blog posts"
          tabIndex={0}
          className="snap-pane -mx-2 px-2 py-2 lg:grow!"
        >
          {posts.length > 0 ? (
            <div data-reveal="stack" className="grid gap-6 md:grid-cols-2 lg:min-h-full lg:grid-cols-3 tight:gap-5">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} revealItem />
              ))}
            </div>
          ) : (
            <div data-reveal="stack">
              <p data-reveal-item className="text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
