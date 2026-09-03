"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { campaignItems } from "@/lib/data/logoDesign";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup } from "@/components/motion/Stagger";
import { ImageTile } from "@/components/work/ImageTile";
import { Button } from "@/components/ui/Button";

export function CampaignsShowcase() {
  const { lang, t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <FadeIn className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="font-display text-3xl font-semibold text-ronin-white md:text-4xl">{t.home.campaignsTitle}</h2>
          <p className="mt-3 max-w-xl text-ronin-white/60">{t.home.campaignsDesc}</p>
        </div>
        <Button href="/work/campaigns" variant="outline">
          {t.home.explore}
        </Button>
      </FadeIn>
      <StaggerGroup as="div" stagger={0.08} className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {campaignItems.map((item) => (
          <ImageTile
            key={item.slug}
            src={item.thumb}
            alt={lang === "ar" ? item.labelAr : item.labelEn}
            aspect="aspect-[3/4]"
            caption={lang === "ar" ? item.labelAr : item.labelEn}
          />
        ))}
      </StaggerGroup>
    </section>
  );
}
