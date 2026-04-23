"use client";
import { ArrowRight, CheckCircle, Hash, MapPin, MapPinned, Package, Search, Truck } from "lucide-react";
import { useState } from "react";
import { C } from "../_lib/tokens";
import type { TrackResult } from "../_lib/types";

export default function TrackingWidget({ full = false }: { full?: boolean }) {
  const [code, setCode] = useState("");
  const [tracking, setTracking] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);

  const handleTrack = () => {
    if (!code.trim()) return;
    setTracking(true);
    setTimeout(() => {
      setTracking(false);
      setResult({
        id: code.toUpperCase(), status: "In Transit", from: "Lagos", to: "Abuja", progress: 65,
        steps: [
          { label: "Package Received", time: "Mon, 10:30 AM", done: true, location: "Lagos Hub" },
          { label: "In Transit", time: "Tue, 6:00 AM", done: true, location: "Ore Checkpoint" },
          { label: "Arrived at Hub", time: "Est. Wed", done: false, location: "Abuja Hub" },
          { label: "Out for Delivery", time: "Est. Wed PM", done: false, location: "Abuja" },
        ],
      });
    }, 2000);
  };

  return (
    <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: full ? 52 : 36, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 220, height: 220, background: `radial-gradient(circle at top right, ${C.orange500}0D, transparent 70%)` }} />

      {full && (
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ width: 76, height: 76, borderRadius: 22, background: `${C.orange500}12`, border: `1px solid ${C.orange500}28`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
            <Search size={34} color={C.orange400} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 40, color: C.white, letterSpacing: ".02em", marginBottom: 10 }}>Track Your Shipment</h2>
          <p style={{ color: C.gray400, fontSize: 15 }}>Enter your tracking number for real-time updates</p>
        </div>
      )}
      {!full && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <Hash size={18} color={C.orange400} />
          <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.white, letterSpacing: ".03em" }}>Track Your Package</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, flexDirection: full ? "row" : "column", flexWrap: "wrap" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Package size={18} color={C.gray500} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            placeholder="e.g. SOS-12345678"
            style={{ width: "100%", padding: "17px 17px 17px 46px", background: C.navy900, border: `2px solid ${C.navy600}`, borderRadius: 14, color: C.white, fontSize: 15, fontFamily: "'Lexend'", transition: "all .3s" }}
          />
        </div>
        <button className="btn-p" onClick={handleTrack} style={{ padding: "17px 36px", borderRadius: 14, whiteSpace: "nowrap" }}>
          {tracking ? (
            <div style={{ width: 20, height: 20, border: `2px solid #fff4`, borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
          ) : (
            <>Track Now <ArrowRight size={16} /></>
          )}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 36, paddingTop: 32, borderTop: `1px solid ${C.navy600}`, animation: "fadeUp .5s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div>
              <p style={{ color: C.gray500, fontSize: 12, marginBottom: 4 }}>Tracking ID</p>
              <p style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.white, letterSpacing: ".04em" }}>{result.id}</p>
            </div>
            <div style={{ background: `${C.orange500}14`, border: `1px solid ${C.orange500}33`, padding: "7px 18px", borderRadius: 100, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.orange400, animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'Lexend'", fontWeight: 700, fontSize: 12, color: C.orange400 }}>{result.status}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={16} color={C.orange400} />
              <span style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{result.from}</span>
            </div>
            <div style={{ flex: 1, height: 4, minWidth: 60, background: C.navy600, borderRadius: 2, position: "relative" }}>
              <div style={{ width: `${result.progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.orange500}, ${C.orange300})`, borderRadius: 2, boxShadow: `0 0 12px ${C.orange500}66` }} />
              <Truck size={18} color={C.orange400} style={{ position: "absolute", left: `${result.progress}%`, top: "50%", transform: "translate(-50%,-50%)", filter: `drop-shadow(0 0 6px ${C.orange500}88)` }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPinned size={16} color={C.gray500} />
              <span style={{ color: C.gray400, fontWeight: 700, fontSize: 14 }}>{result.to}</span>
            </div>
          </div>

          {result.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: step.done ? C.orange500 : C.navy700, border: `2px solid ${step.done ? C.orange500 : C.navy600}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, boxShadow: step.done ? `0 0 16px ${C.orange500}33` : "none" }}>
                  {step.done ? <CheckCircle size={16} color={C.white} /> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.navy500 }} />}
                </div>
                {i < result.steps.length - 1 && <div style={{ width: 2, height: 44, background: step.done ? `${C.orange500}33` : C.navy700 }} />}
              </div>
              <div style={{ paddingBottom: i < result.steps.length - 1 ? 22 : 0, paddingTop: 4 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: step.done ? C.white : C.gray500 }}>{step.label}</p>
                <p style={{ fontSize: 12, color: C.gray500, marginTop: 3 }}>{step.time} · {step.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
