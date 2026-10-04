import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stand-in used where CEST has no suitable real photo yet. It is labelled, so it can
 * never be mistaken for an actual CEST activity photo.
 */
export function ImagePlaceholder({
  label = "Photo to be added",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} (placeholder image)`}
      className={cn(
        "pattern-dots flex h-full w-full flex-col items-center justify-center gap-2 bg-primary-700 p-6 text-center text-white/90",
        className,
      )}
    >
      <ImageIcon aria-hidden="true" className="size-9" />
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-xs text-white/80">Placeholder: replace with a CEST photo</span>
    </div>
  );
}
