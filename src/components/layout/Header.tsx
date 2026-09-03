"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { navItems } from "@/lib/data/site";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { lang, t, toggleLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close the overlay menu whenever the route changes (link click, back/forward, etc).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || menuOpen ? "bg-ronin-black/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          <Link href="/" aria-label="Ronin — Home" className="cursor-hover relative z-[60] block h-9 w-auto md:h-11">
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, no benefit from the image optimizer */}
            <img src="/images/logo/ronin-logo-1.svg" alt="Ronin" className="h-full w-auto" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`cursor-hover group relative py-2 text-sm font-medium tracking-wide uppercase ${
                    active ? "text-ronin-white" : "text-ronin-white/70 hover:text-ronin-white"
                  } transition-colors`}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-ronin-red transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <button
              type="button"
              onClick={toggleLang}
              className="cursor-hover rounded-full border border-ronin-white/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-ronin-white/80 uppercase transition-colors hover:border-ronin-red hover:text-ronin-white"
            >
              {t.common.langSwitch}
            </button>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              onClick={toggleLang}
              className="cursor-hover text-xs font-semibold tracking-wide text-ronin-white/80 uppercase"
            >
              {t.common.langSwitch}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              className="cursor-hover relative z-[60] flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
            >
              <motion.span
                className="block h-px w-6 bg-ronin-white"
                animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="block h-px w-6 bg-ronin-white"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px w-6 bg-ronin-white"
                animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu key={lang} onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}
