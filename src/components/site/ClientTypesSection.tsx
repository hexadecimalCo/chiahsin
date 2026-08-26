import { getSiteContent } from "@/content/site-content";
import type { Locale } from "@/i18n/routing";

export function ClientTypesSection({ locale }: { locale: Locale }) {
  const { clientTypes, sectionHeaders } = getSiteContent(locale);

  return (
    <section id="clients" className="scroll-mt-20 bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">
          {sectionHeaders.clientTypes.eyebrow}
        </p>
        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">
          {sectionHeaders.clientTypes.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {clientTypes.map((client) => (
            <div key={client.title} className="rounded-lg bg-brand-cream p-6">
              <h3 className="mb-2 font-semibold text-brand-navy">{client.title}</h3>
              <p className="text-sm text-neutral-600">{client.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
