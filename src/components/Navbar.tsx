"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { SECTIONS, type SectionKey } from "@/data/sections";
import { spyServerSnapshot, spySnapshot, subscribeSpy } from "@/lib/scroll-spy";
import { ThemeToggle } from "./ThemeToggle";

// Stagger order for the `drop` entrance (see styles/motion/site.css)
const order = (i: number) => ({ "--i": i }) as CSSProperties;

// Which nav item to underline. On the home page, the section in view
// (scroll-spy, lib/scroll-spy.ts), or Home before anything is measured,
// which is also what the server renders. On a post, Blog.
function useActive(pathname: string): SectionKey | null {
  const spied = useSyncExternalStore(subscribeSpy, spySnapshot, spyServerSnapshot);
  if (pathname.startsWith("/blog/")) return "blog";
  if (pathname !== "/") return null;
  if (spied === undefined) return "home";
  return SECTIONS.some((section) => section.key === spied)
    ? (spied as SectionKey)
    : null;
}

// A link's aria-current: "location" for the section in view on the home
// page, "true" for Blog on a post (the post is in it).
const currentFor = (pathname: string, active: SectionKey | null, key: SectionKey) =>
  active !== key ? undefined : pathname === "/" ? ("location" as const) : ("true" as const);

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const active = useActive(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      {/* A fixed height, so the header with its border is exactly 4.5rem,
          which the home hero takes off the screen height */}
      <nav
        className="container-site flex h-[calc(4.5rem-1px)] items-center justify-between"
        data-reveal="drop"
        data-reveal-on="load"
      >
        <Link
          href="/"
          className="group flex items-center gap-1 text-xl font-bold"
          data-reveal-item
          style={order(0)}
        >
          <span className="text-primary">&lt;</span>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all group-hover:from-accent group-hover:to-primary">
            abedubas
          </span>
          <span className="text-muted-foreground">.dev</span>
          <span className="text-primary">/&gt;</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((item, index) => {
            const current = currentFor(pathname, active, item.key);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current}
                data-reveal-item
                style={order(index + 1)}
                className={`nav-link text-sm font-medium transition-colors hover:text-primary ${
                  current ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <span
            className="flex"
            data-reveal-item
            style={order(SECTIONS.length + 1)}
          >
            <ThemeToggle />
          </span>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <span className="flex" data-reveal-item style={order(1)}>
            <ThemeToggle />
          </span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 hover:bg-muted"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls={isMenuOpen ? "mobile-menu" : undefined}
            data-reveal-item
            style={order(2)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation. Its items drop in top to bottom as it opens. It
          floats over the page under the header, so opening it never moves
          the content below: HomeSnap measures a link's target on click,
          before the menu closes. */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-y border-border bg-background shadow-lg md:hidden"
        >
          <div className="flex flex-col px-4 py-4">
            {SECTIONS.map((item, index) => {
              const current = currentFor(pathname, active, item.key);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={current}
                  style={order(index)}
                  className={`nav-link nav-menu-item w-fit py-3 text-sm font-medium transition-colors hover:text-primary ${
                    current ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
