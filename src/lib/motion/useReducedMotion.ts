"use client";

import { useEffect, useState } from "react";
import { useReducedMotion as useReducedMotionUpstream } from "motion/react";

/**
 * motion/react's own `useReducedMotion()` reads the OS preference
 * synchronously on the client's very first render — by design, so even
 * the first frame respects it. But the server always renders assuming
 * `false`, since there's no `window` there. Any component whose rendered
 * DOM structure branches on the value (our FadeIn/RevealText/etc. "hidden
 * Fallback vs. motion-wrapped" pattern) then genuinely mismatches between
 * server and client on hydration whenever a visitor's OS has Reduced
 * Motion on — a real React hydration error (#418), not a false alarm.
 *
 * This wrapper holds the value at `false` (matching SSR) until just after
 * mount, then reveals the real value. Hydration always matches; the true
 * preference still takes effect within one paint of mount.
 */
export function useReducedMotion(): boolean {
  const upstream = useReducedMotionUpstream();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration gate, not a render loop
  useEffect(() => setMounted(true), []);

  return mounted ? !!upstream : false;
}
