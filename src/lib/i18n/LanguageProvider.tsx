"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary, type Locale } from "./dictionaries";

interface LanguageContextValue {
  lang: Locale;
  dir: "rtl" | "ltr";
  t: Dictionary;
  setLang: (lang: Locale) => void;
  toggleLang: () => void;
}

const STORAGE_KEY = "ronin-lang";
const DEFAULT_LOCALE: Locale = "ar";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentLocale(lang: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    // One-time read of a browser-only API (localStorage) to hydrate the
    // client with the visitor's saved language — unavailable during SSR.
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    const initial = stored === "ar" || stored === "en" ? stored : DEFAULT_LOCALE;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(initial);
    applyDocumentLocale(initial);
  }, []);

  const setLang = useCallback((next: Locale) => {
    setLangState(next);
    applyDocumentLocale(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "ar" ? "en" : "ar");
  }, [lang, setLang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: dictionaries[lang],
      setLang,
      toggleLang,
    }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
