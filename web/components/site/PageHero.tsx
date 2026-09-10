import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Kit";

/* The masthead every interior page opens with: title and a lede that says what
   the page covers before the reader commits to scrolling it. */
export function PageHero({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <section className="border-b border-line bg-canvas pb-[clamp(48px,6vw,84px)] pt-[clamp(48px,6vw,92px)]">
      <Shell>
        <Reveal>
          <h1 className=" max-w-[18ch] text-[clamp(2.6rem,6vw,4.8rem)] text-navy">{title}</h1>
          <p className="lede mt-8 max-w-[62ch]">{lede}</p>
        </Reveal>
      </Shell>
    </section>
  );
}
