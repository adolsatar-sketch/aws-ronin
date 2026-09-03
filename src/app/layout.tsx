import type { Metadata, Viewport } from "next";
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

// Explicit dark color-scheme + matching theme-color: without these, some
// mobile browsers (Samsung Internet's "website dark theme" in particular)
// try to auto-recolor pages they judge as not already dark-aware, which
// can repaint parts of an already-dark site incorrectly. Declaring both
// tells the browser this site already handles it.
export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

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
      {/*
        No background color on <body> on purpose: CSS paints a normal-flow
        element's own background above its `position:fixed`, negative
        z-index descendants (stacking order puts negative-z content
        behind the box that establishes the context, not above it) — an
        opaque body background here was silently occluding the entire
        fixed ambient-background/motif layer. `html` already carries the
        same color as a canvas-level fallback, so nothing is ever
        uncovered black.
      */}
      <body className="min-h-screen min-h-svh text-ronin-white antialiased" suppressHydrationWarning>
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
