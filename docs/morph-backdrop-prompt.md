# Prompt: morphing wireframe backdrop

Copy everything below the line into a fresh Claude Code session in the portfolio
repo. It rebuilds the Axiom Khacks backdrop exactly — same shapes, timings, and
motion — with the palette left as a parameter.

---

Build a full-page background animation: a single wireframe object that spins
continuously and **morphs** between shapes. Three.js, React, TypeScript.

## The one rule that matters

This must be a **true vertex morph**, not a cross-fade between two objects. When
the shape changes, every line travels to its new position. If you build it as
"fade shape A out while fading shape B in", it reads as an instant swap and the
whole effect is wrong.

The way to get that: resample every shape to the **exact same number of line
segments** (use 360), store each as a flat `Float32Array`, and keep one
`THREE.LineSegments` whose position attribute you lerp between two of those
arrays each frame.

## Structure

One client component, `MorphField.tsx`, that renders a single `<div>` and does
everything else in a `useEffect`. It takes only a `className` so the parent
controls size and placement.

## Shapes (7, in this order)

1. **Barrel** — `CylinderGeometry(1.3, 1.3, 2.5, 16, 3)`, then bulge it: for
   every vertex, scale x and z by `1 + 0.16 * (1 - (y / 1.25) ** 2)`.
2. **Icosahedron** — `IcosahedronGeometry(1.7, 1)`
3. **Brand mark** — hand-built flat line art (see below), flagged as the accent shape
4. **Torus knot** — `TorusKnotGeometry(1.1, 0.34, 48, 8)`
5. **Octahedron** — `OctahedronGeometry(1.9, 0)`
6. **Nested cubes** — three `BoxGeometry` cubes at sizes 2.4, 1.7, 1.0, edges concatenated
7. **Dodecahedron** — `DodecahedronGeometry(1.75, 0)`

For the solids, take edges with `new THREE.EdgesGeometry(geo, 18)` and read
`.attributes.position.array` as consecutive xyz pairs — every 6 floats is one
segment. Dispose both the temporary solid and the EdgesGeometry immediately;
you only need the numbers.

The brand mark is drawn by hand as 2D points at z = 0, then run through the same
resampler. For Axiom that was: a 56-point circle of radius 1.5 centred at
x = −0.55; a 5-point polyline cutting through it from (−2.0, −0.5) up to
(0.28, 1.05); and a closed 8-point four-pointed sparkle around (1.0, 1.2).
Swap in whatever mark you want — any closed polyline works.

## The resampler (the part with a trap in it)

```ts
const SEGMENTS = 360;
type Segment = [number, number, number, number, number, number];

function resample(segments: Segment[]): Float32Array {
  const out = new Float32Array(SEGMENTS * 6);
  const count = segments.length;
  const dense = count >= SEGMENTS;
  const pieces = dense ? 1 : Math.ceil(SEGMENTS / count);

  for (let i = 0; i < SEGMENTS; i += 1) {
    const index = dense ? Math.floor((i * count) / SEGMENTS) : i % count;
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
```

Two cases, and **the dense one is the trap**: a torus knot has well over 360
edges. If you just do `segments[i % count]` you draw the first 360 edges and
silently lop the rest of the shape off. Sample evenly across the whole list
instead — that's the `dense` branch.

Sparse shapes go the other way: a cube lattice has 36 edges, so each edge gets
cut into 10 pieces to reach 360.

Sanity-check it in plain Node before trusting it. Feed it synthetic lists of 1,
12, 96, 359, 360, 361, 900, and 3000 segments and assert: no `NaN`, no
zero-length segments, and the drawn indices span the whole input.

## Motion

- Camera: `PerspectiveCamera(38, 1, 0.1, 100)` at z = 7.2. Renderer is square —
  size it from `host.clientWidth` and re-size on window resize.
- Put the mesh in a `THREE.Group` and rotate the group, never the mesh:
  `rotation.y += dt * 0.00026` and `rotation.x = Math.sin(now * 0.00006) * 0.26`.
  Rotating the group is what keeps the spin unbroken through a morph.
- Timeline per cycle: hold for a **random 2400–4200 ms**, then morph over
  **1400 ms**. Randomising the hold is what stops it feeling like a slideshow.
- Easing: `easeInOutCubic` — `t < 0.5 ? 4t³ : 1 - (-2t + 2)³ / 2`.
- Morph frame: `positions[i] = a[i] + (b[i] - a[i]) * eased` across the whole
  array, then set `geometry.attributes.position.needsUpdate = true`.
- Clamp delta time: `Math.min(now - last, 64)`. Without it, a backgrounded tab
  returns and the object lurches.

## Look

`LineBasicMaterial`, `transparent: true`, `opacity: 0.5`, colour off-white.
WebGL ignores `linewidth`, so opacity is your only lever for presence — 0.5 was
where it read clearly behind body text without competing with it.

When the brand-mark shape is the morph target, lerp the material colour toward
the brand colour by the eased amount, and back to off-white as it leaves:

```ts
const wantsAccent = SHAPES[to].accent ? eased : 0;
const hadAccent = SHAPES[from].accent ? 1 - eased : 0;
material.color.copy(baseColor).lerp(accentColor, Math.max(wantsAccent, hadAccent));
```

## Placement

Fixed to the viewport in the root layout, behind everything, centred:

```tsx
<div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
  <MorphField className="absolute left-1/2 top-1/2 aspect-square w-[min(52vh,74vw,540px)] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(circle,#000_72%,transparent_96%)]" />
</div>
```

Page content sits above it with `relative z-10`.

Get the mask right or the shape looks broken. Fade **late** — 72% solid, gone by
96%. Fading early (say 50%) cuts lines off mid-stroke and reads as clipping
rather than as a soft edge.

## Non-negotiable guards

- Bail before importing Three at all if
  `matchMedia("(prefers-reduced-motion: reduce)").matches`. The page must be
  fully usable with no canvas.
- Import `three` **dynamically inside the effect**, wrapped in
  `requestIdleCallback` (fall back to a 400 ms timeout). Three is ~178 kb gzipped
  — a static import puts it in the initial bundle and wrecks LCP. Verify after
  building that the chunk containing `Matrix4` is not referenced by the HTML.
- Wrap `new THREE.WebGLRenderer()` in try/catch and return quietly on failure —
  no WebGL, no backdrop, no error.
- `IntersectionObserver` on the host: cancel the rAF loop when off screen,
  restart on re-entry, and reset the delta-time clock when restarting.
- Full teardown in the effect's cleanup: disconnect the observer, remove the
  resize listener, cancel the frame, remove the canvas element, then dispose the
  renderer, geometry, and material. A `cancelled` flag must also stop the async
  import from mounting a canvas after unmount.
