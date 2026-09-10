# Pre-launch checklist — facts to verify

**Do not put this site in front of investors until every box below is ticked.**

This is a securities-adjacent website. Every performance figure, biographical
claim and testimonial on it is currently a placeholder taken from the brief, and
none of it has been verified. All of it lives in one file — `content/fund.ts` —
so nothing has to be hunted for in the markup.

---

## 1. Firm details — `content/fund.ts` → `firm`

- [ ] `legalName` — exact registered entity name as filed
- [ ] `email` — is `invest@jamodipartners.com` live?
- [ ] `phone` — currently `(555) 010-4400`, a **placeholder**
- [ ] `city` — headquarters
- [ ] `portalUrl` — the real investor portal URL
- [ ] `SITE_URL` in `app/layout.tsx` — the production domain

## 2. Performance figures — `glanceMetrics` ⚠ HIGHEST RISK

Currently `$150M+ AUM · 22.4% average realized IRR · 100% capital returned ·
1,860 units`. These came from the brief as illustrative examples.

- [ ] Confirm each figure against actual records
- [ ] Confirm the IRR is **realized**, and state the calculation method and the
      period it covers
- [ ] Confirm "100% capital returned" is literally true across **all** full-cycle
      deals, with no exceptions
- [ ] Have counsel confirm the presentation meets advertising-rule requirements

If any figure cannot be evidenced, delete it. A shorter honest list converts
better than a longer one that a diligencing investor can puncture.

## 2b. Target returns — `targetReturns` ⚠ CLIENT-SUPPLIED, NOT PLACEHOLDER

16–20% IRR · 7–10% cash-on-cash · 1.8–2.2× equity multiple · 3–7 year hold.

- [ ] **The brief said "ARR"; the site renders "IRR".** ARR is a SaaS metric and
      does not exist in real estate; the other three are three quarters of the
      standard returns quad whose fourth member is IRR. Confirm IRR is correct,
      or change the one `unit` value in `content/fund.ts`.
- [ ] Confirm each range against the underwriting model
- [ ] Confirm whether these are **net to investor** or gross, and say which
- [ ] Securities counsel reviews the presentation of targeted returns
- [ ] Do not remove the qualifying language in `targetReturns.note`

## 3. Deals — `deals`

All three (Parkline Residences, Brightwater Commons, Cedar House) are invented
placeholders.

- [ ] Replace with real assets: name, city, unit count, status
- [ ] Confirm target IRR, equity multiple and hold period per offering documents
- [ ] Confirm each one-line thesis is accurate (loan rates, occupancy, price per
      door, replacement cost, supply claims)
- [ ] Replace `/public/media/asset-*.jpg` with real property photography

## 4. Leadership — `founder`

Title and biography are now **client-supplied**, not placeholders. The bio was
reframed for a real estate audience: every factual claim comes from the supplied
text, and the paragraph linking her operating background to multifamily is an
interpretation of those facts rather than a new claim. Read it and confirm the
framing is one she is happy to stand behind.

- [ ] Tiffany approves the reframed wording
- [ ] **Her real estate history is still missing.** The supplied bio contains no
      deals, units, or years investing. Until that is added the page presents a
      capable operator rather than a track record — which is a gap a diligencing
      investor will notice on a sponsor's leadership page.
- [ ] Confirm "Vigilant Aerospace Systems" may be named publicly on this site

## 6. Terms and fees — `faqs`

- [ ] Minimum investment (currently stated as $50,000)
- [ ] Fee schedule — acquisition fee, asset management fee, promote
- [ ] Preferred return and waterfall description
- [ ] GP co-investment policy — the FAQ asserts JAMODI co-invests in every
      offering; confirm this is true
- [ ] K-1 delivery target date (currently March 15)
- [ ] Named custodians (Equity Trust, Millennium, IRAR) — confirm relationships

## 7. Trust badges — `trustBadges`

Worded to be literally accurate. Note the SEC does **not** approve, endorse or
review private offerings, and no badge may imply it does.

- [ ] Confirm Form D has actually been filed
- [ ] Confirm third-party accreditation verification is genuinely used
- [ ] Confirm fund administration is genuinely independent of the sponsor

## 8. Press logos — `pressLogos`

Ships **empty on purpose**. Never render a logo JAMODI has not earned the right
to display.

- [ ] Add entries only for features you can evidence in writing

## 9. Legal

- [ ] Securities counsel reviews the full page, including `disclosures`
- [ ] Decide 506(b) vs 506(c). The site is currently built and worded for
      **506(c)** (general solicitation permitted, accreditation must be verified
      by an independent third party). If JAMODI files under 506(b), general
      solicitation is prohibited and the public marketing language must change.
- [ ] Write and publish the three linked legal pages, which do not yet exist:
      `/disclosures`, `/privacy`, `/terms`
- [ ] Confirm the privacy notice matches what the form actually does with data

## 10. Wiring

- [ ] Set `NEXT_PUBLIC_FORM_ENDPOINT` to the CRM or form endpoint. Until it is
      set, the request dialog falls back to opening the visitor's mail client —
      functional, but it loses tracking and some visitors will abandon.
- [ ] Point `Investor login` at the real portal
- [ ] Replace the placeholder LinkedIn URL in the footer
- [ ] Add analytics and define the conversion event on dialog submit (the dialog
      already tags each submission with the `source` button that opened it)
