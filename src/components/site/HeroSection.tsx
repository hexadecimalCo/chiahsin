import { heroContent } from "@/content/site-content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b bg-[#1d2c42]">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute -right-36 -top-24 h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="absolute -right-10 top-16 h-[280px] w-[280px] rounded-full border border-white/20" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#D2C192]">
          {heroContent.eyebrow}
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl">
          {heroContent.title}
        </h1>
        <p className="mt-5 max-w-2xl text-white/70">{heroContent.subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={heroContent.primaryCta.href}
            className="rounded-md bg-[#b08d4e] px-6 py-3 text-sm font-medium text-brand-navy transition hover:opacity-90"
          >
            {heroContent.primaryCta.label}
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="rounded-md border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:border-white/60"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
