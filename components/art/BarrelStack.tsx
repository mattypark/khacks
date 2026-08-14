/**
 * Hero object: three line-art cubes stacked like a bourbon rickhouse rack.
 * Faces carry the three things Khacks is made of — a barrel, a cardinal,
 * and a terminal cursor. Each cube is tagged for the GSAP drop-in timeline.
 */

type CubeProps = {
  x: number;
  y: number;
  order: number;
  children?: React.ReactNode;
};

const W = 150; // front face width
const D = 46; // depth offset for the top/right faces

function Cube({ x, y, order, children }: CubeProps) {
  const front = `${x},${y} ${x + W},${y} ${x + W},${y + W} ${x},${y + W}`;
  const top = `${x},${y} ${x + D},${y - D} ${x + W + D},${y - D} ${x + W},${y}`;
  const side = `${x + W},${y} ${x + W + D},${y - D} ${x + W + D},${y + W - D} ${x + W},${y + W}`;

  return (
    <g data-cube={order}>
      <polygon points={top} className="fill-chalk stroke-ink" strokeWidth="4" />
      <polygon points={side} className="fill-chalk stroke-ink" strokeWidth="4" />
      <polygon points={front} className="fill-chalk stroke-ink" strokeWidth="4" />
      <g transform={`translate(${x + W / 2} ${y + W / 2})`}>{children}</g>
    </g>
  );
}

export function BarrelStack({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 540"
      width="260"
      height="540"
      role="img"
      aria-label="Three stacked crates marked with a bourbon barrel, a cardinal, and a terminal cursor"
      className={`h-auto w-full max-w-[260px] ${className}`}
    >
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Top crate — barrel */}
        <Cube x={30} y={60} order={0}>
          <g className="fill-none stroke-ink" strokeWidth="5">
            <path d="M -34 -40 C -52 -14, -52 14, -34 40 L 34 40 C 52 14, 52 -14, 34 -40 Z" />
            <path d="M -46 -18 L 46 -18" />
            <path d="M -46 18 L 46 18" />
            <path d="M 0 -40 L 0 40" strokeWidth="3" />
          </g>
        </Cube>

        {/* Middle crate — cardinal */}
        <Cube x={55} y={220} order={1}>
          <g className="fill-none stroke-ink" strokeWidth="5">
            <path d="M -30 26 C -44 6, -34 -26, -6 -30 C 6 -44, 26 -40, 30 -26 L 44 -22 L 30 -14 C 38 6, 26 28, 4 30 Z" />
            <path d="M -8 -2 C 0 8, 12 10, 20 4" strokeWidth="4" />
            <circle cx="14" cy="-18" r="3.5" className="fill-ink" />
          </g>
        </Cube>

        {/* Bottom crate — terminal cursor */}
        <Cube x={30} y={380} order={2}>
          <g className="fill-none stroke-ink" strokeWidth="6">
            <path d="M -40 -22 L -12 2 L -40 26" />
            <path d="M 2 28 L 42 28" />
          </g>
        </Cube>
      </g>
    </svg>
  );
}
