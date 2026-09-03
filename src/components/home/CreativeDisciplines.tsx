"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { disciplines } from "@/lib/data/disciplines";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitWords } from "@/components/motion/SplitWords";

function DisciplineRow({ index }: { index: number }) {
  const d = disciplines[index];
  const { lang } = useLanguage();
  const fromLeft = index % 2 === 0;

  return (
    <FadeIn
      as="li"
      className="relative py-8 md:py-10"
      variants={{
        hidden: { opacity: 0, x: fromLeft ? -28 : 28 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      <Link href={d.href} className="cursor-hover group grid grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-8">
        <span className="font-display text-2xl text-ronin-mist tabular-nums md:text-3xl">{String(index + 1).padStart(2, "0")}</span>

        <span className="min-w-0">
          <SplitWords
            text={lang === "ar" ? d.titleAr : d.titleEn}
            as="span"
            className="font-display text-2xl leading-tight font-semibold text-ronin-white transition-colors duration-300 group-hover:text-ronin-red sm:text-3xl md:text-4xl"
          />
          <span className="mt-2 hidden max-w-md text-sm text-ronin-white/55 sm:block">{lang === "ar" ? d.descAr : d.descEn}</span>
        </span>

        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-ronin-black-soft md:h-24 md:w-24">
          <motion.span className="absolute inset-0 block" whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }}>
            <Image src={d.image} alt="" fill sizes="96px" className="object-cover" loading="lazy" />
          </motion.span>
          <span className="absolute inset-0 bg-ronin-red/0 transition-colors duration-300 group-hover:bg-ronin-red/20" />
        </span>
      </Link>
      <span className="mt-2 block text-sm text-ronin-white/55 sm:hidden">{lang === "ar" ? d.descAr : d.descEn}</span>
    </FadeIn>
  );
}

export function CreativeDisciplines() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start center", "end center"] });
  const glowTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="mx-auto max-w-4xl overflow-x-hidden px-6 py-16 md:px-10 md:py-24">
      <FadeIn className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-semibold text-ronin-white md:text-4xl">{t.home.disciplinesTitle}</h2>
        <p className="mt-3 text-ronin-white/60">{t.home.disciplinesSubtitle}</p>
      </FadeIn>

      <div className="relative">
        {/* Spine: a faint line the whole list length, with a red glow that travels as the user scrolls past — not pinned, purely decorative feedback. */}
        <div className="absolute top-0 bottom-0 w-px bg-ronin-white/10 ltr:left-3 rtl:right-3 md:ltr:left-4 md:rtl:right-4" />
        {!reduceMotion && (
          <motion.div
            className="absolute h-24 w-px bg-gradient-to-b from-transparent via-ronin-red to-transparent ltr:left-3 rtl:right-3 md:ltr:left-4 md:rtl:right-4"
            style={{ top: glowTop }}
          />
        )}

        <ul className="ps-10 md:ps-14">
          {disciplines.map((_, i) => (
            <DisciplineRow key={disciplines[i].slug} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
