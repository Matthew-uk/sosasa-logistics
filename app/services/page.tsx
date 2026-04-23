import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Same-day express delivery, interstate logistics, business solutions, and insured shipping. SOSASA delivers across Nigeria with live tracking and guaranteed SLAs.",
  keywords: [
    "same-day delivery", "interstate logistics Nigeria", "insured shipping",
    "business logistics solutions", "Lagos delivery", "Abuja courier",
  ],
  openGraph: {
    title: "SOSASA Services — Logistics Solutions That Deliver",
    description:
      "From single packages to enterprise contracts. Same-day, interstate, and fully insured.",
  },
};

export default function Page() {
  return <ServicesClient />;
}
