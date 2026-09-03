"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Marquee() {
  const { t } = useLanguage();
  const text = t.home.specialties;

  return (
    <div className="relative overflow-hidden border-y border-ronin-white/10 bg-ronin-black py-6">
      <div className="animate-marquee flex w-max motion-reduce:animate-none">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="mx-6 shrink-0 font-display text-3xl font-semibold tracking-tight text-ronin-white/15 select-none md:text-5xl"
            style={{ WebkitTextStroke: "1px rgba(247,247,245,0.35)" }}
            aria-hidden={i === 1}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
