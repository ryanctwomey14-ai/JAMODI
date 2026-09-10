import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Comparison, Pillars } from "@/components/sections";
import { ReturnsCalculator } from "@/components/sections/ReturnsCalculator";
import { Closing } from "@/components/sections/Closing";
import { pages } from "@/content/fund";

export const metadata: Metadata = {
  title: "Why multifamily",
  description:
    "Why apartment communities have been a core institutional holding for decades, and how private syndication compares with public equities and REITs.",
  alternates: { canonical: "/why-multifamily" },
};

export default function WhyMultifamilyPage() {
  return (
    <main id="main">
      <PageHero {...pages.approach} />
      <Pillars />
      <ReturnsCalculator />
      <Comparison />
      <Closing />
    </main>
  );
}
