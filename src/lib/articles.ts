import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/i18n/routing";

const ARTICLES_ROOT = path.join(process.cwd(), "src/content/articles");

export type Article = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: Date;
  updatedAt: Date;
  contentHtml: string;
};

function readArticleFile(dir: string, filename: string): Article {
  const filePath = path.join(dir, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stat = fs.statSync(filePath);

  return {
    slug: filename.replace(/\.md$/, ""),
    title: data.title,
    excerpt: data.excerpt ?? null,
    coverImageUrl: data.coverImageUrl ?? null,
    publishedAt: data.publishedAt ? new Date(data.publishedAt) : stat.birthtime,
    updatedAt: stat.mtime,
    contentHtml: marked.parse(content, { async: false }),
  };
}

export function getAllArticles(locale: Locale): Article[] {
  const dir = path.join(ARTICLES_ROOT, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readArticleFile(dir, f))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export function getArticleBySlug(locale: Locale, slug: string): Article | null {
  const filePath = path.join(ARTICLES_ROOT, locale, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readArticleFile(path.join(ARTICLES_ROOT, locale), `${slug}.md`);
}
