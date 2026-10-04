"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useRichMotion } from "@/components/motion/hooks";

/**
 * Hero photograph: fades in, settles with a slow zoom (CSS), and on desktop drifts
 * slightly slower than the page. Real CEST photograph: a community meeting in Masingbi area.
 */
export function HeroBackdrop() {
  const rich = useRichMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 140]);

  return (
    <div className="hero-bg absolute inset-0 -z-20">
      <m.div className="absolute inset-x-0 -inset-y-[6%]" style={rich ? { y } : undefined}>
        <div className="hero-zoom absolute inset-0">
          <Image
            src="/images/cest/community-meeting.jpg"
            alt="Community members seated in a circle under a thatched shelter, listening to a speaker during a CEST community meeting"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </m.div>
    </div>
  );
}
