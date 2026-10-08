import { Fragment, type CSSProperties } from "react";

interface SplitTextProps {
  text: string;
  /** Split into words (the default) or characters. */
  by?: "word" | "char";
  /** First --si value, to continue the count from an earlier SplitText. */
  start?: number;
  /** Classes for every piece, such as a gradient. */
  className?: string;
}

// Renders text as pieces numbered with --si, so an effect can stagger them.
// Words keep their spaces and read normally. Characters are aria-hidden
// behind a screen-reader copy, because split letters get spelled out; that
// copy is unselectable, so copying the text doesn't paste it twice.
export function SplitText({
  text,
  by = "word",
  start = 0,
  className = "",
}: SplitTextProps) {
  const words: { text: string; si: number }[][] = [];
  let si = start;
  for (const word of text.split(" ")) {
    const pieces = by === "word" ? [word] : Array.from(word);
    words.push(pieces.map((piece, k) => ({ text: piece, si: si + k })));
    si += pieces.length;
  }

  const split = words.map((pieces, w) => (
    <Fragment key={w}>
      {w > 0 && " "}
      <span className="split-word">
        {pieces.map((piece) => (
          <span
            key={piece.si}
            className={className || undefined}
            style={{ "--si": piece.si } as CSSProperties}
          >
            {piece.text}
          </span>
        ))}
      </span>
    </Fragment>
  ));

  if (by === "word") return <>{split}</>;
  return (
    <>
      <span className="sr-only select-none">{text}</span>
      <span aria-hidden="true">{split}</span>
    </>
  );
}
