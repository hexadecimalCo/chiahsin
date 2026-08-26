"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { getSiteContent } from "@/content/site-content";
import { routing, type Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tMobile = useTranslations("mobileMenu");
  const tFooter = useTranslations("footer");
  const tLang = useTranslations("languageSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { heroContent, siteInfo } = getSiteContent(locale);
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/#services", label: t("services") },
    { href: "/guide", label: t("guide") },
    { href: "/#about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-gray-300 bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="block" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="佾廷會計師事務所"
            width={570}
            height={147}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <nav className="flex gap-7 text-sm text-brand-navy/80">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-brand-gold">
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={tMobile(open ? "close" : "open")}
            className="rounded border border-brand-gray-300 px-2.5 py-1.5 text-xs text-brand-navy/70"
          >
            {tLang(locale)}
          </button>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={tMobile(open ? "close" : "open")}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-md"
          >
            {open ? (
              <span className="text-xl leading-none text-brand-navy">×</span>
            ) : (
              <>
                <span className="block h-[1.5px] w-5 bg-brand-navy" />
                <span className="block h-[1.5px] w-5 bg-brand-navy" />
                <span className="block h-[1.5px] w-5 bg-brand-navy" />
              </>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-gray-300 bg-background px-6 pb-6 pt-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[52px] items-center justify-between border-b border-brand-gray-300 text-base text-brand-navy last:border-b-0"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-5 flex gap-2">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.replace(pathname, { locale: loc });
                }}
                className={
                  loc === locale
                    ? "flex-1 rounded-md border border-brand-navy px-2.5 py-2.5 text-center text-[13px] font-medium text-brand-navy"
                    : "flex-1 rounded-md border border-brand-gray-300 px-2.5 py-2.5 text-center text-[13px] text-brand-navy/70"
                }
              >
                {tLang(loc)}
              </button>
            ))}
          </div>

          <Link
            href={heroContent.primaryCta.href}
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-md bg-brand-navy-2 py-3.5 text-center text-[15px] font-medium text-brand-on-dark transition hover:bg-brand-navy-hover"
          >
            {heroContent.primaryCta.label}
          </Link>
          <p className="mt-4 text-[13px] leading-relaxed text-neutral-500">
            {tFooter("phone")} {siteInfo.phone}　{tFooter("line")} {siteInfo.line}
          </p>
        </nav>
      )}
    </header>
  );
}
