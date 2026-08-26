import Image from "next/image";
import { getSiteContent } from "@/content/site-content";
import type { Locale } from "@/i18n/routing";

export function AboutSection({ locale }: { locale: Locale }) {
  const { about, sectionHeaders } = getSiteContent(locale);

  return (
    <section id="about" className="scroll-mt-20 bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">
          {sectionHeaders.about.eyebrow}
        </p>
        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">
          {sectionHeaders.about.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-14">
          <div>
            <div className="relative aspect-[2/3] w-full max-w-[280px] overflow-hidden rounded-lg bg-brand-cream">
              <Image
                src="/hsu-chia-hsin.jpg"
                alt={about.name}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-lg font-semibold text-brand-navy">{about.name}</p>
            <p className="mt-1 text-sm text-brand-navy/70">{about.role}</p>
            <p className="mt-3 text-[13px] text-neutral-500">{about.languages}</p>
          </div>

          <div>
            <p className="mb-8 max-w-2xl leading-relaxed text-neutral-600">{about.bio}</p>
            <div className="space-y-7">
              {about.credentialGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2.5 text-xs font-semibold tracking-[0.12em] text-brand-navy/50">
                    {group.label}
                  </p>
                  <ul className="space-y-1.5 text-sm leading-relaxed text-neutral-600">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
