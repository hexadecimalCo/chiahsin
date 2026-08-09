"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { isRateLimited } from "@/lib/rate-limit";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(`login:${ip}`)) {
    return { error: "嘗試次數過多，請 15 分鐘後再試" };
  }

  if (!username || !password) {
    return { error: "請輸入帳號與密碼" };
  }

  const admin = await prisma.adminUser.findUnique({ where: { username } });
  if (!admin) {
    return { error: "帳號或密碼錯誤" };
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    return { error: "帳號或密碼錯誤" };
  }

  const session = await getSession();
  session.adminId = admin.id;
  session.adminUsername = admin.username;
  await session.save();

  redirect("/admin/articles");
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}
