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
          className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div
          className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div
          className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
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
      className="relative flex-shrink-0 transition-transform duration-100"
      style={{ transform: `translateY(${scrollY * 0.1}px)` }}
    >
      {children}
    </div>
  );
}
