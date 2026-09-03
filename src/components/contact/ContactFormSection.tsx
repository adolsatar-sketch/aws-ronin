"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "./ContactForm";

export function ContactFormSection() {
  const { t } = useLanguage();

  return (
    <div className="mt-20 md:mt-28">
      <FadeIn as="p" className="mb-2 text-xs font-semibold tracking-[0.25em] text-ronin-red uppercase">
        {t.contact.formTitle}
      </FadeIn>
      <FadeIn as="p" delay={0.05} className="mb-10 max-w-xl text-ronin-white/60">
        {t.contact.formSubtitle}
      </FadeIn>
      <ContactForm />
    </div>
  );
}
