"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteArticleAction } from "@/lib/actions/article-actions";

export function DeleteArticleButton({ articleId }: { articleId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("確定要刪除這篇文章嗎？此動作無法復原。")) return;
        startTransition(async () => {
          await deleteArticleAction(articleId);
          router.refresh();
        });
      }}
      className="text-sm text-red-500 transition hover:text-red-700 disabled:opacity-50"
    >
      {pending ? "刪除中…" : "刪除"}
    </button>
  );
}
