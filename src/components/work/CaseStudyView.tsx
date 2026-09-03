"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { getAdjacentProject, pageTypeLabel, type Project } from "@/lib/data/projects";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function CaseStudyView({ project }: { project: Project }) {
  const { lang, t } = useLanguage();
  const next = getAdjacentProject(project.slug);
  const hero = project.pages[project.heroPage - 1] ?? project.pages[0];
  const rest = project.pages.filter((p) => p.page !== hero.page);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:px-10 md:pt-24">
        <FadeIn>
          <Link href="/work/brand-identities" className="cursor-hover mb-8 inline-flex items-center gap-2 text-sm text-ronin-white/60 hover:text-ronin-white">
            <span aria-hidden="true" className="rtl:rotate-180">
              ←
            </span>
            {t.work.backToWork}
          </Link>
        </FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <RevealText as="h1" className="font-display text-5xl leading-[0.95] font-bold text-ronin-white sm:text-6xl md:text-7xl">
            {lang === "ar" ? project.nameAr : project.nameEn}
          </RevealText>
          <FadeIn delay={0.15} className="flex gap-2">
            {project.colors.map((c) => (
              <span key={c} className="h-8 w-8 rounded-full border border-white/20" style={{ backgroundColor: c }} title={c} />
            ))}
          </FadeIn>
        </div>
      </section>

      <FadeIn className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-ronin-black-soft md:aspect-[21/9]">
          <Image
            src={hero.image}
            alt={`${lang === "ar" ? project.nameAr : project.nameEn} — ${pageTypeLabel[hero.type][lang]}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </FadeIn>

      <StaggerGroup as="div" stagger={0.08} className="mx-auto max-w-6xl space-y-4 px-6 py-16 md:px-10 md:py-24">
        {rest.map((page) => (
          <StaggerItem key={page.page} as="div" className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-ronin-black-soft md:aspect-[16/9]">
            <Image
              src={page.image}
              alt={`${lang === "ar" ? project.nameAr : project.nameEn} — ${pageTypeLabel[page.type][lang]} ${page.page}`}
              fill
              sizes="100vw"
              loading="lazy"
              className="object-cover"
            />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <section className="border-t border-ronin-white/10 px-6 py-16 text-center md:px-10 md:py-24">
        <FadeIn as="p" className="mb-4 text-xs font-semibold tracking-widest text-ronin-mist uppercase">
          {t.work.nextProject}
        </FadeIn>
        <Link href={`/work/${next.slug}`} className="cursor-hover group inline-block">
          <RevealText
            as="span"
            className="font-display text-4xl font-bold text-ronin-white transition-colors group-hover:text-ronin-red sm:text-6xl"
          >
            {lang === "ar" ? next.nameAr : next.nameEn}
          </RevealText>
        </Link>
      </section>
    </div>
  );
}
