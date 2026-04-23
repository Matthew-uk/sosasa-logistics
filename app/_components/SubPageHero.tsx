import type { ReactNode } from "react";
import { C } from "../_lib/tokens";

export default function SubPageHero({
  label, title, subtitle, image,
}: { label: string; title: ReactNode; subtitle?: string; image: string }) {
  return (
    <section style={{ position: "relative", paddingTop: 120, paddingBottom: 72, overflow: "hidden" }}>
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", animation: "kenBurns 30s ease-in-out infinite alternate" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.navy950}f2 0%, ${C.navy900}d9 45%, ${C.navy900}b3 100%)` }} />
        <div style={{ position: "absolute", inset: 0, opacity: .03, backgroundImage: `linear-gradient(${C.white} 1px, transparent 1px), linear-gradient(90deg, ${C.white} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "0 28px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}25`, padding: "7px 18px", borderRadius: 100, marginBottom: 22, animation: "fadeUp .7s ease .05s both" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.orange500, animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'Lexend'", fontSize: 11.5, fontWeight: 700, color: C.orange400, letterSpacing: ".12em", textTransform: "uppercase" }}>{label}</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 6vw, 72px)", color: C.white, lineHeight: 1.03, letterSpacing: ".02em", marginBottom: 18, animation: "fadeUp .7s ease .15s both" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 16, color: C.gray300, maxWidth: 640, margin: "0 auto", lineHeight: 1.75, animation: "fadeUp .7s ease .25s both" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
