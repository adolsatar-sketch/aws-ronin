"use client";

import { useEffect } from "react";
import { scrollBackgroundColor } from "./scrollColor";

/**
 * Writes the site's shared scroll/pointer motion signals onto
 * `document.documentElement` as CSS custom properties:
 *
 *  --scroll-progress  0..1 scroll position
 *  --scroll-shift     px offset for background parallax
 *  --bg-color         the current interpolated background color
 *  --pointer-x/-y      smoothed pointer offset (desktop) / touch (mobile)
 *  --touch-boost       glow intensity boost right after a touch
 *
 * Written on `:root` rather than a component-local ref so every
 * descendant — AmbientBackground's own layers, the cinematic motif
 * layer, any future decorative component — can read the same values
 * with plain `var(--scroll-shift, 0px)` in a style, without each one
 * running its own scroll/pointer listener. Call this exactly once
 * (AmbientBackground, mounted once in SiteChrome, owns it).
 */
export function useGlobalMotionVars(reduceMotion: boolean) {
  useEffect(() => {
    const root = document.documentElement;
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
      root.style.setProperty("--pointer-x", `${curX * 24}px`);
      root.style.setProperty("--pointer-y", `${curY * 24}px`);
      root.style.setProperty("--touch-boost", String(0.12 + touchBoost * 0.18));
      raf = window.requestAnimationFrame(tick);
    };

    if (!reduceMotion) {
      if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      raf = window.requestAnimationFrame(tick);
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--bg-color", scrollBackgroundColor(progress));
      if (!reduceMotion) {
        root.style.setProperty("--scroll-shift", `${(progress - 0.5) * -60}px`);
      }
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
}
