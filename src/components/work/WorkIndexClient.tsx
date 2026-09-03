"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PageHeader } from "@/components/ui/PageHeader";
import { CategoriesSection } from "@/components/home/CategoriesSection";

/**
 * The Work index leads with the portfolio categories, not a flat dump of
 * every project — each category page (/work/<slug>) is where the full,
 * exhaustive grid for that category lives.
 */
export function WorkIndexClient() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t.work.project} title={t.work.title} subtitle={t.work.subtitle} />
      <CategoriesSection />
    </>
  );
}
