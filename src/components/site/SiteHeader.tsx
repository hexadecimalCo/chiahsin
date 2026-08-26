import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader() {
  const t = useTranslations("nav");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/#services", label: t("services") },
    { href: "/guide", label: t("guide") },
    { href: "/#about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-gray-300 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="block">
          <Image
            src="/logo.png"
            alt="佾廷會計師事務所"
            width={570}
            height={147}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <div className="flex items-center gap-7">
          <nav className="hidden gap-7 text-sm text-brand-navy/80 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-brand-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
