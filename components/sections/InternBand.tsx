import Image from "next/image";
import { OutlineBox } from "@/components/ui/OutlineBox";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { axiom } from "@/lib/axiom";
import { event } from "@/lib/event";

/**
 * The one place on the home page that recruits for Axiom rather than the event.
 * Green-toned so it reads as a different voice from the orange register CTA.
 */
export function InternBand() {
  return (
    <section className="shell pb-4" data-reveal>
      <OutlineBox
        tone="axiom"
        innerClassName="flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-10"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <a
            href={axiom.site}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Image
              src={axiom.logo}
              alt={axiom.name}
              width={axiom.logoWidth}
              height={axiom.logoHeight}
              className="h-auto w-44"
            />
          </a>

          <div>
            <p className="text-h3 font-bold">
              {axiom.name} runs {event.shortName}.
            </p>
            <p className="mt-2 max-w-md text-fine text-chalk-dim">
              We take interns on how badly they want it, not what they have done
              already. Applications are open year-round.
            </p>
          </div>
        </div>

        <OutlineButton
          href={axiom.apply}
          external
          variant="ghost"
          size="lg"
          className="self-start md:self-auto"
        >
          Apply to be an intern
        </OutlineButton>
      </OutlineBox>
    </section>
  );
}
