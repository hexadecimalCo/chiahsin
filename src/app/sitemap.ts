import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { routing } from "@/i18n/routing";

function localePath(siteUrl: string, locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(
      { url: localePath(siteUrl, locale, ""), lastModified: new Date() },
      { url: localePath(siteUrl, locale, "/blog"), lastModified: new Date() }
    );

    for (const article of getAllArticles(locale)) {
      entries.push({
        url: localePath(siteUrl, locale, `/blog/${article.slug}`),
        lastModified: article.updatedAt,
      });
    }
  }

  return entries;
}
