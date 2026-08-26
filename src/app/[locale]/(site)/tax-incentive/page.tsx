import type { Metadata } from "next";
import { marked } from "marked";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getTaxIncentiveContent } from "@/content/tax-incentive-content";
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
  const { title } = getTaxIncentiveContent(locale);
  return { title };
}

export default async function TaxIncentivePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const {
    eyebrow,
    title,
    lead,
    stats,
    caseStudiesTitle,
    cases,
    caseFieldLabels,
    servicesTitle,
    services,
    whoForTitle,
    whoFor,
    disclaimer,
    bodyMarkdown,
    ctaNote,
    cta,
  } = getTaxIncentiveContent(locale);
  const bodyHtml = marked.parse(bodyMarkdown, { async: false });

  return (
    <div className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-[720px]">
          <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">{eyebrow}</p>
          <h1 className="text-3xl font-bold leading-snug text-brand-navy md:text-[34px]">{title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-neutral-600">{lead}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-brand-gray-300 bg-brand-gray-300 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="bg-brand-cream p-6">
              <p className="text-[34px] font-bold tracking-tight text-brand-navy">{stat.value}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-brand-navy/70">{stat.label}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-5 mt-14 text-xl font-bold text-brand-navy">{caseStudiesTitle}</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cases.map((item) => (
            <div key={item.code} className="rounded-lg border border-brand-gray-300 p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold tracking-[0.12em] text-brand-navy/50">
                  <span className="font-mono">{item.code}</span>　{item.region}
                </p>
                <span className="rounded-full bg-brand-cream px-2.5 py-1 text-xs font-semibold text-brand-gold">
                  {item.result}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-brand-navy">{item.service}</h3>
              <dl className="mt-4 grid gap-2.5 text-sm">
                <div className="flex gap-3">
                  <dt className="w-[76px] flex-none text-brand-navy/50">{caseFieldLabels.basis}</dt>
                  <dd className="text-neutral-600">{item.basis}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-[76px] flex-none text-brand-navy/50">{caseFieldLabels.incomeType}</dt>
                  <dd className="text-neutral-600">{item.incomeType}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold text-brand-navy">{servicesTitle}</h2>
            <ul className="grid gap-2.5 text-[15px] leading-relaxed text-neutral-600">
              {services.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="text-brand-gold" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-brand-navy">{whoForTitle}</h2>
            <ul className="grid gap-2.5 text-[15px] leading-relaxed text-neutral-600">
              {whoFor.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="text-brand-gold" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-brand-navy/50">{disclaimer}</p>
          </div>
        </div>

        <div
          className="prose prose-slate mt-14 max-w-[720px] prose-headings:text-brand-navy prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-navy"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 rounded-lg bg-brand-cream px-8 py-7">
          <p className="max-w-[520px] leading-relaxed text-brand-navy">{ctaNote}</p>
          <Link
            href={cta.href}
            className="flex-none rounded-md bg-brand-navy-2 px-6 py-3 text-sm font-medium text-brand-on-dark transition hover:bg-brand-navy-hover"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
