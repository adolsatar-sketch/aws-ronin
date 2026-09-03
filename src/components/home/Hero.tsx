"use client";

import { motion, useReducedMotion } from "motion/react";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";
import { Parallax } from "@/components/motion/Parallax";
import { RoninMark } from "@/components/cursor/RoninMark";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { manifestoClosing } from "@/lib/data/site";

export function Hero() {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[92dvh] flex-col justify-between overflow-hidden bg-ronin-black px-6 pt-16 pb-10 md:px-10">
      {/* Cinematic background layer — faint mark, moving hairline, soft red glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Parallax strength={40} className="absolute -top-24 right-[-10%] h-[70%] w-[70%] opacity-[0.05] md:right-[-5%]">
          <RoninMark className="h-full w-full rotate-12 text-ronin-white" />
        </Parallax>
        <div className="absolute top-1/2 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ronin-red/10 blur-[120px]" />
        {!reduceMotion && (
          <motion.div
            className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-ronin-red/40 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#08090b_100%)]" />
      </div>

      <FadeIn className="flex items-center justify-between text-xs tracking-[0.2em] text-ronin-mist uppercase">
        <span>{t.home.heroEyebrow}</span>
      </FadeIn>

      <div className="flex flex-1 flex-col justify-center">
        <RevealText
          as="h1"
          className="font-display text-[16vw] leading-[0.85] font-bold tracking-tight text-ronin-white sm:text-[13vw] md:text-[10vw] lg:text-[9rem]"
        >
          RONIN
        </RevealText>
        <FadeIn delay={0.35} className="mt-8 max-w-2xl">
          <p className="font-display text-xl leading-relaxed text-balance text-ronin-white/80 md:text-2xl">
            {manifestoClosing[lang]}
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.5} className="flex items-center gap-3 text-xs tracking-[0.2em] text-ronin-mist uppercase">
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
