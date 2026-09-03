"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { RONIN_MARK_PATH, RONIN_MARK_VIEWBOX } from "@/lib/motion/roninMarkPath";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/** The mark rendered as an SVG data URI, used to clip the light-sweep layer to the logo's exact silhouette. */
const MARK_MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${RONIN_MARK_VIEWBOX}'><path d='${RONIN_MARK_PATH}' fill='black'/></svg>`,
)}")`;

const PARTICLE_COUNT = 10;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
  return {
    id: i,
    angle,
    radius: 46 + (i % 3) * 6,
    size: i % 3 === 0 ? 3 : 1.6,
    delay: i * 0.045,
  };
});

/**
 * The hero's living centerpiece: the mark draws itself in from a scatter of
 * fragments, settles into a slow breathing/floating idle loop, tilts gently
 * toward the pointer on desktop, and pulses on tap on touch devices.
 */
export function RoninHeroLogo() {
  const reduceMotion = useReducedMotion();
  const [formed, setFormed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pulse, setPulse] = useState(0);

  // Pointer-tracked tilt (desktop only) — layered on top of the idle loop via CSS transform, not `animate`.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 60, damping: 14 });
  const springTiltY = useSpring(tiltY, { stiffness: 60, damping: 14 });
  const rotateX = useTransform(springTiltY, [-1, 1], [8, -8]);
  const rotateY = useTransform(springTiltX, [-1, 1], [-8, 8]);

  // Scroll-out — the logo settles/fades slightly as the hero scrolls out of view.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time entrance-complete flag, not a render loop
      setFormed(true);
      return;
    }
    const t = window.setTimeout(() => setFormed(true), 1500);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!enabled || reduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      tiltX.set(Math.max(-1, Math.min(1, nx)));
      tiltY.set(Math.max(-1, Math.min(1, ny)));
    };
    const onLeave = () => {
      tiltX.set(0);
      tiltY.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, tiltX, tiltY]);

  const strokeVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: [0, 1, 1, 0],
      transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1], opacity: { times: [0, 0.2, 0.75, 1], duration: 1.3 } },
    },
  };

  const fillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div ref={sectionRef} className="relative hidden flex-1 items-center justify-center py-10 md:flex">
      <motion.div
        ref={containerRef}
        style={reduceMotion ? undefined : { scale: scrollScale, opacity: scrollOpacity, y: scrollY }}
        className="relative aspect-square w-[62vw] max-w-[420px] sm:w-[46vw] md:w-[34vw]"
        onPointerDown={(e) => {
          if (e.pointerType === "touch") setPulse((p) => p + 1);
        }}
      >
        {/* Ambient glow breathing behind the mark */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-[-30%] rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--color-ronin-red) 45%, transparent) 0%, transparent 68%)" }}
          animate={
            reduceMotion
              ? { opacity: 0.35 }
              : { opacity: [0.2, 0.4, 0.2], scale: [0.95, 1.05, 0.95] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Fragment particles converging on entrance, faint twinkle afterward */}
        {!reduceMotion &&
          particles.map((p) => {
            const x = Math.cos(p.angle) * p.radius;
            const y = Math.sin(p.angle) * p.radius;
            return (
              <motion.span
                key={p.id}
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 rounded-full bg-ronin-red"
                style={{ width: p.size, height: p.size }}
                initial={{ x: x * 2.4, y: y * 2.4, opacity: 0 }}
                animate={
                  formed
                    ? { x: [x * 2.4, x], y: [y * 2.4, y], opacity: [0, 0.9, 0.25, 0.5, 0.25] }
                    : { x: x * 2.4, y: y * 2.4, opacity: 0 }
                }
                transition={
                  formed
                    ? {
                        duration: formed ? 1.2 : 0,
                        delay: p.delay,
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: p.delay + 1.2 },
                      }
                    : { duration: 0 }
                }
              />
            );
          })}

        {/* The mark itself: perspective tilt wrapper */}
        <motion.div
          className="absolute inset-0"
          style={
            reduceMotion
              ? undefined
              : { rotateX, rotateY, transformPerspective: 800 }
          }
        >
          <motion.div
            className="relative h-full w-full text-ronin-red"
            style={{ filter: "drop-shadow(0 0 24px rgba(169,45,46,0.35))" }}
            animate={
              formed && !reduceMotion
                ? { y: [0, -10, 0], scale: [1, 1.025, 1] }
                : undefined
            }
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Stroke draw-in */}
            {!reduceMotion && (
              <svg viewBox={RONIN_MARK_VIEWBOX} className="absolute inset-0 h-full w-full" aria-hidden="true">
                <motion.path
                  d={RONIN_MARK_PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={6}
                  variants={strokeVariants}
                  initial="hidden"
                  animate="visible"
                />
              </svg>
            )}
            {/* Filled mark */}
            <motion.svg
              viewBox={RONIN_MARK_VIEWBOX}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
              variants={reduceMotion ? undefined : fillVariants}
              initial={reduceMotion ? undefined : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
            >
              <path d={RONIN_MARK_PATH} fill="currentColor" />
            </motion.svg>

            {/* Tap glow burst (touch only) */}
            {pulse > 0 && (
              <motion.span
                key={pulse}
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ronin-red/40"
                initial={{ width: "20%", height: "20%", opacity: 0.8 }}
                animate={{ width: "140%", height: "140%", opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Light sweep passing across the mark */}
        {!reduceMotion && formed && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: MARK_MASK_URL,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskImage: MARK_MASK_URL,
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }}
          >
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
