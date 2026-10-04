"use client";

import type { ReactNode } from "react";
import { useFormId, useFormState } from "./FormShell";
import { cn } from "@/lib/utils";

const control =
  "block w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-base text-ink " +
  "placeholder:text-muted/70 focus-visible:outline-offset-0 focus-visible:border-secondary-600 " +
  "aria-[invalid=true]:border-red-600";

interface BaseProps {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  tone?: "light" | "dark";
}

function Wrapper({
  id,
  label,
  required,
  hint,
  error,
  children,
  tone,
}: BaseProps & { id: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={cn("mb-1.5 block text-sm font-semibold", tone === "dark" && "text-white")}>
        {label}
        {required ? (
          <span className={cn("ml-1", tone === "dark" ? "text-accent-300" : "text-red-700")} aria-hidden="true">
            *
          </span>
        ) : (
          <span className={cn("ml-1 font-normal", tone === "dark" ? "text-white/80" : "text-muted")}>(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className={cn("mt-1.5 text-sm", tone === "dark" ? "text-white/80" : "text-muted")}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={cn("mt-1.5 text-sm font-medium", tone === "dark" ? "text-red-200" : "text-red-700")}>
          {error}
        </p>
      )}
    </div>
  );
}

function useFieldState(name: string, hint?: string) {
  const state = useFormState();
  const id = `${useFormId()}-${name}`;
  const error = state.fieldErrors?.[name]?.[0];
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return { id, error, describedBy, value: state.values?.[name] };
}

export function TextField({
  name,
  label,
  required,
  hint,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  maxLength = 200,
  tone,
}: BaseProps & {
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  placeholder?: string;
  maxLength?: number;
}) {
  const { id, error, describedBy, value } = useFieldState(name, hint);
  return (
    <Wrapper id={id} name={name} label={label} required={required} hint={hint} error={error} tone={tone}>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={control}
      />
    </Wrapper>
  );
}

export function TextAreaField({
  name,
  label,
  required,
  hint,
  rows = 5,
  maxLength = 2000,
  tone,
}: BaseProps & { rows?: number; maxLength?: number }) {
  const { id, error, describedBy, value } = useFieldState(name, hint);
  return (
    <Wrapper id={id} name={name} label={label} required={required} hint={hint} error={error} tone={tone}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        defaultValue={value}
        maxLength={maxLength}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(control, "resize-y")}
      />
    </Wrapper>
  );
}

export function SelectField({
  name,
  label,
  required,
  hint,
  options,
  tone,
}: BaseProps & { options: readonly string[] }) {
  const { id, error, describedBy, value } = useFieldState(name, hint);
  return (
    <Wrapper id={id} name={name} label={label} required={required} hint={hint} error={error} tone={tone}>
      <select
        key={value ?? "unset"}
        id={id}
        name={name}
        defaultValue={value ?? ""}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={control}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function CheckboxField({
  name,
  children,
  tone,
}: {
  name: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const { id, error, describedBy, value } = useFieldState(name);
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          key={String(value)}
          id={id}
          name={name}
          type="checkbox"
          defaultChecked={value === "on"}
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="mt-1 size-5 shrink-0 rounded border-sand-300 accent-primary-700"
        />
        <label htmlFor={id} className={cn("text-sm leading-snug", tone === "dark" ? "text-white/90" : "text-ink")}>
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className={cn("mt-1.5 text-sm font-medium", tone === "dark" ? "text-red-200" : "text-red-700")}>
          {error}
        </p>
      )}
    </div>
  );
}

/** Single-choice answers presented as large selectable chips (radio inputs underneath). */
export function ChipGroupField({
  name,
  label,
  required,
  options,
  hint,
}: {
  name: string;
  label: string;
  required?: boolean;
  options: readonly string[];
  hint?: string;
}) {
  const state = useFormState();
  const formId = useFormId();
  const id = `${formId}-${name}`;
  const error = state.fieldErrors?.[name]?.[0];
  const value = state.values?.[name];
  return (
    <fieldset aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}>
      <legend className="mb-3 text-sm font-semibold">
        {label}
        {required && (
          <span className="ml-1 text-red-700" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label
            key={o + String(value)}
            className="cursor-pointer rounded-full border-2 border-sand-300 bg-white px-4 py-2.5 text-[0.95rem] font-semibold transition-all duration-200 hover:border-primary-600 has-[:checked]:scale-[1.03] has-[:checked]:border-primary-700 has-[:checked]:bg-primary-700 has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-secondary-600"
          >
            <input type="radio" name={name} value={o} defaultChecked={value === o} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}
