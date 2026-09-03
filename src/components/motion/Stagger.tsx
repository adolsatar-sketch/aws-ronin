"use client";

import { useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion/variants";
import { getMotionTag } from "@/lib/motion/motionTag";

interface StaggerGroupProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}

/** Wrap a group of `StaggerItem`s to reveal them one after another on scroll. */
export function StaggerGroup({
  children,
  as = "div",
  className,
  stagger = 0.09,
  delayChildren = 0,
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();
  // getMotionTag caches by tag at module scope, so identity is stable across renders.
  const MotionTag = getMotionTag(as as ElementType);

  if (reduceMotion) {
    const Fallback = as as ElementType;
    return <Fallback className={className}>{children}</Fallback>;
  }

  return (
    // eslint-disable-next-line react-hooks/static-components -- MotionTag is cached in getMotionTag, not created here
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variants?: Variants;
}

export function StaggerItem({ children, as = "div", className, variants = fadeUp }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  // getMotionTag caches by tag at module scope, so identity is stable across renders.
  const MotionTag = getMotionTag(as as ElementType);

  if (reduceMotion) {
    const Fallback = as as ElementType;
    return <Fallback className={className}>{children}</Fallback>;
  }

  return (
    // eslint-disable-next-line react-hooks/static-components -- MotionTag is cached in getMotionTag, not created here
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
