import Link from "next/link";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

/**
 * Nav entries are a mix of in-site anchors and outbound Axiom links, so every
 * place that maps over `nav` renders through this instead of branching itself.
 */
export function NavLink({
  href,
  external,
  className,
  onClick,
  children,
}: NavLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
