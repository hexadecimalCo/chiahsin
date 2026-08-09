import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "文章專欄" };

export default async function BlogListPage() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold text-slate-900">文章專欄</h1>
      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="block rounded-lg border border-slate-200 p-5 transition hover:shadow-md"
          >
            <h2 className="mb-1 font-semibold text-slate-900">{article.title}</h2>
            {article.excerpt && <p className="text-sm text-slate-500">{article.excerpt}</p>}
            {article.publishedAt && (
              <p className="mt-2 text-xs text-slate-400">
                {article.publishedAt.toLocaleDateString("zh-TW")}
              </p>
            )}
          </Link>
        ))}
        {articles.length === 0 && <p className="text-slate-400">目前還沒有文章</p>}
      </div>
    </div>
  );
}
