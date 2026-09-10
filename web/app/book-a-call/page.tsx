import type { Metadata } from "next";
import { Img as Image } from "@/components/ui/Img";
import { PageHero } from "@/components/site/PageHero";
import { BookCallForm } from "@/components/site/BookCallForm";
import { Shell } from "@/components/ui/Kit";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/sections";
import { bookCall, founder } from "@/content/fund";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Arrange a short introductory call with the JAMODI Partners team to discuss the strategy, the underwriting, and whether the asset class fits your portfolio.",
  alternates: { canonical: "/book-a-call" },
};

/* The single conversion destination. Every CTA on the site now points here,
   so there is one URL to measure and one place the form is maintained. */
export default function BookACallPage() {
  return (
    <main id="main">
      <PageHero title={bookCall.title} lede={bookCall.lede} />

      <section className="section bg-canvas">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-[1.7rem] text-navy">What we will cover</h2>

              <RevealGroup as="ol" className="mt-8 border-t border-line">
                {bookCall.agenda.map((a, i) => (
                  <RevealItem
                    key={a.title}
                    as="li"
                    className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-line py-6"
                  >
                    <span className="num pt-1 text-[0.8rem] font-semibold text-gold-2" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-navy">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-text">
                        {a.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal className="mt-10 flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-sand/60 p-5">
                <Image
                  src="/brand/tiffany-avatar.jpg"
                  alt=""
                  width={600}
                  height={600}
                  sizes="56px"
                  className="h-14 w-14 flex-none rounded-full object-cover"
                />
                <div>
                  <p className="text-[0.75rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-2">
                    You will speak with
                  </p>
                  <p className="mt-1.5 text-[1.05rem] font-semibold text-navy">{founder.name}</p>
                  <p className="text-[0.88rem] text-muted-text">
                    <Placeholder>{founder.role}</Placeholder>
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <BookCallForm />
            </Reveal>
          </div>
        </Shell>
      </section>
    </main>
  );
}
