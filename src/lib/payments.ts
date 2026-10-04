/**
 * Payment architecture for online giving. NOTHING here takes money yet: every
 * provider is disabled, and the donate page shows
 * "[DONATION PAYMENT SYSTEM TO BE CONNECTED]" until one is switched on.
 *
 * To connect a provider later:
 *  1. Implement `createCheckout()` for it (server-side, using secret keys from env vars).
 *  2. Set `enabled: true` and give it a `createCheckout` function.
 *  3. The donation card then calls `startDonation()` instead of showing the notice.
 */

export type DonationFrequency = "one-time" | "monthly" | "corporate";

export interface DonationRequest {
  amount: number;
  currency: "USD" | "SLE";
  frequency: DonationFrequency;
}

export interface PaymentProvider {
  id: "stripe" | "paypal" | "mobile-money" | "bank-transfer";
  label: string;
  note: string;
  enabled: boolean;
  /** Returns a hosted-checkout URL to redirect the donor to. */
  createCheckout?: (req: DonationRequest) => Promise<{ url: string }>;
}

export const paymentProviders: PaymentProvider[] = [
  { id: "stripe", label: "Card payments (Stripe)", note: "International cards", enabled: false },
  { id: "paypal", label: "PayPal", note: "International donors", enabled: false },
  { id: "mobile-money", label: "Mobile money", note: "Sierra Leone mobile money providers", enabled: false },
  { id: "bank-transfer", label: "Bank transfer", note: "Account details to be provided by CEST", enabled: false },
];

export const paymentsEnabled = paymentProviders.some((p) => p.enabled);

export const PAYMENT_NOTICE = "[DONATION PAYMENT SYSTEM TO BE CONNECTED]";
