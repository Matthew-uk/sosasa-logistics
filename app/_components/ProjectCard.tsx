"use client";
import { ArrowUpRight, Building, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { C } from "../_lib/tokens";
import type { Project } from "../_lib/types";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="anim"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "block",
        textDecoration: "none",
        color: "inherit",
        background: C.navy800,
        border: `1px solid ${hover ? C.orange500 + "55" : C.navy600}`,
        borderRadius: 24,
        overflow: "hidden",
        transition: "transform .6s cubic-bezier(.16,1,.3,1), border-color .4s, box-shadow .5s",
        transform: hover ? "translateY(-10px)" : "translateY(0)",
        boxShadow: hover ? `0 30px 80px ${C.orange500}22` : "0 0 0 rgba(0,0,0,0)",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Image with Ken Burns + overlay */}
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 1.1s cubic-bezier(.16,1,.3,1), filter .5s",
            transform: hover ? "scale(1.1)" : "scale(1.02)",
            filter: hover ? "brightness(1.05)" : "brightness(.78)",
          }}
        />

        {/* Animated diagonal sheen */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(110deg, transparent 35%, ${C.orange500}22 50%, transparent 65%)`,
          backgroundSize: "200% 100%",
          backgroundPosition: hover ? "-100% 0" : "200% 0",
          transition: "background-position .9s ease",
          pointerEvents: "none",
        }} />

        {/* Gradient fade */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, ${C.navy800} 2%, ${C.navy800}88 28%, transparent 65%)`,
        }} />

        {/* Top pill: category */}
        <div style={{
          position: "absolute", top: 18, left: 18,
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(0,0,0,.55)", backdropFilter: "blur(10px)",
          padding: "7px 14px", borderRadius: 100,
          border: `1px solid ${C.orange500}33`,
          transform: hover ? "translateY(0)" : "translateY(-4px)",
          opacity: hover ? 1 : 0.95,
          transition: "transform .4s, opacity .4s",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.orange400, animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'Lexend'", fontSize: 10.5, fontWeight: 700, color: C.orange200, letterSpacing: ".12em", textTransform: "uppercase" }}>
            {project.category}
          </span>
        </div>

        {/* Year badge top-right */}
        <div style={{
          position: "absolute", top: 18, right: 18,
          fontFamily: "'Bebas Neue'", fontSize: 22,
          color: C.white,
          background: "rgba(4,8,16,.55)", backdropFilter: "blur(10px)",
          padding: "4px 12px", borderRadius: 8,
          border: `1px solid ${C.navy600}`,
          letterSpacing: ".03em",
        }}>
          {project.year}
        </div>

        {/* Hover-appearing arrow */}
        <div style={{
          position: "absolute", bottom: 20, right: 20,
          width: 52, height: 52, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.orange500}, ${C.orange600})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 12px 32px ${C.orange500}66`,
          transform: hover ? "scale(1) rotate(0deg)" : "scale(0) rotate(-45deg)",
          opacity: hover ? 1 : 0,
          transition: "transform .5s cubic-bezier(.16,1,.3,1), opacity .3s",
        }}>
          <ArrowUpRight size={20} color={C.white} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "26px 28px 32px" }}>
        <h3 style={{
          fontFamily: "'Bebas Neue'", fontSize: 26, color: C.white,
          letterSpacing: ".02em", marginBottom: 10, lineHeight: 1.15,
          transition: "color .3s",
        }}>
          {project.title}
        </h3>

        <p style={{ fontSize: 13.5, color: C.gray400, lineHeight: 1.7, marginBottom: 20 }}>
          {project.shortDesc}
        </p>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 20 }}>
          <MetaItem icon={<Building size={13} color={C.orange400} />} text={project.client} />
          <MetaItem icon={<MapPin size={13} color={C.orange400} />} text={project.location} />
          <MetaItem icon={<Calendar size={13} color={C.orange400} />} text={project.completionDate} />
        </div>

        {/* Animated bottom accent */}
        <div style={{
          height: 2,
          background: `linear-gradient(90deg, ${C.orange500}, ${C.orange300}, ${C.orange500}00)`,
          transformOrigin: "left",
          transform: hover ? "scaleX(1)" : "scaleX(0)",
          transition: "transform .6s cubic-bezier(.16,1,.3,1)",
          marginBottom: 16,
        }} />

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} style={{
              fontSize: 10.5, fontWeight: 600, letterSpacing: ".05em",
              color: C.gray300,
              padding: "4px 10px", borderRadius: 6,
              background: C.navy900, border: `1px solid ${C.navy600}`,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function MetaItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {icon}
      <span style={{ fontSize: 12, color: C.gray400, fontWeight: 500 }}>{text}</span>
    </div>
  );
}
