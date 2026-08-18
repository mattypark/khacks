/**
 * Axiom Pathways — the nonprofit that runs Khacks.
 * Same rule as lib/event.ts: if an Axiom fact appears on screen, it comes from here.
 */

export const axiom = {
  name: "Axiom Pathways",
  short: "Axiom",

  site: "https://www.axiompathways.org/",
  apply: "https://www.axiomapply.com/",

  // White-on-transparent lockup, cropped and downscaled from the brand file.
  logo: "/axiom-pathways.png",
  logoWidth: 560,
  logoHeight: 294,

  blurb:
    "Axiom Pathways is a student-run nonprofit that puts high schoolers on real projects. We run chapters, take on interns for how much they want it rather than what they have already done, and teach AI, computer science, and marketing by shipping work that ends up in front of people.",

  mission:
    "Khacks is the biggest thing Axiom has ever put on — one room, one day, and the largest prize pool we have ever raised for student builders in Kentucky.",

  // TODO(placeholder): confirm every number before this page goes to a sponsor.
  stats: [
    { value: "6", label: "chapters" },
    { value: "120+", label: "students taught" },
    { value: "3", label: "curriculum tracks" },
    { value: "1", label: "Stanford KID partner" },
  ],

  links: [
    { label: "axiompathways.org", href: "https://www.axiompathways.org/", note: "Our website" },
    { label: "axiomapply.com", href: "https://www.axiomapply.com/", note: "Apply to be an intern" },
  ],
} as const;
