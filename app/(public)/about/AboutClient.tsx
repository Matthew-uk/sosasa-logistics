"use client";
import { Award, Leaf, Star, Target, ThumbsUp, Users, Zap } from "lucide-react";
import Heading from "../../_components/Heading";
import ImgBox from "../../_components/ImgBox";
import Logo from "../../_components/Logo";
import Section from "../../_components/Section";
import SubPageHero from "../../_components/SubPageHero";
import { IMG } from "../../_lib/images";
import { C } from "../../_lib/tokens";
import type { ValueItem } from "../../_lib/types";

const values: ValueItem[] = [
  {
    icon: Star,
    title: "Integrity",
    desc: "We uphold the highest ethical standards in our business dealings, fostering trust and mutual respect among our clients, employees, and stakeholders.",
  },
  {
    icon: Award,
    title: "Quality",
    desc: "We relentlessly pursue excellence in all our projects, ensuring that our services meet and exceed industry standards and client expectations.",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "We embrace creativity and cutting-edge technology to provide forward-thinking solutions that contribute to the continuous improvement of Nigeria's built environment.",
  },
  {
    icon: ThumbsUp,
    title: "Client Satisfaction",
    desc: "We prioritize the needs and satisfaction of our clients, consistently delivering on our promises and fostering open communication to build strong, lasting relationships.",
  },
  {
    icon: Users,
    title: "Professionalism",
    desc: "We maintain a professional and collaborative work environment, ensuring our employees' growth and development and promoting a culture of respect, teamwork, and continuous learning.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "We integrate environmentally responsible practices into our operations, contributing to the sustainable growth and development of Nigeria's infrastructure.",
  },
];

export default function AboutClient() {
  return (
    <div style={{ animation: "fadeIn .5s" }}>
      <SubPageHero
        label="About Us"
        title={<>AN ENTIRELY <span className="tg">INDIGENOUS</span> NIGERIAN ENTERPRISE</>}
        subtitle="Incorporated under the Companies and Allied Matters Act of 2020 — committed to fostering the development and growth of our esteemed clients."
        image={IMG.warehouse}
      />

      {/* WHO WE ARE */}
      <Section>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "stretch", marginBottom: 80 }}>
          <div className="anim" style={{ borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 480 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.team} alt="Our Team" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy900}ee, ${C.navy900}44)` }} />
            <div style={{ position: "relative", zIndex: 2, padding: 44, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
              <Logo size="large" />
              <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  ["Registration", "RC 7126319"],
                  ["Incorporated", "CAMA 2020"],
                  ["Nationality", "100% Indigenous Nigerian"],
                  ["Sectors", "Oil & Gas, Construction, Agro"],
                ].map(([l, v], i) => (
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
              WHO WE ARE
            </h3>
            <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.85, marginBottom: 22 }}>
              SOSASA LOGISTICS SERVICES LTD is an entirely indigenous Nigerian enterprise, incorporated under the Companies and Allied Matters Act of 2020, with registration number <span style={{ color: C.white, fontWeight: 700 }}>7126319</span>. From its inception, our company has been instrumental in fostering the development and growth of our esteemed clients.
            </p>
            <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.85, marginBottom: 22 }}>
              As one of Nigeria's preeminent Logistics Companies, our reputation is built on providing an <span style={{ color: C.white, fontWeight: 600 }}>on line, on time, and on the money</span> service across the oil and gas, construction, environmental, and agro-allied sectors.
            </p>
            <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.85, marginBottom: 36 }}>
              Our vast network of associates spans numerous business segments, ensuring that the most adept and capable professionals are engaged in our projects — resulting in unparalleled service delivery and client satisfaction.
            </p>
            <ImgBox
              src={IMG.handshake}
              alt="Partnership"
              style={{ height: 200, borderRadius: 18 }}
              overlayContent={<p style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white }}>PARTNERSHIPS THAT MATTER</p>}
            />
          </div>
        </div>
        <style>{`@media(max-width:768px){ .about-grid{ grid-template-columns:1fr !important; } }`}</style>
      </Section>

      {/* VISION & MISSION */}
      <Section bg={C.navy900}>
        <Heading label="Our Direction" title={<>VISION <span className="tg">&amp;</span> MISSION</>} />
        <div className="vm-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: 44 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}22`, padding: "6px 18px", borderRadius: 100, marginBottom: 28 }}>
              <Target size={13} color={C.orange400} />
              <span style={{ fontFamily: "'Lexend'", fontSize: 11, fontWeight: 700, color: C.orange300, letterSpacing: ".06em" }}>VISION STATEMENT</span>
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: C.white, letterSpacing: ".02em", lineHeight: 1.2, marginBottom: 20 }}>
              NIGERIA&apos;S MOST ESTEEMED &amp; DEPENDABLE PROVIDER
            </h3>
            <p style={{ fontSize: 15, color: C.gray400, lineHeight: 1.85 }}>
              To be Nigeria's most esteemed and dependable provider of innovative, high-quality services, consistently exceeding client expectations while contributing to the nation's growth and development.
            </p>
          </div>
          <div className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: 44 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}22`, padding: "6px 18px", borderRadius: 100, marginBottom: 28 }}>
              <Star size={13} color={C.orange400} />
              <span style={{ fontFamily: "'Lexend'", fontSize: 11, fontWeight: 700, color: C.orange300, letterSpacing: ".06em" }}>MISSION STATEMENT</span>
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: C.white, letterSpacing: ".02em", lineHeight: 1.2, marginBottom: 20 }}>
              SUPERIOR SOLUTIONS THROUGH EXCELLENCE &amp; INNOVATION
            </h3>
            <p style={{ fontSize: 15, color: C.gray400, lineHeight: 1.85 }}>
              SOSASA Logistics Services Ltd is committed to delivering superior solutions through our unwavering dedication to excellence, continuous innovation, and a client-centric approach. We strive to foster long-term relationships by maintaining the highest standards of integrity, professionalism, and reliability in every aspect of our work.
            </p>
          </div>
        </div>
        <style>{`@media(max-width:768px){ .vm-grid{ grid-template-columns:1fr !important; } }`}</style>
      </Section>

      {/* CORE VALUES */}
      <Section bg={C.navy850}>
        <Heading label="Our Values" title={<>WHAT <span className="tg">DRIVES</span> US</>} />
        <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {values.map((v, i) => (
            <div key={i} className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, padding: 34 }}>
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

      {/* CORPORATE STATUS */}
      <Section>
        <Heading label="Corporate Status" title={<>OUR <span className="tg">CORE BUSINESS</span> LINES</>} subtitle="Providing essential services to the oil and gas industries and beyond, through our international and national network of companies, partners, and our own operational structure." />
        <div className="biz-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {[
            {
              letter: "A",
              title: "Environmental Logistics & Control",
              body: "Waste disposal, fumigation, water treatment, pest control, agricultural waste cleaning, land reclamation, bush clearing, sand filling, shore protection, pollution control, and oil spillage clean-up services.",
            },
            {
              letter: "B",
              title: "Petroleum & Oil and Gas Services",
              body: "Oil and gas services, petroleum products distribution, onshore and offshore services, oil tools, oilfield services, supply and dealing in natural gas, petrol, diesel, lubricating oil, and all petroleum products.",
            },
            {
              letter: "C",
              title: "Poultry & Agro-Allied Logistics",
              body: "Poultry farming, fish farming, fresh farm products, animal farming, aquatic farming, general farming services, breeding at scale, feed production, and merchandise farming.",
            },
            {
              letter: "D",
              title: "Construction & Engineering",
              body: "Building engineering, dredging, civil works, electrical and mechanical works, road rehabilitation, borehole drilling, pipeline welding, fabrication, structural steel/metal works, and supply of quality building materials.",
            },
            {
              letter: "E",
              title: "General Contracts & Haulage",
              body: "General contracts and supplies, procurement, import/export, logistics, chemical supply, oilfield equipment, tug boats, barges, speed boats, warehousing, and allied trading and marketing services.",
            },
            {
              letter: "F",
              title: "Water Production & Packaging",
              body: "Manufacturing of portable water, bottling, canning, supply and dealing in plastic water, mineral waters, table water, pure water, and bottled water, including natural spring and soda waters.",
            },
          ].map((b, i) => (
            <div key={i} className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, padding: 36, display: "flex", gap: 24, alignItems: "flex-start" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${C.orange500}15`, border: `1px solid ${C.orange500}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Bebas Neue'", fontSize: 24, color: C.orange400 }}>
                {b.letter}
              </div>
              <div>
                <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white, letterSpacing: ".02em", marginBottom: 10 }}>{b.title}</h4>
                <p style={{ fontSize: 14, color: C.gray400, lineHeight: 1.75 }}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){ .biz-grid{ grid-template-columns:1fr !important; } }`}</style>
      </Section>
    </div>
  );
}
