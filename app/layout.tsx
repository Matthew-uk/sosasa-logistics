import type { Metadata } from "next";
import "./globals.css";
import GlobalStyles from "./_components/GlobalStyles";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "SOSASA Logistics Services Ltd — Indigenous Nigerian Logistics & Engineering",
    template: "%s | SOSASA Logistics Services Ltd",
  },
  description:
    "SOSASA Logistics Services Ltd is an entirely indigenous Nigerian enterprise delivering environmental logistics, petroleum services, construction, haulage, and agro-allied solutions across Nigeria. RC: 7126319.",
  keywords: [
    "SOSASA Logistics Services Ltd", "Nigerian logistics company", "environmental logistics Nigeria",
    "petroleum logistics Nigeria", "oil and gas logistics", "construction logistics Nigeria",
    "haulage Nigeria", "poultry logistics", "indigenous Nigerian enterprise", "RC 7126319",
  ],
  openGraph: {
    title: "SOSASA Logistics Services Ltd — Indigenous Nigerian Logistics & Engineering",
    description: "On line, on time, and on the money. An entirely indigenous Nigerian enterprise serving the oil & gas, construction, environmental, and agro-allied sectors.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body style={{ background: "#040810", color: "#FFFFFF", minHeight: "100vh" }}>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
