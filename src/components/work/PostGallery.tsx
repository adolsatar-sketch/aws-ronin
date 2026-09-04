"use client";

import { useState } from "react";
import Image from "next/image";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PostLightbox } from "@/components/work/PostLightbox";
import type { SocialImage } from "@/lib/data/social";

interface PostGalleryProps {
  images: SocialImage[];
  alt: string;
  /** "grid" = fixed 3:4 cells for a uniformly-shaped set (e.g. matchday posts); default "masonry". */
  layout?: "masonry" | "grid";
}

/**
 * The Social Media post grid. Two layouts, one shared lightbox:
 *  - "masonry" (default): each tile keeps the post's own real aspect
 *    ratio, laid out with CSS multi-column so uneven heights pack
 *    tightly instead of leaving grid-row gaps.
 *  - "grid": a plain equal-column grid with every cell locked to 3:4 —
 *    for a set of posts that all share that ratio, so a uniform grid
 *    reads cleaner than masonry columns would.
 * Clicking any post opens the shared PostLightbox at that index.
 */
export function PostGallery({ images, alt, layout = "masonry" }: PostGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {layout === "grid" ? (
        <StaggerGroup as="div" stagger={0.04} className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <StaggerItem key={img.src} as="div">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={alt}
                className="cursor-hover group relative block aspect-[3/4] w-full overflow-hidden rounded-sm bg-ronin-black-soft"
              >
                <Image
                  src={img.thumb}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ronin-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <StaggerGroup as="div" stagger={0.04} className="columns-2 gap-3 sm:columns-3 md:columns-4">
          {images.map((img, i) => (
            <StaggerItem key={img.src} as="div" className="mb-3 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={alt}
                className="cursor-hover group relative block w-full overflow-hidden rounded-sm bg-ronin-black-soft"
              >
                <Image
                  src={img.thumb}
                  alt={alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="block h-auto w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ronin-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}

      {openIndex !== null && (
        <PostLightbox
          images={images}
          index={openIndex}
          alt={alt}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}
