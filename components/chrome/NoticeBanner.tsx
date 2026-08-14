"use client";

import { useSyncExternalStore } from "react";
import { event } from "@/lib/event";

const DISMISS_KEY = "khacks:notice-dismissed";

/**
 * Tiny store so the banner reads sessionStorage during render instead of
 * setting state from an effect. The server snapshot is "dismissed", which
 * keeps the markup stable and avoids a flash before hydration.
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isDismissed() {
  return sessionStorage.getItem(DISMISS_KEY) === "1";
}

function dismiss() {
  sessionStorage.setItem(DISMISS_KEY, "1");
  listeners.forEach((listener) => listener());
}

/** Butter-yellow strip pinned to the bottom, dismissible for the session. */
export function NoticeBanner() {
  const hidden = useSyncExternalStore(subscribe, isDismissed, () => true);

  if (!event.notice || hidden) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="fixed inset-x-0 bottom-0 z-40 border-t-[length:var(--rule)] border-ink bg-butter text-ink"
    >
      <div className="shell flex items-center justify-between gap-4 py-3">
        <p className="text-fine">
          {event.notice.text}{" "}
          <a
            href={event.lumaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-4"
          >
            {event.notice.linkLabel}
          </a>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="shrink-0 px-2 text-fine font-bold hover:opacity-60"
        >
          x
        </button>
      </div>
    </div>
  );
}
