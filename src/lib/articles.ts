import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");

export type Article = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: Date;
  updatedAt: Date;
  contentHtml: string;
};

function readArticleFile(filename: string): Article {
  const filePath = path.join(ARTICLES_DIR, filename);
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

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readArticleFile)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readArticleFile(`${slug}.md`);
}
