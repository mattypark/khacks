"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Section reveals + the hero crate drop-in, both GSAP.
 * Sections carry [data-reveal]; the hero crates carry [data-cube] inside
 * [data-barrel]. Under reduce-motion nothing runs and the CSS in globals.css
 * never hides anything, so the page is simply static.
 */
export function Reveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 12, clipPath: "inset(0 0 12% 0)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 85%", once: true },
              onStart: () => section.setAttribute("data-revealed", ""),
            },
          );
        });

        const crates = gsap.utils.toArray<SVGGElement>("[data-barrel] [data-cube]");
        if (crates.length) {
          gsap.from(crates, {
            y: -40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(1.6)",
            delay: 0.15,
          });
        }
      });

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
