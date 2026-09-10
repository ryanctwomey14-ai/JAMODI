"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Img as Image } from "@/components/ui/Img";
import { hero } from "@/content/fund";
import { Shell } from "@/components/ui/Kit";
import { asset } from "@/lib/basePath";

/* ============================================================================
 * HOME — HERO
 *
 * Job: say what the firm is and what it does, to whom, in one screen — and
 * offer two ways forward. One for a reader ready to be contacted, one for a
 * reader who would rather read about the asset class first. The second is the
 * majority, and a single "invest now" would waste them.
 *
 * Form: aerial footage of a community, running behind the copy. This is the one
 * dark band on an otherwise light site, which is what makes it land — and the
 * footage is real, so it carries the weight the rest of the page's placeholder
 * imagery cannot.
 *
 * Video handling:
 *  · muted + playsInline + autoPlay — the three attributes iOS requires before
 *    it will play inline rather than opening fullscreen.
 *  · The source is a ping-pong loop (forward, then reversed), so the seam is
 *    invisible instead of cutting back to frame one.
 *  · Decorative, so aria-hidden and removed from the tab order.
 *  · Under prefers-reduced-motion the video is not rendered at all — the poster
 *    frame is shown instead. Auto-playing footage is precisely what that
 *    setting exists to stop.
 *  · A poster frame paints immediately, so the band is never empty.
 * ========================================================================== */

const EASE = [0.23, 1, 0.32, 1] as const;
const POSTER = asset("/video/hero-poster.jpg");

function Sub({ text }: { text: string }) {
  // The geography inside the sentence is unconfirmed; mark just that word.
  const parts = text.split("[placeholder]");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <span className="rounded-[4px] bg-gold/25 px-1.5 py-0.5 text-[0.82em] font-semibold tracking-tight text-gold-soft">
        [placeholder]
      </span>
      {parts[1]}
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const parent = { hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } } };
  const child = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(20px)" },
    shown: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.72, ease: EASE } },
  };

  return (
    <section className="relative isolate flex min-h-[540px] flex-col overflow-hidden bg-navy lg:min-h-[620px]">
      {/* ---------- footage ---------- */}
      {reduce ? (
        <Image
          src={POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={asset("/video/hero.mp4")} type="video/mp4" />
        </video>
      )}

      {/* ---------- scrims: legibility over footage is non-negotiable ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,color-mix(in_oklab,var(--color-navy)_92%,transparent)_0%,color-mix(in_oklab,var(--color-navy)_72%,transparent)_42%,color-mix(in_oklab,var(--color-navy)_58%,transparent)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-navy)_80%,transparent),transparent)]"
      />

      <Shell className="relative flex flex-1 flex-col justify-center py-[clamp(64px,8vw,112px)]">
        <motion.div
          variants={parent}
          initial="hidden"
          animate="shown"
          className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-14"
        >
          <div>
            <motion.h1
              variants={child}
              className="text-[clamp(2.35rem,5.5vw,4.5rem)] leading-[1.03] text-onnavy"
            >
              {hero.headline[0]}
              <br />
              <span className="text-gold">{hero.headline[1]}</span>
            </motion.h1>

            <motion.p
              variants={child}
              className="mt-8 max-w-[50ch] text-[clamp(1.02rem,1.4vw,1.18rem)] leading-[1.68] text-onnavy-muted"
            >
              <Sub text={hero.sub} />
            </motion.p>

            <motion.div variants={child} className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/book-a-call" className="btn btn-onnavy">
                Learn more
              </Link>
              <Link href="/why-multifamily" className="btn btn-ghost-navy">
                Why multifamily
              </Link>
            </motion.div>
          </div>

          <motion.div variants={child} className="lg:pb-2">
            <div className="h-px w-full bg-white/15 lg:hidden" />
            <p className="mt-8 max-w-[46ch] text-[1rem] leading-relaxed text-onnavy/85 lg:mt-0 lg:border-l lg:border-white/25 lg:pl-9">
              {hero.support}
            </p>
          </motion.div>
        </motion.div>

      </Shell>
    </section>
  );
}
