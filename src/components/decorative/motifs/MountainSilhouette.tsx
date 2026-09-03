/**
 * An abstract, symmetrical peak — reduced to a bare triangular silhouette
 * with a simple snow-line notch, evoking a distant mountain without
 * illustrating a specific, real, identifiable one.
 */
export function MountainSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden="true" focusable="false">
      <path
        d="M120,10 L226,130 L14,130 Z M120,10 L145,58 L110,58 Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
