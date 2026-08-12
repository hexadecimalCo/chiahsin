"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-xs text-white/70">
      {routing.locales.map((loc, i) => (
        <span key={loc}>
          {i > 0 && <span className="px-1 text-white/30">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={
              loc === locale
                ? "font-semibold text-brand-gold"
                : "transition hover:text-white"
            }
          >
            {t(loc)}
          </button>
        </span>
      ))}
    </div>
  );
}
