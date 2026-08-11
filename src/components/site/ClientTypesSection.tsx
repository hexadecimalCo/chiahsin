import { clientTypes } from "@/content/site-content";

export function ClientTypesSection() {
  return (
    <section id="about" className="bg-brand-cream py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-green">適合對象</p>
        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">我們熟悉的客戶類型</h2>

        <div className="mt-10 space-y-5">
          {clientTypes.map((client) => (
            <div key={client.title} className="rounded-lg bg-brand-mint p-6">
              <h3 className="mb-2 font-semibold text-brand-navy">{client.title}</h3>
              <p className="text-sm text-neutral-600">{client.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
