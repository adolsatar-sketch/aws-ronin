export type Locale = "ar" | "en";

const dictionary = {
  meta: {
    titleSuffix: "RONIN",
  },
  nav: {
    home: { en: "Home", ar: "الرئيسية" },
    work: { en: "Work", ar: "الأعمال" },
    about: { en: "About", ar: "من نحن" },
    contact: { en: "Contact", ar: "تواصل" },
    menu: { en: "Menu", ar: "القائمة" },
    close: { en: "Close", ar: "إغلاق" },
  },
  work: {
    title: { en: "Selected Work", ar: "أعمال مختارة" },
    subtitle: {
      en: "Brand identities, campaigns, social design and print — a working archive.",
      ar: "هويات بصرية، حملات، تصاميم سوشيال ميديا، ومطبوعات — أرشيف عمل مستمر.",
    },
    filters: {
      all: { en: "All", ar: "الكل" },
      brandIdentities: { en: "Brand Identities", ar: "الهويات البصرية" },
      socialMedia: { en: "Social Media", ar: "سوشيال ميديا" },
      logoDesign: { en: "Logo Design", ar: "تصاميم الشعارات" },
      campaigns: { en: "Campaigns", ar: "الحملات" },
      print: { en: "Print Design", ar: "المطبوعات" },
    },
    viewProject: { en: "View Project", ar: "عرض المشروع" },
    backToWork: { en: "Back to Work", ar: "العودة للأعمال" },
    nextProject: { en: "Next Project", ar: "المشروع التالي" },
    viewOriginalPdf: { en: "View Original PDF", ar: "عرض ملف PDF الأصلي" },
    project: { en: "Project", ar: "مشروع" },
  },
  home: {
    scroll: { en: "Scroll", ar: "مرر للأسفل" },
    heroEyebrow: { en: "Graphic Design / Art Direction / Visual Storytelling", ar: "تصميم جرافيك / إخراج فني / سرد بصري" },
    manifestoLabel: { en: "Manifesto", ar: "الفلسفة" },
    selectedWork: { en: "Selected Work", ar: "أعمال مختارة" },
    viewAllWork: { en: "View All Work", ar: "عرض كل الأعمال" },
    brandIdentitiesTitle: { en: "Brand Identities", ar: "الهويات البصرية" },
    brandIdentitiesDesc: {
      en: "Full visual systems built from the ground up — logo, color, type, and application.",
      ar: "أنظمة بصرية كاملة مبنية من الصفر — شعار، ألوان، خطوط، وتطبيقات.",
    },
    campaignsTitle: { en: "Campaigns & Print", ar: "الحملات والمطبوعات" },
    campaignsDesc: {
      en: "Ideas carried across newspapers, invitations, stands, and physical space.",
      ar: "أفكار انتقلت عبر الجرائد والدعوات والستاندات والمساحة الفعلية.",
    },
    specialties: {
      en: "GRAPHIC DESIGN — ART DIRECTION — VISUAL STORYTELLING — BRAND IDENTITY — SOCIAL DESIGN — CAMPAIGNS —",
      ar: "تصميم جرافيك — إخراج فني — سرد بصري — هوية بصرية — تصميم سوشيال ميديا — حملات —",
    },
    galleryTitle: { en: "From the Archive", ar: "من الأرشيف" },
    ctaTitle: { en: "Have an idea with no limits?", ar: "عندك فكرة بلا حدود؟" },
    ctaButton: { en: "Start a Project", ar: "ابدأ مشروعك" },
  },
  about: {
    title: { en: "About Ronin", ar: "عن Ronin" },
    philosophy: { en: "Ronin Philosophy", ar: "فلسفة Ronin" },
    freedom: { en: "Creative Freedom", ar: "الحرية الإبداعية" },
    graphicDesign: { en: "Graphic Design", ar: "تصميم جرافيك" },
    artDirection: { en: "Art Direction", ar: "إخراج فني" },
    storytelling: { en: "Visual Storytelling", ar: "سرد بصري" },
    vision: { en: "Vision", ar: "الرؤية" },
    manifestoFinal: { en: "Final Manifesto", ar: "الخاتمة" },
  },
  contact: {
    title: { en: "Start a Project", ar: "ابدأ مشروعك" },
    subtitle: {
      en: "Tell me about the idea. No limits, no templates — just describe what you need.",
      ar: "احكيلي عن الفكرة. بلا حدود، بلا قوالب جاهزة — فقط اوصف اللي تحتاجه.",
    },
    name: { en: "Name", ar: "الاسم" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    projectType: { en: "Project Type", ar: "نوع المشروع" },
    projectTypeOptions: {
      en: ["Brand Identity", "Social Media", "Campaign", "Logo Design", "Print Design", "Other"],
      ar: ["هوية بصرية", "سوشيال ميديا", "حملة إعلانية", "تصميم شعار", "تصميم مطبوعات", "أخرى"],
    },
    budget: { en: "Budget (optional)", ar: "الميزانية (اختياري)" },
    message: { en: "Message", ar: "الرسالة" },
    send: { en: "Send Message", ar: "إرسال الرسالة" },
    sending: { en: "Sending…", ar: "جاري الإرسال…" },
    success: { en: "Message sent — thank you. I'll get back to you soon.", ar: "تم إرسال رسالتك — شكراً. راح أرد عليك قريباً." },
    error: { en: "Something went wrong. Please try again or reach out directly.", ar: "صار خطأ ما. حاول مرة ثانية أو تواصل مباشرة." },
    validation: {
      name: { en: "Please enter your name.", ar: "الرجاء إدخال الاسم." },
      email: { en: "Please enter a valid email address.", ar: "الرجاء إدخال بريد إلكتروني صحيح." },
      message: { en: "Please write a short message.", ar: "الرجاء كتابة رسالة قصيرة." },
    },
    directly: { en: "Or reach out directly", ar: "أو تواصل مباشرة" },
    noContact: {
      en: "Contact details are being finalized — check back soon, or use the form above.",
      ar: "معلومات التواصل قيد الإضافة — تابعنا قريباً، أو استخدم النموذج أعلاه.",
    },
  },
  social: {
    title: { en: "Social Media", ar: "سوشيال ميديا" },
    subtitle: {
      en: "Ongoing social design work, organized by client and industry.",
      ar: "أعمال تصميم سوشيال ميديا مستمرة، منظمة حسب العميل والمجال.",
    },
    viewCollection: { en: "View Collection", ar: "عرض المجموعة" },
    images: { en: "images", ar: "صورة" },
  },
  logoDesign: {
    title: { en: "Logo Design", ar: "تصاميم الشعارات" },
    subtitle: { en: "A selection of standalone logo marks.", ar: "مجموعة مختارة من الشعارات المستقلة." },
  },
  print: {
    title: { en: "Print Design", ar: "تصاميم المطبوعات" },
    subtitle: { en: "Stands and physical mockups.", ar: "ستاندات وموكابات فعلية." },
  },
  campaigns: {
    title: { en: "Campaigns", ar: "الحملات" },
    subtitle: {
      en: "Ideas carried across newspapers, invitations, stands, and physical space.",
      ar: "أفكار انتقلت عبر الجرائد والدعوات والستاندات والمساحة الفعلية.",
    },
  },
  footer: {
    rights: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
    backToTop: { en: "Back to top", ar: "العودة للأعلى" },
    workHeading: { en: "Work", ar: "الأعمال" },
    studioHeading: { en: "Ronin", ar: "Ronin" },
    contactHeading: { en: "Contact", ar: "تواصل" },
  },
  notFound: {
    title: { en: "Lost in the open space.", ar: "تهت في المساحة المفتوحة." },
    subtitle: { en: "This page doesn't exist — the idea wandered off.", ar: "هذه الصفحة غير موجودة — الفكرة ضلت الطريق." },
    cta: { en: "Return Home", ar: "العودة للرئيسية" },
  },
  common: {
    langSwitch: { en: "العربية", ar: "English" },
  },
} as const;

type DeepLocalized<T> = {
  [K in keyof T]: T[K] extends { en: infer E; ar: unknown } ? E : DeepLocalized<T[K]>;
};

function resolve<T>(node: T, lang: Locale): unknown {
  if (node && typeof node === "object" && "en" in node && "ar" in node) {
    return (node as Record<Locale, unknown>)[lang];
  }
  if (node && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node as Record<string, unknown>).map(([key, value]) => [key, resolve(value, lang)]),
    );
  }
  return node;
}

export type Dictionary = DeepLocalized<typeof dictionary>;

export const dictionaries: Record<Locale, Dictionary> = {
  en: resolve(dictionary, "en") as Dictionary,
  ar: resolve(dictionary, "ar") as Dictionary,
};
