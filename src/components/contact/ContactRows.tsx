"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { siteConfig } from "@/lib/data/site";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { EmailIcon, PhoneIcon, InstagramIcon, RowArrow } from "./ContactIcons";

interface RowDef {
  key: "email" | "call" | "instagram";
  Icon: typeof EmailIcon;
  href: string;
  value: string;
  external?: boolean;
  copyValue?: string;
}

function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1800);
  };
  return { copiedKey, copy };
}

export function ContactRows({ variant = "full" }: { variant?: "full" | "compact" }) {
  const { t } = useLanguage();
  const { copiedKey, copy } = useCopy();

  const rows: RowDef[] = [
    { key: "email", Icon: EmailIcon, href: `mailto:${siteConfig.contact.email}`, value: siteConfig.contact.email, copyValue: siteConfig.contact.email },
    { key: "call", Icon: PhoneIcon, href: siteConfig.contact.phoneHref, value: siteConfig.contact.phoneDisplay, copyValue: siteConfig.contact.phoneDisplay },
    { key: "instagram", Icon: InstagramIcon, href: siteConfig.contact.instagramUrl, value: siteConfig.contact.instagramHandle, external: true },
  ];

  if (variant === "compact") {
    return (
      <ul className="space-y-3">
        {rows.map((row) => (
          <li key={row.key} className="flex items-center gap-2.5">
            <row.Icon className="h-4 w-4 shrink-0 text-ronin-red" />
            <a
              href={row.href}
              target={row.external ? "_blank" : undefined}
              rel={row.external ? "noopener noreferrer" : undefined}
              dir="ltr"
              className="cursor-hover text-sm text-ronin-white/75 transition-colors hover:text-ronin-red"
            >
              {row.value}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <StaggerGroup as="div" stagger={0.1} className="divide-y divide-ronin-white/10 border-y border-ronin-white/10">
      {rows.map((row, i) => {
        const label = t.contact.rows[row.key].label;
        const copied = copiedKey === row.key;
        return (
          <StaggerItem key={row.key} as="div" className="group relative">
            <a
              href={row.href}
              target={row.external ? "_blank" : undefined}
              rel={row.external ? "noopener noreferrer" : undefined}
              className="cursor-hover relative flex items-center gap-5 py-8 pe-16 transition-colors md:gap-8 md:py-10"
            >
              <span className="pointer-events-none absolute inset-0 -z-10 scale-x-0 bg-ronin-red/10 transition-transform duration-500 ease-out group-hover:scale-x-100 ltr:origin-left rtl:origin-right" />

              <span className="w-8 shrink-0 font-display text-sm text-ronin-mist tabular-nums md:w-10 md:text-base">
                {String(i + 1).padStart(2, "0")}
              </span>

              <row.Icon className="h-7 w-7 shrink-0 text-ronin-red transition-transform duration-500 group-hover:scale-110 md:h-9 md:w-9" />

              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold tracking-[0.25em] text-ronin-mist uppercase">{t.contact.rows[row.key].tag}</span>
                <span className="mt-1 block font-display text-xl font-semibold text-ronin-white transition-transform duration-500 group-hover:-translate-y-0.5 md:text-3xl">
                  {label}
                </span>
                <span dir="ltr" className="mt-1 block truncate text-sm text-ronin-white/60 md:text-base">
                  {row.value}
                </span>
              </span>

              <RowArrow className="h-6 w-6 shrink-0 text-ronin-white/40 transition-all duration-500 group-hover:text-ronin-red rtl:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
            </a>

            {row.copyValue && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copy(row.key, row.copyValue!);
                }}
                aria-label={t.contact.copy}
                className="cursor-hover absolute top-1/2 -translate-y-1/2 rounded-full border border-ronin-white/15 px-3 py-1.5 text-xs font-medium text-ronin-white/60 transition-colors hover:border-ronin-red hover:text-ronin-red ltr:right-0 rtl:left-0"
              >
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {copied ? t.contact.copied : t.contact.copy}
                </motion.span>
              </button>
            )}
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
