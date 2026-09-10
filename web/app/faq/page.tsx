import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { Closing } from "@/components/sections/Closing";
import { faqs, isPlaceholder, pages } from "@/content/fund";

export const metadata: Metadata = {
  title: "Common questions",
  description:
    "Minimums, accreditation, distributions, K-1 timing, fees, retirement accounts, and what happens when a property underperforms.",
  alternates: { canonical: "/faq" },
};

/* Only publish questions whose answers are real. A FAQPage entry reading
   "[placeholder]" would be worse than no structured data at all. */
const answered = faqs.filter((f) => f.a.some((a) => !isPlaceholder(a)));
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: answered.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a.filter((a) => !isPlaceholder(a)).join(" "),
    },
  })),
};

export default function FaqPage() {
  return (
    <main id="main">
      <PageHero {...pages.faq} />
      <FaqList withAside={false} />
      <Closing />
      {answered.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </main>
  );
}
