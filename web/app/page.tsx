import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/sections";
import { Stats } from "@/components/ui/stats-section-with-text";
import { InvestorProfiles } from "@/components/sections/InvestorProfiles";
import { Closing } from "@/components/sections/Closing";

/* ============================================================================
 * HOME
 *
 * The home page introduces the firm and points to the depth rather than
 * containing all of it. Order: what this is → what it targets → who it suits →
 * how the asset class works → how to begin. The portfolio lives on
 * its own page and is reached from the hero and the nav.
 *
 * Target returns sit directly under the hero: it is the first question this
 * audience asks, and answering it before the argument starts buys the
 * attention the rest of the page needs.
 * ========================================================================== */

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Stats />
      <InvestorProfiles />
      <Pillars
        head={{
          title: "What owning private multifamily involves",
          lede:
            "Three structural features do most of the work. None of them is unique to us — they are why institutions have held apartments for decades.",
        }}
      />
      <Closing />
    </main>
  );
}
