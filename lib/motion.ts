/**
 * One place decides whether the site animates. Every motion module asks here
 * first, so turning on OS reduce-motion disables Lenis, GSAP, anime, and the
 * Three.js canvas together rather than one at a time.
 */

export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia(REDUCED_QUERY).matches;
}

/** Calls back on every change, and once immediately with the current value. */
export function watchReducedMotion(fn: (reduced: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCED_QUERY);
  const handler = () => fn(mq.matches);
  handler();
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
