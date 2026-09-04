"use client";

import { useState } from "react";
import Image from "next/image";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { PostLightbox } from "@/components/work/PostLightbox";
import type { SocialImage } from "@/lib/data/social";

interface PostGalleryProps {
  images: SocialImage[];
  alt: string;
}

/**
 * A true masonry post grid: each tile keeps the post's real aspect ratio
 * (no cropping, no forced square), laid out with CSS multi-column so
 * uneven heights pack tightly instead of leaving grid-row gaps. Clicking
 * any post opens the shared PostLightbox at that index.
 */
export function PostGallery({ images, alt }: PostGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
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
