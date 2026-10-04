/**
 * Content access layer: the single place pages read content from.
 *
 * Today everything comes from typed files in src/data. To move to a CMS or database
 * (Sanity, Supabase, Strapi, Contentful…), re-implement these functions to fetch from
 * it and keep returning the same types from src/types. No page or component needs to
 * change. Functions are async on purpose so a network call can be dropped in.
 */

import { programs } from "@/data/programs";
import { projects } from "@/data/projects";
import { posts, categorySlug } from "@/data/news";
import { leadership } from "@/data/leadership";
import { impactStats } from "@/data/impact";
import { gallery } from "@/data/gallery";
import { locations } from "@/data/locations";
import { partners } from "@/data/partners";
import { documents } from "@/data/documents";
import type { GalleryItem, ImpactStat, Location, Partner, Person, Post, PostCategory, Program, Project } from "@/types";
import type { OrgDocument } from "@/data/documents";

export async function getPrograms(): Promise<Program[]> {
  return programs;
}
export async function getProgram(slug: string): Promise<Program | undefined> {
  return programs.find((p) => p.slug === slug);
}

export async function getProjects(): Promise<Project[]> {
  return projects;
}
export async function getProject(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

export async function getPosts(): Promise<Post[]> {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
export async function getPost(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug);
}
export async function getPostsByCategory(slug: string): Promise<Post[]> {
  return (await getPosts()).filter((p) => categorySlug(p.category) === slug);
}
export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const all = (await getPosts()).filter((p) => p.slug !== post.slug);
  const same = all.filter((p) => p.category === post.category);
  return [...same, ...all.filter((p) => p.category !== post.category)].slice(0, limit);
}
export type { PostCategory };

export async function getLeadership(): Promise<Person[]> {
  return leadership;
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  return impactStats;
}

export async function getGallery(): Promise<GalleryItem[]> {
  return gallery;
}

export async function getLocations(): Promise<Location[]> {
  return locations;
}

export async function getPartners(): Promise<Partner[]> {
  return partners;
}

export async function getDocuments(): Promise<OrgDocument[]> {
  return documents;
}
