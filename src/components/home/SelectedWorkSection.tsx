"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { selectedWork } from "@/lib/data/workIndex";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup } from "@/components/motion/Stagger";
import { WorkTile } from "@/components/work/WorkTile";
import { Button } from "@/components/ui/Button";

export function SelectedWorkSection() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <FadeIn className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <h2 className="font-display text-3xl font-semibold text-ronin-white md:text-4xl">{t.home.selectedWork}</h2>
        <Button href="/work" variant="outline">
          {t.home.viewAllWork}
        </Button>
      </FadeIn>
      <StaggerGroup as="div" stagger={0.08} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
        {selectedWork.map((item, i) => (
          <WorkTile key={item.id} item={item} index={i} />
        ))}
      </StaggerGroup>
    </section>
  );
}
