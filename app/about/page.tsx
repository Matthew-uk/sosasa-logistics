import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SOSASA Logistics was founded in 2018 to reshape Nigeria's logistics landscape. Learn about our mission, our team of 300+ professionals, and our values of reliability, precision, and excellence.",
  openGraph: {
    title: "About SOSASA Logistics — Built for Nigeria's Logistics Needs",
    description:
      "From a single Lagos-Abuja route to a trusted nationwide partner — discover the team and mission behind SOSASA.",
  },
};

export default function Page() {
  return <AboutClient />;
}
