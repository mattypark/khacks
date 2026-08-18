import Image from "next/image";
import { Cardinal } from "@/components/art/Cardinal";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { NavLink } from "./NavLink";
import { axiom } from "@/lib/axiom";
import { event, nav } from "@/lib/event";

const LINK = "text-fine hover:text-axiom hover:underline underline-offset-4";

export function Footer() {
  return (
    <footer className="border-t-[length:var(--rule)] border-chalk/15">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
        <div>
          <p className="text-h2 font-bold">{event.name}</p>
          <p className="mt-3 max-w-sm text-fine text-chalk-dim">
            {event.tagline}. {event.dates} · {event.venue}.
          </p>
          <OutlineButton
            href={event.lumaUrl}
            external
            size="lg"
            className="mt-8"
          >
            Register on Luma
          </OutlineButton>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-fine font-bold text-chalk-dim">Site</p>
          <ul className="space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  external={"external" in item && item.external}
                  className={LINK}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-fine font-bold text-chalk-dim">Reach us</p>
          <ul className="space-y-2.5">
            <li>
              <a href={`mailto:${event.contact.general}`} className={LINK}>
                {event.contact.general}
              </a>
            </li>
            {event.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-fine font-bold text-chalk-dim">Run by</p>
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
              className="h-auto w-44 max-w-full"
            />
          </a>
          <ul className="mt-5 space-y-2.5">
            {axiom.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  {link.note}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex items-end justify-between gap-6 pb-24 pt-4">
        <p className="text-fine text-chalk-dim">
          © {new Date().getFullYear()} {event.name}, an {axiom.name} event.
          Built in Kentucky.
        </p>
        <span data-float>
          <Cardinal size={54} className="opacity-90" />
        </span>
      </div>
    </footer>
  );
}
