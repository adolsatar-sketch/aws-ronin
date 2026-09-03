"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { manifesto } from "@/lib/data/manifesto";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";

export function ManifestoTeaser() {
  const { lang, t } = useLanguage();
  const m = manifesto[lang];

  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-36">
      <FadeIn as="p" className="mb-6 text-xs font-semibold tracking-[0.25em] text-ronin-red uppercase">
        {t.home.manifestoLabel}
      </FadeIn>
      <RevealText as="h2" className="font-display text-3xl leading-snug font-medium text-balance text-ronin-white md:text-5xl">
        {m.paragraphs[0]}
      </RevealText>
      <FadeIn delay={0.15} as="p" className="mt-6 max-w-3xl text-lg leading-relaxed text-ronin-white/70">
        {m.paragraphs[1]}
      </FadeIn>
      <FadeIn delay={0.25} as="p" className="mt-4 max-w-3xl text-lg leading-relaxed text-ronin-white/70">
        {m.paragraphs[2]}
      </FadeIn>
    </section>
  );
}
