"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { RONIN_MARK_PATH, RONIN_MARK_VIEWBOX } from "@/lib/motion/roninMarkPath";

const STORAGE_KEY = "ronin-intro-seen";
const DURATION = 2000;

const strokeVariants: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

/** The branded first-visit loader: mark formation, then it dissolves into the real hero underneath. */
export function IntroOverlay() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen || reduceMotion) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time first-visit gate read from sessionStorage
    setVisible(true);
    document.documentElement.classList.add("no-scroll");
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode / storage disabled — the intro will just replay next load */
    }

    const leaveTimer = window.setTimeout(() => setLeaving(true), DURATION - 500);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.remove("no-scroll");
    }, DURATION);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.documentElement.classList.remove("no-scroll");
    };
  }, [reduceMotion]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-ronin-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: leaving ? "none" : "auto" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(169,45,46,0.14),transparent_60%)]" />

      <motion.div
        className="relative h-20 w-20 text-ronin-red sm:h-24 sm:w-24"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: "drop-shadow(0 0 24px rgba(169,45,46,0.5))" }}
      >
        <svg viewBox={RONIN_MARK_VIEWBOX} className="absolute inset-0 h-full w-full">
          <motion.path d={RONIN_MARK_PATH} fill="none" stroke="currentColor" strokeWidth={7} variants={strokeVariants} initial="hidden" animate="visible" />
        </svg>
        <motion.svg
          viewBox={RONIN_MARK_VIEWBOX}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          <path d={RONIN_MARK_PATH} fill="currentColor" />
        </motion.svg>
      </motion.div>

      {/* Minimal progress line — part of the identity, not a generic spinner */}
      <div className="relative mt-8 h-px w-32 overflow-hidden bg-ronin-white/10">
        <motion.div
          className="h-full bg-ronin-red"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: DURATION / 1000 - 0.3, ease: "linear" }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  );
}
