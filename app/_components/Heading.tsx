import type { ReactNode } from "react";
import { C } from "../_lib/tokens";

export default function Heading({
  label, title, subtitle, center = true,
}: { label?: string; title: ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <div className="anim" style={{ textAlign: center ? "center" : "left", marginBottom: 72 }}>
      {label && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}25`, padding: "7px 18px", borderRadius: 100, marginBottom: 22 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.orange500, animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'Lexend'", fontSize: 11.5, fontWeight: 700, color: C.orange400, letterSpacing: ".12em", textTransform: "uppercase" }}>{label}</span>
        </div>
      )}
      <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 5vw, 56px)", color: C.white, lineHeight: 1.05, letterSpacing: ".02em", marginBottom: 18 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 16, color: C.gray400, maxWidth: 560, margin: center ? "0 auto" : undefined, lineHeight: 1.75 }}>{subtitle}</p>}
    </div>
  );
}
