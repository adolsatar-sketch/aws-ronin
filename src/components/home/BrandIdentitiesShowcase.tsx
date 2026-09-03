"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { projects } from "@/lib/data/projects";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { Button } from "@/components/ui/Button";

export function BrandIdentitiesShowcase() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <FadeIn className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="font-display text-3xl font-semibold text-ronin-white md:text-4xl">{t.home.brandIdentitiesTitle}</h2>
          <p className="mt-3 max-w-xl text-ronin-white/60">{t.home.brandIdentitiesDesc}</p>
        </div>
        <Button href="/work/brand-identities" variant="outline">
          {t.home.explore}
        </Button>
      </FadeIn>
      <ProjectGrid projects={projects.slice(0, 4)} />
    </section>
  );
}
