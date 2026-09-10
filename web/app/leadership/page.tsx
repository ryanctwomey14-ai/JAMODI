import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { FounderBio } from "@/components/sections";
import { Closing } from "@/components/sections/Closing";
import { pages } from "@/content/fund";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "How JAMODI Partners approaches acquisition and underwriting, and who is accountable for it.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  return (
    <main id="main">
      <PageHero {...pages.leadership} />
      <FounderBio />
      <Closing />
    </main>
  );
}
