import { Hero } from "@/components/home/Hero";
import { ManifestoTeaser } from "@/components/home/ManifestoTeaser";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { CreativeDisciplines } from "@/components/home/CreativeDisciplines";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ManifestoTeaser />
      <FeaturedProjects />
      <CategoriesSection />
      <CreativeDisciplines />
      <CtaSection />
    </>
  );
}
