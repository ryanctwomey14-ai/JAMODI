# JAMODI Partners — Web Strategy

Positioning, audience, site architecture, and the reasoning behind every section
of the homepage.

---

## 1. The ideal customer

### Primary: the capital-rich, time-poor professional

Age 38–58. Household income $250k–$750k. Investable assets $500k–$3M. Accredited
by income or net worth. Physicians and dentists, senior engineers and tech ICs,
attorneys, corporate executives, pilots, and owners of profitable small
businesses.

The defining trait is not wealth — it is **the mismatch between their income and
their available time.** They have already maxed the 401(k) and the backdoor Roth.
Six figures is sitting in a brokerage account or a high-yield savings account
earning something they are vaguely embarrassed by. They know they should deploy
it. They have no hours in which to become good at deploying it.

A meaningful share of them are **recovering landlords**: they bought one or two
single-family rentals, discovered they had bought a job, and want the asset class
without the pager.

### Secondary segments, in order of how fast they close

1. **Existing LPs of other sponsors.** Already understand K-1s, capital calls and
   hold periods. They are not deciding whether to do this — only whom to do it
   with. Fastest to close, and the cheapest to acquire.
2. **Recent liquidity events.** Business sale, RSU vest, inheritance, a large
   bonus, a home sale. Event-triggered, time-sensitive, high urgency.
3. **Self-directed IRA / solo 401(k) holders.** Custodian friction filters out
   the merely curious; the ones who ask are serious.
4. **Family offices and RIAs allocating on behalf of clients.** Smallest in
   number, largest in cheque size, and by far the most demanding on diligence —
   which is why the site leads with governance rather than returns.

---

## 2. Their biggest pain points

| Pain | What it sounds like in their head |
| --- | --- |
| **Concentration risk** | "My salary, my RSUs and my 401(k) are all one company and one index. If that goes, everything goes at once." |
| **Cash drag** | "I have $300k sitting there losing purchasing power because I don't know where to put it and I'm scared of getting it wrong." |
| **The tax bill** | "I'm in the top bracket and I have no shelters left. I earn more and keep less every year." |
| **No time** | "I'm not going to unclog a toilet at 2 a.m. I tried being a landlord. I bought myself a second job." |
| **No way to judge a sponsor** | "Everyone's deck says 18% IRR. I have no idea how to tell the good ones from the ones who are about to blow up." |
| **The 2022–2023 hangover** | "I read about syndicators pausing distributions and issuing capital calls. How do I know you aren't next?" |
| **Retirement math anxiety** | "I need income, not just a number that goes up. Drawing 4% off a volatile portfolio feels fragile." |

The last two matter most and are handled least well by competitors. Most sponsor
sites answer pain 1–4 and go silent on 5–7 — which is exactly where a sceptical,
sophisticated investor is actually standing.

---

## 3. Buying triggers

Nobody wakes up wanting to buy an apartment building. Something moves them:

- **A liquidity event** — bonus, vest, business sale, inheritance, home sale
- **April** — the tax bill lands and the search for shelter starts
- **A landlord breaking point** — an eviction, a $14k HVAC replacement, a vacancy
- **A market scare** — a drawdown, or a headline that makes equities feel fragile
- **Peer proof** — a colleague mentions their quarterly distribution at dinner
- **A life-stage clock** — college in six years, retirement in twelve
- **A pricing narrative** — "multifamily values have reset; this is the entry"

**Implication for the site:** most visitors arrive *before* a trigger fires. A
page built only for the ready wastes them. Hence the two-door CTA everywhere —
one for the ready, one for the not-yet-ready.

---

## 4. Objections, in the order they surface

1. **"I don't know you."** — sponsor risk. The single largest objection in
   private real estate, and the one most sites underinvest in.
2. **"My money is locked up for five years."** — illiquidity.
3. **"What if I lose it?"** — downside and capital preservation.
4. **"What about rates, and the syndication blowups I read about?"**
5. **"How do you get paid, and does that align with me?"**
6. **"Am I even allowed to invest? What counts as accredited?"**
7. **"What does this do to my taxes? What is a K-1?"**
8. **"Why not just buy a REIT or an index fund?"**
9. **"Is the minimum too high? Should I stay liquid?"**
10. **"How do I know these numbers are real?"**

### How the site answers each

| # | Objection | Where it is answered |
| --- | --- | --- |
| 1 | Sponsor risk | Founder section (full tonal inversion), governance badges, EDGAR link in footer |
| 2 | Illiquidity | Named as a **loss** in the comparison matrix; FAQ "How long is my capital committed?" |
| 3 | Downside | FAQ "What happens if a deal underperforms?" — placed last, answered honestly |
| 4 | Rates / blowups | Deal theses cite fixed-rate debt; founder narrative is explicitly about not stretching |
| 5 | Fees | FAQ "How does JAMODI get paid?" + the alignment row in the matrix |
| 6 | Accreditation | FAQ, hero eyebrow, and the dialog's own status selector |
| 7 | Taxes / K-1 | Pillar 02, plus two dedicated FAQs |
| 8 | Why not a REIT | The comparison matrix — the section's whole reason to exist |
| 9 | Minimum | First FAQ, answered plainly and immediately |
| 10 | Verification | Independent fund administration badge; invitation to check Form D on EDGAR |

---

## 5. Desired outcomes

What they are actually buying:

- **Income that arrives without them** — a quarterly deposit requiring no hours
- **A tax outcome** — depreciation that reaches their return, not just a gain
- **Real diversification** — an asset driven by rents and local supply rather
  than by the same index their salary already depends on
- **Preservation first, growth second** — "don't lose it" outranks "maximize it"
- **Identity** — being the person at dinner with the interesting portfolio
- **Optionality and legacy** — replacing W-2 income before 65; leaving something
  to their children with a stepped-up basis

The copy sells **outcomes and mechanism**, never the excitement of real estate.
The audience is allergic to enthusiasm.

---

## 6. Site map

**Built now:** the homepage — a complete, self-contained conversion argument.

```
/                              Homepage (built)
│
├── 01  Hero                   attention + qualification
├── 02  Authority band         mandate + governance
├── 03  Why private real estate mechanism + the REIT objection
├── 04  Track record           evidence
├── 05  Investor journey       process anxiety
├── 06  Founder                sponsor risk
├── 07  Investor voices        peer proof
├── 08  FAQ                    residual objections
└── 09  Final CTA              the close

Modal (one, shared)            Request private deal flow
External                       Investor portal (login)

Legal (to be written)          /disclosures  /privacy  /terms
```

**Recommended phase two**, in build order by expected return:

| Page | Job | Why it earns its place |
| --- | --- | --- |
| `/why-multifamily` | Top-of-funnel education | The main organic-search entry point. Ranks for the questions people ask *before* they know sponsors exist. |
| `/insights` + articles | Authority, retargeting fuel | Each article is a keyword surface and a reason to re-enter the list. |
| `/investor-guide` | Gated lead magnet | Converts the 90% who are not ready to talk. "The LP's Sponsor Due-Diligence Checklist" performs well because it flatters the sceptic. |
| `/strategy` | The buy box | Where a serious investor goes to see whether your discipline is real. Include what you say **no** to. |
| `/portfolio/[asset]` | Per-deal depth | Long-tail SEO on city names, and the page you send to a warm lead. |
| `/team` | Beyond the founder | Matters once there is a team; sponsor risk shrinks as the bench grows. |

**Deliberately not recommended:** a public "current offerings" page with live
terms. Under 506(c) it is legally possible; it is still strategically poor. Deal
terms behind an accreditation gate create qualification, reciprocity and urgency.
Terms on the open web create tyre-kickers and a compliance surface.

---

## 7. Navigation

**Primary (5 items, no dropdowns):**
Why private real estate · Track record · How it works · Our founder · Questions

Five is the ceiling before a nav starts costing comprehension. Every item is
phrased as something the visitor wants, not something the firm has — "Track
record", not "Portfolio"; "Questions", not "FAQ".

**Utility:** `Investor login` (existing investors, deliberately quiet) and
`Request deal flow` (the one persistent CTA, always visible).

The header floats transparent over the hero and settles onto glass on scroll, so
the CTA is on screen at every scroll depth without ever fighting the image.

---

## 8. The user journey

```
   COLD                        WARM                        HOT
   ────                        ────                        ───
Search / referral    →    Hero: qualify + orient    →    Request dialog
                          Authority: "who are you"        (accreditation)
                          Why: mechanism + REIT               ↓
                          Track record: evidence         Verification
                          Journey: what happens next          ↓
                          Founder: who is behind it      Offering memorandum
                          Voices: people like me              ↓
                          FAQ: what could go wrong       Soft commit → fund
                          CTA: the close                      ↓
                                                         Quarterly distributions
```

The page is ordered as an argument: **interest → credibility → mechanism → proof
→ safety → person → peers → residual doubt → action.** Each section removes the
specific objection that would otherwise stop the next one from landing. That is
why the order matters more than any individual section.

---

## 9. Trust elements, and why each one works

| Element | Why it converts |
| --- | --- |
| **Governance badges** (Form D, third-party accreditation, independent fund administration, named custodians) | Institutional money buys *process*, not returns. "Books kept outside the sponsor" answers a fear nobody says out loud. |
| **Naming the drawback** | The liquidity row is marked as a loss. A table where the sponsor wins every row reads as marketing; one honest loss makes the other six believable. |
| **"What happens if a deal underperforms?"** | Placed last, where the most engaged readers reach it. Answering it honestly converts better than reassurance — it is the answer a sceptic is testing you for. |
| **The founder inversion** | The one full tonal break on the page. It stops the scroll and signals a person is speaking before a word is read. |
| **Occupation-labelled testimonials** | "Interventional cardiologist" does more work than a full name. The reader is looking for themselves. |
| **A link to your own EDGAR filings** | Inviting someone to go verify you is a trust signal no badge graphic can imitate. |
| **Honest fine print** | Disclosures set at 5.4:1 contrast and real reading size. Illegible fine print reads as something being hidden. |
| **Empty press-logo array** | The site renders no logo the firm has not earned. One fake credential, discovered, costs more than all the real ones earn. |

---

## 10. Calls to action

**One primary action, everywhere: _Request private deal flow._** Every button on
the page opens the same dialog, so the funnel has a single measurable entry
point, and every submission is tagged with the button that produced it.

**Two doors at every decision point:**

| Door | For | Placement |
| --- | --- | --- |
| `Request private deal flow` | The ready | Header, hero, FAQ, final CTA, mobile menu |
| `View track record` / `Email us` / `Ask a question` | The sceptical | Hero, FAQ, final CTA |

**Friction removal in the dialog itself:**

- Labelled "Step one of four · no obligation" — it names the commitment as small
  *before* the first field
- The opening paragraph says outright that joining is not an investment
- Accreditation is a self-select dropdown that includes "None of these apply to
  me yet" — honesty is cheaper than a disqualified lead you have to unwind
- Allocation range is optional, and includes "Still deciding"
- A privacy line sits directly under the submit button, where the hesitation is

**What is deliberately absent:** countdown timers, "only 3 spots left", exit-intent
popups, and any language implying an offer. All of them are wrong for this
audience and some are wrong for the regulator.

---

## 11. SEO

**Primary intent clusters:**

| Cluster | Example queries | Target |
| --- | --- | --- |
| Brand | "JAMODI Partners", "Tiffany Vanarsdel" | Homepage — must own this outright |
| Category | multifamily syndication for accredited investors; passive real estate investing | `/why-multifamily` |
| Comparison | REIT vs syndication; is real estate syndication worth it | Comparison matrix + an article |
| Mechanism | bonus depreciation real estate; cost segregation apartment; K-1 real estate | Articles |
| Qualification | what is an accredited investor; Reg D 506(c) | FAQ + article |
| Local | Kansas City multifamily investment; Midwest apartment fund | Per-asset pages |

**Already implemented:**

- Semantic heading order, one `<h1>`, real `<table>` markup with `scope` and a caption
- `FinancialService` JSON-LD naming the founder — this is what makes a branded
  search resolve to the firm rather than to a scraped directory listing
- Full Open Graph and Twitter cards with a generated preview image
- Canonical URL, descriptive title and meta description
- Self-hosted fonts, static prerender, 160 kB first load, no layout shift
- Every image sized and lazy-loaded except the LCP hero, which is prioritised
- `FAQPage` JSON-LD generated from the eight FAQ entries — those questions are
  almost verbatim what this audience types into Google, so the markup makes the
  answers eligible for rich results

**Still to do:**

1. Write `/why-multifamily` as the organic front door. Brand search converts but
   does not scale; category search is where new investors come from.
2. `sitemap.xml` and `robots.txt`.
3. Per-asset pages for local long-tail once real deals replace the placeholders.
4. Real property photography with descriptive filenames and alt text.

**A caution:** ranking for "passive income real estate" brings unaccredited
traffic that cannot convert. Prefer qualified intent — "accredited", "506(c)",
"K-1", "cost segregation" — over volume. A smaller, better-qualified funnel is
worth more here than a large one.

---

## 12. Design direction

**Light institutional.**

Warm white ground, white cards on a soft navy-tinted shadow, navy as the
structural colour, and rose gold — taken straight from the mark — as the single
accent. Large framed property imagery, generous air, and clean sans set at
confident sizes rather than shouted ones. The register is an operating
investment firm: Origin, Cortland, Ashcroft — not a design studio, and not a
luxury-goods brand.

What keeps it JAMODI's rather than a template:

- **The accent is the mark's own rose gold**, not the corporate blue every other
  sponsor reaches for. It appears exactly three ways — the eyebrow rule, the
  second line of the headline, and the "Acquisition Open" pill — so it always
  means *this is the thing to look at*.
- **Navy is used as a block, not a tint.** The JAMODI column runs down the
  comparison matrix as the single dark element on a light section, so the eye
  lands there without a label telling it to. The same move carries the founder's
  pull quote and the closing panel.
- **Every financial figure is set in tabular numerals**, so columns of money
  align down the page. It is a small thing that separates a firm that handles
  capital from a firm that talks about it.
- **The drawn elevation** in "How it works" is the one graphic that could not
  belong to another sponsor: a drafted SVG of three multifamily masses echoing
  the building row inside the logo, used to say plainly what a distribution is.

**Typography:** Instrument Sans for headings — slightly narrow, modern, and
confident at scale without the industrial edge a grotesk brings. Inter for
reading. IBM Plex Mono for labels and eyebrows only.

**Restraint:** one accent colour, one dark block per section at most, and no
decoration that is not carrying information.

**The known gap:** the property imagery is procedurally generated. It reads as a
clean architectural render, not a photograph, and it is the single biggest
visual upgrade available to this design. Real photography of real communities —
shot in daylight, wide, with people absent — would lift the whole page more than
any further design change.

## 13. Section-by-section: purpose and conversion effect

### 01 — Hero
**Purpose:** in one screen, tell a qualified stranger what this is, who it is for,
and give them somewhere to go.
**How it converts:** the eyebrow (`Regulation D · 506(c) · accredited investors
only`) qualifies and disqualifies immediately — a filter that reads as
exclusivity, which is the correct feeling for this audience. The glass metrics
card puts scale on screen before any argument is made. Two doors serve both the
ready and the sceptical; a single "Invest now" would waste the majority.

### 02 — Authority band
**Purpose:** absorb the "who are you?" reflex in the three seconds after the hero.
**How it converts:** it runs two proofs at once — *what* we buy (the moving
mandate rail) and *how it is governed* (the badges). Governance is what actually
closes accredited money. Placing it this early stops the reader from carrying
scepticism into the argument that follows.

### 03 — Why private real estate
**Purpose:** explain the mechanism and kill the REIT objection.
**How it converts:** the comparison matrix reframes the decision from "risky
syndication vs. safe stocks" into "which structure do I want" — a question JAMODI
wins. It concedes liquidity outright, and that single admission is what makes the
other six rows credible. The matrix sits on the light panel because paper is
where a reader expects to find a table.

### 04 — Track record
**Purpose:** turn belief into evidence.
**How it converts:** this is the first real address on the page. Each tile carries
a one-line *thesis* rather than adjectives — "$61,000 per door against a $214,000
replacement cost" is the sentence a sophisticated investor is scanning for. The
status pills create scarcity honestly: only "Acquisition Open" implies urgency,
and only when it is true.

### 05 — The investor journey
**Purpose:** dissolve process anxiety.
**How it converts:** the fear here is not "will this return 17%" but "what happens
if I fill in that form, and how fast am I trapped?" So step one says explicitly
that nothing binding happens, each step carries an honest duration, and the
headline promises nothing is binding until the third. Removing perceived risk
from the *first* click converts better than any adjective on the button.

### 06 — Our founder
**Purpose:** answer sponsor risk — the largest objection in private real estate.
**How it converts:** investors are not underwriting a building, they are
underwriting the person who buys it. The full inversion to paper acts as a page
turn: it stops the scroll and signals that a person is speaking. The pull quote
states a discipline ("I would rather pass on ninety-nine deals…") rather than a
credential, because discipline is what the reader is actually shopping for.

### 07 — Investor voices
**Purpose:** peer proof.
**How it converts:** the real question is "do people like me do this?", so quotes
are labelled by occupation rather than name. No carousel — auto-advancing hides
two-thirds of the proof and takes control from the reader.

### 08 — Investor FAQ
**Purpose:** clear the residual objections.
**How it converts:** usually the second-most-read section after the hero.
Questions run cheapest to most expensive, ending with "What happens if a deal
underperforms?" — a visitor who reaches that one is close, and the honest answer
converts better than a reassuring one. The section carries its own low-commitment
CTA for anyone whose question is not listed.

### 09 — Final CTA
**Purpose:** catch the reader who finished.
**How it converts:** it does not sell again — by now they have seen the argument,
the evidence, the person and the risks. It removes the last friction and restates
how little is being committed. Two doors again, because a page with one door
loses everyone standing at the other.

### Footer
**Purpose:** catch the researcher, and carry the disclosures.
**How it converts:** anyone who scrolls this far without converting is doing
diligence, so the footer gives them what diligence wants — accreditation
requirements, the portal, and a link to the firm's own Form D filings on EDGAR.
The disclosures are set to be genuinely readable; illegible fine print reads as
something being hidden.

---

## 14. What to measure

| Metric | Why |
| --- | --- |
| Dialog opens, by `source` | Every button is already tagged. Tells you which argument actually moves people. |
| Dialog open → submit | Below ~35% means the form is asking too much too early. |
| Scroll depth to Founder (06) | The best single proxy for genuine interest on this page. |
| FAQ expansions, by question | A live objection ranking, straight from the audience. |
| Submissions by accreditation status | If "None of these apply to me yet" dominates, the traffic is wrong, not the page. |
| Request → verified → funded | The only numbers that matter. Everything above is a leading indicator. |
