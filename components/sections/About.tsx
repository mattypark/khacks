import { event } from "@/lib/event";

/** Two-column icon + heading pair, mirroring the reference site's info rows. */
function InfoColumn({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-5">
        <span aria-hidden className="shrink-0">
          {icon}
        </span>
        <h3 className="text-h3 font-bold md:text-h2">{title}</h3>
      </div>
      <div className="mt-6 space-y-4 text-body text-chalk-dim">{children}</div>
    </div>
  );
}

const MegaphoneIcon = (
  <svg viewBox="0 0 64 64" width="52" height="52" className="fill-none stroke-chalk" strokeWidth="4" strokeLinejoin="round">
    <path d="M8 26v12h10l22 12V14L18 26Z" />
    <path d="M46 24c5 5 5 11 0 16M53 18c9 8 9 20 0 28" strokeLinecap="round" />
  </svg>
);

const BadgeIcon = (
  <svg viewBox="0 0 64 64" width="52" height="52" className="fill-none stroke-chalk" strokeWidth="4">
    <circle cx="32" cy="32" r="26" />
    <path d="M20 34c4 8 20 8 24 0" strokeLinecap="round" />
    <circle cx="24" cy="26" r="3" className="fill-chalk" />
    <circle cx="40" cy="26" r="3" className="fill-chalk" />
  </svg>
);

export function About() {
  return (
    <section id="about" className="shell section-y" data-reveal>
      <div className="grid gap-16 md:grid-cols-2 md:gap-20">
        <InfoColumn icon={MegaphoneIcon} title="What is Khacks">
          <p>
            One day, {event.hours} — {event.duration} to build one thing well.
            You show up with an idea or nothing at all, form a team of up to
            four, and demo it before the doors close.
          </p>
          <p>
            No theme to shoehorn into. Six tracks, four special prizes, and a
            room full of mentors who would rather unblock you than watch you
            struggle politely.
          </p>
          <p>
            {event.dates} · {event.venue}. {event.venueDetail}.
          </p>
        </InfoColumn>

        <InfoColumn icon={BadgeIcon} title="Who can come">
          <p>
            High school and college students from anywhere. Roughly a third of
            the room every year has never been to a hackathon before, and the
            morning workshops exist for exactly that reason.
          </p>
          <p>
            {event.cost}. Capacity is {event.capacity}, and spots go in the
            order applications land.
          </p>
          <p className="font-display text-h3 italic text-chalk">
            &ldquo;Come alone at eight. Leave at nine with a team, a project,
            and three people who text you about side projects for years.&rdquo;
          </p>
        </InfoColumn>
      </div>
    </section>
  );
}
