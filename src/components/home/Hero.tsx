"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { RoninHeroLogo } from "./RoninHeroLogo";
import { HeroLogoMobile } from "./HeroLogoMobile";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { manifestoClosing, siteConfig } from "@/lib/data/site";

export function Hero() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[94vh] min-h-[94svh] flex-col overflow-hidden px-6 pt-16 pb-10 md:px-10">
      {/* RONIN stays in the DOM for SEO/a11y — the mark, not the word, is the visual hero. */}
      <h1 className="sr-only">{siteConfig.name}</h1>

      <FadeIn className="flex items-center justify-between text-xs tracking-[0.2em] text-ronin-mist uppercase">
        <span>{t.home.heroEyebrow}</span>
      </FadeIn>

      <HeroLogoMobile />
      <RoninHeroLogo />

      <FadeIn delay={0.4} className="mx-auto max-w-2xl text-center">
        <p className="font-display text-xl leading-relaxed text-balance text-ronin-white/80 md:text-2xl">
          {manifestoClosing[lang]}
        </p>
      </FadeIn>

      <FadeIn delay={0.6} className="mt-10 flex items-center justify-center gap-3 text-xs tracking-[0.2em] text-ronin-mist uppercase">
        <motion.span
          aria-hidden="true"
          className="block h-8 w-px bg-ronin-mist/60"
          animate={reduceMotion ? undefined : { scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
        {t.home.scroll}
      </FadeIn>
    </section>
  );
}
