import { CalendarRange, MoveUpRight } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { targetReturns } from "@/content/fund";

/* ============================================================================
 * Target returns.
 *
 * Structure is the stats-section-with-text layout: a copy column on the left,
 * a 2×2 metric grid on the right. It reads from `content/fund.ts` rather than
 * hardcoding figures, so the numbers stay in the one file everything else on
 * this site is edited from.
 *
 * Two deliberate changes to the stock component:
 *  · `text-xl md:text-3xl md:text-5xl` declared the `md` breakpoint twice, so
 *    `md:text-3xl` never applied. Corrected to md → lg.
 *  · `font-regular` is not a Tailwind class and silently did nothing. Weight is
 *    left to the global heading rule so this matches the rest of the site.
 *
 * The hold-period tile uses a calendar rather than a down arrow: the stock
 * component pairs `MoveDownLeft` with `text-destructive`, and a red downward
 * arrow beside "3–7 years" would read as bad news about a neutral fact.
 *
 * The tiles are dark on the light section so the figures read as the one thing
 * to look at. Hover behaviour lives in `.metric-tile` in globals.css.
 * ========================================================================== */

function Stats() {
  return (
    <div className="w-full bg-canvas py-20 lg:py-32">
      <div className="container mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <Reveal className="flex flex-col items-start gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-left text-xl tracking-tighter md:text-3xl lg:max-w-lg lg:text-5xl">
                {targetReturns.title}
              </h2>
              <p className="text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-[48ch]">
                {targetReturns.body}
              </p>
            </div>
            <p className="mt-2 max-w-[52ch] text-left text-[0.78rem] leading-relaxed text-faint">
              {targetReturns.note}
            </p>
          </Reveal>

          <div className="flex items-center justify-center">
            <RevealGroup className="grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-2">
              {targetReturns.metrics.map((m) => {
                const Icon = m.trend === "up" ? MoveUpRight : CalendarRange;
                return (
                  // The tile is nested inside RevealItem rather than merged with
                  // it: Framer Motion writes an inline `transform` for the
                  // reveal, which would override the CSS :hover lift on the
                  // same node. Motion owns the outer transform, hover the inner.
                  <RevealItem key={m.label} className="flex">
                    <div className="metric-tile flex w-full flex-col justify-between gap-0 p-6">
                    <Icon
                      className={
                        "metric-tile__icon mb-10 h-4 w-4 " +
                        (m.trend === "up"
                          ? "metric-tile__icon--up text-gold"
                          : "text-onnavy-muted")
                      }
                      aria-hidden
                    />
                    <h3 className="flex max-w-xl flex-row items-end gap-3 text-left text-4xl tracking-tighter text-onnavy">
                      <span className="num">{m.value}</span>
                      <span className="text-sm font-normal tracking-normal text-onnavy-muted">
                        {m.unit}
                      </span>
                    </h3>
                    <p className="max-w-xl text-left text-base leading-relaxed tracking-tight text-onnavy-muted">
                      {m.label}
                    </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Stats };
