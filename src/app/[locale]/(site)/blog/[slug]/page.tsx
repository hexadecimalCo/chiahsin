import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
      images: [article.coverImageUrl ?? "/og-default.png"],
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
  const t = await getTranslations({ locale, namespace: "blog" });
  const article = getArticleBySlug(locale, slug);

  if (!article) notFound();

  const allArticles = getAllArticles(locale);
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const prevArticle =
    currentIndex >= 0 && currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;

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
        className="prose prose-slate max-w-none prose-headings:text-brand-navy prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-navy"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      <div className="mt-14 flex flex-wrap items-center justify-between gap-5 rounded-lg bg-brand-cream px-8 py-7">
        <p className="max-w-[460px] text-[15px] leading-relaxed text-brand-navy">
          {t("ctaText")}
        </p>
        <Link
          href="/contact"
          className="flex-none rounded-md bg-brand-navy-2 px-6 py-3 text-sm font-medium text-brand-on-dark transition hover:bg-brand-navy-hover"
        >
          {t("ctaLabel")}
        </Link>
      </div>

      {(prevArticle || nextArticle) && (
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-brand-gray-300 bg-brand-gray-300">
          <div className="bg-background px-6 py-5">
            {prevArticle && (
              <Link href={`/blog/${prevArticle.slug}`} className="block">
                <p className="text-xs text-brand-navy/50">← {t("prevArticle")}</p>
                <p className="mt-2 text-[15px] font-medium leading-snug text-brand-navy">
                  {prevArticle.title}
                </p>
              </Link>
            )}
          </div>
          <div className="bg-background px-6 py-5 text-right">
            {nextArticle && (
              <Link href={`/blog/${nextArticle.slug}`} className="block">
                <p className="text-xs text-brand-navy/50">{t("nextArticle")} →</p>
                <p className="mt-2 text-[15px] font-medium leading-snug text-brand-navy">
                  {nextArticle.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
