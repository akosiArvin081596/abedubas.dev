interface HeroAnimationProps {
  children: React.ReactNode;
}

export function HeroAnimation({ children }: HeroAnimationProps) {
  return <div className="hero-enter">{children}</div>;
}
