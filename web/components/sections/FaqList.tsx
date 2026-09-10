"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Img as Image } from "@/components/ui/Img";
import Link from "next/link";
import { useState } from "react";
import { faqs, isPlaceholder } from "@/content/fund";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Kit";

/* ============================================================================
 * FAQ
 *
 * Image on the left, accordion on the right. The photograph gives the section
 * somewhere to rest — a column of eight collapsed rows on its own reads as a
 * support page rather than part of the argument.
 *
 * Questions run cheapest to most expensive: minimum first, "what happens if a
 * property underperforms" last. A reader who reaches the last one is engaged,
 * and the honest answer there does more for trust than a reassuring one.
 *
 * Motion gate: occasional, purpose = preventing a jarring change. Height is the
 * one property with no transform equivalent, so it is the sanctioned exception,
 * kept to 240ms because it costs layout on every frame.
 * ========================================================================== */

function Answer({ text }: { text: string }) {
  if (isPlaceholder(text)) {
    return (
      <p className="[&+p]:mt-4">
        <span className="rounded-[4px] bg-gold-soft/70 px-1.5 py-0.5 text-[0.86em] font-semibold tracking-tight text-gold-2">
          [placeholder]
        </span>
      </p>
    );
  }
  return <p className="text-[0.94rem] leading-relaxed text-muted-text [&+p]:mt-4">{text}</p>;
}

export function FaqList({ withAside = true }: { withAside?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section className="section bg-canvas">
      <Shell>
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---------------- image ---------------- */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="plate aspect-[4/5] overflow-hidden rounded-[var(--radius-frame)]">
              <Image
                src="/media/cards/operations.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover object-center"
              />
            </div>
            {withAside && (
              <div className="mt-7">
                <p className="text-[0.95rem] leading-relaxed text-muted-text">
                  If your question is not here, we are glad to answer it directly.
                </p>
                <Link href="/book-a-call" className="btn btn-secondary mt-5">
                  Ask a question
                </Link>
              </div>
            )}
          </Reveal>

          {/* ---------------- accordion ---------------- */}
          <Reveal>
            <dl className="border-t border-line">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                const panelId = "faq-panel-" + i;
                const btnId = "faq-btn-" + i;
                return (
                  <div key={f.q} className="border-b border-line">
                    <dt>
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-navy transition-colors duration-200 hover:text-gold-2"
                      >
                        {f.q}
                        <ChevronDown
                          aria-hidden
                          size={18}
                          strokeWidth={2}
                          className={
                            "flex-none text-gold-2 transition-transform duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] " +
                            (isOpen ? "rotate-180" : "")
                          }
                        />
                      </button>
                    </dt>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.dd
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-[68ch] pb-7 pr-6">
                            {f.a.map((x, j) => (
                              <Answer key={j} text={x} />
                            ))}
                          </div>
                        </motion.dd>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
