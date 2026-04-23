"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { C } from "../_lib/tokens";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); setTimeout(() => setOut(true), 200); return 100; }
        return p + Math.random() * 10 + 3;
      });
    }, 50);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { if (out) setTimeout(onComplete, 700); }, [out, onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, background: C.navy950,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: out ? 0 : 1, transform: out ? "scale(1.05)" : "scale(1)",
      transition: "all .7s cubic-bezier(.16,1,.3,1)",
    }}>
      <div style={{ position: "absolute", width: 300, height: 300, background: C.orange500, borderRadius: "50%", opacity: .04, filter: "blur(120px)", animation: "blob 10s ease-in-out infinite" }} />

      {[90, 120, 150].map((sz, i) => (
        <div key={i} style={{
          position: "absolute", width: sz, height: sz,
          border: `1.5px solid ${C.orange500}${["22", "15", "0A"][i]}`,
          borderRadius: "50%", animation: `spin ${7 + i * 4}s linear infinite${i % 2 ? " reverse" : ""}`,
        }} />
      ))}

      <div style={{ animation: "scaleIn .5s ease", marginBottom: 48 }}>
        <Image src="/img/logo/sosasa-logo.png" alt="Sosasa Logistics Limited" width={300} height={300} priority />
      </div>

      <div style={{ width: 240, height: 2, background: C.navy700, borderRadius: 1, overflow: "hidden" }}>
        <div style={{
          width: `${Math.min(progress, 100)}%`, height: "100%",
          background: `linear-gradient(90deg, ${C.orange500}, ${C.orange300})`,
          borderRadius: 1, transition: "width .08s", boxShadow: `0 0 16px ${C.orange500}88`,
        }} />
      </div>
      <p style={{ color: C.gray500, fontFamily: "'Lexend'", fontSize: 11, marginTop: 16, letterSpacing: ".15em", fontWeight: 500 }}>
        {progress < 100 ? "LOADING" : "READY"}
      </p>
    </div>
  );
}
