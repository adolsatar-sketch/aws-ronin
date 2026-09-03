import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { siteConfig } from "@/lib/data/site";
import { SiteChrome } from "@/components/layout/SiteChrome";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.taglineEn}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description.en,
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2" },
    ],
    shortcut: "/favicon.ico?v=2",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.taglineEn}`,
    description: siteConfig.description.en,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: ["/opengraph-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.taglineEn}`,
    description: siteConfig.description.en,
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable} suppressHydrationWarning>
      <body className="min-h-screen min-h-svh bg-ronin-black text-ronin-white antialiased" suppressHydrationWarning>
        {/*
          Absolute floor: every scroll-reveal wrapper (FadeIn, StaggerGroup,
          RevealText, SplitWords, ProjectCard) carries a `motion-reveal`
          class and ships server-rendered at its hidden variant, relying on
          client JS to reveal it. If JS never runs at all, nothing is there
          to do that. `<noscript>` styles only apply with scripting
          disabled, so this never touches anyone whose JS actually runs.
        */}
        <noscript>
          <style>{`.motion-reveal,.motion-reveal *{opacity:1 !important;transform:none !important;clip-path:none !important;}`}</style>
        </noscript>
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
