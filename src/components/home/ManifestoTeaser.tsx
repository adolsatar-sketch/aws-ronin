"use client";

import Link from "next/link";
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
      <FadeIn delay={0.2}>
        <Link href="/about" className="cursor-hover group mt-8 inline-flex items-center gap-2 text-sm text-ronin-white/70 hover:text-ronin-white">
          <span className="border-b border-transparent transition-colors group-hover:border-ronin-red">{t.about.title}</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
            →
          </span>
        </Link>
      </FadeIn>
    </section>
  );
}
