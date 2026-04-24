"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { C } from "../../_lib/tokens";

interface AdminUser { name: string; email: string }

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setUser(d.user);
        else router.replace("/admin/login");
      })
      .catch(() => router.replace("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.navy950 }}>
        <div style={{ width: 42, height: 42, border: `3px solid ${C.navy600}`, borderTopColor: C.orange500, borderRadius: "50%", animation: "spin .8s linear infinite" }} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar user={user} />
      <main style={{ flex: 1, overflowY: "auto", minHeight: "100vh" }}>
        <div style={{ padding: "36px 36px 60px", maxWidth: 1200 }}>
          {children}
        </div>
      </main>
    </div>
  );
}
