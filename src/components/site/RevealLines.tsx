type RevealLinesProps = {
  lines: Array<{ text: string; className?: string }>;
  as?: "h1" | "h2";
  className?: string;
  lineClassName?: string;
};

export function RevealLines({ lines, as = "h1", className, lineClassName }: RevealLinesProps) {
  const Tag = as;
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`preview-reveal-line ${lineClassName ?? ""}`}>
          <span
            className={`preview-reveal-inner ${line.className ?? ""}`}
            style={{ "--preview-reveal-delay": `${i * 120}ms` } as React.CSSProperties}
          >
            {line.text}
          </span>
        </span>
      ))}
    </Tag>
  );
}
