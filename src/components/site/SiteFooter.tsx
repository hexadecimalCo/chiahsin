import { useTranslations, useLocale } from "next-intl";
import { getSiteContent } from "@/content/site-content";
import type { Locale } from "@/i18n/routing";

export function SiteFooter() {
  const t = useTranslations("footer");
  const locale = useLocale() as Locale;
  const { siteInfo } = getSiteContent(locale);

  const items = [
    { label: t("phone"), value: siteInfo.phone },
    { label: t("email"), value: siteInfo.email },
    { label: t("line"), value: siteInfo.line },
  ];

  return (
    <footer className="bg-brand-navy py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-6">
          {items.map((item) => (
            <div key={item.label}>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-sm text-white/70">{item.value}</p>
            </div>
          ))}
        </div>
        {locale === "ja" && (
          <p className="mt-6 text-sm">
            <a
              href="https://chiahsin-jp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline"
            >
              日本語詳細サイト（chiahsin-jp.com）はこちら
            </a>
          </p>
        )}
        <p className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} {siteInfo.firmName}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
