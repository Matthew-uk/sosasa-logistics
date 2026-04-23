"use client";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import ProjectCard from "../_components/ProjectCard";
import Section from "../_components/Section";
import SubPageHero from "../_components/SubPageHero";
import { projects } from "../_data/projects";
import { IMG } from "../_lib/images";
import { C } from "../_lib/tokens";

export default function ProjectsClient() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div style={{ animation: "fadeIn .5s" }}>
      <SubPageHero
        label="Projects"
        title={<>CONTRACTS WE&apos;VE <span className="tg">DELIVERED</span></>}
        subtitle="From hazardous materials to vaccine cold chains — a record of real projects, real clients, and real outcomes."
        image={IMG.crane}
      />

      <Section>
        {/* Stat strip */}
        <div className="anim project-stats" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
          marginBottom: 72,
          background: `linear-gradient(135deg, ${C.navy800}, ${C.navy850})`,
          border: `1px solid ${C.navy600}`, borderRadius: 22, padding: 24,
        }}>
          {[
            { v: `${projects.length}+`, l: "Projects Delivered" },
            { v: "₦2.4B+", l: "Cargo Value Moved" },
            { v: "22+", l: "Enterprise Clients" },
            { v: "100%", l: "On-Time Completion" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "12px 8px" }}>
              <p style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(28px, 3vw, 40px)", color: C.white, lineHeight: 1, letterSpacing: ".02em" }}>{s.v}</p>
              <p style={{ fontSize: 12, color: C.gray500, marginTop: 6, fontWeight: 500 }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <>
            <div className="anim" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <Sparkles size={16} color={C.orange400} />
              <span style={{ fontFamily: "'Lexend'", fontSize: 12, fontWeight: 700, color: C.orange400, letterSpacing: ".12em", textTransform: "uppercase" }}>
                Featured Contracts
              </span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.orange500}33, transparent)`, marginLeft: 14 }} />
            </div>
            <div className="project-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 64 }}>
              {featured.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Rest */}
        {rest.length > 0 && (
          <>
            <div className="anim" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <span style={{ fontFamily: "'Lexend'", fontSize: 12, fontWeight: 700, color: C.gray400, letterSpacing: ".12em", textTransform: "uppercase" }}>
                More Projects
              </span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.navy600}, transparent)`, marginLeft: 14 }} />
            </div>
            <div className="project-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {rest.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </>
        )}

        <style>{`
          @media(max-width:900px){ .project-grid{ grid-template-columns:repeat(2,1fr) !important; } .project-stats{ grid-template-columns:repeat(2,1fr) !important; } }
          @media(max-width:560px){ .project-grid{ grid-template-columns:1fr !important; } }
        `}</style>
      </Section>

      <Section bg={C.navy900}>
        <div className="anim" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(32px, 4vw, 48px)", color: C.white, marginBottom: 16, letterSpacing: ".02em" }}>
            HAVE A <span className="tg">CONTRACT</span> IN MIND?
          </h2>
          <p style={{ fontSize: 16, color: C.gray400, marginBottom: 36, lineHeight: 1.75 }}>
            Whether it&apos;s hazardous materials, a nationwide rollout, or a custom cold-chain operation — we&apos;ve probably handled something like it.
          </p>
          <Link href="/contact" className="btn-p" style={{ padding: "18px 44px", fontSize: 16 }}>
            Request a Proposal <ArrowRight size={18} />
          </Link>
        </div>
      </Section>
    </div>
  );
}
