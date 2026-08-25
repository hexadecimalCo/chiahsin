import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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
  const { eyebrow, title, intro, steps } = getGuideContent(locale);

  return (
    <div className="bg-brand-cream py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">{eyebrow}</p>
        <h1 className="text-2xl font-bold text-brand-navy md:text-3xl">{title}</h1>
        <p className="mt-4 text-sm text-neutral-600">{intro}</p>

        <ol className="mt-12 space-y-12">
          {steps.map((step) => (
            <li key={step.number} className="relative pl-12">
              <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold text-sm font-semibold text-brand-gold">
                {step.number}
              </span>
              <h2 className="pt-1 text-lg font-semibold text-brand-navy">{step.title}</h2>

              <div className="mt-4 space-y-4">
                {step.blocks.map((block, i) => {
                  if (block.type === "paragraph") {
                    if (block.linkText && block.href) {
                      const [before, after] = block.text.split(block.linkText);
                      return (
                        <p key={i} className="text-sm leading-relaxed text-neutral-600">
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
                      <p key={i} className="text-sm leading-relaxed text-neutral-600">
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "checklist") {
                    return (
                      <div key={i} className="rounded-lg border border-brand-gray-300 bg-white p-5">
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
                    <div key={i} className="rounded-lg border-l-4 border-brand-gold bg-white px-4 py-3">
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
      </div>
    </div>
  );
}
