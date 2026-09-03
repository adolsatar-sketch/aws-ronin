"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { campaignItems, campaignClient } from "@/lib/data/logoDesign";
import { PageHeader } from "@/components/ui/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function CampaignsListing() {
  const { lang, t } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t.work.filters.campaigns} title={campaignClient.nameEn} subtitle={t.campaigns.subtitle} />
      <div className="mx-auto max-w-6xl space-y-16 px-6 pb-24 md:px-10 md:pb-36">
        {campaignItems.map((item, i) => (
          <FadeIn key={item.slug} as="div" className={`flex flex-col gap-6 md:flex-row md:items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-ronin-black-soft md:w-2/3">
              <Image src={item.image} alt={lang === "ar" ? item.labelAr : item.labelEn} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" loading={i === 0 ? "eager" : "lazy"} />
            </div>
            <div className="md:w-1/3">
              <p className="text-xs tracking-widest text-ronin-red uppercase">
                {String(item.index).padStart(2, "0")} / {String(campaignItems.length).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ronin-white">{lang === "ar" ? item.labelAr : item.labelEn}</h2>
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
