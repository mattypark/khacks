import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { team, type Organizer } from "@/lib/team";

/** Initials placeholder so the grid reads as intentional before photos land. */
function AvatarFallback({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="flex aspect-square w-full items-center justify-center bg-ink-deep">
      <span className="text-h1 font-bold text-chalk-dim">{initials}</span>
    </div>
  );
}

function OrganizerCard({ person }: { person: Organizer }) {
  const body = (
    <>
      <div className="border-b-[length:var(--rule)] border-chalk">
        {person.photo ? (
          <Image
            src={person.photo}
            alt=""
            width={400}
            height={400}
            className="aspect-square w-full object-cover"
          />
        ) : (
          <AvatarFallback name={person.name} />
        )}
      </div>
      <div className="p-5">
        <p className="font-bold">{person.name}</p>
        <p className="mt-1 text-fine text-chalk-dim">{person.role}</p>
      </div>
    </>
  );

  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute inset-0 translate-x-[var(--offset)] translate-y-[var(--offset)] bg-chalk"
      />
      <div className="relative border-[length:var(--rule)] border-chalk bg-ink-raised">
        {person.href ? (
          <a
            href={person.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-ghost"
          >
            {body}
          </a>
        ) : (
          body
        )}
      </div>
    </li>
  );
}

export function Team() {
  return (
    <section id="team" className="shell section-y" data-reveal>
      <SectionHead
        index="04"
        title="Organizers"
        lede="Students and alumni who wanted a hackathon in Kentucky worth flying in for, and got tired of waiting for someone else to run it."
      />

      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((person) => (
          <OrganizerCard key={person.name} person={person} />
        ))}
      </ul>
    </section>
  );
}
