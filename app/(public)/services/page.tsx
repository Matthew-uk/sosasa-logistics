import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "SOSASA Logistics Services Ltd provides environmental logistics, petroleum & oil and gas services, construction logistics, poultry & agro-allied logistics, and haulage across Nigeria's onshore and offshore sectors.",
  keywords: [
    "environmental logistics Nigeria", "petroleum logistics", "oil and gas services Nigeria",
    "construction logistics", "haulage Nigeria", "poultry logistics", "waste disposal Nigeria",
    "oil spillage cleanup", "onshore offshore services", "agro-allied logistics",
  ],
  openGraph: {
    title: "SOSASA Services — Environmental, Petroleum, Construction & Agro-Allied Logistics",
    description:
      "From waste disposal and oil spillage cleanup to construction haulage and poultry logistics — SOSASA delivers across every sector.",
  },
};

export default function Page() {
  return <ServicesClient />;
}
