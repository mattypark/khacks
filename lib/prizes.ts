/** Prize pool. Amounts are placeholders pending sponsor confirmation. */

export type Prize = {
  place: string;
  amount: string;
  detail: string;
  /** Podium colour — drives the card border, offset shadow, and amount text. */
  tone: "axiom" | "silver" | "bronze";
  /** Grand prize renders larger. */
  emphasis?: boolean;
};

export const prizes: Prize[] = [
  {
    place: "Grand Prize",
    amount: "$5,000",
    detail: "Best project overall, judged across craft, ambition, and demo.",
    tone: "axiom",
    emphasis: true,
  },
  {
    place: "Runner-up",
    amount: "$2,500",
    detail: "Second overall. Same judging rubric, thinner margin.",
    tone: "silver",
  },
  {
    place: "Third",
    amount: "$1,000",
    detail: "Third overall.",
    tone: "bronze",
  },
];

export const trackPrizes = {
  amount: "$750",
  detail: "Awarded to the best project in each of the six build tracks.",
};

export const specialPrizes = [
  { name: "Best First Hack", detail: "For a team where nobody has hacked before." },
  { name: "Most Kentucky", detail: "Best answer to a problem this state actually has." },
  { name: "Hardest Technical Lift", detail: "For the team that attempted the absurd." },
  { name: "Best Design", detail: "Judged on interface craft, not framework choice." },
];
