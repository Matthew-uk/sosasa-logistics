import type { CSSProperties, ReactNode } from "react";
import { C } from "../_lib/tokens";

export default function ImgBox({
  src, alt, style = {}, overlayContent,
}: { src: string; alt: string; style?: CSSProperties; overlayContent?: ReactNode }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, background: C.navy800, ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="img-cover"
        loading="lazy"
        style={{ position: "absolute", inset: 0, animation: "kenBurns 20s ease-in-out infinite alternate" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,8,16,.85) 0%, rgba(4,8,16,.2) 50%, rgba(4,8,16,.3) 100%)" }} />
      {overlayContent && (
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>
          {overlayContent}
        </div>
      )}
    </div>
  );
}
