"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PageHeader } from "@/components/ui/PageHeader";

export function ContactHeader() {
  const { t } = useLanguage();
  return <PageHeader eyebrow={t.nav.contact} title={t.contact.title} subtitle={t.contact.subtitle} />;
}
