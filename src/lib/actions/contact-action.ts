"use server";

import { Resend } from "resend";
import { z } from "zod";
import { headers } from "next/headers";
import { isRateLimited } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  message: z.string().trim().min(1).max(2000),
  honeypot: z.string().max(0), // hidden field — real users leave it empty, bots fill it in
});

export interface ContactState {
  status?: "success" | "error";
  message?: string;
}

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(`contact:${ip}`)) {
    return { status: "error", message: "送出次數過多，請稍後再試" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    honeypot: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: "請確認欄位是否填寫正確" };
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.warn("RESEND_API_KEY / CONTACT_TO_EMAIL not set — contact form email skipped");
    return { status: "error", message: "表單服務尚未設定，請直接來信聯繫" };
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "官網聯絡表單 <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `[官網聯絡表單] ${name}`,
    text: message,
  });

  return { status: "success", message: "訊息已送出，我們會盡快與您聯繫" };
}
