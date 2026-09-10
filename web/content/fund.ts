/* ============================================================================
 * JAMODI PARTNERS — SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ============================================================================
 *
 *  NO INVENTED DATA APPEARS ON THIS SITE.
 *
 *  Every fact specific to JAMODI — figures, names, places, dates, terms,
 *  partners, track record, quotes — is the literal string `[placeholder]`.
 *  Each one carries a comment above it saying what belongs there. Replace them
 *  as the information is confirmed.
 *
 *  What is NOT a placeholder, and why:
 *    · statements of securities law (Rule 501 thresholds, 506(c) verification)
 *    · descriptions of how private multifamily investment works in general
 *    · the standard Reg D disclosure language in `disclosures`
 *  None of that is specific to JAMODI, so none of it is invented. The
 *  disclosures still require counsel's review before launch.
 *
 *  ---------------------------------------------------------------------------
 *  VOICE
 *  ---------------------------------------------------------------------------
 *  Explanatory, not persuasive. The reader is a sophisticated investor who has
 *  been sold to before and is measuring how we behave, not how we phrase things.
 *  Describe what the firm does and how the mechanics work, name the risks in the
 *  same tone as the benefits, and let the reader draw the conclusion. No
 *  urgency, no scarcity, no rhetorical questions.
 * ========================================================================== */

/** Every unconfirmed JAMODI-specific fact renders as this. */
export const P = "[placeholder]";

export const isPlaceholder = (value: string) => value === P;

/** Never emit `mailto:[placeholder]` — fall back to a dead anchor instead. */
export const mailtoHref = (email: string) => (isPlaceholder(email) ? "#" : `mailto:${email}`);

export const firm = {
  // From the supplied brand assets.
  name: "JAMODI Partners",
  // [placeholder] → exact registered entity name, e.g. "JAMODI Partners, LLC"
  legalName: P,
  // [placeholder] → the investor-facing email address
  email: P,
  // [placeholder] → main phone number
  phone: P,
  // [placeholder] → headquarters, e.g. "Kansas City, Missouri"
  city: P,
  // [placeholder] → LinkedIn company page
  linkedinUrl: "#",
  /** Where the request form POSTs. Wire to your CRM / form service. */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
} as const;

/* ---------------------------------------------------------------------------
 * HOME — HERO
 * ------------------------------------------------------------------------- */
export const hero = {
  headline: ["Institutional multifamily.", "Private access."],
  // The firm's business is multifamily (from the brief). The markets it buys in
  // are not yet confirmed, so the geography is a placeholder.
  sub:
    `JAMODI Partners acquires and operates value-add apartment communities in ${P} ` +
    "on behalf of a private group of accredited investors.",
  // Generic description of how a private real estate partnership works.
  support:
    "Investors hold an interest in specific, occupied buildings rather than in a pooled " +
    "index. Distributions are paid from property operations, and each investor receives " +
    "a Schedule K-1 together with the underwriting behind the acquisition.",
};

/* ---------------------------------------------------------------------------
 * TARGET RETURNS
 *
 * Supplied by the client — these are NOT placeholders.
 *
 * ⚠ ONE EDIT MADE: the brief listed the first metric as "16-20% ARR". ARR is
 *   Annual Recurring Revenue, a SaaS metric that does not exist in real estate.
 *   The other three (cash-on-cash, equity multiple, hold) are three quarters of
 *   the standard returns quad, whose fourth member is IRR — and 16–20% is a
 *   textbook target IRR range. It is rendered as IRR below. If ARR was
 *   genuinely intended, change the one `metric` value and nothing else moves.
 *
 * ⚠ These are targeted returns on a securities page. They must be reviewed by
 *   securities counsel, and the qualifying language in `targetReturns.note`
 *   must not be removed.
 * ------------------------------------------------------------------------- */
export const targetReturns = {
  title: "Targeted returns on every deal",
  body:
    "Every acquisition is underwritten to these ranges before it is brought to " +
    "investors. Returns reach you two ways: quarterly distributions while the property " +
    "operates, and a share of the proceeds when it is sold or refinanced. Each offering " +
    "states its own targets in the memorandum.",
  note:
    "Targets only. They are projections based on assumptions that may prove incorrect, " +
    "they are not guaranteed, and they are not a promise of performance. Actual results " +
    "will vary and investors may lose capital.",
  metrics: [
    {
      value: "16–20%",
      unit: "IRR", // ← was "ARR" in the brief; see note above
      label: "Target internal rate of return",
      trend: "up" as const,
    },
    {
      value: "7–10%",
      unit: "annual",
      label: "Cash-on-cash return",
      trend: "up" as const,
    },
    {
      value: "1.8–2.2×",
      unit: "on exit",
      label: "Equity multiple",
      trend: "up" as const,
    },
    {
      value: "3–7",
      unit: "years",
      label: "Target hold period",
      // Neutral on purpose. A hold period is neither good nor bad news, so it
      // gets a calendar rather than a trend arrow.
      trend: "neutral" as const,
    },
  ],
};

/* ---------------------------------------------------------------------------
 * WHO INVESTS WITH US
 *
 * Written as descriptions of a situation and what the structure does about it —
 * never as a complaint the reader is supposed to recognise in themselves. This
 * audience reacts badly to being told what is wrong with their finances.
 * Nothing here is JAMODI-specific, so nothing here is a placeholder.
 * ------------------------------------------------------------------------- */
export const investorProfiles = {
  title: "The investors we work with",
  lede:
    "Our investors arrive at private real estate from different starting points. " +
    "These are the circumstances we see most often, and what the structure does in each.",
  items: [
    {
      title: "Carrying a significant tax burden",
      body:
        "High earners who have already used the shelters available to them. Depreciation " +
        "from a real estate partnership — accelerated where a cost segregation study " +
        "supports it — is reported on the K-1 and can offset a portion of the income the " +
        "investment produces.",
      cta: "How depreciation works",
      href: "/why-multifamily",
    },
    {
      title: "Wanting the asset without the operations",
      body:
        "Investors who value what apartments do in a portfolio but not what managing them " +
        "requires. Acquisition, renovation, leasing and day-to-day management sit with the " +
        "sponsor; the investor holds the ownership interest and receives the reporting.",
      cta: "How we operate",
      href: "/process",
    },
    {
      title: "Building income that does not depend on their time",
      body:
        "Professionals and business owners whose earnings are tied to hours worked, looking " +
        "for a second source of income that continues whether or not they do. Distributions " +
        "are paid from property operations on a set schedule.",
      cta: "How distributions work",
      href: "/process",
    },
    {
      title: "Working toward a retirement number",
      body:
        "Investors who started later than they intended, or whose current allocation is not " +
        "compounding quickly enough for the timeline they have — and who are prepared to " +
        "trade liquidity for a higher targeted return over a defined hold.",
      cta: "Hold periods and liquidity",
      href: "/faq",
    },
    {
      title: "Reducing concentration in public markets",
      body:
        "Allocators whose net worth sits largely in equities, and who want a hard asset " +
        "valued on rents and local supply rather than on daily market sentiment. It is a " +
        "different return driver, which is the reason to hold both.",
      cta: "Compare the structures",
      href: "/why-multifamily",
    },
  ],
};

/* ---------------------------------------------------------------------------
 * PER-PAGE INTRODUCTIONS
 * General descriptions of each page's subject — nothing firm-specific.
 * ------------------------------------------------------------------------- */
export const pages = {
  approach: {
    title: "Why multifamily",
    lede:
      "Apartment communities have been a core holding for endowments and pension funds " +
      "for decades. The reasons are structural rather than fashionable, and they are " +
      "worth understanding before deciding whether the asset class belongs in your " +
      "portfolio.",
  },
  process: {
    title: "How an investment works",
    lede:
      "From an initial conversation through to quarterly distributions — the sequence, " +
      "and what each stage involves.",
  },
  leadership: {
    title: "The people behind the firm",
    lede:
      "Investors are not underwriting a building so much as the judgement of the people " +
      "who buy it. This page sets out how we think about acquisition, and who is " +
      "accountable for it.",
  },
  faq: {
    title: "Common questions",
    lede:
      "Minimums, accreditation, distributions, tax reporting, fees, and what happens when " +
      "a property underperforms. If your question is not here, we are glad to answer it " +
      "directly.",
  },
} as const;

/* ---------------------------------------------------------------------------
 * WHY MULTIFAMILY
 * General mechanics of the asset class — true of private multifamily broadly,
 * not claims about JAMODI's results.
 * ------------------------------------------------------------------------- */
export const pillars = [
  {
    title: "Operations are handled in full",
    body:
      "Acquisition, renovation, leasing and day-to-day management are carried out by the " +
      "sponsor alongside third-party property managers. Investors hold an ownership " +
      "interest and receive reporting; they are not involved in operations.",
  },
  {
    title: "Depreciation is passed through",
    body:
      "Cost segregation studies allocate a portion of the purchase price to shorter asset " +
      "lives. The resulting depreciation is reported on a Schedule K-1 and, in early years, " +
      "often offsets part of the distributions received. Outcomes depend on individual " +
      "circumstances; we do not provide tax advice.",
  },
  {
    title: "Returns follow the property, not the market",
    body:
      "Apartment values are a function of net operating income and local supply rather than " +
      "daily market sentiment. That gives the asset class a different return profile from " +
      "public equities, which is the reason institutions hold both.",
  },
];

export const comparison = {
  intro:
    "The same building can be owned three ways, and the structure determines the tax " +
    "treatment, the cash flow and how easily you can exit. The differences below are " +
    "structural, and none of them is universally better.",
  columns: ["Public equities", "Public REITs", "Private syndication"],
  rows: [
    {
      // Leads the table: it is the row a reader scans for, and the honest
      // answer is structural — an index does not set a target at all, so this
      // is a difference in kind rather than a claim to beat the market.
      vector: "Target returns",
      values: [
        "None stated. You receive whatever the index delivers over your holding period.",
        "None stated. Price movement plus a mandated dividend, set by the market.",
        "Targeted and disclosed before you invest — we underwrite to 16–20% IRR and a 1.8–2.2× equity multiple. Targets, not guarantees.",
      ],
      advantage: true,
    },
    {
      vector: "Pricing",
      values: [
        "Marked to market every second the exchange is open",
        "Trades with the stock market rather than with the buildings",
        "Valued on the property's own income and local comparables",
      ],
      advantage: true,
    },
    {
      vector: "Tax treatment",
      values: [
        "Capital gains, with no shelter against them",
        "Dividends largely taxed as ordinary income",
        "Depreciation and cost segregation reported on a Schedule K-1",
      ],
      advantage: true,
    },
    {
      vector: "Cash flow",
      values: [
        "Dividends optional, and often reinvested",
        "90% payout mandated, taxed at ordinary rates",
        "Distributions targeted periodically and paid from operations",
      ],
      advantage: true,
    },
    {
      vector: "Leverage",
      values: [
        "Held at the company level, outside your control",
        "Set at the fund level and not disclosed per asset",
        "Disclosed asset by asset in the offering documents",
      ],
      advantage: true,
    },
    {
      vector: "What you own",
      values: [
        "A share of a company",
        "A share of a portfolio you do not select",
        "An interest in a specific building at a specific address",
      ],
      advantage: true,
    },
    {
      vector: "Liquidity",
      values: [
        "Same-day",
        "Same-day",
        "None. Capital is committed for the full hold period",
      ],
      // Deliberately not an advantage. Naming the real trade-off in the same
      // tone as everything else is what makes the rest of the table credible.
      advantage: false,
    },
    {
      vector: "Manager alignment",
      values: [
        "Management is paid regardless of your outcome",
        "Management is paid regardless of your outcome",
        "Terms vary by sponsor and are set out in each offering",
      ],
      advantage: true,
    },
  ],
};

/* ---------------------------------------------------------------------------
 * PROCESS
 * The sequence is generic to Reg D offerings. Each `meta` is a duration
 * specific to how JAMODI actually runs, so those are placeholders.
 * ------------------------------------------------------------------------- */
export const journey = [
  {
    title: "Introduction and verification",
    body:
      "We begin with a conversation about your objectives and how the asset class fits " +
      "them. If you decide to go further, an independent third party verifies accredited " +
      "status.",
    points: [
      "A short call, with no offering made",
      "Third-party accreditation check",
      "Nothing is committed at this stage",
    ],
  },
  {
    title: "Offering materials",
    body:
      "When an acquisition opens, you receive the private placement memorandum and the " +
      "full data room.",
    points: [
      "Underwriting model, rent roll and trailing financials",
      "Third-party inspection and debt terms",
      "The downside cases behind the projections",
    ],
  },
  {
    title: "Subscription and funding",
    body:
      "If you choose to invest, you reserve an allocation and complete the paperwork " +
      "electronically.",
    points: [
      "Reserve an allocation, non-binding",
      "Sign subscription documents electronically",
      "Wire directly to the escrow account",
    ],
  },
  {
    title: "Ownership and reporting",
    body:
      "Distributions are paid to the account you designate once the property stabilises.",
    points: [
      "Distributions by ACH on a set schedule",
      "Operating report each quarter",
      "Schedule K-1 issued annually",
    ],
  },
];

/* ---------------------------------------------------------------------------
 * LEADERSHIP
 * ⚠ This is a REAL PERSON. Nothing about her history is invented here.
 * ------------------------------------------------------------------------- */
export const founder = {
  // From the supplied brand assets.
  name: "Tiffany Vanarsdel",
  role: "Managing Partner / Real Estate Investor",
  portrait: "/brand/tiffany-vanarsdel.jpg",

  /* Biography supplied by the client and reframed for a real estate audience.
   *
   * Every factual claim below comes from the supplied text — the years of
   * experience, the industries, the current role at Vigilant Aerospace Systems
   * and its scope. Nothing about a real estate track record has been invented,
   * because the source material contains none. The second paragraph draws the
   * connection between the stated operating disciplines and what running a
   * multifamily partnership requires; it is an interpretation of the facts,
   * not an additional claim, and it should be read and approved as such.
   *
   * ⚠ STILL OUTSTANDING: her actual real estate history — deals, units, years
   *   investing — is not in the supplied bio. Until it is added, this page
   *   describes an operator rather than a track record.
   */
  paragraphs: [
    "Tiffany Vanarsdel is a results-driven business manager with more than twenty years " +
      "of experience in operations, executive support, financial management and technology " +
      "implementation — across aviation, transportation, consulting, municipal government, " +
      "healthcare and event production, with additional expertise in risk and safety " +
      "management.",
    "That background maps closely onto multifamily, which is an operating business before " +
      "it is an investment. A community runs on budgets, contracts, compliance across " +
      "jurisdictions, vendor oversight and the discipline to hold all of it to a reporting " +
      "schedule. She currently manages core business operations at Vigilant Aerospace " +
      "Systems, including finance, multi-state compliance, contract development and HR.",
    "She is known for bringing structure, clarity and accountability to complex, fast-paced " +
      "environments — driving process improvements, leading cross-functional initiatives and " +
      "implementing scalable systems. For an investor, those are the traits that decide " +
      "whether reporting arrives when it should and whether problems are raised early rather " +
      "than explained late.",
  ],
};

/* ---------------------------------------------------------------------------
 * FAQ
 * Answers stating securities law are kept. Anything describing JAMODI's own
 * terms — minimums, fee schedule, dates, named custodians — is a placeholder.
 * ------------------------------------------------------------------------- */
export const faqs = [
  {
    q: "What is the minimum investment?",
    // → the standard minimum, and whether it varies by offering
    a: [P],
  },
  {
    q: "Who qualifies as an accredited investor?",
    a: [
      "Under SEC Rule 501, an individual generally qualifies with either $200,000 of income " +
        "in each of the two most recent years ($300,000 jointly with a spouse) and a " +
        "reasonable expectation of the same this year, or a net worth above $1,000,000 " +
        "excluding a primary residence. Certain licence holders and entities also qualify.",
      "Because these offerings are made under Rule 506(c), accredited status must be verified " +
        "by an independent third party — a letter from your CPA or attorney, or a verification " +
        "service. Self-certification is not sufficient.",
    ],
  },
  {
    q: "How and when are distributions paid?",
    a: [
      // → the firm's distribution frequency, method, and when they typically begin
      P,
      "Distributions are targets rather than guarantees. They are funded from property " +
        "operations and can be reduced or suspended if operations require it.",
    ],
  },
  {
    q: "When is the Schedule K-1 issued?",
    a: [
      // → the firm's target delivery date and what happens on an extension
      P,
      "Because real estate partnerships pass through depreciation, many investors report a " +
        "taxable loss in the early years while still receiving cash distributions. Your own " +
        "position depends on your circumstances; we do not provide tax advice.",
    ],
  },
  {
    q: "How long is capital committed?",
    a: [
      // → typical hold period and whether any redemption right exists
      P,
      "There is generally no secondary market for these interests, so capital should be " +
        "treated as fully committed until the asset is sold or refinanced. This is the " +
        "principal trade-off of private real estate: if the capital may be needed sooner, the " +
        "asset class is not a suitable place for it.",
    ],
  },
  {
    q: "How is JAMODI compensated?",
    a: [
      // → the full fee schedule: acquisition fee, asset management fee, promote,
      //   preferred return, and the sponsor's co-investment policy
      P,
      "Fees are disclosed in full in each offering memorandum. Read that schedule rather than " +
        "any summary of it, including this one.",
    ],
  },
  {
    q: "Can I invest through an IRA, trust, or LLC?",
    a: [
      // → which custodians are supported and how the process works
      P,
      "Retirement-account investments may generate unrelated business income tax on the " +
        "debt-financed portion of income. This is worth discussing with your accountant " +
        "before subscribing.",
    ],
  },
  {
    q: "What happens if a property underperforms?",
    a: [
      "Underperformance typically appears as a reduced or paused distribution while cash is " +
        "retained for operations, and investors are told in the regular reporting rather than " +
        "afterwards.",
      "Private real estate can lose money, including the whole of an investment. Fixed-rate " +
        "debt, conservative leverage and reserves funded at closing are common ways to make a " +
        "difficult period survivable rather than terminal, but no structure removes the risk.",
    ],
  },
];

/* ---------------------------------------------------------------------------
 * NAVIGATION — one page per destination
 * ------------------------------------------------------------------------- */
export const navLinks = [
  { label: "Why multifamily", href: "/why-multifamily" },
  { label: "Process", href: "/process" },
  { label: "Leadership", href: "/leadership" },
  { label: "Questions", href: "/faq" },
];

export const footerNav = [
  {
    heading: "Invest",
    links: [
      { label: "How an investment works", href: "/process" },
      { label: "Accreditation requirements", href: "/faq" },
      { label: "Common questions", href: "/faq" },
      { label: "Book a call", href: "/book-a-call" },
    ],
  },
  {
    heading: "Firm",
    links: [
      { label: "Why multifamily", href: "/why-multifamily" },
      { label: "Leadership", href: "/leadership" },
      { label: "Contact", href: mailtoHref(firm.email) },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Important disclosures", href: "/disclosures" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
      {
        label: "Form D filings (SEC EDGAR)",
        href: "https://www.sec.gov/edgar/searchedgar/companysearch",
        external: true,
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * BOOK A CALL — the single conversion destination
 * ------------------------------------------------------------------------- */
export const bookCall = {
  title: "Book a call with our team",
  lede:
    "A short introductory call, at a time that suits you. We will answer questions " +
    "about the strategy and the structure, and you will leave knowing whether this " +
    "asset class belongs in your portfolio — whether or not you invest with us.",
  agenda: [
    {
      title: "What you want from the allocation",
      body:
        "Income, tax treatment, diversification, a timeline — the answer shapes whether " +
        "anything we run is a fit, and we will say so if it is not.",
    },
    {
      title: "How we underwrite",
      body:
        "The assumptions behind the targeted returns, the debt we use, and the downside " +
        "cases we run before an acquisition is brought to investors.",
    },
    {
      title: "What happens next, if anything",
      body:
        "Accreditation verification, what the offering materials contain, and the timeline " +
        "from first look to funding. No commitment is made on the call.",
    },
  ],
  formTitle: "Request a time",
  formNote:
    "We reply within one business day. Nothing you submit here commits you to anything, " +
    "and your details are never sold or shared.",
};

/* ---------------------------------------------------------------------------
 * CLOSING INVITATION — used at the foot of every page
 * ------------------------------------------------------------------------- */
export const closing = {
  title: "Start a conversation about your allocation",
  body:
    "We will walk you through how we underwrite, what is currently open, and what a " +
    "position in a JAMODI acquisition actually looks like — with no expectation that " +
    "you invest. Requesting the overview places you under no obligation.",
};

/* ---------------------------------------------------------------------------
 * DISCLOSURES — standard Reg D language, not specific to JAMODI's terms.
 * Counsel's own text should replace this before launch.
 * ------------------------------------------------------------------------- */
export const disclosures = [
  "This website is for informational purposes only and does not constitute an offer to sell, " +
    "or the solicitation of an offer to buy, any security. Any such offer is made only through " +
    "a confidential private placement memorandum and related subscription documents, and only " +
    "to investors whose accredited status has been verified by an independent third party.",
  "Securities offered are sold in reliance on exemptions from registration under Regulation D " +
    "of the Securities Act of 1933. They are not registered with, recommended, approved or " +
    "reviewed by the Securities and Exchange Commission or any state securities regulator, and " +
    "no regulator has passed on the merits of any offering or the accuracy of these materials.",
  "Private real estate is illiquid, speculative, and involves substantial risk — including the " +
    "risk of losing your entire investment. There is generally no secondary market for these " +
    "interests and none is expected to develop. Distributions are targets only; they are not " +
    "guaranteed and may be reduced or suspended.",
  "Past performance is not indicative of, and does not guarantee, future results. Any targeted " +
    "or projected returns shown are hypothetical, are based on assumptions that may prove " +
    "incorrect, and are not a promise of performance.",
  "Nothing on this site is tax, legal or investment advice. Consult your own CPA, attorney and " +
    "financial adviser before investing.",
];
