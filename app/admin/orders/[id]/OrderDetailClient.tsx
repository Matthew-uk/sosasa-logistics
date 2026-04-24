"use client";
import {
  ArrowRight, Calendar, CheckCircle, ChevronLeft, Clock,
  Copy, DollarSign, FileText, Hash, Mail, MapPin, Package,
  Phone, Printer, Trash2, Truck, User
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AdminShell from "../../_components/AdminShell";
import { FormInput, FormSelect } from "@/components/ui/form-fields";
import { C } from "../../../_lib/tokens";

interface HistoryEvent { locationName: string; locationStatus: string; updatedAt: string }
interface Order {
  _id: string; code: string; trackingCode: string; status: string;
  sender: { name?: string; email?: string; phone?: string; address?: string };
  receiver: { name?: string; email?: string; phone?: string; address?: string };
  parcel: { deliveryMode?: string; packageDescription?: string; totalWeight?: string; origin?: string; destination?: string; expectedPickupDate?: string };
  history: HistoryEvent[];
  additionalInfo?: string;
  chargedPrice?: number;
  createdAt: string; updatedAt: string;
}

const STATUSES = ["CREATED", "PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"] as const;

const STATUS_LABEL: Record<string, string> = {
  CREATED: "Created", PICKED_UP: "Picked Up", IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery", DELIVERED: "Delivered",
};
const STATUS_OPTIONS = STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s] }));
const STATUS_COLOR: Record<string, string> = {
  CREATED: C.gray400, PICKED_UP: C.orange300, IN_TRANSIT: C.orange400,
  OUT_FOR_DELIVERY: C.orange500, DELIVERED: "#4ade80",
};

const statusSchema = z.object({
  newStatus: z.string().min(1, "Status is required"),
  locationName: z.string().min(1, "Location name is required"),
  locationStatus: z.string(),
});
type StatusForm = z.infer<typeof statusSchema>;

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={15} color={C.orange400} />
      </div>
      <div>
        <div style={{ fontSize: 10, color: C.gray500, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 14, color: C.white, fontWeight: 500, marginTop: 2 }}>{value}</div>
      </div>
    </div>
  );
}

function PartyCard({ title, data }: { title: string; data: Order["sender"] }) {
  return (
    <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${C.navy700}` }}>
        <User size={16} color={C.orange400} />
        <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.white, letterSpacing: ".04em" }}>{title}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <InfoRow icon={User} label="Name" value={data.name} />
        <InfoRow icon={Phone} label="Phone" value={data.phone} />
        <InfoRow icon={Mail} label="Email" value={data.email} />
        <InfoRow icon={MapPin} label="Address" value={data.address} />
      </div>
    </div>
  );
}

function fmtNGN(n?: number) {
  if (n === undefined || n === null) return null;
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
}

export default function OrderDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [priceInput, setPriceInput] = useState("");
  const [priceEditing, setPriceEditing] = useState(false);
  const [priceSaving, setPriceSaving] = useState(false);
  const [priceError, setPriceError] = useState("");

  const { control, register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<StatusForm>({
    resolver: zodResolver(statusSchema),
    defaultValues: { newStatus: "", locationName: "", locationStatus: "" },
  });

  const newStatus = watch("newStatus");

  async function fetchOrder() {
    const res = await fetch(`/api/orders/${id}`);
    const data = await res.json();
    if (res.ok) {
      setOrder(data.order);
      reset({ newStatus: data.order.status, locationName: "", locationStatus: "" });
      setPriceInput(data.order.chargedPrice != null ? String(data.order.chargedPrice) : "");
    }
    setLoading(false);
  }

  async function savePrice() {
    setPriceError("");
    if (priceInput !== "" && (isNaN(Number(priceInput)) || Number(priceInput) < 0)) {
      setPriceError("Enter a valid positive number");
      return;
    }
    setPriceSaving(true);
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chargedPrice: priceInput === "" ? null : Number(priceInput) }),
    });
    const result = await res.json();
    if (res.ok) { setOrder(result.order); setPriceEditing(false); }
    else setPriceError(result.error ?? "Failed to save");
    setPriceSaving(false);
  }

  useEffect(() => { fetchOrder(); }, [id]);

  async function onStatusSubmit(data: StatusForm) {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: data.newStatus,
        locationName: data.locationName,
        locationStatus: data.locationStatus || STATUS_LABEL[data.newStatus],
      }),
    });
    const result = await res.json();
    if (res.ok) {
      setOrder(result.order);
      reset({ newStatus: result.order.status, locationName: "", locationStatus: "" });
    }
  }

  async function deleteOrder() {
    if (!confirm("Delete this order permanently? This cannot be undone.")) return;
    setDeleting(true);
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    router.push("/admin/orders");
  }

  function copyCode(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <AdminShell>
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 42, height: 42, border: `3px solid ${C.navy600}`, borderTopColor: C.orange500, borderRadius: "50%", animation: "spin .8s linear infinite" }} />
        </div>
      </AdminShell>
    );
  }

  if (!order) {
    return (
      <AdminShell>
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <Package size={56} color={C.navy600} style={{ marginBottom: 16 }} />
          <p style={{ color: C.gray400, fontSize: 16 }}>Order not found</p>
          <Link href="/admin/orders" className="btn-p" style={{ marginTop: 24, padding: "12px 28px", display: "inline-flex" }}>Back to Orders</Link>
        </div>
      </AdminShell>
    );
  }

  const statusColor = STATUS_COLOR[order.status] ?? C.gray400;
  const currentStatusIndex = STATUSES.indexOf(order.status as typeof STATUSES[number]);
  const chargedDisplay = fmtNGN(order.chargedPrice);

  return (
    <AdminShell>
      <div style={{ animation: "fadeIn .4s ease" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link href="/admin/orders" style={{ width: 40, height: 40, borderRadius: 12, background: C.navy800, border: `1px solid ${C.navy600}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gray400, textDecoration: "none", flexShrink: 0 }}>
              <ChevronLeft size={20} />
            </Link>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: C.white, letterSpacing: ".03em", lineHeight: 1 }}>ORDER #{order.code}</h1>
                <span style={{ fontSize: 12, fontWeight: 700, color: statusColor, background: `${statusColor}12`, border: `1px solid ${statusColor}25`, padding: "4px 12px", borderRadius: 100 }}>
                  {STATUS_LABEL[order.status] ?? order.status}
                </span>
                {chargedDisplay && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#4ade80", background: "#4ade8012", border: "1px solid #4ade8025", padding: "4px 12px", borderRadius: 100, display: "flex", alignItems: "center", gap: 4 }}>
                    <DollarSign size={11} />{chargedDisplay}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: C.gray400, fontFamily: "monospace", letterSpacing: ".06em" }}>{order.trackingCode}</span>
                <button onClick={() => copyCode(order.trackingCode)} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#4ade80" : C.gray500, padding: 2, display: "flex" }}>
                  {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href={`/admin/orders/${id}/receipt`} className="btn-o" style={{ padding: "10px 20px", fontSize: 13, gap: 8 }}>
              <Printer size={15} /> Receipt
            </Link>
            <button onClick={deleteOrder} disabled={deleting} style={{ padding: "10px 16px", borderRadius: 12, background: "#ef444410", border: "1px solid #ef444425", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontFamily: "'Lexend'" }}>
              <Trash2 size={15} /> {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>

        {/* Progress strip */}
        <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: "24px 32px", marginBottom: 28 }}>
          <div className="progress-strip" style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {STATUSES.map((s, i) => {
              const done = i <= currentStatusIndex;
              const active = i === currentStatusIndex;
              const sc = STATUS_COLOR[s];
              return (
                <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: done ? sc : C.navy700, border: `2px solid ${done ? sc : C.navy600}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: active ? `0 0 20px ${sc}44` : "none", transition: "all .4s" }}>
                      {done ? <CheckCircle size={17} color={C.white} /> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.navy500 }} />}
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: done ? C.white : C.gray500, letterSpacing: ".04em", textAlign: "center", whiteSpace: "nowrap" }}>{STATUS_LABEL[s]}</span>
                  </div>
                  {i < STATUSES.length - 1 && (
                    <div style={{ flex: 1, height: 3, background: C.navy700, margin: "0 4px", marginBottom: 22, borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: i < currentStatusIndex ? "100%" : "0%", height: "100%", background: `linear-gradient(90deg, ${STATUS_COLOR[STATUSES[i]]}, ${STATUS_COLOR[STATUSES[i + 1]]})`, borderRadius: 2, transition: "width .6s ease" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          <PartyCard title="SENDER" data={order.sender} />
          <PartyCard title="RECEIVER" data={order.receiver} />
        </div>

        {/* Parcel info */}
        <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, paddingBottom: 14, borderBottom: `1px solid ${C.navy700}` }}>
            <Package size={16} color={C.orange400} />
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.white, letterSpacing: ".04em" }}>PARCEL DETAILS</span>
            {chargedDisplay && (
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "#4ade80" }}>
                <DollarSign size={14} />{chargedDisplay}
              </span>
            )}
          </div>
          <div className="parcel-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <InfoRow icon={Truck} label="Delivery Mode" value={order.parcel?.deliveryMode} />
            <InfoRow icon={Package} label="Description" value={order.parcel?.packageDescription} />
            <InfoRow icon={Hash} label="Total Weight" value={order.parcel?.totalWeight} />
            <InfoRow icon={MapPin} label="Origin" value={order.parcel?.origin} />
            <InfoRow icon={MapPin} label="Destination" value={order.parcel?.destination} />
            <InfoRow icon={Calendar} label="Expected Pickup" value={order.parcel?.expectedPickupDate ? new Date(order.parcel.expectedPickupDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : undefined} />
          </div>
          {order.additionalInfo && (
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.navy700}` }}>
              <div style={{ fontSize: 10, color: C.gray500, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 6 }}>Additional Notes</div>
              <p style={{ fontSize: 14, color: C.gray300, lineHeight: 1.65 }}>{order.additionalInfo}</p>
            </div>
          )}
        </div>

        {/* Charged Price card */}
        <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${C.navy700}` }}>
            <DollarSign size={16} color={C.orange400} />
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.white, letterSpacing: ".04em" }}>CHARGED PRICE</span>
          </div>
          {priceEditing ? (
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <FormInput
                  label="Amount (₦)"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 15000"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  error={priceError}
                  leftIcon={<span style={{ fontSize: 14, color: C.gray500, fontFamily: "'Lexend'" }}>₦</span>}
                />
              </div>
              <div style={{ display: "flex", gap: 8, paddingTop: 26 }}>
                <button
                  onClick={savePrice}
                  disabled={priceSaving}
                  className="btn-p"
                  style={{ padding: "13px 20px", fontSize: 13, opacity: priceSaving ? .7 : 1 }}
                >
                  {priceSaving ? <div style={{ width: 16, height: 16, border: `2px solid #fff4`, borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> : "Save"}
                </button>
                <button
                  onClick={() => { setPriceEditing(false); setPriceError(""); setPriceInput(order.chargedPrice != null ? String(order.chargedPrice) : ""); }}
                  className="btn-o"
                  style={{ padding: "13px 20px", fontSize: 13 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                {chargedDisplay ? (
                  <span style={{ fontSize: 28, fontFamily: "'Bebas Neue'", color: "#4ade80", letterSpacing: ".02em" }}>{chargedDisplay}</span>
                ) : (
                  <span style={{ fontSize: 14, color: C.gray500, fontStyle: "italic" }}>No price set</span>
                )}
              </div>
              <button
                onClick={() => setPriceEditing(true)}
                style={{ fontSize: 13, color: C.orange400, background: `${C.orange500}10`, border: `1px solid ${C.orange500}25`, borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontFamily: "'Lexend'", fontWeight: 600, transition: "all .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${C.orange500}20`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${C.orange500}10`; }}
              >
                {chargedDisplay ? "Edit Price" : "Set Price"}
              </button>
            </div>
          )}
        </div>

        <div className="bottom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 20 }}>
          {/* Update status */}
          <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, paddingBottom: 14, borderBottom: `1px solid ${C.navy700}` }}>
              <Truck size={16} color={C.orange400} />
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.white, letterSpacing: ".04em" }}>UPDATE STATUS</span>
            </div>
            <form onSubmit={handleSubmit(onStatusSubmit)}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Controller
                  name="newStatus"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      label="New Status"
                      options={STATUS_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.newStatus?.message}
                    />
                  )}
                />
                <FormInput
                  label="Current Location *"
                  placeholder="e.g. Lagos Hub, Ibadan Checkpoint"
                  error={errors.locationName?.message}
                  {...register("locationName")}
                />
                <FormInput
                  label="Status Description"
                  placeholder={`e.g. ${STATUS_LABEL[newStatus] ?? "Update"}`}
                  {...register("locationStatus")}
                />
                <button type="submit" disabled={isSubmitting} className="btn-p" style={{ justifyContent: "center", padding: "14px 24px", marginTop: 4, opacity: isSubmitting ? .7 : 1 }}>
                  {isSubmitting
                    ? <div style={{ width: 20, height: 20, border: `2px solid #fff4`, borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                    : <><span>Update Status</span><ArrowRight size={15} /></>}
                </button>
              </div>
            </form>
          </div>

          {/* History timeline */}
          <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, paddingBottom: 14, borderBottom: `1px solid ${C.navy700}` }}>
              <Clock size={16} color={C.orange400} />
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.white, letterSpacing: ".04em" }}>HISTORY</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: C.gray500, fontWeight: 600 }}>{order.history.length} event{order.history.length !== 1 ? "s" : ""}</span>
            </div>
            {order.history.length === 0 ? (
              <p style={{ color: C.gray500, fontSize: 14, textAlign: "center", padding: "20px 0" }}>No history yet</p>
            ) : (
              <div style={{ overflowY: "auto", maxHeight: 320 }}>
                {[...order.history].reverse().map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: i === 0 ? C.orange500 : C.navy700, border: `2px solid ${i === 0 ? C.orange500 : C.navy600}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: i === 0 ? `0 0 14px ${C.orange500}44` : "none" }}>
                        {i === 0 ? <CheckCircle size={14} color={C.white} /> : <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.navy500 }} />}
                      </div>
                      {i < order.history.length - 1 && <div style={{ width: 2, height: 40, background: C.navy700, margin: "3px 0" }} />}
                    </div>
                    <div style={{ paddingBottom: i < order.history.length - 1 ? 16 : 0, paddingTop: 2 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? C.white : C.gray400 }}>{h.locationStatus}</div>
                      <div style={{ fontSize: 12, color: C.gray500, marginTop: 2 }}>{h.locationName}</div>
                      <div style={{ fontSize: 11, color: C.navy500, marginTop: 3 }}>{new Date(h.updatedAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer meta */}
        <div style={{ display: "flex", gap: 20, marginTop: 24, padding: "18px 24px", background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar size={14} color={C.gray500} />
            <span style={{ fontSize: 12, color: C.gray500 }}>Created: {new Date(order.createdAt).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={14} color={C.gray500} />
            <span style={{ fontSize: 12, color: C.gray500 }}>Last updated: {new Date(order.updatedAt).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .detail-grid,.bottom-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:768px){ .parcel-grid{ grid-template-columns:1fr 1fr !important; } }
        @media(max-width:480px){ .parcel-grid{ grid-template-columns:1fr !important; } .progress-strip{ flex-direction:column; align-items:flex-start; gap:8px !important; } }
      `}</style>
    </AdminShell>
  );
}
