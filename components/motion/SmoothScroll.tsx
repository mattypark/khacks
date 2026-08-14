"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Lenis owns scrolling for the whole document. Skipped entirely under
 * reduce-motion so the browser's native scroll (and jump-to-anchor) stays put.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cleanup = () => {};
    let cancelled = false;

    // Imported lazily so Lenis stays out of the initial route bundle.
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        // Anchors still work — Lenis intercepts same-page hash clicks.
        anchors: true,
      });

      let frame = requestAnimationFrame(function raf(time: number) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      });

      cleanup = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
