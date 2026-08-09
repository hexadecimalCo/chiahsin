import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteArticleButton } from "@/components/admin/DeleteArticleButton";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">文章管理</h1>
        <Link
          href="/admin/articles/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          新增文章
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">標題</th>
              <th className="px-4 py-3 font-medium">狀態</th>
              <th className="px-4 py-3 font-medium">更新時間</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="font-medium text-slate-900 hover:underline"
                  >
                    {article.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {article.status === "PUBLISHED" ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      已發布
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      草稿
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {article.updatedAt.toLocaleDateString("zh-TW")}
                </td>
                <td className="px-4 py-3 text-right">
                  <DeleteArticleButton articleId={article.id} />
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  還沒有任何文章
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
