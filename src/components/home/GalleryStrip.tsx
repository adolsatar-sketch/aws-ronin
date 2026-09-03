"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup } from "@/components/motion/Stagger";
import { ImageTile } from "@/components/work/ImageTile";

/** The exact curated set from the original site: 6 social clients + campaign + print, 2 images each. */
const archive = [
  "/images/social/automotive/baic/baic-01-thumb.webp",
  "/images/social/automotive/baic/baic-02-thumb.webp",
  "/images/social/jewelry/jewelry-01-thumb.webp",
  "/images/social/jewelry/jewelry-02-thumb.webp",
  "/images/social/restaurants/balkony/balkony-01-thumb.webp",
  "/images/social/restaurants/balkony/balkony-02-thumb.webp",
  "/images/social/medical/hgh-pharmacy/hgh-pharmacy-01-thumb.webp",
  "/images/social/medical/hgh-pharmacy/hgh-pharmacy-02-thumb.webp",
  "/images/social/travel/travel-01-thumb.webp",
  "/images/social/travel/travel-02-thumb.webp",
  "/images/social/real-estate/real-estate-01-thumb.webp",
  "/images/social/real-estate/real-estate-02-thumb.webp",
  "/images/campaigns/ejeet/card-mockup-thumb.webp",
  "/images/campaigns/ejeet/newspaper-mockup-thumb.webp",
  "/images/print/stand-mockup1-thumb.webp",
  "/images/print/stand-mockup2-thumb.webp",
];

export function GalleryStrip() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <FadeIn as="h2" className="mb-10 font-display text-3xl font-semibold text-ronin-white md:text-4xl">
        {t.home.galleryTitle}
      </FadeIn>
      <StaggerGroup as="div" stagger={0.06} className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {archive.map((src, i) => (
          <ImageTile key={src} src={src} alt="" aspect="aspect-square" eager={i < 2} />
        ))}
      </StaggerGroup>
    </section>
  );
}
