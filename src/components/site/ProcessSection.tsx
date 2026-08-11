import { processSteps } from "@/content/site-content";

export function ProcessSection() {
  return (
    <section id="process" className="bg-brand-navy py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-brand-gold">設立流程</p>
        <h2 className="text-2xl font-bold text-white md:text-3xl">從決定到營運，五個階段</h2>
        <p className="mt-3 max-w-2xl text-sm text-white/70">
          一般約需 1-2 個月，實際時程依產業別與文件備齊速度而有所不同。
        </p>

        <div className="relative mt-16">
          <div className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-white/15 sm:block" />
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-5 sm:gap-0">
            {processSteps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <span className="relative z-10 mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#b08d4e] text-sm font-semibold text-brand-navy">
                  {step.number}
                </span>
                <h3 className="mb-1 text-sm font-semibold text-white">{step.title}</h3>
                <p className="text-xs text-white/60">{step.duration}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-block rounded bg-[#b08d4e] px-6 py-3 text-sm font-medium text-brand-navy transition hover:opacity-90"
          >
            查看完整流程
          </a>
        </div>
      </div>
    </section>
  );
}
