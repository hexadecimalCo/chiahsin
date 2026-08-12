import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllArticles } from "@/lib/articles";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "search" });
  return { title: t("title") };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "search" });
  const { q = "" } = await searchParams;
  const query = q.trim();
  const needle = query.toLowerCase();

  const results = query
    ? getAllArticles(locale).filter(
        (article) =>
          article.title.toLowerCase().includes(needle) ||
          article.excerpt?.toLowerCase().includes(needle)
      )
    : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">{t("title")}</h1>
      <form className="mb-8">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder={t("placeholder")}
          className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </form>

      {query && (
        <p className="mb-4 text-sm text-slate-500">
          {t("resultsFor", { query, count: results.length })}
        </p>
      )}

      <div className="space-y-4">
        {results.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block rounded-lg border border-slate-200 p-4 hover:shadow-md"
          >
            <h2 className="font-semibold text-slate-900">{article.title}</h2>
            {article.excerpt && <p className="text-sm text-slate-500">{article.excerpt}</p>}
          </Link>
        ))}
        {query && results.length === 0 && <p className="text-slate-400">{t("empty")}</p>}
      </div>
    </div>
  );
}
