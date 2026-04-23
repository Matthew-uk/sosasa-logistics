import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOtherProjects, getProject, projects } from "../../_data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.shortDesc,
    keywords: [project.client, project.category, ...project.tags, "SOSASA logistics"],
    openGraph: {
      title: `${project.title} — SOSASA Logistics`,
      description: project.shortDesc,
      type: "article",
      images: [project.heroImage],
    },
  };
}

export default async function Page(
  { params }: { params: Promise<RouteParams> }
) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const otherProjects = getOtherProjects(slug, 3);
  return <ProjectDetailClient project={project} otherProjects={otherProjects} />;
}
