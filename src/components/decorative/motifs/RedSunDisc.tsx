/**
 * An abstract glowing red disc — evokes the sense of a distant sun/moon
 * without literally reproducing any flag or national symbol. A ringed
 * disc with a soft inner core, deliberately simple.
 */
export function RedSunDisc({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth={2} opacity={0.5} />
      <circle cx="100" cy="100" r="52" fill="currentColor" opacity={0.85} />
    </svg>
  );
}
