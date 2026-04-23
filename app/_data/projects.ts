import { IMG } from "../_lib/images";
import type { Project } from "../_lib/types";

export const projects: Project[] = [
  {
    slug: "agip-industrial-waste-transport",
    title: "Agip Industrial Waste Transport",
    client: "Nigerian Agip Oil Company",
    category: "Hazardous Materials",
    location: "Port Harcourt → Eleme",
    year: "2025",
    completionDate: "August 2025",
    shortDesc:
      "Transported 1,000L of certified industrial waste from Agip's refinery to an accredited disposal facility under full regulatory compliance.",
    fullDesc: [
      "SOSASA was contracted to handle the safe transfer of 1,000L of classified industrial waste from Agip's Port Harcourt operations to a certified disposal facility in Eleme.",
      "The engagement required full NUPRC and NESREA compliance, tamper-evident containerisation, GPS-tracked movement, and chain-of-custody documentation at every handoff.",
      "Our dedicated HAZMAT-certified team executed the transfer across a 72-hour window with zero incidents, zero leakage, and a complete audit trail delivered to the client within 24 hours of arrival.",
    ],
    heroImage: IMG.containers,
    gallery: [IMG.containers, IMG.port, IMG.truck, IMG.crane, IMG.loadingBay, IMG.driver],
    stats: [
      { label: "Volume", value: "1,000L" },
      { label: "Distance", value: "48 km" },
      { label: "Incidents", value: "0" },
      { label: "Completion", value: "72hr" },
    ],
    tags: ["HAZMAT", "Regulatory", "GPS-Tracked", "Chain of Custody"],
    featured: true,
  },
  {
    slug: "dangote-cement-northern-distribution",
    title: "Dangote Cement — Northern Distribution",
    client: "Dangote Cement PLC",
    category: "Bulk Freight",
    location: "Obajana → Kano, Kaduna, Sokoto",
    year: "2025",
    completionDate: "Ongoing",
    shortDesc:
      "Moved 500 tons of cement across Northern Nigeria under a multi-route contract with guaranteed 36-hour delivery windows.",
    fullDesc: [
      "A multi-route distribution contract with Dangote Cement PLC covering the Obajana-to-North corridor. SOSASA was selected for the route's historically difficult terrain and the client's strict dealer-level SLA requirements.",
      "We deployed 12 dedicated 30-ton haulage units with backup vehicles staged at Lokoja and Kaduna to absorb any road delays. Every drop was confirmed with photo proof-of-delivery and signed manifests.",
      "The engagement continues as a rolling contract, with SOSASA maintaining 98.7% on-time delivery across all northern dealer hubs.",
    ],
    heroImage: IMG.truck,
    gallery: [IMG.truck, IMG.trucks, IMG.highway, IMG.cargo, IMG.workers, IMG.warehouse],
    stats: [
      { label: "Tonnage", value: "500t" },
      { label: "Routes", value: "4" },
      { label: "Fleet", value: "12 units" },
      { label: "On-Time", value: "98.7%" },
    ],
    tags: ["Bulk Freight", "Interstate", "Dealer Network", "Rolling Contract"],
    featured: true,
  },
  {
    slug: "fmoh-vaccine-cold-chain",
    title: "FMoH Vaccine Cold Chain Distribution",
    client: "Federal Ministry of Health",
    category: "Temperature-Controlled",
    location: "Abuja → 12 States",
    year: "2024",
    completionDate: "December 2024",
    shortDesc:
      "Temperature-controlled distribution of vaccines to 12 state-level storage facilities within a 48-hour window.",
    fullDesc: [
      "SOSASA was appointed as the logistics partner for the FMoH's last-mile vaccine rollout, covering 12 state capitals from the Abuja national cold store.",
      "Every unit was transported in 2-8°C cold-chain containers with real-time temperature telemetry, alerts for any threshold deviation, and dual-driver staffing for continuous transit.",
      "The entire operation was completed within 48 hours, with zero cold-chain breaches and full documentation handed to the ministry within the same window.",
    ],
    heroImage: IMG.packages,
    gallery: [IMG.packages, IMG.control, IMG.barcode, IMG.cargo, IMG.workers, IMG.truck],
    stats: [
      { label: "States", value: "12" },
      { label: "Temp Range", value: "2-8°C" },
      { label: "Breaches", value: "0" },
      { label: "Window", value: "48hr" },
    ],
    tags: ["Cold Chain", "Government", "Time-Critical", "Telemetry"],
    featured: true,
  },
  {
    slug: "chevron-drilling-equipment-transfer",
    title: "Chevron Drilling Equipment Transfer",
    client: "Chevron Nigeria Ltd",
    category: "Heavy Equipment",
    location: "Escravos → Apapa Port",
    year: "2024",
    completionDate: "October 2024",
    shortDesc:
      "Relocated specialist drilling equipment from the Escravos terminal to Apapa Port for onward export shipment.",
    fullDesc: [
      "The project required the movement of oversized drilling components from Chevron's Escravos terminal to Apapa Port, including route clearance with FERMA and escort-vehicle coordination for the Lagos approach.",
      "Our heavy-haul team handled the full operation end-to-end: permit filing, police escort coordination, route survey, load securing, and delivery at the port's heavy-cargo bay.",
      "Total transit was completed in 4 days — one day ahead of the contracted schedule — with every component arriving undamaged and the vessel making its booked departure window.",
    ],
    heroImage: IMG.crane,
    gallery: [IMG.crane, IMG.port, IMG.cargo, IMG.highway, IMG.trucks, IMG.loadingBay],
    stats: [
      { label: "Components", value: "14" },
      { label: "Distance", value: "620 km" },
      { label: "Schedule", value: "-1 day" },
      { label: "Damage", value: "0" },
    ],
    tags: ["Heavy Haul", "Oil & Gas", "Escort", "Port-Forward"],
  },
  {
    slug: "mtn-fibre-rollout",
    title: "MTN Fibre Rollout — SW Region",
    client: "MTN Nigeria",
    category: "Infrastructure Support",
    location: "Lagos, Ogun, Oyo, Osun",
    year: "2024",
    completionDate: "July 2024",
    shortDesc:
      "Primary logistics partner for MTN's fibre infrastructure deployment across the South-West region.",
    fullDesc: [
      "Over a six-month period, SOSASA served as the primary logistics partner for MTN's fibre deployment across Lagos, Ogun, Oyo, and Osun states.",
      "The scope covered daily delivery of fibre-optic drums, splice enclosures, HDPE ducting, and specialist field equipment to 180+ rolling work sites, each with its own access window and manifest.",
      "We maintained a same-day dispatch standard across the engagement, with a dedicated account manager and a live site-status dashboard shared with the client's project office.",
    ],
    heroImage: IMG.logistics,
    gallery: [IMG.logistics, IMG.warehouse, IMG.loadingBay, IMG.truck, IMG.rack, IMG.workers],
    stats: [
      { label: "Duration", value: "6 mo" },
      { label: "Sites", value: "180+" },
      { label: "States", value: "4" },
      { label: "Dispatch SLA", value: "Same-day" },
    ],
    tags: ["Telecoms", "Multi-State", "Account-Managed", "Dashboarded"],
  },
  {
    slug: "access-bank-branch-expansion",
    title: "Access Bank Branch Expansion",
    client: "Access Bank PLC",
    category: "Commercial Fit-Out",
    location: "Nationwide — 40 Branches",
    year: "2023",
    completionDate: "February 2024",
    shortDesc:
      "Full branch fit-out logistics for 40 new Access Bank locations — furniture, IT, and security equipment.",
    fullDesc: [
      "SOSASA handled the end-to-end fit-out logistics for 40 new Access Bank branches nationwide, covering furniture, IT hardware, ATM units, and security equipment.",
      "Every branch received a phased delivery schedule synced to the bank's site-readiness calendar — no early arrivals, no late arrivals, with items staged at regional hubs before final push.",
      "The rollout was completed within the contracted window, across 22 states, with zero damaged-on-arrival claims and a 100% client-sign-off rate at delivery.",
    ],
    heroImage: IMG.handshake,
    gallery: [IMG.handshake, IMG.warehouse, IMG.boxes, IMG.truck, IMG.workers, IMG.rack],
    stats: [
      { label: "Branches", value: "40" },
      { label: "States", value: "22" },
      { label: "Phases", value: "4" },
      { label: "Claims", value: "0" },
    ],
    tags: ["Commercial", "Phased Rollout", "Nationwide", "Zero-Claims"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getOtherProjects(slug: string, limit = 3): Project[] {
  return projects.filter((p) => p.slug !== slug).slice(0, limit);
}
