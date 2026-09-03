"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { manifestoClosing, siteConfig } from "@/lib/data/site";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";

const workLinks = ["brandIdentities", "socialMedia", "logoDesign", "campaigns", "print"] as const;

export function Footer() {
  const { lang, t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ronin-white/10 bg-ronin-black">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 md:px-10">
        <RevealText
          as="p"
          className="max-w-4xl font-display text-3xl leading-tight font-semibold text-balance text-ronin-white md:text-5xl"
        >
          {manifestoClosing[lang]}
        </RevealText>

        <FadeIn
          as="div"
          delay={0.15}
          className="mt-16 grid grid-cols-2 gap-10 border-t border-ronin-white/10 pt-12 md:grid-cols-4"
        >
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-ronin-mist uppercase">
              {t.footer.workHeading}
            </h3>
            <ul className="space-y-2.5">
              {workLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={`/work/${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`}
                    className="cursor-hover text-sm text-ronin-white/75 transition-colors hover:text-ronin-red"
                  >
                    {t.work.filters[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-ronin-mist uppercase">
              {t.footer.studioHeading}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="cursor-hover text-sm text-ronin-white/75 transition-colors hover:text-ronin-red">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="cursor-hover text-sm text-ronin-white/75 transition-colors hover:text-ronin-red">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="cursor-hover text-sm text-ronin-white/75 transition-colors hover:text-ronin-red">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-ronin-mist uppercase">
              {t.footer.contactHeading}
            </h3>
            <p className="text-sm text-ronin-mist" aria-hidden="true">
              —
            </p>
          </div>

          <div className="flex items-start justify-start md:justify-end">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-hover group flex items-center gap-2 text-sm text-ronin-white/75 transition-colors hover:text-ronin-red"
            >
              <span className="inline-block h-8 w-8 rounded-full border border-current text-center leading-8 transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
              {t.footer.backToTop}
            </button>
          </div>
        </FadeIn>

        <div className="mt-14 flex flex-col gap-2 border-t border-ronin-white/10 pt-6 text-xs text-ronin-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. {t.footer.rights}
          </p>
          <p className="tracking-widest uppercase">{siteConfig.taglineEn}</p>
        </div>
      </div>
    </footer>
  );
}
