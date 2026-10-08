"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type CSSProperties } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Stagger order for the `drop` entrance (see styles/motion/site.css)
const order = (i: number) => ({ "--i": i }) as CSSProperties;

// A link's aria-current: "page" on its own page, "true" on the pages below it
// (a blog post is in Blog), so its section stays highlighted.
const currentFor = (pathname: string, href: string) =>
  pathname === href
    ? ("page" as const)
    : href !== "/" && pathname.startsWith(`${href}/`)
      ? ("true" as const)
      : undefined;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
          {navItems.map((item, index) => {
            const current = currentFor(pathname, item.href);
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
            style={order(navItems.length + 1)}
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

      {/* Mobile Navigation. Its items drop in top to bottom as it opens. */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <div className="flex flex-col px-4 py-4">
            {navItems.map((item, index) => {
              const current = currentFor(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={current}
                  style={order(index)}
                  className={`nav-menu-item py-3 text-sm font-medium transition-colors hover:text-primary ${
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
