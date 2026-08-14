import type { Metadata } from "next";
import { Cardinal } from "@/components/art/Cardinal";
import { Reveal } from "@/components/motion/Reveal";
import { Drift } from "@/components/motion/Drift";
import { OutlineBox } from "@/components/ui/OutlineBox";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { event } from "@/lib/event";
import { inKind, sponsorTimeline, tiers } from "@/lib/sponsors";

export const metadata: Metadata = {
  title: "Sponsor",
  description: `Sponsor ${event.name} — reach ${event.capacity} student builders across ${event.duration} in ${event.venue}.`,
};

const MAILTO = (subject: string) =>
  `mailto:${event.contact.sponsor}?subject=${encodeURIComponent(subject)}`;

export default function SponsorPage() {
  return (
    <>
      <Reveal />
      <Drift />

      <section className="shell grid gap-12 pb-16 pt-16 md:pb-24 md:pt-24 lg:grid-cols-[1.4fr_auto] lg:items-center">
        <div>
          <p className="text-fine font-bold uppercase tracking-[0.14em] text-chalk-dim">
            Partner with {event.name}
          </p>
          <h1 className="mt-6 text-h1 md:text-hero">
            Meet {event.capacity}
            <br />
            before anyone
            <br />
            else does.
          </h1>
          <p className="mt-10 max-w-xl text-body text-chalk-dim">
            Khacks puts your team in a room with Kentucky&rsquo;s most motivated
            student engineers for {event.duration} — not at a career-fair table,
            but next to them while they build. Sponsorship keeps the event free
            for every student who walks in.
          </p>
          <OutlineButton
            href={MAILTO(`${event.name} sponsorship`)}
            external
            size="lg"
            className="mt-10"
          >
            Talk to us
          </OutlineButton>
        </div>

        <div data-float className="justify-self-center lg:justify-self-end">
          <Cardinal size={190} />
        </div>
      </section>

      <section className="shell section-y" data-reveal>
        <SectionHead index="01" title="What sponsorship buys" />
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {event.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-hero font-bold">{stat.value}</span>
                <span className="mt-2 block text-fine text-chalk-dim">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 max-w-2xl text-body text-chalk-dim">
          Attendees are high school and college students from across Kentucky
          and neighbouring states. Resume books include only students who
          explicitly opt in — we never hand over a list nobody agreed to.
        </p>
      </section>

      <section className="shell section-y" data-reveal>
        <SectionHead
          index="02"
          title="Tiers"
          lede="Three levels, priced so a local shop and a national platform can both show up. Custom packages welcome."
        />

        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-3">
          {tiers.map((tier) => (
            <OutlineBox
              key={tier.name}
              tone={tier.emphasis ? "invader" : "chalk"}
              className={tier.emphasis ? "lg:-mt-6" : ""}
              innerClassName="flex h-full flex-col p-8"
            >
              <p className="text-h3 font-bold">{tier.name}</p>
              <p
                className={`mt-3 text-h1 font-bold ${
                  tier.emphasis ? "text-invader" : ""
                }`}
              >
                {tier.price}
              </p>
              <p className="mt-3 text-fine text-chalk-dim">{tier.summary}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-fine">
                    <span aria-hidden className="text-ghost">
                      +
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <OutlineButton
                href={MAILTO(`${event.name} — ${tier.name} tier`)}
                external
                variant={tier.emphasis ? "primary" : "ghost"}
                className="mt-10 self-start"
              >
                Claim {tier.name}
              </OutlineButton>
            </OutlineBox>
          ))}
        </div>

        <OutlineBox className="mt-16" innerClassName="p-8">
          <h3 className="text-h3 font-bold">{inKind.title}</h3>
          <p className="mt-3 max-w-2xl text-body text-chalk-dim">
            {inKind.detail}
          </p>
        </OutlineBox>
      </section>

      <section className="shell section-y" data-reveal>
        <SectionHead
          index="03"
          title="What happens after you sign"
          lede="No mystery window between the invoice and the event."
        />

        <ol className="max-w-3xl border-t-[length:var(--rule)] border-chalk/20">
          {sponsorTimeline.map((step) => (
            <li
              key={step.when}
              className="flex flex-col gap-2 border-b-[length:var(--rule)] border-chalk/20 py-5 sm:flex-row sm:gap-8"
            >
              <span className="w-40 shrink-0 text-fine font-bold text-ghost">
                {step.when}
              </span>
              <span className="text-body">{step.what}</span>
            </li>
          ))}
        </ol>

        <div className="mt-16">
          <h3 className="text-h2">Ready when you are.</h3>
          <p className="mt-4 max-w-xl text-body text-chalk-dim">
            Email {event.contact.sponsor} and we will send the prospectus, past
            impact numbers, and a 20-minute call slot.
          </p>
          <OutlineButton
            href={MAILTO(`${event.name} sponsorship`)}
            external
            size="lg"
            className="mt-8"
          >
            {event.contact.sponsor}
          </OutlineButton>
        </div>
      </section>
    </>
  );
}
