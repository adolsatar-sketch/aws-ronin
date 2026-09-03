"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import { useReveal } from "@/lib/motion/useReveal";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface SplitWordsProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Stagger offset in the parent sequence, in seconds. */
  delay?: number;
}

/**
 * Kinetic word-by-word reveal — each word rises and un-rotates independently,
 * a deliberately different rhythm from RevealText's single mask-lift so the
 * page doesn't read as one repeated animation.
 */
export function SplitWords({ text, as: Tag = "span", className, delay = 0 }: SplitWordsProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  const { ref, shown } = useReveal({ margin: "-10% 0px -10% 0px" });

  if (reduceMotion) {
    const Fallback = Tag as ElementType;
    return <Fallback className={className}>{text}</Fallback>;
  }

  return (
    <Tag className={className} style={{ display: "block" }}>
      <motion.span
        ref={ref}
        className="motion-reveal"
        initial="hidden"
        animate={shown ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
        style={{ display: "inline" }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
            <motion.span
              style={{ display: "inline-block" }}
              variants={{
                hidden: { y: "100%", rotate: 6, opacity: 0 },
                visible: {
                  y: "0%",
                  rotate: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
