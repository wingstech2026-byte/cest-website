import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <Section tone="canvas" className="min-h-[60vh]">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary-700">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold">We couldn’t find that page</h1>
        <p className="mt-4 text-lg text-muted">
          The page may have moved or the link may be wrong. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Go to homepage</ButtonLink>
          <ButtonLink href="/programs" variant="outline">
            Our programs
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
