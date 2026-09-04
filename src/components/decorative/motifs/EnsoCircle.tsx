/**
 * Ensō — the single-stroke, deliberately-incomplete brush circle, one of
 * the most recognizable and safest-to-render Zen calligraphy marks: a
 * near-circle with a visible gap and brush-taper at the ends, never a
 * closed geometric ring.
 */
export function EnsoCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <path
        d="M100,22 C148,22 178,56 182,96 C186,138 156,176 108,180 C62,184 26,154 20,112 C15,76 36,42 68,28"
        fill="none"
        stroke="currentColor"
        strokeWidth={10}
        strokeLinecap="round"
      />
    </svg>
  );
}
