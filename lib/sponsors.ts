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
    summary: "Title partner. One per year.",
    perks: [
      "Name on the event: “Khacks, presented by …”",
      "Opening + closing stage time",
      "Own a $2,500 track prize",
      "Six-person mentor table on the floor",
      "Resume book for every attendee who opts in",
      "Logo on shirts, badges, stage, and site header",
    ],
    logos: [],
    emphasis: true,
  },
  {
    name: "Cardinal",
    price: "$5,000",
    summary: "Front-of-room presence all day.",
    perks: [
      "Sponsor a $750 track prize",
      "Run a workshop or lightning talk",
      "Four-person mentor table",
      "Resume book (opt-in attendees)",
      "Logo on shirts and site",
    ],
    logos: [],
  },
  {
    name: "Bluegrass",
    price: "$1,500",
    summary: "Support the room, meet the builders.",
    perks: [
      "Two mentor passes",
      "Swag in every attendee bag",
      "Logo on site and closing slides",
    ],
    logos: [],
  },
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
