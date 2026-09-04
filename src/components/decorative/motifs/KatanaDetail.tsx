/**
 * A katana, suggested rather than illustrated: the curved blade line,
 * the square guard (tsuba), and a short handle — bold strokes, no
 * surface detail, so it reads at a glance rather than as a technical
 * drawing.
 */
export function KatanaDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 70" className={className} aria-hidden="true" focusable="false">
      <path
        d="M6,52 C70,60 150,48 190,30 C212,20 232,14 262,14"
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <rect x="182" y="16" width="16" height="28" rx="3" transform="rotate(-16 190 30)" fill="none" stroke="currentColor" strokeWidth={6} />
      <path d="M198,24 L226,10" fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
}
