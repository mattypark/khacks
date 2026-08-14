import { BarrelStack } from "@/components/art/BarrelStack";
import { Ghost } from "@/components/art/Ghost";
import { WireBarrel } from "@/components/motion/WireBarrel";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { event } from "@/lib/event";

export function Hero() {
  return (
    <section className="shell grid gap-16 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.15fr_auto] lg:items-start lg:gap-10">
      <div>
        <h1 className="text-h1 md:text-hero">
          Kentucky&rsquo;s Best
          <br />
          Hackathon
        </h1>

        <p className="mt-10 text-h3 font-bold md:text-h2">{event.name}</p>

        <div className="mt-8 flex items-center gap-5">
          <span data-float>
            <Ghost size={66} />
          </span>
          <OutlineButton href={event.lumaUrl} external size="lg">
            Register on Luma
          </OutlineButton>
        </div>

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
        className="relative justify-self-center lg:justify-self-end lg:pt-6"
      >
        <WireBarrel className="pointer-events-none absolute -left-24 top-24 hidden w-[320px] lg:block" />
        <BarrelStack className="relative" />
      </div>
    </section>
  );
}
