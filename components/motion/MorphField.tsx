"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The hero's background: a large wireframe solid that spins continuously and
 * swaps to a different shape every few seconds. Six shapes live in one rotating
 * group; only opacity and scale cross-fade, so the spin never resets and the
 * change reads as the object morphing rather than cutting.
 *
 * Three.js is imported lazily on idle and only runs while on screen, so it
 * stays out of the initial route bundle. Under reduce-motion — or without WebGL
 * — nothing mounts and the hero is simply the crate stack on a flat canvas.
 */

// Each shape holds for a random spell inside this window, so the changes never
// land on a countable beat.
const DWELL_MIN_MS = 1800;
const DWELL_MAX_MS = 3200;
const FADE_MS = 800; // cross-fade length

const nextDwell = () =>
  DWELL_MIN_MS + Math.random() * (DWELL_MAX_MS - DWELL_MIN_MS);

/** Smoothstep — eases both ends of the cross-fade so nothing snaps. */
const ease = (t: number) => t * t * (3 - 2 * t);
// WebGL ignores line width, so opacity is the only lever for presence at this
// scale. High enough to read behind the type, low enough not to fight it.
const PEAK_OPACITY = 0.36;

export function MorphField({ className = "" }: { className?: string }) {
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
        return; // No WebGL — the crate stack carries the hero alone.
      }

      const size = host.clientWidth || 640;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 6);

      /** Bulged cylinder — the bourbon barrel the hero started with. */
      const barrel = () => {
        const geo = new THREE.CylinderGeometry(1.3, 1.3, 2.5, 16, 3);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i += 1) {
          const y = pos.getY(i);
          const bulge = 1 + 0.16 * (1 - (y / 1.25) ** 2);
          pos.setX(i, pos.getX(i) * bulge);
          pos.setZ(i, pos.getZ(i) * bulge);
        }
        pos.needsUpdate = true;
        return geo;
      };

      /** Three nested cubes — the crate stack, abstracted. */
      const lattice = () => {
        const merged = new THREE.BufferGeometry();
        const verts: number[] = [];
        [2.4, 1.7, 1.0].forEach((s) => {
          const box = new THREE.BoxGeometry(s, s, s);
          const edges = new THREE.EdgesGeometry(box);
          verts.push(...Array.from(edges.attributes.position.array));
          box.dispose();
          edges.dispose();
        });
        merged.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(verts, 3),
        );
        return merged;
      };

      type Shape = {
        geo: () => import("three").BufferGeometry;
        /** Already edge-only — skip the EdgesGeometry pass. */
        pre?: boolean;
        /** Draws in Axiom green instead of chalk. */
        axiom?: boolean;
      };

      const SHAPES: Shape[] = [
        { geo: barrel },
        { geo: () => new THREE.IcosahedronGeometry(1.75, 1) },
        { geo: () => new THREE.TorusKnotGeometry(1.15, 0.36, 64, 10), axiom: true },
        { geo: () => new THREE.OctahedronGeometry(1.95, 0) },
        { geo: lattice, pre: true },
        { geo: () => new THREE.DodecahedronGeometry(1.8, 0) },
      ];

      const group = new THREE.Group();
      scene.add(group);

      const meshes = SHAPES.map((shape, i) => {
        const source = shape.geo();
        const geometry = shape.pre
          ? source
          : new THREE.EdgesGeometry(source, 18);
        const material = new THREE.LineBasicMaterial({
          color: shape.axiom ? 0x3f8f52 : 0xf5f4ef,
          transparent: true,
          opacity: i === 0 ? PEAK_OPACITY : 0,
        });
        const mesh = new THREE.LineSegments(geometry, material);
        mesh.visible = i === 0;
        mesh.scale.setScalar(i === 0 ? 1 : 0.85);
        group.add(mesh);
        // The pre-edged lattice reuses `source` as its geometry; don't double-free.
        return { mesh, material, geometry, source: shape.pre ? null : source };
      });

      let active = 0;
      let elapsed = 0;
      let dwell = nextDwell();
      let last = 0;
      let frame = 0;
      let running = false;

      const tick = (now: number) => {
        const dt = last ? Math.min(now - last, 64) : 16;
        last = now;
        elapsed += dt;

        group.rotation.y += dt * 0.00028;
        group.rotation.x = Math.sin(now * 0.00007) * 0.28;

        if (elapsed >= dwell + FADE_MS) {
          elapsed = 0;
          dwell = nextDwell();
          active = (active + 1) % meshes.length;
          meshes[active].mesh.visible = true;
        }

        // Everything past the dwell window is cross-fade time.
        const raw = Math.min(Math.max((elapsed - dwell) / FADE_MS, 0), 1);
        const fade = ease(raw);
        const outgoing = (active - 1 + meshes.length) % meshes.length;

        meshes.forEach(({ mesh, material }, i) => {
          let amount = 0;
          if (i === active) amount = raw === 0 ? 1 : fade;
          else if (i === outgoing && raw > 0) amount = 1 - fade;

          material.opacity = amount * PEAK_OPACITY;
          mesh.scale.setScalar(0.85 + amount * 0.15);
          mesh.visible = amount > 0.001;
        });

        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };

      const setRunning = (next: boolean) => {
        if (next === running) return;
        running = next;
        if (next) {
          last = 0;
          frame = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(frame);
        }
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
        meshes.forEach(({ material, geometry, source }) => {
          material.dispose();
          geometry.dispose();
          source?.dispose();
        });
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
