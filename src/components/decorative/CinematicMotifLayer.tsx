"use client";

import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useDeviceProfile } from "@/lib/motion/useDeviceProfile";
import { motifPlacements } from "./motifData";

const animationClass = {
  drift: "animate-motif-drift",
  "drift-reverse": "animate-motif-drift-reverse",
  breathe: "animate-motif-breathe",
} as const;

/**
 * The site's cinematic decorative layer: original brush-stroke, ink-line,
 * Ensō, torii, katana-edge, and sun-disc motifs, placed and animated from
 * the data in `motifData.ts`. Sits above the base AmbientBackground glow
 * but behind all real content (pointer-events-none, very low opacity),
 * so it reads as atmosphere, never competes with the work on screen.
 *
 * Every motif is a plain currentColor SVG (no raster images, no white
 * background, nothing that could read as a watermark) and moves only via
 * translate/rotate/opacity — driven either by a slow CSS loop or by the
 * same shared --scroll-shift variable AmbientBackground publishes, so
 * adding a scroll-linked motif costs nothing extra. On Android, motifs
 * flagged !androidSafe are skipped entirely to keep the layer light.
 *
 * Each placement is two nested elements on purpose: the outer div carries
 * the scroll-parallax offset (its own `translate`), the inner div carries
 * the slow CSS loop (which animates `translate`/`rotate`/`opacity` on
 * itself). Two different elements each owning their own `translate` is
 * what lets both move independently without one silently overriding the
 * other — the exact conflict fixed in AmbientBackground's own glows.
 */
export function CinematicMotifLayer() {
  const reduceMotion = useReducedMotion();
  const { isAndroid } = useDeviceProfile();

  const visible = motifPlacements.filter((m) => (isAndroid ? m.androidSafe : true));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
      {visible.map((m) => {
        const { Motif } = m;
        return (
          <div
            key={m.id}
            className={`${m.className} ${m.colorClass}`}
            style={{
              translate: reduceMotion ? undefined : `0 calc(var(--scroll-shift, 0px) * ${m.scrollFactor})`,
            }}
          >
            <div
              className={reduceMotion ? "h-full w-full" : `h-full w-full ${animationClass[m.animation]}`}
              style={{
                ["--motif-opacity" as string]: m.opacity,
                opacity: reduceMotion ? m.opacity * 0.6 : undefined,
                animationDelay: m.animationDelay,
              }}
            >
              <Motif className="h-full w-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
