import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/preview/"] },
      // Explicitly allow AI answer-engine crawlers for AEO (client-confirmed policy).
      // Each still gets its own disallow — a matching named user-agent block
      // replaces the wildcard block entirely rather than merging with it.
      { userAgent: "GPTBot", allow: "/", disallow: ["/preview/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/preview/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/preview/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/preview/"] },
      { userAgent: "anthropic-ai", allow: "/", disallow: ["/preview/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
