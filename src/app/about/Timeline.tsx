export interface TimelineEntry {
  year: string;
  title: string;
  company: string;
  description: string;
}

interface TimelineProps {
  items: TimelineEntry[];
}

// A short, stable, git-style hash for an entry: djb2 over the title, as
// 7 hex digits. Pure, so the server and every build agree.
function commitHash(text: string) {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = (Math.imul(hash, 33) + text.charCodeAt(i)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0").slice(0, 7);
}

// The rail fades from primary (top) through border (middle) to transparent
// (bottom). Each entry draws its own segment of it, so the fade is split
// into one gradient per segment, with matching colors at every joint.
function railColor(t: number) {
  if (t <= 0.5) {
    const primary = Math.round((1 - 2 * t) * 100);
    return `color-mix(in oklab, var(--primary) ${primary}%, var(--border))`;
  }
  const border = Math.round((2 - 2 * t) * 100);
  return `color-mix(in oklab, var(--border) ${border}%, transparent)`;
}

function railGradient(index: number, count: number) {
  const from = index / count;
  const to = (index + 1) / count;
  const stops = [`${railColor(from)} 0%`];
  if (from < 0.5 && to > 0.5) {
    const mid = Math.round(((0.5 - from) / (to - from)) * 100);
    stops.push(`var(--border) ${mid}%`);
  }
  stops.push(`${railColor(to)} 100%`);
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

// Work history as a git log, newest commit first with the current role at
// HEAD. Wide screens read it as git log --graph: hash, date and branch on
// the left, the rail in between, the commit itself on the right. Each entry
// is its own `gitlog` reveal (see styles/motion/site.css), so entries below
// the fold animate as they scroll in.
export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="space-y-12 lg:space-y-16">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isHead = item.year.includes("Present");
        return (
          <li
            key={item.title}
            data-reveal="gitlog"
            className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] lg:grid-cols-[minmax(0,15rem)_5rem_minmax(0,1fr)]"
          >
            <div className="gitlog-meta col-start-2 row-start-1 mb-3 lg:col-start-1 lg:mb-0 lg:text-right">
              <p
                aria-hidden="true"
                className="font-mono text-xs leading-4 text-muted-foreground"
              >
                commit{" "}
                <span className="text-[var(--code-builtin)]">
                  {commitHash(item.title)}
                </span>
              </p>
              <p className="mt-2 font-mono text-sm font-semibold text-primary lg:text-base">
                {item.year}
              </p>
              {isHead && (
                <p
                  aria-hidden="true"
                  className="mt-2 inline-block rounded border border-border bg-muted px-1.5 font-mono text-xs text-[var(--code-builtin)]"
                >
                  (
                  <span className="font-semibold text-[var(--code-constant)]">
                    HEAD -&gt;
                  </span>{" "}
                  <span className="font-semibold text-[var(--code-tag)]">
                    main
                  </span>
                  )
                </p>
              )}
            </div>

            {/* The graph: this commit's dot, and the rail down to the next */}
            <div
              aria-hidden="true"
              className="relative col-start-1 row-span-2 row-start-1 lg:col-start-2 lg:row-span-1"
            >
              <span
                className={`gitlog-rail absolute left-[7px] top-2 w-px lg:left-1/2 ${
                  isLast ? "bottom-2" : "-bottom-14 lg:-bottom-[4.5rem]"
                }`}
                style={{ backgroundImage: railGradient(index, items.length) }}
              />
              <span className="gitlog-dot absolute left-0 top-0 h-4 w-4 rounded-full border-2 border-primary bg-background transition-all group-hover:scale-125 group-hover:bg-primary lg:left-[calc(50%-0.5rem)]" />
            </div>

            <div className="gitlog-body relative col-start-2 row-start-2 lg:col-start-3 lg:row-start-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {item.company}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-foreground transition-colors group-hover:text-primary lg:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[70ch] leading-relaxed text-muted-foreground lg:text-lg">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
