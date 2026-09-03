"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

/** Touch-only equivalent of the custom cursor: a brief red glow where a tap lands. */
export function TouchFeedback() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0] ?? e.changedTouches[0];
      if (!touch) return;
      const id = idRef.current++;
      setRipples((prev) => [...prev.slice(-4), { id, x: touch.clientX, y: touch.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    };

    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => window.removeEventListener("touchstart", onTouch);
  }, []);

  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full"
            style={{
              left: r.x,
              top: r.y,
              translateX: "-50%",
              translateY: "-50%",
              background: "radial-gradient(circle, rgba(169,45,46,0.55) 0%, rgba(169,45,46,0) 70%)",
            }}
            initial={{ width: 8, height: 8, opacity: 0.8 }}
            animate={{ width: 46, height: 46, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
