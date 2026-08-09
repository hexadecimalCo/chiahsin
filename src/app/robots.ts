import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin" },
      // Explicitly allow AI answer-engine crawlers for AEO (client-confirmed policy).
      { userAgent: "GPTBot", allow: "/", disallow: "/admin" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/admin" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/admin" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/admin" },
      { userAgent: "anthropic-ai", allow: "/", disallow: "/admin" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
