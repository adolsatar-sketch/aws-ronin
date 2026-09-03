"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { portfolioCategories } from "@/lib/data/categories";
import { FadeIn } from "@/components/motion/FadeIn";
import { CategoryPortal } from "./CategoryPortal";

export function CategoriesSection() {
  const { t } = useLanguage();

  const descriptions: Record<(typeof portfolioCategories)[number]["slug"], string> = {
    "brand-identities": t.home.brandIdentitiesDesc,
    "social-media": t.social.subtitle,
    "logo-design": t.logoDesign.subtitle,
    campaigns: t.campaigns.subtitle,
    print: t.print.subtitle,
  };

  return (
    <section id="categories" className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <FadeIn className="mb-6 max-w-2xl">
        <h2 className="font-display text-3xl font-semibold text-ronin-white md:text-4xl">{t.home.categoriesTitle}</h2>
        <p className="mt-3 text-ronin-white/60">{t.home.categoriesSubtitle}</p>
      </FadeIn>

      <div>
        {portfolioCategories.map((category, i) => (
          <CategoryPortal key={category.slug} category={category} index={i} description={descriptions[category.slug]} />
        ))}
      </div>
    </section>
  );
}
