/**
 * Kentucky's state bird as a flat pixel sprite — the "space invader" of the
 * page. Drawn from a character map so the shape stays editable by hand.
 *   #  body   e  eye   b  beak
 */

const MAP = [
  "...##......",
  "..####.....",
  ".######....",
  "b####e#....",
  "##########.",
  ".#########.",
  "..#######..",
  "...##..##..",
];

const FILL: Record<string, string> = {
  "#": "fill-invader",
  b: "fill-butter",
  e: "fill-ink",
};

export function Cardinal({
  className = "",
  size = 66,
}: {
  className?: string;
  size?: number;
}) {
  const cols = MAP[0].length;
  const rows = MAP.length;

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      width={size}
      height={(size / cols) * rows}
      aria-hidden
      shapeRendering="crispEdges"
      className={`shrink-0 ${className}`}
    >
      {MAP.flatMap((row, y) =>
        [...row].map((cell, x) =>
          FILL[cell] ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="1"
              height="1"
              className={FILL[cell]}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
