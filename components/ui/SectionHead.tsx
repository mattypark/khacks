import type { ReactNode } from "react";

type SectionHeadProps = {
  /** Two-digit index rendered as a monospace marker, e.g. "03". */
  index?: string;
  title: string;
  lede?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function SectionHead({
  index,
  title,
  lede,
  icon,
  className = "",
}: SectionHeadProps) {
  return (
    <header className={`mb-12 ${className}`}>
      <div className="flex items-center gap-4">
        {icon ? <span className="shrink-0">{icon}</span> : null}
        {index ? (
          <span className="text-fine font-bold text-chalk-dim">{index}</span>
        ) : null}
        <h2 className="text-h2 md:text-h1">{title}</h2>
      </div>
      {lede ? (
        <p className="mt-5 max-w-2xl text-body text-chalk-dim">{lede}</p>
      ) : null}
    </header>
  );
}
