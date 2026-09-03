/**
 * A single curved blade line with a small guard mark — suggestive of a
 * katana's edge and tsuba, not a literal illustrated weapon.
 */
export function KatanaEdge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 60" className={className} aria-hidden="true" focusable="false">
      <path
        d="M4,44 C70,50 140,40 172,26 C196,15 220,10 252,12"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M4,44 C70,50 140,40 172,26"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.4}
        transform="translate(0, 6)"
      />
      <circle cx="172" cy="26" r="7" fill="none" stroke="currentColor" strokeWidth={2.5} />
    </svg>
  );
}
