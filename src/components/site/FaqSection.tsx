"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs } from "@/content/site-content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-brand-cream py-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-green">常見問題</p>
        <h2 className="mb-10 text-2xl font-bold text-brand-navy md:text-3xl">
          外商最常問的五個問題
        </h2>

        <div className="divide-y divide-brand-gray-300">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full flex-col items-start py-6 text-left"
                >
                  <span className="font-medium text-brand-navy">{faq.question}</span>
                  <span className="mt-2 text-neutral-400">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="pb-6 text-sm text-neutral-500">{faq.answer}</p>}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-brand-gray-300 bg-white p-6">
          <p className="max-w-xl text-sm text-neutral-500">
            除了外商設立服務，本所也深耕再生能源產業會計多年，具備太陽光電廠設立、售電及稅務相關實務經驗。
          </p>
          <Link
            href="/blog"
            className="text-sm font-medium text-brand-green hover:underline"
          >
            了解更多 →
          </Link>
        </div>
      </div>
    </section>
  );
}
