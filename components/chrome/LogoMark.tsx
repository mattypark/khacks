import Link from "next/link";

/**
 * Boxed monospace wordmark: { axiom => khacks }.
 * Collapses to { a => k } on narrow screens so it never crowds the menu button.
 */
export function LogoMark() {
  return (
    <Link
      href="/"
      aria-label="Axiom Khacks, home"
      className="inline-flex border-[length:var(--rule)] border-chalk px-3 py-2 font-bold tracking-tight transition-colors duration-200 hover:bg-chalk hover:text-ink"
    >
      <span aria-hidden className="sm:hidden">
        {"{ a => k }"}
      </span>
      <span aria-hidden className="hidden sm:inline">
        {"{ axiom => khacks }"}
      </span>
    </Link>
  );
}
