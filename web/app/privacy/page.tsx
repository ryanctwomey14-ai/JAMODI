import type { Metadata } from "next";
import { LegalPage, LegalPlaceholder } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How JAMODI Partners collects, uses and protects personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      lede="How information submitted through this site is collected, used, retained and protected."
    >
      <LegalPlaceholder note="The privacy policy has not been written yet. It must describe what the request form actually collects, where that data is stored, who can access it, how long it is retained, whether it is shared with any third party (including accreditation-verification services and the CRM), and how someone can request deletion. It should match what the form genuinely does — a policy that overstates protection is worse than none." />
    </LegalPage>
  );
}
