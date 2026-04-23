"use client";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { homeGallery } from "../_data/gallery";
import { C } from "../_lib/tokens";

export default function ArtGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="art-gallery" style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridAutoRows: "180px",
      gap: 12,
    }}>
      {homeGallery.map((item, i) => (
        <div
          key={i}
          className="anim"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            gridColumn: item.span, gridRow: item.rowSpan || "span 1",
            borderRadius: 18, overflow: "hidden", position: "relative", cursor: "pointer",
            border: `1px solid ${hovered === i ? C.orange500 + "44" : C.navy700}`,
            transition: "border-color .4s, transform .5s cubic-bezier(.16,1,.3,1)",
            transform: hovered === i ? "scale(1.02)" : "scale(1)",
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
              transform: hovered === i ? "scale(1.1)" : "scale(1.02)",
              filter: hovered === i ? "brightness(1.1)" : "brightness(.7)",
            }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              el.parentElement!.style.background = `linear-gradient(135deg, ${C.navy700}, ${C.navy900})`;
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, rgba(4,8,16,${hovered === i ? ".9" : ".6"}) 0%, transparent 60%)`,
            transition: "all .5s",
          }} />

          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(0,0,0,.5)", backdropFilter: "blur(8px)",
            padding: "5px 12px", borderRadius: 8, border: `1px solid ${C.orange500}22`,
            opacity: hovered === i ? 1 : 0, transform: hovered === i ? "translateY(0)" : "translateY(-8px)",
            transition: "all .4s",
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
            <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: hovered === i ? 22 : 18, color: C.white, letterSpacing: ".03em", transition: "font-size .3s" }}>
              {item.title}
            </h4>
            {hovered === i && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, animation: "fadeUp .3s ease" }}>
                <span style={{ fontSize: 12, color: C.orange300, fontWeight: 600 }}>View</span>
                <ArrowUpRight size={12} color={C.orange300} />
              </div>
            )}
          </div>
        </div>
      ))}

      <style>{`
        @media(max-width:1024px) {
          .art-gallery { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media(max-width:640px) {
          .art-gallery {
            grid-template-columns: repeat(2,1fr) !important;
            grid-auto-rows: 150px !important;
          }
          .art-gallery > div { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
      `}</style>
    </div>
  );
}
