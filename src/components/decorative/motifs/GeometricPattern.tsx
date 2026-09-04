/**
 * A short strip of hexagon-and-spoke units — a simplified reading of
 * the six-petal linework found in traditional Japanese geometric
 * patterns (asanoha/kikkou families): a hexagon outline with six lines
 * from its center to each vertex, giving a flower-like facet rather
 * than a generic star.
 */
function HexFlower({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const points = [0, 60, 120, 180, 240, 300].map((a) => {
    const rad = (a * Math.PI) / 180;
    return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
  });
  const hex = points.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <>
      <polygon points={hex} fill="none" stroke="currentColor" strokeWidth={3} strokeLinejoin="round" />
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="currentColor" strokeWidth={2.5} />
      ))}
    </>
  );
}

export function GeometricPattern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 100" className={className} aria-hidden="true" focusable="false">
      <HexFlower cx={50} cy={50} r={36} />
      <HexFlower cx={140} cy={50} r={36} />
      <HexFlower cx={230} cy={50} r={36} />
    </svg>
  );
}
