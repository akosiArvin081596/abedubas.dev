interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

// A code-comment eyebrow, like "// services". Screen readers skip the
// slashes.
export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span className={`inline-block font-mono text-sm text-primary ${className}`}>
      <span aria-hidden="true" className="text-muted-foreground">
        {"// "}
      </span>
      {children}
    </span>
  );
}
