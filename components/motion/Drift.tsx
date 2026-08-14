"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Idle bob for the mascots ([data-float]). anime.js drives it, and an
 * IntersectionObserver pauses sprites that scroll out of view so nothing
 * animates off-screen.
 */
export function Drift() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const { animate } = await import("animejs");
      if (cancelled) return;

      const targets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-float]"),
      );
      if (!targets.length) return;

      const players = targets.map((el, i) =>
        animate(el, {
          translateY: [0, -8, 0],
          duration: 2600,
          delay: i * 220,
          ease: "inOutSine",
          loop: true,
          autoplay: false,
        }),
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = targets.indexOf(entry.target as HTMLElement);
            if (index === -1) return;
            if (entry.isIntersecting) players[index].play();
            else players[index].pause();
          });
        },
        { rootMargin: "80px" },
      );
      targets.forEach((el) => observer.observe(el));

      cleanup = () => {
        observer.disconnect();
        players.forEach((player) => player.pause());
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
