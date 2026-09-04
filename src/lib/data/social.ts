import dimensions from "./socialImageDimensions.json";

export interface SocialImage {
  src: string;
  thumb: string;
  width: number;
  height: number;
}

export interface SocialSubGroup {
  slug: string;
  labelEn: string;
  labelAr: string;
  count: number;
}

export interface SocialGroup {
  slug: string;
  anchor: string;
  labelEn: string;
  labelAr: string;
  /** Flat groups list images directly; nested groups are split by client sub-brand. */
  count?: number;
  subgroups?: SocialSubGroup[];
}

export const socialGroups: SocialGroup[] = [
  { slug: "gaming", anchor: "gaming", labelEn: "Gaming", labelAr: "العاب", count: 3 },
  { slug: "oil", anchor: "oil", labelEn: "Oil", labelAr: "بترول", count: 4 },
  { slug: "delivery", anchor: "delivery", labelEn: "Delivery", labelAr: "توصيل", count: 10 },
  { slug: "travel", anchor: "travel", labelEn: "Travel & Tourism", labelAr: "سياحة وسفر", count: 10 },
  { slug: "elevator-maintenance", anchor: "elevator-maintenance", labelEn: "Elevator Maintenance", labelAr: "صيانة مصاعد", count: 5 },
  { slug: "real-estate", anchor: "real-estate", labelEn: "Real Estate", labelAr: "عقار", count: 11 },
  { slug: "jewelry", anchor: "jewelry", labelEn: "Jewelry", labelAr: "مجوهرات", count: 9 },
  { slug: "laundry", anchor: "laundry", labelEn: "Laundry", labelAr: "مكوى", count: 7 },
  {
    slug: "medical",
    anchor: "medical",
    labelEn: "Medical Group",
    labelAr: "المجموعة الطبية",
    subgroups: [
      { slug: "hgh-pharmacy", labelEn: "HGH Pharmacy", labelAr: "صيدلية HGH", count: 13 },
      { slug: "jumeira-pharmacy", labelEn: "Jumeira Pharmacy", labelAr: "صيدلية جميرا", count: 6 },
      { slug: "ban-clinic", labelEn: "Ban Clinic", labelAr: "عيادة بان", count: 4 },
    ],
  },
  {
    slug: "beauty",
    anchor: "beauty",
    labelEn: "Beauty",
    labelAr: "تجميل",
    subgroups: [
      { slug: "t-glow-salon", labelEn: "T-Glow Salon", labelAr: "صالون تي كلو", count: 3 },
      { slug: "soul-salon", labelEn: "Soul Salon", labelAr: "صالون سول", count: 7 },
    ],
  },
  {
    slug: "automotive",
    anchor: "automotive",
    labelEn: "Automotive",
    labelAr: "سيارات",
    subgroups: [
      { slug: "baic", labelEn: "BAIC", labelAr: "بايك", count: 6 },
      { slug: "al-nayyar", labelEn: "Al-Nayyar", labelAr: "النيار", count: 7 },
      { slug: "batteries", labelEn: "Batteries", labelAr: "بطاريات", count: 5 },
      { slug: "car-workshop", labelEn: "Car Workshop", labelAr: "ورشة سيارات", count: 3 },
    ],
  },
  {
    slug: "restaurants",
    anchor: "restaurants",
    labelEn: "Restaurants",
    labelAr: "مطاعم",
    subgroups: [
      { slug: "other", labelEn: "Other", labelAr: "أخرى", count: 3 },
      { slug: "balkony", labelEn: "Balkony", labelAr: "بالكوني", count: 6 },
      { slug: "bait-halab", labelEn: "Bait Halab", labelAr: "بيت حلب", count: 3 },
      { slug: "samawar", labelEn: "Samawar", labelAr: "سماور", count: 4 },
      { slug: "vanili", labelEn: "Vanili", labelAr: "فانيلي", count: 3 },
    ],
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const imageDimensions: Record<string, { width: number; height: number }> = dimensions;

function toSocialImage(fullSrc: string): SocialImage {
  const { width, height } = imageDimensions[fullSrc] ?? { width: 4, height: 5 };
  return { src: fullSrc, thumb: fullSrc.replace(/\.webp$/, "-thumb.webp"), width, height };
}

export function groupImages(group: SocialGroup): SocialImage[] {
  if (group.count) {
    return Array.from({ length: group.count }, (_, i) =>
      toSocialImage(`/images/social/${group.slug}/${group.slug}-${pad(i + 1)}.webp`),
    );
  }
  return [];
}

export function subgroupImages(group: SocialGroup, sub: SocialSubGroup): SocialImage[] {
  return Array.from({ length: sub.count }, (_, i) =>
    toSocialImage(`/images/social/${group.slug}/${sub.slug}/${sub.slug}-${pad(i + 1)}.webp`),
  );
}

export const totalSocialImages = socialGroups.reduce((total, group) => {
  if (group.count) return total + group.count;
  return total + (group.subgroups ?? []).reduce((s, sg) => s + sg.count, 0);
}, 0);
