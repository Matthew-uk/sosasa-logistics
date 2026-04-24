"use client";
import { ArrowRight, CheckCircle, Hash, MapPin, MapPinned, Package, Search, Truck } from "lucide-react";
import { useState } from "react";
import { C } from "../_lib/tokens";

const STATUS_LABEL: Record<string, string> = {
  CREATED: "Created", PICKED_UP: "Picked Up", IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery", DELIVERED: "Delivered",
};
const STATUS_PROGRESS: Record<string, number> = {
  CREATED: 5, PICKED_UP: 25, IN_TRANSIT: 55, OUT_FOR_DELIVERY: 82, DELIVERED: 100,
};

interface HistoryEvent { locationName: string; locationStatus: string; updatedAt: string }
interface TrackOrder {
  code: string; trackingCode: string; status: string;
  sender: { name?: string };
  receiver: { name?: string };
  parcel: { origin?: string; destination?: string };
  history: HistoryEvent[];
}

export default function TrackingWidget({ full = false }: { full?: boolean }) {
  const [code, setCode] = useState("");
  const [tracking, setTracking] = useState(false);
  const [result, setResult] = useState<TrackOrder | null>(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    const q = code.trim();
    if (!q) return;
    setTracking(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/track/${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "No shipment found for this code."); }
      else setResult(data.order);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setTracking(false);
    }
  };

  const progress = result ? (STATUS_PROGRESS[result.status] ?? 50) : 0;
  const statusLabel = result ? (STATUS_LABEL[result.status] ?? result.status) : "";
  const isDelivered = result?.status === "DELIVERED";

  return (
    <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: full ? 52 : 36, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 220, height: 220, background: `radial-gradient(circle at top right, ${C.orange500}0D, transparent 70%)` }} />

      {full && (
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ width: 76, height: 76, borderRadius: 22, background: `${C.orange500}12`, border: `1px solid ${C.orange500}28`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
            <Search size={34} color={C.orange400} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 40, color: C.white, letterSpacing: ".02em", marginBottom: 10 }}>Track Your Shipment</h2>
          <p style={{ color: C.gray400, fontSize: 15 }}>Enter your tracking number or order number for real-time updates</p>
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
            placeholder="Enter tracking code or order number"
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

      {error && (
        <div style={{ marginTop: 24, padding: "14px 18px", background: "#ef444410", border: "1px solid #ef444430", borderRadius: 14, color: "#ef4444", fontSize: 14, fontWeight: 500, animation: "fadeUp .4s ease" }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 36, paddingTop: 32, borderTop: `1px solid ${C.navy600}`, animation: "fadeUp .5s ease" }}>
          {/* ID + status badge */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div>
              <p style={{ color: C.gray500, fontSize: 12, marginBottom: 2 }}>Tracking ID</p>
              <p style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.white, letterSpacing: ".04em" }}>{result.trackingCode}</p>
              <p style={{ fontSize: 12, color: C.gray500, marginTop: 1 }}>Order #{result.code}</p>
            </div>
            <div style={{ background: isDelivered ? "#4ade8014" : `${C.orange500}14`, border: `1px solid ${isDelivered ? "#4ade8033" : `${C.orange500}33`}`, padding: "7px 18px", borderRadius: 100, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: isDelivered ? "#4ade80" : C.orange400, animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'Lexend'", fontWeight: 700, fontSize: 12, color: isDelivered ? "#4ade80" : C.orange400 }}>{statusLabel}</span>
            </div>
          </div>

          {/* Route + progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={16} color={C.orange400} />
              <span style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{result.parcel?.origin ?? "Origin"}</span>
            </div>
            <div style={{ flex: 1, height: 4, minWidth: 60, background: C.navy600, borderRadius: 2, position: "relative" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: isDelivered ? "linear-gradient(90deg, #4ade80, #22c55e)" : `linear-gradient(90deg, ${C.orange500}, ${C.orange300})`, borderRadius: 2, boxShadow: `0 0 12px ${isDelivered ? "#4ade8066" : `${C.orange500}66`}`, transition: "width .8s ease" }} />
              {!isDelivered && <Truck size={18} color={C.orange400} style={{ position: "absolute", left: `${progress}%`, top: "50%", transform: "translate(-50%,-50%)", filter: `drop-shadow(0 0 6px ${C.orange500}88)` }} />}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPinned size={16} color={isDelivered ? "#4ade80" : C.gray500} />
              <span style={{ color: isDelivered ? "#4ade80" : C.gray400, fontWeight: 700, fontSize: 14 }}>{result.parcel?.destination ?? "Destination"}</span>
            </div>
          </div>

          {/* History timeline */}
          {result.history.length > 0 && (
            <div>
              {[...result.history].reverse().map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: i === 0 ? C.orange500 : C.navy700, border: `2px solid ${i === 0 ? C.orange500 : C.navy600}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, boxShadow: i === 0 ? `0 0 16px ${C.orange500}33` : "none" }}>
                      {i === 0 ? <CheckCircle size={16} color={C.white} /> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.navy500 }} />}
                    </div>
                    {i < result.history.length - 1 && <div style={{ width: 2, height: 44, background: i === 0 ? `${C.orange500}33` : C.navy700 }} />}
                  </div>
                  <div style={{ paddingBottom: i < result.history.length - 1 ? 22 : 0, paddingTop: 4 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: i === 0 ? C.white : C.gray500 }}>{h.locationStatus}</p>
                    <p style={{ fontSize: 12, color: C.gray500, marginTop: 3 }}>
                      {new Date(h.updatedAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {h.locationName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
