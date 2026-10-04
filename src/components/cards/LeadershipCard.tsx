import Image from "next/image";
import { Users } from "lucide-react";
import type { Person } from "@/types";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Large portrait card. With a verified photo: the photo zooms on hover and the name and
 * position slide up. Without one: a designed [PHOTO] panel. Names are NEVER shown unless
 * CEST has supplied and approved them (src/data/leadership.ts).
 */
export function LeadershipCard({ person }: { person: Person }) {
  return (
    <Reveal>
      <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-800 text-white" data-cursor={person.photo ? "VIEW" : undefined}>
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name ? `Portrait of ${person.name}, ${person.position}` : ""}
            fill
            quality={75}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div aria-hidden="true" className="pattern-dots absolute inset-0 flex items-center justify-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
            <span className="absolute -right-10 -top-10 size-60 rounded-full border border-white/15" />
            <Users className="size-1/3 text-white/20" strokeWidth={1} />
            <span className="placeholder-chip absolute top-5 left-5">[PHOTO]</span>
          </div>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="transition-transform duration-500 group-hover:-translate-y-2">
            <p className="font-display text-2xl font-semibold leading-tight">
              {person.name ?? <span className="placeholder-chip">[NAME]</span>}
            </p>
            <p className="mt-1 font-semibold text-accent-300">{person.position}</p>
            {person.note && <p className="mt-2 text-sm text-white/85">{person.note}</p>}
          </div>
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name ?? person.position} on LinkedIn (opens in a new tab)`}
              className="mt-3 inline-flex size-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
            >
              <LinkedInIcon />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}
