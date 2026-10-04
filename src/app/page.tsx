import type { Metadata } from "next";
import { site } from "@/data/site";
import { getPrograms } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { ChangeStatement } from "@/components/home/ChangeStatement";
import { ImpactNumbers } from "@/components/home/ImpactNumbers";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ProgramExplorer } from "@/components/home/ProgramExplorer";
import { RealStories } from "@/components/home/RealStories";
import { DocumentaryStory } from "@/components/home/DocumentaryStory";
import { HistoryTimeline } from "@/components/home/HistoryTimeline";
import { MissionVision } from "@/components/home/MissionVision";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { GetInvolvedPaths } from "@/components/home/GetInvolvedPaths";
import { Accountability } from "@/components/home/Accountability";
import { LatestNews } from "@/components/home/LatestNews";
import { Partners } from "@/components/home/Partners";
import { DonateBand } from "@/components/home/DonateBand";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} (${site.shortName}) | ${site.motto}`,
    description: `${site.shortName} supports communities, empowers young people and creates pathways toward sustainable transformation in Sierra Leone.`,
    path: "/",
  }),
  title: { absolute: `${site.name} (${site.shortName}) | ${site.motto}` },
};

/** The homepage is a journey: hero → change → impact → what we do → programs → stories → history → purpose → projects → act → trust → donate → footer. */
export default async function HomePage() {
  const programs = await getPrograms();
  return (
    <>
      <Hero />
      <ChangeStatement />
      <ImpactNumbers />
      <WhatWeDo />
      <ProgramExplorer programs={programs} />
      <RealStories />
      <DocumentaryStory />
      <HistoryTimeline />
      <MissionVision />
      <FeaturedProjects />
      <GetInvolvedPaths />
      <Accountability />
      <LatestNews />
      <Partners />
      <DonateBand />
    </>
  );
}
