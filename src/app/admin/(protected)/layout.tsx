import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth-actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin/articles" className="font-semibold text-slate-900">
            佾廷會計師事務所・後台管理
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-slate-500 transition hover:text-slate-900"
            >
              登出
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
    </div>
  );
}
