import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/work/brand-identities`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work/social-media`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/work/logo-design`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/work/campaigns`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/work/print`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
