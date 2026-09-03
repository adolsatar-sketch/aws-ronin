"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { maskLine, viewportOnce } from "@/lib/motion/variants";

interface RevealTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger offset in the parent sequence, in seconds. */
  delay?: number;
  once?: boolean;
}

/**
 * Mask-reveal for headings: the text is clipped by its own line box and
 * rises into view, like a shutter lifting — mirrors the sharp horizontal
 * edges in the Ronin mark instead of a generic fade.
 */
export function RevealText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  once = true,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Fallback = Tag as ElementType;
    return <Fallback className={className}>{children}</Fallback>;
  }

  return (
    <Tag className={className} style={{ overflow: "hidden", display: "block" }}>
      <motion.span
        style={{ display: "block" }}
        initial="hidden"
        whileInView="visible"
        viewport={once ? viewportOnce : { once: false, margin: "-10% 0px -10% 0px" }}
        variants={maskLine}
        transition={{ delay }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
