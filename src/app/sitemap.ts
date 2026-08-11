import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const articles = getAllArticles();

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/blog`, lastModified: new Date() },
    ...articles.map((article) => ({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: article.updatedAt,
    })),
  ];
}
