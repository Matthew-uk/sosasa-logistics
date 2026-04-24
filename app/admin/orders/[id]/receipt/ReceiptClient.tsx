"use client";
import { ArrowLeft, Package, Printer } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { C } from "../../../../_lib/tokens";

interface HistoryEvent { locationName: string; locationStatus: string; updatedAt: string }
interface Order {
  _id: string; code: string; trackingCode: string; status: string;
  sender: { name?: string; email?: string; phone?: string; address?: string };
  receiver: { name?: string; email?: string; phone?: string; address?: string };
  parcel: { deliveryMode?: string; packageDescription?: string; totalWeight?: string; origin?: string; destination?: string; expectedPickupDate?: string };
  history: HistoryEvent[];
  additionalInfo?: string;
  chargedPrice?: number;
  createdAt: string;
}

const STATUS_LABEL: Record<string, string> = {
  CREATED: "Created", PICKED_UP: "Picked Up", IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery", DELIVERED: "Delivered",
};
const STATUS_COLOR: Record<string, string> = {
  CREATED: "#9CA3AF", PICKED_UP: "#9DBAFF", IN_TRANSIT: "#6F95F2",
  OUT_FOR_DELIVERY: "#2F6FE4", DELIVERED: "#4ade80",
};

function fmt(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
function fmtTime(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function ReceiptClient({ id }: { id: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((d) => { if (d.order) setOrder(d.order); })
      .finally(() => setLoading(false));
  }, [id]);

  function handlePrint() { window.print(); }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: C.navy950, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 42, height: 42, border: `3px solid ${C.navy600}`, borderTopColor: C.orange500, borderRadius: "50%", animation: "spin .8s linear infinite" }} />
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ minHeight: "100vh", background: C.navy950, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: C.gray400 }}>Order not found.</p>
      </div>
    );
  }

  const statusColor = STATUS_COLOR[order.status] ?? C.gray400;

  return (
    <>
      {/* Print-hidden toolbar */}
      <div className="no-print" style={{ background: C.navy900, borderBottom: `1px solid ${C.navy700}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href={`/admin/orders/${id}`} style={{ display: "flex", alignItems: "center", gap: 8, color: C.gray400, textDecoration: "none", fontSize: 14, fontFamily: "'Lexend'" }}>
          <ArrowLeft size={16} /> Back to Order
        </Link>
        <button onClick={handlePrint} style={{ display: "flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${C.orange500}, ${C.orange600})`, border: "none", borderRadius: 12, padding: "10px 22px", color: C.white, cursor: "pointer", fontFamily: "'Lexend'", fontSize: 14, fontWeight: 700 }}>
          <Printer size={16} /> Print / Save PDF
        </button>
      </div>

      {/* Receipt wrapper */}
      <div style={{ minHeight: "100vh", background: "#e8ecf0", padding: "40px 20px 80px", display: "flex", justifyContent: "center" }}>
        <div ref={printRef} className="receipt-paper" style={{
          width: "100%", maxWidth: 780, background: "#FFFFFF",
          boxShadow: "0 20px 80px rgba(0,0,0,0.15)",
          fontFamily: "'Lexend', sans-serif",
        }}>

          {/* ── HEADER BAND ── */}
          <div style={{ background: "#070D1A", padding: "36px 44px", position: "relative", overflow: "hidden" }}>
            {/* Decorative grid */}
            <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            {/* Orange glow */}
            <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, background: "radial-gradient(circle, #2F6FE420 0%, transparent 70%)" }} />

            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(47,111,228,0.15)", border: "1px solid rgba(47,111,228,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Package size={20} color="#6F95F2" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 26, color: "#FFFFFF", letterSpacing: ".06em", lineHeight: 1 }}>SOSASA LOGISTICS</div>
                    <div style={{ fontSize: 10, color: "#6F95F2", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>Shipment Receipt</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.7, marginTop: 12 }}>
                  <div>Victoria Island, Lagos, Nigeria</div>
                  <div>+234 (0) 800 SOSASA  ·  hello@sosasa.ng</div>
                  <div>www.sosasa.ng</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "#6B7280", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>Order Number</div>
                <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 44, color: "#FFFFFF", letterSpacing: ".04em", lineHeight: 1 }}>#{order.code}</div>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: "#6F95F2", letterSpacing: ".08em", marginTop: 6 }}>{order.trackingCode}</div>
                <div style={{ marginTop: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: statusColor, background: `${statusColor}18`, border: `1px solid ${statusColor}30`, padding: "4px 12px", borderRadius: 100 }}>
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── DATE STRIP ── */}
          <div style={{ background: "#F1F5F9", borderBottom: "1px solid #E2E8F0", padding: "12px 44px", display: "flex", gap: 32, flexWrap: "wrap" }}>
            <div><span style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Issue Date: </span><span style={{ fontSize: 12, color: "#1E293B", fontWeight: 600 }}>{fmt(order.createdAt)}</span></div>
            {order.parcel?.expectedPickupDate && <div><span style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Expected Pickup: </span><span style={{ fontSize: 12, color: "#1E293B", fontWeight: 600 }}>{fmt(order.parcel.expectedPickupDate)}</span></div>}
            <div style={{ marginLeft: "auto" }}><span style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Delivery Mode: </span><span style={{ fontSize: 12, color: "#1E293B", fontWeight: 600 }}>{order.parcel?.deliveryMode ?? "—"}</span></div>
          </div>

          {/* ── PARTIES SECTION ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #E2E8F0" }}>
            {(["sender", "receiver"] as const).map((role, i) => {
              const party = order[role];
              return (
                <div key={role} style={{ padding: "28px 44px", borderRight: i === 0 ? "1px solid #E2E8F0" : "none" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#2F6FE4", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 16, height: 2, background: "#2F6FE4", borderRadius: 1 }} />
                    {role === "sender" ? "FROM — SENDER" : "TO — RECEIVER"}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>{party?.name ?? "—"}</div>
                  {party?.phone && <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>📞 {party.phone}</div>}
                  {party?.email && <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>✉ {party.email}</div>}
                  {party?.address && <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.55 }}>📍 {party.address}</div>}
                </div>
              );
            })}
          </div>

          {/* ── ROUTE VISUAL ── */}
          <div style={{ padding: "24px 44px", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Origin</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginTop: 4 }}>{order.parcel?.origin ?? "—"}</div>
            </div>
            <div style={{ flex: 2, display: "flex", alignItems: "center", gap: 0 }}>
              <div style={{ flex: 1, height: 2, background: "#CBD5E1", borderRadius: 1 }} />
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #2F6FE4, #6F95F2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(47,111,228,0.3)" }}>
                <Package size={14} color="#fff" />
              </div>
              <div style={{ flex: 1, height: 2, background: "#CBD5E1", borderRadius: 1 }} />
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Destination</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginTop: 4 }}>{order.parcel?.destination ?? "—"}</div>
            </div>
          </div>

          {/* ── PARCEL TABLE ── */}
          <div style={{ padding: "28px 44px", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#2F6FE4", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 16, height: 2, background: "#2F6FE4", borderRadius: 1 }} />
              PARCEL DETAILS
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#F1F5F9" }}>
                  {["Description", "Weight", "Delivery Mode"].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#64748B", letterSpacing: ".08em", textTransform: "uppercase", border: "1px solid #E2E8F0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>{order.parcel?.packageDescription ?? "—"}</td>
                  <td style={tdStyle}>{order.parcel?.totalWeight ?? "—"}</td>
                  <td style={tdStyle}>{order.parcel?.deliveryMode ?? "—"}</td>
                </tr>
              </tbody>
            </table>
            {order.additionalInfo && (
              <div style={{ marginTop: 16, padding: "12px 16px", background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 8 }}>
                <span style={{ fontSize: 10, color: "#9A3412", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Notes: </span>
                <span style={{ fontSize: 13, color: "#7C2D12" }}>{order.additionalInfo}</span>
              </div>
            )}
          </div>

          {/* ── PRICING ── */}
          {order.chargedPrice !== undefined && order.chargedPrice !== null && (
            <div style={{ padding: "20px 44px", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#2F6FE4", letterSpacing: ".12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 2, background: "#2F6FE4", borderRadius: 1 }} />
                AMOUNT CHARGED
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0F172A" }}>
                {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(order.chargedPrice)}
              </div>
            </div>
          )}

          {/* ── TRACKING HISTORY ── */}
          {order.history.length > 0 && (
            <div style={{ padding: "28px 44px", borderBottom: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#2F6FE4", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 18, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 2, background: "#2F6FE4", borderRadius: 1 }} />
                TRACKING HISTORY
              </div>
              <div>
                {[...order.history].reverse().map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < order.history.length - 1 ? 0 : 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "#2F6FE4" : "#E2E8F0", border: `2px solid ${i === 0 ? "#2F6FE4" : "#CBD5E1"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "#fff" : "#94A3B8" }} />
                      </div>
                      {i < order.history.length - 1 && <div style={{ width: 2, height: 36, background: "#E2E8F0", margin: "2px 0" }} />}
                    </div>
                    <div style={{ paddingBottom: i < order.history.length - 1 ? 14 : 0, paddingTop: 2 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "#0F172A" : "#475569" }}>{h.locationStatus}</div>
                      <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{h.locationName}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{fmtTime(h.updatedAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FOOTER ── */}
          <div style={{ background: "#070D1A", padding: "24px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 18, color: "#FFFFFF", letterSpacing: ".06em" }}>SOSASA LOGISTICS</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Nigeria's #1 Logistics Partner</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#6B7280" }}>This receipt is auto-generated and serves as official proof of shipment.</div>
              <div style={{ fontSize: 11, color: "#4B5563", marginTop: 2 }}>Ref: {order.trackingCode}  ·  Printed: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lexend:wght@300;400;500;600;700;800&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:#e8ecf0; }
        @keyframes spin { to { transform:rotate(360deg); } }
        @media print {
          .no-print { display:none !important; }
          body { background:#fff !important; }
          .receipt-paper { box-shadow:none !important; max-width:100% !important; }
          @page { margin: 0.5cm; size: A4; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        @media(max-width:600px){
          .receipt-paper > div[style*="grid-template-columns: 1fr 1fr"] { display:block !important; }
          .receipt-paper > div[style*="grid-template-columns: 1fr 1fr"] > div { border-right:none !important; border-bottom:1px solid #E2E8F0; }
        }
      `}</style>
    </>
  );
}

const tdStyle: React.CSSProperties = { padding: "12px 14px", fontSize: 13, color: "#1E293B", border: "1px solid #E2E8F0", verticalAlign: "top" };
