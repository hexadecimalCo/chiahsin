"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContactAction, type ContactState } from "@/lib/actions/contact-action";
import { getSiteContent } from "@/content/site-content";
import type { Locale } from "@/i18n/routing";

const initialState: ContactState = {};

export function ContactSection({ locale }: { locale: Locale }) {
  const t = useTranslations("contactForm");
  const tFooter = useTranslations("footer");
  const { siteInfo } = getSiteContent(locale);
  const serviceOptions = t.raw("serviceOptions") as string[];
  const [state, formAction, pending] = useActionState(submitContactAction, initialState);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteInfo.address)}&output=embed`;

  return (
    <section id="contact" className="mx-auto grid max-w-[1000px] gap-14 px-6 py-20 md:grid-cols-[1fr_300px]">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-brand-navy md:text-3xl">{t("title")}</h1>
        <p className="mb-8 text-sm leading-relaxed text-neutral-500">{t("intro")}</p>

        <form action={formAction} className="space-y-4">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-navy" htmlFor="company">
                {t("company")}
              </label>
              <input
                id="company"
                name="company"
                className="w-full rounded border border-brand-gray-300 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-navy" htmlFor="region">
                {t("region")}
              </label>
              <input
                id="region"
                name="region"
                className="w-full rounded border border-brand-gray-300 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-navy" htmlFor="service">
              {t("service")}
            </label>
            <select
              id="service"
              name="service"
              defaultValue=""
              className="w-full rounded border border-brand-gray-300 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
            >
              <option value="" disabled>
                {t("service")}
              </option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-navy" htmlFor="name">
              {t("name")}
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded border border-brand-gray-300 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-navy" htmlFor="email">
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded border border-brand-gray-300 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-navy" htmlFor="message">
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full rounded border border-brand-gray-300 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          {state.message && (
            <p className={state.status === "success" ? "text-sm text-green-600" : "text-sm text-red-600"}>
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded bg-brand-navy-2 px-4 py-2.5 text-sm font-medium text-brand-on-dark transition hover:bg-brand-navy-hover disabled:opacity-50"
          >
            {pending ? t("submitting") : t("submit")}
          </button>
          <p className="text-xs text-brand-navy/50">{t("consent")}</p>
        </form>
      </div>

      <aside className="border-l border-brand-gray-300 pl-8">
        <p className="mb-5 text-xs font-semibold tracking-[0.12em] text-brand-navy/50">
          {t("officeInfoTitle")}
        </p>
        <div className="grid gap-[18px] text-sm leading-relaxed">
          <div>
            <p className="font-semibold text-brand-navy">{tFooter("phone")}</p>
            <p className="mt-0.5 text-neutral-600">{siteInfo.phone}</p>
          </div>
          <div>
            <p className="font-semibold text-brand-navy">{tFooter("email")}</p>
            <p className="mt-0.5 text-neutral-600">{siteInfo.email}</p>
          </div>
          <div>
            <p className="font-semibold text-brand-navy">{tFooter("line")}</p>
            <p className="mt-0.5 text-neutral-600">{siteInfo.line}</p>
          </div>
          <div>
            <p className="font-semibold text-brand-navy">{t("addressLabel")}</p>
            <p className="mt-0.5 text-neutral-600">{siteInfo.address}</p>
          </div>
          <div>
            <p className="font-semibold text-brand-navy">{t("hoursLabel")}</p>
            <p className="mt-0.5 text-neutral-600">{siteInfo.hours}</p>
          </div>
          <div>
            <p className="font-semibold text-brand-navy">{t("languagesLabel")}</p>
            <p className="mt-0.5 text-neutral-600">{siteInfo.languages}</p>
          </div>
        </div>

        <div className="mt-6 aspect-[4/3] overflow-hidden rounded-lg border border-brand-gray-300">
          <iframe
            src={mapSrc}
            title={siteInfo.address}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </aside>
    </section>
  );
}
