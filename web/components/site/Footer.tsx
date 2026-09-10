import { ArrowUpRight, Linkedin } from "lucide-react";
import { Img as Image } from "@/components/ui/Img";
import Link from "next/link";
import { disclosures, firm, footerNav, isPlaceholder } from "@/content/fund";
import { Shell } from "@/components/ui/Kit";

/* ============================================================================
 * FOOTER
 *
 * Conversion job: two, and they are different.
 *
 *  1. Catch the researcher. Anyone who scrolls this far without converting is
 *     diligencing, so the footer gives them what diligence wants: accreditation
 *     requirements, the portal, and a link to the firm's actual Form D filings
 *     on EDGAR. Inviting someone to verify you is a trust signal no badge
 *     graphic can imitate.
 *
 *  2. Carry the disclosures. On a securities-adjacent site these are not
 *     decoration — they are the reason the rest of the page is allowed to exist.
 *     Set at a real reading size and 4.6:1 contrast: quiet, but legible.
 *     Illegible fine print reads as something being hidden.
 * ========================================================================== */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-sand pb-9 pt-[clamp(52px,6vw,88px)]">
      <Shell>
        <div className="grid gap-11 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/jamodi-logo.png"
              alt={firm.name}
              width={1366}
              height={1032}
              sizes="220px"
              className="h-[70px] w-auto"
            />
            <p className="mt-6 max-w-[38ch] text-[0.94rem] leading-relaxed text-muted-text">
              Value-add multifamily acquisitions for accredited investors.
            </p>
            {!isPlaceholder(firm.email) && (
              <a
                href={"mailto:" + firm.email}
                className="touch-link mt-5 inline-block text-[0.94rem] font-medium text-gold-2 underline-offset-4 hover:underline"
              >
                {firm.email}
              </a>
            )}
          </div>

          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-faint sm:text-[0.63rem]">
                {col.heading}
              </h2>
              <ul className="touch-list mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-link inline-flex items-start gap-1 text-[0.93rem] text-muted-text transition-colors duration-200 hover:text-navy"
                      >
                        {l.label}
                        <ArrowUpRight size={12} strokeWidth={1.8} className="mt-1 shrink-0" aria-hidden />
                      </a>
                    ) : l.href.startsWith("/") ? (
                      <Link
                        href={l.href}
                        className="touch-link text-[0.93rem] text-muted-text transition-colors duration-200 hover:text-navy"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="touch-link text-[0.93rem] text-muted-text transition-colors duration-200 hover:text-navy"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---- disclosures ---- */}
        <div className="mt-14 border-t border-line-2 pt-8">
          <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-faint sm:text-[0.63rem]">
            Important disclosures
          </h2>
          <div className="mt-5 max-w-[108ch] space-y-3">
            {disclosures.map((d) => (
              <p key={d.slice(0, 28)} className="text-[0.8rem] leading-[1.75] text-faint">
                {d}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line-2 pt-7">
          <p className="text-[0.82rem] text-faint">
            © {year} {isPlaceholder(firm.legalName) ? firm.name : firm.legalName}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={firm.linkedinUrl}
              aria-label={firm.name + " on LinkedIn"}
              className="grid h-11 w-11 place-items-center rounded-full border border-line-2 bg-paper text-muted-text transition-colors duration-200 hover:border-navy hover:text-navy"
            >
              <Linkedin size={16} strokeWidth={1.8} aria-hidden />
            </a>

          </div>
        </div>
      </Shell>
    </footer>
  );
}
