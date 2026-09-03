"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { WorkItem } from "@/lib/data/workIndex";

export function WorkTile({ item, index }: { item: WorkItem; index: number }) {
  const { lang, t } = useLanguage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(index, 8) * 0.04 }}
    >
      <Link href={item.href} className="cursor-hover group relative block aspect-[4/5] overflow-hidden rounded-sm bg-ronin-black-soft">
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <Image
            src={item.image}
            alt={lang === "ar" ? item.titleAr : item.titleEn}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ronin-black/85 via-ronin-black/5 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-0 origin-bottom scale-y-0 bg-ronin-red/15 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-y-100" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs tracking-widest text-ronin-red uppercase">{t.work.filters[item.filter]}</p>
          <h3 className="mt-1 font-display text-xl leading-tight font-semibold text-ronin-white capitalize transition-transform duration-500 group-hover:-translate-y-1">
            {lang === "ar" ? item.titleAr : item.titleEn}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
