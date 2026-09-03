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
  colors?: string[];
}

const brandIdentityItems: WorkItem[] = projects.map((p) => ({
  id: `project-${p.slug}`,
  filter: "brandIdentities",
  href: `/work/${p.slug}`,
  image: p.pages[p.heroPage - 1]?.thumb ?? p.pages[0].thumb,
  titleEn: p.nameEn,
  titleAr: p.nameAr,
  colors: p.colors,
}));

const socialItems: WorkItem[] = socialGroups.map((group) => {
  const cover = group.subgroups
    ? subgroupImages(group, group.subgroups[0])[0]
    : groupImages(group)[0];
  return {
    id: `social-${group.slug}`,
    filter: "socialMedia",
    href: `/work/social-media#${group.anchor}`,
    image: cover.replace(/\.webp$/, "-thumb.webp"),
    titleEn: group.labelEn,
    titleAr: group.labelAr,
  };
});

const logoItems: WorkItem[] = logoDesignItems.map((item) => ({
  id: `logo-${item.slug}`,
  filter: "logoDesign",
  href: "/work/logo-design",
  image: item.thumb,
  titleEn: item.slug.replace(/-/g, " "),
  titleAr: item.slug.replace(/-/g, " "),
}));

const campaignWorkItems: WorkItem[] = campaignItems.map((item) => ({
  id: `campaign-${item.slug}`,
  filter: "campaigns",
  href: "/work/campaigns",
  image: item.thumb,
  titleEn: `${campaignClient.nameEn} — ${item.labelEn}`,
  titleAr: `${campaignClient.nameAr} — ${item.labelAr}`,
}));

const printWorkItems: WorkItem[] = printItems.map((item) => ({
  id: `print-${item.slug}`,
  filter: "print",
  href: "/work/print",
  image: item.thumb,
  titleEn: `Print Design ${item.index}`,
  titleAr: `تصميم مطبوعات ${item.index}`,
}));

export const workItems: WorkItem[] = [
  ...brandIdentityItems,
  ...socialItems.slice(0, 6),
  ...logoItems.slice(0, 6),
  ...campaignWorkItems,
  ...printWorkItems,
];

export const allSocialItems = socialItems;
export const allLogoItems = logoItems;
