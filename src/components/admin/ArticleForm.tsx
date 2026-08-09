"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { uploadArticleImageAction } from "@/lib/actions/article-actions";
import type { ArticleFormState } from "@/lib/actions/article-actions";

interface ArticleFormProps {
  action: (state: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  submitLabel: string;
  initial?: {
    title: string;
    slug: string;
    excerpt: string;
    contentHtml: string;
    coverImageUrl: string;
    status: "DRAFT" | "PUBLISHED";
  };
}

const emptyInitial = {
  title: "",
  slug: "",
  excerpt: "",
  contentHtml: "",
  coverImageUrl: "",
  status: "DRAFT" as const,
};

export function ArticleForm({ action, submitLabel, initial = emptyInitial }: ArticleFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [contentHtml, setContentHtml] = useState(initial.contentHtml);
  const [coverImageUrl, setCoverImageUrl] = useState(initial.coverImageUrl);
  const [coverUploading, setCoverUploading] = useState(false);

  async function handleCoverUpload(file: File) {
    setCoverUploading(true);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadArticleImageAction(formData);
    setCoverUploading(false);
    if (result.ok) {
      setCoverImageUrl(result.url);
    } else {
      alert(result.error);
    }
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="title">
          標題
        </label>
        <input
          id="title"
          name="title"
          defaultValue={initial.title}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="slug">
          網址代稱（slug）
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={initial.slug}
          placeholder="留空則自動依標題產生"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="excerpt">
          摘要（顯示在首頁文章卡片）
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={initial.excerpt}
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div>
        <span className="mb-1 block text-sm font-medium text-slate-700">封面圖</span>
        {coverImageUrl && (
          <div className="relative mb-2 h-40 w-full max-w-xs overflow-hidden rounded-md border border-slate-200">
            <Image src={coverImageUrl} alt="封面圖預覽" fill className="object-cover" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          disabled={coverUploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleCoverUpload(file);
          }}
          className="text-sm"
        />
        {coverUploading && <p className="mt-1 text-xs text-slate-400">上傳中…</p>}
        <input type="hidden" name="coverImageUrl" value={coverImageUrl} />
      </div>

      <div>
        <span className="mb-1 block text-sm font-medium text-slate-700">內容</span>
        <RichTextEditor initialContent={initial.contentHtml} onChange={setContentHtml} />
        <input type="hidden" name="contentHtml" value={contentHtml} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="status">
          發布狀態
        </label>
        <select
          id="status"
          name="status"
          defaultValue={initial.status}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        >
          <option value="DRAFT">草稿</option>
          <option value="PUBLISHED">發布</option>
        </select>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {pending ? "儲存中…" : submitLabel}
      </button>
    </form>
  );
}
