"use client";
import {
  BarChart3, Box, ChevronLeft, ChevronRight,
  LayoutDashboard, LogOut, Menu, Package,
  PlusCircle, Settings, Users, X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { C } from "../../_lib/tokens";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Orders",
    items: [
      { href: "/admin/orders", label: "All Orders", icon: Box },
      { href: "/admin/orders/new", label: "New Order", icon: PlusCircle },
    ],
  },
  {
    label: "Management",
    items: [
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

function isActive(href: string, pathname: string) {
  if (href === "/admin/orders/new") return pathname === href;
  if (href === "/admin/orders")
    return pathname === "/admin/orders" ||
      (pathname.startsWith("/admin/orders/") && pathname !== "/admin/orders/new");
  return pathname === href || pathname.startsWith(href + "/");
}

export default function AdminSidebar({ user }: { user: { name: string; email: string } }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const W = collapsed ? 72 : 264;

  const sidebarContent = (
    <div
      style={{
        height: "100vh",
        width: W,
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(180deg, ${C.navy900} 0%, ${C.navy950} 100%)`,
        borderRight: `1px solid ${C.navy600}`,
        transition: "width .3s cubic-bezier(.16,1,.3,1)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle top accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${C.orange500}, ${C.orange400}55, transparent)`, flexShrink: 0 }} />

      {/* Header */}
      <div
        style={{
          padding: collapsed ? "18px 0" : "22px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          borderBottom: `1px solid ${C.navy700}`,
          flexShrink: 0,
          minHeight: 72,
        }}
      >
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${C.orange500}, ${C.orange600})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Package size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white, letterSpacing: ".06em", lineHeight: 1 }}>SOSASA</div>
              <div style={{ fontSize: 9, color: C.orange400, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginTop: 1 }}>Admin Console</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: `linear-gradient(135deg, ${C.orange500}, ${C.orange600})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Package size={18} color="#fff" />
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      {/* <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute",
          top: 58,
          right: -12,
          width: 24, height: 24,
          borderRadius: "50%",
          background: C.navy800,
          border: `1px solid ${C.navy600}`,
          color: C.gray400,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10,
          transition: "all .2s",
          flexShrink: 0,
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button> */}

      {/* Nav */}
      <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 24, overflowY: "auto", overflowX: "hidden" }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <div
                style={{
                  fontSize: 10, fontWeight: 700, color: C.navy500,
                  letterSpacing: ".12em", textTransform: "uppercase",
                  padding: "0 8px", marginBottom: 6,
                }}
              >
                {section.label}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {section.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(href, pathname);
                return (
                  <Link
                    key={href}
                    href={href}
                    title={collapsed ? label : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: collapsed ? "11px 0" : "11px 14px",
                      justifyContent: collapsed ? "center" : "flex-start",
                      borderRadius: 12,
                      background: active ? `${C.orange500}18` : "transparent",
                      color: active ? C.orange300 : C.gray400,
                      textDecoration: "none",
                      fontFamily: "'Lexend'",
                      fontSize: 13.5,
                      fontWeight: active ? 600 : 400,
                      transition: "all .2s",
                      whiteSpace: "nowrap",
                      border: active ? `1px solid ${C.orange500}28` : "1px solid transparent",
                      position: "relative",
                    }}
                  >
                    {active && (
                      <span
                        style={{
                          position: "absolute",
                          left: 0, top: "20%", bottom: "20%",
                          width: 3, borderRadius: "0 3px 3px 0",
                          background: C.orange500,
                        }}
                      />
                    )}
                    <Icon size={17} style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }} />
                    {!collapsed && label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: C.navy700, margin: "0 16px", flexShrink: 0 }} />

      {/* User + logout */}
      <div style={{ padding: collapsed ? "16px 10px" : "16px 14px", flexShrink: 0 }}>
        {!collapsed && (
          <div
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px", borderRadius: 12,
              background: C.navy800, border: `1px solid ${C.navy700}`,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: `linear-gradient(135deg, ${C.orange600}, ${C.orange500})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Bebas Neue'", fontSize: 15, color: C.white, letterSpacing: ".05em",
              }}
            >
              {initials}
            </div>
            <div style={{ overflow: "hidden", minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.white, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ fontSize: 11, color: C.gray500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 }}>{user.email}</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div
            title={user.name}
            style={{
              width: 36, height: 36, borderRadius: 10, margin: "0 auto 10px",
              background: `linear-gradient(135deg, ${C.orange600}, ${C.orange500})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Bebas Neue'", fontSize: 15, color: C.white, letterSpacing: ".05em",
              cursor: "default",
            }}
          >
            {initials}
          </div>
        )}
        <button
          onClick={logout}
          title={collapsed ? "Sign Out" : undefined}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%", background: "none",
            border: `1px solid ${C.navy600}`,
            borderRadius: 10,
            padding: collapsed ? "10px 0" : "10px 14px",
            color: C.gray400, cursor: "pointer",
            fontFamily: "'Lexend'", fontSize: 13,
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.borderColor = "#f8717130";
            e.currentTarget.style.background = "#f8717108";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = C.gray400;
            e.currentTarget.style.borderColor = C.navy600;
            e.currentTarget.style.background = "none";
          }}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="admin-sidebar-desktop" style={{ position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
        {sidebarContent}
      </div>

      {/* Mobile hamburger */}
      <button
        className="admin-mob-btn"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        style={{
          display: "none", position: "fixed", top: 16, right: 16, zIndex: 1100,
          background: C.navy800, border: `1px solid ${C.navy600}`,
          borderRadius: 10, padding: 10, color: C.white, cursor: "pointer",
        }}
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1099, display: "flex" }}>
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(4,8,16,.9)", backdropFilter: "blur(4px)" }}
          />
          <div style={{ position: "relative", zIndex: 1, height: "100%", animation: "slideIn .25s ease" }}>
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: "absolute", top: 16, right: -44, zIndex: 2,
                background: C.navy800, border: `1px solid ${C.navy600}`,
                borderRadius: 10, padding: 8, color: C.white, cursor: "pointer",
                display: "flex",
              }}
            >
              <X size={18} />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @media(max-width:768px){
          .admin-sidebar-desktop{ display:none !important; }
          .admin-mob-btn{ display:flex !important; }
        }
        nav a:hover { background: ${C.navy700}55 !important; color: ${C.gray200} !important; }
        nav a:hover svg { opacity: 1 !important; }
      `}</style>
    </>
  );
}
