import { Img as Image } from "@/components/ui/Img";
import { Banknote, Building2, PieChart, ReceiptText, Target } from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Kit";
import { investorProfiles } from "@/content/fund";

/* ============================================================================
 * WHO INVESTS WITH US
 *
 * Five circumstances, laid out on the bento grid. Copy lives in
 * content/fund.ts; the grid spans, icons and card washes are layout concerns
 * and live here.
 *
 * Each card's CTA points at the page that actually answers it, rather than five
 * identical "Learn more" links — the link is more useful than the pattern.
 *
 * On backgrounds: the stock component expects a decorative image per card. Real
 * photography is deliberately not used here. Every image on this site that
 * shows a building implies JAMODI owns it, and these cards describe investor
 * circumstances, not assets. Each card gets a soft brand-keyed wash instead —
 * depth without an implied claim.
 * ========================================================================== */

const ICONS = [ReceiptText, Building2, Banknote, Target, PieChart];


/**
 * 2+1 over 1+1+1. The reference layout spans cards across three rows, which
 * works when each card is carrying a large background image — these carry a
 * paragraph, and at three rows tall they opened up a void above the text. This
 * keeps the varied bento rhythm without the empty space, and gives the first
 * card double width as the feature.
 */
const SPANS = [
  "lg:col-span-2 lg:row-start-1",
  "lg:col-span-1 lg:row-start-1",
  "lg:col-span-1 lg:row-start-2",
  "lg:col-span-1 lg:row-start-2",
  "lg:col-span-1 lg:row-start-2",
];

/**
 * Optional background photography, one per card, in the order the items are
 * declared in content/fund.ts.
 *
 * Leave an entry as `null` and that card falls back to the soft wash below —
 * so the grid never breaks while images are still being produced. To switch a
 * card over, save the file to /public/media/cards/ and set its path here.
 * Nothing else needs to change.
 *
 * Images must be BRIGHT and LOW-CONTRAST: these are white cards with navy
 * text, and the scrim can only do so much. Weight the subject to the right —
 * the copy occupies the lower left.
 */
const CARD_IMAGES: (string | null)[] = [
  "/media/cards/tax.jpg",
  "/media/cards/operations.jpg",
  "/media/cards/income.jpg",
  "/media/cards/retirement.jpg",
  "/media/cards/diversification.jpg",
];

/**
 * Crop anchor per image. The first card is double width, so its 16:9 source is
 * cropped top and bottom and wants centring; the narrow cards crop left/right
 * and are anchored to keep their subject in frame.
 */
const CARD_POSITIONS = [
  "object-center",
  "object-[68%_center]",
  "object-[72%_center]",
  "object-center",
  "object-[60%_center]",
];

/** Soft radial washes — the fallback when a card has no photograph yet. */
const WASHES = [
  "absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--color-gold-soft),transparent_70%)] opacity-70",
  "absolute -right-24 -top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,var(--color-sand),transparent_72%)] opacity-90",
  "absolute -right-20 -bottom-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--color-gold-soft),transparent_70%)] opacity-60",
  "absolute -right-14 -top-14 h-48 w-48 rounded-full bg-[radial-gradient(circle,var(--color-sand),transparent_70%)] opacity-90",
  "absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-gold-soft),transparent_72%)] opacity-60",
];

export function InvestorProfiles() {
  return (
    <section className="section bg-sand">
      <Shell>
        <Reveal className="mb-14 max-w-[62ch]">
          <h2 className="text-[clamp(2.1rem,4.4vw,3.5rem)] text-navy">
            {investorProfiles.title}
          </h2>
          <p className="lede mt-7">{investorProfiles.lede}</p>
        </Reveal>

        <Reveal>
          <BentoGrid className="auto-rows-[17rem] lg:grid-rows-2">
            {investorProfiles.items.map((item, i) => (
              <BentoCard
                key={item.title}
                Icon={ICONS[i]}
                name={item.title}
                description={item.body}
                href={item.href}
                cta={item.cta}
                className={SPANS[i]}
                background={
                  CARD_IMAGES[i] ? (
                    <div className="absolute inset-0">
                      <Image
                        src={CARD_IMAGES[i] as string}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className={"object-cover opacity-[0.55] " + CARD_POSITIONS[i]}
                      />
                      {/* keeps navy body copy legible over photography: a
                          white wash across the lower left, where the text is */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, var(--color-paper) 16%, color-mix(in oklab, var(--color-paper) 82%, transparent) 48%, transparent 80%), " +
                            "linear-gradient(to right, var(--color-paper) 2%, color-mix(in oklab, var(--color-paper) 64%, transparent) 40%, transparent 74%)",
                        }}
                      />
                    </div>
                  ) : (
                    <div className={WASHES[i]} />
                  )
                }
              />
            ))}
          </BentoGrid>
        </Reveal>
      </Shell>
    </section>
  );
}
