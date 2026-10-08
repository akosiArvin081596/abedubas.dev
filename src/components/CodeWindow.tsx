import type { ReactNode } from "react";
import { WindowDots } from "./WindowDots";

interface CodeWindowProps {
  /** File name shown in the title bar, such as "engineer.ts". */
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

// Editor-window chrome (traffic lights and a file name) around code-styled
// content.
export function CodeWindow({
  title,
  children,
  className = "",
  bodyClassName = "",
}: CodeWindowProps) {
  return (
    <div
      className={`code-window overflow-hidden rounded-xl border border-border bg-card/80 shadow-lg backdrop-blur-md ${className}`}
    >
      <div className="code-window-bar flex items-center gap-3 border-b border-border bg-muted/70 px-4 py-2.5">
        <WindowDots />
        <span className="font-mono text-xs text-foreground/70">{title}</span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
