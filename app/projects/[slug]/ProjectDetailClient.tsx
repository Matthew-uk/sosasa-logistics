"use client";
import { ArrowLeft, ArrowRight, Building, Calendar, ChevronLeft, ChevronRight, MapPin, Package, Tag, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ProjectCard from "../../_components/ProjectCard";
import Section from "../../_components/Section";
import { C } from "../../_lib/tokens";
import type { Project } from "../../_lib/types";

export default function ProjectDetailClient({
  project, otherProjects,
}: { project: Project; otherProjects: Project[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(() => {
    setOpenIdx((i) => (i === null ? null : (i + 1) % project.gallery.length));
  }, [project.gallery.length]);
  const prev = useCallback(() => {
    setOpenIdx((i) => (i === null ? null : (i - 1 + project.gallery.length) % project.gallery.length));
  }, [project.gallery.length]);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIdx, close, next, prev]);

  return (
    <div style={{ animation: "fadeIn .5s" }}>
      {/* Hero with project image */}
      <section style={{ position: "relative", paddingTop: 110, paddingBottom: 80, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImage}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", animation: "kenBurns 30s ease-in-out infinite alternate" }}
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.navy950}f2 0%, ${C.navy900}e6 40%, ${C.navy900}b3 100%)` }} />
          <div style={{ position: "absolute", inset: 0, opacity: .035, backgroundImage: `linear-gradient(${C.white} 1px, transparent 1px), linear-gradient(90deg, ${C.white} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
          {/* Back link */}
          <Link
            href="/projects"
            className="back-link"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32,
              color: C.gray400, fontSize: 13, fontWeight: 500, letterSpacing: ".02em",
              textDecoration: "none", transition: "color .3s",
            }}
          >
            <ArrowLeft size={14} /> Back to all projects
          </Link>

          {/* Category pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}15`, border: `1px solid ${C.orange500}33`, padding: "7px 18px", borderRadius: 100, marginBottom: 22, animation: "fadeUp .7s ease .05s both" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.orange500, animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'Lexend'", fontSize: 11.5, fontWeight: 700, color: C.orange300, letterSpacing: ".12em", textTransform: "uppercase" }}>
              {project.category}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue'", fontSize: "clamp(40px, 6vw, 76px)",
            color: C.white, lineHeight: 1.02, letterSpacing: ".02em",
            marginBottom: 20, maxWidth: 900, animation: "fadeUp .7s ease .15s both",
          }}>
            {project.title}
          </h1>

          <p style={{
            fontSize: 17, color: C.gray300, lineHeight: 1.75, maxWidth: 680,
            marginBottom: 36, animation: "fadeUp .7s ease .25s both",
          }}>
            {project.shortDesc}
          </p>

          {/* Meta row */}
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", animation: "fadeUp .7s ease .35s both" }}>
            <DetailMeta icon={<Building size={15} color={C.orange400} />} label="Client" value={project.client} />
            <DetailMeta icon={<MapPin size={15} color={C.orange400} />} label="Location" value={project.location} />
            <DetailMeta icon={<Calendar size={15} color={C.orange400} />} label="Completed" value={project.completionDate} />
            <DetailMeta icon={<Package size={15} color={C.orange400} />} label="Category" value={project.category} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section bg={C.navy900} style={{ padding: "60px 28px" }}>
        <div className="anim detail-stats" style={{
          display: "grid", gridTemplateColumns: `repeat(${project.stats.length}, 1fr)`, gap: 20,
          background: `linear-gradient(135deg, ${C.navy800}, ${C.navy850})`,
          border: `1px solid ${C.navy600}`, borderRadius: 24, padding: 28,
        }}>
          {project.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "14px 8px", position: "relative" }}>
              {i > 0 && (
                <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 1, background: C.navy600 }} className="stat-divider" />
              )}
              <p style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(28px, 3.5vw, 48px)", color: C.white, lineHeight: 1, letterSpacing: ".02em" }}>
                {s.value}
              </p>
              <p style={{ fontSize: 12, color: C.gray500, marginTop: 8, fontWeight: 500, letterSpacing: ".04em", textTransform: "uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <style>{`
          @media(max-width:768px){ .detail-stats{ grid-template-columns:repeat(2,1fr) !important; } .stat-divider{ display:none !important; } }
        `}</style>
      </Section>

      {/* Full description */}
      <Section>
        <div className="detail-body" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 56, alignItems: "start" }}>
          <div className="anim">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}25`, padding: "6px 16px", borderRadius: 100, marginBottom: 22 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.orange500 }} />
              <span style={{ fontFamily: "'Lexend'", fontSize: 11, fontWeight: 700, color: C.orange400, letterSpacing: ".12em", textTransform: "uppercase" }}>The Brief</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(32px, 4vw, 48px)", color: C.white, letterSpacing: ".02em", marginBottom: 28, lineHeight: 1.05 }}>
              HOW IT WENT <span className="tg">DOWN</span>
            </h2>
            {project.fullDesc.map((para, i) => (
              <p key={i} style={{ fontSize: 16, color: C.gray300, lineHeight: 1.85, marginBottom: 22 }}>
                {para}
              </p>
            ))}

            {/* Tags */}
            <div style={{ marginTop: 36, paddingTop: 28, borderTop: `1px solid ${C.navy700}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Tag size={14} color={C.gray500} />
                <span style={{ fontSize: 11, color: C.gray500, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>Scope</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: 12, fontWeight: 600, color: C.gray300,
                    padding: "7px 14px", borderRadius: 100,
                    background: C.navy800, border: `1px solid ${C.navy600}`,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar card */}
          <div className="anim">
            <div style={{
              position: "sticky", top: 110,
              background: C.navy800, border: `1px solid ${C.navy600}`,
              borderRadius: 22, padding: 32,
            }}>
              <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white, letterSpacing: ".05em", marginBottom: 20 }}>
                PROJECT SUMMARY
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  ["Client", project.client],
                  ["Category", project.category],
                  ["Location", project.location],
                  ["Year", project.year],
                  ["Completed", project.completionDate],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 14, borderBottom: `1px solid ${C.navy600}55` }}>
                    <span style={{ color: C.gray500, fontSize: 12, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase" }}>{l}</span>
                    <span style={{ color: C.white, fontWeight: 600, fontSize: 13, textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn-p" style={{ width: "100%", justifyContent: "center", marginTop: 24, padding: "14px 20px", fontSize: 14 }}>
                Request Similar <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){ .detail-body{ grid-template-columns:1fr !important; } }`}</style>
      </Section>

      {/* Gallery */}
      <Section bg={C.navy900}>
        <div className="anim" style={{ display: "flex", alignItems: "end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}25`, padding: "6px 16px", borderRadius: 100, marginBottom: 14 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.orange500 }} />
              <span style={{ fontFamily: "'Lexend'", fontSize: 11, fontWeight: 700, color: C.orange400, letterSpacing: ".12em", textTransform: "uppercase" }}>Field Photos</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(30px, 3.5vw, 44px)", color: C.white, letterSpacing: ".02em", lineHeight: 1.05 }}>
              ON THE <span className="tg">GROUND</span>
            </h2>
          </div>
          <p style={{ color: C.gray500, fontSize: 13, maxWidth: 300 }}>
            Click any image for a larger view.
          </p>
        </div>

        <div className="detail-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {project.gallery.map((src, i) => (
            <div
              key={i}
              className="anim"
              onClick={() => setOpenIdx(i)}
              onMouseEnter={() => setHoveredImg(i)}
              onMouseLeave={() => setHoveredImg(null)}
              style={{
                position: "relative", aspectRatio: "4 / 3", borderRadius: 16, overflow: "hidden",
                cursor: "zoom-in",
                border: `1px solid ${hoveredImg === i ? C.orange500 + "44" : C.navy700}`,
                transition: "border-color .4s, transform .5s cubic-bezier(.16,1,.3,1)",
                transform: hoveredImg === i ? "scale(1.02)" : "scale(1)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${project.title} photo ${i + 1}`}
                loading="lazy"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform .8s cubic-bezier(.16,1,.3,1), filter .4s",
                  transform: hoveredImg === i ? "scale(1.08)" : "scale(1.02)",
                  filter: hoveredImg === i ? "brightness(1.08)" : "brightness(.82)",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, rgba(4,8,16,${hoveredImg === i ? ".6" : ".35"}), transparent 55%)`,
                transition: "all .4s",
              }} />
            </div>
          ))}
        </div>
        <style>{`
          @media(max-width:768px){ .detail-gallery{ grid-template-columns:repeat(2,1fr) !important; } }
          @media(max-width:480px){ .detail-gallery{ grid-template-columns:1fr !important; } }
        `}</style>
      </Section>

      {/* Related */}
      {otherProjects.length > 0 && (
        <Section>
          <div className="anim" style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(28px, 3.5vw, 42px)", color: C.white, letterSpacing: ".02em", marginBottom: 10 }}>
              MORE <span className="tg">PROJECTS</span>
            </h2>
            <p style={{ color: C.gray400, fontSize: 15 }}>Other contracts from our portfolio.</p>
          </div>
          <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {otherProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <style>{`
            @media(max-width:900px){ .related-grid{ grid-template-columns:repeat(2,1fr) !important; } }
            @media(max-width:560px){ .related-grid{ grid-template-columns:1fr !important; } }
          `}</style>
        </Section>
      )}

      {/* Lightbox */}
      {openIdx !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 10000,
            background: "rgba(4,8,16,.93)", backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 28, animation: "fadeIn .3s ease",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            style={{ position: "absolute", top: 24, right: 24, width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: `1px solid ${C.navy600}`, color: C.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: `1px solid ${C.navy600}`, color: C.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: `1px solid ${C.navy600}`, color: C.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ChevronRight size={22} />
          </button>

          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1100, width: "100%", maxHeight: "88vh", animation: "scaleIn .4s ease" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.gallery[openIdx]}
              alt={`${project.title} — image ${openIdx + 1}`}
              style={{ width: "100%", maxHeight: "82vh", objectFit: "contain", borderRadius: 14, background: C.navy900 }}
            />
            <p style={{ textAlign: "center", color: C.gray500, marginTop: 14, fontSize: 13, fontFamily: "'Lexend'", fontWeight: 500 }}>
              {openIdx + 1} / {project.gallery.length}
            </p>
          </div>
        </div>
      )}

      <style>{`.back-link:hover{ color:${C.orange400} !important; }`}</style>
    </div>
  );
}

function DetailMeta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        {icon}
        <span style={{ fontSize: 10.5, color: C.gray500, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>{label}</span>
      </div>
      <p style={{ fontSize: 14, color: C.white, fontWeight: 600 }}>{value}</p>
    </div>
  );
}
