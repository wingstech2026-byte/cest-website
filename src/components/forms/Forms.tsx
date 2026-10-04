import Link from "next/link";
import {
  submitContact,
  submitMembership,
  submitNewsletter,
  submitPartner,
} from "@/lib/actions";
import { FormShell } from "./FormShell";
import { CheckboxField, SelectField, TextAreaField, TextField } from "./Fields";

const privacyNote = (
  <>
    I agree that CEST may store the details I provide to respond to me. See the{" "}
    <Link href="/privacy" className="font-semibold underline">
      Privacy Policy
    </Link>
    .
  </>
);

export function ContactForm() {
  return (
    <FormShell action={submitContact} submitLabel="Send message" successTitle="Message sent">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField name="name" label="Your name" required autoComplete="name" />
        <TextField name="email" label="Email" type="email" required autoComplete="email" inputMode="email" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" />
        <TextField name="subject" label="Subject" required />
      </div>
      <TextAreaField name="message" label="Message" required />
      <p className="text-sm text-muted">Your details are used only to reply to you. See our <Link href="/privacy" className="font-semibold underline">Privacy Policy</Link>.</p>
    </FormShell>
  );
}

export function PartnerForm() {
  return (
    <FormShell action={submitPartner} submitLabel="Send partnership enquiry" successTitle="Enquiry received">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField name="organisation" label="Organisation" required autoComplete="organization" />
        <TextField name="contactName" label="Contact person" required autoComplete="name" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField name="email" label="Email" type="email" required autoComplete="email" inputMode="email" />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel" />
      </div>
      <SelectField
        name="orgType"
        label="Type of organisation"
        required
        options={[
          "Development partner / NGO",
          "Government body",
          "Business / corporate",
          "School or training institution",
          "Community group",
          "Other",
        ]}
      />
      <TextAreaField name="message" label="How would you like to work with CEST?" required />
      <CheckboxField name="consent">{privacyNote}</CheckboxField>
    </FormShell>
  );
}

export function MembershipForm() {
  return (
    <FormShell action={submitMembership} submitLabel="Express interest in joining" successTitle="Interest received">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField name="fullName" label="Full name" required autoComplete="name" />
        <TextField name="email" label="Email" type="email" required autoComplete="email" inputMode="email" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField name="phone" label="Phone" type="tel" required autoComplete="tel" inputMode="tel" />
        <TextField name="location" label="Where do you live?" required hint="Town or city, and country (home or diaspora)" />
      </div>
      <TextAreaField name="message" label="Anything you would like us to know?" rows={3} maxLength={1000} />
      <CheckboxField name="eligible">I am a Sierra Leonean aged 18 or over, as required for CEST membership.</CheckboxField>
      <CheckboxField name="consent">{privacyNote}</CheckboxField>
    </FormShell>
  );
}

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <FormShell action={submitNewsletter} submitLabel="Subscribe" pendingLabel="Subscribing…" compact tone={tone} successTitle="You’re subscribed">
      <TextField name="email" label="Email address" type="email" required autoComplete="email" inputMode="email" tone={tone} />
      <CheckboxField name="consent" tone={tone}>
        Send me occasional CEST updates. I can unsubscribe at any time.
      </CheckboxField>
    </FormShell>
  );
}
