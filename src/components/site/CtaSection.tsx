import { Link } from "@/i18n/navigation";
import { getSiteContent } from "@/content/site-content";
import type { Locale } from "@/i18n/routing";

export function CtaSection({ locale }: { locale: Locale }) {
  const { sectionHeaders } = getSiteContent(locale);

  return (
    <section className="bg-brand-cream py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">{sectionHeaders.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-brand-navy/70">
          {sectionHeaders.cta.subtitle}
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded bg-[#b08d4e] px-6 py-3 text-sm font-medium text-brand-navy transition hover:opacity-90"
        >
          {sectionHeaders.cta.cta}
        </Link>
      </div>
    </section>
  );
}
