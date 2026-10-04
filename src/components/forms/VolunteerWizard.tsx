"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { m } from "motion/react";
import { ArrowLeft, ArrowRight, Check, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import type { FormState } from "@/types";
import { submitVolunteer } from "@/lib/actions";
import { availabilityOptions, volunteerInterests } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { FormCtx, SpamFields } from "./FormShell";
import { ChipGroupField, CheckboxField, TextAreaField, TextField } from "./Fields";

const steps = [
  { id: "personal", title: "About you", help: "How can we reach you?", fields: ["fullName", "email", "phone", "location"] },
  { id: "skills", title: "Your skills", help: "What can you bring to CEST’s work?", fields: ["skills"] },
  { id: "interest", title: "Areas of interest", help: "Where would you most like to help?", fields: ["interest"] },
  { id: "availability", title: "Availability", help: "When are you able to help?", fields: ["availability"] },
  { id: "message", title: "Your message", help: "Tell us why you would like to volunteer.", fields: ["motivation", "consent"] },
] as const;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^[+()\d][\d\s().-]{5,24}$/;

/** Quick client-side checks that mirror the server schema, so people get instant feedback. The server remains the source of truth. */
function validate(stepIndex: number, form: HTMLFormElement): Record<string, string[]> {
  const data = new FormData(form);
  const val = (k: string) => String(data.get(k) ?? "").trim();
  const errors: Record<string, string[]> = {};
  for (const f of steps[stepIndex].fields) {
    const v = val(f);
    if (f === "fullName" && v.length < 2) errors[f] = ["Full name is required."];
    if (f === "email" && !emailRe.test(v)) errors[f] = ["Enter a valid email address."];
    if (f === "phone" && !phoneRe.test(v)) errors[f] = ["Enter a valid phone number."];
    if (f === "location" && v.length < 2) errors[f] = ["Location is required."];
    if (f === "skills" && v.length < 3) errors[f] = ["Please write at least 3 characters."];
    if (f === "interest" && !v) errors[f] = ["Choose an area of interest."];
    if (f === "availability" && !v) errors[f] = ["Choose your availability."];
    if (f === "motivation" && v.length < 20) errors[f] = ["Please write at least 20 characters."];
    if (f === "consent" && data.get("consent") !== "on") errors[f] = ["Please agree so we can contact you about volunteering."];
  }
  return errors;
}

function stepOfField(field: string) {
  return steps.findIndex((s) => (s.fields as readonly string[]).includes(field));
}

const initial: FormState = { status: "idle" };

/**
 * Five-step volunteer application. All five panels stay mounted (so every answer is
 * submitted together in one request to the same server action as before); only the
 * active one is shown. Steps animate with a short slide + fade.
 */
export function VolunteerWizard() {
  const formId = useId();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [localErrors, setLocalErrors] = useState<Record<string, string[]>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const successRef = useRef<HTMLDivElement>(null);

  const [state, formAction, pending] = useActionState(async (prev: FormState, fd: FormData): Promise<FormState> => {
    const res = await submitVolunteer(prev, fd);
    if (res.status === "error" && res.fieldErrors) {
      const first = Math.min(...Object.keys(res.fieldErrors).map(stepOfField).filter((i) => i >= 0));
      if (Number.isFinite(first)) {
        setDirection(first >= step ? 1 : -1);
        setStep(first);
      }
    }
    return res;
  }, initial);

  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  // Move focus to the step heading when the step changes (not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const go = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setLocalErrors({});
    setStep(target);
  };

  const next = () => {
    if (!formRef.current) return;
    const errors = validate(step, formRef.current);
    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      formRef.current.querySelector<HTMLElement>(`[aria-invalid="true"]`)?.focus();
      return;
    }
    go(Math.min(step + 1, steps.length - 1));
  };

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-primary-900">
        <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="inline-block">
          <CircleCheck aria-hidden="true" className="size-12 text-primary-700" />
        </m.span>
        <p className="mt-4 font-display text-3xl font-semibold">Application received</p>
        <p className="mt-2 text-lg">{state.message}</p>
        <Link href="/" className="mt-6 inline-block font-bold text-primary-800 underline">
          Back to the homepage
        </Link>
      </div>
    );
  }

  const merged: FormState = { ...state, fieldErrors: { ...state.fieldErrors, ...localErrors } };
  const last = step === steps.length - 1;

  return (
    <FormCtx.Provider value={{ state: merged, formId }}>
      <form
        ref={formRef}
        action={formAction}
        noValidate
        onKeyDown={(e) => {
          // Enter in a text field means "Next" on every step but the last (there is no submit button yet).
          const el = e.target as HTMLElement;
          if (e.key === "Enter" && !last && el.tagName === "INPUT" && (el as HTMLInputElement).type !== "radio") {
            e.preventDefault();
            next();
          }
        }}
        onSubmit={(e) => {
          if (!last) {
            e.preventDefault();
            next();
          }
        }}
      >
        {/* Progress: 01 — 02 — 03 — 04 — 05 */}
        <ol aria-label="Application progress" className="mb-10 flex items-center">
          {steps.map((s, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={s.id} className={cn("flex items-center", i < steps.length - 1 && "flex-1")}>
                <button
                  type="button"
                  onClick={() => i < step && go(i)}
                  disabled={i >= step}
                  aria-current={current ? "step" : undefined}
                  aria-label={`Step ${i + 1}: ${s.title}${done ? " (completed)" : ""}`}
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold tabular-nums transition-all duration-300 sm:size-11 sm:text-sm",
                    done && "border-primary-700 bg-primary-700 text-white hover:bg-primary-800",
                    current && "scale-110 border-primary-700 bg-white text-primary-800 shadow-md",
                    !done && !current && "border-sand-300 bg-white text-muted",
                  )}
                >
                  {done ? <Check aria-hidden="true" className="size-5" /> : String(i + 1).padStart(2, "0")}
                </button>
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="relative mx-1 block h-0.5 flex-1 bg-sand-300 sm:mx-2">
                    <span className={cn("absolute inset-0 origin-left bg-primary-700 transition-transform duration-500", i < step ? "scale-x-100" : "scale-x-0")} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        {state.status === "error" && state.message && (
          <div role="alert" className="mb-6 flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-4 text-red-900">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p>{state.message}</p>
          </div>
        )}

        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-secondary-700">
          Step {step + 1} of {steps.length}
        </p>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-semibold outline-none sm:text-4xl">
          {steps[step].title}
        </h3>
        <p className="mb-8 mt-2 text-muted">{steps[step].help}</p>

        <Panel active={step === 0} direction={direction}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextField name="fullName" label="Full name" required autoComplete="name" />
            <TextField name="email" label="Email" type="email" required autoComplete="email" inputMode="email" />
            <TextField name="phone" label="Phone" type="tel" required autoComplete="tel" inputMode="tel" hint="Include your country code, e.g. +232…" />
            <TextField name="location" label="Location" required autoComplete="address-level2" hint="Town or city, and country" />
          </div>
        </Panel>

        <Panel active={step === 1} direction={direction}>
          <TextAreaField name="skills" label="Skills" required rows={5} maxLength={1000} hint="For example teaching, farming, IT, writing, photography, accounting." />
        </Panel>

        <Panel active={step === 2} direction={direction}>
          <ChipGroupField name="interest" label="Area of interest" required options={volunteerInterests} />
        </Panel>

        <Panel active={step === 3} direction={direction}>
          <ChipGroupField name="availability" label="Availability" required options={availabilityOptions} />
        </Panel>

        <Panel active={step === 4} direction={direction}>
          <div className="space-y-5">
            <TextAreaField name="motivation" label="Why would you like to volunteer?" required rows={6} maxLength={1500} />
            <CheckboxField name="consent">
              I agree that CEST may store the details I provide to respond to me. See the{" "}
              <Link href="/privacy" className="font-semibold underline">
                Privacy Policy
              </Link>
              .
            </CheckboxField>
          </div>
        </Panel>

        <SpamFields startedRef={startedRef} />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="ghost" onClick={() => go(step - 1)} className={cn(step === 0 && "invisible")} aria-hidden={step === 0}>
            <ArrowLeft aria-hidden="true" className="size-5" /> Back
          </Button>
          {last ? (
            <Button type="submit" disabled={pending} className="w-full sm:w-auto">
              {pending && <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />}
              {pending ? "Submitting…" : "Submit Volunteer Application"}
            </Button>
          ) : (
            <Button type="button" onClick={next}>
              Next <ArrowRight aria-hidden="true" className="size-5" />
            </Button>
          )}
        </div>
      </form>
    </FormCtx.Provider>
  );
}

/** One wizard step. Always mounted; hidden when inactive; slides + fades in when it becomes active. */
function Panel({ active, direction, children }: { active: boolean; direction: number; children: React.ReactNode }) {
  return (
    <m.div
      hidden={!active}
      initial={false}
      animate={active ? "in" : "out"}
      variants={{
        in: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.2, 0.7, 0.1, 1] } },
        out: { opacity: 0, x: direction * 28, transition: { duration: 0 } },
      }}
    >
      {children}
    </m.div>
  );
}
