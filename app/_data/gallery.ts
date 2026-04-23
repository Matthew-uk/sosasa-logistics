import { IMG } from "../_lib/images";
import type { GalleryItem } from "../_lib/types";

// Compact masonry used on the Home teaser (kept exactly as original)
export const homeGallery: GalleryItem[] = [
  { src: IMG.port, title: "Port Operations", cat: "Infrastructure", span: "span 2", rowSpan: "span 2" },
  { src: IMG.warehouse, title: "Warehouse Hub", cat: "Operations", span: "span 1", rowSpan: "span 1" },
  { src: IMG.boxes, title: "Package Handling", cat: "Fulfillment", span: "span 1", rowSpan: "span 1" },
  { src: IMG.truck, title: "Interstate Fleet", cat: "Fleet", span: "span 1", rowSpan: "span 1" },
  { src: IMG.containers, title: "Container Yard", cat: "Logistics", span: "span 1", rowSpan: "span 2" },
  { src: IMG.road, title: "Nationwide Routes", cat: "Coverage", span: "span 1", rowSpan: "span 1" },
  { src: IMG.delivery, title: "Last Mile", cat: "Delivery", span: "span 1", rowSpan: "span 1" },
  { src: IMG.cityNight, title: "24/7 Operations", cat: "Service", span: "span 2", rowSpan: "span 1" },
  { src: IMG.packages, title: "Secure Packaging", cat: "Care", span: "span 1", rowSpan: "span 1" },
  { src: IMG.aerial, title: "Air Logistics", cat: "Express", span: "span 1", rowSpan: "span 1" },
  { src: IMG.logistics, title: "Distribution Center", cat: "Dispatch", span: "span 1", rowSpan: "span 1" },
  { src: IMG.map, title: "Route Planning", cat: "Technology", span: "span 1", rowSpan: "span 1" },
];

export interface FullGalleryItem {
  src: string;
  title: string;
  cat: GalleryCategory;
  desc: string;
}

export type GalleryCategory =
  | "Infrastructure"
  | "Operations"
  | "Fleet"
  | "Delivery"
  | "Warehousing"
  | "Coverage"
  | "Technology";

export const GALLERY_CATEGORIES: ("All" | GalleryCategory)[] = [
  "All", "Infrastructure", "Operations", "Fleet", "Delivery", "Warehousing", "Coverage", "Technology",
];

// Larger set for the dedicated /gallery page
export const fullGallery: FullGalleryItem[] = [
  { src: IMG.port, title: "Port Operations", cat: "Infrastructure", desc: "Lagos port terminal handling inbound container freight." },
  { src: IMG.containers, title: "Container Yard", cat: "Infrastructure", desc: "Multi-thousand TEU capacity staging area." },
  { src: IMG.crane, title: "Heavy Lift Operations", cat: "Infrastructure", desc: "Crane operations for oversized cargo handling." },
  { src: IMG.loadingBay, title: "Loading Bay", cat: "Infrastructure", desc: "Multi-dock loading bay — 40 simultaneous operations." },
  { src: IMG.warehouse, title: "Warehouse Hub", cat: "Warehousing", desc: "50,000 sq ft climate-controlled distribution center." },
  { src: IMG.rack, title: "Vertical Racking", cat: "Warehousing", desc: "High-density vertical storage for palletized goods." },
  { src: IMG.logistics, title: "Distribution Center", cat: "Warehousing", desc: "Regional distribution hub — Abuja corridor." },
  { src: IMG.forklift, title: "Material Handling", cat: "Warehousing", desc: "Motorized handling equipment across all hubs." },
  { src: IMG.truck, title: "Interstate Fleet", cat: "Fleet", desc: "Dedicated interstate fleet — 24-48hr transit windows." },
  { src: IMG.trucks, title: "Fleet Yard", cat: "Fleet", desc: "180+ vehicles across five active hubs." },
  { src: IMG.driver, title: "Our Drivers", cat: "Fleet", desc: "Certified drivers with continuous safety training." },
  { src: IMG.cargo, title: "Cargo Loading", cat: "Fleet", desc: "Secured cargo loading for long-haul transit." },
  { src: IMG.delivery, title: "Last Mile", cat: "Delivery", desc: "Urban last-mile delivery across Nigeria's top 10 cities." },
  { src: IMG.packages, title: "Secure Packaging", cat: "Delivery", desc: "Tamper-evident packaging for insured shipments." },
  { src: IMG.boxes, title: "Package Handling", cat: "Delivery", desc: "Hand-sorted packages for same-day dispatch." },
  { src: IMG.workers, title: "Dispatch Team", cat: "Delivery", desc: "Dispatch team coordinating live delivery routes." },
  { src: IMG.road, title: "Nationwide Routes", cat: "Coverage", desc: "Regular highway corridors across 36 states + FCT." },
  { src: IMG.highway, title: "Long-Haul Routes", cat: "Coverage", desc: "Lagos-Abuja express corridor." },
  { src: IMG.nightRoute, title: "Night Operations", cat: "Coverage", desc: "Round-the-clock movement for time-critical shipments." },
  { src: IMG.cityNight, title: "24/7 Dispatch", cat: "Coverage", desc: "Always-on dispatch desk — Lagos headquarters." },
  { src: IMG.aerial, title: "Air Logistics", cat: "Coverage", desc: "Air-forward handoff for ultra-express lanes." },
  { src: IMG.map, title: "Route Planning", cat: "Technology", desc: "AI-assisted route optimization across live corridors." },
  { src: IMG.control, title: "Control Room", cat: "Technology", desc: "Central dispatch & real-time fleet telemetry." },
  { src: IMG.barcode, title: "Scan & Track", cat: "Technology", desc: "Every package is barcoded for live visibility." },
  { src: IMG.team, title: "Our Team", cat: "Operations", desc: "300+ logistics professionals across Nigeria." },
  { src: IMG.handshake, title: "Partnership Meetings", cat: "Operations", desc: "Client onboarding and account reviews." },
];
