export type PageType = "cover" | "logo" | "palette" | "typography" | "application";

export interface ProjectPage {
  page: number;
  type: PageType;
  image: string;
  thumb: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  nameEn: string;
  nameAr: string;
  colors: string[];
  heroPage: number;
  pages: ProjectPage[];
}

export const pageTypeLabel: Record<PageType, { en: string; ar: string }> = {
  cover: { en: "Cover", ar: "الغلاف" },
  logo: { en: "Logo", ar: "الشعار" },
  palette: { en: "Color Palette", ar: "لوحة الألوان" },
  typography: { en: "Typography", ar: "الخطوط" },
  application: { en: "Application", ar: "التطبيقات" },
};

function pages(slug: string, types: PageType[]): ProjectPage[] {
  return types.map((type, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      page: i + 1,
      type,
      image: `/images/identities/${slug}/page-${n}.webp`,
      thumb: `/images/identities/${slug}/page-${n}-thumb.webp`,
      width: 1600,
      height: 2000,
    };
  });
}

export const projects: Project[] = [
  {
    slug: "abraj-al-qaseed",
    nameEn: "Abraj Al-Qaseed",
    nameAr: "أبراج القصيد",
    colors: ["#25325e", "#da1f26", "#ffffff"],
    heroPage: 1,
    pages: pages("abraj-al-qaseed", ["cover", "logo", "logo", "palette", "typography", "application", "application", "application", "application"]),
  },
  {
    slug: "al-naqil-academy",
    nameEn: "Al-Naqil Academy",
    nameAr: "أكاديمية الناقل",
    colors: ["#1b2853", "#55a0d8", "#ffffff"],
    heroPage: 1,
    pages: pages("al-naqil-academy", [
      "cover", "logo", "palette", "application", "application", "application", "application", "application", "application", "typography", "cover",
    ]),
  },
  {
    slug: "zahrat-group",
    nameEn: "Zahra Group",
    nameAr: "زهرة كروب",
    colors: ["#45b98e", "#238f64", "#193660", "#ffffff"],
    heroPage: 1,
    pages: pages("zahrat-group", [
      "cover", "palette", "application", "application", "application", "application", "logo",
      "application", "application", "application", "application", "application", "application", "application",
    ]),
  },
  {
    slug: "ashur",
    nameEn: "Ashur",
    nameAr: "أشور",
    colors: ["#E31E2B", "#4A78C4", "#FFFFFF", "#14293F"],
    heroPage: 1,
    pages: pages("ashur", ["cover", "logo", "logo", "palette", "typography", "application", "application", "application", "application"]),
  },
  {
    slug: "ain-al-mahra",
    nameEn: "Ain Al-Mahra",
    nameAr: "عين المهرة",
    colors: ["#bc6c29", "#2e2e2e", "#f8f8f8"],
    heroPage: 3,
    pages: pages("ain-al-mahra", [
      "logo", "logo", "logo", "palette", "typography", "application", "application", "application", "application", "application", "application",
    ]),
  },
  {
    slug: "fann-al-kharaz",
    nameEn: "Fann Al-Kharaz",
    nameAr: "فن الخرز",
    colors: ["#2B658C", "#48B2D9", "#FAFBFB"],
    heroPage: 1,
    pages: pages("fann-al-kharaz", [
      "cover", "logo", "logo", "palette", "typography", "application", "application", "application",
      "application", "application", "application", "application", "application",
    ]),
  },
  {
    slug: "dr-reem",
    nameEn: "Dr. Reem",
    nameAr: "د. ريم",
    colors: ["#426AAB", "#DE5B37", "#FAFBFB"],
    heroPage: 1,
    pages: pages("dr-reem", ["cover", "logo", "logo", "palette", "typography", "application", "application", "application", "application", "application"]),
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
