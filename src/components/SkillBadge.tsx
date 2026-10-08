interface SkillBadgeProps {
  name: string;
  /** Make the badge a stagger item of the reveal container around it. */
  revealItem?: boolean;
}

export function SkillBadge({ name, revealItem = false }: SkillBadgeProps) {
  return (
    <span
      data-reveal-item={revealItem ? "" : undefined}
      className="inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {name}
    </span>
  );
}
