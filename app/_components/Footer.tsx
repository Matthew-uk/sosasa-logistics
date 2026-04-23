import Link from "next/link";
import { C } from "../_lib/tokens";
import Logo from "./Logo";

type Col = { t: string; links: { label: string; href?: string }[] };

const COLS: Col[] = [
  {
    t: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Gallery", href: "/gallery" },
      { label: "Track", href: "/track" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    t: "Services",
    links: [
      { label: "Same-Day Express", href: "/services" },
      { label: "Interstate", href: "/services" },
      { label: "Business Solutions", href: "/services" },
      { label: "Insured Shipping", href: "/services" },
    ],
  },
  {
    t: "Coverage",
    links: [
      { label: "Lagos" },
      { label: "Abuja" },
      { label: "Port Harcourt" },
      { label: "Nationwide" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: C.navy900, borderTop: `1px solid ${C.navy700}`, padding: "68px 28px 36px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 48, marginBottom: 52 }}>
          <div>
            <Logo />
            <p style={{ color: C.gray500, fontSize: 14, lineHeight: 1.75, marginTop: 22, maxWidth: 280 }}>
              Nigeria's trusted logistics partner. Speed, reliability, and peace of mind across 36 states.
            </p>
          </div>
          {COLS.map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.white, marginBottom: 22, letterSpacing: ".1em" }}>{col.t}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {col.links.map(({ label, href }, j) =>
                  href ? (
                    <Link key={j} href={href} className="footer-link" style={{ color: C.gray500, fontSize: 14, textDecoration: "none", transition: "color .2s" }}>
                      {label}
                    </Link>
                  ) : (
                    <span key={j} style={{ color: C.gray500, fontSize: 14 }}>{label}</span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.navy700}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ color: C.gray500, fontSize: 12 }}>© 2026 SOSASA Logistics Services Limited. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <span key={t} style={{ color: C.gray500, fontSize: 12, cursor: "pointer" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .footer-link:hover { color: ${C.orange400} !important; }
        @media(max-width:768px){ .footer-grid{ grid-template-columns:1fr 1fr !important; } }
      `}</style>
    </footer>
  );
}
