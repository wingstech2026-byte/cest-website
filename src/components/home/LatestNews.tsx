import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/content";
import { Container } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { NewsMagazine } from "./NewsMagazine";

export async function LatestNews() {
  const posts = (await getPosts()).slice(0, 3);
  return (
    <section aria-labelledby="news-title" className="bg-white py-24 sm:py-32">
      <Container className="max-w-[90rem]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">News & stories</p>
            <AnimatedHeading
              id="news-title"
              lines={["The latest", "from CEST."]}
              className="font-display text-[clamp(2rem,7vw,6rem)] font-semibold uppercase leading-[0.95]"
            />
          </div>
          <Link href="/news" className="group inline-flex min-h-11 items-center gap-2 text-lg font-bold text-primary-700">
            <span className="link-underline">All news</span>
            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <NewsMagazine posts={posts} />
      </Container>
    </section>
  );
}
