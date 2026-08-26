"use server";

import { Resend } from "resend";
import { z } from "zod";
import { headers } from "next/headers";
import { isRateLimited } from "@/lib/rate-limit";

const contactSchema = z.object({
  company: z.string().trim().max(200).optional(),
  region: z.string().trim().max(100).optional(),
  service: z.string().trim().max(100).optional(),
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
    company: formData.get("company"),
    region: formData.get("region"),
    service: formData.get("service"),
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    honeypot: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: "請確認欄位是否填寫正確" };
  }

  const { company, region, service, name, email, message } = parsed.data;
  const fallback = (value: string | undefined) => (value ? value : "（未提供）");

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
    subject: `[官網聯絡表單] ${company || name}`,
    text: `公司名稱：${fallback(company)}\n公司所在國家／地區：${fallback(region)}\n想諮詢的服務：${fallback(service)}\n姓名：${name}\nEmail：${email}\n\n訊息：\n${message}`,
  });

  return { status: "success", message: "訊息已送出，我們會盡快與您聯繫" };
}
