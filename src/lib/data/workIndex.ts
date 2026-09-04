import { projects } from "./projects";
import { socialGroups, groupImages, subgroupImages } from "./social";
import { logoDesignItems, printItems, campaignItems, campaignClient } from "./logoDesign";

export type FilterKey = "all" | "brandIdentities" | "socialMedia" | "logoDesign" | "campaigns" | "print";

export interface WorkItem {
  id: string;
  filter: Exclude<FilterKey, "all">;
  href: string;
  image: string;
  titleEn: string;
  titleAr: string;
  /** Specific label shown on the card — a project's category, not the plural filter-bar label. */
  tagEn: string;
  tagAr: string;
  colors?: string[];
  /** Brand identities, the Ejeet campaign, and the logo-design collection render as larger cards. */
  featured?: boolean;
}

const brandIdentityItems: WorkItem[] = projects.map((p) => ({
  id: `identity-${p.slug}`,
  filter: "brandIdentities",
  href: `/work/${p.slug}`,
  image: p.pages[p.heroPage - 1]?.thumb ?? p.pages[0].thumb,
  titleEn: p.nameEn,
  titleAr: p.nameAr,
  tagEn: "Brand Identity",
  tagAr: "هوية بصرية",
  colors: p.colors,
  featured: true,
}));

const campaignItem: WorkItem = {
  id: "campaign-ejeet",
  filter: "campaigns",
  href: "/work/campaigns",
  image: campaignItems[0].thumb,
  titleEn: `${campaignClient.nameEn} Campaign`,
  titleAr: "حملة إجيت",
  tagEn: "Campaign",
  tagAr: "حملة إعلانية",
  featured: true,
};

const logoDesignCollectionItem: WorkItem = {
  id: "logo-design-collection",
  filter: "logoDesign",
  href: "/work/logo-design",
  image: logoDesignItems[0].thumb,
  titleEn: "Logo Design",
  titleAr: "تصاميم الشعارات",
  tagEn: "Logo Design",
  tagAr: "تصميم شعار",
  featured: true,
};

/** One item per social "client" — a whole group when flat, or each sub-brand when nested. */
const socialItems: WorkItem[] = socialGroups.flatMap((group) => {
  if (group.subgroups) {
    return group.subgroups.map((sub) => ({
      id: `social-${group.slug}-${sub.slug}`,
      filter: "socialMedia" as const,
      href: `/work/social-media#${group.anchor}-${sub.slug}`,
      image: subgroupImages(group, sub)[0].thumb,
      titleEn: sub.labelEn,
      titleAr: sub.labelAr,
      tagEn: group.labelEn,
      tagAr: group.labelAr,
    }));
  }
  return [
    {
      id: `social-${group.slug}-main`,
      filter: "socialMedia" as const,
      href: `/work/social-media#${group.anchor}`,
      image: groupImages(group)[0].thumb,
      titleEn: group.labelEn,
      titleAr: group.labelAr,
      tagEn: group.labelEn,
      tagAr: group.labelAr,
    },
  ];
});

const printStandsItem: WorkItem = {
  id: "print-stands",
  filter: "print",
  href: "/work/print",
  image: printItems[0].thumb,
  titleEn: "Stand Design",
  titleAr: "تصميم ستاندات",
  tagEn: "Print Design",
  tagAr: "تصميم مطبوعات",
};

/** The full, unified archive — exact order/content the original site's /work index used. */
export const workItems: WorkItem[] = [
  ...brandIdentityItems,
  campaignItem,
  logoDesignCollectionItem,
  ...socialItems,
  printStandsItem,
];

/** The 9-item curated highlight reel used in the home page's "Selected Work" section. */
const selectedWorkIds = [
  "campaign-ejeet",
  "identity-al-naqil-academy",
  "identity-abraj-al-qaseed",
  "social-automotive-baic",
  "identity-zahrat-group",
  "social-jewelry-main",
  "identity-fann-al-kharaz",
  "social-medical-hgh-pharmacy",
  "logo-design-collection",
];

export const selectedWork: WorkItem[] = selectedWorkIds
  .map((id) => workItems.find((item) => item.id === id))
  .filter((item): item is WorkItem => Boolean(item));
