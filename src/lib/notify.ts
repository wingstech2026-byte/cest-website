import "server-only";
import { escapeHtml } from "./sanitize";
import type { FormKind } from "./schemas";

/**
 * Delivery adapter for form submissions. The forms never talk to a provider
 * directly, so a different service can be swapped in by editing this file only.
 *
 *  1. Resend email   -> RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL)
 *  2. Supabase table -> SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (table: form_submissions)
 *  3. Log only       -> development, or FORMS_LOG_ONLY=true (nothing is delivered!)
 *
 * If more than one provider is configured, all are used. If none is configured in
 * production, the submission is rejected so that nothing is silently lost.
 */

export interface Submission {
  kind: FormKind;
  data: Record<string, string | boolean>;
}

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

const LABELS: Record<FormKind, string> = {
  contact: "Contact message",
  volunteer: "Volunteer application",
  partner: "Partnership enquiry",
  membership: "Membership interest",
  newsletter: "Newsletter signup",
};

function toText(s: Submission) {
  return Object.entries(s.data)
    .map(([k, v]) => `${k}: ${typeof v === "boolean" ? (v ? "yes" : "no") : v}`)
    .join("\n");
}

function toHtml(s: Submission) {
  const rows = Object.entries(s.data)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#52605a;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(
          typeof v === "boolean" ? (v ? "yes" : "no") : v,
        )}</td></tr>`,
    )
    .join("");
  return `<h2 style="font-family:sans-serif">${escapeHtml(LABELS[s.kind])}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`;
}

async function sendResend(s: Submission): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return false;

  const replyTo = typeof s.data.email === "string" ? s.data.email : undefined;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "CEST Website <onboarding@resend.dev>",
      to: to.split(",").map((x) => x.trim()),
      reply_to: replyTo,
      subject: `[CEST website] ${LABELS[s.kind]}`,
      text: toText(s),
      html: toHtml(s),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  return true;
}

async function saveSupabase(s: Submission): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/form_submissions`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ kind: s.kind, payload: s.data }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
  return true;
}

export async function deliver(s: Submission): Promise<DeliveryResult> {
  let delivered = false;
  let failed = false;

  for (const send of [sendResend, saveSupabase]) {
    try {
      if (await send(s)) delivered = true;
    } catch (err) {
      failed = true;
      console.error(`[forms] ${send.name} failed:`, err instanceof Error ? err.message : err);
    }
  }

  if (delivered) return { ok: true };
  if (failed) return { ok: false, reason: "failed" };

  if (process.env.NODE_ENV !== "production" || process.env.FORMS_LOG_ONLY === "true") {
    // Never log personal data in production logs; only the form type.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[forms] (log-only) ${LABELS[s.kind]}\n${toText(s)}`);
    } else {
      console.info(`[forms] (log-only) received ${LABELS[s.kind]}; not delivered because no provider is configured`);
    }
    return { ok: true };
  }
  return { ok: false, reason: "not-configured" };
}
