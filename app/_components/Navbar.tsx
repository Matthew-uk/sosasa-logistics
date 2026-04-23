"use client";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavLink } from "../_lib/types";
import { C } from "../_lib/tokens";
import Logo from "./Logo";

const LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/track", label: "Track" },
  { href: "/contact", label: "Contact" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className="glass"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? "10px 0" : "18px 0",
          borderBottom: `1px solid ${scrolled ? C.navy600 + "66" : "transparent"}`,
          transition: "all .4s ease",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "inline-flex" }}><Logo size="small" /></Link>

          <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {LINKS.map((l) => {
              const active = isActive(l.href, pathname);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    background: active ? `${C.orange500}14` : "transparent",
                    color: active ? C.orange400 : C.gray300,
                    padding: "9px 20px", borderRadius: 10,
                    fontFamily: "'Lexend'", fontSize: 13.5, fontWeight: 500, transition: "all .3s",
                    textDecoration: "none", position: "relative",
                  }}
                >
                  {l.label}
                  {active && (
                    <span style={{ position: "absolute", bottom: 3, left: "32%", right: "32%", height: 2, background: C.orange500, borderRadius: 1 }} />
                  )}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-p" style={{ padding: "10px 26px", fontSize: 13, marginLeft: 12 }}>
              Get a Quote <ArrowRight size={14} />
            </Link>
          </div>

          <button
            className="mob-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ display: "none", background: "none", border: "none", color: C.white, cursor: "pointer", padding: 8, alignItems: "center", justifyContent: "center" }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="glass" style={{ position: "fixed", top: 68, left: 0, right: 0, bottom: 0, zIndex: 999, padding: "36px 28px", animation: "fadeIn .3s", overflowY: "auto" }}>
          {LINKS.map((l, i) => {
            const active = isActive(l.href, pathname);
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: active ? `${C.orange500}14` : "transparent",
                  color: active ? C.orange400 : C.white,
                  padding: "18px 24px", borderRadius: 14,
                  fontFamily: "'Lexend'", fontSize: 20, fontWeight: 700, marginBottom: 4,
                  textDecoration: "none",
                  animation: `fadeUp .4s ease ${i * .06}s both`,
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
