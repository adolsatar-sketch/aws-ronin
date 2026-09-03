"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { RONIN_MARK_PATH, RONIN_MARK_VIEWBOX } from "@/lib/motion/roninMarkPath";

type Phase = "idle" | "covering" | "revealing";

/**
 * A reusable, App-Router-wide route transition: a branded panel sweeps in to
 * fully cover the viewport (so the underlying route swap is never visible),
 * the mark animates at its center, then the panel wipes away to reveal the
 * new page. One instance, mounted once in SiteChrome — no per-page wiring.
 */
export function PageTransitionOverlay() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const prevPathname = useRef(pathname);
  const [phase, setPhase] = useState<Phase>("idle");
  const [seed, setSeed] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];

    if (reduceMotion) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to a completed route change, not deriving render state
    setSeed(Math.random());
    setPhase("covering");
    timers.current.push(
      window.setTimeout(() => setPhase("revealing"), 480),
      window.setTimeout(() => setPhase("idle"), 480 + 620),
    );

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only pathname should re-trigger this
  }, [pathname]);

  if (reduceMotion) return null;

  // Slight per-transition variation: entry side and glow origin alternate.
  const fromLeft = seed < 0.5;
  const glowX = 20 + seed * 60;

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[500] overflow-hidden bg-ronin-black"
          initial={{ clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
          animate={{
            clipPath:
              phase === "covering"
                ? "inset(0 0% 0 0)"
                : fromLeft
                  ? "inset(0 0 0 100%)"
                  : "inset(0 100% 0 0)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: phase === "covering" ? 0.48 : 0.62, ease: [0.87, 0, 0.13, 1] }}
        >
          <div
            className="absolute h-[70vmax] w-[70vmax] rounded-full bg-ronin-red/25 blur-[110px]"
            style={{ top: "50%", left: `${glowX}%`, transform: "translate(-50%, -50%)" }}
          />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-ronin-red/60 to-transparent" />

          <motion.div
            className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-ronin-red md:h-32 md:w-32"
            initial={{ scale: 0.5, opacity: 0, rotate: fromLeft ? -8 : 8 }}
            animate={{ scale: phase === "covering" ? 1 : 1.15, opacity: phase === "covering" ? 1 : 0, rotate: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: "drop-shadow(0 0 30px rgba(169,45,46,0.6))" }}
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
