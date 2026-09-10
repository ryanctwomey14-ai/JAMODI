"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";

/* ----------------------------------------------------------------------------
 * Scroll reveal.
 *
 * Gate (per the animation rules): marketing surface, seen once per visit, and
 * the purpose is *explanation* — the stagger walks the eye down the page in
 * reading order. It fires once and never re-animates on scroll-by, and it never
 * blocks interaction while it plays.
 *
 * Properties: opacity + a full `transform` string (not the x/y shorthands,
 * which are not hardware-accelerated and drop frames under load).
 * -------------------------------------------------------------------------- */

const DISTANCE = 16;

export const staggerParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, transform: `translateY(${DISTANCE}px)` },
  shown: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] },
  },
};

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds. Use sparingly — the stagger container is usually the better tool. */
  delay?: number;
  id?: string;
};

export function Reveal({ children, as = "div", className, delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const reduce = useReducedMotion();

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, transform: `translateY(${DISTANCE}px)` }}
      animate={
        reduce || inView
          ? { opacity: 1, transform: "translateY(0px)" }
          : { opacity: 0, transform: `translateY(${DISTANCE}px)` }
      }
      transition={{ duration: 0.62, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Wrap a list/grid; children use <RevealItem>. One observer, N staggered kids. */
export function RevealGroup({
  children,
  className,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      id={id}
      className={className}
      variants={staggerParent}
      initial={reduce ? "shown" : "hidden"}
      animate={reduce || inView ? "shown" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag className={className} variants={staggerChild}>
      {children}
    </MotionTag>
  );
}
