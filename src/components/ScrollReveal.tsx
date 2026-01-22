"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-up"
  | "flip-left"
  | "rotate-in"
  | "bounce-in"
  | "slide-up"
  | "slide-left"
  | "slide-right"
  | "blur-in";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  easing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "bounce" | "elastic";
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  easing = "ease-out",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Small delay to ensure CSS is ready
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const easingMap = {
    "ease": "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    "elastic": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };

  const getHiddenStyles = () => {
    const styles: React.CSSProperties = {
      opacity: 0,
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: easingMap[easing],
      transitionProperty: "opacity, transform, filter",
    };

    switch (animation) {
      case "fade-up":
        styles.transform = "translateY(60px)";
        break;
      case "fade-down":
        styles.transform = "translateY(-60px)";
        break;
      case "fade-left":
        styles.transform = "translateX(60px)";
        break;
      case "fade-right":
        styles.transform = "translateX(-60px)";
        break;
      case "zoom-in":
        styles.transform = "scale(0.8)";
        break;
      case "zoom-out":
        styles.transform = "scale(1.2)";
        break;
      case "flip-up":
        styles.transform = "perspective(800px) rotateX(90deg)";
        break;
      case "flip-left":
        styles.transform = "perspective(800px) rotateY(90deg)";
        break;
      case "rotate-in":
        styles.transform = "rotate(15deg) scale(0.85)";
        break;
      case "bounce-in":
        styles.transform = "scale(0.5) translateY(40px)";
        break;
      case "slide-up":
        styles.transform = "translateY(100px)";
        break;
      case "slide-left":
        styles.transform = "translateX(100px)";
        break;
      case "slide-right":
        styles.transform = "translateX(-100px)";
        break;
      case "blur-in":
        styles.transform = "scale(0.95)";
        styles.filter = "blur(10px)";
        break;
    }

    return styles;
  };

  const getVisibleStyles = (): React.CSSProperties => ({
    opacity: 1,
    transform: "translateY(0) translateX(0) scale(1) rotate(0)",
    filter: "blur(0)",
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: easingMap[easing],
    transitionProperty: "opacity, transform, filter",
  });

  // Before mount, show nothing (prevents flash)
  if (!isMounted) {
    return (
      <div className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={isVisible ? getVisibleStyles() : getHiddenStyles()}
    >
      {children}
    </div>
  );
}
