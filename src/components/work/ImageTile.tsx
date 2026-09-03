"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { StaggerItem } from "@/components/motion/Stagger";

interface ImageTileProps {
  src: string;
  alt: string;
  aspect?: string;
  caption?: string;
  eager?: boolean;
}

export function ImageTile({ src, alt, aspect = "aspect-square", caption, eager = false }: ImageTileProps) {
  return (
    <StaggerItem
      as="figure"
      className={`cursor-hover group relative overflow-hidden rounded-sm bg-ronin-black-soft ${aspect}`}
    >
      <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          loading={eager ? "eager" : "lazy"}
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ronin-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      {caption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 text-xs text-ronin-white opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          {caption}
        </figcaption>
      )}
    </StaggerItem>
  );
}
