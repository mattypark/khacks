/** Mint ghost. Sits beside calls to action and idles with a slow bob. */
export function Ghost({
  className = "",
  size = 72,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 72"
      width={size}
      height={(size / 64) * 72}
      aria-hidden
      className={`shrink-0 ${className}`}
    >
      <path
        d="M4 34a28 28 0 0 1 56 0v34l-9-7-9 7-10-7-10 7-9-7-9 7Z"
        className="fill-ghost"
      />
      <circle cx="22" cy="32" r="5" className="fill-ink" />
      <circle cx="42" cy="32" r="5" className="fill-ink" />
      <path
        d="M27 45c3 3 7 3 10 0"
        className="fill-none stroke-ink"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
