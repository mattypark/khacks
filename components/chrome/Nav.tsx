"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LogoMark } from "./LogoMark";
import { NavLink } from "./NavLink";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { event, nav } from "@/lib/event";

// framer-motion is only needed once someone opens the mobile menu.
const MobileSheet = dynamic(
  () => import("./MobileSheet").then((m) => m.MobileSheet),
  { ssr: false },
);

export function Nav() {
  const [open, setOpen] = useState(false);
  // Stays true after the first open so the exit animation can play out.
  const [sheetMounted, setSheetMounted] = useState(false);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggle = () => {
    setSheetMounted(true);
    setOpen((v) => !v);
  };

  return (
    <header className="sticky top-0 z-40 border-b-[length:var(--rule)] border-chalk/15 bg-ink/90 backdrop-blur-sm">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <LogoMark />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              external={"external" in item && item.external}
              className={`text-fine font-bold transition-colors duration-150 ${
                "external" in item && item.external
                  ? "text-axiom hover:text-chalk"
                  : "text-chalk-dim hover:text-chalk"
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <OutlineButton href={event.lumaUrl} external>
            Register
          </OutlineButton>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="border-[length:var(--rule)] border-chalk px-3 py-2 text-fine font-bold lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {sheetMounted ? (
        <MobileSheet open={open} onClose={() => setOpen(false)} />
      ) : null}
    </header>
  );
}
