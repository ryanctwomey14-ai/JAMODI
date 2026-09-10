"use client";

import { Check, Lock } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { bookCall, firm, isPlaceholder, mailtoHref } from "@/content/fund";

/* ============================================================================
 * The request form.
 *
 * This used to be a modal opened from every CTA on the site. Now that there is
 * a dedicated page for it, the form lives on that page: one destination, one
 * URL that can be linked to and measured, and no dialog to trap focus in.
 *
 * Accessibility carried over from the dialog version: visible labels, errors
 * announced with role="alert" beneath the field they belong to, aria-invalid,
 * and focus moved to the first invalid field on submit (WCAG 3.3.1).
 * ========================================================================== */

const ACCREDITATION = [
  { value: "", label: "Select one…" },
  { value: "income", label: "Income over $200k ($300k jointly) in each of the last two years" },
  { value: "networth", label: "Net worth over $1M, excluding my primary residence" },
  { value: "entity", label: "I am investing through a qualifying entity or trust" },
  { value: "licensed", label: "I hold a Series 7, 65 or 82 licence" },
  { value: "none", label: "None of these apply to me yet" },
];

const RANGES = [
  { value: "", label: "Select a range…" },
  { value: "50-100", label: "$50,000 – $100,000" },
  { value: "100-250", label: "$100,000 – $250,000" },
  { value: "250-500", label: "$250,000 – $500,000" },
  { value: "500+", label: "$500,000+" },
  { value: "exploring", label: "Still deciding" },
];

type Errors = Partial<Record<"name" | "email" | "accreditation" | "consent", string>>;

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 text-[0.82rem] text-gold-2">
      {children}
    </p>
  );
}

const labelCls =
  "text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-text";
const controlCls =
  "w-full rounded-[10px] border bg-canvas px-4 py-3 text-ink transition-colors duration-200 placeholder:text-faint focus:outline-none";

export function BookCallForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  function validate(fd: FormData): Errors {
    const next: Errors = {};
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    if (name.length < 2) next.name = "Enter the name your investments are held in.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "Enter an email address we can reach you at, e.g. name@firm.com.";
    if (!fd.get("accreditation")) next.accreditation = "Choose the option that describes you.";
    if (!fd.get("consent")) next.consent = "Please confirm before we send offering materials.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const found = validate(fd);
    setErrors(found);

    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    fd.append("source", "book-a-call");

    try {
      if (!firm.formEndpoint) {
        // No CRM wired yet: hand off to the mail client rather than silently
        // dropping a qualified enquiry.
        const body = [...fd.entries()]
          .filter(([k]) => k !== "consent")
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        window.location.href = `${mailtoHref(firm.email)}?subject=${encodeURIComponent(
          "Call request",
        )}&body=${encodeURIComponent(body)}`;
        setStatus("done");
        return;
      }
      const res = await fetch(firm.formEndpoint, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="card card-raised p-9 text-center sm:p-11">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-gold-soft">
          <Check size={22} strokeWidth={2} className="text-gold-2" aria-hidden />
        </div>
        <h2 className="text-[1.8rem] text-navy">Request received</h2>
        <p className="mx-auto mt-4 max-w-md text-muted-text">
          We will be in touch within one business day to arrange a time. Nothing you have
          submitted commits you to anything.
        </p>
      </div>
    );
  }

  return (
    <div className="card card-raised p-7 sm:p-9">
      <h2 className="text-[1.6rem] text-navy">{bookCall.formTitle}</h2>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-7 grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="bc-name" className={labelCls}>
            Full legal name <span className="text-gold-2">*</span>
          </label>
          <input
            id="bc-name"
            name="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
            className={`${controlCls} ${errors.name ? "border-gold-2" : "border-line-2 focus:border-navy"}`}
          />
          {errors.name && <FieldError id="err-name">{errors.name}</FieldError>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="bc-email" className={labelCls}>
              Email <span className="text-gold-2">*</span>
            </label>
            <input
              id="bc-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              className={`${controlCls} ${errors.email ? "border-gold-2" : "border-line-2 focus:border-navy"}`}
            />
            {errors.email && <FieldError id="err-email">{errors.email}</FieldError>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="bc-phone" className={labelCls}>
              Phone <span className="font-normal normal-case tracking-normal text-faint">Optional</span>
            </label>
            <input
              id="bc-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={`${controlCls} border-line-2 focus:border-navy`}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="bc-accreditation" className={labelCls}>
            Accredited investor status <span className="text-gold-2">*</span>
          </label>
          <select
            id="bc-accreditation"
            name="accreditation"
            defaultValue=""
            aria-invalid={!!errors.accreditation}
            aria-describedby={errors.accreditation ? "err-accreditation" : "hint-accreditation"}
            className={`${controlCls} appearance-none ${errors.accreditation ? "border-gold-2" : "border-line-2 focus:border-navy"}`}
          >
            {ACCREDITATION.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
          {errors.accreditation ? (
            <FieldError id="err-accreditation">{errors.accreditation}</FieldError>
          ) : (
            <p id="hint-accreditation" className="text-[0.82rem] text-faint">
              Verified independently later — this only helps us prepare for the call.
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <label htmlFor="bc-range" className={labelCls}>
            Typical allocation you consider
          </label>
          <select
            id="bc-range"
            name="range"
            defaultValue=""
            className={`${controlCls} appearance-none border-line-2 focus:border-navy`}
          >
            {RANGES.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="bc-message" className={labelCls}>
            Anything we should know
          </label>
          <textarea
            id="bc-message"
            name="message"
            rows={3}
            placeholder="Timing, a 1031 deadline, an SDIRA custodian, questions for the call…"
            className={`${controlCls} border-line-2 focus:border-navy`}
          />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-muted-text">
            <input
              type="checkbox"
              name="consent"
              className="mt-1 h-[18px] w-[18px] flex-none accent-navy"
              aria-invalid={!!errors.consent}
            />
            <span>
              I confirm I am requesting information voluntarily and consent to being contacted
              about {firm.name} offerings. I understand this is not an offer to sell securities.
            </span>
          </label>
          {errors.consent && <FieldError id="err-consent">{errors.consent}</FieldError>}
        </div>

        {status === "error" && (
          <p role="alert" className="text-[0.9rem] text-gold-2">
            That did not send.{" "}
            {isPlaceholder(firm.email) ? (
              "Please try again shortly."
            ) : (
              <>
                Email{" "}
                <a className="underline underline-offset-4" href={mailtoHref(firm.email)}>
                  {firm.email}
                </a>{" "}
                and we will pick it up from there.
              </>
            )}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request a time"}
        </button>

        <p className="flex items-start gap-2.5 text-[0.8rem] leading-relaxed text-faint">
          <Lock size={13} strokeWidth={1.6} className="mt-1 flex-none" aria-hidden />
          {bookCall.formNote}
        </p>
      </form>
    </div>
  );
}
