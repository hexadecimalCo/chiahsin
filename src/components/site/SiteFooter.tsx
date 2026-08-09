import { siteInfo } from "@/content/site-content";

export function SiteFooter() {
  const items = [
    { label: "電話", value: siteInfo.phone },
    { label: "Email", value: siteInfo.email },
    { label: "LINE", value: siteInfo.line },
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
        <p className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} {siteInfo.firmName}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
