"use client";
import { CheckCircle, Save, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AdminShell from "../_components/AdminShell";
import { FormInput, FormSelect } from "@/components/ui/form-fields";
import { C } from "../../_lib/tokens";

const DELIVERY_MODES = [
  { value: "", label: "None (no default)" },
  { value: "Same-Day Express", label: "Same-Day Express" },
  { value: "Interstate Standard", label: "Interstate Standard" },
  { value: "Interstate Express", label: "Interstate Express" },
  { value: "Business Solutions", label: "Business Solutions" },
  { value: "Custom", label: "Custom" },
];

const schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyEmail: z.string().email("Invalid email"),
  companyPhone: z.string().min(1, "Phone is required"),
  companyAddress: z.string().min(1, "Address is required"),
  website: z.string().min(1, "Website is required"),
  defaultDeliveryMode: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function SettingsClient() {
  const [saved, setSaved] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "", companyEmail: "", companyPhone: "",
      companyAddress: "", website: "", defaultDeliveryMode: "",
    },
  });

  const deliveryMode = watch("defaultDeliveryMode");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(({ settings }) => {
        if (settings) {
          setValue("companyName", settings.companyName ?? "");
          setValue("companyEmail", settings.companyEmail ?? "");
          setValue("companyPhone", settings.companyPhone ?? "");
          setValue("companyAddress", settings.companyAddress ?? "");
          setValue("website", settings.website ?? "");
          setValue("defaultDeliveryMode", settings.defaultDeliveryMode ?? "");
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [setValue]);

  async function onSubmit(data: FormData) {
    setServerError("");
    setSaved(false);
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) { setServerError(result.error ?? "Failed to save"); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <AdminShell>
      <div style={{ animation: "fadeIn .4s ease", maxWidth: 680 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: `${C.orange500}10`, border: `1px solid ${C.orange500}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Settings size={20} color={C.orange400} />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: C.white, letterSpacing: ".03em", lineHeight: 1 }}>SETTINGS</h1>
            <p style={{ color: C.gray500, fontSize: 14, marginTop: 4 }}>Configure your company information</p>
          </div>
        </div>

        {serverError && (
          <div style={{ background: "#ef444410", border: "1px solid #ef444430", borderRadius: 14, padding: "14px 20px", color: "#ef4444", fontSize: 14, marginBottom: 24 }}>
            {serverError}
          </div>
        )}

        {saved && (
          <div style={{ background: "#4ade8012", border: "1px solid #4ade8030", borderRadius: 14, padding: "14px 20px", color: "#4ade80", fontSize: 14, fontWeight: 500, marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={16} /> Settings saved successfully
          </div>
        )}

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <div style={{ width: 36, height: 36, border: `3px solid ${C.navy600}`, borderTopColor: C.orange500, borderRadius: "50%", animation: "spin .8s linear infinite" }} />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 32, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, paddingBottom: 16, borderBottom: `1px solid ${C.navy700}` }}>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white, letterSpacing: ".04em" }}>COMPANY INFORMATION</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <FormInput
                  label="Company Name"
                  placeholder="Sosasa Logistics"
                  error={errors.companyName?.message}
                  {...register("companyName")}
                />
                <FormInput
                  label="Company Email"
                  type="email"
                  placeholder="hello@sosasa.ng"
                  error={errors.companyEmail?.message}
                  {...register("companyEmail")}
                />
                <FormInput
                  label="Phone Number"
                  placeholder="+234 (0) 800 SOSASA"
                  error={errors.companyPhone?.message}
                  {...register("companyPhone")}
                />
                <FormInput
                  label="Website"
                  placeholder="www.sosasa.ng"
                  error={errors.website?.message}
                  {...register("website")}
                />
                <div style={{ gridColumn: "1 / -1" }}>
                  <FormInput
                    label="Company Address"
                    placeholder="Victoria Island, Lagos, Nigeria"
                    error={errors.companyAddress?.message}
                    {...register("companyAddress")}
                  />
                </div>
              </div>
            </div>

            <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 20, padding: 32, marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, paddingBottom: 16, borderBottom: `1px solid ${C.navy700}` }}>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white, letterSpacing: ".04em" }}>ORDER DEFAULTS</span>
              </div>
              <FormSelect
                label="Default Delivery Mode"
                options={DELIVERY_MODES}
                value={deliveryMode}
                onChange={(v) => setValue("defaultDeliveryMode", v, { shouldValidate: true })}
                placeholder="Select default mode…"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" disabled={isSubmitting} className="btn-p" style={{ padding: "14px 36px", opacity: isSubmitting ? .7 : 1 }}>
                {isSubmitting
                  ? <div style={{ width: 20, height: 20, border: `2px solid #fff4`, borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                  : <><Save size={16} /><span>Save Settings</span></>}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminShell>
  );
}
