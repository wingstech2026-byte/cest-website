import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ProjectGrid } from "./ProjectGrid";

/** Screen 9: featured projects (real activities only; the template entry is not featured). */
export async function FeaturedProjects() {
  const projects = (await getProjects()).filter((p) => !p.isPlaceholder);
  return (
    <section aria-labelledby="projects-title" className="bg-white py-24 sm:py-32">
      <Container className="max-w-[90rem]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Projects</p>
            <AnimatedHeading
              id="projects-title"
              lines={["Work on", "the ground."]}
              className="font-display text-[clamp(2rem,7vw,6.5rem)] font-semibold uppercase leading-[0.95]"
            />
          </div>
          <Link href="/projects" data-cursor="EXPLORE" className="group inline-flex min-h-11 items-center gap-2 text-lg font-bold text-primary-700">
            <span className="link-underline">All projects</span>
            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ProjectGrid projects={projects} />
        <p className="mt-6 text-sm text-muted">More verified project details will be added as they are confirmed.</p>
      </Container>
    </section>
  );
}
