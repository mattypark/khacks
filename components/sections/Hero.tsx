import { BarrelStack } from "@/components/art/BarrelStack";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { axiom } from "@/lib/axiom";
import { event } from "@/lib/event";

export function Hero() {
  return (
    <section className="shell grid gap-16 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.15fr_auto] lg:items-start lg:gap-10">
      <div>
        <p className="text-fine font-bold uppercase tracking-[0.16em] text-axiom">
          Presented by {axiom.name}
        </p>

        <h1 className="mt-6 text-h1 md:text-hero">
          Kentucky&rsquo;s Best
          <br />
          Hackathon
        </h1>

        <p className="mt-10 text-h3 font-bold md:text-h2">{event.name}</p>

        <OutlineButton
          href={event.lumaUrl}
          external
          size="lg"
          className="mt-8"
        >
          Register on Luma
        </OutlineButton>

        <p className="mt-12 max-w-xl text-body text-chalk-dim">
          {event.description}
        </p>

        <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          {event.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-h2 font-bold">{stat.value}</span>
                <span className="mt-1 block text-fine text-chalk-dim">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-fine text-chalk-dim">
          {event.dates} · {event.hours} · {event.venue} · {event.cost}
        </p>
      </div>

      <div
        data-barrel
        className="justify-self-center lg:justify-self-end lg:pt-6"
      >
        <BarrelStack />
      </div>
    </section>
  );
}
