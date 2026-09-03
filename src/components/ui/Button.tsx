"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}

const MAGNET_RANGE = 10;

export function Button({ href, children, variant = "solid", className = "" }: ButtonProps) {
  const base =
    "cursor-hover group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide uppercase active:scale-[0.97]";
  const styles =
    variant === "solid"
      ? "bg-ronin-red text-ronin-white"
      : "border border-ronin-white/30 text-ronin-white hover:border-ronin-red";

  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * MAGNET_RANGE * 2);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * MAGNET_RANGE * 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`${base} ${styles} transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 ${className}`}
      >
        <span className="relative z-10">{children}</span>
        <span
          aria-hidden="true"
          className="relative z-10 inline-block ltr:hidden rtl:inline-block transition-transform duration-300 rtl:group-hover:-translate-x-1"
        >
          ←
        </span>
        <span
          aria-hidden="true"
          className="relative z-10 hidden ltr:inline-block transition-transform duration-300 ltr:group-hover:translate-x-1"
        >
          →
        </span>
        {variant === "solid" && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-0 bg-ronin-red-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </Link>
    </motion.div>
  );
}
