import { Img as Image } from "@/components/ui/Img";
import {
  comparison,
  faqs,
  founder,
  isPlaceholder,
  journey,
  pillars,
} from "@/content/fund";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Kit";

/* ============================================================================
 * Shared sections.
 *
 * Each route composes these rather than owning its own markup, so a change to
 * the portfolio card is a change in one place. Every section takes an optional
 * heading so it can lead a page or sit inside one.
 *
 * `Placeholder` renders unconfirmed content in a way that is unmistakable at a
 * glance but does not wreck the layout — the point is that the design can be
 * reviewed while it is obvious nothing here is real yet.
 * ========================================================================== */

export function Placeholder({
  children,
  size = "md",
}: {
  children: string;
  /** "sm" for tight cells — stat figures, overlay captions — where the full
   *  chip would overflow its column. */
  size?: "sm" | "md";
}) {
  if (!isPlaceholder(children)) return <>{children}</>;
  return (
    <span
      className={
        "inline-block max-w-full truncate rounded-[3px] bg-gold-soft align-middle font-semibold leading-normal tracking-tight text-gold-2 " +
        (size === "sm" ? "px-1 py-px text-[0.62rem]" : "px-1.5 py-0.5 text-[0.8em]")
      }
    >
      [placeholder]
    </span>
  );
}

/** Section heading block: title, and an optional lede alongside. */
export function SectionHead({
  title,
  lede,
  className = "",
}: {
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
        <h2 className="text-[clamp(2.1rem,4.4vw,3.5rem)] text-navy">{title}</h2>
        {lede && <p className="lede lg:pb-1.5">{lede}</p>}
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* PILLARS                                                                     */
/* -------------------------------------------------------------------------- */
export function Pillars({ head }: { head?: { title: string; lede?: string } }) {
  return (
    <section className="section bg-canvas">
      <Shell>
        {head && <SectionHead {...head} className="mb-16" />}

        {/* No cards here on purpose. Three boxes in a row after the returns
            tiles and the bento grid would be the third boxed layout in a row.
            This is set as an editorial column rule instead: one hairline across
            the top, columns divided by verticals, a gold tick marking where
            each begins, and an oversized numeral doing the work the card
            border used to. Air replaces the container. */}
        <RevealGroup className="grid gap-x-12 gap-y-12 border-t border-line-2 pt-14 md:grid-cols-3">
          {pillars.map((p, i) => (
            <RevealItem
              key={p.title}
              className={
                "relative " +
                (i > 0
                  ? "border-t border-line pt-12 md:border-t-0 md:border-l md:border-line-2 md:pl-12 md:pt-0"
                  : "")
              }
            >
              {/* sits exactly on the section's top rule */}
              <span
                aria-hidden
                className={
                  "absolute hidden h-[2px] w-10 bg-gold md:block " +
                  (i > 0 ? "-top-14 left-[-1px]" : "-top-14 left-0")
                }
              />
              <span className="num block text-[3.25rem] font-light leading-none tracking-tight text-gold-2/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 max-w-[18ch] text-[1.55rem] text-navy">{p.title}</h3>
              <p className="mt-4 max-w-[42ch] text-[0.97rem] leading-relaxed text-muted-text">
                {p.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPARISON MATRIX                                                           */
/* -------------------------------------------------------------------------- */
export function Comparison() {
  return (
    <section className="section bg-sand">
      <Shell>
        <SectionHead
          title="How the three structures differ"
          lede={comparison.intro}
          className="mb-14"
        />

        {/* Desktop: a genuine table, so screen readers announce row and column headers */}
        <Reveal className="hidden lg:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Comparison of public equities, public REITs and private syndication across seven
              characteristics
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[15%] border-b border-line-2 pb-4 pr-6 text-[0.63rem] font-semibold uppercase tracking-[0.22em] text-faint"
                >
                  Vector
                </th>
                {comparison.columns.map((c, i) => {
                  const ours = i === comparison.columns.length - 1;
                  return (
                    <th
                      key={c}
                      scope="col"
                      className={
                        "w-[28%] pb-4 text-[0.63rem] font-semibold uppercase tracking-[0.22em] " +
                        (ours
                          ? "rounded-t-[var(--radius-frame)] bg-navy px-6 pt-6 text-gold"
                          : "border-b border-line-2 pr-6 text-faint")
                      }
                    >
                      {c}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((r, ri) => {
                const last = ri === comparison.rows.length - 1;
                return (
                  <tr key={r.vector}>
                    <th
                      scope="row"
                      className="border-b border-line-2 py-6 pr-6 align-top text-[0.95rem] font-semibold text-navy"
                    >
                      {r.vector}
                    </th>
                    {r.values.map((v, i) => {
                      const ours = i === r.values.length - 1;
                      return (
                        <td
                          key={i}
                          className={
                            "py-6 align-top text-[0.93rem] leading-relaxed " +
                            (ours
                              ? "bg-navy px-6 text-onnavy " +
                                (last ? "rounded-b-[var(--radius-frame)] pb-8" : "")
                              : "border-b border-line-2 pr-6 text-muted-text")
                          }
                        >
                          {v}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile: stacked cards rather than a sideways scroll */}
        <div className="grid gap-3 lg:hidden">
          {comparison.rows.map((r) => (
            <div key={r.vector} className="card p-6">
              <p className="font-semibold text-navy">{r.vector}</p>
              <dl className="mt-4 grid gap-3">
                {r.values.map((v, i) => {
                  const ours = i === r.values.length - 1;
                  return (
                    <div
                      key={i}
                      className={ours ? "rounded-[10px] bg-navy px-4 py-3.5" : "border-l border-line-2 pl-4"}
                    >
                      <dt
                        className={
                          "text-[0.6rem] font-semibold uppercase tracking-[0.2em] " +
                          (ours ? "text-gold" : "text-faint")
                        }
                      >
                        {comparison.columns[i]}
                      </dt>
                      <dd className={"mt-1.5 text-[0.9rem] leading-relaxed " + (ours ? "text-onnavy" : "text-muted-text")}>
                        {v}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PROCESS                                                                     */
/* -------------------------------------------------------------------------- */
/**
 * A stepper rather than a list. The numbered track above the cards states the
 * shape of the process before any of it is read — four stages, in order — and
 * the connector makes the sequence literal instead of implied.
 *
 * Dark, because this sits on an otherwise light page and the sequence is the
 * thing a reader has come to understand. The track is hidden below `lg`, where
 * the cards stack and a horizontal connector would be lying about the layout.
 */
export function Process({ head }: { head?: { title: string; lede?: string } }) {
  return (
    <section className="section relative isolate overflow-hidden bg-obsidian">
      {/* The mark as a full-bleed watermark. Decorative, so it is hidden from
          assistive technology. `object-cover` makes it genuinely fill the
          section at any aspect ratio rather than sitting as a shape inside it;
          the trade is that the edges crop, which is what a watermark wants. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/brand/jamodi-mark.png"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="scale-[1.15] object-cover object-center opacity-[0.08]"
        />
        {/* Pulls contrast out of the centre, where the headline and cards sit,
            so the mark stays a field rather than competing with the copy. */}
        <div className="absolute inset-0 bg-[radial-gradient(68%_62%_at_50%_50%,var(--color-obsidian)_22%,transparent_80%)]" />
      </div>

      <Shell className="relative">
        {head ? (
          <div className="mx-auto mb-16 max-w-[62ch] text-center">
            <h2 className="text-[clamp(2rem,4.2vw,3.3rem)] text-onnavy">{head.title}</h2>
            {head.lede && (
              <p className="mt-6 text-[1.02rem] leading-relaxed text-onnavy/65">{head.lede}</p>
            )}
          </div>
        ) : (
          <div className="mx-auto mb-16 max-w-[62ch] text-center">
            <h2 className="text-[clamp(2rem,4.2vw,3.3rem)] text-onnavy">
              Four stages, in order
            </h2>
          </div>
        )}

        {/* connector track — decorative, so it is hidden from assistive tech */}
        <div aria-hidden className="mb-8 hidden items-center px-[12.5%] lg:flex">
          {journey.map((s2, i) => (
            <div key={s2.title} className="flex flex-1 items-center last:flex-none">
              <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-white/20 bg-white/[0.06] text-[0.8rem] font-semibold text-onnavy">
                {i + 1}
              </span>
              {i < journey.length - 1 && <span className="h-px flex-1 bg-white/15" />}
            </div>
          ))}
        </div>

        <RevealGroup as="ol" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {journey.map((s2, i) => (
            // The card is nested inside RevealItem rather than merged with it:
            // Framer Motion writes an inline `transform` for the reveal, which
            // would beat a CSS :hover transform on the same node.
            <RevealItem key={s2.title} as="li" className="flex">
              <div className="step-card flex w-full flex-col p-7">
                <span
                  className="mb-6 grid h-11 w-11 place-items-center rounded-[10px] bg-white/[0.07] text-[0.9rem] font-semibold text-gold lg:hidden"
                  aria-hidden
                >
                  {i + 1}
                </span>

                <h3 className="text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-onnavy">
                  {s2.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-onnavy/60">{s2.body}</p>

                <ul className="step-card__rule mt-6 grid gap-2.5 border-t border-white/10 pt-5">
                  {s2.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-2.5 text-[0.86rem] leading-snug text-onnavy/75"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] grid h-2.5 w-2.5 flex-none place-items-center rounded-full border border-gold/60"
                      >
                        <span className="h-1 w-1 rounded-full bg-gold" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* LEADERSHIP                                                                  */
/* -------------------------------------------------------------------------- */
export function FounderBio({ head }: { head?: { title: string; lede?: string } }) {
  return (
    <section className="section bg-canvas">
      <Shell>
        {head && <SectionHead {...head} className="mb-14" />}

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="plate aspect-[4/5]">
              <Image
                src={founder.portrait}
                alt={founder.name + ", " + founder.name + " of JAMODI Partners"}
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover object-[54%_18%]"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-5">
              <p className="text-[1.3rem] text-navy">{founder.name}</p>
              <p className="text-[0.64rem] font-medium uppercase tracking-[0.24em] text-muted-text">
                <Placeholder size="sm">{founder.role}</Placeholder>
              </p>
            </div>
          </Reveal>

          <div>
            <RevealGroup className="grid gap-5">
              {founder.paragraphs.map((p, i) => (
                <RevealItem key={i} as="p" className="text-[1.06rem] leading-relaxed text-muted-text">
                  <Placeholder>{p}</Placeholder>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ (static markup; the interactive version lives in FaqList)               */
/* -------------------------------------------------------------------------- */
export { FaqList } from "./FaqList";
export { faqs };
