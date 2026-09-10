"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Shell } from "@/components/ui/Kit";
import { Reveal } from "@/components/ui/Reveal";

/* ============================================================================
 * RETURNS CALCULATOR
 *
 * Lets a reader put their own number against the targeted returns instead of
 * doing the arithmetic in their head. Two inputs — amount and hold — because
 * those are the only two variables an investor actually controls. The return
 * assumptions are ours and are not editable: letting someone dial the IRR to
 * 40% would produce a number this firm never promised.
 *
 * ---------------------------------------------------------------------------
 * THE MODEL
 * ---------------------------------------------------------------------------
 * Cash-on-cash and IRR are both given, so the exit value is *derived* rather
 * than invented — it is whatever the sale would have to return for the deal to
 * hit its target IRR after the interim distributions have been paid:
 *
 *   D  = amount x cashOnCash                      annual distribution
 *   af = (1 - (1 + irr)^-n) / irr                 annuity factor
 *   V  = (amount - D x af) x (1 + irr)^n          implied exit value
 *
 * That is the standard discounted-cash-flow identity, so the equity multiple
 * it produces stays internally consistent with the published IRR rather than
 * being a second, separately-invented number. At a five-year hold it lands
 * around 1.9x–2.4x, which brackets the stated 1.8x–2.2x target.
 *
 * ⚠ Every figure here is a projection built on assumptions that may prove
 *   wrong. The disclaimer below is not decoration and must not be removed.
 * ========================================================================== */

/** Return assumptions, low and high case. Mirrors `targetReturns`. */
const CASES = {
  low: { irr: 0.16, coc: 0.07 },
  high: { irr: 0.2, coc: 0.1 },
};

const MIN = 50_000;
const MAX = 1_000_000;
const STEP = 25_000;

function project(amount: number, years: number, irr: number, coc: number) {
  const annual = amount * coc;
  const af = (1 - Math.pow(1 + irr, -years)) / irr;
  const exit = (amount - annual * af) * Math.pow(1 + irr, years);
  const distributions = annual * years;
  const total = distributions + exit;
  return {
    annual,
    distributions,
    exit,
    total,
    profit: total - amount,
    multiple: total / amount,
    appreciation: exit - amount,
  };
}

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function ReturnsCalculator() {
  // Opens at the minimum, so the first number a reader sees is the entry point
  // rather than a figure they have to talk themselves down from.
  const [amount, setAmount] = useState(MIN);
  const [years, setYears] = useState(5);

  const low = useMemo(() => project(amount, years, CASES.low.irr, CASES.low.coc), [amount, years]);
  const high = useMemo(
    () => project(amount, years, CASES.high.irr, CASES.high.coc),
    [amount, years],
  );

  // Composition of the high case, for the stacked bar.
  const bar = useMemo(() => {
    const t = high.total;
    return {
      capital: (amount / t) * 100,
      income: (high.distributions / t) * 100,
      growth: (high.appreciation / t) * 100,
    };
  }, [amount, high]);

  const pct = (v: number, min: number, max: number) => ((v - min) / (max - min)) * 100;
  const track = (p: number) =>
    `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${p}%, var(--color-line-2) ${p}%, var(--color-line-2) 100%)`;

  return (
    // No top padding: this follows the pillars directly, and the section
    // padding on both would stack into ~300px of dead space.
    <section className="bg-canvas pb-[var(--section-y)]">
      <Shell>
        <Reveal className="mb-12 max-w-[62ch]">
          <h2 className="text-[clamp(2rem,4.2vw,3.3rem)] text-navy">
            What that looks like on your number
          </h2>
          <p className="lede mt-6">
            Set an amount and a hold period. The projection below applies the return ranges we
            underwrite to — it is arithmetic on our targets, not a forecast for any specific
            property.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            {/* ---------------- inputs ---------------- */}
            <div className="card card-raised flex flex-col gap-9 p-7 sm:p-9">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor="calc-amount"
                    className="text-[0.75rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-text"
                  >
                    Investment amount
                  </label>
                  <output
                    htmlFor="calc-amount"
                    className="num text-[1.5rem] font-semibold tracking-tight text-navy"
                  >
                    {money(amount)}
                  </output>
                </div>
                <input
                  id="calc-amount"
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={STEP}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ "--track": track(pct(amount, MIN, MAX)) } as React.CSSProperties}
                  className="calc-range mt-2"
                />
                <div className="flex justify-between text-[0.78rem] text-faint">
                  <span className="num">{money(MIN)}</span>
                  <span className="num">{money(MAX)}</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label
                    htmlFor="calc-years"
                    className="text-[0.75rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-text"
                  >
                    Hold period
                  </label>
                  <output
                    htmlFor="calc-years"
                    className="num text-[1.5rem] font-semibold tracking-tight text-navy"
                  >
                    {years} years
                  </output>
                </div>
                <input
                  id="calc-years"
                  type="range"
                  min={3}
                  max={7}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  style={{ "--track": track(pct(years, 3, 7)) } as React.CSSProperties}
                  className="calc-range mt-2"
                />
                <div className="flex justify-between text-[0.78rem] text-faint">
                  <span>3 years</span>
                  <span>7 years</span>
                </div>
              </div>

              <dl className="grid gap-3 border-t border-line pt-7 text-[0.86rem]">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-text">Target IRR applied</dt>
                  <dd className="num font-semibold text-navy">16–20%</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-text">Cash-on-cash applied</dt>
                  <dd className="num font-semibold text-navy">7–10%</dd>
                </div>
              </dl>
            </div>

            {/* ---------------- results ---------------- */}
            <div className="rounded-[var(--radius-card)] bg-navy p-7 text-onnavy sm:p-9">
              <p className="text-[0.75rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Projected over {years} years
              </p>

              <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <Figure
                  label="Annual distributions"
                  value={`${money(low.annual)} – ${money(high.annual)}`}
                  note="Paid from operations after stabilisation"
                />
                <Figure
                  label={`Distributions over ${years} years`}
                  value={`${money(low.distributions)} – ${money(high.distributions)}`}
                />
                <Figure
                  label="Total returned at exit"
                  value={`${money(low.total)} – ${money(high.total)}`}
                  note="Distributions plus sale proceeds"
                  emphasis
                />
                <Figure
                  label="Equity multiple"
                  value={`${low.multiple.toFixed(2)}× – ${high.multiple.toFixed(2)}×`}
                  emphasis
                />
              </div>

              {/* composition of the high case */}
              <div className="mt-9 border-t border-white/15 pt-7">
                <p className="text-[0.75rem] sm:text-[0.72rem] text-onnavy/60">
                  Where the upper-case total comes from
                </p>
                <div
                  className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-white/10"
                  role="img"
                  aria-label={`Composition of total: capital ${Math.round(bar.capital)}%, distributions ${Math.round(bar.income)}%, appreciation ${Math.round(bar.growth)}%`}
                >
                  <span style={{ width: `${bar.capital}%` }} className="bg-onnavy/85" />
                  <span style={{ width: `${bar.income}%` }} className="bg-gold" />
                  <span style={{ width: `${bar.growth}%` }} className="bg-gold/45" />
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem] text-onnavy/70">
                  <Key className="bg-onnavy/85">Your capital returned</Key>
                  <Key className="bg-gold">Distributions</Key>
                  <Key className="bg-gold/45">Appreciation at sale</Key>
                </ul>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-7">
                <Link href="/book-a-call" className="btn btn-onnavy">
                  Learn more
                </Link>
                <p className="text-[0.8rem] text-onnavy/60">
                  We will walk through the underwriting behind these numbers.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-7 max-w-[92ch] text-[0.78rem] leading-relaxed text-faint">
            Illustrative only. These figures are arithmetic applied to targeted returns, not a
            forecast, an offer, or a promise of performance. They assume distributions begin
            immediately and are not reinvested, exclude all fees, taxes and timing effects, and
            take no account of your individual circumstances. Actual results will differ, may be
            negative, and investors can lose some or all of their capital.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

function Figure({
  label,
  value,
  note,
  emphasis,
}: {
  label: string;
  value: string;
  note?: string;
  emphasis?: boolean;
}) {
  return (
    <div>
      <dt className="text-[0.78rem] text-onnavy/60">{label}</dt>
      <dd
        className={
          "num mt-2 font-semibold tracking-tight " +
          (emphasis ? "text-[1.5rem] text-gold" : "text-[1.35rem] text-onnavy")
        }
      >
        {value}
      </dd>
      {note && <p className="mt-1.5 text-[0.75rem] sm:text-[0.74rem] leading-snug text-onnavy/45">{note}</p>}
    </div>
  );
}

function Key({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span className={"h-2.5 w-2.5 flex-none rounded-full " + className} aria-hidden />
      {children}
    </li>
  );
}
