"use client";

import { AnimatePresence, motion } from "motion/react";
import { RONIN_MARK_PATH, RONIN_MARK_VIEWBOX } from "@/lib/motion/roninMarkPath";
import { useTransition } from "./TransitionContext";
import { useDeviceProfile } from "@/lib/motion/useDeviceProfile";

/**
 * The visual half of the transition system — reads phase/seed from
 * TransitionContext (which also drives route-change auto-play and manual
 * triggers like the language switch) and renders the branded cover/hold/
 * reveal sequence. One instance, mounted once in SiteChrome.
 *
 * Two rendering techniques, picked once per transition, never mixed:
 * desktop keeps the clip-path wipe (fine on desktop GPUs); mobile uses a
 * flat opacity crossfade instead — animating `clip-path` on a full-screen
 * layer forces a repaint of the covered region every frame on weaker
 * GPUs, which is exactly what read as stutter on Android/Samsung
 * Internet. Neither variant uses a blur filter — the glow is a plain
 * radial-gradient, so nothing here needs anything but transform/opacity
 * to composite.
 */
export function PageTransitionOverlay() {
  const { phase, seed } = useTransition();
  const { isMobile } = useDeviceProfile();

  const fromLeft = seed < 0.5;
  const glowX = 20 + seed * 60;
  const covered = phase === "holding" || phase === "revealing";
  const active = phase !== "idle";

  const coverTransition = {
    duration: phase === "covering" ? 0.35 : phase === "revealing" ? 0.4 : 0,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden="true"
          data-testid="page-transition-overlay"
          className="pointer-events-none fixed inset-0 z-[500] overflow-hidden bg-ronin-black"
          initial={
            isMobile
              ? { opacity: 0 }
              : { clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }
          }
          animate={
            isMobile
              ? { opacity: phase === "revealing" ? 0 : 1 }
              : {
                  clipPath:
                    phase === "covering" || phase === "holding"
                      ? "inset(0 0% 0 0)"
                      : fromLeft
                        ? "inset(0 0 0 100%)"
                        : "inset(0 100% 0 0)",
                }
          }
          exit={{ opacity: 0, transition: { duration: 0.01 } }}
          transition={coverTransition}
        >
          {/* Soft glow — a plain radial-gradient, never filter: blur. */}
          <motion.div
            className="absolute h-[60vmax] w-[60vmax] rounded-full"
            style={{
              top: "50%",
              left: `${glowX}%`,
              translate: "-50% -50%",
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--color-ronin-red) 55%, transparent) 0%, transparent 65%)",
            }}
            animate={covered ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
            transition={{ duration: 1.1, repeat: covered ? Infinity : 0, ease: "easeInOut" }}
          />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-ronin-red/60 to-transparent" />

          <motion.div
            className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-ronin-red md:h-32 md:w-32"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: phase === "covering" ? 1 : phase === "holding" ? [1, 1.03, 1] : 1.1,
              opacity: phase === "revealing" ? 0 : 1,
            }}
            transition={
              phase === "holding"
                ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
                : { duration: phase === "covering" ? 0.35 : 0.28, ease: [0.16, 1, 0.3, 1] }
            }
            style={{ filter: "drop-shadow(0 0 18px rgba(169,45,46,0.55))" }}
          >
            <svg viewBox={RONIN_MARK_VIEWBOX} className="h-full w-full">
              <path d={RONIN_MARK_PATH} fill="currentColor" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
