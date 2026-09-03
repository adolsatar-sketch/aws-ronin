export const logoDesignItems = [
  "bx",
  "iraq-development-foundation3",
  "jeny",
  "madam-noor",
  "maher-adil-logo",
  "air-view",
  "guzel-logo",
  "security-damage",
  "smart-store3",
  "al-hamra",
  "al-nawaras",
  "dr-haya",
  "alam-al-iraq",
  "kabab-al-jaderia",
  "malik-al-sharq",
].map((slug) => ({
  slug,
  image: `/images/logo-design/${slug}.webp`,
  thumb: `/images/logo-design/${slug}-thumb.webp`,
}));

export const printItems = [1, 2, 3, 4].map((n) => ({
  slug: `stand-mockup${n}`,
  image: `/images/print/stand-mockup${n}.webp`,
  thumb: `/images/print/stand-mockup${n}-thumb.webp`,
  index: n,
}));

export const campaignItems = [
  { slug: "card-mockup", labelEn: "Card Mockup", labelAr: "بطاقة الدعوة - موكاب" },
  { slug: "newspaper-mockup", labelEn: "Newspaper Mockup", labelAr: "إعلان جريدة - موكاب" },
  { slug: "invitation", labelEn: "Invitation", labelAr: "الدعوة" },
  { slug: "photo-booth", labelEn: "Photo Booth", labelAr: "فوتو بوث" },
].map((item, i) => ({
  ...item,
  index: i + 1,
  image: `/images/campaigns/ejeet/${item.slug}.webp`,
  thumb: `/images/campaigns/ejeet/${item.slug}-thumb.webp`,
}));

export const campaignClient = { nameEn: "Ejeet", nameAr: "Ejeet" };
