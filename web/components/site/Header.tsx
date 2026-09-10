"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Img as Image } from "@/components/ui/Img";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { firm, navLinks } from "@/content/fund";

/* The header sits on the page ground and gains a hairline and blur once the
   page scrolls, so the primary action stays reachable without a heavy bar
   competing with the content. The current route is marked with a gold rule
   rather than a filled pill — quieter, and it survives on a light ground. */
export function Header() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={
          // The home hero is a dark video band starting immediately below this
          // bar, so the light ground is kept at every scroll position — a
          // transparent header would put navy nav links on top of footage.
          "no-print sticky top-0 z-[100] bg-canvas/92 backdrop-blur-xl transition-all duration-300 " +
          (stuck ? "border-b border-line" : "border-b border-transparent")
        }
      >
        <div className="mx-auto flex min-h-[84px] w-full max-w-[1280px] items-center gap-6 px-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex min-h-[44px] flex-none items-center gap-3" aria-label={firm.name + " home"}>
            <Image
              src="/brand/jamodi-mark.png"
              alt=""
              width={600}
              height={271}
              priority
              className="h-9 w-auto"
            />
            <span className="hidden text-[0.85rem] font-extrabold uppercase leading-none tracking-[0.14em] text-navy sm:block">
              JAMODI
              <span className="mt-1.5 block text-[0.58rem] font-light uppercase tracking-[0.4em] text-gold-2">
                Partners
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 xl:flex">
            {navLinks.map((l) => {
              const current = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={current ? "page" : undefined}
                  className={
                    "relative px-4 py-2.5 text-[0.94rem] transition-colors duration-200 " +
                    (current ? "text-navy" : "text-muted-text hover:text-navy")
                  }
                >
                  {l.label}
                  {current && (
                    <span aria-hidden className="absolute inset-x-4 bottom-1 h-px bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden flex-none items-center xl:ml-5 xl:flex">
            <Link href="/book-a-call" className="btn btn-primary !min-h-[46px] !px-5 !text-[0.9rem]">
              Learn more
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="ml-auto grid h-12 w-12 flex-none place-items-center rounded-[var(--radius-control)] border border-line-2 bg-paper text-navy xl:hidden"
          >
            {menuOpen ? <X size={19} strokeWidth={1.8} /> : <Menu size={19} strokeWidth={1.8} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[84px] z-[99] overflow-y-auto bg-canvas px-5 pb-14 pt-6 sm:px-8 xl:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-10px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-10px)" }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <nav aria-label="Mobile">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className={
                    "block border-b border-line py-5 text-[1.5rem] font-bold tracking-[-0.03em] " +
                    (pathname === l.href ? "text-gold-2" : "text-navy")
                  }
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-9">
              <Link href="/book-a-call" className="btn btn-primary w-full">
                Learn more
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
