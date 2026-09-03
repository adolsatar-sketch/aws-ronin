"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { siteConfig } from "@/lib/data/site";
import { FadeIn } from "@/components/motion/FadeIn";

const hasContact =
  Boolean(siteConfig.contact.email) ||
  Boolean(siteConfig.contact.whatsapp) ||
  Boolean(siteConfig.contact.instagram) ||
  Boolean(siteConfig.contact.behance);

export function ContactDirectly() {
  const { t } = useLanguage();

  return (
    <FadeIn as="div" delay={0.1} className="mt-20 border-t border-ronin-white/10 pt-10">
      <p className="mb-4 text-xs font-semibold tracking-widest text-ronin-mist uppercase">{t.contact.directly}</p>
      {hasContact ? (
        <ul className="flex flex-wrap gap-6">
          {siteConfig.contact.email && (
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="cursor-hover text-ronin-white hover:text-ronin-red">
                {siteConfig.contact.email}
              </a>
            </li>
          )}
        </ul>
      ) : (
        <p className="text-ronin-mist">{t.contact.noContact}</p>
      )}
    </FadeIn>
  );
}
