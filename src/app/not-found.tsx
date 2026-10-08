import Link from "next/link";
import { CodeWindow } from "@/components";
import { MissingPath } from "./MissingPath";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[calc(100vh-200px)] flex-col items-center justify-center py-16">
      {/* `crt`, on load: the terminal powers on (see styles/motion/site.css) */}
      <div
        className="relative w-full max-w-5xl"
        data-reveal="crt"
        data-reveal-on="load"
      >
        <span aria-hidden="true" className="crt-line" />
        <CodeWindow
          title="zsh"
          className="crt-screen"
          bodyClassName="p-6 font-mono text-sm leading-relaxed md:p-10 md:text-base"
        >
          <p className="text-foreground wrap-anywhere">
            <span aria-hidden="true">
              <span className="text-[var(--code-tag)]">~</span>{" "}
              <span className="text-muted-foreground">$</span>{" "}
            </span>
            cd <MissingPath />
          </p>
          <p className="text-[var(--code-keyword)] wrap-anywhere">
            cd: no such file or directory: <MissingPath />
          </p>

          <div className="my-12 text-center font-sans md:my-16">
            <h1 className="mb-4 font-mono text-7xl font-bold text-primary md:text-9xl">
              404
            </h1>
            <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
              Page Not Found
            </h2>
            <p className="mx-auto mb-10 max-w-[60ch] text-base text-muted-foreground md:text-lg">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Go Back Home
            </Link>
          </div>

          <p aria-hidden="true">
            <span className="text-[var(--code-tag)]">~</span>{" "}
            <span className="text-muted-foreground">$</span>{" "}
            <span className="crt-cursor inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-primary" />
          </p>
        </CodeWindow>
      </div>
    </div>
  );
}
