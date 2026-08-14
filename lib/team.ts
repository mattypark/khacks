/**
 * Organizers. `photo` is a path under /public; when it is null the card falls
 * back to generated initials so the section never looks broken pre-photoshoot.
 */

export type Organizer = {
  name: string;
  role: string;
  href?: string;
  photo?: string | null;
};

export const team: Organizer[] = [
  { name: "Organizer One", role: "Director", photo: null },
  { name: "Organizer Two", role: "Operations", photo: null },
  { name: "Organizer Three", role: "Sponsorship", photo: null },
  { name: "Organizer Four", role: "Engineering", photo: null },
  { name: "Organizer Five", role: "Design", photo: null },
  { name: "Organizer Six", role: "Community", photo: null },
];
