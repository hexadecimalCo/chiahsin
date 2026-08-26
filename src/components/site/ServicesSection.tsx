import { Link } from "@/i18n/navigation";
import { getSiteContent } from "@/content/site-content";
import type { Locale } from "@/i18n/routing";

export function ServicesSection({ locale }: { locale: Locale }) {
  const { coreServices, article25Promo, renewableNote, sectionHeaders } = getSiteContent(locale);

  return (
    <section id="services" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">
          {sectionHeaders.services.eyebrow}
        </p>
        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">
          {sectionHeaders.services.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-neutral-500">
          {sectionHeaders.services.subtitle}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {coreServices.map((service) => (
            <div
              key={service.number}
              className="rounded-lg border border-brand-gray-300 bg-brand-cream p-6"
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold text-xs font-semibold text-brand-gold">
                {service.number}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-brand-navy">{service.title}</h3>
              <p className="text-sm text-neutral-500">{service.description}</p>
              <Link
                href={service.href}
                className="mt-4 inline-block text-sm font-medium text-brand-gold hover:underline"
              >
                {service.linkLabel} →
              </Link>
            </div>
          ))}
        </div>

        <Link
          href={article25Promo.href}
          className="mt-5 flex flex-wrap items-center justify-between gap-5 rounded-lg border border-brand-gold bg-background px-7 py-6"
        >
          <div>
            <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold text-xs font-semibold text-brand-gold">
              05
            </span>
            <p className="text-xs font-semibold tracking-[0.12em] text-brand-gold">
              {article25Promo.eyebrow}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-brand-navy">{article25Promo.title}</h3>
            <p className="mt-1.5 text-sm text-neutral-500">{article25Promo.description}</p>
          </div>
          <span className="flex-none text-sm font-medium text-brand-gold">
            {article25Promo.linkLabel} →
          </span>
        </Link>

        <div className="mt-5 rounded-lg border border-dashed border-brand-gray-300 bg-brand-cream p-6">
          <p className="text-sm text-neutral-500">{renewableNote}</p>
        </div>
      </div>
    </section>
  );
}
