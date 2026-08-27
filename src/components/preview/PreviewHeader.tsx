import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function PreviewHeader({
  locale,
  ctaLabel,
  ctaHref,
}: {
  locale: Locale;
  ctaLabel: string;
  ctaHref: string;
}) {
  const t = await getTranslations({ locale, namespace: "nav" });

  const navItems = [
    { href: "/preview/home", label: t("home") },
    { href: "/preview/home#services", label: t("services") },
    { href: "/preview/guide", label: t("guide") },
    { href: "/preview/home#about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="preview-header">
      <Link href="/preview/home" className="block">
        <Image src="/logo.png" alt="佾廷會計師事務所" width={570} height={147} priority className="h-8 w-auto" />
      </Link>

      <div className="flex items-center gap-7">
        <nav className="hidden gap-7 text-sm text-brand-navy/80 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brand-gold">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={ctaHref}
          className="rounded-md bg-brand-navy-2 px-5 py-2.5 text-sm font-medium text-brand-on-dark transition hover:bg-brand-navy-hover"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
