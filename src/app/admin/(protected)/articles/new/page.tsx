import { ArticleForm } from "@/components/admin/ArticleForm";
import { createArticleAction } from "@/lib/actions/article-actions";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-slate-900">新增文章</h1>
      <ArticleForm action={createArticleAction} submitLabel="建立文章" />
    </div>
  );
}
