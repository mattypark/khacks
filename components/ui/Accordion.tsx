import type { ReactNode } from "react";

type AccordionItemProps = {
  question: string;
  children: ReactNode;
};

/**
 * Native <details> so keyboard and screen-reader behaviour comes for free —
 * Enter/Space toggles, state is exposed without ARIA bookkeeping.
 */
export function AccordionItem({ question, children }: AccordionItemProps) {
  return (
    <details className="group border-b-[length:var(--rule)] border-chalk/20 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-start gap-4 py-5 text-h3 font-bold marker:content-none hover:text-axiom">
        <span
          aria-hidden
          className="mt-1 shrink-0 text-fine text-axiom transition-transform duration-200 ease-[var(--ease-out-quart)] group-open:rotate-90"
        >
          &gt;
        </span>
        <span>{question}</span>
      </summary>
      <div className="pb-6 pl-8 text-body text-chalk-dim">{children}</div>
    </details>
  );
}
