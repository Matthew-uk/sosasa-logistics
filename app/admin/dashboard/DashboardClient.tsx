"use client";
import { ArrowRight, Box, CheckCircle, Clock, Package, PlusCircle, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "../_components/AdminShell";
import { C } from "../../_lib/tokens";

interface StatsData {
  total: number;
  created: number;
  inTransit: number;
  delivered: number;
  recentOrders: Array<{
    _id: string;
    code: string;
    trackingCode: string;
    status: string;
    sender: { name?: string };
    receiver: { name?: string };
    parcel: { origin?: string; destination?: string };
    createdAt: string;
  }>;
}

const STATUS_LABEL: Record<string, string> = {
  CREATED: "Created",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
};

const STATUS_COLOR: Record<string, string> = {
  CREATED: C.gray400,
  PICKED_UP: C.orange300,
  IN_TRANSIT: C.orange400,
  OUT_FOR_DELIVERY: C.orange500,
  DELIVERED: "#4ade80",
};

export default function DashboardClient() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [allRes, deliveredRes, recentRes] = await Promise.all([
        fetch("/api/orders?limit=1"),
        fetch("/api/orders?status=DELIVERED&limit=1"),
        fetch("/api/orders?limit=6"),
      ]);
      const allData = await allRes.json();
      const deliveredData = await deliveredRes.json();
      const recentData = await recentRes.json();

      const inTransitRes = await fetch("/api/orders?status=IN_TRANSIT&limit=1");
      const inTransitData = await inTransitRes.json();
      const createdRes = await fetch("/api/orders?status=CREATED&limit=1");
      const createdData = await createdRes.json();

      setStats({
        total: allData.total ?? 0,
        delivered: deliveredData.total ?? 0,
        inTransit: inTransitData.total ?? 0,
        created: createdData.total ?? 0,
        recentOrders: recentData.orders ?? [],
      });
      setLoading(false);
    }
    load();
  }, []);

  return (
    <AdminShell>
      <div style={{ animation: "fadeIn .4s ease" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: C.white, letterSpacing: ".03em", lineHeight: 1 }}>DASHBOARD</h1>
            <p style={{ color: C.gray500, fontSize: 14, marginTop: 6 }}>Overview of all shipments</p>
          </div>
          <Link href="/admin/orders/new" className="btn-p" style={{ padding: "12px 24px", fontSize: 14 }}>
            <PlusCircle size={16} /> New Order
          </Link>
        </div>

        {/* Stat cards */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28, height: 120, animation: "pulse 1.5s infinite" }} />
            ))}
          </div>
        ) : (
          <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
            {[
              { label: "Total Orders", value: stats!.total, icon: Box, color: C.orange400 },
              { label: "Created", value: stats!.created, icon: Package, color: C.gray300 },
              { label: "In Transit", value: stats!.inTransit, icon: Truck, color: C.orange300 },
              { label: "Delivered", value: stats!.delivered, icon: CheckCircle, color: "#4ade80" },
            ].map((s, i) => (
              <div key={i} style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${s.color}08 0%, transparent 70%)` }} />
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${s.color}12`, border: `1px solid ${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <s.icon size={20} color={s.color} />
                </div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 38, color: C.white, lineHeight: 1, letterSpacing: ".02em" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: C.gray500, marginTop: 6, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Recent orders */}
        <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, overflow: "hidden" }}>
          <div style={{ padding: "24px 28px", borderBottom: `1px solid ${C.navy600}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Clock size={18} color={C.orange400} />
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white, letterSpacing: ".03em" }}>RECENT ORDERS</span>
            </div>
            <Link href="/admin/orders" style={{ display: "flex", alignItems: "center", gap: 6, color: C.orange400, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              <div style={{ width: 36, height: 36, border: `3px solid ${C.navy600}`, borderTopColor: C.orange500, borderRadius: "50%", animation: "spin .8s linear infinite", margin: "0 auto" }} />
            </div>
          ) : stats!.recentOrders.length === 0 ? (
            <div style={{ padding: "60px 28px", textAlign: "center" }}>
              <Package size={48} color={C.navy600} style={{ marginBottom: 16 }} />
              <p style={{ color: C.gray500, fontSize: 15 }}>No orders yet.</p>
              <Link href="/admin/orders/new" className="btn-p" style={{ marginTop: 20, padding: "12px 28px", fontSize: 14, display: "inline-flex" }}>
                Create Your First Order <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div>
              <div className="table-header" style={{ display: "grid", gridTemplateColumns: "80px 160px 1fr 1fr 130px 100px", gap: 12, padding: "14px 28px", borderBottom: `1px solid ${C.navy700}` }}>
                {["#Code", "Tracking", "Sender", "Receiver", "Route", "Status"].map((h) => (
                  <span key={h} style={{ fontSize: 11, color: C.gray500, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>{h}</span>
                ))}
              </div>
              {stats!.recentOrders.map((o, i) => (
                <Link key={o._id} href={`/admin/orders/${o._id}`} style={{ textDecoration: "none", display: "block" }}>
                  <div
                    className="table-row"
                    style={{ display: "grid", gridTemplateColumns: "80px 160px 1fr 1fr 130px 100px", gap: 12, padding: "18px 28px", borderBottom: i < stats!.recentOrders.length - 1 ? `1px solid ${C.navy700}` : "none", alignItems: "center", transition: "background .2s", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = `${C.navy700}55`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.orange400, letterSpacing: ".04em" }}>#{o.code}</span>
                    <span style={{ fontSize: 12, color: C.gray300, fontFamily: "monospace", letterSpacing: ".04em" }}>{o.trackingCode}</span>
                    <span style={{ fontSize: 13, color: C.white, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.sender?.name ?? "—"}</span>
                    <span style={{ fontSize: 13, color: C.white, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.receiver?.name ?? "—"}</span>
                    <span style={{ fontSize: 12, color: C.gray400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {o.parcel?.origin ?? "—"} → {o.parcel?.destination ?? "—"}
                    </span>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: STATUS_COLOR[o.status] ?? C.gray400, background: `${STATUS_COLOR[o.status] ?? C.gray400}12`, border: `1px solid ${STATUS_COLOR[o.status] ?? C.gray400}25`, padding: "4px 10px", borderRadius: 100, whiteSpace: "nowrap" }}>
                        {STATUS_LABEL[o.status] ?? o.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .dash-grid{ grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:600px){ .dash-grid{ grid-template-columns: 1fr !important; } }
        @media(max-width:900px){ .table-header, .table-row{ grid-template-columns: 80px 140px 1fr 120px !important; } }
        @media(max-width:900px){ .table-header > span:nth-child(4), .table-row > span:nth-child(4) { display:none; } }
        @media(max-width:600px){ .table-header, .table-row{ grid-template-columns: 80px 1fr 100px !important; } }
        @media(max-width:600px){ .table-header > span:nth-child(3), .table-row > span:nth-child(3),
                                 .table-header > span:nth-child(5), .table-row > span:nth-child(5) { display:none; } }
      `}</style>
    </AdminShell>
  );
}
