"use client";

import { useActionState } from "react";
import { submitContactAction, type ContactState } from "@/lib/actions/contact-action";

const initialState: ContactState = {};

export function ContactSection() {
  const [state, formAction, pending] = useActionState(submitContactAction, initialState);

  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-20">
      <h2 className="mb-10 text-center text-2xl font-bold text-brand-navy md:text-3xl">
        聯絡我們
      </h2>
      <form action={formAction} className="space-y-4">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-navy" htmlFor="name">
            Name
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
            Email
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
            訊息
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
          className="w-full rounded bg-[#b08d4e] px-4 py-2.5 text-sm font-medium text-brand-navy transition hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "送出中…" : "Submit"}
        </button>
      </form>
    </section>
  );
}
