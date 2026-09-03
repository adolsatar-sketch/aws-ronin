/**
 * A single swooping calligraphic brush stroke — thick-to-thin taper,
 * built as a filled freeform shape (not a uniform stroked line) so it
 * reads like ink laid down by a brush rather than a vector line.
 */
export function BrushStroke({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 120" className={className} aria-hidden="true" focusable="false">
      <path
        d="M8,86 C48,100 96,102 140,84 C186,65 214,34 258,22 C276,17 292,16 312,20 C294,28 274,36 256,50 C214,82 168,108 118,114 C78,119 38,110 8,86 Z"
        fill="currentColor"
      />
    </svg>
  );
}
