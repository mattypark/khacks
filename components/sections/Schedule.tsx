import { SectionHead } from "@/components/ui/SectionHead";
import { schedule } from "@/lib/schedule";

export function Schedule() {
  return (
    <section id="schedule" className="shell section-y" data-reveal>
      <SectionHead
        index="02"
        title="Run of show"
        lede="Times are provisional until the venue is confirmed. Submissions close hard — everything else has slack in it."
      />

      <div className="grid gap-14 md:grid-cols-2 md:gap-16">
        {schedule.map((day) => (
          <div key={day.label}>
            <div className="flex items-baseline gap-4 border-b-[length:var(--rule)] border-chalk pb-4">
              <h3 className="text-h3 font-bold">{day.label}</h3>
              <span className="text-fine text-chalk-dim">{day.date}</span>
            </div>

            <ol className="mt-2">
              {day.slots.map((slot) => (
                <li
                  key={`${day.label}-${slot.time}`}
                  className="flex gap-5 border-b-[length:var(--rule)] border-chalk/15 py-4 last:border-b-0"
                >
                  <span
                    className={`w-16 shrink-0 text-fine font-bold ${
                      slot.key ? "text-ghost" : "text-chalk-dim"
                    }`}
                  >
                    {slot.time}
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold">
                      {slot.key ? (
                        <span
                          aria-hidden
                          className="mr-2 inline-block size-2 translate-y-[-2px] bg-ghost"
                        />
                      ) : null}
                      {slot.title}
                    </span>
                    {slot.detail ? (
                      <span className="mt-1 block text-fine text-chalk-dim">
                        {slot.detail}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
