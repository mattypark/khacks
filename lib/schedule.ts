/** Two-day run of show. Placeholder times until the venue is locked. */

export type Slot = {
  time: string;
  title: string;
  detail?: string;
  /** Anchor moments get the ghost-green marker. */
  key?: boolean;
};

export type Day = {
  label: string;
  date: string;
  slots: Slot[];
};

export const schedule: Day[] = [
  {
    label: "Day 01",
    date: "Saturday",
    slots: [
      { time: "09:00", title: "Doors + check-in", detail: "Coffee, stickers, wifi codes" },
      { time: "10:00", title: "Opening ceremony", detail: "Rules, judging, sponsors", key: true },
      { time: "10:30", title: "Team formation", detail: "Come solo, leave with three friends" },
      { time: "11:00", title: "Hacking begins", key: true },
      { time: "13:00", title: "Lunch" },
      { time: "14:30", title: "Workshop — Ship a first API" },
      { time: "17:00", title: "Workshop — Hardware bench hours" },
      { time: "19:00", title: "Dinner + lightning talks" },
      { time: "23:00", title: "Midnight snack run" },
    ],
  },
  {
    label: "Day 02",
    date: "Sunday",
    slots: [
      { time: "08:00", title: "Breakfast" },
      { time: "10:00", title: "Mentor sweep", detail: "Last call for stuck teams" },
      { time: "12:00", title: "Lunch" },
      { time: "16:00", title: "Submissions close", detail: "Hard deadline. No extensions.", key: true },
      { time: "16:30", title: "Science-fair judging", detail: "Judges walk the room" },
      { time: "18:30", title: "Finalist demos", detail: "Top six on stage, 3 minutes each" },
      { time: "19:30", title: "Awards + closing", key: true },
    ],
  },
];
