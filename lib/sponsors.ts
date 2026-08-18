/**
 * Sponsor tiers, named for Kentucky. `logos` holds confirmed partners —
 * empty arrays render placeholder slots instead of a broken row.
 */

export type Tier = {
  name: string;
  price: string;
  summary: string;
  perks: string[];
  logos: { name: string; href?: string }[];
  /** Headline tier renders wider. */
  emphasis?: boolean;
};

export const tiers: Tier[] = [
  {
    name: "Bourbon",
    price: "$10,000",
    summary: "Co-host. One per year.",
    perks: [
      "Co-host branding — “Axiom Khacks, presented by …”",
      "Opening remarks + closing stage time",
      "Run a full track: hackers building on your product",
      "Run a workshop and take a judging slot",
      "Exclusive prize category, named by you",
      "Full hacker contact info — resume book, LinkedIn, GitHub (opt-in only)",
      "Personal introductions to the hackers you want to meet",
      "Custom media: a reel and interviews you own outright",
      "Logo on shirts, badges, stage, and the site header",
    ],
    logos: [],
    emphasis: true,
  },
  {
    name: "Cardinal",
    price: "$5,000",
    summary: "Front-of-room presence all day.",
    perks: [
      "Run a workshop or lightning talk",
      "Judging slot",
      "Sponsor a $750 track prize",
      "Resume book for every attendee who opts in",
      "Four-person mentor table on the floor",
      "Post-event photo and video assets",
      "Logo on shirts and site",
    ],
    logos: [],
  },
  {
    name: "Bluegrass",
    price: "$1,500",
    summary: "Support the room, meet the builders.",
    perks: [
      "Placement on event materials",
      "Inclusion in event marketing — social, mailing, physical",
      "Guest list access",
      "Post-event photo and video assets",
      "Two mentor passes and swag in every attendee bag",
    ],
    logos: [],
  },
];

/** Framing for the Why Sponsor block, in the order sponsors actually care about. */
export const whySponsor = [
  {
    title: "Talent",
    detail:
      "One room, every motivated student builder in the state, watched for a full day while they actually build. These are the people your recruiters do not find on LinkedIn — and you meet them before anyone else does.",
  },
  {
    title: "Branding",
    detail:
      "Your product in front of future engineers and founders, plus media assets you keep: reels, photos, and interviews from the floor. Hackers post about what they built with, and that is earned reach you do not buy back later.",
  },
  {
    title: "Distribution",
    detail:
      "Top-tier sponsors run a full track and a workshop. For one day, dozens of engineers are actively building on your platform — with your docs open and your team in the room to unblock them.",
  },
];

/** Bulleted event summary for the sponsor page, mirroring the one-pager. */
export const eventOverview = [
  "One day, 8:00am to 9:00pm — doors at eight, awards before nine",
  "300 high school and college builders from Kentucky and neighbouring states",
  "Six build tracks: Web, AI & ML, Hardware, Games, Civic Tech, Wildcard",
  "Run by Axiom Pathways, a student-run nonprofit",
  "Prizes for the podium, every track, and specials like “Most Kentucky” and “Best First Hack”",
  "Free for every student who walks in — sponsors are why",
];

export const inKind = {
  title: "In-kind welcome",
  detail:
    "Credits, hardware, food, and venue space count. If your company makes something a team would reach for at hour nine, we want to talk.",
};

export const sponsorTimeline = [
  { when: "On signing", what: "Logo live on the site within 48 hours" },
  { when: "6 weeks out", what: "Social announcement + newsletter feature" },
  { when: "2 weeks out", what: "Workshop slot confirmed, swag shipped to venue" },
  { when: "Event day", what: "Mentor table, judging seat, stage time" },
  { when: "1 week after", what: "Impact report: reach, demos, opt-in resumes" },
];
