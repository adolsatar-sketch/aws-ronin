"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { TouchFeedback } from "@/components/cursor/TouchFeedback";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <CustomCursor />
      <TouchFeedback />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-dvh pt-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
