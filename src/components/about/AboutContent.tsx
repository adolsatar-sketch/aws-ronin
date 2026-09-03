"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { manifesto } from "@/lib/data/manifesto";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";

export function AboutContent() {
  const { lang, t } = useLanguage();
  const m = manifesto[lang];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG watermark, no benefit from the image optimizer */}
        <img
          src="/images/logo/ronin-logo-4.svg"
          alt=""
          className="w-[140vw] max-w-none rotate-[8deg] opacity-[0.06] md:w-[90vw]"
          aria-hidden="true"
        />
      </div>

      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 md:px-10 md:pt-36">
        <FadeIn as="p" className="mb-4 text-xs font-semibold tracking-[0.25em] text-ronin-red uppercase">
          {t.about.title}
        </FadeIn>
        <RevealText as="h1" className="font-display text-6xl leading-[0.9] font-bold text-ronin-white sm:text-7xl md:text-8xl">
          {m.heading}
        </RevealText>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <FadeIn as="p" className="mb-6 text-xs font-semibold tracking-[0.25em] text-ronin-red uppercase">
          01 — {t.about.philosophy}
        </FadeIn>
        <FadeIn as="p" delay={0.1} className="font-display text-2xl leading-relaxed text-balance text-ronin-white/90 md:text-3xl">
          {m.paragraphs[0]}
        </FadeIn>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <FadeIn as="p" className="mb-6 text-xs font-semibold tracking-[0.25em] text-ronin-red uppercase">
          02 — {t.about.graphicDesign} — {t.about.artDirection} — {t.about.storytelling}
        </FadeIn>
        <FadeIn as="p" delay={0.1} className="text-lg leading-relaxed text-ronin-white/75 md:text-xl">
          {m.paragraphs[1]}
        </FadeIn>
        <FadeIn as="p" delay={0.2} className="mt-5 text-lg leading-relaxed text-ronin-white/75 md:text-xl">
          {m.paragraphs[2]}
        </FadeIn>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
        <FadeIn as="p" className="mb-6 text-xs font-semibold tracking-[0.25em] text-ronin-red uppercase">
          03 — {t.about.vision}
        </FadeIn>
        <FadeIn as="p" delay={0.1} className="text-lg leading-relaxed text-ronin-white/75 md:text-xl">
          {m.paragraphs[3]}
        </FadeIn>
        <FadeIn as="p" delay={0.2} className="mt-5 text-lg leading-relaxed text-ronin-white/75 md:text-xl">
          {m.paragraphs[4]}
        </FadeIn>
      </section>

      <section className="border-t border-ronin-white/10 px-6 py-24 text-center md:px-10 md:py-36">
        <FadeIn as="p" className="mb-6 text-xs font-semibold tracking-[0.25em] text-ronin-red uppercase">
          {t.about.manifestoFinal}
        </FadeIn>
        <RevealText
          as="p"
          className="mx-auto max-w-4xl font-display text-3xl leading-tight font-semibold text-balance text-ronin-white sm:text-4xl md:text-6xl"
        >
          {m.closing}
        </RevealText>
      </section>
    </div>
  );
}
