import { AccordionItem } from "@/components/ui/Accordion";
import { SectionHead } from "@/components/ui/SectionHead";
import { faqs } from "@/lib/faq";
import { event } from "@/lib/event";

export function Faq() {
  return (
    <section id="faq" className="shell section-y" data-reveal>
      <SectionHead
        index="06"
        title="Questions"
        lede={
          <>
            Anything missing? Email{" "}
            <a
              href={`mailto:${event.contact.general}`}
              className="text-chalk underline underline-offset-4 hover:text-ghost"
            >
              {event.contact.general}
            </a>{" "}
            and a human answers.
          </>
        }
      />

      <div className="max-w-3xl border-t-[length:var(--rule)] border-chalk/20">
        {faqs.map((faq) => (
          <AccordionItem key={faq.q} question={faq.q}>
            {faq.a}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}
