import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SOSASA Logistics. 24/7 phone support, 2-hour email response, and head office in Victoria Island, Lagos. Request a quote or plan a custom solution.",
  openGraph: {
    title: "Contact SOSASA — Let's Talk Logistics",
    description: "Reach out for quotes, partnerships, or custom logistics solutions.",
  },
};

export default function Page() {
  return <ContactClient />;
}
