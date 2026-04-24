"use client";
import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Section from "../../_components/Section";
import SubPageHero from "../../_components/SubPageHero";
import { FormInput, FormSelect } from "@/components/ui/form-fields";
import { IMG } from "../../_lib/images";
import { C } from "../../_lib/tokens";

const SERVICES = [
  { value: "Same-Day Express", label: "Same-Day Express" },
  { value: "Interstate Logistics", label: "Interstate Logistics" },
  { value: "Business Solutions", label: "Business Solutions" },
  { value: "Custom Quote", label: "Custom Quote" },
];

const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

const inp: React.CSSProperties = { width: "100%", padding: 16, background: C.navy900, borderWidth: "2px", borderRadius: 14, color: C.white, fontSize: 14, fontFamily: "'Lexend'", resize: "vertical", transition: "all .3s", outline: "none" };

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(_data: FormData) {
    // TODO: wire to a backend contact API when available
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  }

  return (
    <div style={{ animation: "fadeIn .5s" }}>
      <SubPageHero
        label="Contact Us"
        title={<>LET&apos;S <span className="tg">TALK</span> LOGISTICS</>}
        subtitle="Have a question, need a quote, or ready to get started? We're here to help."
        image={IMG.cityNight}
      />

      <Section>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 36 }}>
          <div className="anim">
            <div style={{ borderRadius: 24, overflow: "hidden", marginBottom: 20, height: 200, position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.map} alt="Our locations" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy800}, transparent)` }} />
              <p style={{ position: "absolute", bottom: 16, left: 20, fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white, letterSpacing: ".03em" }}>OUR LOCATIONS</p>
            </div>
            <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: 36, display: "flex", flexDirection: "column", gap: 28 }}>
              {([
                { icon: Phone, label: "Phone", value: "+234 (0) 800 SOSASA", sub: "24/7" },
                { icon: Mail, label: "Email", value: "hello@sosasa.ng", sub: "2hr response" },
                { icon: MapPin, label: "Head Office", value: "Victoria Island, Lagos", sub: "Nigeria" },
                { icon: Clock, label: "Hours", value: "24/7 Operations", sub: "Including holidays" },
              ] as const).map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `${C.orange500}10`, border: `1px solid ${C.orange500}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <c.icon size={20} color={C.orange400} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: C.gray500, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>{c.label}</p>
                    <p style={{ fontWeight: 700, fontSize: 15, color: C.white, marginTop: 2 }}>{c.value}</p>
                    <p style={{ fontSize: 12, color: C.gray500, marginTop: 1 }}>{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="anim">
            <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: 44 }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "60px 20px", animation: "scaleIn .5s ease" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#4ade8018", border: "2px solid #4ade8033", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                    <CheckCircle size={36} color="#4ade80" />
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: C.white, marginBottom: 12 }}>MESSAGE SENT!</h3>
                  <p style={{ color: C.gray400, fontSize: 15 }}>We&apos;ll get back to you within 2 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: C.white, letterSpacing: ".02em", marginBottom: 36 }}>SEND US A MESSAGE</h3>
                  <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <FormInput
                        label="Full Name"
                        placeholder="Full Name"
                        error={errors.fullName?.message}
                        style={{ padding: 16, borderWidth: "2px", borderRadius: 14 }}
                        {...register("fullName")}
                      />
                      <FormInput
                        label="Phone Number"
                        placeholder="Phone Number"
                        error={errors.phone?.message}
                        style={{ padding: 16, borderWidth: "2px", borderRadius: 14 }}
                        {...register("phone")}
                      />
                    </div>

                    <FormInput
                      label="Email Address"
                      type="email"
                      placeholder="you@company.com"
                      error={errors.email?.message}
                      style={{ padding: 16, borderWidth: "2px", borderRadius: 14 }}
                      {...register("email")}
                    />

                    <Controller
                      name="service"
                      control={control}
                      render={({ field }) => (
                        <FormSelect
                          label="Service"
                          options={SERVICES}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          placeholder="Select a service"
                          error={errors.service?.message}
                        />
                      )}
                    />

                    <div>
                      <label style={{ fontSize: 12, color: C.gray400, marginBottom: 8, display: "block", fontWeight: 600, letterSpacing: ".04em" }}>Message</label>
                      <textarea
                        placeholder="Tell us about your logistics needs..."
                        rows={4}
                        style={inp}
                        {...register("message")}
                      />
                      {errors.message && <span style={{ fontSize: 12, color: "#ef4444", marginTop: 5, display: "block" }}>{errors.message.message}</span>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-p" style={{ width: "100%", padding: 18, justifyContent: "center", fontSize: 15, opacity: isSubmitting ? .7 : 1 }}>
                      {isSubmitting
                        ? <div style={{ width: 20, height: 20, border: `2px solid #fff4`, borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                        : <><span>Send Message</span><Send size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){ .contact-grid{ grid-template-columns:1fr !important; } }`}</style>
      </Section>
    </div>
  );
}
