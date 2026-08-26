import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getGuideContent } from "@/content/guide-content";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { title, intro } = getGuideContent(locale);
  return { title, description: intro };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { eyebrow, title, intro, steps, closingCta } = getGuideContent(locale);

  return (
    <div className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">{eyebrow}</p>
        <h1 className="text-2xl font-bold text-brand-navy md:text-3xl">{title}</h1>
        <p className="mt-4 text-[15px] leading-loose text-neutral-600">{intro}</p>

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-brand-gray-300 bg-brand-gray-300 sm:grid-cols-3">
          {steps.map((step) => (
            <a
              key={step.number}
              href={`#step-${step.number}`}
              className="block bg-brand-cream p-5"
            >
              <p className="font-mono text-xs text-brand-gold">STEP {step.number}</p>
              <p className="mt-2 text-[15px] font-semibold text-brand-navy">{step.shortTitle}</p>
              <p className="mt-1 text-[13px] text-brand-navy/70">{step.duration}</p>
            </a>
          ))}
        </div>

        <ol className="mt-14 space-y-12">
          {steps.map((step) => (
            <li key={step.number} id={`step-${step.number}`} className="relative scroll-mt-24 pl-12">
              <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold text-sm font-semibold text-brand-gold">
                {step.number}
              </span>
              <div className="flex flex-wrap items-baseline gap-3 pt-1">
                <h2 className="text-lg font-semibold text-brand-navy">{step.title}</h2>
                <span className="rounded-full bg-brand-cream px-2.5 py-[3px] text-xs text-brand-navy/70">
                  {step.duration}
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {step.blocks.map((block, i) => {
                  if (block.type === "paragraph") {
                    if (block.linkText && block.href) {
                      const [before, after] = block.text.split(block.linkText);
                      return (
                        <p key={i} className="text-[15px] leading-loose text-neutral-600">
                          {before}
                          <a
                            href={block.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-brand-gold hover:underline"
                          >
                            {block.linkText}
                          </a>
                          {after}
                        </p>
                      );
                    }

                    return (
                      <p key={i} className="text-[15px] leading-loose text-neutral-600">
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "checklist") {
                    return (
                      <div key={i} className="rounded-lg border border-brand-gray-300 bg-brand-cream p-5">
                        <p className="mb-3 text-sm font-semibold text-brand-navy">{block.title}</p>
                        <ul className="space-y-2">
                          {block.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                              <span className="mt-0.5 text-brand-gold" aria-hidden="true">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className="rounded-lg border-l-4 border-brand-gold bg-background px-4 py-3">
                      <p className="text-sm text-neutral-600">{block.text}</p>
                      {block.href && (
                        <a
                          href={block.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm font-medium text-brand-gold hover:underline"
                        >
                          {block.linkLabel} →
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 rounded-lg bg-brand-cream px-8 py-7">
          <p className="max-w-[560px] leading-relaxed text-brand-navy">{closingCta.text}</p>
          <Link
            href={closingCta.href}
            className="flex-none rounded-md bg-brand-navy-2 px-6 py-3 text-sm font-medium text-brand-on-dark transition hover:bg-brand-navy-hover"
          >
            {closingCta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
