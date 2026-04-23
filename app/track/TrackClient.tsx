"use client";
import { CheckCircle, Eye, Package, Search } from "lucide-react";
import Heading from "../_components/Heading";
import Section from "../_components/Section";
import SubPageHero from "../_components/SubPageHero";
import TrackingWidget from "../_components/TrackingWidget";
import { IMG } from "../_lib/images";
import { C } from "../_lib/tokens";

export default function TrackClient() {
  return (
    <div style={{ animation: "fadeIn .5s" }}>
      <SubPageHero
        label="Track"
        title={<>FIND YOUR <span className="tg">PACKAGE</span> IN SECONDS</>}
        subtitle="Every SOSASA shipment is tracked in real time. Paste your tracking code below to see where it is right now."
        image={IMG.map}
      />

      <Section>
        <div style={{ maxWidth: 720, margin: "0 auto" }}><TrackingWidget full /></div>

        <div style={{ marginTop: 90 }}>
          <Heading label="How It Works" title={<>TRACKING MADE <span className="tg">SIMPLE</span></>} />
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {([
              { step: "01", icon: Package, title: "Get Your Code", desc: "Receive a unique tracking code when you book." },
              { step: "02", icon: Search, title: "Enter Code", desc: "Paste your code in the search field above." },
              { step: "03", icon: Eye, title: "Track Live", desc: "Watch your package move across Nigeria." },
              { step: "04", icon: CheckCircle, title: "Delivered!", desc: "Get notified the moment it arrives." },
            ]).map((s, i) => (
              <div key={i} className="anim" style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: `${C.orange500}10`, lineHeight: 1, marginBottom: 14 }}>{s.step}</div>
                <div style={{ width: 58, height: 58, borderRadius: 18, background: `${C.orange500}10`, border: `1px solid ${C.orange500}1A`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <s.icon size={24} color={C.orange400} />
                </div>
                <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white, letterSpacing: ".02em", marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:768px){ .steps-grid{ grid-template-columns:1fr 1fr !important; } }`}</style>
        </div>
      </Section>
    </div>
  );
}
