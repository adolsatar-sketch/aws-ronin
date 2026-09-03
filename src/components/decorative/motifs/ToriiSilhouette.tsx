/**
 * A simplified, abstracted gate silhouette — two uprights and two
 * crossbars, reduced to bare geometry rather than a literal, detailed
 * torii illustration.
 */
export function ToriiSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden="true" focusable="false">
      <path
        d="M14,46 L206,46 L206,58 L14,58 Z M0,20 L220,20 L220,32 L0,32 Z"
        fill="currentColor"
      />
      <rect x="42" y="32" width="14" height="140" fill="currentColor" />
      <rect x="164" y="32" width="14" height="140" fill="currentColor" />
      <rect x="30" y="86" width="160" height="10" fill="currentColor" opacity={0.7} />
    </svg>
  );
}
