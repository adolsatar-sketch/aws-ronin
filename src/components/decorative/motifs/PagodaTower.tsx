/**
 * A five-tier pagoda, reduced to its stacked-roofline silhouette — each
 * tier a simple upward-swept eave, narrowing toward the spire. Outlined,
 * not filled, so it reads as a light architectural sketch rather than a
 * heavy block.
 */
export function PagodaTower({ className }: { className?: string }) {
  const tiers = [
    { y: 150, w: 100 },
    { y: 118, w: 84 },
    { y: 88, w: 68 },
    { y: 60, w: 52 },
    { y: 34, w: 36 },
  ];
  return (
    <svg viewBox="0 0 200 210" className={className} aria-hidden="true" focusable="false">
      <path d="M100,10 L100,28" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" />
      <circle cx="100" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth={4} />
      {tiers.map((t, i) => (
        <path
          key={i}
          d={`M${100 - t.w},${t.y} Q100,${t.y - 16} ${100 + t.w},${t.y}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
        />
      ))}
      <path d="M78,150 L78,196 M122,150 L122,196" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" />
      <path d="M64,196 L136,196" fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
}
