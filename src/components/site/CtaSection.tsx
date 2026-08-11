export function CtaSection() {
  return (
    <section className="bg-brand-navy-2 py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          準備好在台灣展開事業了嗎？
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
          不論您是剛開始接觸台灣市場，或已準備好啟動設立流程，歡迎與我們聯繫，我們將竭誠為您提供協助。
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block rounded bg-[#b08d4e] px-6 py-3 text-sm font-medium text-brand-navy transition hover:opacity-90"
        >
          預約諮詢
        </a>
      </div>
    </section>
  );
}
