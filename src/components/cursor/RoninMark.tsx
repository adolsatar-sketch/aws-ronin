import { RONIN_MARK_PATH, RONIN_MARK_VIEWBOX } from "@/lib/motion/roninMarkPath";

export function RoninMark({ className }: { className?: string }) {
  return (
    <svg viewBox={RONIN_MARK_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <path d={RONIN_MARK_PATH} fill="currentColor" />
    </svg>
  );
}
