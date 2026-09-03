import { Hero } from "@/components/home/Hero";
import { ManifestoTeaser } from "@/components/home/ManifestoTeaser";
import { SelectedWorkSection } from "@/components/home/SelectedWorkSection";
import { BrandIdentitiesShowcase } from "@/components/home/BrandIdentitiesShowcase";
import { Marquee } from "@/components/home/Marquee";
import { CampaignsShowcase } from "@/components/home/CampaignsShowcase";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ManifestoTeaser />
      <SelectedWorkSection />
      <BrandIdentitiesShowcase />
      <Marquee />
      <CampaignsShowcase />
      <GalleryStrip />
      <CtaSection />
    </>
  );
}
