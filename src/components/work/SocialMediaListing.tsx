"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { socialGroups, groupImages, subgroupImages, totalSocialImages } from "@/lib/data/social";
import { PageHeader } from "@/components/ui/PageHeader";
import { StaggerGroup } from "@/components/motion/Stagger";
import { ImageTile } from "@/components/work/ImageTile";
import { FadeIn } from "@/components/motion/FadeIn";

export function SocialMediaListing() {
  const { lang, t } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t.work.filters.socialMedia} title={t.social.title} subtitle={t.social.subtitle} />

      <div className="sticky top-20 z-30 mb-10 overflow-x-auto border-y border-ronin-white/10 bg-ronin-black/95 px-6 py-3 md:px-10">
        <div className="flex w-max gap-5">
          {socialGroups.map((group) => (
            <a
              key={group.slug}
              href={`#${group.anchor}`}
              className="cursor-hover shrink-0 text-xs font-semibold tracking-wide text-ronin-white/60 uppercase transition-colors hover:text-ronin-red"
            >
              {lang === "ar" ? group.labelAr : group.labelEn}
            </a>
          ))}
        </div>
      </div>

      <p className="mx-auto mb-10 max-w-7xl px-6 text-sm text-ronin-mist md:px-10">
        {totalSocialImages} {t.social.images}
      </p>

      <div className="mx-auto max-w-7xl space-y-20 px-6 pb-24 md:px-10 md:pb-36">
        {socialGroups.map((group) => (
          <section key={group.slug} id={group.anchor} className="scroll-mt-40">
            <FadeIn as="h2" className="mb-6 font-display text-2xl font-semibold text-ronin-white md:text-3xl">
              {lang === "ar" ? group.labelAr : group.labelEn}
            </FadeIn>

            {group.subgroups ? (
              <div className="space-y-10">
                {group.subgroups.map((sub) => (
                  <div key={sub.slug} id={`${group.anchor}-${sub.slug}`} className="scroll-mt-40">
                    <FadeIn as="h3" className="mb-4 text-sm font-semibold text-ronin-mist">
                      {lang === "ar" ? sub.labelAr : sub.labelEn}
                    </FadeIn>
                    <StaggerGroup as="div" stagger={0.05} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {subgroupImages(group, sub).map((src) => (
                        <ImageTile key={src} src={src.replace(/\.webp$/, "-thumb.webp")} alt={`${lang === "ar" ? sub.labelAr : sub.labelEn}`} />
                      ))}
                    </StaggerGroup>
                  </div>
                ))}
              </div>
            ) : (
              <StaggerGroup as="div" stagger={0.05} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {groupImages(group).map((src) => (
                  <ImageTile key={src} src={src.replace(/\.webp$/, "-thumb.webp")} alt={`${lang === "ar" ? group.labelAr : group.labelEn}`} />
                ))}
              </StaggerGroup>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
