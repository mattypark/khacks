/**
 * Video slots. Drop MP4s in `public/video/` and fill in `src` — until then each
 * slot renders as a labelled placeholder frame rather than disappearing.
 *
 * Keep `ratio` accurate: VideoFrame reserves the box from it, so a correct
 * value is what stops the page shifting when the file finally loads.
 */

export type Media = {
  src: string | null;
  poster: string | null;
  caption: string;
  /** CSS aspect-ratio value, e.g. "16 / 9" or "9 / 16". */
  ratio: string;
  /** Shown inside the empty frame while `src` is null. */
  placeholder: string;
};

export const media = {
  recap: {
    src: null,
    poster: null,
    caption: "Recap from the last Axiom build weekend.",
    ratio: "16 / 9",
    placeholder: "Recap video — coming soon",
  },
  customMedia: {
    src: null,
    poster: null,
    caption:
      "Example of the custom media premium sponsors get: a vertical cut built around your product.",
    ratio: "9 / 16",
    placeholder: "Sponsor reel — coming soon",
  },
} satisfies Record<string, Media>;
