"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { navItems } from "@/lib/data/site";
import { manifestoClosing } from "@/lib/data/site";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    return () => document.documentElement.classList.remove("no-scroll");
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col justify-between bg-ronin-black px-6 pt-28 pb-10 md:hidden"
      initial={{ clipPath: "circle(2% at 100% 0%)" }}
      animate={{ clipPath: "circle(150% at 100% 0%)" }}
      exit={{ clipPath: "circle(2% at 100% 0%)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="flex flex-col gap-2">
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
              className="cursor-hover block border-b border-ronin-white/10 py-4 font-display text-4xl font-semibold text-ronin-white"
            >
              {t.nav[item.key as keyof typeof t.nav]}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-sm text-ronin-mist"
      >
        {manifestoClosing[lang]}
      </motion.p>
    </motion.div>
  );
}
