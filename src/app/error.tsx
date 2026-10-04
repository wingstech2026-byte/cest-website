"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] bg-night text-white">
      <Container className="pb-24 pt-44">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-display text-4xl font-semibold uppercase">Something went wrong</h1>
          <p className="mt-4 text-lg text-white/85">
            Sorry, this page could not be loaded. Please try again, or contact CEST if the problem continues.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="accent" onClick={() => retry()}>
              Try again
            </Button>
            <ButtonLink href="/" variant="outlineLight">
              Go to homepage
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
