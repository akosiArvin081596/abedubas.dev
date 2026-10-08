// The three traffic-light dots of a window's title bar. Decorative.
export function WindowDots() {
  return (
    <span className="flex shrink-0 gap-1.5" aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
    </span>
  );
}
