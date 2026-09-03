"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { RoninMark } from "@/components/cursor/RoninMark";
import { Parallax } from "@/components/motion/Parallax";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[80dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Parallax strength={30} className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.05]">
        <RoninMark className="h-[80vh] w-[80vh] text-ronin-white" />
      </Parallax>
      <p className="mb-6 font-display text-[10rem] leading-none font-bold text-ronin-red/90 sm:text-[14rem]">404</p>
      <RevealText as="h1" className="font-display text-3xl font-bold text-ronin-white sm:text-5xl">
        {t.notFound.title}
      </RevealText>
      <FadeIn delay={0.15} as="p" className="mt-4 max-w-md text-ronin-white/70">
        {t.notFound.subtitle}
      </FadeIn>
      <FadeIn delay={0.3} className="mt-10">
        <Button href="/">{t.notFound.cta}</Button>
      </FadeIn>
    </section>
  );
}
