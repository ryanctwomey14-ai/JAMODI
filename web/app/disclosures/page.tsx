import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { disclosures } from "@/content/fund";

export const metadata: Metadata = {
  title: "Important disclosures",
  description: "Regulation D disclosures relating to offerings by JAMODI Partners.",
  alternates: { canonical: "/disclosures" },
  robots: { index: true, follow: true },
};

export default function DisclosuresPage() {
  return (
    <LegalPage
      title="Important disclosures"
      lede="These disclosures apply to this website and to every offering described on it. They are drafted to the standard Regulation D language and must be reviewed and adopted by securities counsel before launch."
    >
      {disclosures.map((d) => (
        <p key={d.slice(0, 28)}>{d}</p>
      ))}
      <p className="border-t border-line pt-6 text-[0.9rem] text-faint">
        Nothing on this site has been reviewed or approved by any securities regulator. If any
        statement here conflicts with the offering documents for a specific investment, the offering
        documents govern.
      </p>
    </LegalPage>
  );
}
