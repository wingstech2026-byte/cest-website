"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Building2, Info, Repeat, Wallet } from "lucide-react";
import { PAYMENT_NOTICE, paymentProviders, paymentsEnabled, type DonationFrequency } from "@/lib/payments";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/components/motion/hooks";
import { cn } from "@/lib/utils";

const frequencies: Array<{ id: DonationFrequency; label: string; icon: typeof Wallet; hint: string }> = [
  { id: "one-time", label: "One-time", icon: Wallet, hint: "A single contribution" },
  { id: "monthly", label: "Monthly", icon: Repeat, hint: "Regular support" },
  { id: "corporate", label: "Corporate", icon: Building2, hint: "Partnership" },
];

const presets = [10, 25, 50, 100] as const;

/** Counts the displayed total smoothly to its new value. */
function AnimatedAmount({ value }: { value: number }) {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    if (reduced) {
      from.current = value;
      return;
    }
    const controls = animate(from.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
      onComplete: () => {
        from.current = value;
      },
    });
    return () => controls.stop();
  }, [value, reduced]);

  return <span className="tabular-nums">{(reduced ? value : shown).toLocaleString("en-US")}</span>;
}

/**
 * Donation card with the full interaction (frequency, preset amounts, custom amount, animated
 * total). It is deliberately NOT connected to any payment system: the submit button is
 * disabled and the notice below explains why. No outcome is promised for any amount.
 * To go live, enable a provider in src/lib/payments.ts and call its createCheckout().
 */
export function DonationCard() {
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");
  const [preset, setPreset] = useState<number | "custom">(25);
  const [custom, setCustom] = useState("");

  const customValue = Number(custom);
  const amount = preset === "custom" ? (Number.isFinite(customValue) && customValue > 0 ? Math.min(customValue, 1_000_000) : 0) : preset;
  const live = paymentsEnabled;

  return (
    <div className="rounded-3xl border border-sand-300 bg-white p-6 shadow-card sm:p-10">
      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary-700">How would you like to give?</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {frequencies.map(({ id, label, icon: I, hint }) => {
            const selected = frequency === id;
            return (
              <label
                key={id}
                className={cn(
                  "relative flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-all duration-200",
                  selected ? "scale-[1.02] border-primary-700 bg-primary-50" : "border-sand-300 hover:border-primary-600",
                  "focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-secondary-600",
                )}
              >
                <input type="radio" name="frequency" value={id} checked={selected} onChange={() => setFrequency(id)} className="sr-only" />
                <I aria-hidden="true" className={cn("size-6 shrink-0", selected ? "text-primary-700" : "text-muted")} />
                <span>
                  <span className="block font-bold">{label}</span>
                  <span className="block text-sm text-muted">{hint}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary-700">Choose an amount (USD)</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {presets.map((p) => {
            const selected = preset === p;
            return (
              <label
                key={p}
                className={cn(
                  "flex min-h-16 cursor-pointer items-center justify-center rounded-2xl border-2 font-display text-2xl font-semibold transition-all duration-200",
                  selected ? "scale-105 border-primary-700 bg-primary-700 text-white shadow-lg" : "border-sand-300 hover:border-primary-600 hover:bg-primary-50",
                  "focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-secondary-600",
                )}
              >
                <input type="radio" name="amount" value={p} checked={selected} onChange={() => setPreset(p)} className="sr-only" />${p}
              </label>
            );
          })}
          <label
            className={cn(
              "flex min-h-16 cursor-pointer items-center justify-center rounded-2xl border-2 text-lg font-bold transition-all duration-200",
              preset === "custom" ? "scale-105 border-primary-700 bg-primary-700 text-white shadow-lg" : "border-sand-300 hover:border-primary-600 hover:bg-primary-50",
              "focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-secondary-600",
            )}
          >
            <input type="radio" name="amount" value="custom" checked={preset === "custom"} onChange={() => setPreset("custom")} className="sr-only" />
            Other
          </label>
        </div>

        {preset === "custom" && (
          <div className="mt-4">
            <label htmlFor="custom-amount" className="mb-1.5 block text-sm font-semibold">
              Other amount (USD)
            </label>
            <div className="relative max-w-xs">
              <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-muted">
                $
              </span>
              <input
                id="custom-amount"
                inputMode="decimal"
                value={custom}
                onChange={(e) => setCustom(e.target.value.replace(/[^\d.]/g, "").slice(0, 9))}
                placeholder="0"
                className="block w-full rounded-xl border border-sand-300 bg-white py-3 pl-9 pr-4 text-lg"
              />
            </div>
          </div>
        )}
      </fieldset>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-sand-200 pt-8">
        <div aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Your {frequency === "monthly" ? "monthly " : ""}gift</p>
          <p className="font-display text-6xl font-semibold leading-none text-primary-800">
            $<AnimatedAmount value={amount} />
            {frequency === "monthly" && <span className="ml-1 text-2xl font-medium text-muted">/ month</span>}
          </p>
        </div>
        <Button
          size="lg"
          variant="accent"
          disabled={!live || amount <= 0}
          aria-describedby="payment-notice"
          className="w-full sm:w-auto"
        >
          Continue to payment
        </Button>
      </div>

      <div id="payment-notice" className="mt-6 rounded-2xl border-2 border-dashed border-[#c99a1b] bg-[#fff9e6] p-5 text-[#5c4300]">
        <p className="flex items-start gap-2 font-semibold">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          Online donations are not active yet.
        </p>
        <p className="mt-2">
          <Placeholder>{PAYMENT_NOTICE}</Placeholder>
        </p>
        <p className="mt-3 text-sm">
          No payment is taken on this page. To give or discuss a partnership now, please contact CEST directly.
          Providers planned: {paymentProviders.map((p) => p.label).join(", ")}.
        </p>
      </div>
    </div>
  );
}
