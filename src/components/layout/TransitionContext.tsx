"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export type TransitionPhase = "idle" | "covering" | "holding" | "revealing";

interface TransitionState {
  phase: TransitionPhase;
  seed: number;
}

interface TransitionContextValue extends TransitionState {
  /** Plays the branded transition without a route change (e.g. language switch). Runs `onCovered` the instant the screen is fully hidden. */
  playTransition: (onCovered?: () => void) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

/** Desktop gets the full cinematic hold; small screens get a quicker but still deliberate version. */
function getTiming() {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  return isMobile
    ? { covering: 300, holding: 320, revealing: 380 }
    : { covering: 450, holding: 380, revealing: 550 };
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const prevPathname = useRef(pathname);
  const [state, setState] = useState<TransitionState>({ phase: "idle", seed: 0 });
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const playTransition = useCallback(
    (onCovered?: () => void) => {
      if (reduceMotion) {
        onCovered?.();
        return;
      }
      clearTimers();
      const timing = getTiming();
      const seed = Math.random();
      setState({ phase: "covering", seed });
      timers.current.push(
        window.setTimeout(() => {
          onCovered?.();
          setState((s) => ({ ...s, phase: "holding" }));
        }, timing.covering),
        window.setTimeout(() => setState((s) => ({ ...s, phase: "revealing" })), timing.covering + timing.holding),
        window.setTimeout(
          () => setState((s) => ({ ...s, phase: "idle" })),
          timing.covering + timing.holding + timing.revealing,
        ),
        // Hard ceiling, independent of the sequence above: guarantees the
        // overlay can never stay up longer than this no matter what goes
        // wrong in the chain (a dropped timer, an unexpected re-render,
        // etc). `onCovered` already fired at `timing.covering` (well under
        // 1500ms) in the normal case, so it is deliberately not repeated
        // here — this only forces the overlay itself closed.
        window.setTimeout(() => setState((s) => ({ ...s, phase: "idle" })), 1500),
      );
    },
    [clearTimers, reduceMotion],
  );

  // Auto-play on every real route change.
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;
    playTransition();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only pathname should re-trigger this
  }, [pathname]);

  useEffect(() => clearTimers, [clearTimers]);

  return <TransitionContext.Provider value={{ ...state, playTransition }}>{children}</TransitionContext.Provider>;
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}
