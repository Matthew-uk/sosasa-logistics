import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SOSASA Logistics Services Ltd. Reach out for quotes on environmental logistics, petroleum services, construction haulage, poultry logistics, or any of our specialised service offerings.",
  openGraph: {
    title: "Contact SOSASA Logistics Services Ltd — Let's Work Together",
    description: "Reach out for project quotes, service enquiries, or partnership opportunities across any of our business lines.",
  },
};

export default function Page() {
  return <ContactClient />;
}
