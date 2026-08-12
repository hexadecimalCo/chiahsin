import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <p className="mb-2 text-sm font-medium text-slate-400">404</p>
      <h1 className="mb-4 text-2xl font-bold text-slate-900">{t("title")}</h1>
      <p className="mb-8 text-slate-500">{t("description")}</p>
      <Link
        href="/"
        className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
