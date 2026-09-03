/**
 * Ensō — the single-stroke, deliberately-incomplete brush circle. One of
 * the most recognizable and safest-to-render Zen calligraphy marks: a
 * near-circle with a visible gap and brush-taper at the ends, never a
 * closed geometric ring.
 */
export function EnsoCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <path
        d="M100,26 C145.5,26 174,58 178,96 C182,136 154,172 108,176 C64,180 30,152 24,112 C19,78 38,46 68,32"
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
      />
    </svg>
  );
}
