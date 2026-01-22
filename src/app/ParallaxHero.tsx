"use client";

import { useParallax } from "@/hooks/useParallax";
import { ReactNode } from "react";

interface ParallaxHeroProps {
  children: ReactNode;
}

export function ParallaxHero({ children }: ParallaxHeroProps) {
  const scrollY = useParallax();

  return (
    <div className="relative overflow-hidden">
      {/* Parallax Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.5}px) translateX(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.35}px) translateX(${scrollY * -0.1}px)` }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.25}px)` }}
        />
      </div>
      {children}
    </div>
  );
}

interface ParallaxImageProps {
  children: ReactNode;
}

export function ParallaxImage({ children }: ParallaxImageProps) {
  const scrollY = useParallax();

  return (
    <div
      className="relative flex-shrink-0"
      style={{ transform: `translateY(${scrollY * -0.15}px)` }}
    >
      {children}
    </div>
  );
}
