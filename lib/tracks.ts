/** Build tracks. `art` selects the line drawing in components/art/TrackArt.tsx. */

export type TrackArt =
  | "browser"
  | "neurons"
  | "circuit"
  | "joystick"
  | "river"
  | "dice";

export type Track = {
  index: string;
  name: string;
  blurb: string;
  art: TrackArt;
};

export const tracks: Track[] = [
  {
    index: "00",
    name: "Web",
    blurb: "Sites, tools, and anything that ships behind a URL.",
    art: "browser",
  },
  {
    index: "01",
    name: "AI & ML",
    blurb: "Agents, models, and honest uses of a very loud technology.",
    art: "neurons",
  },
  {
    index: "02",
    name: "Hardware",
    blurb: "Microcontrollers, sensors, and things that beep. Parts provided.",
    art: "circuit",
  },
  {
    index: "03",
    name: "Games",
    blurb: "Engines, browsers, or cardboard — if it plays, it counts.",
    art: "joystick",
  },
  {
    index: "04",
    name: "Civic Tech",
    blurb: "Solve a Kentucky problem: floods, transit, farms, schools.",
    art: "river",
  },
  {
    index: "05",
    name: "Wildcard",
    blurb: "The track for the idea that fits nowhere else. Usually wins.",
    art: "dice",
  },
];
