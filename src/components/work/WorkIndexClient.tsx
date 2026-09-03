"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { workItems, type FilterKey } from "@/lib/data/workIndex";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkTile } from "./WorkTile";

const filterKeys: FilterKey[] = ["all", "brandIdentities", "socialMedia", "logoDesign", "campaigns", "print"];

export function WorkIndexClient() {
  const { t } = useLanguage();
  const [active, setActive] = useState<FilterKey>("all");

  const filtered = useMemo(
    () => (active === "all" ? workItems : workItems.filter((item) => item.filter === active)),
    [active],
  );

  return (
    <>
      <PageHeader eyebrow={t.work.project} title={t.work.title} subtitle={t.work.subtitle} />

      <div className="sticky top-20 z-30 mb-10 w-full border-y border-ronin-white/10 bg-ronin-black/90 py-3 backdrop-blur-md md:border-none">
        <div role="tablist" className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 md:px-10">
          {filterKeys.map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className={`cursor-hover shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors ${
                active === key ? "bg-ronin-red text-ronin-white" : "text-ronin-white/60 hover:text-ronin-white"
              }`}
            >
              {t.work.filters[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-36">
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <WorkTile key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
