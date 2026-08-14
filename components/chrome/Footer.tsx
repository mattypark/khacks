import Link from "next/link";
import { Cardinal } from "@/components/art/Cardinal";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { event, nav } from "@/lib/event";

export function Footer() {
  return (
    <footer className="border-t-[length:var(--rule)] border-chalk/15">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
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
                <Link
                  href={item.href}
                  className="text-fine hover:text-ghost hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-fine font-bold text-chalk-dim">Reach us</p>
          <ul className="space-y-2.5">
            <li>
              <a
                href={`mailto:${event.contact.general}`}
                className="text-fine hover:text-ghost hover:underline underline-offset-4"
              >
                {event.contact.general}
              </a>
            </li>
            {event.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fine hover:text-ghost hover:underline underline-offset-4"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex items-end justify-between gap-6 pb-24 pt-4">
        <p className="text-fine text-chalk-dim">
          © {new Date().getFullYear()} {event.name}. Built in Kentucky.
        </p>
        <span data-float>
          <Cardinal size={54} className="opacity-90" />
        </span>
      </div>
    </footer>
  );
}
