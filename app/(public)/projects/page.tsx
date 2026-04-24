import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "SOSASA Logistics project portfolio — hazardous materials, bulk freight, cold-chain distribution, and commercial rollouts. Real contracts with Agip, Dangote, Chevron, MTN, Access Bank, and the FMoH.",
  keywords: [
    "logistics projects Nigeria", "Agip waste transport", "Dangote cement distribution",
    "vaccine cold chain", "Chevron heavy haul", "MTN fibre logistics",
  ],
  openGraph: {
    title: "Projects — SOSASA Logistics",
    description: "A record of real contracts delivered across Nigeria.",
  },
};

export default function Page() {
  return <ProjectsClient />;
}
