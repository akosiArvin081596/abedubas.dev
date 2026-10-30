interface SkillBadgeProps {
  name: string;
  /** Make the badge a stagger item of the reveal container around it. */
  revealItem?: boolean;
  /** A smaller badge, for dense grids that must fit one screen. */
  compact?: boolean;
}

export function SkillBadge({ name, revealItem = false, compact = false }: SkillBadgeProps) {
  return (
    <span
      data-reveal-item={revealItem ? "" : undefined}
      className={`inline-flex items-center rounded-lg border border-border bg-card font-medium text-card-foreground transition-colors hover:border-primary hover:text-primary ${
        compact ? "px-2.5 py-1 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      {name}
    </span>
  );
}
