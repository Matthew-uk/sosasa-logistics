import type { Metadata } from "next";
import "./globals.css";
import GlobalStyles from "./_components/GlobalStyles";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "SOSASA Logistics — Nigeria's #1 Logistics Partner",
    template: "%s | SOSASA Logistics",
  },
  description:
    "Fast, reliable, and secure logistics across Nigeria. Same-day delivery, interstate shipping, real-time tracking, and insured packages — powering 2,500+ businesses nationwide.",
  keywords: [
    "logistics Nigeria", "same-day delivery Lagos", "interstate shipping Nigeria",
    "package tracking", "SOSASA", "Abuja logistics", "Port Harcourt delivery",
  ],
  openGraph: {
    title: "SOSASA Logistics — Nigeria's #1 Logistics Partner",
    description: "Speed, reliability, and peace of mind across 36 states.",
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
