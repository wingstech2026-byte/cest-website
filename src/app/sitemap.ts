import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { categorySlug, postCategories } from "@/data/news";
import { legalPages } from "@/data/legal";
import { getPosts, getPrograms, getProjects } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/projects",
    "/impact",
    "/leadership",
    "/gallery",
    "/get-involved",
    "/volunteer",
    "/partner",
    "/membership",
    "/donate",
    "/news",
    "/contact",
  ];

  const [programs, projects, posts] = await Promise.all([getPrograms(), getProjects(), getPosts()]);

  return [
    ...staticRoutes.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: now,
      changeFrequency: p === "" || p === "/news" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "" ? 1 : 0.8,
    })),
    ...programs.map((p) => ({ url: `${site.url}/programs/${p.slug}`, lastModified: now, priority: 0.7 })),
    // Template/sample entries are excluded from search engines.
    ...projects.filter((p) => !p.isPlaceholder).map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: now, priority: 0.7 })),
    ...posts.filter((p) => !p.isSample).map((p) => ({ url: `${site.url}/news/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 })),
    ...(posts.some((p) => !p.isSample)
      ? postCategories.map((c) => ({ url: `${site.url}/news/category/${categorySlug(c)}`, lastModified: now, priority: 0.4 }))
      : []),
    ...legalPages.map((p) => ({ url: `${site.url}/${p.slug}`, lastModified: now, priority: 0.3 })),
  ];
}
