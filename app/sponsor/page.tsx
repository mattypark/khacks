import type { Metadata } from "next";
import Image from "next/image";
import { Cardinal } from "@/components/art/Cardinal";
import { Reveal } from "@/components/motion/Reveal";
import { Drift } from "@/components/motion/Drift";
import { OutlineBox } from "@/components/ui/OutlineBox";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { axiom } from "@/lib/axiom";
import { event } from "@/lib/event";
import { media } from "@/lib/media";
import {
  eventOverview,
  inKind,
  sponsorTimeline,
  tiers,
  whySponsor,
} from "@/lib/sponsors";

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
          <p className="text-fine font-bold uppercase tracking-[0.14em] text-axiom">
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
            {event.name} puts your team in a room with Kentucky&rsquo;s most
            motivated student engineers for {event.duration} — not at a
            career-fair table, but next to them while they build. Sponsorship
            keeps the day free for every student who walks in.
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

      {/* --- About Axiom Pathways ------------------------------------------ */}
      <section className="shell section-y" data-reveal>
        <SectionHead index="01" title={`About ${axiom.name}`} />

        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <a
              href={axiom.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src={axiom.logo}
                alt={axiom.name}
                width={axiom.logoWidth}
                height={axiom.logoHeight}
                className="h-auto w-64 max-w-full"
                priority
              />
            </a>

            <p className="mt-8 text-body text-chalk-dim">{axiom.blurb}</p>
            <p className="mt-5 text-body text-chalk-dim">{axiom.mission}</p>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {axiom.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-h2 font-bold text-axiom">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-fine text-chalk-dim">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {axiom.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fine font-bold text-axiom underline underline-offset-4 hover:text-chalk"
                >
                  {link.note} →
                </a>
              ))}
            </div>
          </div>

          <VideoFrame item={media.recap} />
        </div>
      </section>

      {/* --- Event overview ------------------------------------------------ */}
      <section className="shell section-y" data-reveal>
        <SectionHead index="02" title="Event overview" />

        <ul className="grid max-w-4xl gap-x-10 gap-y-4 sm:grid-cols-2">
          {eventOverview.map((line) => (
            <li key={line} className="flex gap-3 text-body">
              <span aria-hidden className="text-axiom">
                ·
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* --- Tiers --------------------------------------------------------- */}
      <section className="shell section-y" data-reveal>
        <SectionHead
          index="03"
          title="Sponsorship"
          lede="Three levels, priced so a local shop and a national platform can both show up. Custom packages welcome."
        />

        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-3">
          {tiers.map((tier) => (
            <OutlineBox
              key={tier.name}
              tone={tier.emphasis ? "axiom" : "chalk"}
              className={tier.emphasis ? "lg:-mt-6" : ""}
              innerClassName="flex h-full flex-col p-8"
            >
              <p className="text-h3 font-bold">{tier.name}</p>
              <p
                className={`mt-3 text-h1 font-bold ${
                  tier.emphasis ? "text-axiom" : ""
                }`}
              >
                {tier.price}
              </p>
              <p className="mt-3 text-fine text-chalk-dim">{tier.summary}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-fine">
                    <span aria-hidden className="text-axiom">
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

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <OutlineBox innerClassName="p-8">
            <h3 className="text-h3 font-bold">{inKind.title}</h3>
            <p className="mt-3 max-w-2xl text-body text-chalk-dim">
              {inKind.detail}
            </p>
          </OutlineBox>

          <VideoFrame item={media.customMedia} className="max-w-xs" />
        </div>
      </section>

      {/* --- Why sponsor --------------------------------------------------- */}
      <section className="shell section-y" data-reveal>
        <SectionHead index="04" title="Why sponsor" />

        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {whySponsor.map((reason) => (
            <div key={reason.title}>
              <h3 className="text-h3 font-bold text-axiom">{reason.title}</h3>
              <p className="mt-4 text-body text-chalk-dim">{reason.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Timeline + close ---------------------------------------------- */}
      <section className="shell section-y" data-reveal>
        <SectionHead
          index="05"
          title="What happens after you sign"
          lede="No mystery window between the invoice and the event."
        />

        <ol className="max-w-3xl border-t-[length:var(--rule)] border-chalk/20">
          {sponsorTimeline.map((step) => (
            <li
              key={step.when}
              className="flex flex-col gap-2 border-b-[length:var(--rule)] border-chalk/20 py-5 sm:flex-row sm:gap-8"
            >
              <span className="w-40 shrink-0 text-fine font-bold text-axiom">
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

      {/* --- Links --------------------------------------------------------- */}
      <section className="shell section-y" data-reveal>
        <SectionHead index="06" title="Links" />

        <ul className="grid max-w-3xl gap-x-10 gap-y-4 sm:grid-cols-2">
          {[
            ...axiom.links.map((link) => ({
              label: link.note,
              href: link.href,
              hint: link.label,
            })),
            {
              label: "Sponsorship enquiries",
              href: MAILTO(`${event.name} sponsorship`),
              hint: event.contact.sponsor,
            },
            ...event.socials.map((social) => ({
              label: social.label,
              href: social.href,
              hint: event.name,
            })),
          ].map((link) => (
            <li
              key={link.href}
              className="border-b-[length:var(--rule)] border-chalk/15 py-3"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline justify-between gap-4 hover:text-axiom"
              >
                <span className="font-bold">{link.label}</span>
                <span className="text-fine text-chalk-dim">{link.hint}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
