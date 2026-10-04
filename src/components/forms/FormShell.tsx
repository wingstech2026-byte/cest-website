"use client";

import { createContext, useActionState, useContext, useEffect, useId, useRef, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import type { FormState } from "@/types";
import { Button } from "@/components/ui/Button";

const initialState: FormState = { status: "idle" };
const FormCtx = createContext<{ state: FormState; formId: string }>({ state: initialState, formId: "form" });

export function useFormState() {
  return useContext(FormCtx).state;
}

/** Unique per form, so two forms on one page never share element ids. */
export function useFormId() {
  return useContext(FormCtx).formId;
}

/**
 * Shared wrapper for every public form: wires up the server action, shows a
 * success/error message to assistive tech, keeps typed values after an error,
 * moves focus to the first invalid field, and adds spam protection fields
 * (hidden honeypot + a "form opened at" timestamp checked on the server).
 */
export function FormShell({
  action,
  submitLabel,
  pendingLabel = "Sending…",
  children,
  successTitle = "Thank you",
  compact,
  tone = "light",
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
  pendingLabel?: string;
  children: ReactNode;
  successTitle?: string;
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "error" && state.fieldErrors) {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={
          tone === "dark"
            ? "rounded-xl border border-white/25 bg-white/10 p-4 text-white"
            : "rounded-2xl border border-primary-200 bg-primary-50 p-6 text-primary-900"
        }
      >
        <p className="flex items-center gap-2 font-bold">
          <CircleCheck aria-hidden="true" className="size-5 shrink-0" />
          {successTitle}
        </p>
        <p className="mt-2">{state.message}</p>
      </div>
    );
  }

  return (
    <FormCtx.Provider value={{ state, formId }}>
      <form ref={formRef} action={formAction} noValidate className={compact ? "space-y-3" : "space-y-5"}>
        {state.status === "error" && state.message && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-4 text-red-900"
          >
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p>{state.message}</p>
          </div>
        )}

        {children}

        {/* Spam protection: humans never see or fill these. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Leave this field empty
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
          <input ref={startedRef} type="hidden" name="form_started_at" defaultValue="" />
        </div>

        <Button type="submit" disabled={pending} variant={tone === "dark" ? "accent" : "primary"} className={compact ? "w-full sm:w-auto" : "w-full sm:w-auto"}>
          {pending && <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />}
          {pending ? pendingLabel : submitLabel}
        </Button>
      </form>
    </FormCtx.Provider>
  );
}
