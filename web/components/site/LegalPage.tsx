import type { ReactNode } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Shell } from "@/components/ui/Kit";
import { Reveal } from "@/components/ui/Reveal";

/* Long-form legal pages. Narrow measure, larger leading, and no decoration —
   these exist to be read carefully, not scanned. */
export function LegalPage({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <main id="main">
      <PageHero title={title} lede={lede} />
      <section className="section bg-canvas">
        <Shell>
          <Reveal className="max-w-[74ch] space-y-6 text-[0.98rem] leading-[1.8] text-muted-text">
            {children}
          </Reveal>
        </Shell>
      </section>
    </main>
  );
}

/** Marks copy that still needs counsel's own wording. */
export function LegalPlaceholder({ note }: { note: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-line-2 bg-sand/60 p-7">
      <p className="text-[0.75rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-gold-2">[placeholder]</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-text">{note}</p>
    </div>
  );
}
