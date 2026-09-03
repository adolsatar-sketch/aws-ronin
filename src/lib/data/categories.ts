import { totalSocialImages } from "./social";
import { logoDesignItems, printItems } from "./logoDesign";

export type CategoryCta = "explore" | "view" | "open";

export interface PortfolioCategory {
  slug: "brand-identities" | "social-media" | "logo-design" | "campaigns" | "print";
  filterKey: "brandIdentities" | "socialMedia" | "logoDesign" | "campaigns" | "print";
  href: string;
  image: string;
  count: number;
  countLabel: { en: string; ar: string };
  cta: CategoryCta;
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "brand-identities",
    filterKey: "brandIdentities",
    href: "/work/brand-identities",
    image: "/images/identities/abraj-al-qaseed/page-01-thumb.webp",
    count: 7,
    countLabel: { en: "7 Projects", ar: "7 مشاريع" },
    cta: "explore",
  },
  {
    slug: "social-media",
    filterKey: "socialMedia",
    href: "/work/social-media",
    image: "/images/social/travel/travel-03-thumb.webp",
    count: totalSocialImages,
    countLabel: { en: `${totalSocialImages} Images`, ar: `${totalSocialImages} صورة` },
    cta: "view",
  },
  {
    slug: "logo-design",
    filterKey: "logoDesign",
    href: "/work/logo-design",
    image: "/images/logo-design/guzel-logo-thumb.webp",
    count: logoDesignItems.length,
    countLabel: { en: `${logoDesignItems.length} Logos`, ar: `${logoDesignItems.length} شعار` },
    cta: "open",
  },
  {
    slug: "campaigns",
    filterKey: "campaigns",
    href: "/work/campaigns",
    image: "/images/campaigns/ejeet/card-mockup-thumb.webp",
    count: 4,
    countLabel: { en: "4 Pieces", ar: "4 قطع" },
    cta: "explore",
  },
  {
    slug: "print",
    filterKey: "print",
    href: "/work/print",
    image: "/images/print/stand-mockup1-thumb.webp",
    count: printItems.length,
    countLabel: { en: `${printItems.length} Stands`, ar: `${printItems.length} ستاندات` },
    cta: "view",
  },
];
