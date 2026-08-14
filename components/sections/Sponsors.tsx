import { OutlineButton } from "@/components/ui/OutlineButton";
import { SectionHead } from "@/components/ui/SectionHead";
import { tiers } from "@/lib/sponsors";

/** Empty slots until logos are confirmed — an honest placeholder beats a gap. */
function LogoSlot({ label }: { label?: string }) {
  return (
    <div className="flex h-20 items-center justify-center border-[length:var(--rule)] border-dashed border-chalk/25 px-6">
      <span className="text-fine text-chalk-dim">{label ?? "Your logo"}</span>
    </div>
  );
}

export function Sponsors() {
  return (
    <section id="sponsors" className="shell section-y" data-reveal>
      <SectionHead
        index="05"
        title="Sponsors"
        lede="Khacks is free because companies pay for it. In return they get a weekend inside a room of people who build things without being asked to."
      />

      <div className="space-y-12">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="grid gap-6 border-t-[length:var(--rule)] border-chalk/20 pt-8 md:grid-cols-[14rem_1fr] md:gap-10"
          >
            <div>
              <h3 className="text-h3 font-bold">{tier.name}</h3>
              <p className="mt-1 text-fine text-chalk-dim">{tier.summary}</p>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {tier.logos.length > 0
                ? tier.logos.map((logo) => (
                    <LogoSlot key={logo.name} label={logo.name} />
                  ))
                : Array.from({ length: tier.emphasis ? 2 : 4 }).map((_, i) => (
                    <LogoSlot key={i} />
                  ))}
            </div>
          </div>
        ))}
      </div>

      <OutlineButton href="/sponsor" variant="ghost" size="lg" className="mt-16">
        Sponsor Khacks →
      </OutlineButton>
    </section>
  );
}
