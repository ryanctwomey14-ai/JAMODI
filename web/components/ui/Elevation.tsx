import { P } from "@/content/fund";

/* ============================================================================
 * THE SIGNATURE ELEMENT — the drawn elevation.
 *
 * A drafted architectural elevation of three multifamily masses, echoing the
 * building row inside the JAMODI mark. Units light in a slow, offset cycle:
 * every lit window is an occupied unit, which is the entire investment thesis
 * rendered as an image rather than asserted as a claim.
 *
 * Pure SVG + CSS animation — no JS, no hydration cost, runs off the main thread,
 * and it survives `prefers-reduced-motion` by resting fully lit.
 * ========================================================================== */

type Mass = { x: number; w: number; h: number; floors: number; bays: number };

const GROUND = 372;

const MASSES: Mass[] = [
  { x: 8, w: 138, h: 214, floors: 6, bays: 4 },
  { x: 158, w: 168, h: 302, floors: 9, bays: 5 },
  { x: 338, w: 146, h: 186, floors: 5, bays: 4 },
];

/** Deterministic 0..1 from an integer — keeps server and client render identical. */
function hash(n: number) {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

type Tone = "dark" | "light";

/** The drawing has to read on both the midnight page and the bone panel. */
const PALETTE: Record<Tone, { mass: string; massOp: string; line: string; accent: string; lit: string; dim: string }> = {
  dark:  { mass: "var(--color-navy-2)", massOp: "0.85", line: "var(--color-navy-3)",  accent: "var(--color-gold)",   lit: "var(--color-gold-soft)", dim: "var(--color-navy-3)" },
  light: { mass: "var(--color-sand)",   massOp: "1",    line: "var(--color-line-2)",  accent: "var(--color-gold-2)", lit: "var(--color-gold)",      dim: "var(--color-line-2)" },
};

export function Elevation({ className, tone = "light" }: { className?: string; tone?: Tone }) {
  const c = PALETTE[tone];
  // [placeholder] → total units under management, for the dimension line.
  const units = P;
  let seed = 0;

  return (
    <svg
      viewBox="0 0 500 410"
      className={className}
      role="img"
      aria-label="Architectural elevation of three apartment buildings with lit units"
      fill="none"
    >
      {/* ground */}
      <line x1="0" y1={GROUND} x2="500" y2={GROUND} stroke={c.accent} strokeOpacity="0.5" />

      {MASSES.map((m, mi) => {
        const top = GROUND - m.h;
        const fh = m.h / m.floors;
        const bw = m.w / m.bays;
        const winW = bw * 0.44;
        const winH = fh * 0.42;

        return (
          <g key={mi}>
            {/* mass */}
            <rect
              x={m.x}
              y={top}
              width={m.w}
              height={m.h}
              fill={c.mass}
              fillOpacity={c.massOp}
              stroke={c.line}
            />
            {/* parapet */}
            <line
              x1={m.x - 5}
              y1={top}
              x2={m.x + m.w + 5}
              y2={top}
              stroke={c.accent}
              strokeOpacity="0.55"
            />

            {/* floor slabs — the cue that reads 'multifamily' rather than 'tower' */}
            {Array.from({ length: m.floors - 1 }, (_, f) => (
              <line
                key={`s${f}`}
                x1={m.x}
                y1={top + fh * (f + 1)}
                x2={m.x + m.w}
                y2={top + fh * (f + 1)}
                stroke={c.line}
                strokeOpacity="0.75"
              />
            ))}

            {/* units */}
            {Array.from({ length: m.floors }, (_, f) =>
              Array.from({ length: m.bays }, (_, b) => {
                const r = hash(++seed);
                const lit = r > 0.42;
                return (
                  <rect
                    key={`${f}-${b}`}
                    x={m.x + b * bw + (bw - winW) / 2}
                    y={top + f * fh + (fh - winH) / 2}
                    width={winW}
                    height={winH}
                    fill={lit ? c.lit : c.dim}
                    style={{ opacity: lit ? 0.92 : 0.4 }}
                  />
                );
              })
            )}
          </g>
        );
      })}

      {/* dimension line — a drawing-sheet device carrying a real figure */}
      <g stroke={c.accent} strokeOpacity="0.45">
        <line x1="8" y1={GROUND + 22} x2="196" y2={GROUND + 22} />
        <line x1="304" y1={GROUND + 22} x2="484" y2={GROUND + 22} />
        <line x1="8" y1={GROUND + 15} x2="8" y2={GROUND + 29} />
        <line x1="484" y1={GROUND + 15} x2="484" y2={GROUND + 29} />
      </g>
      <text
        x="250"
        y={GROUND + 26}
        textAnchor="middle"
        fill={c.accent}
        fontSize="11"
        letterSpacing="2.4"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        {units === P ? "[PLACEHOLDER]" : `${units} UNITS`}
      </text>
    </svg>
  );
}
