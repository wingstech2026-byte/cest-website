"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-4xl font-extrabold">Something went wrong</h1>
        <p className="mt-4 text-lg text-muted">
          Sorry, this page could not be loaded. Please try again, or contact CEST if the problem continues.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => retry()}>Try again</Button>
          <ButtonLink href="/" variant="outline">
            Go to homepage
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
