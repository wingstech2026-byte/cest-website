import type { IconName } from "@/types";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

const palettes = [
  "bg-primary-700",
  "bg-secondary-700",
  "bg-[#8a4a35]", // deepened clay
  "bg-primary-800",
  "bg-secondary-800",
  "bg-[#7a5a0a]", // deepened amber
  "bg-primary-600",
];

/**
 * Designed stand-in for programs that do not yet have a matching real CEST photo.
 * Decorative only (aria-hidden): never presented as a photograph of CEST’s work.
 */
export function ProgramArt({
  index,
  icon,
  className,
}: {
  index: number;
  icon: IconName;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pattern-dots relative flex h-full w-full items-center justify-center overflow-hidden", palettes[index % palettes.length], className)}
    >
      <span className="absolute -left-[12%] -top-[12%] size-[70%] rounded-full border border-white/15" />
      <span className="absolute -bottom-[18%] -right-[10%] size-[80%] rounded-full border border-white/10" />
      <Icon name={icon} className="size-[34%] text-white/25" strokeWidth={1} />
      <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
        Photo to be added
      </span>
    </div>
  );
}
