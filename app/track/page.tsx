import type { Metadata } from "next";
import TrackClient from "./TrackClient";

export const metadata: Metadata = {
  title: "Track Your Shipment",
  description:
    "Track your SOSASA shipment in real time. Enter your tracking code to see live GPS updates, route progress, and estimated delivery times.",
  openGraph: {
    title: "Track Your Shipment — SOSASA Logistics",
    description: "Enter your tracking number for real-time package updates across Nigeria.",
  },
};

export default function Page() {
  return <TrackClient />;
}
