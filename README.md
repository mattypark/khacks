# Khacks

Marketing site for Khacks — Kentucky's hackathon. Next.js 16 (App Router),
Tailwind v4, dark-only. Registration is external: every CTA points at Luma.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing the site

Every fact on the page comes from `lib/`. Components read it — they never
hardcode a date, price, or URL.

| File | Holds |
| --- | --- |
| `lib/event.ts` | name, dates, venue, Luma URL, capacity, stats, contact, socials, bottom-banner copy, nav |
| `lib/tracks.ts` | the six build tracks |
| `lib/schedule.ts` | two-day run of show |
| `lib/prizes.ts` | grand/runner-up/third, track prize, specials |
| `lib/faq.ts` | FAQ entries |
| `lib/team.ts` | organizers (`photo: null` → initials placeholder) |
| `lib/sponsors.ts` | tiers, perks, in-kind blurb, post-signing timeline |

Placeholders to replace before launch: `siteUrl`, `dates`, `venue`,
`venueDetail`, the Luma URL, contact addresses, and prize amounts.

The Luma link can also be overridden per-environment:

```bash
cp .env.example .env.local   # then set NEXT_PUBLIC_LUMA_URL
```

Set `event.notice` to `null` to hide the yellow bottom strip.

## Design

Warm near-black canvas, chalk hairline boxes on a 6px hard offset, all
JetBrains Mono, one accent per viewport (orange = register). Tokens live in
`app/globals.css` under `@theme`; `components/ui/OutlineBox` and
`OutlineButton` are the primitives everything composes from. Newsreader italic
is display-only — one pull quote in the About section.

Art is hand-authored SVG in `components/art/` (no image assets): the crate
stack, the pixel cardinal, the ghost, and the six track drawings.

## Motion

All of it sits behind `lib/motion.ts`. With OS reduce-motion on, Lenis, GSAP,
anime.js, and the Three.js canvas all skip mounting and the page is static.

- `SmoothScroll` — Lenis, lazily imported
- `Reveal` — GSAP ScrollTrigger section wipes + hero crate drop-in
- `Drift` — anime.js idle bob, paused off-screen via IntersectionObserver
- `WireBarrel` — Three.js wireframe barrel, loaded on idle, desktop only
- `MobileSheet` — framer-motion, loaded only when the mobile menu first opens

Heavy libraries are dynamically imported, so none of them are in the initial
route bundle.
