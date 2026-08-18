import type { ElementType, ReactNode } from "react";

type Tone =
  | "chalk"
  | "axiom"
  | "invader"
  | "dim"
  | "silver"
  | "bronze";

const BORDER: Record<Tone, string> = {
  chalk: "border-chalk",
  axiom: "border-axiom",
  invader: "border-invader",
  dim: "border-chalk-dim/50",
  silver: "border-silver",
  bronze: "border-bronze",
};

const SHADOW: Record<Tone, string> = {
  chalk: "bg-chalk",
  axiom: "bg-axiom",
  invader: "bg-invader",
  dim: "bg-chalk-dim/50",
  silver: "bg-silver",
  bronze: "bg-bronze",
};

type OutlineBoxProps = {
  children: ReactNode;
  /** Renders the hard-offset box behind. Off for flat panels. */
  offset?: boolean;
  tone?: Tone;
  as?: ElementType;
  className?: string;
  innerClassName?: string;
};

/**
 * The one card primitive: a chalk hairline box sitting on a hard-offset
 * duplicate. No blur, no radius, no gradient — the whole site is built from it.
 */
export function OutlineBox({
  children,
  offset = true,
  tone = "chalk",
  as: Tag = "div",
  className = "",
  innerClassName = "",
}: OutlineBoxProps) {
  return (
    <Tag className={`relative ${className}`}>
      {offset ? (
        <span
          aria-hidden
          className={`absolute inset-0 translate-x-[var(--offset)] translate-y-[var(--offset)] ${SHADOW[tone]}`}
        />
      ) : null}
      <div
        className={`relative h-full border-[length:var(--rule)] ${BORDER[tone]} bg-ink-raised ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
