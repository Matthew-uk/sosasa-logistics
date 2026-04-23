"use client";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { fullGallery, GALLERY_CATEGORIES } from "../_data/gallery";
import { C } from "../_lib/tokens";

export default function GalleryView() {
  const [filter, setFilter] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = filter === "All" ? fullGallery : fullGallery.filter((g) => g.cat === filter);

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(() => {
    setOpenIdx((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);
  const prev = useCallback(() => {
    setOpenIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

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

  const active = openIdx !== null ? filtered[openIdx] : null;

  return (
    <>
      {/* Filter tabs */}
      <div className="anim" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 42 }}>
        {GALLERY_CATEGORIES.map((cat) => {
          const selected = cat === filter;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: selected ? `linear-gradient(135deg, ${C.orange500}, ${C.orange600})` : "transparent",
                color: selected ? C.white : C.gray300,
                border: `1px solid ${selected ? C.orange500 : C.navy600}`,
                padding: "10px 22px", borderRadius: 100, cursor: "pointer",
                fontFamily: "'Lexend'", fontSize: 13, fontWeight: 600, letterSpacing: ".02em",
                transition: "all .3s",
                boxShadow: selected ? `0 8px 24px ${C.orange500}33` : "none",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map((item, i) => (
          <div
            key={`${filter}-${i}`}
            className="anim"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setOpenIdx(i)}
            style={{
              position: "relative", borderRadius: 18, overflow: "hidden", cursor: "zoom-in",
              aspectRatio: "4 / 3",
              border: `1px solid ${hovered === i ? C.orange500 + "44" : C.navy700}`,
              transition: "border-color .4s, transform .5s cubic-bezier(.16,1,.3,1)",
              transform: hovered === i ? "scale(1.01)" : "scale(1)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                transition: "transform .8s cubic-bezier(.16,1,.3,1), filter .5s",
                transform: hovered === i ? "scale(1.08)" : "scale(1.02)",
                filter: hovered === i ? "brightness(1.1)" : "brightness(.75)",
              }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to top, rgba(4,8,16,${hovered === i ? ".92" : ".65"}) 0%, transparent 55%)`,
              transition: "all .5s",
            }} />

            <div style={{
              position: "absolute", top: 14, left: 14,
              background: "rgba(0,0,0,.5)", backdropFilter: "blur(8px)",
              padding: "5px 12px", borderRadius: 8, border: `1px solid ${C.orange500}22`,
            }}>
              <span style={{ fontFamily: "'Lexend'", fontSize: 10, fontWeight: 700, color: C.orange300, textTransform: "uppercase", letterSpacing: ".1em" }}>
                {item.cat}
              </span>
            </div>

            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px",
              transform: hovered === i ? "translateY(0)" : "translateY(6px)",
              transition: "transform .4s",
            }}>
              <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.white, letterSpacing: ".03em", marginBottom: 4 }}>
                {item.title}
              </h4>
              <p style={{
                fontSize: 12, color: C.gray400, lineHeight: 1.5,
                opacity: hovered === i ? 1 : 0,
                maxHeight: hovered === i ? 60 : 0,
                transition: "opacity .4s, max-height .4s",
                overflow: "hidden",
              }}>
                {item.desc}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, opacity: hovered === i ? 1 : 0, transition: "opacity .3s" }}>
                <span style={{ fontSize: 12, color: C.orange300, fontWeight: 600 }}>Open</span>
                <ArrowUpRight size={12} color={C.orange300} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: C.gray500, padding: "60px 20px" }}>
          No items in this category yet.
        </p>
      )}

      {/* Lightbox */}
      {active && openIdx !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 10000,
            background: "rgba(4,8,16,.92)", backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 28, animation: "fadeIn .3s ease",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            style={{
              position: "absolute", top: 24, right: 24,
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(255,255,255,.08)", border: `1px solid ${C.navy600}`,
              color: C.white, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .3s",
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = `${C.orange500}33`; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "rgba(255,255,255,.08)"; }}
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            style={{
              position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)",
              width: 54, height: 54, borderRadius: "50%",
              background: "rgba(255,255,255,.08)", border: `1px solid ${C.navy600}`,
              color: C.white, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .3s",
            }}
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            style={{
              position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)",
              width: 54, height: 54, borderRadius: "50%",
              background: "rgba(255,255,255,.08)", border: `1px solid ${C.navy600}`,
              color: C.white, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .3s",
            }}
          >
            <ChevronRight size={22} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 1100, width: "100%", maxHeight: "88vh",
              display: "flex", flexDirection: "column",
              animation: "scaleIn .4s ease",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.title}
              style={{ width: "100%", maxHeight: "72vh", objectFit: "contain", borderRadius: 14, background: C.navy900 }}
            />
            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
              <div>
                <div style={{ display: "inline-flex", background: `${C.orange500}14`, border: `1px solid ${C.orange500}33`, padding: "4px 12px", borderRadius: 100, marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Lexend'", fontSize: 10, fontWeight: 700, color: C.orange300, textTransform: "uppercase", letterSpacing: ".12em" }}>
                    {active.cat}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: C.white, letterSpacing: ".02em", marginBottom: 6 }}>
                  {active.title}
                </h3>
                <p style={{ color: C.gray400, fontSize: 14, maxWidth: 640, lineHeight: 1.65 }}>
                  {active.desc}
                </p>
              </div>
              <span style={{ color: C.gray500, fontSize: 13, fontFamily: "'Lexend'", fontWeight: 500 }}>
                {openIdx + 1} / {filtered.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){ .gallery-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:560px){ .gallery-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </>
  );
}
