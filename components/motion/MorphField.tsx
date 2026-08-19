"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The site backdrop: one wireframe object that spins continuously and morphs
 * between shapes — the Axiom mark among them.
 *
 * Every shape is resampled to the same fixed number of line segments, so the
 * change is a real vertex interpolation: each line travels to its new position
 * rather than one shape fading out under another.
 *
 * Three.js is imported lazily on idle and only runs while on screen, so it
 * stays out of the initial route bundle. Under reduce-motion — or without WebGL
 * — nothing mounts at all.
 */

/** Every shape is rebuilt to exactly this many segments so vertices can pair up. */
const SEGMENTS = 360;

const DWELL_MIN_MS = 2400;
const DWELL_MAX_MS = 4200;
const MORPH_MS = 1400;

const CHALK = 0xf5f4ef;
const AXIOM = 0x5ec27c;
const OPACITY = 0.5;

const randomDwell = () =>
  DWELL_MIN_MS + Math.random() * (DWELL_MAX_MS - DWELL_MIN_MS);

/** easeInOutCubic — slow at both ends so the travel reads as deliberate. */
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

type Segment = [number, number, number, number, number, number];

/**
 * Stretch or squeeze a segment list to exactly SEGMENTS entries by cutting each
 * source segment into equal pieces. Coverage stays even, so no part of the
 * shape is left thin.
 */
function resample(segments: Segment[]): Float32Array {
  const out = new Float32Array(SEGMENTS * 6);
  const count = segments.length;
  // Denser shapes are sampled evenly across the whole list — taking the first
  // SEGMENTS entries would lop the tail off a torus knot.
  const dense = count >= SEGMENTS;
  const pieces = dense ? 1 : Math.ceil(SEGMENTS / count);

  for (let i = 0; i < SEGMENTS; i += 1) {
    const index = dense
      ? Math.floor((i * count) / SEGMENTS)
      : i % count;
    const [ax, ay, az, bx, by, bz] = segments[index];
    const piece = dense ? 0 : Math.floor(i / count);
    const t0 = Math.min(piece / pieces, 1);
    const t1 = Math.min((piece + 1) / pieces, 1);
    const o = i * 6;

    out[o] = ax + (bx - ax) * t0;
    out[o + 1] = ay + (by - ay) * t0;
    out[o + 2] = az + (bz - az) * t0;
    out[o + 3] = ax + (bx - ax) * t1;
    out[o + 4] = ay + (by - ay) * t1;
    out[o + 5] = az + (bz - az) * t1;
  }

  return out;
}

/** Turns any geometry's edge list into the segment pairs `resample` wants. */
function toSegments(position: ArrayLike<number>): Segment[] {
  const segments: Segment[] = [];
  for (let i = 0; i < position.length; i += 6) {
    segments.push([
      position[i],
      position[i + 1],
      position[i + 2],
      position[i + 3],
      position[i + 4],
      position[i + 5],
    ]);
  }
  return segments;
}

/** Connects a run of points into segments; `close` joins the last back to the first. */
function polyline(points: [number, number][], close = false): Segment[] {
  const segments: Segment[] = [];
  const end = close ? points.length : points.length - 1;
  for (let i = 0; i < end; i += 1) {
    const [ax, ay] = points[i];
    const [bx, by] = points[(i + 1) % points.length];
    segments.push([ax, ay, 0, bx, by, 0]);
  }
  return segments;
}

/**
 * The Axiom Pathways mark, drawn flat: the circle, the path cutting through it,
 * and the four-point sparkle above the shoulder.
 */
function axiomMark(): Segment[] {
  const circle: [number, number][] = [];
  for (let i = 0; i < 56; i += 1) {
    const a = (i / 56) * Math.PI * 2;
    circle.push([-0.55 + Math.cos(a) * 1.5, Math.sin(a) * 1.5]);
  }

  const path: [number, number][] = [
    [-2.0, -0.5],
    [-1.25, 0.42],
    [-0.72, -0.08],
    [-0.3, 0.5],
    [0.28, 1.05],
  ];

  const sparkle: [number, number][] = [
    [0.62, 1.02],
    [0.92, 1.28],
    [1.02, 1.92],
    [1.14, 1.3],
    [1.52, 1.16],
    [1.06, 1.0],
    [0.98, 0.52],
    [0.84, 0.96],
  ];

  return [
    ...polyline(circle, true),
    ...polyline(path),
    ...polyline(sparkle, true),
  ];
}

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
        return; // No WebGL — the page simply has no backdrop.
      }

      const size = host.clientWidth || 520;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 7.2);

      /** Bulged cylinder — a bourbon barrel. */
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

      /** Reads a solid's edges, then throws the temporary geometry away. */
      const edgesOf = (geo: import("three").BufferGeometry): Segment[] => {
        const edges = new THREE.EdgesGeometry(geo, 18);
        const segments = toSegments(
          edges.attributes.position.array as Float32Array,
        );
        edges.dispose();
        geo.dispose();
        return segments;
      };

      /** Three nested cubes — the crate stack, abstracted. */
      const lattice = (): Segment[] =>
        [2.4, 1.7, 1.0].flatMap((s) => edgesOf(new THREE.BoxGeometry(s, s, s)));

      const SHAPES: { segments: Segment[]; axiom?: boolean }[] = [
        { segments: edgesOf(barrel()) },
        { segments: edgesOf(new THREE.IcosahedronGeometry(1.7, 1)) },
        { segments: axiomMark(), axiom: true },
        { segments: edgesOf(new THREE.TorusKnotGeometry(1.1, 0.34, 48, 8)) },
        { segments: edgesOf(new THREE.OctahedronGeometry(1.9, 0)) },
        { segments: lattice() },
        { segments: edgesOf(new THREE.DodecahedronGeometry(1.75, 0)) },
      ];

      const frames = SHAPES.map((shape) => resample(shape.segments));

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(frames[0]);
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );

      const material = new THREE.LineBasicMaterial({
        color: CHALK,
        transparent: true,
        opacity: OPACITY,
      });

      const mesh = new THREE.LineSegments(geometry, material);
      const group = new THREE.Group();
      group.add(mesh);
      scene.add(group);

      const chalkColor = new THREE.Color(CHALK);
      const axiomColor = new THREE.Color(AXIOM);

      let from = 0;
      let to = 1;
      let elapsed = 0;
      let dwell = randomDwell();
      let morphing = false;
      let last = 0;
      let frame = 0;
      let running = false;

      const tick = (now: number) => {
        const dt = last ? Math.min(now - last, 64) : 16;
        last = now;
        elapsed += dt;

        group.rotation.y += dt * 0.00026;
        group.rotation.x = Math.sin(now * 0.00006) * 0.26;

        if (!morphing && elapsed >= dwell) {
          morphing = true;
          elapsed = 0;
        }

        if (morphing) {
          const t = Math.min(elapsed / MORPH_MS, 1);
          const eased = ease(t);
          const a = frames[from];
          const b = frames[to];

          for (let i = 0; i < positions.length; i += 1) {
            positions[i] = a[i] + (b[i] - a[i]) * eased;
          }
          geometry.attributes.position.needsUpdate = true;

          // The mark's green arrives with its shape and leaves with it.
          const wantsGreen = SHAPES[to].axiom ? eased : 0;
          const hadGreen = SHAPES[from].axiom ? 1 - eased : 0;
          material.color
            .copy(chalkColor)
            .lerp(axiomColor, Math.max(wantsGreen, hadGreen));

          if (t >= 1) {
            morphing = false;
            elapsed = 0;
            dwell = randomDwell();
            from = to;
            to = (to + 1) % frames.length;
          }
        }

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
        geometry.dispose();
        material.dispose();
      };
    };

    // Wait for idle so the page paints before WebGL work begins.
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
