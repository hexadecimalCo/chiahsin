"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { slugify } from "@/lib/slugify";
import { getSession } from "@/lib/session";
import { saveArticleImage, UploadError } from "@/lib/storage";

async function requireAdmin() {
  const session = await getSession();
  if (!session.adminId) {
    redirect("/admin/login");
  }
}

const articleSchema = z.object({
  title: z.string().trim().min(1, "請輸入標題").max(200),
  slug: z.string().trim().min(1, "請輸入網址代稱").max(200),
  excerpt: z.string().trim().max(500).optional(),
  contentHtml: z.string().min(1, "請輸入文章內容"),
  coverImageUrl: z.string().trim().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export interface ArticleFormState {
  error?: string;
}

function extractArticleInput(formData: FormData) {
  const rawSlug = String(formData.get("slug") ?? "");
  const title = String(formData.get("title") ?? "");

  return {
    title,
    slug: slugify(rawSlug || title),
    excerpt: String(formData.get("excerpt") ?? "") || undefined,
    contentHtml: String(formData.get("contentHtml") ?? ""),
    coverImageUrl: String(formData.get("coverImageUrl") ?? "") || undefined,
    status: String(formData.get("status") ?? "DRAFT") as "DRAFT" | "PUBLISHED",
  };
}

export async function createArticleAction(
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  await requireAdmin();

  const parsed = articleSchema.safeParse(extractArticleInput(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "資料格式錯誤" };
  }

  const data = parsed.data;
  const existing = await prisma.article.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return { error: "這個網址代稱（slug）已經被使用了" };
  }

  const article = await prisma.article.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      contentHtml: sanitizeArticleHtml(data.contentHtml),
      coverImageUrl: data.coverImageUrl,
      status: data.status,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/articles");
  redirect(`/admin/articles/${article.id}/edit`);
}

export async function updateArticleAction(
  articleId: string,
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  await requireAdmin();

  const parsed = articleSchema.safeParse(extractArticleInput(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "資料格式錯誤" };
  }

  const data = parsed.data;
  const existing = await prisma.article.findUnique({ where: { slug: data.slug } });
  if (existing && existing.id !== articleId) {
    return { error: "這個網址代稱（slug）已經被使用了" };
  }

  const current = await prisma.article.findUnique({ where: { id: articleId } });
  if (!current) {
    return { error: "找不到這篇文章" };
  }

  await prisma.article.update({
    where: { id: articleId },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      contentHtml: sanitizeArticleHtml(data.contentHtml),
      coverImageUrl: data.coverImageUrl,
      status: data.status,
      publishedAt:
        data.status === "PUBLISHED" ? current.publishedAt ?? new Date() : current.publishedAt,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/articles");
  revalidatePath(`/blog/${data.slug}`);
  return {};
}

export async function deleteArticleAction(articleId: string) {
  await requireAdmin();
  await prisma.article.delete({ where: { id: articleId } });
  revalidatePath("/");
  revalidatePath("/admin/articles");
}

type UploadResult = { ok: true; url: string } | { ok: false; error: string };

export async function uploadArticleImageAction(formData: FormData): Promise<UploadResult> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "沒有收到檔案" };
  }

  try {
    const url = await saveArticleImage(file);
    return { ok: true, url };
  } catch (err) {
    if (err instanceof UploadError) {
      return { ok: false, error: err.message };
    }
    return { ok: false, error: "上傳失敗，請稍後再試" };
  }
}
