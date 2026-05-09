import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SOSASA Logistics Services Ltd (RC: 7126319) is an entirely indigenous Nigerian enterprise incorporated under CAMA 2020. Learn about our mission, vision, core values, and our commitment to Nigeria's growth and development.",
  openGraph: {
    title: "About SOSASA Logistics Services Ltd — An Indigenous Nigerian Enterprise",
    description:
      "Incorporated under CAMA 2020, SOSASA Logistics Services Ltd delivers innovative, high-quality services to the oil & gas, construction, environmental, and agro-allied sectors across Nigeria.",
  },
};

export default function Page() {
  return <AboutClient />;
}
