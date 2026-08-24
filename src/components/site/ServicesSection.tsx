import { Link } from "@/i18n/navigation";
import { getSiteContent } from "@/content/site-content";
import type { Locale } from "@/i18n/routing";

export function ServicesSection({ locale }: { locale: Locale }) {
  const { coreServices, sectionHeaders } = getSiteContent(locale);

  return (
    <section id="services" className="scroll-mt-20 bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-green">
          {sectionHeaders.services.eyebrow}
        </p>
        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">
          {sectionHeaders.services.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-neutral-500">
          {sectionHeaders.services.subtitle}
        </p>

        <div className="mt-10 space-y-6">
          {coreServices.map((service) => (
            <div
              key={service.number}
              className="rounded-lg border border-brand-gray-300 bg-white p-6"
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-green text-xs font-semibold text-brand-green">
                {service.number}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-brand-navy">{service.title}</h3>
              <p className="text-sm text-neutral-500">{service.description}</p>
              <Link
                href={service.href}
                className="mt-4 inline-block text-sm font-medium text-brand-green hover:underline"
              >
                {service.linkLabel} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
