import { CircleDot } from "lucide-react";
import { C } from "../_lib/tokens";

export default function Marquee() {
  const items = ["Same-Day Delivery", "Lagos", "Abuja", "Port Harcourt", "Real-Time Tracking", "Insured Packages", "24/7 Support", "Interstate Logistics", "Express Dispatch", "Nationwide Coverage"];
  const rendered = [...items, ...items].map((t, i) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, whiteSpace: "nowrap", padding: "0 16px" }}>
      <span style={{ fontFamily: "'Bebas Neue'", fontSize: 15, color: C.gray400, letterSpacing: ".1em" }}>{t}</span>
      <CircleDot size={6} color={C.orange500} />
    </span>
  ));
  return (
    <div style={{ overflow: "hidden", background: C.navy800, borderTop: `1px solid ${C.navy700}`, borderBottom: `1px solid ${C.navy700}`, padding: "16px 0" }}>
      <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "fit-content" }}>{rendered}</div>
    </div>
  );
}
