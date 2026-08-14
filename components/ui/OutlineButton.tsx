import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "quiet";
type Size = "md" | "lg";

const VARIANT: Record<Variant, { box: string; shadow: string }> = {
  // The single orange accent on the page: registration.
  primary: {
    box: "border-invader bg-invader text-ink hover:bg-ink hover:text-invader",
    shadow: "bg-chalk",
  },
  ghost: {
    box: "border-chalk bg-ink text-chalk hover:bg-chalk hover:text-ink",
    shadow: "bg-ghost",
  },
  quiet: {
    box: "border-chalk-dim bg-transparent text-chalk-dim hover:border-chalk hover:text-chalk",
    shadow: "bg-chalk-dim/40",
  },
};

const SIZE: Record<Size, string> = {
  md: "px-5 py-2.5 text-fine",
  lg: "px-7 py-3.5 text-body",
};

type OutlineButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  /** External links open in a new tab and get rel hardening. */
  external?: boolean;
  className?: string;
};

export function OutlineButton({
  children,
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
}: OutlineButtonProps) {
  const { box, shadow } = VARIANT[variant];
  const inner = [
    "relative inline-flex items-center gap-2 border-[length:var(--rule)] font-bold uppercase tracking-[0.08em]",
    "transition-[transform,background-color,color] duration-200 ease-[var(--ease-out-quart)]",
    "group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] group-active:translate-x-0 group-active:translate-y-0",
    SIZE[size],
    box,
  ].join(" ");

  const body = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 translate-x-[var(--offset)] translate-y-[var(--offset)] ${shadow}`}
      />
      <span className={inner}>{children}</span>
    </>
  );

  const wrapper = `group relative inline-block ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapper}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={wrapper}>
      {body}
    </Link>
  );
}
