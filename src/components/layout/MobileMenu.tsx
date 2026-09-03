"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { navItems, manifestoClosing } from "@/lib/data/site";
import { RoninMark } from "@/components/cursor/RoninMark";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    return () => document.documentElement.classList.remove("no-scroll");
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-ronin-black px-6 pt-28 pb-10 md:hidden"
      initial={{ clipPath: "circle(2% at 100% 0%)" }}
      animate={{ clipPath: "circle(150% at 100% 0%)" }}
      exit={{ clipPath: "circle(2% at 100% 0%)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Branded backdrop: a huge faint mark and two red light lines sweeping through */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[140vw] w-[140vw] -translate-x-1/2 -translate-y-1/2 text-ronin-red/[0.05]"
        initial={{ rotate: -6, scale: 0.9 }}
        animate={reduceMotion ? { rotate: 0, scale: 1 } : { rotate: [-6, 0, -6], scale: [0.9, 1, 0.9] }}
        transition={{ duration: 14, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      >
        <RoninMark className="h-full w-full" />
      </motion.div>
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[30%] h-px bg-gradient-to-r from-transparent via-ronin-red/50 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[26%] h-px bg-gradient-to-r from-transparent via-ronin-red/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </>
      )}

      <nav className="relative flex flex-col gap-2">
        {navItems.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="cursor-hover group flex items-baseline justify-between border-b border-ronin-white/10 py-4 font-display text-4xl font-semibold text-ronin-white"
            >
              <span className="transition-transform duration-300 group-active:translate-x-1">
                {t.nav[item.key as keyof typeof t.nav]}
              </span>
              <span className="text-xs text-ronin-mist tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative text-sm text-ronin-mist"
      >
        {manifestoClosing[lang]}
      </motion.p>
    </motion.div>
  );
}
