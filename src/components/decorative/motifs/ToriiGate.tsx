/**
 * A torii gate, drawn as a clean outline: the two upright posts, the
 * straight lower crossbar (nuki), and the wider top lintel (kasagi)
 * with its characteristic slight upward curve at each end — the single
 * most recognizable silhouette in the set, kept hollow/outlined rather
 * than a filled block.
 */
export function ToriiGate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true" focusable="false">
      <path
        d="M14,38 Q120,18 226,38"
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
      />
      <path
        d="M28,56 L212,56"
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <path d="M62,44 L58,192" fill="none" stroke="currentColor" strokeWidth={9} strokeLinecap="round" />
      <path d="M178,44 L182,192" fill="none" stroke="currentColor" strokeWidth={9} strokeLinecap="round" />
      <path d="M120,26 L120,10" fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round" />
    </svg>
  );
}
