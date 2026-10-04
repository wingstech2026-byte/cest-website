import { missionPoints, visionIdeas } from "@/data/story";
import { Container } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Screen 8: mission and vision as two large visual statements with different
 * compositions and slow-drifting background shapes (CSS only, disabled for reduced motion).
 */
export function MissionVision() {
  return (
    <>
      {/* Mission: dark, headline left, detail right */}
      <section id="vision-mission" aria-labelledby="mission-title" className="relative isolate scroll-mt-20 overflow-hidden bg-primary-800 py-28 text-white sm:py-36">
        <span aria-hidden="true" className="float-slow absolute -right-40 -top-40 -z-10 size-[40rem] rounded-full border border-white/10" />
        <span aria-hidden="true" className="float-slow absolute -bottom-52 left-1/3 -z-10 size-[30rem] rounded-full border border-accent-400/25" />
        <span aria-hidden="true" className="pattern-dots absolute inset-0 -z-10 opacity-60" />
        <Container className="max-w-[90rem]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-accent-300">Our mission</p>
              <AnimatedHeading
                id="mission-title"
                lines={["Change agents", "for a better", "nation."]}
                className="font-display text-[clamp(2.2rem,7vw,6.5rem)] font-semibold uppercase leading-[0.95]"
              />
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <p className="text-lg leading-relaxed text-white/90 sm:text-xl">
                  CEST is a group of like-minded people serving as change agents for society’s transformation. Through
                  community engagement, youth-led action and business skills, we work to meet the challenges our country
                  faces and to build a better, more prosperous nation.
                </p>
              </Reveal>
              <RevealGroup as="ul" className="mt-8 space-y-4" stagger={0.12}>
                {missionPoints.map((p) => (
                  <RevealItem as="li" key={p} className="flex gap-4 border-t border-white/20 pt-4 text-white/90">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-accent-400" />
                    {p}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision: light, centred editorial statement */}
      <section aria-labelledby="vision-title" className="relative isolate overflow-hidden bg-canvas py-28 sm:py-40">
        <span aria-hidden="true" className="float-slow absolute left-[8%] top-16 -z-10 size-40 rounded-full bg-accent-300/40 blur-2xl" />
        <span aria-hidden="true" className="float-slow absolute bottom-10 right-[10%] -z-10 size-56 rounded-full bg-secondary-100/70 blur-2xl" />
        <Container className="max-w-6xl text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Our vision</p>
          <h2 id="vision-title" className="sr-only">
            Our vision
          </h2>
          <Reveal>
            <p className="font-display text-[clamp(2.2rem,6vw,5.25rem)] font-medium italic leading-[1.08] text-primary-800">
              “Society change through community engagement and youth-led action.”
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              CEST is anchored on changing society through community engagement and youth-led action, instilling
              responsible and patriotic citizenship. It also seeks to reach more clients through its corporate work and
              generate income, to improve the lives of CEST members and clients for a better nation.
            </p>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 flex flex-wrap justify-center gap-3" stagger={0.07}>
            {visionIdeas.map((v) => (
              <RevealItem as="li" key={v} className="rounded-full border border-primary-200 bg-white px-5 py-2 text-sm font-semibold text-primary-800">
                {v}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
