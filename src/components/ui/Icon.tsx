import {
  Briefcase,
  GraduationCap,
  Handshake,
  HeartPulse,
  House,
  Search,
  Sprout,
  Users,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/types";

const icons = {
  users: Users,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  "heart-pulse": HeartPulse,
  search: Search,
  home: House,
  sprout: Sprout,
} as const;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" {...props} />;
}
