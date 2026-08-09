import Link from "next/link";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "#services", label: "服務項目" },
  { href: "/blog", label: "外商來台指南" },
  { href: "#about", label: "關於我們" },
  { href: "/contact", label: "聯絡我們" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-brand-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-base font-semibold tracking-wide text-brand-gold">
          佾廷會計師事務所
        </Link>
        <nav className="hidden gap-7 text-sm text-white/80 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-brand-gold">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
