import type { CSSProperties } from "react";

// The small scenes along the foot of each Philosophy card, drawn in the
// card's tone (currentColor) over muted strokes, so they read in both
// themes. Decorative. Under `hinge` (motion/site.css), once a card lands,
// its .art-draw strokes draw on (pathLength 1) and its .art-grow bars grow
// left to right, in --k order.
export type PhilosophyArtName = "clean" | "user" | "learning" | "performance";

const k = (n: number) => ({ "--k": n }) as CSSProperties;
const muted = "fill-muted-foreground/30";
const line = "stroke-muted-foreground/45";

// Drawn strokes are paths, since pathLength on basic shapes isn't
// supported everywhere.
const ring = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const box = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`;

function Clean() {
  const rows: [y: number, bars: [x: number, w: number, tone?: boolean][]][] = [
    [7, [[26, 44, true], [76, 58]]],
    [19, [[40, 92]]],
    [31, [[40, 34, true], [80, 66]]],
    [43, [[54, 60]]],
    [55, [[26, 20, true]]],
  ];
  let n = 0;
  return (
    <>
      {rows.map(([y]) => (
        <rect key={y} x={8} y={y + 1} width={8} height={4} rx={1} className={muted} />
      ))}
      {rows.map(([y, bars]) =>
        bars.map(([x, w, tone]) => (
          <rect
            key={`${y}-${x}`}
            x={x}
            y={y}
            width={w}
            height={6}
            rx={3}
            className={`art-grow ${tone ? "fill-current" : muted}`}
            style={k(n++)}
          />
        )),
      )}
      <line x1={50} y1={53} x2={50} y2={63} stroke="currentColor" strokeWidth={1.5} />
      <circle cx={208} cy={32} r={15} className="fill-current opacity-10" />
      <path d={ring(208, 32, 15)} fill="none" stroke="currentColor" strokeWidth={1.5} className="art-draw" pathLength={1} />
      <path
        d="M201 32.5l5 5 9-10"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="art-draw"
        pathLength={1}
        style={k(2)}
      />
    </>
  );
}

function User() {
  return (
    <>
      <path d={box(6, 4, 228, 56, 6)} fill="none" strokeWidth={1.25} className={`art-draw ${line}`} pathLength={1} />
      <line x1={6} y1={16} x2={234} y2={16} strokeWidth={1} className={line} />
      {[14, 22, 30].map((cx) => (
        <circle key={cx} cx={cx} cy={10} r={2} className="fill-muted-foreground/35" />
      ))}
      <rect x={18} y={25} width={74} height={5} rx={2.5} className={`art-grow ${muted}`} style={k(0)} />
      <rect x={18} y={35} width={52} height={5} rx={2.5} className={`art-grow ${muted}`} style={k(1)} />
      <rect x={18} y={45} width={64} height={5} rx={2.5} className={`art-grow ${muted}`} style={k(2)} />
      <rect x={128} y={29} width={76} height={20} rx={10} fill="currentColor" fillOpacity={0.15} stroke="currentColor" strokeWidth={1.25} />
      <rect x={144} y={37} width={44} height={4} rx={2} className="art-grow fill-current" style={k(3)} />
      <path d={ring(192, 45, 9)} fill="none" stroke="currentColor" strokeOpacity={0.5} className="art-draw" pathLength={1} style={k(4)} />
      <path d={ring(192, 45, 15)} fill="none" stroke="currentColor" strokeOpacity={0.25} className="art-draw" pathLength={1} style={k(5)} />
      <path
        d="M190 41v15l4-4 3 6.5 3-1.3-3-6.4h5.5z"
        strokeWidth={1.25}
        strokeLinejoin="round"
        className="fill-card stroke-foreground"
      />
    </>
  );
}

function Learning() {
  const points: [number, number][] = [
    [14, 54],
    [54, 48],
    [94, 42],
    [134, 32],
    [174, 25],
    [214, 12],
  ];
  const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <>
      {[20, 40, 60].map((y) => (
        <line key={y} x1={4} y1={y} x2={236} y2={y} strokeWidth={1} strokeDasharray="2 4" className={line} />
      ))}
      <path d={`${d} L214 60 L14 60Z`} fill="currentColor" fillOpacity={0.08} />
      <path d={d} fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" className="art-draw" pathLength={1} />
      <circle cx={214} cy={12} r={10} fill="currentColor" fillOpacity={0.15} />
      {points.map(([x, y], i) => (
        <circle
          key={x}
          cx={x}
          cy={y}
          r={i === points.length - 1 ? 4.5 : 3.25}
          strokeWidth={1.5}
          stroke="currentColor"
          className={i === points.length - 1 ? "fill-current" : "fill-card"}
        />
      ))}
    </>
  );
}

function Performance() {
  const bars: [x: number, y: number, w: number][] = [
    [12, 6, 46],
    [26, 18, 62],
    [40, 30, 34],
    [50, 42, 52],
    [66, 54, 30],
  ];
  return (
    <>
      {bars.map(([x, y, w], i) => (
        <rect
          key={y}
          x={x}
          y={y}
          width={w}
          height={6}
          rx={3}
          className={`art-grow ${i === 0 ? "fill-current" : muted}`}
          style={k(i)}
        />
      ))}
      <line x1={128} y1={2} x2={128} y2={62} stroke="currentColor" strokeWidth={1.25} strokeDasharray="3 3" />
      <rect x={142} y={20} width={88} height={24} rx={12} fill="currentColor" fillOpacity={0.12} stroke="currentColor" strokeOpacity={0.5} />
      <path d="M160 24.5 153.5 33h5.5l-1.25 6.5 6.75-8.5h-5.5z" className="fill-current" />
      <rect x={172} y={29} width={46} height={6} rx={3} className="art-grow fill-current" style={k(5)} />
    </>
  );
}

const scenes = { clean: Clean, user: User, learning: Learning, performance: Performance };

export function PhilosophyArt({ name, className = "" }: { name: PhilosophyArtName; className?: string }) {
  const Scene = scenes[name];
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 64"
      preserveAspectRatio="xMidYMid meet"
      className={`tone-text ${className}`}
    >
      <Scene />
    </svg>
  );
}
