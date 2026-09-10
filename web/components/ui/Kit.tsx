import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* ============================================================================
 * Shared surface language.
 *
 * Keeping buttons and section labels as single components is what stops the
 * page drifting into six slightly-different button styles — the most common way
 * an otherwise good design starts to feel cheap.
 * ========================================================================== */

type Variant = "primary" | "secondary" | "gold" | "onnavy" | "ghostNavy";

const VARIANT: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  gold: "btn-gold",
  onnavy: "btn-onnavy",
  ghostNavy: "btn-ghost-navy",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: { children: ReactNode; variant?: Variant } & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={`btn ${VARIANT[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "secondary",
  className = "",
  ...rest
}: { children: ReactNode; variant?: Variant } & ComponentPropsWithoutRef<"a">) {
  return (
    <a className={`btn ${VARIANT[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

/** Consistent page gutter and max width. */
export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
