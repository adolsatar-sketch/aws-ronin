/**
 * A small cluster of flowing ink strokes — thin, tapered, moving in
 * loosely parallel curves like brush lines drawn in one motion.
 */
export function InkLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true" focusable="false">
      <path
        d="M20,20 C60,60 40,110 70,150 C95,182 90,210 60,230"
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M70,10 C104,55 82,100 108,142 C130,178 122,208 96,232"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.75}
      />
      <path
        d="M124,26 C150,64 132,102 154,136 C172,164 166,196 146,222"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.5}
      />
    </svg>
  );
}
