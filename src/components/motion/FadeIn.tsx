"use client";

import { useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { fadeUp } from "@/lib/motion/variants";
import { getMotionTag } from "@/lib/motion/motionTag";
import { useReveal } from "@/lib/motion/useReveal";

interface FadeInProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variants?: Variants;
  /** Re-trigger every time the element enters the viewport. */
  repeat?: boolean;
}

/** Generic scroll-reveal wrapper — the workhorse for section/paragraph entries. */
export function FadeIn({
  children,
  as = "div",
  className,
  delay = 0,
  variants = fadeUp,
  repeat = false,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  // getMotionTag caches by tag at module scope, so identity is stable across renders.
  const MotionTag = getMotionTag(as as ElementType);
  const { ref, shown } = useReveal({ once: !repeat, margin: "-10% 0px -10% 0px" });

  if (reduceMotion) {
    const Fallback = as as ElementType;
    return <Fallback className={className}>{children}</Fallback>;
  }

  return (
    // eslint-disable-next-line react-hooks/static-components -- MotionTag is cached in getMotionTag, not created here
    <MotionTag
      ref={ref}
      className={className ? `${className} motion-reveal` : "motion-reveal"}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
