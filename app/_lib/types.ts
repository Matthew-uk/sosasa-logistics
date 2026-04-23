import type { LucideIcon } from "lucide-react";

export interface NavLink { href: string; label: string }
export interface StatItem { icon: LucideIcon; value: number; suffix: string; label: string }
export interface ServiceItem { icon: LucideIcon; title: string; desc: string; features: string[]; accent?: boolean }
export interface TestimonialItem { name: string; role: string; text: string; rating: number; img: string }
export interface GalleryItem { src: string; title: string; cat: string; span: string; rowSpan?: string }
export interface TrackStep { label: string; time: string; done: boolean; location: string }
export interface TrackResult { id: string; status: string; from: string; to: string; progress: number; steps: TrackStep[] }
export interface ValueItem { icon: LucideIcon; title: string; desc: string }

export interface ProjectStat { label: string; value: string }
export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  location: string;
  year: string;
  completionDate: string;
  shortDesc: string;
  fullDesc: string[];
  heroImage: string;
  gallery: string[];
  stats: ProjectStat[];
  tags: string[];
  featured?: boolean;
}
