/**
 * Single source of truth for every hard fact on the site.
 * Nothing below should be duplicated inside a component — if a date, venue,
 * URL, or number appears on screen, it comes from here.
 *
 * All values are placeholders until the real event details land.
 */

export const event = {
  name: "Axiom Khacks",
  /** Used where the full name would read as repetition (nav, in-body prose). */
  shortName: "Khacks",
  tagline: "Kentucky's Best Hackathon",
  description:
    "One day, 8am to 9pm. Free to enter. Build anything with anyone — Axiom Khacks is Kentucky's flagship hackathon for high school and college builders.",

  // TODO(placeholder): swap for the live domain before launch.
  siteUrl: "https://khacks.dev",

  // Registration is external. Env override lets the link change without a deploy.
  lumaUrl: process.env.NEXT_PUBLIC_LUMA_URL ?? "https://lu.ma/khacks",

  // TODO(placeholder): confirmed date + venue.
  dates: "TBA · Spring 2026",
  datesShort: "TBA 2026",
  duration: "13 hours",
  hours: "8:00am — 9:00pm",
  venue: "Louisville, KY",
  venueDetail: "Venue announcement coming soon",
  capacity: "300 builders",
  cost: "Free — meals, swag, and workspace included",

  // Bottom notice strip. Set to null to hide it entirely.
  notice: {
    text: "Applications for Axiom Khacks 2026 are open.",
    linkLabel: "Grab a spot on Luma",
  } as { text: string; linkLabel: string } | null,

  contact: {
    general: "team@khacks.dev",
    sponsor: "sponsor@khacks.dev",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com/khacks" },
    { label: "X", href: "https://x.com/khacks" },
    { label: "Discord", href: "https://discord.gg/khacks" },
    { label: "GitHub", href: "https://github.com/khacks" },
  ],

  // Headline numbers used by the hero strip and the sponsor page.
  stats: [
    { value: "300", label: "builders" },
    { value: "13", label: "hours, one day" },
    { value: "$15K", label: "in prizes" },
    { value: "$0", label: "to enter" },
  ],
} as const;

/** `external` links leave the site and open in a new tab. */
export const nav = [
  { label: "About", href: "/#about" },
  { label: "Tracks", href: "/#tracks" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Prizes", href: "/#prizes" },
  { label: "FAQ", href: "/#faq" },
  { label: "Sponsor", href: "/sponsor" },
  { label: "Axiom", href: "https://www.axiompathways.org/", external: true },
] as const;
