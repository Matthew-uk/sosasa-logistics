"use client";
import { ArrowRight, CheckCircle, PackageCheck, Shield, Truck, Zap } from "lucide-react";
import Link from "next/link";
import Heading from "../../_components/Heading";
import Section from "../../_components/Section";
import SubPageHero from "../../_components/SubPageHero";
import { IMG } from "../../_lib/images";
import { C } from "../../_lib/tokens";
import type { ServiceItem } from "../../_lib/types";

const services: (ServiceItem & { img: string })[] = [
  { icon: Zap, title: "Same-Day Express Delivery", desc: "Need it there today? Our express service operates within Lagos, Abuja, and Port Harcourt. Orders placed before noon arrive by 6 PM.", features: ["Within-city delivery", "2-6 hour turnaround", "Live GPS tracking", "Photo proof"], accent: true, img: IMG.delivery },
  { icon: Truck, title: "Interstate Logistics", desc: "Seamless door-to-door delivery between Nigeria's major cities. Daily departures covering the Lagos-Abuja-Port Harcourt triangle.", features: ["Daily routes", "24-48 hour delivery", "Full insurance", "Bulk discounts"], img: IMG.truck },
  { icon: PackageCheck, title: "Business Solutions", desc: "Custom logistics solutions for e-commerce brands, retailers, and enterprises. We become an extension of your team.", features: ["Account manager", "API integration", "Custom SLAs", "Monthly reporting"], img: IMG.warehouse },
  { icon: Shield, title: "Secure Insured Shipping", desc: "Every package is fully insured. For high-value items, we offer enhanced security with dedicated handling and chain of custody.", features: ["Full value insurance", "Tamper-evident packing", "Custody tracking", "48hr claims"], img: IMG.packages },
];

export default function ServicesClient() {
  return (
    <div style={{ animation: "fadeIn .5s" }}>
      <SubPageHero
        label="Our Services"
        title={<>LOGISTICS SOLUTIONS <span className="tg">THAT DELIVER</span></>}
        subtitle="Whether it's a single package or a thousand, we have the infrastructure and expertise to move it."
        image={IMG.truck}
      />

      <Section>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {services.map((s, i) => (
            <div
              key={i}
              className={`anim hlift service-row ${i % 2 ? "rtl" : "ltr"}`}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: C.navy800, border: `1px solid ${s.accent ? C.orange500 + "33" : C.navy600}`, borderRadius: 24, overflow: "hidden", direction: i % 2 ? "rtl" : "ltr" }}
            >
              <div style={{ padding: 48, direction: "ltr" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: s.accent ? `${C.orange500}22` : `${C.orange500}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, border: `1px solid ${C.orange500}${s.accent ? "44" : "1A"}` }}>
                  <s.icon size={26} color={C.orange400} />
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 30, color: C.white, letterSpacing: ".02em", marginBottom: 14 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: C.gray400, lineHeight: 1.75, marginBottom: 26 }}>{s.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {s.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle size={14} color={C.orange400} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: C.gray300 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "relative", overflow: "hidden", direction: "ltr", minHeight: 280 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: i % 2 ? `linear-gradient(to left, transparent, ${C.navy800}22)` : `linear-gradient(to right, transparent, ${C.navy800}22)` }} />
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){ .service-row{ grid-template-columns:1fr !important; direction:ltr !important; } }`}</style>
      </Section>

      <Section bg={C.navy850}>
        <div className="anim" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(32px, 4vw, 48px)", color: C.white, marginBottom: 16, letterSpacing: ".02em" }}>NEED A CUSTOM SOLUTION?</h2>
          <p style={{ fontSize: 16, color: C.gray400, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.75 }}>
            Every business is unique. Let&apos;s design a logistics plan tailored to your needs.
          </p>
          <Link href="/contact" className="btn-p" style={{ padding: "18px 44px", fontSize: 16 }}>
            Request Custom Quote <ArrowRight size={18} />
          </Link>
        </div>
      </Section>
    </div>
  );
}
