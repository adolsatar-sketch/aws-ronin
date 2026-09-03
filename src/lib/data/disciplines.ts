export interface Discipline {
  slug: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
  href: string;
}

/** Only disciplines the real portfolio actually demonstrates — each links to where it lives on the site. */
export const disciplines: Discipline[] = [
  {
    slug: "graphic-design",
    titleEn: "Graphic Design",
    titleAr: "تصميم جرافيك",
    descEn: "Visual systems built from first principles — where every mark earns its place.",
    descAr: "أنظمة بصرية تُبنى من الصفر — كل عنصر فيها له سبب لوجوده.",
    image: "/images/identities/ashur/page-01-thumb.webp",
    href: "/work",
  },
  {
    slug: "art-direction",
    titleEn: "Art Direction",
    titleAr: "إخراج فني",
    descEn: "Guiding every visual decision toward one coherent, deliberate idea.",
    descAr: "توجيه كل قرار بصري نحو فكرة واحدة واضحة ومقصودة.",
    image: "/images/identities/zahrat-group/page-01-thumb.webp",
    href: "/about",
  },
  {
    slug: "brand-identity",
    titleEn: "Brand Identity",
    titleAr: "هوية بصرية",
    descEn: "Full identity systems — logo, color, type, and application, built to last.",
    descAr: "أنظمة هوية متكاملة — شعار، ألوان، خطوط، وتطبيقات تدوم.",
    image: "/images/identities/abraj-al-qaseed/page-01-thumb.webp",
    href: "/work/brand-identities",
  },
  {
    slug: "visual-storytelling",
    titleEn: "Visual Storytelling",
    titleAr: "سرد بصري",
    descEn: "Turning a brand's story into something people actually feel.",
    descAr: "تحويل قصة العلامة إلى شيء يشعر به الناس فعلاً.",
    image: "/images/identities/dr-reem/page-01-thumb.webp",
    href: "/about",
  },
  {
    slug: "campaign-design",
    titleEn: "Campaign Design",
    titleAr: "تصميم حملات",
    descEn: "Ideas carried across print, digital, and physical space — as one voice.",
    descAr: "أفكار تنتقل عبر المطبوعات والمساحة الرقمية والفعلية — بصوت واحد.",
    image: "/images/campaigns/ejeet/newspaper-mockup-thumb.webp",
    href: "/work/campaigns",
  },
  {
    slug: "social-media-design",
    titleEn: "Social Media Design",
    titleAr: "تصميم سوشيال ميديا",
    descEn: "Ongoing content across industries — consistent, fast, and on-brand.",
    descAr: "محتوى مستمر لعشرات القطاعات — متسق، سريع، وبهوية واضحة.",
    image: "/images/social/jewelry/jewelry-01-thumb.webp",
    href: "/work/social-media",
  },
  {
    slug: "print-design",
    titleEn: "Print Design",
    titleAr: "تصميم مطبوعات",
    descEn: "Stands and physical mockups designed to hold up in the real world.",
    descAr: "ستاندات وموكابات فعلية مصمّمة لتصمد في العالم الحقيقي.",
    image: "/images/print/stand-mockup2-thumb.webp",
    href: "/work/print",
  },
  {
    slug: "logo-design",
    titleEn: "Logo Design",
    titleAr: "تصميم شعارات",
    descEn: "Standalone marks — a single symbol carrying an entire identity.",
    descAr: "شعارات مستقلة — رمز واحد يحمل هوية كاملة.",
    image: "/images/logo-design/bx-thumb.webp",
    href: "/work/logo-design",
  },
];
