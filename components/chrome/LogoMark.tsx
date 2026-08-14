import Link from "next/link";

/** Boxed monospace wordmark: { k => hacks }. */
export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Khacks, home"
      className="inline-flex border-[length:var(--rule)] border-chalk px-3 py-2 font-bold tracking-tight transition-colors duration-200 hover:bg-chalk hover:text-ink"
    >
      <span aria-hidden>{compact ? "{ k }" : "{ k => hacks }"}</span>
    </Link>
  );
}
