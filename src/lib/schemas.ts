import { z } from "zod";
import { cleanText, hasLineBreaks } from "./sanitize";
import { programs } from "@/data/programs";

const short = (label: string, min = 2, max = 120) =>
  z
    .string({ error: `${label} is required.` })
    .transform((v) => cleanText(v))
    .pipe(
      z
        .string()
        .min(min, `${label} is required.`)
        .max(max, `${label} is too long.`)
        .refine((v) => !hasLineBreaks(v), `${label} is not valid.`),
    );

const optionalShort = (max = 120) =>
  z
    .string()
    .optional()
    .transform((v) => cleanText(v ?? ""))
    .pipe(z.string().max(max, "This is too long."));

const long = (label: string, min: number, max = 2000) =>
  z
    .string({ error: `${label} is required.` })
    .transform((v) => cleanText(v, { multiline: true }))
    .pipe(
      z
        .string()
        .min(min, min > 1 ? `Please write at least ${min} characters.` : `${label} is required.`)
        .max(max, `Please keep this under ${max} characters.`),
    );

const email = z
  .string({ error: "Email is required." })
  .transform((v) => cleanText(v).toLowerCase())
  .pipe(z.string().min(1, "Email is required.").max(254, "Email is too long.").email("Enter a valid email address."));

const phoneRe = /^[+()\d][\d\s().-]{5,24}$/;
const phone = z
  .string()
  .optional()
  .transform((v) => cleanText(v ?? ""))
  .pipe(z.string().refine((v) => v === "" || phoneRe.test(v), "Enter a valid phone number."));
const requiredPhone = z
  .string({ error: "Phone number is required." })
  .transform((v) => cleanText(v))
  .pipe(z.string().regex(phoneRe, "Enter a valid phone number."));

/** HTML checkboxes send "on" when ticked and nothing when not. */
const mustConsent = (msg: string) =>
  z
    .string()
    .optional()
    .refine((v) => v === "on" || v === "true", msg)
    .transform(() => true as const);

export const volunteerInterests = [
  ...programs.map((p) => p.title),
  "Events and fundraising",
  "Communications and media",
  "Other",
] as const;

export const availabilityOptions = [
  "Weekdays",
  "Weekends",
  "Evenings",
  "A few hours a month",
  "Full-time for a period",
  "Remote / from the diaspora",
] as const;

export const contactSchema = z.object({
  name: short("Your name"),
  email,
  phone,
  subject: short("Subject", 3, 150),
  message: long("Message", 10),
});

export const volunteerSchema = z.object({
  fullName: short("Full name"),
  email,
  phone: requiredPhone,
  location: short("Location"),
  interest: z.enum(volunteerInterests, { error: "Choose an area of interest." }),
  skills: long("Skills", 3, 1000),
  availability: z.enum(availabilityOptions, { error: "Choose your availability." }),
  motivation: long("This answer", 20, 1500),
  consent: mustConsent("Please agree so we can contact you about volunteering."),
});

export const partnerSchema = z.object({
  organisation: short("Organisation name"),
  contactName: short("Contact person"),
  email,
  phone,
  orgType: z.enum(
    ["Development partner / NGO", "Government body", "Business / corporate", "School or training institution", "Community group", "Other"],
    { error: "Choose an organisation type." },
  ),
  message: long("Message", 20),
  consent: mustConsent("Please agree so we can contact you about this partnership."),
});

export const membershipSchema = z.object({
  fullName: short("Full name"),
  email,
  phone: requiredPhone,
  location: short("Where do you live?"),
  eligible: mustConsent("Membership is open to Sierra Leoneans aged 18 or over."),
  message: z
    .string()
    .optional()
    .transform((v) => cleanText(v ?? "", { multiline: true }))
    .pipe(z.string().max(1000, "Please keep this under 1000 characters.")),
  consent: mustConsent("Please agree so we can contact you about membership."),
});

export const newsletterSchema = z.object({
  email,
  consent: mustConsent("Please agree to receive updates."),
});

export type FormKind = "contact" | "volunteer" | "partner" | "membership" | "newsletter";
export { optionalShort };
