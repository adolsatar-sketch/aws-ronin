import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDirectly } from "@/components/contact/ContactDirectly";

export const metadata: Metadata = {
  title: dictionaries.ar.contact.title,
  description: dictionaries.ar.contact.subtitle,
};

export default function ContactPage() {
  return (
    <>
      <ContactHeader />
      <div className="mx-auto max-w-3xl px-6 pb-24 md:px-10 md:pb-36">
        <ContactForm />
        <ContactDirectly />
      </div>
    </>
  );
}
