import type { CSSProperties, ReactNode } from "react";

interface ParallaxHeroProps {
  children: ReactNode;
}

const drift = (x: string, y: string) =>
  ({ "--drift-x": x, "--drift-y": y }) as CSSProperties;

// Blurred color fields behind the home page. As the page scrolls they drift
// down and to the right, by --drift-x/--drift-y over the full scroll. It's a
// CSS scroll-driven animation (.home-drift in styles/motion/home.css), so
// scrolling never re-renders. `isolate` keeps the hero backdrop's -z-10
// layers inside this wrapper, under the color fields. It clips rather than
// hides its overflow: a hidden overflow would make it a scroll container,
// which would capture its sections' snap points (`home-snap`, home.css).
export function ParallaxHero({ children }: ParallaxHeroProps) {
  return (
    <div className="home-snap relative isolate overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="home-drift absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          style={drift("64px", "240px")}
        />
        <div
          className="home-drift absolute -right-20 top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          style={drift("32px", "180px")}
        />
        <div
          className="home-drift absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
          style={drift("48px", "120px")}
        />
      </div>
      {children}
    </div>
  );
}
