import type { Transition, Variants } from "motion/react";

/**
 * Shared motion language for the whole site — kept in one place so every
 * component moves with the same rhythm instead of inventing its own easing.
 */
export const easeRonin: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeRoninIn: Transition["ease"] = [0.7, 0, 0.84, 0];

export const durations = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.4,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easeRonin },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.slow, ease: easeRonin },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.base, ease: easeRonin },
  },
};

/** Container used with `staggerChildren` — pair with `fadeUp`/`maskLine` children. */
export const staggerContainer = (stagger = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Clip-path mask reveal for headings — the line rises out of a hard edge. */
export const maskLine: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: durations.slow, ease: easeRonin },
  },
};

export const maskLineExit: Variants = {
  hidden: { y: "0%" },
  visible: {
    y: "-110%",
    transition: { duration: durations.base, ease: easeRoninIn },
  },
};

/** Full-bleed panel wipe, used for page transitions and image overlays. */
export const wipeReveal: Variants = {
  hidden: { scaleY: 1 },
  visible: {
    scaleY: 0,
    transition: { duration: durations.slow, ease: easeRonin },
  },
};

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;
