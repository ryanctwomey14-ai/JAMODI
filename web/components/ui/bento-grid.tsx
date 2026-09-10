import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ============================================================================
 * Bento grid.
 *
 * Structure and API are the stock component's. Four changes were needed to make
 * it correct here:
 *
 *  1. ICONS — swapped @radix-ui/react-icons for lucide-react. lucide is already
 *     a dependency, and mixing two icon sets means two stroke weights and two
 *     grids on the same page.
 *
 *  2. THE CTA WAS UNREACHABLE WITHOUT A MOUSE. The stock card hides it behind
 *     `opacity-0 pointer-events-none` and only reveals it on `group-hover`. On
 *     a touch device hover never fires, so the link could never be tapped; for
 *     a keyboard user it could be focused while invisible. It is now visible by
 *     default and only *animates* on devices that genuinely hover, and
 *     `group-focus-within` reveals it for keyboard users.
 *
 *  3. `transition-all` on four elements — replaced with named properties, so
 *     the browser is not asked to watch every animatable property on hover.
 *
 *  4. Colours are the JAMODI palette rather than neutral-700/400 with a
 *     `dark:` variant this site has no toggle for.
 * ========================================================================== */

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("grid w-full auto-rows-[20rem] grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex transform-gpu flex-col justify-between overflow-hidden rounded-xl",
      "border border-line bg-paper shadow-[var(--shadow-card)]",
      "transition-shadow duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[var(--shadow-lift)]",
      className,
    )}
  >
    <div aria-hidden>{background}</div>

    <div
      className={cn(
        "pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 p-7",
        "transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        // Only lift to make room for the CTA where the CTA actually appears on
        // hover — i.e. on pointer devices.
        "motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-8",
      )}
    >
      <Icon
        className={cn(
          "mb-3 h-10 w-10 origin-left transform-gpu text-gold-2",
          "transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-75",
        )}
      />
      <h3 className="text-[1.35rem] leading-tight text-navy">{name}</h3>
      <p className="max-w-lg text-[0.95rem] leading-relaxed text-muted-text">{description}</p>
    </div>

    <div
      className={cn(
        "z-10 flex w-full transform-gpu flex-row items-center p-4 pt-0",
        "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        // Hidden-until-hover only on devices that hover. Everywhere else it is
        // simply visible, so it can be tapped.
        "[@media(hover:hover)_and_(pointer:fine)]:absolute",
        "[@media(hover:hover)_and_(pointer:fine)]:bottom-0",
        "[@media(hover:hover)_and_(pointer:fine)]:translate-y-6",
        "[@media(hover:hover)_and_(pointer:fine)]:opacity-0",
        "[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0",
        "[@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
        // keyboard users get it too
        "[@media(hover:hover)_and_(pointer:fine)]:group-focus-within:translate-y-0",
        "[@media(hover:hover)_and_(pointer:fine)]:group-focus-within:opacity-100",
      )}
    >
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="pointer-events-auto -ml-1 text-navy hover:bg-sand hover:text-navy"
      >
        <Link href={href}>
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
        </Link>
      </Button>
    </div>

    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 transform-gpu bg-navy/0",
        "transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "[@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-navy/[0.025]",
      )}
    />
  </div>
);

export { BentoCard, BentoGrid };
