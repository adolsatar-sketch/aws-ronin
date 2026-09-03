"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, type UseInViewOptions } from "motion/react";

/**
 * Backs every scroll-reveal component. `whileInView` alone is a single point
 * of failure: if IntersectionObserver never reports (some in-app WebKit
 * browsers — WhatsApp's included — are inconsistent about firing it,
 * especially for content that starts near/above the fold), the element
 * stays at its `hidden` variant forever and the page looks empty even
 * though React mounted fine. A short timeout guarantees a reveal regardless
 * of whether the observer ever fires.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions & { once?: boolean; timeoutMs?: number } = {},
) {
  const { timeoutMs = 700, once = true, ...inViewOptions } = options;
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once, ...inViewOptions });
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setTimedOut(true), timeoutMs);
    return () => window.clearTimeout(id);
  }, [timeoutMs]);

  return { ref, shown: inView || timedOut };
}
