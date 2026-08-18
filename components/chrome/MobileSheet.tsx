"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "./NavLink";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { event, nav } from "@/lib/event";

/**
 * Framer-driven mobile menu. Loaded on demand by Nav so framer-motion never
 * lands in the initial desktop bundle.
 */
export function MobileSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
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
              <NavLink
                key={item.href}
                href={item.href}
                external={"external" in item && item.external}
                onClick={onClose}
                className={`border-b-[length:var(--rule)] border-chalk/15 py-4 text-h3 font-bold last:border-b-0 ${
                  "external" in item && item.external ? "text-axiom" : ""
                }`}
              >
                {item.label}
              </NavLink>
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
  );
}
