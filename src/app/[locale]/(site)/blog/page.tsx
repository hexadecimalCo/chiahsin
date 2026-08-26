import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllArticles } from "@/lib/articles";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title") };
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const articles = getAllArticles(locale);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold text-brand-navy">{t("title")}</h1>
      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block rounded-lg border border-brand-gray-300 p-5 transition hover:shadow-md"
          >
            <h2 className="mb-1 font-semibold text-brand-navy">{article.title}</h2>
            {article.excerpt && <p className="text-sm text-neutral-500">{article.excerpt}</p>}
            {article.publishedAt && (
              <p className="mt-2 text-xs text-brand-navy/50">
                {article.publishedAt.toLocaleDateString(locale)}
              </p>
            )}
          </Link>
        ))}
        {articles.length === 0 && <p className="text-brand-navy/50">{t("empty")}</p>}
      </div>
    </div>
  );
}
