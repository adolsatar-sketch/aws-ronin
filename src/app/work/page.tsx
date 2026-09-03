import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { WorkIndexClient } from "@/components/work/WorkIndexClient";

export const metadata: Metadata = {
  title: dictionaries.ar.work.title,
  description: dictionaries.ar.work.subtitle,
};

export default function WorkPage() {
  return <WorkIndexClient />;
}
