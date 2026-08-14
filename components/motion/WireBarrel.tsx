"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Slow-turning wireframe barrel sitting behind the hero crate stack.
 * Three.js is imported lazily on idle and only when the element is on screen,
 * so it never lands in the initial route bundle. Under reduce-motion — or if
 * WebGL is unavailable — nothing mounts and the SVG stack stands alone.
 */
export function WireBarrel({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const host = hostRef.current;
    if (!host) return;

    let dispose = () => {};
    let cancelled = false;

    const start = async () => {
      const THREE = await import("three");
      if (cancelled || !hostRef.current) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        return; // No WebGL — the SVG stack is the fallback.
      }

      const size = host.clientWidth || 260;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 6);

      // Low-poly barrel: a bulged cylinder, rendered as edges only.
      const geometry = new THREE.CylinderGeometry(1.35, 1.35, 2.6, 14, 3);
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i += 1) {
        const y = positions.getY(i);
        const bulge = 1 + 0.16 * (1 - (y / 1.3) ** 2);
        positions.setX(i, positions.getX(i) * bulge);
        positions.setZ(i, positions.getZ(i) * bulge);
      }
      positions.needsUpdate = true;

      const barrel = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry, 18),
        new THREE.LineBasicMaterial({
          color: 0xf5f4ef,
          transparent: true,
          opacity: 0.22,
        }),
      );
      barrel.rotation.z = 0.14;
      scene.add(barrel);

      let frame = 0;
      let running = false;
      const tick = () => {
        barrel.rotation.y += 0.0035;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };

      const setRunning = (next: boolean) => {
        if (next === running) return;
        running = next;
        if (next) frame = requestAnimationFrame(tick);
        else cancelAnimationFrame(frame);
      };

      const observer = new IntersectionObserver(
        ([entry]) => setRunning(entry.isIntersecting),
        { rootMargin: "120px" },
      );
      observer.observe(host);

      const onResize = () => {
        const next = host.clientWidth || size;
        renderer.setSize(next, next);
      };
      window.addEventListener("resize", onResize);

      dispose = () => {
        observer.disconnect();
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(frame);
        renderer.domElement.remove();
        renderer.dispose();
        geometry.dispose();
        barrel.geometry.dispose();
        barrel.material.dispose();
      };
    };

    // Wait for idle so the hero paints before WebGL work begins.
    const idleOn = typeof window.requestIdleCallback === "function";
    const idle = idleOn
      ? window.requestIdleCallback(() => void start())
      : window.setTimeout(() => void start(), 400);

    return () => {
      cancelled = true;
      if (idleOn) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      dispose();
    };
  }, []);

  return <div ref={hostRef} aria-hidden className={className} />;
}
