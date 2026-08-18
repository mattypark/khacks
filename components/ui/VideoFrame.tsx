import { OutlineBox } from "./OutlineBox";
import type { Media } from "@/lib/media";

/**
 * A video in the site's box language. The frame reserves its aspect ratio
 * whether or not a file exists yet, so filling `src` in later never shifts the
 * page. No autoplay — sponsors and students both get to choose.
 */
export function VideoFrame({
  item,
  className = "",
}: {
  item: Media;
  className?: string;
}) {
  return (
    <figure className={className}>
      <OutlineBox innerClassName="p-2">
        {item.src ? (
          <video
            controls
            preload="metadata"
            poster={item.poster ?? undefined}
            style={{ aspectRatio: item.ratio }}
            className="block w-full bg-ink-deep"
          >
            <source src={item.src} type="video/mp4" />
            Your browser cannot play this video.
          </video>
        ) : (
          <div
            style={{ aspectRatio: item.ratio }}
            className="flex w-full items-center justify-center border-[length:var(--rule)] border-dashed border-chalk/25 bg-ink-deep px-6 text-center"
          >
            <span className="text-fine text-chalk-dim">{item.placeholder}</span>
          </div>
        )}
      </OutlineBox>

      <figcaption className="mt-5 border-l-[length:var(--rule)] border-axiom pl-4 font-display text-fine italic text-chalk-dim">
        {item.caption}
      </figcaption>
    </figure>
  );
}
