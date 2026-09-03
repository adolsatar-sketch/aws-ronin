import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ManifestoTeaser } from "@/components/home/ManifestoTeaser";
import { BrandIdentitiesShowcase } from "@/components/home/BrandIdentitiesShowcase";
import { CampaignsShowcase } from "@/components/home/CampaignsShowcase";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ManifestoTeaser />
      <BrandIdentitiesShowcase />
      <CampaignsShowcase />
      <GalleryStrip />
      <CtaSection />
    </>
  );
}
