"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { PortfolioCategory } from "@/lib/data/categories";
import { FadeIn } from "@/components/motion/FadeIn";

interface CategoryPortalProps {
  category: PortfolioCategory;
  index: number;
  description: string;
}

export function CategoryPortal({ category, index, description }: CategoryPortalProps) {
  const { lang, t } = useLanguage();
  const reversed = index % 2 === 1;
  const name = t.work.filters[category.filterKey];
  const cta = t.home.categoryCta[category.cta];

  return (
    <FadeIn
      as="article"
      className="border-t border-ronin-white/10 py-10 first:border-t-0 md:py-16"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      <Link
        href={category.href}
        aria-label={`${name} — ${cta}`}
        className={`cursor-hover group flex flex-col gap-8 md:flex-row md:items-center md:gap-14 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-sm bg-ronin-black-soft md:w-3/5">
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <Image
              src={category.image}
              alt={name}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ronin-black/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
          <div className="absolute inset-0 origin-bottom scale-y-0 bg-ronin-red/15 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-y-100" />
          <span className="absolute top-5 font-display text-6xl font-bold text-ronin-white/90 [text-shadow:0_2px_20px_rgba(0,0,0,0.6)] md:text-7xl ltr:left-5 rtl:right-5">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="md:w-2/5">
          <h3 className="font-display text-4xl leading-[0.95] font-bold text-ronin-white transition-transform duration-500 group-hover:-translate-y-1 sm:text-5xl">
            {name}
          </h3>
          <p className="mt-4 max-w-md text-ronin-white/65">{description}</p>
          <p className="mt-3 text-xs font-semibold tracking-[0.2em] text-ronin-mist uppercase">{category.countLabel[lang]}</p>

          <span className="mt-8 inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-ronin-red uppercase">
            {cta}
            <span
              aria-hidden="true"
              className="inline-block h-9 w-9 rounded-full border border-ronin-red text-center leading-9 transition-transform duration-500 group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </FadeIn>
  );
}
