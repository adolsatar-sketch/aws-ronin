"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Project } from "@/lib/data/projects";
import { StaggerItem } from "@/components/motion/Stagger";

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Widen every 3rd card on desktop for an editorial, non-grid-template rhythm. */
  featured?: boolean;
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const { lang, t } = useLanguage();
  const hero = project.pages[project.heroPage - 1] ?? project.pages[0];

  return (
    <StaggerItem as="article" className={featured ? "md:col-span-2" : undefined}>
      <Link
        href={`/work/${project.slug}`}
        className="cursor-hover group relative block overflow-hidden rounded-sm bg-ronin-black-soft"
      >
        <div className={`relative w-full overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
          <motion.div
            className="absolute inset-0"
            initial={false}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={hero.image}
              alt={`${lang === "ar" ? project.nameAr : project.nameEn} — ${t.work.project}`}
              fill
              sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
              className="object-cover"
              loading={index < 2 ? "eager" : "lazy"}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-ronin-black/85 via-ronin-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

          {/* Brand-colored reveal mask on hover */}
          <div className="absolute inset-0 origin-bottom scale-y-0 bg-ronin-red/15 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-y-100" />

          <div className="absolute top-4 flex w-full items-center justify-between px-4 text-xs tracking-widest text-ronin-white/70 uppercase ltr:left-0 rtl:right-0">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="flex gap-1.5">
              {project.colors.slice(0, 4).map((c) => (
                <span key={c} className="h-2.5 w-2.5 rounded-full border border-white/30" style={{ backgroundColor: c }} />
              ))}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <h3 className="font-display text-2xl leading-tight font-semibold text-ronin-white transition-transform duration-500 group-hover:-translate-y-1 md:text-3xl">
              {lang === "ar" ? project.nameAr : project.nameEn}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-ronin-white/0 opacity-0 transition-all duration-500 group-hover:text-ronin-red group-hover:opacity-100">
              <span>{t.work.viewProject}</span>
              <span aria-hidden="true" className="rtl:rotate-180">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </StaggerItem>
  );
}
