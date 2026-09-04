/**
 * The red sun — a bold ringed disc. Kept as a single deliberate circle
 * (no rays, no flag proportions) so it reads as a distant glowing sun
 * rather than a literal national emblem.
 */
export function RedSunDisc({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth={5} opacity={0.55} />
      <circle cx="100" cy="100" r="60" fill="currentColor" />
    </svg>
  );
}
