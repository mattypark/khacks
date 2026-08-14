import { TrackArt } from "@/components/art/TrackArt";
import { SectionHead } from "@/components/ui/SectionHead";
import { tracks } from "@/lib/tracks";

export function Tracks() {
  return (
    <section id="tracks" className="shell section-y" data-reveal>
      <SectionHead
        index="01"
        title="Six tracks"
        lede="Pick one at submission, not before. Every track has its own $750 prize, and the grand prize is judged across all of them."
      />

      <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track) => (
          <li key={track.index} className="group">
            <div className="relative">
              <span
                aria-hidden
                className="absolute inset-0 translate-x-[var(--offset)] translate-y-[var(--offset)] bg-chalk"
              />
              {/* Hover lifts the front box off its shadow — transform only. */}
              <div className="relative border-[length:var(--rule)] border-chalk bg-chalk p-2 transition-transform duration-200 ease-[var(--ease-out-quart)] motion-safe:group-hover:-translate-x-[3px] motion-safe:group-hover:-translate-y-[3px]">
                <TrackArt kind={track.art} />
              </div>
            </div>

            <p className="mt-7 text-h3 font-bold">
              <span className="text-chalk-dim">Track {track.index}</span>
              <br />
              {track.name}
            </p>
            <p className="mt-3 text-fine text-chalk-dim">{track.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
