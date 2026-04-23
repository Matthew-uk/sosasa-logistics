"use client";
import type { CSSProperties, ReactNode } from "react";
import { useScrollAnim } from "../_lib/hooks";

export default function Section({
  children, bg, style = {}, id,
}: { children: ReactNode; bg?: string; style?: CSSProperties; id?: string }) {
  const ref = useScrollAnim();
  return (
    <section
      ref={ref as React.Ref<HTMLElement>}
      id={id}
      style={{ background: bg || "transparent", padding: "110px 28px", position: "relative", overflow: "hidden", ...style }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 2 }}>{children}</div>
    </section>
  );
}
