"use client";

import { RoninMark } from "@/components/cursor/RoninMark";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useDeviceProfile } from "@/lib/motion/useDeviceProfile";
import { useGlobalMotionVars } from "@/lib/motion/useGlobalMotionVars";

/**
 * A living field behind the entire site — layered burgundy/red/ember glows
 * that drift independently, faint logo-derived lines, grain, an occasional
 * light sweep, and a base color that shifts continuously with scroll
 * position, so the identity never reads as flat, static black on any page.
 *
 * Deliberately filter-free: every glow is a plain radial-gradient circle,
 * not `filter: blur()`. A blurred layer has to be re-rasterized whenever
 * its size changes, which is exactly what "drift + scale" does every
 * frame — on mid-range Android/Samsung Internet that is the difference
 * between smooth compositing and visible stutter. A gradient achieves the
 * same soft-glow read while staying compositor-only (transform/opacity).
 */
export function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const { isAndroid } = useDeviceProfile();

  // Owns the site's shared scroll/pointer CSS vars — see useGlobalMotionVars.
  useGlobalMotionVars(reduceMotion);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
      style={{ backgroundColor: "var(--bg-color, #08090b)", transition: "background-color 0.6s linear" }}
    >
      {/* Deep red / burgundy glow field — the primary color movement. Pure
          radial-gradient, no filter: blur, so drift/scale stays compositor-cheap. */}
      <div
        className={`absolute -top-[20%] -left-[15%] h-[70vmax] w-[70vmax] rounded-full ${
          reduceMotion ? "" : "animate-ambient-drift-a"
        }`}
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--color-ronin-red) 34%, transparent) 0%, transparent 68%)",
          translate: "var(--pointer-x, 0) calc(var(--pointer-y, 0) + var(--scroll-shift, 0px))",
        }}
      />
      <div
        className={`absolute -right-[10%] top-[30%] h-[55vmax] w-[55vmax] rounded-full ${
          reduceMotion ? "" : "animate-ambient-drift-b"
        }`}
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--color-ronin-burgundy) 85%, transparent) 0%, transparent 70%)",
          translate: "0 calc(var(--scroll-shift, 0px) * -0.6)",
        }}
      />
      {!isAndroid && (
        <div
          className={`absolute bottom-[-25%] left-[20%] h-[60vmax] w-[60vmax] rounded-full ${
            reduceMotion ? "" : "animate-ambient-drift-c"
          }`}
          style={{
            background: "radial-gradient(circle, color-mix(in oklab, var(--color-ronin-red) 22%, transparent) 0%, transparent 72%)",
            translate:
              "calc(var(--pointer-x, 0) * -1) calc(var(--pointer-y, 0) * -1 + var(--scroll-shift, 0px) * 0.4)",
            opacity: "var(--touch-boost, 0.12)",
          }}
        />
      )}
      {/* Warm ember highlight — the "third color" so the field isn't just black/red */}
      {!isAndroid && (
        <div
          className={`absolute top-[55%] right-[25%] h-[42vmax] w-[42vmax] rounded-full ${
            reduceMotion ? "" : "animate-ambient-drift-d"
          }`}
          style={{
            background: "radial-gradient(circle, color-mix(in oklab, var(--color-ronin-ember) 45%, transparent) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Faint logo-derived lines, drifting independently of the glows */}
      <div className={`absolute top-[8%] -right-[18%] h-[55vmax] w-[55vmax] text-ronin-red/[0.05] ${reduceMotion ? "" : "animate-ambient-line"}`}>
        <RoninMark className="h-full w-full" />
      </div>
      {!isAndroid && (
        <div
          className={`absolute -bottom-[15%] -left-[20%] h-[46vmax] w-[46vmax] rotate-[160deg] text-ronin-white/[0.025] ${
            reduceMotion ? "" : "animate-ambient-line"
          }`}
          style={{ animationDelay: "-20s" }}
        >
          <RoninMark className="h-full w-full" />
        </div>
      )}

      {/* Occasional light sweep behind content */}
      {!reduceMotion && !isAndroid && (
        <div
          className="animate-ambient-sweep absolute inset-y-0 w-[35%] bg-gradient-to-r from-transparent via-ronin-red/[0.06] to-transparent"
          style={{ animationDelay: "-6s" }}
        />
      )}

      <div className="absolute inset-0 grain-layer opacity-[0.035]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08090b_92%)]" />
    </div>
  );
}
