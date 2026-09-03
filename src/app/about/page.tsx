import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: dictionaries.ar.about.title,
  description: dictionaries.ar.home.brandIdentitiesDesc,
};

export default function AboutPage() {
  return <AboutContent />;
}
