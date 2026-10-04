import { Fragment } from "react";
import { splitPlaceholders } from "@/lib/utils";

/** A visibly-marked placeholder that CEST still needs to fill in. */
export function Placeholder({ children = "[ADD INFORMATION]" }: { children?: string }) {
  return (
    <span className="placeholder-chip" title="Placeholder: replace with verified CEST information">
      {children}
    </span>
  );
}

/** Renders a string, turning any [BRACKETED] tokens into visible placeholder chips. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {splitPlaceholders(text).map((part, i) =>
        part.placeholder ? <Placeholder key={i}>{part.text}</Placeholder> : <Fragment key={i}>{part.text}</Fragment>,
      )}
    </>
  );
}
