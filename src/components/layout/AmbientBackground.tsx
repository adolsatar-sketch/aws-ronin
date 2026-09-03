"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A slow-moving field of dark-red glows sitting behind the entire site (not
 * just the hero), plus a faint grain layer — so the identity never reads as
 * flat black, without ever competing with foreground content for attention.
 */
export function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!enabled) return;
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      el.style.setProperty("--pointer-x", `${curX * 24}px`);
      el.style.setProperty("--pointer-y", `${curY * 24}px`);
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-ronin-black">
      <div
        className={`absolute -top-[20%] -left-[15%] h-[70vmax] w-[70vmax] rounded-full bg-ronin-red/[0.12] blur-[140px] ${
          reduceMotion ? "" : "animate-ambient-drift-a"
        }`}
        style={{ transform: "translate3d(var(--pointer-x, 0), var(--pointer-y, 0), 0)" }}
      />
      <div
        className={`absolute -right-[10%] top-[30%] h-[55vmax] w-[55vmax] rounded-full bg-ronin-dark/60 blur-[130px] ${
          reduceMotion ? "" : "animate-ambient-drift-b"
        }`}
      />
      <div
        className={`absolute bottom-[-25%] left-[20%] h-[60vmax] w-[60vmax] rounded-full bg-ronin-red/[0.08] blur-[150px] ${
          reduceMotion ? "" : "animate-ambient-drift-c"
        }`}
        style={{ transform: "translate3d(calc(var(--pointer-x, 0) * -1), calc(var(--pointer-y, 0) * -1), 0)" }}
      />
      <div className="absolute inset-0 grain-layer opacity-[0.05] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#08090b_92%)]" />
    </div>
  );
}
