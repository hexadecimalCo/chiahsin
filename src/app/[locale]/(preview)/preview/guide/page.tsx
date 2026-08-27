import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getGuideContent } from "@/content/guide-content";
import { getSiteContent } from "@/content/site-content";
import { routing, type Locale } from "@/i18n/routing";
import { PreviewHeader } from "@/components/preview/PreviewHeader";
import { ScrollProgressBar } from "@/components/preview/ScrollProgressBar";
import { DecorativeCircles } from "@/components/preview/DecorativeCircles";
import { RevealLines } from "@/components/preview/RevealLines";

// Presentational line-breaks of the existing guide title (guide-content.ts),
// not new copy — same words, just chunked for the large multi-line reveal.
const GUIDE_TITLE_LINES: Record<Locale, string[]> = {
  zh: ["僑外資公司", "設立說明"],
  en: ["Foreign-Invested Company", "Formation Guide"],
  ja: ["僑外資（外国人・華僑）企業の", "設立ガイド"],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { title } = getGuideContent(locale);
  return {
    title: `[Preview] ${title}`,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewGuidePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { eyebrow, intro, steps, closingCta } = getGuideContent(locale);
  const { heroContent, siteInfo } = getSiteContent(locale);

  return (
    <>
      <ScrollProgressBar />
      <PreviewHeader locale={locale} ctaLabel={heroContent.primaryCta.label} ctaHref={heroContent.primaryCta.href} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-20">
        <DecorativeCircles />
        <div className="relative z-10 mx-auto max-w-[1280px] px-11">
          <p className="preview-mono mb-6 text-xs font-bold tracking-[0.2em] text-brand-gold">
            {eyebrow}
          </p>
          <RevealLines
            as="h1"
            className="preview-guide-title max-w-4xl font-medium leading-[1.1] tracking-[-0.045em] text-brand-navy"
            lines={GUIDE_TITLE_LINES[locale].map((text, i) => ({
              text,
              className: i === GUIDE_TITLE_LINES[locale].length - 1 ? "text-brand-gold" : undefined,
            }))}
          />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--preview-text-secondary)" }}>
            {intro}
          </p>
        </div>
      </section>

      {/* Stage jump band */}
      <div className="border-y border-brand-gray-300 bg-brand-cream">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-px bg-brand-gray-300 px-11 sm:grid-cols-3 sm:gap-px sm:px-0">
          {steps.map((step) => (
            <a
              key={step.number}
              href={`#step-${step.number}`}
              className="block bg-brand-cream px-8 py-6 transition hover:bg-background"
            >
              <p className="preview-mono font-medium tracking-[-0.05em] text-xs text-brand-gold">
                {step.number.padStart(2, "0")}
              </p>
              <p className="mt-2 text-[15px] font-medium text-brand-navy">{step.shortTitle}</p>
              <p className="mt-1 text-[13px]" style={{ color: "var(--preview-text-muted-on-cream)" }}>
                {step.duration}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="mx-auto max-w-[1280px] px-11 py-24">
        {steps.map((step) => (
          <div
            key={step.number}
            id={`step-${step.number}`}
            className="preview-guide-grid grid grid-cols-1 gap-10 py-16 first:pt-0 sm:grid-cols-[300px_1fr]"
            style={{ scrollMarginTop: "70px" }}
          >
            <div className="preview-guide-step-left">
              <div className="preview-guide-step-sticky">
                <p
                  className="preview-mono font-medium leading-none tracking-[-0.05em]"
                  style={{ fontSize: "132px", color: "var(--preview-decorative-number)" }}
                >
                  {step.number}
                </p>
                <h2
                  className="mt-2 font-medium tracking-[-0.03em] text-brand-navy"
                  style={{ fontSize: "30px" }}
                >
                  {step.title}
                </h2>
                <span className="mt-4 inline-block rounded-full bg-brand-cream px-3 py-1 text-xs text-brand-navy/70">
                  {step.duration}
                </span>
              </div>
            </div>

            <div className="relative pl-10">
              <div
                className="preview-guide-line absolute left-0 top-1 bottom-0 w-px bg-brand-gray-400"
                aria-hidden="true"
              />
              <div className="grid gap-6">
                {step.blocks.map((block, i) => {
                  if (block.type === "paragraph") {
                    if (block.linkText && block.href) {
                      const [before, after] = block.text.split(block.linkText);
                      return (
                        <p
                          key={i}
                          className="preview-fade-up leading-[2.05]"
                          style={{ fontSize: "17px", color: "var(--preview-text-secondary)" }}
                        >
                          {before}
                          <a
                            href={block.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-brand-gold hover:underline"
                          >
                            {block.linkText}
                          </a>
                          {after}
                        </p>
                      );
                    }
                    return (
                      <p
                        key={i}
                        className="preview-fade-up leading-[2.05]"
                        style={{ fontSize: "17px", color: "var(--preview-text-secondary)" }}
                      >
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "checklist") {
                    return (
                      <div key={i} className="preview-fade-up bg-brand-cream px-9 py-8">
                        <p className="mb-4 text-sm font-medium text-brand-navy">{block.title}</p>
                        <ul className="space-y-3">
                          {block.items.map((item, itemIndex) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 border-t border-brand-gray-300 pt-3 text-[15px] text-neutral-600"
                            >
                              <span className="preview-mono mt-0.5 flex-none text-brand-gold">
                                {String(itemIndex + 1).padStart(2, "0")}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className="preview-fade-up border-l-2 border-brand-gold pl-6">
                      <p className="text-[15px] text-neutral-600">{block.text}</p>
                      {block.href && (
                        <a
                          href={block.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-block text-[15px] font-medium text-brand-gold hover:underline"
                        >
                          {block.linkLabel} →
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Closing CTA */}
      <section className="bg-brand-cream py-20">
        <div className="mx-auto max-w-[1280px] px-11">
          <h2
            className="font-medium tracking-[-0.045em] text-brand-navy"
            style={{ fontSize: "clamp(28px, 5vw, 46px)" }}
          >
            {closingCta.text}
          </h2>
          <div className="mt-8 flex justify-end">
            <Link
              href={closingCta.href}
              className="inline-block flex-none rounded-md bg-brand-navy-2 px-8 py-4 text-sm font-medium text-brand-on-dark transition hover:bg-brand-navy-hover"
            >
              {closingCta.label}
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-brand-gray-300 pt-8 text-sm text-neutral-500">
            <span>{siteInfo.phone}</span>
            <span>{siteInfo.email}</span>
            <span>LINE {siteInfo.line}</span>
          </div>
        </div>
      </section>
    </>
  );
}
