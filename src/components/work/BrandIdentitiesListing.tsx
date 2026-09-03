"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { projects } from "@/lib/data/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectGrid } from "@/components/work/ProjectGrid";

export function BrandIdentitiesListing() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t.work.filters.brandIdentities} title={t.work.filters.brandIdentities} subtitle={t.home.brandIdentitiesDesc} />
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <ProjectGrid projects={projects} />
      </div>
    </>
  );
}
