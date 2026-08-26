"use client";

import { useState } from "react";
import { getSiteContent } from "@/content/site-content";
import { getFaqPageSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

export function FaqSection({ locale }: { locale: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faqs, sectionHeaders } = getSiteContent(locale);
  const faqPageSchema = getFaqPageSchema(locale);

  return (
    <section className="bg-background py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">
          {sectionHeaders.faq.eyebrow}
        </p>
        <h2 className="mb-10 text-2xl font-bold text-brand-navy md:text-3xl">
          {sectionHeaders.faq.title}
        </h2>

        <div className="divide-y divide-brand-gray-300">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-medium text-brand-navy">{faq.question}</span>
                  <span className="shrink-0 text-neutral-400">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="space-y-3 pb-6 text-sm text-neutral-500">
                    {faq.answer.map((paragraph, paragraphIndex) => {
                      if (paragraph.linkText && paragraph.href) {
                        const [before, after] = paragraph.text.split(paragraph.linkText);
                        return (
                          <p key={paragraphIndex}>
                            {before}
                            <a
                              href={paragraph.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-gold underline hover:no-underline"
                            >
                              {paragraph.linkText}
                            </a>
                            {after}
                          </p>
                        );
                      }
                      return <p key={paragraphIndex}>{paragraph.text}</p>;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
