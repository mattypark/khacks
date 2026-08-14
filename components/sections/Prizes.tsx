import { OutlineBox } from "@/components/ui/OutlineBox";
import { SectionHead } from "@/components/ui/SectionHead";
import { prizes, specialPrizes, trackPrizes } from "@/lib/prizes";

export function Prizes() {
  return (
    <section id="prizes" className="shell section-y" data-reveal>
      <SectionHead
        index="03"
        title="Prizes"
        lede="Cash, split evenly across the winning team. Every team is eligible for the grand prize, their track prize, and all four specials at once."
      />

      <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
        {prizes.map((prize) => (
          <OutlineBox
            key={prize.place}
            as="li"
            tone={prize.emphasis ? "invader" : "chalk"}
            className={prize.emphasis ? "md:-mt-6" : ""}
            innerClassName={prize.emphasis ? "p-8 md:p-10" : "p-8"}
          >
            <p className="text-fine font-bold uppercase tracking-[0.12em] text-chalk-dim">
              {prize.place}
            </p>
            <p
              className={`mt-4 font-bold ${
                prize.emphasis ? "text-hero text-invader" : "text-h1"
              }`}
            >
              {prize.amount}
            </p>
            <p className="mt-5 text-fine text-chalk-dim">{prize.detail}</p>
          </OutlineBox>
        ))}
      </ul>

      <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <h3 className="text-h3 font-bold">Track prizes</h3>
          <p className="mt-4 text-body text-chalk-dim">
            <span className="font-bold text-chalk">{trackPrizes.amount}</span>{" "}
            {trackPrizes.detail}
          </p>
        </div>

        <div>
          <h3 className="text-h3 font-bold">Specials</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {specialPrizes.map((special) => (
              <li key={special.name}>
                <p className="font-bold">{special.name}</p>
                <p className="mt-1 text-fine text-chalk-dim">
                  {special.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
