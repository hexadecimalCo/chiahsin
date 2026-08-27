"use client";

import { useState } from "react";

type Faq = {
  question: string;
  answer: Array<{ text: string; linkText?: string; href?: string }>;
};

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-brand-gray-300">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="preview-fade-up">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center gap-5 py-6 text-left"
            >
              <span className="preview-mono flex-none text-xs text-brand-navy/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-medium text-brand-navy">{faq.question}</span>
              <span className="shrink-0 text-neutral-400">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="ml-9 space-y-3 pb-6 text-sm text-neutral-500">
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
  );
}
