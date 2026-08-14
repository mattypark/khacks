import type { TrackArt as TrackArtKind } from "@/lib/tracks";

/**
 * Line drawings for the track tiles — black ink on a chalk square, the way the
 * reference site handles its part covers. Fill stays empty everywhere.
 */

const ART: Record<TrackArtKind, React.ReactNode> = {
  browser: (
    <>
      <rect x="24" y="38" width="152" height="124" />
      <path d="M24 68h152" />
      <circle cx="40" cy="53" r="5" />
      <circle cx="58" cy="53" r="5" />
      <circle cx="76" cy="53" r="5" />
      <path d="M46 92h60M46 112h84M46 132h44" />
    </>
  ),
  neurons: (
    <>
      <path d="M46 60 118 44M46 60 104 104M46 60 62 140M118 44 104 104M104 104 156 88M104 104 148 148M62 140 104 104M62 140 148 148" />
      <circle cx="46" cy="60" r="12" />
      <circle cx="118" cy="44" r="9" />
      <circle cx="104" cy="104" r="14" />
      <circle cx="62" cy="140" r="10" />
      <circle cx="156" cy="88" r="8" />
      <circle cx="148" cy="148" r="11" />
    </>
  ),
  circuit: (
    <>
      <path d="M28 46h48v40h44V46h32M28 100h30v54h62v-30h60M92 154v20M156 46v34h20M60 100V64H36" />
      <circle cx="76" cy="86" r="7" />
      <circle cx="120" cy="124" r="7" />
      <rect x="132" y="90" width="34" height="26" />
    </>
  ),
  joystick: (
    <>
      <rect x="24" y="62" width="152" height="82" rx="6" />
      <path d="M52 88v30M37 103h30" />
      <circle cx="128" cy="94" r="9" />
      <circle cx="150" cy="116" r="9" />
      <circle cx="106" cy="116" r="9" />
      <path d="M74 40h52" />
    </>
  ),
  river: (
    <>
      <path d="M20 30c34 26 4 52 30 78s58 14 62 62" />
      <path d="M64 26c30 30 2 54 26 78s54 18 58 62" />
      <path d="M120 44h34v22h-34zM40 148h30v22H40z" />
      <path d="M137 44V30M55 148v-14" />
    </>
  ),
  dice: (
    <>
      <rect x="34" y="52" width="96" height="96" />
      <path d="M34 52 66 24h96v96l-32 28" />
      <path d="M130 52 162 24" />
      <circle cx="60" cy="78" r="6" />
      <circle cx="104" cy="78" r="6" />
      <circle cx="82" cy="100" r="6" />
      <circle cx="60" cy="122" r="6" />
      <circle cx="104" cy="122" r="6" />
    </>
  ),
};

export function TrackArt({ kind }: { kind: TrackArtKind }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className="block aspect-square w-full bg-chalk"
    >
      <g
        className="fill-none stroke-ink"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ART[kind]}
      </g>
    </svg>
  );
}
