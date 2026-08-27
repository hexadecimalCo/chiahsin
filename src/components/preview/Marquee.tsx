export function Marquee({ items }: { items: string[] }) {
  const group = (duplicate: boolean) => (
    <div
      className="preview-marquee-group"
      data-marquee-duplicate={duplicate ? "true" : "false"}
      aria-hidden={duplicate}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="mx-6 inline-flex items-center gap-6 tracking-[0.2em]"
          style={{ fontSize: "15px", color: "var(--preview-text-muted-on-cream)" }}
        >
          <span>{item}</span>
          <span aria-hidden="true" className="text-brand-gold">
            /
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="preview-marquee py-4">
      <div className="preview-marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
