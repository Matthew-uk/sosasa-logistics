import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Inside SOSASA Logistics — photos of our fleet, warehouses, port operations, control room, and delivery teams across Nigeria. Filter by infrastructure, operations, fleet, delivery, and more.",
  openGraph: {
    title: "Inside SOSASA — Gallery",
    description: "A behind-the-scenes look at the infrastructure and people powering Nigeria's logistics.",
  },
};

export default function Page() {
  return <GalleryClient />;
}
