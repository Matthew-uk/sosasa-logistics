"use client";
import { ArrowRight, Box, ChevronLeft, ChevronRight, Package, PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AdminShell from "../_components/AdminShell";
import { FormSelect } from "@/components/ui/form-fields";
import { C } from "../../_lib/tokens";

interface Order {
  _id: string;
  code: string;
  trackingCode: string;
  status: string;
  sender: { name?: string; phone?: string };
  receiver: { name?: string; phone?: string };
  parcel: { origin?: string; destination?: string; deliveryMode?: string };
  createdAt: string;
}

const STATUS_LABEL: Record<string, string> = {
  CREATED: "Created", PICKED_UP: "Picked Up", IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery", DELIVERED: "Delivered",
};
const STATUS_COLOR: Record<string, string> = {
  CREATED: C.gray400, PICKED_UP: C.orange300, IN_TRANSIT: C.orange400,
  OUT_FOR_DELIVERY: C.orange500, DELIVERED: "#4ade80",
};
const ALL_STATUSES = ["", "CREATED", "PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"];

export default function OrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const LIMIT = 15;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
    if (q) params.set("q", q);
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/orders?${params}`);
    const data = await res.json();
    setOrders(data.orders ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [page, q, statusFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <AdminShell>
      <div style={{ animation: "fadeIn .4s ease" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: C.white, letterSpacing: ".03em", lineHeight: 1 }}>ALL ORDERS</h1>
            <p style={{ color: C.gray500, fontSize: 14, marginTop: 6 }}>{total} shipment{total !== 1 ? "s" : ""} total</p>
          </div>
          <Link href="/admin/orders/new" className="btn-p" style={{ padding: "12px 24px", fontSize: 14 }}>
            <PlusCircle size={16} /> New Order
          </Link>
        </div>

        {/* Filters */}
        <div className="filter-row" style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <Search size={15} color={C.gray500} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search by code, name…"
              style={{ width: "100%", padding: "13px 14px 13px 40px", background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 12, color: C.white, fontSize: 14, fontFamily: "'Lexend'" }}
            />
          </div>
          <div style={{ minWidth: 180 }}>
            <FormSelect
              options={[
                { value: "", label: "All Statuses" },
                ...ALL_STATUSES.filter(Boolean).map((s) => ({ value: s, label: STATUS_LABEL[s] })),
              ]}
              value={statusFilter}
              onChange={(v) => { setStatusFilter(v); setPage(1); }}
              placeholder="All Statuses"
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, overflow: "hidden" }}>
          <div className="ord-header" style={{ display: "grid", gridTemplateColumns: "80px 160px 1fr 1fr 130px 120px 60px", gap: 12, padding: "14px 28px", borderBottom: `1px solid ${C.navy600}` }}>
            {["#Code", "Tracking", "Sender", "Receiver", "Route", "Status", ""].map((h, i) => (
              <span key={i} style={{ fontSize: 11, color: C.gray500, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: 60, textAlign: "center" }}>
              <div style={{ width: 36, height: 36, border: `3px solid ${C.navy600}`, borderTopColor: C.orange500, borderRadius: "50%", animation: "spin .8s linear infinite", margin: "0 auto" }} />
            </div>
          ) : orders.length === 0 ? (
            <div style={{ padding: "60px 28px", textAlign: "center" }}>
              <Box size={48} color={C.navy600} style={{ marginBottom: 16 }} />
              <p style={{ color: C.gray500, fontSize: 15 }}>No orders found</p>
              {!q && !statusFilter && (
                <Link href="/admin/orders/new" className="btn-p" style={{ marginTop: 20, padding: "12px 28px", fontSize: 14, display: "inline-flex" }}>
                  Create First Order <ArrowRight size={14} />
                </Link>
              )}
            </div>
          ) : (
            orders.map((o, i) => (
              <Link key={o._id} href={`/admin/orders/${o._id}`} style={{ textDecoration: "none", display: "block" }}>
                <div
                  className="ord-row"
                  style={{ display: "grid", gridTemplateColumns: "80px 160px 1fr 1fr 130px 120px 60px", gap: 12, padding: "16px 28px", borderBottom: i < orders.length - 1 ? `1px solid ${C.navy700}` : "none", alignItems: "center", transition: "background .2s", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = `${C.navy700}55`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.orange400, letterSpacing: ".04em" }}>#{o.code}</span>
                  <span style={{ fontSize: 12, color: C.gray300, fontFamily: "monospace", letterSpacing: ".04em" }}>{o.trackingCode}</span>
                  <div>
                    <div style={{ fontSize: 13, color: C.white, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.sender?.name ?? "—"}</div>
                    {o.sender?.phone && <div style={{ fontSize: 11, color: C.gray500 }}>{o.sender.phone}</div>}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: C.white, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.receiver?.name ?? "—"}</div>
                    {o.receiver?.phone && <div style={{ fontSize: 11, color: C.gray500 }}>{o.receiver.phone}</div>}
                  </div>
                  <span style={{ fontSize: 12, color: C.gray400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {o.parcel?.origin ?? "—"} → {o.parcel?.destination ?? "—"}
                  </span>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: STATUS_COLOR[o.status] ?? C.gray400, background: `${STATUS_COLOR[o.status] ?? C.gray400}12`, border: `1px solid ${STATUS_COLOR[o.status] ?? C.gray400}25`, padding: "4px 10px", borderRadius: 100, whiteSpace: "nowrap" }}>
                      {STATUS_LABEL[o.status] ?? o.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight size={16} color={C.gray500} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 28 }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              style={{ width: 40, height: 40, borderRadius: 10, background: C.navy800, border: `1px solid ${C.navy600}`, color: page === 1 ? C.navy600 : C.white, cursor: page === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => Math.abs(p - page) <= 2).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                style={{ width: 40, height: 40, borderRadius: 10, background: p === page ? C.orange500 : C.navy800, border: `1px solid ${p === page ? C.orange500 : C.navy600}`, color: p === page ? C.white : C.gray400, cursor: "pointer", fontFamily: "'Lexend'", fontSize: 14, fontWeight: 600 }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ width: 40, height: 40, borderRadius: 10, background: C.navy800, border: `1px solid ${C.navy600}`, color: page === totalPages ? C.navy600 : C.white, cursor: page === totalPages ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:1024px){ .ord-header,.ord-row{ grid-template-columns:80px 1fr 1fr 120px 50px !important; } .ord-header>span:nth-child(2),.ord-row>span:nth-child(2){ display:none; } .ord-header>span:nth-child(5),.ord-row>span:nth-child(5){ display:none; } }
        @media(max-width:640px){ .ord-header,.ord-row{ grid-template-columns:80px 1fr 120px 40px !important; } .ord-header>span:nth-child(4),.ord-row>div:nth-child(4){ display:none; } }
      `}</style>
    </AdminShell>
  );
}
