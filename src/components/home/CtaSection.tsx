"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/motion/Parallax";
import { RoninMark } from "@/components/cursor/RoninMark";

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-t border-ronin-white/10 bg-ronin-black-soft px-6 py-28 text-center md:px-10 md:py-40">
      <Parallax strength={30} className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.06]">
        <RoninMark className="h-[120%] w-[120%] -rotate-6 text-ronin-red" />
      </Parallax>
      <RevealText as="h2" className="mx-auto max-w-3xl font-display text-4xl leading-tight font-bold text-ronin-white sm:text-5xl md:text-6xl">
        {t.home.ctaTitle}
      </RevealText>
      <FadeIn delay={0.25} className="mt-10 flex justify-center">
        <Button href="/contact">{t.home.ctaButton}</Button>
      </FadeIn>
    </section>
  );
}
