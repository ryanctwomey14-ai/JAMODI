import type { Metadata } from "next";
import { LegalPage, LegalPlaceholder } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms governing use of the JAMODI Partners website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      lede="The terms on which this website is made available."
    >
      <LegalPlaceholder note="The terms of use have not been written yet. They should cover permitted use of the site, ownership of its content, the absence of any advisory relationship created by using it, limitation of liability, governing law and venue, and the fact that nothing on the site constitutes an offer. Securities counsel should draft or approve them." />
    </LegalPage>
  );
}
