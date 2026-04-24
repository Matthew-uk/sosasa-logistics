"use client";
import {
  BarChart3, TrendingUp, TrendingDown, Package, Truck,
  CheckCircle, DollarSign, ArrowRight, Minus
} from "lucide-react";
import { useEffect, useState } from "react";
import AdminShell from "../_components/AdminShell";
import { C } from "../../_lib/tokens";

interface AnalyticsData {
  totalOrders: number;
  statusBreakdown: Record<string, number>;
  revenue: {
    total: number; avg: number; pricedOrderCount: number;
    last30Days: number; prev30Days: number; growth: number | null;
  };
  deliveryModes: { name: string; count: number }[];
  topOrigins: { name: string; count: number }[];
  ordersLast30Days: number;
  ordersPrev30Days: number;
  orderGrowth: number | null;
  dailyOrders: { date: string; count: number; revenue: number }[];
}

const STATUS_LABEL: Record<string, string> = {
  CREATED: "Created", PICKED_UP: "Picked Up", IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery", DELIVERED: "Delivered",
};
const STATUS_COLOR: Record<string, string> = {
  CREATED: C.gray400, PICKED_UP: C.orange300, IN_TRANSIT: C.orange400,
  OUT_FOR_DELIVERY: C.orange500, DELIVERED: "#4ade80",
};

function fmt(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
}

function GrowthBadge({ value }: { value: number | null }) {
  if (value === null) return <span style={{ fontSize: 12, color: C.gray500 }}>No prior data</span>;
  const positive = value >= 0;
  const Icon = value === 0 ? Minus : positive ? TrendingUp : TrendingDown;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: positive ? "#4ade80" : "#f87171" }}>
      <Icon size={13} />
      {Math.abs(value).toFixed(1)}% vs prev 30d
    </span>
  );
}

function StatCard({ label, value, sub, icon: Icon, color, growth }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; growth?: number | null;
}) {
  return (
    <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${color}08 0%, transparent 70%)` }} />
      <div style={{ width: 44, height: 44, borderRadius: 13, background: `${color}12`, border: `1px solid ${color}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: C.white, lineHeight: 1, letterSpacing: ".02em" }}>{value}</div>
      <div style={{ fontSize: 12, color: C.gray500, marginTop: 6, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase" }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: C.gray400, marginTop: 4 }}>{sub}</div>}
      {growth !== undefined && <div style={{ marginTop: 10 }}><GrowthBadge value={growth} /></div>}
    </div>
  );
}

function BarRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 13, color: C.gray300, minWidth: 150, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 8, background: C.navy700, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width .6s ease" }} />
      </div>
      <span style={{ fontSize: 13, color: C.white, fontWeight: 700, minWidth: 32, textAlign: "right" }}>{value}</span>
    </div>
  );
}

export default function AnalyticsClient() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const maxDelivery = data ? Math.max(...data.deliveryModes.map((d) => d.count), 1) : 1;
  const maxOrigin = data ? Math.max(...data.topOrigins.map((o) => o.count), 1) : 1;
  const maxDaily = data ? Math.max(...data.dailyOrders.map((d) => d.count), 1) : 1;

  return (
    <AdminShell>
      <div style={{ animation: "fadeIn .4s ease" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: C.white, letterSpacing: ".03em", lineHeight: 1 }}>ANALYTICS</h1>
          <p style={{ color: C.gray500, fontSize: 14, marginTop: 6 }}>Performance overview and business insights</p>
        </div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 32 }}>
            {[0,1,2,3].map((i) => (
              <div key={i} style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28, height: 140, animation: "pulse 1.5s infinite" }} />
            ))}
          </div>
        ) : data ? (
          <>
            {/* Stat cards */}
            <div className="a-grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 32 }}>
              <StatCard label="Total Orders" value={data.totalOrders} icon={Package} color={C.orange400}
                growth={data.orderGrowth} sub={`${data.ordersLast30Days} last 30 days`} />
              <StatCard label="Delivered" value={data.statusBreakdown["DELIVERED"] ?? 0} icon={CheckCircle} color="#4ade80"
                sub={`${data.totalOrders > 0 ? Math.round(((data.statusBreakdown["DELIVERED"] ?? 0) / data.totalOrders) * 100) : 0}% success rate`} />
              <StatCard label="In Transit" value={(data.statusBreakdown["IN_TRANSIT"] ?? 0) + (data.statusBreakdown["OUT_FOR_DELIVERY"] ?? 0)} icon={Truck} color={C.orange400}
                sub="Active shipments" />
              <StatCard label="Total Revenue" value={fmt(data.revenue.total)} icon={DollarSign} color={C.orange300}
                growth={data.revenue.growth} sub={`${data.revenue.pricedOrderCount} priced orders`} />
            </div>

            {/* Revenue cards */}
            <div className="a-grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.navy700}` }}>
                  <DollarSign size={17} color={C.orange400} />
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white, letterSpacing: ".04em" }}>REVENUE BREAKDOWN</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { label: "Total Revenue", val: fmt(data.revenue.total) },
                    { label: "Avg per Priced Order", val: fmt(data.revenue.avg) },
                    { label: "Last 30 Days", val: fmt(data.revenue.last30Days) },
                    { label: "Prev 30 Days", val: fmt(data.revenue.prev30Days) },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: C.gray400 }}>{label}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: C.white }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.navy700}` }}>
                  <BarChart3 size={17} color={C.orange400} />
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white, letterSpacing: ".04em" }}>STATUS BREAKDOWN</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {Object.entries(STATUS_LABEL).map(([key, label]) => (
                    <BarRow
                      key={key}
                      label={label}
                      value={data.statusBreakdown[key] ?? 0}
                      max={data.totalOrders}
                      color={STATUS_COLOR[key]}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Daily orders chart (simple bar) */}
            <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28, marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.navy700}` }}>
                <TrendingUp size={17} color={C.orange400} />
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white, letterSpacing: ".04em" }}>ORDERS — LAST 30 DAYS</span>
              </div>
              {data.dailyOrders.length === 0 ? (
                <p style={{ color: C.gray500, fontSize: 14, textAlign: "center", padding: "24px 0" }}>No data yet</p>
              ) : (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120, overflowX: "auto" }}>
                  {data.dailyOrders.map((d) => {
                    const h = Math.max(4, (d.count / maxDaily) * 110);
                    return (
                      <div key={d.date} title={`${d.date}: ${d.count} orders`}
                        style={{ flex: "0 0 auto", minWidth: 14, width: `${100 / Math.max(data.dailyOrders.length, 1)}%`, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "default" }}>
                        <div style={{ width: "80%", height: h, background: `linear-gradient(180deg, ${C.orange500}, ${C.orange700})`, borderRadius: "3px 3px 0 0", transition: "height .4s ease" }} />
                        <span style={{ fontSize: 9, color: C.navy500, whiteSpace: "nowrap", transform: "rotate(-45deg)", transformOrigin: "center", display: "block", marginTop: 2 }}>
                          {d.date.slice(5)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Delivery modes & Origins */}
            <div className="a-grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.navy700}` }}>
                  <Truck size={17} color={C.orange400} />
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white, letterSpacing: ".04em" }}>DELIVERY MODES</span>
                </div>
                {data.deliveryModes.length === 0 ? (
                  <p style={{ color: C.gray500, fontSize: 14 }}>No data</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {data.deliveryModes.map((m, i) => (
                      <BarRow key={m.name} label={m.name} value={m.count} max={maxDelivery}
                        color={[C.orange500, C.orange400, C.orange300, C.orange200, C.orange100][i % 5]} />
                    ))}
                  </div>
                )}
              </div>

              <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${C.navy700}` }}>
                  <ArrowRight size={17} color={C.orange400} />
                  <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white, letterSpacing: ".04em" }}>TOP ORIGINS</span>
                </div>
                {data.topOrigins.length === 0 ? (
                  <p style={{ color: C.gray500, fontSize: 14 }}>No data</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {data.topOrigins.map((o, i) => (
                      <BarRow key={o.name} label={o.name} value={o.count} max={maxOrigin}
                        color={[C.orange500, C.orange400, C.orange300, C.orange200, C.orange100][i % 5]} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0", color: C.gray500 }}>Failed to load analytics</div>
        )}
      </div>

      <style>{`
        @media(max-width:900px){ .a-grid4{ grid-template-columns:1fr 1fr !important; } .a-grid2{ grid-template-columns:1fr !important; } }
        @media(max-width:480px){ .a-grid4{ grid-template-columns:1fr !important; } }
      `}</style>
    </AdminShell>
  );
}
