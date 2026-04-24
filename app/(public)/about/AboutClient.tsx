"use client";
import { Award, Shield, Target, Users } from "lucide-react";
import Heading from "../../_components/Heading";
import ImgBox from "../../_components/ImgBox";
import Logo from "../../_components/Logo";
import Section from "../../_components/Section";
import SubPageHero from "../../_components/SubPageHero";
import { IMG } from "../../_lib/images";
import { C } from "../../_lib/tokens";
import type { ValueItem } from "../../_lib/types";

const values: ValueItem[] = [
  { icon: Shield, title: "Reliability", desc: "We deliver on time, every time. Our 99.8% rate speaks volumes." },
  { icon: Target, title: "Precision", desc: "Every package tracked and handled with military precision." },
  { icon: Users, title: "People First", desc: "300+ logistics professionals dedicated to your success." },
  { icon: Award, title: "Excellence", desc: "Every delivery is a chance to exceed your expectations." },
];

export default function AboutClient() {
  return (
    <div style={{ animation: "fadeIn .5s" }}>
      <SubPageHero
        label="About Us"
        title={<>BUILT FOR <span className="tg">NIGERIA&apos;S</span> LOGISTICS NEEDS</>}
        subtitle="Founded with one mission: make logistics in Nigeria reliable, fast, and transparent."
        image={IMG.warehouse}
      />

      <Section>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "stretch", marginBottom: 80 }}>
          <div className="anim" style={{ borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 480 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.team} alt="Our Team" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy900}ee, ${C.navy900}44)` }} />
            <div style={{ position: "relative", zIndex: 2, padding: 44, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
              <Logo size="large" />
              <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 18 }}>
                {[["Founded", "2018"], ["HQ", "Lagos, Nigeria"], ["Team", "300+ Professionals"], ["Coverage", "36 States + FCT"]].map(([l, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 14, borderBottom: `1px solid ${C.navy600}44` }}>
                    <span style={{ color: C.gray400, fontSize: 14 }}>{l}</span>
                    <span style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="anim">
            <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: C.white, letterSpacing: ".02em", marginBottom: 24, lineHeight: 1.1 }}>
              WE SAW THE GAP.<br />WE BUILT THE BRIDGE.
            </h3>
            <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.85, marginBottom: 22 }}>
              Nigeria&apos;s logistics landscape was fragmented — unreliable timelines, lost packages, and zero transparency. SOSASA was born to change that.
            </p>
            <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.85, marginBottom: 22 }}>
              Starting with a single route between Lagos and Abuja, we&apos;ve grown into a trusted logistics partner serving businesses across three major cities with plans for nationwide expansion.
            </p>
            <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.85, marginBottom: 36 }}>
              Our technology-first approach means every package is tracked in real-time, every delivery is insured, and every customer has 24/7 support.
            </p>
            <ImgBox src={IMG.handshake} alt="Partnership" style={{ height: 200, borderRadius: 18 }}
              overlayContent={<p style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white }}>PARTNERSHIPS THAT MATTER</p>} />
          </div>
        </div>
        <style>{`@media(max-width:768px){ .about-grid{ grid-template-columns:1fr !important; } }`}</style>
      </Section>

      <Section bg={C.navy850}>
        <Heading label="Our Values" title={<>WHAT <span className="tg">DRIVES</span> US</>} />
        <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {values.map((v, i) => (
            <div key={i} className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, padding: 34, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: `${C.orange500}10`, border: `1px solid ${C.orange500}1A`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                <v.icon size={28} color={C.orange400} />
              </div>
              <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.white, letterSpacing: ".02em", marginBottom: 10 }}>{v.title}</h4>
              <p style={{ fontSize: 14, color: C.gray400, lineHeight: 1.75 }}>{v.desc}</p>
            </div>
          ))}
        </div>
        <style>{`
          @media(max-width:900px){ .values-grid{ grid-template-columns:1fr 1fr !important; } }
          @media(max-width:480px){ .values-grid{ grid-template-columns:1fr !important; } }
        `}</style>
      </Section>
    </div>
  );
}
