"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AmbientBackground } from "./AmbientBackground";
import { IntroOverlay } from "./IntroOverlay";
import { PageTransitionOverlay } from "./PageTransitionOverlay";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { TouchFeedback } from "@/components/cursor/TouchFeedback";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AmbientBackground />
      <IntroOverlay />
      <PageTransitionOverlay />
      <CustomCursor />
      <TouchFeedback />
      <Header />
      <main key={pathname} className="min-h-dvh pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
