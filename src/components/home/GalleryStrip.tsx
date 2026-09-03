"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerGroup } from "@/components/motion/Stagger";
import { ImageTile } from "@/components/work/ImageTile";

const archive = [
  { src: "/images/identities/ashur/page-06-thumb.webp", aspect: "aspect-[4/5]" },
  { src: "/images/social/jewelry/jewelry-03-thumb.webp", aspect: "aspect-square" },
  { src: "/images/identities/zahrat-group/page-11-thumb.webp", aspect: "aspect-[4/5]" },
  { src: "/images/logo-design/guzel-logo-thumb.webp", aspect: "aspect-square" },
  { src: "/images/identities/fann-al-kharaz/page-13-thumb.webp", aspect: "aspect-[4/5]" },
  { src: "/images/social/travel/travel-05-thumb.webp", aspect: "aspect-square" },
  { src: "/images/identities/dr-reem/page-08-thumb.webp", aspect: "aspect-[4/5]" },
  { src: "/images/print/stand-mockup2-thumb.webp", aspect: "aspect-square" },
];

export function GalleryStrip() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <FadeIn as="h2" className="mb-10 font-display text-3xl font-semibold text-ronin-white md:text-4xl">
        {t.home.galleryTitle}
      </FadeIn>
      <StaggerGroup as="div" stagger={0.06} className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {archive.map((item, i) => (
          <ImageTile key={item.src} src={item.src} alt="" aspect={item.aspect} eager={i < 2} />
        ))}
      </StaggerGroup>
    </section>
  );
}
