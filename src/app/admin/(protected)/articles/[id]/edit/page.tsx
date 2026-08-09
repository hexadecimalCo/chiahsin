import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { updateArticleAction } from "@/lib/actions/article-actions";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const boundAction = updateArticleAction.bind(null, article.id);

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-slate-900">編輯文章</h1>
      <ArticleForm
        action={boundAction}
        submitLabel="儲存變更"
        initial={{
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt ?? "",
          contentHtml: article.contentHtml,
          coverImageUrl: article.coverImageUrl ?? "",
          status: article.status,
        }}
      />
    </div>
  );
}
