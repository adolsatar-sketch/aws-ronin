"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { printItems } from "@/lib/data/logoDesign";
import { PageHeader } from "@/components/ui/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function PrintListing() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t.work.filters.print} title={t.print.title} subtitle={t.print.subtitle} />
      <div className="mx-auto max-w-6xl space-y-8 px-6 pb-24 md:px-10 md:pb-36">
        {printItems.map((item, i) => (
          <FadeIn key={item.slug} as="div" className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-ronin-black-soft">
            <Image
              src={item.image}
              alt={`${t.print.title} ${item.index}/${printItems.length}`}
              fill
              sizes="100vw"
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
            <span className="absolute bottom-4 text-xs tracking-widest text-ronin-white/70 uppercase ltr:left-4 rtl:right-4">
              {String(item.index).padStart(2, "0")}/{String(printItems.length).padStart(2, "0")}
            </span>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
