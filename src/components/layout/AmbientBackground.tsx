"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { RoninMark } from "@/components/cursor/RoninMark";

/**
 * A living field behind the entire site — layered burgundy/red/ember glows
 * that drift independently, faint logo-derived lines, grain, an occasional
 * light sweep, and a slow scroll-linked parallax/intensity shift — so the
 * identity never reads as flat, static black on any page, not just the hero.
 */
export function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  // Pointer parallax (desktop) + touch glow bursts (mobile) — both just move CSS vars.
  useEffect(() => {
    if (reduceMotion) return;
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let touchBoost = 0;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      targetX = (t.clientX / window.innerWidth - 0.5) * 2;
      targetY = (t.clientY / window.innerHeight - 0.5) * 2;
      touchBoost = 1;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      touchBoost += (0 - touchBoost) * 0.02;
      el.style.setProperty("--pointer-x", `${curX * 24}px`);
      el.style.setProperty("--pointer-y", `${curY * 24}px`);
      el.style.setProperty("--touch-boost", String(0.12 + touchBoost * 0.18));
      raf = window.requestAnimationFrame(tick);
    };

    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  // Scroll-linked parallax and intensity — cheap rAF + CSS custom properties, no React re-render.
  useEffect(() => {
    if (reduceMotion) return;
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--scroll-progress", progress.toFixed(4));
      el.style.setProperty("--scroll-shift", `${(progress - 0.5) * -60}px`);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-ronin-black"
      style={{ ["--scroll-progress" as string]: "0", ["--scroll-shift" as string]: "0px", ["--touch-boost" as string]: "0.12" }}
    >
      {/* Deep red / burgundy glow field — the primary color movement */}
      <div
        className={`absolute -top-[20%] -left-[15%] h-[70vmax] w-[70vmax] rounded-full bg-ronin-red/[0.16] blur-[130px] ${
          reduceMotion ? "" : "animate-ambient-drift-a"
        }`}
        style={{ transform: "translate3d(var(--pointer-x, 0), calc(var(--pointer-y, 0) + var(--scroll-shift, 0px)), 0)" }}
      />
      <div
        className={`absolute -right-[10%] top-[30%] h-[55vmax] w-[55vmax] rounded-full bg-ronin-burgundy/70 blur-[120px] ${
          reduceMotion ? "" : "animate-ambient-drift-b"
        }`}
        style={{ transform: "translate3d(0, calc(var(--scroll-shift, 0px) * -0.6), 0)" }}
      />
      <div
        className={`absolute bottom-[-25%] left-[20%] h-[60vmax] w-[60vmax] rounded-full bg-ronin-red/[0.1] blur-[150px] ${
          reduceMotion ? "" : "animate-ambient-drift-c"
        }`}
        style={{
          transform:
            "translate3d(calc(var(--pointer-x, 0) * -1), calc(var(--pointer-y, 0) * -1 + var(--scroll-shift, 0px) * 0.4), 0)",
          opacity: "var(--touch-boost, 0.12)",
        }}
      />
      {/* Warm ember highlight — the "third color" so the field isn't just black/red */}
      <div
        className={`absolute top-[55%] right-[25%] h-[42vmax] w-[42vmax] rounded-full bg-ronin-ember/25 blur-[130px] ${
          reduceMotion ? "" : "animate-ambient-drift-d"
        }`}
      />

      {/* Faint logo-derived lines, drifting independently of the glows */}
      <div className={`absolute top-[8%] -right-[18%] h-[55vmax] w-[55vmax] text-ronin-red/[0.05] ${reduceMotion ? "" : "animate-ambient-line"}`}>
        <RoninMark className="h-full w-full" />
      </div>
      <div
        className={`absolute -bottom-[15%] -left-[20%] h-[46vmax] w-[46vmax] rotate-[160deg] text-ronin-white/[0.025] ${
          reduceMotion ? "" : "animate-ambient-line"
        }`}
        style={{ animationDelay: "-20s" }}
      >
        <RoninMark className="h-full w-full" />
      </div>

      {/* Occasional light sweep behind content */}
      {!reduceMotion && (
        <div
          className="animate-ambient-sweep absolute inset-y-0 w-[35%] bg-gradient-to-r from-transparent via-ronin-red/[0.06] to-transparent"
          style={{ animationDelay: "-6s" }}
        />
      )}

      <div className="absolute inset-0 grain-layer opacity-[0.06] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08090b_92%)]" />
    </div>
  );
}
