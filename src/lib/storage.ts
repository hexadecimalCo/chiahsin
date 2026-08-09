import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

export class UploadError extends Error {}

export async function saveArticleImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new UploadError("僅支援 JPEG / PNG / WebP / GIF 圖片");
  }
  if (file.size > MAX_BYTES) {
    throw new UploadError("圖片大小不可超過 5MB");
  }

  const ext = file.type.split("/")[1];
  const filename = `${crypto.randomUUID()}.${ext}`;

  // Vercel's serverless filesystem is read-only/ephemeral, so production must use
  // Blob storage. Locally (no token yet) we fall back to writing into /public so
  // the whole upload flow can be tested end-to-end before a Blob store is set up.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`articles/${filename}`, file, { access: "public" });
    return blob.url;
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}
