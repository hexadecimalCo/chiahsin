import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "搜尋" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const results = query
    ? await prisma.article.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { publishedAt: "desc" },
      })
    : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">搜尋</h1>
      <form className="mb-8">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="搜尋文章…"
          className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </form>

      {query && (
        <p className="mb-4 text-sm text-slate-500">
          「{query}」的搜尋結果（{results.length}）
        </p>
      )}

      <div className="space-y-4">
        {results.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="block rounded-lg border border-slate-200 p-4 hover:shadow-md"
          >
            <h2 className="font-semibold text-slate-900">{article.title}</h2>
            {article.excerpt && <p className="text-sm text-slate-500">{article.excerpt}</p>}
          </Link>
        ))}
        {query && results.length === 0 && <p className="text-slate-400">沒有找到相關結果</p>}
      </div>
    </div>
  );
}
