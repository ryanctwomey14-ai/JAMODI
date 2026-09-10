import { closing, firm, isPlaceholder, mailtoHref } from "@/content/fund";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Kit";

/* ============================================================================
 * CLOSING INVITATION — the foot of every page.
 *
 * It does not sell again. By this point the reader has the argument, the
 * evidence and the risks; the job is to lower the cost of the next step and
 * say plainly that nothing is being committed.
 *
 * Form: a near-black field with a warm glow rising from the bottom centre, and
 * one action in the middle of it. Everything else on this site is light, so
 * ending on black makes the last thing on the page unmissable without raising
 * its voice. The glow is two stacked radials — a wide falloff under a tighter
 * core — because a single gradient reads as a flat ellipse rather than light.
 *
 * Motion: hovering anywhere in the section lifts the glow. The two layers
 * travel different distances and scale from `origin-bottom`, so it reads as
 * light blooming upward rather than a shape sliding. 800ms — atmosphere, not a
 * control, so the usual sub-300ms UI budget does not apply. transform only,
 * pointer-gated, and `motion-safe` so it does not run under reduced motion.
 * ========================================================================== */

export function Closing() {
  const emailKnown = !isPlaceholder(firm.email);

  return (
    <section id="contact" className="cta-panel scroll-mt-28 bg-obsidian">
      <div aria-hidden className="cta-glow cta-glow--wide" />
      <div aria-hidden className="cta-glow cta-glow--core" />

      <Shell className="relative py-[clamp(96px,13vw,178px)] text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] text-[clamp(2.3rem,5.4vw,4.2rem)] leading-[1.04] text-onnavy">
            {closing.title}
          </h2>

          <p className="mx-auto mt-7 max-w-[54ch] text-[1.02rem] leading-relaxed text-onnavy/70">
            {closing.body}
          </p>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href="/book-a-call" className="btn btn-onnavy">
              Learn more
            </Link>
            {emailKnown && (
              <a
                href={mailtoHref(firm.email)}
                className="text-[0.94rem] text-onnavy/70 underline-offset-4 transition-colors duration-200 hover:text-onnavy hover:underline"
              >
                {firm.email}
              </a>
            )}
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
