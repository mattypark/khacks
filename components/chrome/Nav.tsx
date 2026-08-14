"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { event, nav } from "@/lib/event";

export function Nav() {
  const [open, setOpen] = useState(false);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b-[length:var(--rule)] border-chalk/15 bg-ink/90 backdrop-blur-sm">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <LogoMark />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-fine font-bold text-chalk-dim transition-colors duration-150 hover:text-chalk"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <OutlineButton href={event.lumaUrl} external>
            Register
          </OutlineButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="border-[length:var(--rule)] border-chalk px-3 py-2 text-fine font-bold lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
            className="border-t-[length:var(--rule)] border-chalk/15 bg-ink lg:hidden"
          >
            <nav aria-label="Primary, mobile" className="shell flex flex-col py-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b-[length:var(--rule)] border-chalk/15 py-4 text-h3 font-bold last:border-b-0"
                >
                  {item.label}
                </Link>
              ))}
              <OutlineButton
                href={event.lumaUrl}
                external
                size="lg"
                className="mt-8 self-start"
              >
                Register on Luma
              </OutlineButton>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
