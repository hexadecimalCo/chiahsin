import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllArticles, type ArticleCategory } from "@/lib/articles";
import { routing, type Locale } from "@/i18n/routing";

const CATEGORIES: ArticleCategory[] = [
  "foreign-investment",
  "renewable-energy",
  "tax-basics",
  "firm-announcement",
];

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
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const { category } = await searchParams;
  const activeCategory = CATEGORIES.includes(category as ArticleCategory)
    ? (category as ArticleCategory)
    : null;

  const allArticles = getAllArticles(locale);
  const articles = activeCategory
    ? allArticles.filter((article) => article.category === activeCategory)
    : allArticles;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold text-brand-navy">{t("title")}</h1>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={
            activeCategory === null
              ? "rounded-full bg-brand-navy px-4 py-[7px] text-[13px] text-white"
              : "rounded-full border border-brand-gray-300 px-4 py-[7px] text-[13px] text-brand-navy/70"
          }
        >
          {t("categories.all")}
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/blog?category=${cat}`}
            className={
              activeCategory === cat
                ? "rounded-full bg-brand-navy px-4 py-[7px] text-[13px] text-white"
                : "rounded-full border border-brand-gray-300 px-4 py-[7px] text-[13px] text-brand-navy/70"
            }
          >
            {t(`categories.${cat}`)}
          </Link>
        ))}
      </div>

      <div className="grid gap-5">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block rounded-lg border border-brand-gray-300 p-6 transition hover:shadow-md"
          >
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-brand-cream px-2.5 py-1 font-semibold text-brand-gold">
                {t(`categories.${article.category}`)}
              </span>
              {article.publishedAt && (
                <span className="text-brand-navy/50">
                  {article.publishedAt.toLocaleDateString(locale)}
                </span>
              )}
            </div>
            <h2 className="mb-1.5 mt-3 text-[17px] font-semibold leading-snug text-brand-navy">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="text-sm leading-relaxed text-neutral-500">{article.excerpt}</p>
            )}
          </Link>
        ))}
        {articles.length === 0 && <p className="text-brand-navy/50">{t("empty")}</p>}
      </div>
    </div>
  );
}
