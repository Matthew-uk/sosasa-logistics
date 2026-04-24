"use client";
import {
  ArrowRight, BarChart3, Clock, Eye, Headphones, MapPin, MapPinned,
  Package, Phone, Quote, Send, Shield, Sparkles, Star, Timer,
  TrendingUp, Truck, Users, Zap, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import ArtGallery from "../_components/ArtGallery";
import AnimCounter from "../_components/AnimCounter";
import Heading from "../_components/Heading";
import Marquee from "../_components/Marquee";
import Section from "../_components/Section";
import TrackingWidget from "../_components/TrackingWidget";
import { testimonials } from "../_data/testimonials";
import { IMG } from "../_lib/images";
import { C } from "../_lib/tokens";
import type { StatItem } from "../_lib/types";

export default function HomeClient() {
  return (
    <div style={{ animation: "fadeIn .5s ease" }}>

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", animation: "kenBurns 30s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.navy950}ee 0%, ${C.navy950}cc 40%, ${C.navy900}88 100%)` }} />
          <div style={{ position: "absolute", inset: 0, opacity: .03, backgroundImage: `linear-gradient(${C.white} 1px, transparent 1px), linear-gradient(90deg, ${C.white} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        </div>

        <div className="hero-grid" style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "160px 28px 100px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left */}
          <div style={{ animation: "slideL .9s ease .1s both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}22`, padding: "8px 20px", borderRadius: 100, marginBottom: 32 }}>
              <Sparkles size={14} color={C.orange400} />
              <span style={{ fontFamily: "'Lexend'", fontSize: 12, fontWeight: 700, color: C.orange300, letterSpacing: ".04em" }}>Nigeria&apos;s #1 Logistics Partner</span>
            </div>

            <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(52px, 7vw, 96px)", color: C.white, lineHeight: .95, letterSpacing: ".01em", marginBottom: 28 }}>
              We Move
              <br />
              <span className="tg">Nigeria</span>
              <br />
              Forward
            </h1>

            <p style={{ fontSize: 17, color: C.gray300, lineHeight: 1.8, maxWidth: 500, marginBottom: 44 }}>
              From Lagos to Abuja, Port Harcourt and beyond — blazing-fast delivery, real-time tracking, and insured shipping for businesses that refuse to slow down.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
              <Link href="/contact" className="btn-p" style={{ padding: "18px 40px", fontSize: 16 }}>
                Ship Now <ArrowRight size={18} />
              </Link>
              <Link href="/track" className="btn-o" style={{ padding: "16px 34px", fontSize: 16 }}>
                <Package size={18} /> Track Package
              </Link>
            </div>

            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {([
                [Shield, "Fully Insured"], [Clock, "Same-Day Available"], [Headphones, "24/7 Support"],
              ] as const).map(([Icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={15} color={C.orange400} />
                  <span style={{ fontSize: 13, color: C.gray400, fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bento Stats Grid */}
          <div className="hide-m" style={{ animation: "slideR .9s ease .3s both" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ gridColumn: "span 2", background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, padding: 28, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 140, height: 140, background: `radial-gradient(circle, ${C.orange500}0D, transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <p style={{ color: C.gray500, fontSize: 11, fontWeight: 600, letterSpacing: ".08em" }}>LIVE SHIPMENT</p>
                    <p style={{ fontFamily: "'Bebas Neue'", fontSize: 24, color: C.white, letterSpacing: ".03em", marginTop: 4 }}>SOS-7839201</p>
                  </div>
                  <div style={{ background: "#4ade8018", border: "1px solid #4ade8033", padding: "5px 14px", borderRadius: 100, display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                    <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 700 }}>On Time</span>
                  </div>
                </div>
                <div style={{ background: C.navy900, borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ textAlign: "center" }}><MapPin size={18} color={C.orange400} /><p style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.white, marginTop: 6 }}>LAGOS</p></div>
                    <div style={{ flex: 1, margin: "0 16px", position: "relative" }}>
                      <div style={{ height: 3, background: C.navy600, borderRadius: 2 }}>
                        <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg, ${C.orange500}, ${C.orange300})`, borderRadius: 2 }} />
                      </div>
                      <div style={{ position: "absolute", left: "72%", top: "50%", transform: "translate(-50%,-50%)", background: C.orange500, borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 24px ${C.orange500}66` }}>
                        <Truck size={14} color={C.white} />
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}><MapPinned size={18} color={C.gray500} /><p style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.gray400, marginTop: 6 }}>ABUJA</p></div>
                  </div>
                </div>
              </div>

              {([
                { val: "99.8%", label: "Delivery Rate", icon: TrendingUp, color: "#4ade80" },
                { val: "4h 23m", label: "Avg. Transit", icon: Timer, color: C.orange400 },
                { val: "2,500+", label: "Active Clients", icon: Users, color: "#60a5fa" },
                { val: "50K+", label: "Packages/Mo", icon: Package, color: C.orange300 },
              ]).map((s, i) => (
                <div key={i} style={{
                  background: C.navy800, border: `1px solid ${C.navy600}`,
                  borderRadius: 18, padding: 22, animation: `float ${6 + i}s ease-in-out infinite`,
                  animationDelay: `${i * .5}s`,
                }}>
                  <s.icon size={18} color={s.color} style={{ marginBottom: 10 }} />
                  <p style={{ fontFamily: "'Bebas Neue'", fontSize: 26, color: C.white, letterSpacing: ".02em" }}>{s.val}</p>
                  <p style={{ fontSize: 11, color: C.gray500, marginTop: 2, fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`@media(max-width:768px){ .hero-grid{ grid-template-columns:1fr !important; } }`}</style>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <Marquee />

      {/* ═══ STATS BAR ═══ */}
      <Section bg={C.navy900} style={{ padding: "70px 28px" }}>
        <div className="anim stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, background: `linear-gradient(135deg, ${C.navy800}, ${C.navy850})`, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: 28 }}>
          {([
            { icon: Package, value: 50000, suffix: "+", label: "Packages Delivered" },
            { icon: MapPin, value: 36, suffix: "", label: "States Covered" },
            { icon: Users, value: 2500, suffix: "+", label: "Happy Clients" },
            { icon: Clock, value: 99, suffix: "%", label: "On-Time Rate" },
          ] as StatItem[]).map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 8px" }}>
              <s.icon size={22} color={C.orange400} style={{ marginBottom: 12 }} />
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 4vw, 52px)", color: C.white, lineHeight: 1 }}>
                <AnimCounter end={s.value} suffix={s.suffix} />
              </div>
              <p style={{ fontSize: 13, color: C.gray500, marginTop: 8, fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){ .stats-grid{ grid-template-columns:repeat(2,1fr) !important; } }`}</style>
      </Section>

      {/* ═══ SERVICES ═══ */}
      <Section bg={C.navy950}>
        <Heading label="Our Services" title={<>WHAT WE <span className="tg">DELIVER</span></>} subtitle="Fast, reliable, and secure logistics solutions tailored for businesses across Nigeria." />
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {([
            { icon: Zap, title: "Same-Day Express", desc: "Lightning delivery within Lagos, Abuja, and Port Harcourt. Order by noon, receive by evening.", img: IMG.delivery },
            { icon: Truck, title: "Interstate Logistics", desc: "Door-to-door delivery connecting major cities with real-time tracking and guaranteed timelines.", img: IMG.truck },
            { icon: Shield, title: "Insured Shipping", desc: "Every package fully insured from pickup to delivery. Ship with confidence and total peace of mind.", img: IMG.packages },
          ]).map((s, i) => (
            <div key={i} className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, overflow: "hidden", cursor: "default" }}>
              <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy800} 5%, transparent 60%)` }} />
                <div style={{ position: "absolute", top: 16, left: 16, width: 48, height: 48, borderRadius: 14, background: `${C.orange500}22`, backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.orange500}33` }}>
                  <s.icon size={22} color={C.orange400} />
                </div>
              </div>
              <div style={{ padding: "24px 28px 32px" }}>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 24, color: C.white, letterSpacing: ".02em", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: C.gray400, lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="anim" style={{ textAlign: "center", marginTop: 52 }}>
          <Link href="/services" className="btn-o">
            View All Services <ChevronRight size={16} />
          </Link>
        </div>
        <style>{`@media(max-width:768px){ .services-grid{ grid-template-columns:1fr !important; } }`}</style>
      </Section>

      {/* ═══ TRACKING SECTION ═══ */}
      <Section bg={C.navy900}>
        <div className="track-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div className="anim">
            <Heading label="Real-Time Tracking" center={false} title={<>KNOW WHERE YOUR <span className="tg">PACKAGE</span> IS</>} subtitle="Our advanced tracking system gives you complete visibility over your shipments, from pickup to delivery." />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {([
                { icon: Eye, title: "Live GPS Tracking", desc: "Watch your package move in real-time across Nigeria" },
                { icon: Send, title: "SMS & Email Alerts", desc: "Automatic notifications at every delivery milestone" },
                { icon: BarChart3, title: "Delivery Analytics", desc: "Deep insights on your shipping patterns and history" },
              ]).map((f, i) => (
                <div key={i} className="anim" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: `${C.orange500}10`, border: `1px solid ${C.orange500}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <f.icon size={22} color={C.orange400} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, color: C.white, marginBottom: 5 }}>{f.title}</p>
                    <p style={{ fontSize: 14, color: C.gray400, lineHeight: 1.65 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="anim"><TrackingWidget /></div>
        </div>
        <style>{`@media(max-width:768px){ .track-grid{ grid-template-columns:1fr !important; gap:40px !important; } }`}</style>
      </Section>

      {/* ═══ GALLERY ═══ */}
      <Section bg={C.navy950}>
        <Heading label="Gallery" title={<>INSIDE <span className="tg">SOSASA</span> OPERATIONS</>} subtitle="A glimpse into our nationwide logistics infrastructure powering deliveries across Nigeria." />
        <ArtGallery />
        <div className="anim" style={{ textAlign: "center", marginTop: 52 }}>
          <Link href="/gallery" className="btn-o">
            View Full Gallery <ChevronRight size={16} />
          </Link>
        </div>
      </Section>

      {/* ═══ TESTIMONIALS ═══ */}
      <Section bg={C.navy900}>
        <Heading label="Testimonials" title={<>TRUSTED BY <span className="tg">BUSINESSES</span> ACROSS NIGERIA</>} />
        <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ height: 120, position: "relative", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.5)" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy800}, transparent)` }} />
              </div>
              <div style={{ padding: "0 30px 32px", marginTop: -20, position: "relative" }}>
                <Quote size={28} color={C.orange500} style={{ opacity: .4, marginBottom: 14 }} />
                <p style={{ fontSize: 14, color: C.gray300, lineHeight: 1.8, fontStyle: "italic", marginBottom: 24 }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.orange500}, ${C.orange600})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white }}>{t.name[0]}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: C.white }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: C.gray500 }}>{t.role}</p>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={13} fill={C.orange400} color={C.orange400} />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){ .testi-grid{ grid-template-columns:1fr !important; } }`}</style>
      </Section>

      {/* ═══ CTA ═══ */}
      <Section style={{ padding: "80px 28px" }}>
        <div className="anim" style={{ position: "relative", borderRadius: 28, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.containers} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.orange600}ee, ${C.orange500}dd)` }} />
          <div style={{ position: "absolute", inset: 0, opacity: .06, backgroundImage: `radial-gradient(${C.white} 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
          <div style={{ position: "relative", zIndex: 2, padding: "80px 52px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 5vw, 56px)", color: C.white, lineHeight: 1.05, marginBottom: 18, letterSpacing: ".02em" }}>READY TO SHIP SMARTER?</h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,.85)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.75 }}>Join 2,500+ businesses that trust SOSASA for their logistics needs across Nigeria.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ background: C.white, color: C.orange600, padding: "18px 40px", borderRadius: 14, fontFamily: "'Lexend'", fontWeight: 800, fontSize: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, transition: "all .3s", textDecoration: "none" }}>
                Get a Free Quote <ArrowRight size={18} />
              </Link>
              <a href="tel:+2348000000000" style={{ background: "rgba(255,255,255,.15)", color: C.white, border: "2px solid rgba(255,255,255,.3)", padding: "16px 34px", borderRadius: 14, fontFamily: "'Lexend'", fontWeight: 700, fontSize: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, backdropFilter: "blur(8px)", textDecoration: "none" }}>
                <Phone size={18} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
