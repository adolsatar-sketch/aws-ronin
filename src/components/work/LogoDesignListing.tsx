"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { logoDesignItems } from "@/lib/data/logoDesign";
import { PageHeader } from "@/components/ui/PageHeader";
import { StaggerGroup } from "@/components/motion/Stagger";
import { ImageTile } from "@/components/work/ImageTile";

export function LogoDesignListing() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t.work.filters.logoDesign} title={t.logoDesign.title} subtitle={t.logoDesign.subtitle} />
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <StaggerGroup as="div" stagger={0.06} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {logoDesignItems.map((item) => (
            <ImageTile
              key={item.slug}
              src={item.thumb}
              alt={`${item.slug.replace(/-/g, " ")} logo`}
              aspect="aspect-square"
              caption={item.slug.replace(/-/g, " ")}
            />
          ))}
        </StaggerGroup>
      </div>
    </>
  );
}
