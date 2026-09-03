export const siteConfig = {
  name: "RONIN",
  legalName: "Ronin",
  taglineEn: "Graphic Design — Art Direction — Visual Storytelling",
  taglineAr: "تصميم جرافيك — إخراج فني — سرد بصري",
  url: "https://ronin.example.com",
  description: {
    en: "RONIN — a visual identity built on freedom, imagination, and breaking conventional rules. Graphic design, art direction, and visual storytelling by a designer working under the Ronin identity.",
    ar: "RONIN — هوية بصرية تقوم على الحرية والخيال وكسر القواعد التقليدية. تصميم جرافيك وإخراج فني وسرد بصري تحت هوية Ronin.",
  },
  colors: { dark: "#212222", red: "#A92D2E", white: "#FFFFFF", black: "#08090B" },
  contact: { email: "", whatsapp: "", instagram: "", behance: "" },
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

/** The single most load-bearing line on the site — hero, about closing, and footer all repeat it. */
export const manifestoClosing = {
  en: "There are no limits to an idea when imagination is the starting point.",
  ar: "لا حدود للفكرة عندما يكون الخيال هو نقطة البداية.",
};
