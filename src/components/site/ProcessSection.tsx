import { processSteps } from "@/content/site-content";

export function ProcessSection() {
  return (
    <section id="process" className="border-t border-brand-gray-200 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">設立流程</p>
        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">從決定到營運，五個階段</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-500">
          一般約需 1-2 個月，實際時程依審查與文件備齊度而有所不同。
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-5">
          {processSteps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-sm font-semibold text-brand-navy">
                {step.number}
              </span>
              <h3 className="mb-1 text-sm font-semibold text-brand-navy">{step.title}</h3>
              <p className="text-xs text-neutral-500">{step.duration}</p>
            </div>
          ))}
        </div>

        <a
          href="/contact"
          className="mt-12 inline-block rounded bg-brand-gold px-6 py-3 text-sm font-medium text-brand-navy transition hover:bg-brand-gold-hover"
        >
          查看完整流程
        </a>
      </div>
    </section>
  );
}
