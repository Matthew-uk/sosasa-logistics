"use client";
import { ArrowRight, ChevronLeft, DollarSign, Hash, Package, ToggleLeft, ToggleRight, Truck, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AdminShell from "../../_components/AdminShell";
import { FormInput, FormSelect } from "@/components/ui/form-fields";
import { C } from "../../../_lib/tokens";

const DELIVERY_MODES = [
  { value: "Same-Day Express", label: "Same-Day Express" },
  { value: "Interstate Standard", label: "Interstate Standard" },
  { value: "Interstate Express", label: "Interstate Express" },
  { value: "Business Solutions", label: "Business Solutions" },
  { value: "Custom", label: "Custom" },
];
const ORIGINS = [
  "Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan",
  "Benin City", "Kaduna", "Enugu", "Onitsha", "Other",
].map((o) => ({ value: o, label: o }));

const partySchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
});

const schema = z.object({
  codeMode: z.enum(["auto", "manual"]),
  manualCode: z.string(),
  manualTrackingCode: z.string(),
  sender: partySchema,
  receiver: partySchema,
  parcel: z.object({
    deliveryMode: z.string(),
    totalWeight: z.string(),
    origin: z.string(),
    destination: z.string(),
    expectedPickupDate: z.string(),
    packageDescription: z.string(),
  }),
  additionalInfo: z.string(),
  chargedPrice: z.string(),
}).superRefine((data, ctx) => {
  if (!data.sender.name.trim()) ctx.addIssue({ code: "custom", path: ["sender", "name"], message: "Sender name is required" });
  if (!data.receiver.name.trim()) ctx.addIssue({ code: "custom", path: ["receiver", "name"], message: "Receiver name is required" });
  if (!data.parcel.origin.trim()) ctx.addIssue({ code: "custom", path: ["parcel", "origin"], message: "Origin is required" });
  if (!data.parcel.destination.trim()) ctx.addIssue({ code: "custom", path: ["parcel", "destination"], message: "Destination is required" });
  if (data.codeMode === "manual") {
    if (!data.manualCode.trim()) ctx.addIssue({ code: "custom", path: ["manualCode"], message: "Number code is required" });
    if (!data.manualTrackingCode.toUpperCase().startsWith("SOS")) ctx.addIssue({ code: "custom", path: ["manualTrackingCode"], message: "Must start with SOS" });
  }
  if (data.chargedPrice && isNaN(Number(data.chargedPrice))) {
    ctx.addIssue({ code: "custom", path: ["chargedPrice"], message: "Must be a valid number" });
  }
});

type FormData = z.infer<typeof schema>;

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 32, marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, paddingBottom: 18, borderBottom: `1px solid ${C.navy700}` }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: `${C.orange500}10`, border: `1px solid ${C.orange500}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={17} color={C.orange400} />
        </div>
        <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white, letterSpacing: ".04em" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

const inp: React.CSSProperties = { width: "100%", padding: "13px 16px", background: C.navy900, border: `1.5px solid ${C.navy600}`, borderRadius: 12, color: C.white, fontSize: 14, fontFamily: "'Lexend'", transition: "all .3s" };

export default function NewOrderClient() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, control, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      codeMode: "auto",
      manualCode: "",
      manualTrackingCode: "SOS",
      sender: { name: "", email: "", phone: "", address: "" },
      receiver: { name: "", email: "", phone: "", address: "" },
      parcel: { deliveryMode: "", totalWeight: "", origin: "", destination: "", expectedPickupDate: "", packageDescription: "" },
      additionalInfo: "",
      chargedPrice: "",
    },
  });

  const codeMode = watch("codeMode");

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          chargedPrice: data.chargedPrice ? Number(data.chargedPrice) : undefined,
        }),
      });
      const result = await res.json();
      if (!res.ok) { setServerError(result.error ?? "Failed to create order"); return; }
      router.push(`/admin/orders/${result.order._id}`);
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  return (
    <AdminShell>
      <div style={{ animation: "fadeIn .4s ease", maxWidth: 860 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <Link href="/admin/orders" style={{ width: 40, height: 40, borderRadius: 12, background: C.navy800, border: `1px solid ${C.navy600}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.gray400, textDecoration: "none", flexShrink: 0 }}>
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 34, color: C.white, letterSpacing: ".03em", lineHeight: 1 }}>NEW ORDER</h1>
            <p style={{ color: C.gray500, fontSize: 14, marginTop: 4 }}>Create a new shipment record</p>
          </div>
        </div>

        {serverError && (
          <div style={{ background: "#ef444410", border: "1px solid #ef444430", borderRadius: 14, padding: "14px 20px", color: "#ef4444", fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Code Mode */}
          <SectionCard title="TRACKING CODE" icon={Hash}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, padding: "14px 18px", background: C.navy900, borderRadius: 14, border: `1px solid ${C.navy600}`, cursor: "pointer" }}
              onClick={() => setValue("codeMode", codeMode === "auto" ? "manual" : "auto")}
            >
              {codeMode === "auto" ? <ToggleLeft size={26} color={C.orange400} /> : <ToggleRight size={26} color={C.orange400} />}
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{codeMode === "auto" ? "Auto-generate codes" : "Enter codes manually"}</div>
                <div style={{ fontSize: 12, color: C.gray500, marginTop: 2 }}>
                  {codeMode === "auto" ? "System assigns number code and SOS tracking code" : "You enter both the number code and the SOS tracking code"}
                </div>
              </div>
            </div>

            {codeMode === "manual" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <FormInput
                  label="Number Code (e.g. 1090)"
                  placeholder="e.g. 1090"
                  error={errors.manualCode?.message}
                  {...register("manualCode")}
                />
                <FormInput
                  label="Tracking Code (must start with SOS)"
                  placeholder="SOSXXXXXXX"
                  style={{ fontFamily: "monospace", letterSpacing: ".06em" }}
                  error={errors.manualTrackingCode?.message}
                  {...register("manualTrackingCode", {
                    onChange: (e) => {
                      const v = e.target.value.toUpperCase();
                      if (v.startsWith("SOS")) setValue("manualTrackingCode", v);
                      else if (v.length < 3) setValue("manualTrackingCode", "SOS");
                    },
                  })}
                />
              </div>
            )}
            {codeMode === "auto" && (
              <div style={{ padding: "12px 16px", background: `${C.orange500}08`, border: `1px solid ${C.orange500}15`, borderRadius: 12 }}>
                <p style={{ fontSize: 13, color: C.gray400 }}>A sequential number code and a unique <span style={{ color: C.orange400, fontWeight: 700 }}>SOS…</span> tracking code will be auto-generated on save.</p>
              </div>
            )}
          </SectionCard>

          {/* Sender */}
          <SectionCard title="SENDER INFORMATION" icon={User}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <FormInput label="Full Name" placeholder="Sender name" error={errors.sender?.name?.message} {...register("sender.name")} />
              <FormInput label="Phone Number" placeholder="+234 800 000 0000" {...register("sender.phone")} />
              <FormInput label="Email Address" type="email" placeholder="email@example.com" {...register("sender.email")} />
              <FormInput label="Address" placeholder="Full address" {...register("sender.address")} />
            </div>
          </SectionCard>

          {/* Receiver */}
          <SectionCard title="RECEIVER INFORMATION" icon={User}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <FormInput label="Full Name" placeholder="Receiver name" error={errors.receiver?.name?.message} {...register("receiver.name")} />
              <FormInput label="Phone Number" placeholder="+234 800 000 0000" {...register("receiver.phone")} />
              <FormInput label="Email Address" type="email" placeholder="email@example.com" {...register("receiver.email")} />
              <FormInput label="Address" placeholder="Full address" {...register("receiver.address")} />
            </div>
          </SectionCard>

          {/* Parcel */}
          <SectionCard title="PARCEL DETAILS" icon={Package}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Controller
                name="parcel.deliveryMode"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Delivery Mode"
                    options={DELIVERY_MODES}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select mode…"
                  />
                )}
              />
              <FormInput label="Total Weight" placeholder="e.g. 2.5 kg" {...register("parcel.totalWeight")} />
              <Controller
                name="parcel.origin"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Origin"
                    options={ORIGINS}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select origin…"
                    error={errors.parcel?.origin?.message}
                  />
                )}
              />
              <FormInput
                label="Destination"
                placeholder="Destination city / address"
                error={errors.parcel?.destination?.message}
                {...register("parcel.destination")}
              />
              <FormInput
                label="Expected Pickup Date"
                type="date"
                style={{ colorScheme: "dark" }}
                {...register("parcel.expectedPickupDate")}
              />
              <FormInput label="Package Description" placeholder="Brief description of contents" {...register("parcel.packageDescription")} />
            </div>
          </SectionCard>

          {/* Pricing */}
          <SectionCard title="PRICING" icon={DollarSign}>
            <FormInput
              label="Charged Price (₦) — Optional"
              placeholder="e.g. 15000"
              type="number"
              min="0"
              step="any"
              error={errors.chargedPrice?.message}
              leftIcon={<span style={{ fontSize: 14, color: C.gray500, fontFamily: "'Lexend'" }}>₦</span>}
              {...register("chargedPrice")}
            />
            <p style={{ fontSize: 12, color: C.gray500, marginTop: 8 }}>Leave blank if price hasn't been determined yet.</p>
          </SectionCard>

          {/* Additional info */}
          <SectionCard title="ADDITIONAL NOTES" icon={Truck}>
            <div>
              <label style={{ fontSize: 11, color: C.gray400, marginBottom: 7, display: "block", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>Notes / Special Instructions</label>
              <textarea
                placeholder="Any special handling notes, fragile items, etc."
                rows={4}
                style={{ ...inp, resize: "vertical" }}
                {...register("additionalInfo")}
              />
            </div>
          </SectionCard>

          {/* Submit */}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <Link href="/admin/orders" className="btn-o" style={{ padding: "14px 28px" }}>Cancel</Link>
            <button type="submit" disabled={isSubmitting} className="btn-p" style={{ padding: "14px 36px", opacity: isSubmitting ? .7 : 1 }}>
              {isSubmitting
                ? <div style={{ width: 20, height: 20, border: `2px solid #fff4`, borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                : <><span>Create Order</span><ArrowRight size={16} /></>}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media(max-width:640px){
          form > div > div > div[style*="1fr 1fr"]{ grid-template-columns:1fr !important; }
        }
      `}</style>
    </AdminShell>
  );
}
