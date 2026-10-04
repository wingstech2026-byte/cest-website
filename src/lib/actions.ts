"use server";

import { headers } from "next/headers";
import type { z } from "zod";
import type { FormState } from "@/types";
import { site } from "@/data/site";
import { rateLimit } from "./rate-limit";
import { deliver } from "./notify";
import {
  contactSchema,
  membershipSchema,
  newsletterSchema,
  partnerSchema,
  volunteerSchema,
  type FormKind,
} from "./schemas";

const HONEYPOT_FIELD = "company_website";
const STARTED_AT_FIELD = "form_started_at";
const MIN_FILL_MS = 2500;

async function clientKey(kind: FormKind) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return `${kind}:${ip}`;
}

async function handleSubmission<S extends z.ZodType>(
  kind: FormKind,
  schema: S,
  formData: FormData,
  successMessage: string,
): Promise<FormState> {
  // 1. Honeypot: bots fill hidden fields. Pretend success so they learn nothing.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim() !== "") {
    return { status: "success", message: successMessage };
  }

  // 2. Too-fast submissions are almost always bots.
  const startedAt = Number(formData.get(STARTED_AT_FIELD));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", message: "That was very quick. Please check your answers and submit again." };
  }

  // 3. Rate limit per client and form.
  const limit = rateLimit(await clientKey(kind), { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterSeconds / 60));
    return {
      status: "error",
      message: `Too many submissions from your connection. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    };
  }

  // 4. Validate and sanitise.
  const raw: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key !== HONEYPOT_FIELD && key !== STARTED_AT_FIELD && !key.startsWith("$ACTION")) {
      raw[key] = value;
    }
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      (fieldErrors[field] ??= []).push(issue.message);
    }
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors, values: raw };
  }

  // 5. Deliver through the configured provider(s).
  const data: Record<string, string | boolean> = {};
  for (const [k, v] of Object.entries(parsed.data as Record<string, unknown>)) {
    if (typeof v === "string" || typeof v === "boolean") data[k] = v;
  }
  data.submittedAt = new Date().toISOString();

  const result = await deliver({ kind, data });
  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "not-configured"
          ? `This form is not connected yet. Please email us at ${site.email} instead.`
          : `Sorry, we could not send your message just now. Please try again, or email us at ${site.email}.`,
    };
  }
  return { status: "success", message: successMessage };
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  return handleSubmission(
    "contact",
    contactSchema,
    formData,
    "Thank you for contacting CEST. We have received your message and will reply as soon as we can.",
  );
}

export async function submitVolunteer(_prev: FormState, formData: FormData): Promise<FormState> {
  return handleSubmission(
    "volunteer",
    volunteerSchema,
    formData,
    "Thank you for your interest in supporting CEST. We will review your application and contact you.",
  );
}

export async function submitPartner(_prev: FormState, formData: FormData): Promise<FormState> {
  return handleSubmission(
    "partner",
    partnerSchema,
    formData,
    "Thank you for your interest in partnering with CEST. We will review your enquiry and contact you.",
  );
}

export async function submitMembership(_prev: FormState, formData: FormData): Promise<FormState> {
  return handleSubmission(
    "membership",
    membershipSchema,
    formData,
    "Thank you for your interest in joining CEST. A member of the executive will contact you about next steps.",
  );
}

export async function submitNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  return handleSubmission(
    "newsletter",
    newsletterSchema,
    formData,
    "Thank you! You are on our list for CEST updates.",
  );
}
