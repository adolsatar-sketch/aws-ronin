import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getProject, projects } from "@/lib/data/projects";
import { campaignClient } from "@/lib/data/logoDesign";
import { CaseStudyView } from "@/components/work/CaseStudyView";
import { BrandIdentitiesListing } from "@/components/work/BrandIdentitiesListing";
import { SocialMediaListing } from "@/components/work/SocialMediaListing";
import { LogoDesignListing } from "@/components/work/LogoDesignListing";
import { CampaignsListing } from "@/components/work/CampaignsListing";
import { PrintListing } from "@/components/work/PrintListing";

const categoryMeta: Record<string, { title: string; description: string }> = {
  "brand-identities": { title: dictionaries.ar.work.filters.brandIdentities, description: dictionaries.ar.home.brandIdentitiesDesc },
  "social-media": { title: dictionaries.ar.social.title, description: dictionaries.ar.social.subtitle },
  "logo-design": { title: dictionaries.ar.logoDesign.title, description: dictionaries.ar.logoDesign.subtitle },
  campaigns: { title: campaignClient.nameAr, description: dictionaries.ar.campaigns.subtitle },
  print: { title: dictionaries.ar.print.title, description: dictionaries.ar.print.subtitle },
};

export function generateStaticParams() {
  return [...Object.keys(categoryMeta), ...projects.map((p) => p.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryMeta[slug];
  if (category) return { title: category.title, description: category.description };

  const project = getProject(slug);
  if (project) return { title: project.nameAr, description: dictionaries.ar.work.filters.brandIdentities };

  return {};
}

export default async function WorkSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  switch (slug) {
    case "brand-identities":
      return <BrandIdentitiesListing />;
    case "social-media":
      return <SocialMediaListing />;
    case "logo-design":
      return <LogoDesignListing />;
    case "campaigns":
      return <CampaignsListing />;
    case "print":
      return <PrintListing />;
    default:
      break;
  }

  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudyView project={project} />;
}
