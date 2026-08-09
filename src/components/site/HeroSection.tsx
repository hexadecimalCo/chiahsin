import { heroContent } from "@/content/site-content";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-[#24334f] to-[#111a30]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-brand-gold">
          {heroContent.eyebrow}
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl">
          {heroContent.title}
        </h1>
        <p className="mt-5 max-w-2xl text-white/70">{heroContent.subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={heroContent.primaryCta.href}
            className="rounded bg-brand-gold px-6 py-3 text-sm font-medium text-brand-navy transition hover:bg-brand-gold-hover"
          >
            {heroContent.primaryCta.label}
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="rounded border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white/60"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
