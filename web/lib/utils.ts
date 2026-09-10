import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with correct precedence.
 *
 * `clsx` resolves conditionals; `twMerge` then de-duplicates conflicting
 * utilities so a `className` prop passed into a component reliably overrides
 * the component's own defaults instead of losing to source order.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
