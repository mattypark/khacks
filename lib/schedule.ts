/** Single-day run of show, 8am to 9pm. Placeholder times until the venue is locked. */

export type Slot = {
  time: string;
  title: string;
  detail?: string;
  /** Anchor moments get the ghost-green marker. */
  key?: boolean;
};

export type Block = {
  label: string;
  window: string;
  slots: Slot[];
};

export const schedule: Block[] = [
  {
    label: "Morning",
    window: "8:00 — 12:00",
    slots: [
      { time: "8:00", title: "Doors + check-in", detail: "Coffee, stickers, wifi codes" },
      { time: "8:45", title: "Opening ceremony", detail: "Rules, judging, sponsors", key: true },
      { time: "9:15", title: "Team formation", detail: "Come solo, leave with three friends" },
      { time: "9:30", title: "Hacking begins", key: true },
      { time: "10:30", title: "Workshop — Ship a first API" },
      { time: "11:30", title: "Workshop — Hardware bench hours" },
    ],
  },
  {
    label: "Afternoon + evening",
    window: "12:00 — 21:00",
    slots: [
      { time: "12:30", title: "Lunch", detail: "Eat at your table or don't — the room stays open" },
      { time: "14:00", title: "Mentor sweep", detail: "Every table gets a check-in" },
      { time: "16:00", title: "Last call for stuck teams", detail: "Scope down now, not at 18:00" },
      { time: "17:30", title: "Dinner" },
      { time: "18:30", title: "Submissions close", detail: "Hard deadline. No extensions.", key: true },
      { time: "18:45", title: "Science-fair judging", detail: "Judges walk the room" },
      { time: "20:00", title: "Finalist demos", detail: "Top six on stage, 3 minutes each" },
      { time: "20:40", title: "Awards + closing", key: true },
      { time: "21:00", title: "Doors close" },
    ],
  },
];
