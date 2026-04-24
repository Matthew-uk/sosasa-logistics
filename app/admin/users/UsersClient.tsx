"use client";
import { Mail, Shield, Trash2, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "../_components/AdminShell";
import { C } from "../../_lib/tokens";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function UsersClient() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/users");
    const data = await res.json();
    if (res.ok) setUsers(data.users ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remove admin "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    setError("");
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Failed to delete user"); }
    else { setUsers((prev) => prev.filter((u) => u._id !== id)); }
    setDeletingId(null);
  }

  return (
    <AdminShell>
      <div style={{ animation: "fadeIn .4s ease" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: C.white, letterSpacing: ".03em", lineHeight: 1 }}>ADMIN USERS</h1>
            <p style={{ color: C.gray500, fontSize: 14, marginTop: 6 }}>{users.length} admin account{users.length !== 1 ? "s" : ""}</p>
          </div>
          <Link href="/admin/register" className="btn-p" style={{ padding: "12px 24px", fontSize: 14 }}>
            <UserPlus size={16} /> Add Admin
          </Link>
        </div>

        {error && (
          <div style={{ background: "#ef444410", border: "1px solid #ef444430", borderRadius: 14, padding: "14px 20px", color: "#ef4444", fontSize: 14, marginBottom: 24 }}>
            {error}
          </div>
        )}

        <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, overflow: "hidden" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px 100px 48px", gap: 12, padding: "14px 28px", borderBottom: `1px solid ${C.navy600}` }}>
            {["Name", "Email", "Role", "Joined", ""].map((h, i) => (
              <span key={i} style={{ fontSize: 11, color: C.gray500, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: 60, textAlign: "center" }}>
              <div style={{ width: 36, height: 36, border: `3px solid ${C.navy600}`, borderTopColor: C.orange500, borderRadius: "50%", animation: "spin .8s linear infinite", margin: "0 auto" }} />
            </div>
          ) : users.length === 0 ? (
            <div style={{ padding: "60px 28px", textAlign: "center" }}>
              <Users size={48} color={C.navy600} style={{ marginBottom: 16 }} />
              <p style={{ color: C.gray500, fontSize: 15 }}>No admin users found</p>
            </div>
          ) : (
            users.map((u, i) => (
              <div
                key={u._id}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px 100px 48px", gap: 12, padding: "18px 28px", borderBottom: i < users.length - 1 ? `1px solid ${C.navy700}` : "none", alignItems: "center" }}
              >
                {/* Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${C.orange600}, ${C.orange500})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Bebas Neue'", fontSize: 15, color: C.white, letterSpacing: ".04em" }}>
                    {u.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.white }}>{u.name}</span>
                </div>

                {/* Email */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                  <Mail size={13} color={C.gray500} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: C.gray400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</span>
                </div>

                {/* Role */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Shield size={13} color={C.orange400} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.orange300, background: `${C.orange500}15`, border: `1px solid ${C.orange500}25`, padding: "3px 10px", borderRadius: 100, textTransform: "uppercase", letterSpacing: ".06em" }}>{u.role}</span>
                </div>

                {/* Joined */}
                <span style={{ fontSize: 12, color: C.gray500 }}>{fmt(u.createdAt)}</span>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(u._id, u.name)}
                  disabled={deletingId === u._id}
                  title="Remove admin"
                  style={{ width: 34, height: 34, borderRadius: 9, background: "#ef444408", border: "1px solid #ef444420", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", opacity: deletingId === u._id ? 0.5 : 1 }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#ef444418"; e.currentTarget.style.borderColor = "#ef444440"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#ef444408"; e.currentTarget.style.borderColor = "#ef444420"; }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: 20, padding: "14px 20px", background: `${C.orange500}08`, border: `1px solid ${C.orange500}18`, borderRadius: 14 }}>
          <p style={{ fontSize: 13, color: C.gray400 }}>
            <strong style={{ color: C.orange300 }}>Note:</strong> All users listed here have full admin access. To add a new admin, use the Register page. You cannot delete your own account.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
