import { coreServices } from "@/content/site-content";

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20">
      <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">核心服務</p>
      <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">
        四大服務，涵蓋設立到營運的每一步
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-neutral-500">
        從公司登記到日常帳務，我們提供一站式服務，降低外商在台展業的行政負擔。
      </p>

      <div className="mt-10 space-y-6">
        {coreServices.map((service) => (
          <div
            key={service.number}
            className="rounded-lg border border-brand-gray-300 bg-white p-6"
          >
            <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold text-xs font-semibold text-brand-gold">
              {service.number}
            </span>
            <h3 className="mb-2 text-lg font-semibold text-brand-navy">{service.title}</h3>
            <p className="text-sm text-neutral-500">{service.description}</p>
            <a
              href="/contact"
              className="mt-4 inline-block text-sm font-medium text-brand-green hover:underline"
            >
              {service.linkLabel} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
