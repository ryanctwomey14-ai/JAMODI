import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { firm } from "@/content/fund";
import { asset } from "@/lib/basePath";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "./globals.css";

/* ONE TYPEFACE, TAKEN FROM THE LOGO.
   ---------------------------------------------------------------------------
   The JAMODI lockup is set in a heavy geometric sans — narrow oval bowls, a
   pointed A apex, a full-depth M vertex, a hooked J — with "PARTNERS" beneath
   it in the same family at Light with very wide tracking. Montserrat is the
   closest widely-available match, and it carries the whole site: 800 for the
   wordmark register in headlines, 300 tracked out for labels so they echo the
   "PARTNERS" line, and 400 for reading.

   Self-hosted at build time by next/font: no render-blocking request to
   Google, no FOIT, and a size-adjusted fallback so the swap costs ~0 CLS. */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

/* The canonical production domain. The GitHub Pages review build overrides it
   with NEXT_PUBLIC_SITE_URL so canonicals and OG images resolve against the
   URL the page is actually being served from. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jamodipartners.com"; // VERIFY production domain

/* The review build is a private-by-convention preview of a securities-adjacent
   site that has not been through compliance review. It must never be indexed —
   it would compete with the real domain and expose unreviewed offering
   language to search. */
const IS_PREVIEW = process.env.GITHUB_PAGES === "true";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${firm.name} — Private Multifamily Real Estate for Accredited Investors`,
    template: `%s · ${firm.name}`,
  },
  description:
    "JAMODI Partners acquires and operates value-add multifamily communities for accredited " +
    "investors — tax-advantaged passive income, quarterly distributions, and direct ownership " +
    "of institutional-quality apartments.",
  keywords: [
    "multifamily real estate fund",
    "apartment syndication for accredited investors",
    "passive real estate investing",
    "value-add multifamily",
    "Reg D 506(c) real estate offering",
    "tax-advantaged passive income",
    "real estate private equity",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: firm.name,
    title: `${firm.name} — Institutional multifamily. Private access.`,
    description:
      "The asset class endowments and pensions have held for decades — acquired, operated " +
      "and reported on for a closed circle of accredited investors.",
    images: [{ url: "/media/og.jpg", width: 1200, height: 630, alt: `${firm.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${firm.name} — Institutional multifamily. Private access.`,
    description:
      "Value-add multifamily acquisitions for accredited investors. Quarterly distributions " +
      "and institutional-grade underwriting.",
    images: ["/media/og.jpg"],
  },
  robots: IS_PREVIEW
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
  icons: { icon: asset("/brand/favicon.png"), apple: asset("/brand/favicon.png") },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf9",
  width: "device-width",
  initialScale: 1,
  // Never cap zoom — capping it fails WCAG 1.4.4.
};

/* Structured data. Investors and their advisers google the sponsor by name;
   this is what makes the knowledge panel resolve to the firm rather than to a
   scraped directory listing. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: firm.name,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/jamodi-logo.png`,
  image: `${SITE_URL}/media/og.jpg`,
  // Placeholder-valued fields are omitted entirely rather than published as
  // "[placeholder]" — structured data is machine-read, and a placeholder there
  // is worse than an absent field.
  description:
    "Private real estate sponsor acquiring and operating value-add multifamily communities " +
    "for accredited investors under Regulation D.",
  areaServed: "United States",
  knowsAbout: [
    "Value-add multifamily acquisition",
    "Real estate syndication",
    "Cost segregation and bonus depreciation",
    "Regulation D Rule 506(c) offerings",
  ],
  founder: { "@type": "Person", name: "Tiffany Vanarsdel" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={montserrat.variable}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-navy focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-onnavy"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          // Static, author-controlled object — not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
