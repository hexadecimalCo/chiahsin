import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllArticles(locale).map((article) => ({ locale, slug: article.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticleBySlug(locale, slug);

  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    image: article.coverImageUrl ?? undefined,
    author: { "@type": "Organization", name: "佾廷會計師事務所" },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="mb-3 text-3xl font-bold text-brand-navy">{article.title}</h1>
      {article.publishedAt && (
        <p className="mb-8 text-sm text-brand-navy/50">
          {article.publishedAt.toLocaleDateString(locale)}
        </p>
      )}
      <div
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </article>
  );
}
