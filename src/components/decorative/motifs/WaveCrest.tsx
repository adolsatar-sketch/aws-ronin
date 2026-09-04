/**
 * A cresting wave, drawn as three nested brush-stroke arcs — the same
 * rolling-wave rhythm as classic Japanese wave prints, reduced to bare
 * ink lines rather than the full ornamented print pattern.
 */
export function WaveCrest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden="true" focusable="false">
      <path
        d="M6,120 Q40,60 80,90 Q110,112 130,72 Q150,32 190,58 Q212,72 234,54"
        fill="none"
        stroke="currentColor"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path
        d="M6,96 Q40,44 80,68 Q108,86 128,52 Q148,18 188,40"
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d="M20,132 Q46,104 70,116"
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.5}
      />
    </svg>
  );
}
