"use client";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/ui/form-fields";
import { C } from "../../_lib/tokens";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
type FormData = z.infer<typeof schema>;

export default function LoginClient() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me").then(res => {
      if (res.ok) router.replace("/admin/dashboard");
    });
  }, [router]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) { setServerError(result.error ?? "Login failed"); return; }
      router.push("/admin/dashboard");
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.navy950, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      {/* Background glows */}
      <div style={{ position: "absolute", top: -200, left: -200, width: 600, height: 600, background: `radial-gradient(circle, ${C.orange500}08 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -200, right: -200, width: 600, height: 600, background: `radial-gradient(circle, ${C.orange600}06 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, opacity: .02, backgroundImage: `linear-gradient(${C.white} 1px, transparent 1px), linear-gradient(90deg, ${C.white} 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 440, animation: "fadeUp .6s ease both" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 70, height: 70, borderRadius: 22, background: `${C.orange500}12`, border: `1px solid ${C.orange500}28`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <Package size={32} color={C.orange400} />
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: C.white, letterSpacing: ".04em", marginBottom: 6 }}>SOSASA ADMIN</h1>
          <p style={{ color: C.gray500, fontSize: 14 }}>Sign in to manage shipments</p>
        </div>

        {/* Card */}
        <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: 40 }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {serverError && (
              <div style={{ background: "#ef444410", border: "1px solid #ef444430", borderRadius: 12, padding: "13px 16px", color: "#ef4444", fontSize: 13, fontWeight: 500 }}>
                {serverError}
              </div>
            )}

            <FormInput
              label="Email Address"
              type="email"
              placeholder="admin@sosasa.ng"
              autoComplete="email"
              error={errors.email?.message}
              leftIcon={<Mail size={16} color={C.gray500} />}
              style={{ padding: "15px 16px 15px 44px", borderWidth: "2px", borderRadius: 14 }}
              {...register("email")}
            />

            <FormInput
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              leftIcon={<Lock size={16} color={C.gray500} />}
              rightIcon={
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ background: "none", border: "none", color: C.gray500, cursor: "pointer", padding: 2, display: "flex" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              style={{ padding: "15px 44px", borderWidth: "2px", borderRadius: 14 }}
              {...register("password")}
            />

            <button type="submit" disabled={isSubmitting} className="btn-p" style={{ justifyContent: "center", padding: "17px 24px", marginTop: 4, opacity: isSubmitting ? .7 : 1 }}>
              {isSubmitting
                ? <div style={{ width: 20, height: 20, border: `2px solid #fff4`, borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                : <><span>Sign In</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: C.gray500 }}>
            No account yet?{" "}
            <Link href="/admin/register" style={{ color: C.orange400, fontWeight: 600, textDecoration: "none" }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
