import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteContent } from "@/content/site-content";
import { routing, type Locale } from "@/i18n/routing";
import { ScrollProgressBar } from "@/components/site/ScrollProgressBar";
import { DecorativeCircles } from "@/components/site/DecorativeCircles";
import { RevealLines } from "@/components/site/RevealLines";
import { Marquee } from "@/components/site/Marquee";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { InstagramFeedSection } from "@/components/site/InstagramFeedSection";

// Presentational line-breaks of the existing hero title (site-content.ts),
// not new copy — same words, just chunked for the large multi-line reveal.
const HERO_TITLE_LINES: Record<Locale, string[]> = {
  zh: ["外商／僑外資", "來台設立的", "最佳夥伴"],
  en: ["Your Trusted Partner", "for Foreign Investment", "in Taiwan"],
  ja: ["外資・僑外資の", "台湾進出を支える", "ベストパートナー"],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const {
    heroContent,
    coreServices,
    article25Promo,
    processSteps,
    clientTypes,
    about,
    faqs,
    siteInfo,
    sectionHeaders,
  } = getSiteContent(locale);

  const marqueeItems = [...coreServices.map((s) => s.title), siteInfo.languages];

  return (
    <div className="animated-page">
      <ScrollProgressBar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24">
        <DecorativeCircles />
        <div className="relative z-10 mx-auto max-w-[1280px] px-11">
          <p className="preview-mono mb-6 text-xs font-bold tracking-[0.2em] text-brand-gold">
            {heroContent.eyebrow}
          </p>
          <RevealLines
            as="h1"
            className="preview-hero-title max-w-4xl font-medium leading-[1.05] tracking-[-0.045em] text-brand-navy"
            lines={HERO_TITLE_LINES[locale].map((text, i) => ({
              text,
              className: i === HERO_TITLE_LINES[locale].length - 1 ? "text-brand-gold" : undefined,
            }))}
          />
          <p className="mt-8 max-w-2xl text-lg" style={{ color: "var(--preview-text-secondary)" }}>
            {heroContent.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={heroContent.primaryCta.href}
              className="rounded-md bg-brand-navy-2 px-7 py-3.5 text-sm font-medium text-brand-on-dark transition hover:bg-brand-navy-hover"
            >
              {heroContent.primaryCta.label}
            </Link>
            <Link
              href={heroContent.secondaryCta.href}
              className="rounded-md border border-brand-navy/30 px-7 py-3.5 text-sm font-medium text-brand-navy transition hover:border-brand-navy/50"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-brand-gray-300 bg-brand-cream">
        <Marquee items={marqueeItems} />
      </div>

      {/* Core services */}
      <section id="services" className="scroll-mt-20 mx-auto max-w-[1280px] px-11 py-24">
        <p className="preview-mono mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">
          {sectionHeaders.services.eyebrow}
        </p>
        <h2 className="text-3xl font-medium tracking-[-0.03em] text-brand-navy sm:text-[46px]">
          {sectionHeaders.services.title}
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-500">{sectionHeaders.services.subtitle}</p>

        <div className="mt-14 divide-y divide-brand-gray-300">
          {coreServices.map((service) => (
            <div key={service.number} className="preview-service-grid py-10">
              <p
                className="preview-mono font-medium leading-none tracking-[-0.05em]"
                style={{ fontSize: "96px", color: "var(--preview-decorative-number)" }}
              >
                {service.number}
              </p>
              <div>
                <h3
                  className="font-medium tracking-[-0.03em] text-brand-navy"
                  style={{ fontSize: "44px" }}
                >
                  {service.title}
                </h3>
                <p className="mt-4 text-neutral-500" style={{ maxWidth: "620px" }}>
                  {service.description}
                </p>
              </div>
              <div className="preview-service-actions">
                <Link
                  href={service.href}
                  className="inline-block whitespace-nowrap rounded-full border border-brand-gold px-6 py-2.5 text-sm font-medium text-brand-gold transition hover:border-brand-gold-hover hover:text-brand-gold-hover"
                >
                  {service.linkLabel} →
                </Link>
              </div>
            </div>
          ))}

          <div className="preview-service-grid py-10">
            <p
              className="preview-mono font-medium leading-none tracking-[-0.05em]"
              style={{ fontSize: "96px", color: "var(--preview-decorative-number)" }}
            >
              05
            </p>
            <div>
              <p className="preview-mono text-xs font-semibold tracking-[0.12em] text-brand-gold">
                {article25Promo.eyebrow}
              </p>
              <h3
                className="mt-2 font-medium tracking-[-0.03em] text-brand-navy"
                style={{ fontSize: "44px" }}
              >
                {article25Promo.title}
              </h3>
              <p className="mt-4 text-neutral-500" style={{ maxWidth: "620px" }}>
                {article25Promo.description}
              </p>
            </div>
            <div className="preview-service-actions">
              <Link
                href={article25Promo.href}
                className="inline-block whitespace-nowrap rounded-full border border-brand-gold px-6 py-2.5 text-sm font-medium text-brand-gold transition hover:border-brand-gold-hover hover:text-brand-gold-hover"
              >
                {article25Promo.linkLabel} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-brand-cream py-24">
        <div className="mx-auto max-w-[1280px] px-11">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_460px]">
            <div>
              <p className="preview-mono mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">
                {sectionHeaders.about.eyebrow}
              </p>
              <h2 className="text-3xl font-medium tracking-[-0.03em] text-brand-navy sm:text-[46px]">
                {sectionHeaders.about.title}
              </h2>
              <p className="mt-6 text-lg font-medium text-brand-navy">{about.name}</p>
              <p className="mt-1 text-sm text-brand-navy/70">{about.role}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--preview-text-muted-on-cream)" }}>
                {about.languages}
              </p>
              <p className="mt-6 max-w-2xl leading-relaxed text-neutral-600">{about.bio}</p>

              <div className="mt-10 space-y-8">
                {about.credentialGroups.map((group) => (
                  <div key={group.label} className="preview-fade-up">
                    <p
                      className="preview-mono mb-2.5 text-xs font-semibold tracking-[0.12em]"
                      style={{ color: "var(--preview-text-muted-on-cream)" }}
                    >
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

            <div>
              <div
                className="preview-about-photo relative w-full max-w-[460px] overflow-hidden bg-background"
                style={{ height: "580px" }}
              >
                <Image
                  src="/hsu-chia-hsin.jpg"
                  alt={about.name}
                  fill
                  sizes="460px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup process */}
      <section className="mx-auto max-w-[1280px] px-11 py-24">
        <p className="preview-mono mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">
          {sectionHeaders.process.eyebrow}
        </p>
        <h2 className="text-3xl font-medium tracking-[-0.03em] text-brand-navy sm:text-[46px]">
          {sectionHeaders.process.title}
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-500">{sectionHeaders.process.subtitle}</p>

        <div className="proc-timeline mt-14">
          <div className="proc-track" aria-hidden="true">
            <div className="proc-track-fill" />
          </div>

          {processSteps.map((step, i) => (
            <div key={step.number} className={`proc-row proc-row-${i}`}>
              <span className="proc-dot" aria-hidden="true" />
              <div className="proc-row-grid">
                <p className="proc-number">{step.number}</p>
                <div>
                  <h3 className="proc-title">{step.title}</h3>
                  <div className="proc-progress-row" aria-hidden="true">
                    <div className="proc-progress-track">
                      <div
                        className="proc-progress-fill"
                        style={{ width: `${((i + 1) / processSteps.length) * 100}%` }}
                      />
                    </div>
                    <span className="proc-progress-label">
                      {i + 1} / {processSteps.length}
                    </span>
                  </div>
                </div>
                <p className="proc-duration">{step.duration}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/guide" className="text-sm font-medium text-brand-gold hover:underline">
            {sectionHeaders.process.cta} →
          </Link>
        </div>
      </section>

      {/* Client types */}
      <section className="mx-auto max-w-[1280px] px-11 py-24">
        <p className="preview-mono mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">
          {sectionHeaders.clientTypes.eyebrow}
        </p>
        <h2 className="text-3xl font-medium tracking-[-0.03em] text-brand-navy sm:text-[46px]">
          {sectionHeaders.clientTypes.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {clientTypes.map((client) => (
            <div key={client.title} className="preview-fade-up bg-brand-cream p-6">
              <h3 className="mb-2 font-medium text-brand-navy">{client.title}</h3>
              <p className="text-sm text-neutral-600">{client.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-cream py-24">
        <div className="mx-auto max-w-[1280px] px-11">
          <p className="preview-mono mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">
            {sectionHeaders.faq.eyebrow}
          </p>
          <h2 className="mb-10 text-3xl font-medium tracking-[-0.03em] text-brand-navy sm:text-[46px]">
            {sectionHeaders.faq.title}
          </h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1280px] px-11 py-28 text-center">
        <h2
          className="font-medium tracking-[-0.045em] text-brand-navy"
          style={{ fontSize: "clamp(32px, 6vw, 84px)" }}
        >
          {sectionHeaders.cta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-neutral-500">{sectionHeaders.cta.subtitle}</p>
        <Link
          href={heroContent.primaryCta.href}
          className="mt-8 inline-block rounded-md bg-brand-navy-2 px-8 py-4 text-sm font-medium text-brand-on-dark transition hover:bg-brand-navy-hover"
        >
          {sectionHeaders.cta.cta}
        </Link>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-brand-gray-300 pt-8 text-sm text-neutral-500">
          <span>{siteInfo.phone}</span>
          <span>{siteInfo.email}</span>
          <span>LINE {siteInfo.line}</span>
          <span>{siteInfo.address}</span>
        </div>
      </section>

      <InstagramFeedSection locale={locale} />
    </div>
  );
}
