import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Process } from "@/components/sections";
import { FaqList } from "@/components/sections/FaqList";
import { Closing } from "@/components/sections/Closing";
import { pages } from "@/content/fund";

export const metadata: Metadata = {
  title: "How an investment works",
  description:
    "The sequence from a first conversation through accreditation, offering materials, subscription and quarterly reporting.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <main id="main">
      <PageHero {...pages.process} />
      <Process />
      <FaqList />
      <Closing />
    </main>
  );
}
