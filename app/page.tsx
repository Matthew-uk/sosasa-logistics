"use client"
import { useState, useEffect, useRef, useCallback, type ReactNode, type CSSProperties } from "react";
import {
  Package, Truck, MapPin, Phone, Mail, Clock,
  ChevronRight, Search, ArrowRight, Star,
  Shield, Zap, Globe, Users, Building,
  CheckCircle, Menu, X, Send, Target, Eye,
  Award, TrendingUp, Box, Navigation,
  ChevronDown, Play, BarChart3, Headphones,
  MapPinned, Timer, PackageCheck, Warehouse,
  ArrowUpRight, Quote, Hash, Layers, Route,
  CircleDot, Sparkles, type LucideIcon
} from "lucide-react";

/* ═══════════════ TYPES ═══════════════ */
interface NavLink { id: string; label: string }
interface StatItem { icon: LucideIcon; value: number; suffix: string; label: string }
interface ServiceItem { icon: LucideIcon; title: string; desc: string; features: string[]; accent?: boolean }
interface TestimonialItem { name: string; role: string; text: string; rating: number; img: string }
interface GalleryItem { src: string; title: string; cat: string; span: string; rowSpan?: string }
interface TrackStep { label: string; time: string; done: boolean; location: string }
interface TrackResult { id: string; status: string; from: string; to: string; progress: number; steps: TrackStep[] }
interface ValueItem { icon: LucideIcon; title: string; desc: string }

/* ═══════════════ DESIGN TOKENS ═══════════════ */
const C = {
  navy950: "#040810", navy900: "#070D1A", navy850: "#0A1222", navy800: "#0E1A30",
  navy700: "#152238", navy600: "#1E3050", navy500: "#2A4068",
  orange700: "#9A3412", orange600: "#C4420A", orange500: "#E8590C", orange400: "#FF6B2B",
  orange300: "#FF8C4B", orange200: "#FFB088", orange100: "#FFD4BB",
  white: "#FFFFFF", gray50: "#F9FAFB", gray100: "#F3F4F6", gray200: "#E5E7EB",
  gray300: "#D1D5DB", gray400: "#9CA3AF", gray500: "#6B7280",
};

/* ═══════════════ IMAGE URLS ═══════════════ */
const IMG = {
  hero: "https://images.unsplash.com/photo-1586206670130-4c6d8e646c9a?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  warehouse: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80",
  truck: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
  containers: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
  boxes: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80",
  cityNight: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
  port: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?auto=format&fit=crop&w=800&q=80",
  delivery: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80",
  packages: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80",
  aerial: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&w=800&q=80",
  logistics: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  road: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
  team: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
  handshake: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
};

/* ═══════════════ GLOBAL STYLES ═══════════════ */
const GlobalStyles = (): ReactNode => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lexend:wght@300;400;500;600;700;800&display=swap');

    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { font-family:'Lexend',sans-serif; background:${C.navy950}; overflow-x:hidden; }

    @keyframes fadeUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes slideL { from{opacity:0;transform:translateX(-80px)} to{opacity:1;transform:translateX(0)} }
    @keyframes slideR { from{opacity:0;transform:translateX(80px)} to{opacity:1;transform:translateX(0)} }
    @keyframes scaleIn { from{opacity:0;transform:scale(0.8)} to{opacity:1;transform:scale(1)} }
    @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
    @keyframes spin { to{transform:rotate(360deg)} }
    @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
    @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes revealText { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0 0 0)} }
    @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px ${C.orange500}22} 50%{box-shadow:0 0 40px ${C.orange500}44} }
    @keyframes kenBurns { 0%{transform:scale(1)} 100%{transform:scale(1.08)} }
    @keyframes borderDraw { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
    @keyframes countPop { 0%{transform:scale(0.5);opacity:0} 50%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes imgReveal { from{clip-path:polygon(0 0,0 0,0 100%,0 100%)} to{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)} }

    .anim{opacity:0;transform:translateY(50px);transition:all .9s cubic-bezier(.16,1,.3,1)}
    .anim.vis{opacity:1;transform:translateY(0)}

    input:focus,textarea:focus,select:focus{outline:none;border-color:${C.orange500}!important;box-shadow:0 0 0 3px ${C.orange500}22!important}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${C.navy950}}::-webkit-scrollbar-thumb{background:${C.navy600};border-radius:3px}::-webkit-scrollbar-thumb:hover{background:${C.orange500}}

    .glass{background:rgba(10,18,34,.75);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
    .tg{background:linear-gradient(135deg,${C.orange400},${C.orange300},${C.orange500});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

    .hlift{transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .5s ease}
    .hlift:hover{transform:translateY(-10px);box-shadow:0 30px 80px ${C.orange500}15}

    .btn-p{background:linear-gradient(135deg,${C.orange500},${C.orange600});color:#fff;border:none;padding:15px 34px;border-radius:14px;font-family:'Lexend';font-weight:700;font-size:15px;cursor:pointer;transition:all .35s;display:inline-flex;align-items:center;gap:10px;position:relative;overflow:hidden}
    .btn-p:hover{transform:translateY(-3px);box-shadow:0 12px 40px ${C.orange500}55}
    .btn-o{background:transparent;color:#fff;border:2px solid ${C.orange500}33;padding:13px 30px;border-radius:14px;font-family:'Lexend';font-weight:600;font-size:15px;cursor:pointer;transition:all .35s;display:inline-flex;align-items:center;gap:10px}
    .btn-o:hover{border-color:${C.orange500};background:${C.orange500}11;transform:translateY(-3px)}

    .img-cover{width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.16,1,.3,1)}

    @media(max-width:768px){.hide-m{display:none!important}.mob-menu-btn{display:flex!important}}
  `}</style>
);

/* ═══════════════ HOOKS ═══════════════ */
function useScrollAnim(): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".anim").forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function AnimCounter({ end, suffix = "", duration = 2200 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let n = 0;
    const step = Math.ceil(end / (duration / 16));
    const t = setInterval(() => { n += step; if (n >= end) { setCount(end); clearInterval(t); } else setCount(n); }, 16);
    return () => clearInterval(t);
  }, [started, end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ═══════════════ LOGO WORDMARK ═══════════════ */
function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const s = { small: { f: 20, s: 7 }, default: { f: 28, s: 8 }, large: { f: 46, s: 12 } }[size];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: s.f * 1.3, height: s.f * 1.3,
        background: `linear-gradient(135deg, ${C.orange500}, ${C.orange400})`,
        borderRadius: s.f * 0.22, display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 6px 24px ${C.orange500}44`, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-40%", right: "-40%", width: "90%", height: "90%", background: "rgba(255,255,255,.12)", borderRadius: "50%" }} />
        <Truck size={s.f * 0.5} color="white" strokeWidth={2.5} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontFamily: "'Bebas Neue'", fontSize: s.f, color: C.white, letterSpacing: ".04em", lineHeight: 1 }}>
          SOS<span style={{ color: C.orange400 }}>ASA</span>
        </span>
        <span style={{ fontFamily: "'Lexend'", fontWeight: 500, fontSize: s.s, color: C.gray400, letterSpacing: ".18em", textTransform: "uppercase", lineHeight: 1 }}>
          Logistics
        </span>
      </div>
    </div>
  );
}

/* ═══════════════ LOADING SCREEN ═══════════════ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(t); setTimeout(() => setOut(true), 200); return 100; } return p + Math.random() * 10 + 3; });
    }, 50);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { if (out) setTimeout(onComplete, 700); }, [out, onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, background: C.navy950,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: out ? 0 : 1, transform: out ? "scale(1.05)" : "scale(1)",
      transition: "all .7s cubic-bezier(.16,1,.3,1)",
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", width: 300, height: 300, background: C.orange500, borderRadius: "50%", opacity: .04, filter: "blur(120px)", animation: "blob 10s ease-in-out infinite" }} />

      {/* Rotating rings */}
      {[90, 120, 150].map((sz, i) => (
        <div key={i} style={{
          position: "absolute", width: sz, height: sz,
          border: `1.5px solid ${C.orange500}${["22", "15", "0A"][i]}`,
          borderRadius: "50%", animation: `spin ${7 + i * 4}s linear infinite${i % 2 ? " reverse" : ""}`,
        }} />
      ))}

      <div style={{ animation: "scaleIn .5s ease", marginBottom: 48 }}>
        <Logo size="large" />
      </div>

      {/* Progress */}
      <div style={{ width: 240, height: 2, background: C.navy700, borderRadius: 1, overflow: "hidden" }}>
        <div style={{
          width: `${Math.min(progress, 100)}%`, height: "100%",
          background: `linear-gradient(90deg, ${C.orange500}, ${C.orange300})`,
          borderRadius: 1, transition: "width .08s", boxShadow: `0 0 16px ${C.orange500}88`,
        }} />
      </div>
      <p style={{ color: C.gray500, fontFamily: "'Lexend'", fontSize: 11, marginTop: 16, letterSpacing: ".15em", fontWeight: 500 }}>
        {progress < 100 ? "LOADING" : "READY"}
      </p>
    </div>
  );
}

/* ═══════════════ NAVBAR ═══════════════ */
function Navbar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links: NavLink[] = [
    { id: "home", label: "Home" }, { id: "about", label: "About" },
    { id: "services", label: "Services" }, { id: "track", label: "Track" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => { setPage(id); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      <nav className="glass" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "10px 0" : "18px 0",
        borderBottom: `1px solid ${scrolled ? C.navy600 + "66" : "transparent"}`,
        transition: "all .4s ease",
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ cursor: "pointer" }} onClick={() => go("home")}><Logo size="small" /></div>

          <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                background: page === l.id ? `${C.orange500}14` : "transparent",
                color: page === l.id ? C.orange400 : C.gray300,
                border: "none", padding: "9px 20px", borderRadius: 10, cursor: "pointer",
                fontFamily: "'Lexend'", fontSize: 13.5, fontWeight: 500, transition: "all .3s",
                position: "relative",
              }}>
                {l.label}
                {page === l.id && <div style={{ position: "absolute", bottom: 3, left: "32%", right: "32%", height: 2, background: C.orange500, borderRadius: 1 }} />}
              </button>
            ))}
            <button className="btn-p" style={{ padding: "10px 26px", fontSize: 13, marginLeft: 12 }} onClick={() => go("contact")}>
              Get a Quote <ArrowRight size={14} />
            </button>
          </div>

          <button className="mob-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", color: C.white, cursor: "pointer", padding: 8, alignItems: "center", justifyContent: "center" }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="glass" style={{ position: "fixed", top: 68, left: 0, right: 0, bottom: 0, zIndex: 999, padding: "36px 28px", animation: "fadeIn .3s" }}>
          {links.map((l, i) => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: page === l.id ? `${C.orange500}14` : "transparent",
              color: page === l.id ? C.orange400 : C.white,
              border: "none", padding: "18px 24px", borderRadius: 14, cursor: "pointer",
              fontFamily: "'Lexend'", fontSize: 20, fontWeight: 700, marginBottom: 4,
              animation: `fadeUp .4s ease ${i * .06}s both`,
            }}>{l.label}</button>
          ))}
        </div>
      )}
    </>
  );
}

/* ═══════════════ SECTION / HEADING ═══════════════ */
function Section({ children, bg, style = {}, id }: { children: ReactNode; bg?: string; style?: CSSProperties; id?: string }) {
  const ref = useScrollAnim();
  return (
    <section ref={ref as any} id={id} style={{ background: bg || "transparent", padding: "110px 28px", position: "relative", overflow: "hidden", ...style }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 2 }}>{children}</div>
    </section>
  );
}

function Heading({ label, title, subtitle, center = true }: { label?: string; title: ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <div className="anim" style={{ textAlign: center ? "center" : "left", marginBottom: 72 }}>
      {label && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}25`, padding: "7px 18px", borderRadius: 100, marginBottom: 22 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.orange500, animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'Lexend'", fontSize: 11.5, fontWeight: 700, color: C.orange400, letterSpacing: ".12em", textTransform: "uppercase" }}>{label}</span>
        </div>
      )}
      <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 5vw, 56px)", color: C.white, lineHeight: 1.05, letterSpacing: ".02em", marginBottom: 18 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 16, color: C.gray400, maxWidth: 560, margin: center ? "0 auto" : undefined, lineHeight: 1.75 }}>{subtitle}</p>}
    </div>
  );
}

/* ═══════════════ MARQUEE ═══════════════ */
function Marquee() {
  const items = ["Same-Day Delivery", "Lagos", "Abuja", "Port Harcourt", "Real-Time Tracking", "Insured Packages", "24/7 Support", "Interstate Logistics", "Express Dispatch", "Nationwide Coverage"];
  const rendered = [...items, ...items].map((t, i) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, whiteSpace: "nowrap", padding: "0 16px" }}>
      <span style={{ fontFamily: "'Bebas Neue'", fontSize: 15, color: C.gray400, letterSpacing: ".1em" }}>{t}</span>
      <CircleDot size={6} color={C.orange500} />
    </span>
  ));
  return (
    <div style={{ overflow: "hidden", background: C.navy800, borderTop: `1px solid ${C.navy700}`, borderBottom: `1px solid ${C.navy700}`, padding: "16px 0" }}>
      <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "fit-content" }}>{rendered}</div>
    </div>
  );
}

/* ═══════════════ IMAGE BOX ═══════════════ */
function ImgBox({ src, alt, style = {}, overlayContent }: { src: string; alt: string; style?: CSSProperties; overlayContent?: ReactNode }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, background: C.navy800, ...style }}>
      <img src={src} alt={alt} className="img-cover" loading="lazy"
        style={{ position: "absolute", inset: 0, animation: "kenBurns 20s ease-in-out infinite alternate" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,8,16,.85) 0%, rgba(4,8,16,.2) 50%, rgba(4,8,16,.3) 100%)" }} />
      {overlayContent && <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>{overlayContent}</div>}
    </div>
  );
}

/* ═══════════════ TRACKING WIDGET ═══════════════ */
function TrackingWidget({ full = false }: { full?: boolean }) {
  const [code, setCode] = useState("");
  const [tracking, setTracking] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);

  const handleTrack = () => {
    if (!code.trim()) return;
    setTracking(true);
    setTimeout(() => {
      setTracking(false);
      setResult({
        id: code.toUpperCase(), status: "In Transit", from: "Lagos", to: "Abuja", progress: 65,
        steps: [
          { label: "Package Received", time: "Mon, 10:30 AM", done: true, location: "Lagos Hub" },
          { label: "In Transit", time: "Tue, 6:00 AM", done: true, location: "Ore Checkpoint" },
          { label: "Arrived at Hub", time: "Est. Wed", done: false, location: "Abuja Hub" },
          { label: "Out for Delivery", time: "Est. Wed PM", done: false, location: "Abuja" },
        ],
      });
    }, 2000);
  };

  return (
    <div style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: full ? 52 : 36, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 220, height: 220, background: `radial-gradient(circle at top right, ${C.orange500}0D, transparent 70%)` }} />

      {full && (
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ width: 76, height: 76, borderRadius: 22, background: `${C.orange500}12`, border: `1px solid ${C.orange500}28`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
            <Search size={34} color={C.orange400} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 40, color: C.white, letterSpacing: ".02em", marginBottom: 10 }}>Track Your Shipment</h2>
          <p style={{ color: C.gray400, fontSize: 15 }}>Enter your tracking number for real-time updates</p>
        </div>
      )}
      {!full && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <Hash size={18} color={C.orange400} />
          <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.white, letterSpacing: ".03em" }}>Track Your Package</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, flexDirection: full ? "row" : "column", flexWrap: "wrap" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Package size={18} color={C.gray500} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            placeholder="e.g. SOS-12345678"
            style={{ width: "100%", padding: "17px 17px 17px 46px", background: C.navy900, border: `2px solid ${C.navy600}`, borderRadius: 14, color: C.white, fontSize: 15, fontFamily: "'Lexend'", transition: "all .3s" }} />
        </div>
        <button className="btn-p" onClick={handleTrack} style={{ padding: "17px 36px", borderRadius: 14, whiteSpace: "nowrap" }}>
          {tracking ? <div style={{ width: 20, height: 20, border: `2px solid #fff4`, borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> : <>Track Now <ArrowRight size={16} /></>}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 36, paddingTop: 32, borderTop: `1px solid ${C.navy600}`, animation: "fadeUp .5s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div>
              <p style={{ color: C.gray500, fontSize: 12, marginBottom: 4 }}>Tracking ID</p>
              <p style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.white, letterSpacing: ".04em" }}>{result.id}</p>
            </div>
            <div style={{ background: `${C.orange500}14`, border: `1px solid ${C.orange500}33`, padding: "7px 18px", borderRadius: 100, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.orange400, animation: "pulse 2s infinite" }} />
              <span style={{ fontFamily: "'Lexend'", fontWeight: 700, fontSize: 12, color: C.orange400 }}>{result.status}</span>
            </div>
          </div>

          {/* Route progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={16} color={C.orange400} /><span style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{result.from}</span></div>
            <div style={{ flex: 1, height: 4, minWidth: 60, background: C.navy600, borderRadius: 2, position: "relative" }}>
              <div style={{ width: `${result.progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.orange500}, ${C.orange300})`, borderRadius: 2, boxShadow: `0 0 12px ${C.orange500}66` }} />
              <Truck size={18} color={C.orange400} style={{ position: "absolute", left: `${result.progress}%`, top: "50%", transform: "translate(-50%,-50%)", filter: `drop-shadow(0 0 6px ${C.orange500}88)` }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPinned size={16} color={C.gray500} /><span style={{ color: C.gray400, fontWeight: 700, fontSize: 14 }}>{result.to}</span></div>
          </div>

          {/* Steps */}
          {result.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: step.done ? C.orange500 : C.navy700, border: `2px solid ${step.done ? C.orange500 : C.navy600}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, boxShadow: step.done ? `0 0 16px ${C.orange500}33` : "none" }}>
                  {step.done ? <CheckCircle size={16} color={C.white} /> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.navy500 }} />}
                </div>
                {i < result.steps.length - 1 && <div style={{ width: 2, height: 44, background: step.done ? `${C.orange500}33` : C.navy700 }} />}
              </div>
              <div style={{ paddingBottom: i < result.steps.length - 1 ? 22 : 0, paddingTop: 4 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: step.done ? C.white : C.gray500 }}>{step.label}</p>
                <p style={{ fontSize: 12, color: C.gray500, marginTop: 3 }}>{step.time} · {step.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════ GALLERY (ART-LIKE MASONRY) ═══════════════ */
const galleryData: GalleryItem[] = [
  { src: IMG.port, title: "Port Operations", cat: "Infrastructure", span: "span 2", rowSpan: "span 2" },
  { src: IMG.warehouse, title: "Warehouse Hub", cat: "Operations", span: "span 1", rowSpan: "span 1" },
  { src: IMG.boxes, title: "Package Handling", cat: "Fulfillment", span: "span 1", rowSpan: "span 1" },
  { src: IMG.truck, title: "Interstate Fleet", cat: "Fleet", span: "span 1", rowSpan: "span 1" },
  { src: IMG.containers, title: "Container Yard", cat: "Logistics", span: "span 1", rowSpan: "span 2" },
  { src: IMG.road, title: "Nationwide Routes", cat: "Coverage", span: "span 1", rowSpan: "span 1" },
  { src: IMG.delivery, title: "Last Mile", cat: "Delivery", span: "span 1", rowSpan: "span 1" },
  { src: IMG.cityNight, title: "24/7 Operations", cat: "Service", span: "span 2", rowSpan: "span 1" },
  { src: IMG.packages, title: "Secure Packaging", cat: "Care", span: "span 1", rowSpan: "span 1" },
  { src: IMG.aerial, title: "Air Logistics", cat: "Express", span: "span 1", rowSpan: "span 1" },
  { src: IMG.logistics, title: "Distribution Center", cat: "Dispatch", span: "span 1", rowSpan: "span 1" },
  { src: IMG.map, title: "Route Planning", cat: "Technology", span: "span 1", rowSpan: "span 1" },
];

function ArtGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridAutoRows: "180px",
      gap: 12,
    }}>
      {galleryData.map((item, i) => (
        <div key={i} className="anim"
          onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
          style={{
            gridColumn: item.span, gridRow: item.rowSpan || "span 1",
            borderRadius: 18, overflow: "hidden", position: "relative", cursor: "pointer",
            border: `1px solid ${hovered === i ? C.orange500 + "44" : C.navy700}`,
            transition: "border-color .4s, transform .5s cubic-bezier(.16,1,.3,1)",
            transform: hovered === i ? "scale(1.02)" : "scale(1)",
          }}>
          <img src={item.src} alt={item.title} loading="lazy"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform .8s cubic-bezier(.16,1,.3,1), filter .5s",
              transform: hovered === i ? "scale(1.1)" : "scale(1.02)",
              filter: hovered === i ? "brightness(1.1)" : "brightness(.7)",
            }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              el.parentElement!.style.background = `linear-gradient(135deg, ${C.navy700}, ${C.navy900})`;
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to top, rgba(4,8,16,${hovered === i ? ".9" : ".6"}) 0%, transparent 60%)`,
            transition: "all .5s",
          }} />

          {/* Category tag */}
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(0,0,0,.5)", backdropFilter: "blur(8px)",
            padding: "5px 12px", borderRadius: 8, border: `1px solid ${C.orange500}22`,
            opacity: hovered === i ? 1 : 0, transform: hovered === i ? "translateY(0)" : "translateY(-8px)",
            transition: "all .4s",
          }}>
            <span style={{ fontFamily: "'Lexend'", fontSize: 10, fontWeight: 700, color: C.orange300, textTransform: "uppercase", letterSpacing: ".1em" }}>
              {item.cat}
            </span>
          </div>

          {/* Title */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px",
            transform: hovered === i ? "translateY(0)" : "translateY(6px)",
            transition: "transform .4s",
          }}>
            <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: hovered === i ? 22 : 18, color: C.white, letterSpacing: ".03em", transition: "font-size .3s" }}>
              {item.title}
            </h4>
            {hovered === i && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, animation: "fadeUp .3s ease" }}>
                <span style={{ fontSize: 12, color: C.orange300, fontWeight: 600 }}>View</span>
                <ArrowUpRight size={12} color={C.orange300} />
              </div>
            )}
          </div>
        </div>
      ))}

      <style>{`
        @media(max-width:1024px) {
          div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media(max-width:640px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2,1fr) !important;
            grid-auto-rows: 150px !important;
          }
          div[style*="grid-template-columns: repeat(4"] > div { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════ TESTIMONIALS ═══════════════ */
const testimonials: TestimonialItem[] = [
  { name: "Adebayo Ogunlesi", role: "CEO, TechVentures Lagos", text: "SOSASA has transformed our supply chain. Their same-day delivery across Lagos is incredibly reliable. We reduced delivery complaints by 85%.", rating: 5, img: IMG.team },
  { name: "Ngozi Amaechi", role: "Operations, ShopRight", text: "The tracking system alone sets them apart. Our customers see exactly where their packages are. Interstate service between Lagos and PH is seamless.", rating: 5, img: IMG.handshake },
  { name: "Ibrahim Musa", role: "Founder, MarketDirect", text: "Moving goods between Abuja and Lagos used to be a nightmare. SOSASA made it effortless. Professional, punctual, and world-class service.", rating: 5, img: IMG.delivery },
];

/* ═══════════════════════════════════════════════
                        PAGES
   ═══════════════════════════════════════════════ */

/* ─── HOME ─── */
function HomePage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div style={{ animation: "fadeIn .5s ease" }}>

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        {/* BG Image with Ken Burns */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMG.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", animation: "kenBurns 30s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.navy950}ee 0%, ${C.navy950}cc 40%, ${C.navy900}88 100%)` }} />
          {/* Grid overlay */}
          <div style={{ position: "absolute", inset: 0, opacity: .03, backgroundImage: `linear-gradient(${C.white} 1px, transparent 1px), linear-gradient(90deg, ${C.white} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "160px 28px 100px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left */}
          <div style={{ animation: "slideL .9s ease .1s both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${C.orange500}10`, border: `1px solid ${C.orange500}22`, padding: "8px 20px", borderRadius: 100, marginBottom: 32 }}>
              <Sparkles size={14} color={C.orange400} />
              <span style={{ fontFamily: "'Lexend'", fontSize: 12, fontWeight: 700, color: C.orange300, letterSpacing: ".04em" }}>Nigeria's #1 Logistics Partner</span>
            </div>

            <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(52px, 7vw, 96px)", color: C.white, lineHeight: .95, letterSpacing: ".01em", marginBottom: 28 }}>
              We Move
              <br />
              <span className="tg">Nigeria</span>
              <br />
              Forward
            </h1>

            <p style={{ fontSize: 17, color: C.gray300, lineHeight: 1.8, maxWidth: 500, marginBottom: 44 }}>
              From Lagos to Abuja, Port Harcourt and beyond — blazing-fast delivery, real-time tracking, and insured shipping for businesses that refuse to slow down.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
              <button className="btn-p" style={{ padding: "18px 40px", fontSize: 16 }} onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>
                Ship Now <ArrowRight size={18} />
              </button>
              <button className="btn-o" style={{ padding: "16px 34px", fontSize: 16 }} onClick={() => { setPage("track"); window.scrollTo(0, 0); }}>
                <Package size={18} /> Track Package
              </button>
            </div>

            {/* Trust strip */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {([
                [Shield, "Fully Insured"], [Clock, "Same-Day Available"], [Headphones, "24/7 Support"]
              ] as const).map(([Icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={15} color={C.orange400} />
                  <span style={{ fontSize: 13, color: C.gray400, fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bento Stats Grid */}
          <div className="hide-m" style={{ animation: "slideR .9s ease .3s both" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {/* Active shipment card */}
              <div style={{ gridColumn: "span 2", background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, padding: 28, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 140, height: 140, background: `radial-gradient(circle, ${C.orange500}0D, transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <p style={{ color: C.gray500, fontSize: 11, fontWeight: 600, letterSpacing: ".08em" }}>LIVE SHIPMENT</p>
                    <p style={{ fontFamily: "'Bebas Neue'", fontSize: 24, color: C.white, letterSpacing: ".03em", marginTop: 4 }}>SOS-7839201</p>
                  </div>
                  <div style={{ background: "#4ade8018", border: "1px solid #4ade8033", padding: "5px 14px", borderRadius: 100, display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                    <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 700 }}>On Time</span>
                  </div>
                </div>
                {/* Route */}
                <div style={{ background: C.navy900, borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ textAlign: "center" }}><MapPin size={18} color={C.orange400} /><p style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.white, marginTop: 6 }}>LAGOS</p></div>
                    <div style={{ flex: 1, margin: "0 16px", position: "relative" }}>
                      <div style={{ height: 3, background: C.navy600, borderRadius: 2 }}><div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg, ${C.orange500}, ${C.orange300})`, borderRadius: 2 }} /></div>
                      <div style={{ position: "absolute", left: "72%", top: "50%", transform: "translate(-50%,-50%)", background: C.orange500, borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 24px ${C.orange500}66` }}>
                        <Truck size={14} color={C.white} />
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}><MapPinned size={18} color={C.gray500} /><p style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.gray400, marginTop: 6 }}>ABUJA</p></div>
                  </div>
                </div>
              </div>

              {/* Mini stat cards */}
              {([
                { val: "99.8%", label: "Delivery Rate", icon: TrendingUp, color: "#4ade80" },
                { val: "4h 23m", label: "Avg. Transit", icon: Timer, color: C.orange400 },
                { val: "2,500+", label: "Active Clients", icon: Users, color: "#60a5fa" },
                { val: "50K+", label: "Packages/Mo", icon: Package, color: C.orange300 },
              ]).map((s, i) => (
                <div key={i} style={{
                  background: C.navy800, border: `1px solid ${C.navy600}`,
                  borderRadius: 18, padding: 22, animation: `float ${6 + i}s ease-in-out infinite`,
                  animationDelay: `${i * .5}s`,
                }}>
                  <s.icon size={18} color={s.color} style={{ marginBottom: 10 }} />
                  <p style={{ fontFamily: "'Bebas Neue'", fontSize: 26, color: C.white, letterSpacing: ".02em" }}>{s.val}</p>
                  <p style={{ fontSize: 11, color: C.gray500, marginTop: 2, fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`@media(max-width:768px){section > div[style*="grid-template-columns: 1.2fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <Marquee />

      {/* ═══ STATS BAR ═══ */}
      <Section bg={C.navy900} style={{ padding: "70px 28px" }}>
        <div className="anim" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, background: `linear-gradient(135deg, ${C.navy800}, ${C.navy850})`, border: `1px solid ${C.navy600}`, borderRadius: 24, padding: 28 }}>
          {([
            { icon: Package, value: 50000, suffix: "+", label: "Packages Delivered" },
            { icon: MapPin, value: 36, suffix: "", label: "States Covered" },
            { icon: Users, value: 2500, suffix: "+", label: "Happy Clients" },
            { icon: Clock, value: 99, suffix: "%", label: "On-Time Rate" },
          ] as StatItem[]).map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 8px" }}>
              <s.icon size={22} color={C.orange400} style={{ marginBottom: 12 }} />
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 4vw, 52px)", color: C.white, lineHeight: 1 }}>
                <AnimCounter end={s.value} suffix={s.suffix} />
              </div>
              <p style={{ fontSize: 13, color: C.gray500, marginTop: 8, fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){div[style*="grid-template-columns: repeat(4, 1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </Section>

      {/* ═══ SERVICES ═══ */}
      <Section bg={C.navy950}>
        <Heading label="Our Services" title={<>WHAT WE <span className="tg">DELIVER</span></>} subtitle="Fast, reliable, and secure logistics solutions tailored for businesses across Nigeria." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {([
            { icon: Zap, title: "Same-Day Express", desc: "Lightning delivery within Lagos, Abuja, and Port Harcourt. Order by noon, receive by evening.", img: IMG.delivery },
            { icon: Truck, title: "Interstate Logistics", desc: "Door-to-door delivery connecting major cities with real-time tracking and guaranteed timelines.", img: IMG.truck },
            { icon: Shield, title: "Insured Shipping", desc: "Every package fully insured from pickup to delivery. Ship with confidence and total peace of mind.", img: IMG.packages },
          ]).map((s, i) => (
            <div key={i} className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, overflow: "hidden", cursor: "default" }}>
              <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
                <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy800} 5%, transparent 60%)` }} />
                <div style={{ position: "absolute", top: 16, left: 16, width: 48, height: 48, borderRadius: 14, background: `${C.orange500}22`, backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.orange500}33` }}>
                  <s.icon size={22} color={C.orange400} />
                </div>
              </div>
              <div style={{ padding: "24px 28px 32px" }}>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 24, color: C.white, letterSpacing: ".02em", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: C.gray400, lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="anim" style={{ textAlign: "center", marginTop: 52 }}>
          <button className="btn-o" onClick={() => { setPage("services"); window.scrollTo(0, 0); }}>
            View All Services <ChevronRight size={16} />
          </button>
        </div>
        <style>{`@media(max-width:768px){div[style*="grid-template-columns: repeat(3, 1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* ═══ TRACKING SECTION ═══ */}
      <Section bg={C.navy900}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div className="anim">
            <Heading label="Real-Time Tracking" center={false} title={<>KNOW WHERE YOUR <span className="tg">PACKAGE</span> IS</>} subtitle="Our advanced tracking system gives you complete visibility over your shipments, from pickup to delivery." />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {([
                { icon: Eye, title: "Live GPS Tracking", desc: "Watch your package move in real-time across Nigeria" },
                { icon: Send, title: "SMS & Email Alerts", desc: "Automatic notifications at every delivery milestone" },
                { icon: BarChart3, title: "Delivery Analytics", desc: "Deep insights on your shipping patterns and history" },
              ]).map((f, i) => (
                <div key={i} className="anim" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: `${C.orange500}10`, border: `1px solid ${C.orange500}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <f.icon size={22} color={C.orange400} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, color: C.white, marginBottom: 5 }}>{f.title}</p>
                    <p style={{ fontSize: 14, color: C.gray400, lineHeight: 1.65 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="anim"><TrackingWidget /></div>
        </div>
        <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
      </Section>

      {/* ═══ GALLERY ═══ */}
      <Section bg={C.navy950}>
        <Heading label="Gallery" title={<>INSIDE <span className="tg">SOSASA</span> OPERATIONS</>} subtitle="A glimpse into our nationwide logistics infrastructure powering deliveries across Nigeria." />
        <ArtGallery />
      </Section>

      {/* ═══ TESTIMONIALS ═══ */}
      <Section bg={C.navy900}>
        <Heading label="Testimonials" title={<>TRUSTED BY <span className="tg">BUSINESSES</span> ACROSS NIGERIA</>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ height: 120, position: "relative", overflow: "hidden" }}>
                <img src={t.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.5)" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy800}, transparent)` }} />
              </div>
              <div style={{ padding: "0 30px 32px", marginTop: -20, position: "relative" }}>
                <Quote size={28} color={C.orange500} style={{ opacity: .4, marginBottom: 14 }} />
                <p style={{ fontSize: 14, color: C.gray300, lineHeight: 1.8, fontStyle: "italic", marginBottom: 24 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.orange500}, ${C.orange600})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue'", fontSize: 18, color: C.white }}>{t.name[0]}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: C.white }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: C.gray500 }}>{t.role}</p>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>{[...Array(t.rating)].map((_, j) => <Star key={j} size={13} fill={C.orange400} color={C.orange400} />)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){div[style*="repeat(3, 1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </Section>

      {/* ═══ CTA ═══ */}
      <Section style={{ padding: "80px 28px" }}>
        <div className="anim" style={{ position: "relative", borderRadius: 28, overflow: "hidden" }}>
          <img src={IMG.containers} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.orange600}ee, ${C.orange500}dd)` }} />
          <div style={{ position: "absolute", inset: 0, opacity: .06, backgroundImage: `radial-gradient(${C.white} 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
          <div style={{ position: "relative", zIndex: 2, padding: "80px 52px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px, 5vw, 56px)", color: C.white, lineHeight: 1.05, marginBottom: 18, letterSpacing: ".02em" }}>READY TO SHIP SMARTER?</h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,.85)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.75 }}>Join 2,500+ businesses that trust SOSASA for their logistics needs across Nigeria.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{ background: C.white, color: C.orange600, border: "none", padding: "18px 40px", borderRadius: 14, fontFamily: "'Lexend'", fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "all .3s" }} onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>
                Get a Free Quote <ArrowRight size={18} />
              </button>
              <button style={{ background: "rgba(255,255,255,.15)", color: C.white, border: "2px solid rgba(255,255,255,.3)", padding: "16px 34px", borderRadius: 14, fontFamily: "'Lexend'", fontWeight: 700, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(8px)" }}>
                <Phone size={18} /> Call Us Now
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ─── ABOUT ─── */
function AboutPage() {
  const values: ValueItem[] = [
    { icon: Shield, title: "Reliability", desc: "We deliver on time, every time. Our 99.8% rate speaks volumes." },
    { icon: Target, title: "Precision", desc: "Every package tracked and handled with military precision." },
    { icon: Users, title: "People First", desc: "300+ logistics professionals dedicated to your success." },
    { icon: Award, title: "Excellence", desc: "Every delivery is a chance to exceed your expectations." },
  ];

  return (
    <div style={{ animation: "fadeIn .5s", paddingTop: 100 }}>
      <Section>
        <Heading label="About Us" title={<>BUILT FOR <span className="tg">NIGERIA'S</span> LOGISTICS NEEDS</>} subtitle="Founded with one mission: make logistics in Nigeria reliable, fast, and transparent." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "stretch", marginBottom: 80 }}>
          <div className="anim" style={{ borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 480 }}>
            <img src={IMG.team} alt="Our Team" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy900}ee, ${C.navy900}44)` }} />
            <div style={{ position: "relative", zIndex: 2, padding: 44, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
              <Logo size="large" />
              <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 18 }}>
                {[["Founded", "2018"], ["HQ", "Lagos, Nigeria"], ["Team", "300+ Professionals"], ["Coverage", "36 States + FCT"]].map(([l, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 14, borderBottom: `1px solid ${C.navy600}44` }}>
                    <span style={{ color: C.gray400, fontSize: 14 }}>{l}</span>
                    <span style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="anim">
            <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: C.white, letterSpacing: ".02em", marginBottom: 24, lineHeight: 1.1 }}>
              WE SAW THE GAP.<br />WE BUILT THE BRIDGE.
            </h3>
            <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.85, marginBottom: 22 }}>
              Nigeria's logistics landscape was fragmented — unreliable timelines, lost packages, and zero transparency. SOSASA was born to change that.
            </p>
            <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.85, marginBottom: 22 }}>
              Starting with a single route between Lagos and Abuja, we've grown into a trusted logistics partner serving businesses across three major cities with plans for nationwide expansion.
            </p>
            <p style={{ fontSize: 16, color: C.gray400, lineHeight: 1.85, marginBottom: 36 }}>
              Our technology-first approach means every package is tracked in real-time, every delivery is insured, and every customer has 24/7 support.
            </p>
            <ImgBox src={IMG.handshake} alt="Partnership" style={{ height: 200, borderRadius: 18 }}
              overlayContent={<p style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white }}>PARTNERSHIPS THAT MATTER</p>} />
          </div>
        </div>
        <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </Section>

      <Section bg={C.navy850}>
        <Heading label="Our Values" title={<>WHAT <span className="tg">DRIVES</span> US</>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {values.map((v, i) => (
            <div key={i} className="anim hlift" style={{ background: C.navy800, border: `1px solid ${C.navy600}`, borderRadius: 22, padding: 34, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: `${C.orange500}10`, border: `1px solid ${C.orange500}1A`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                <v.icon size={28} color={C.orange400} />
              </div>
              <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: C.white, letterSpacing: ".02em", marginBottom: 10 }}>{v.title}</h4>
              <p style={{ fontSize: 14, color: C.gray400, lineHeight: 1.75 }}>{v.desc}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){div[style*="repeat(4, 1fr)"]{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){div[style*="repeat(4, 1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </Section>
    </div>
  );
}

/* ─── SERVICES ─── */
function ServicesPage({ setPage }: { setPage: (p: string) => void }) {
  const services: (ServiceItem & { img: string })[] = [
    { icon: Zap, title: "Same-Day Express Delivery", desc: "Need it there today? Our express service operates within Lagos, Abuja, and Port Harcourt. Orders placed before noon arrive by 6 PM.", features: ["Within-city delivery", "2-6 hour turnaround", "Live GPS tracking", "Photo proof"], accent: true, img: IMG.delivery },
    { icon: Truck, title: "Interstate Logistics", desc: "Seamless door-to-door delivery between Nigeria's major cities. Daily departures covering the Lagos–Abuja–Port Harcourt triangle.", features: ["Daily routes", "24-48 hour delivery", "Full insurance", "Bulk discounts"], img: IMG.truck },
    { icon: PackageCheck, title: "Business Solutions", desc: "Custom logistics solutions for e-commerce brands, retailers, and enterprises. We become an extension of your team.", features: ["Account manager", "API integration", "Custom SLAs", "Monthly reporting"], img: IMG.warehouse },
    { icon: Shield, title: "Secure Insured Shipping", desc: "Every package is fully insured. For high-value items, we offer enhanced security with dedicated handling and chain of custody.", features: ["Full value insurance", "Tamper-evident packing", "Custody tracking", "48hr claims"], img: IMG.packages },
  ];

  return (
    <div style={{ animation: "fadeIn .5s", paddingTop: 100 }}>
      <Section>
        <Heading label="Our Services" title={<>LOGISTICS SOLUTIONS <span className="tg">THAT DELIVER</span></>} subtitle="Whether it's a single package or a thousand, we have the infrastructure and expertise." />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {services.map((s, i) => (
            <div key={i} className="anim hlift" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: C.navy800, border: `1px solid ${s.accent ? C.orange500 + "33" : C.navy600}`, borderRadius: 24, overflow: "hidden", direction: i % 2 ? "rtl" : "ltr" }}>
              <div style={{ padding: 48, direction: "ltr" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: s.accent ? `${C.orange500}22` : `${C.orange500}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, border: `1px solid ${C.orange500}${s.accent ? "44" : "1A"}` }}>
                  <s.icon size={26} color={C.orange400} />
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 30, color: C.white, letterSpacing: ".02em", marginBottom: 14 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: C.gray400, lineHeight: 1.75, marginBottom: 26 }}>{s.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {s.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle size={14} color={C.orange400} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: C.gray300 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "relative", overflow: "hidden", direction: "ltr", minHeight: 280 }}>
                <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: i % 2 ? `linear-gradient(to left, transparent, ${C.navy800}22)` : `linear-gradient(to right, transparent, ${C.navy800}22)` }} />
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"][style*="border-radius: 24px"]{grid-template-columns:1fr!important;direction:ltr!important}}`}</style>
      </Section>

      <Section bg={C.navy850}>
        <div className="anim" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(32px, 4vw, 48px)", color: C.white, marginBottom: 16, letterSpacing: ".02em" }}>NEED A CUSTOM SOLUTION?</h2>
          <p style={{ fontSize: 16, color: C.gray400, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.75 }}>Every business is unique. Let's design a logistics plan tailored to your needs.</p>
          <button className="btn-p" style={{ padding: "18px 44px", fontSize: 16 }} onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>Request Custom Quote <ArrowRight size={18} /></button>
        </div>
      </Section>
    </div>
  );
}

/* ─── CONTACT ─── */
function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ animation: "fadeIn .5s", paddingTop: 100 }}>
      <Section>
        <Heading label="Contact Us" title={<>LET'S <span className="tg">TALK</span> LOGISTICS</>} subtitle="Have a question, need a quote, or ready to get started? We're here to help." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 36 }}>
          <div className="anim">
            <div style={{ borderRadius: 24, overflow: "hidden", marginBottom: 20, height: 200, position: "relative" }}>
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
                  <p style={{ color: C.gray400, fontSize: 15 }}>We'll get back to you within 2 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: C.white, letterSpacing: ".02em", marginBottom: 36 }}>SEND US A MESSAGE</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      {["Full Name", "Phone Number"].map(l => (
                        <div key={l}>
                          <label style={{ fontSize: 12, color: C.gray400, marginBottom: 8, display: "block", fontWeight: 600, letterSpacing: ".04em" }}>{l}</label>
                          <input placeholder={l} style={{ width: "100%", padding: 16, background: C.navy900, border: `2px solid ${C.navy600}`, borderRadius: 14, color: C.white, fontSize: 14, fontFamily: "'Lexend'", transition: "all .3s" }} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: C.gray400, marginBottom: 8, display: "block", fontWeight: 600, letterSpacing: ".04em" }}>Email Address</label>
                      <input type="email" placeholder="you@company.com" style={{ width: "100%", padding: 16, background: C.navy900, border: `2px solid ${C.navy600}`, borderRadius: 14, color: C.white, fontSize: 14, fontFamily: "'Lexend'", transition: "all .3s" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: C.gray400, marginBottom: 8, display: "block", fontWeight: 600, letterSpacing: ".04em" }}>Service</label>
                      <select style={{ width: "100%", padding: 16, background: C.navy900, border: `2px solid ${C.navy600}`, borderRadius: 14, color: C.gray400, fontSize: 14, fontFamily: "'Lexend'", cursor: "pointer" }}>
                        <option>Select a service</option>
                        <option>Same-Day Express</option>
                        <option>Interstate Logistics</option>
                        <option>Business Solutions</option>
                        <option>Custom Quote</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: C.gray400, marginBottom: 8, display: "block", fontWeight: 600, letterSpacing: ".04em" }}>Message</label>
                      <textarea placeholder="Tell us about your logistics needs..." rows={4} style={{ width: "100%", padding: 16, background: C.navy900, border: `2px solid ${C.navy600}`, borderRadius: 14, color: C.white, fontSize: 14, fontFamily: "'Lexend'", resize: "vertical", transition: "all .3s" }} />
                    </div>
                    <button className="btn-p" style={{ width: "100%", padding: 18, justifyContent: "center", fontSize: 15 }} onClick={() => setSubmitted(true)}>
                      Send Message <Send size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1.3fr"]{grid-template-columns:1fr!important}}`}</style>
      </Section>
    </div>
  );
}

/* ─── TRACK ─── */
function TrackPage() {
  return (
    <div style={{ animation: "fadeIn .5s", paddingTop: 100 }}>
      <Section>
        <div style={{ maxWidth: 720, margin: "0 auto" }}><TrackingWidget full /></div>
        <div style={{ marginTop: 90 }}>
          <Heading label="How It Works" title={<>TRACKING MADE <span className="tg">SIMPLE</span></>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {([
              { step: "01", icon: Package, title: "Get Your Code", desc: "Receive a unique tracking code when you book." },
              { step: "02", icon: Search, title: "Enter Code", desc: "Paste your code in the search field above." },
              { step: "03", icon: Eye, title: "Track Live", desc: "Watch your package move across Nigeria." },
              { step: "04", icon: CheckCircle, title: "Delivered!", desc: "Get notified the moment it arrives." },
            ]).map((s, i) => (
              <div key={i} className="anim" style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: `${C.orange500}10`, lineHeight: 1, marginBottom: 14 }}>{s.step}</div>
                <div style={{ width: 58, height: 58, borderRadius: 18, background: `${C.orange500}10`, border: `1px solid ${C.orange500}1A`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <s.icon size={24} color={C.orange400} />
                </div>
                <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: C.white, letterSpacing: ".02em", marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:768px){div[style*="repeat(4, 1fr)"]{grid-template-columns:1fr 1fr!important}}`}</style>
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════ FOOTER ═══════════════ */
function Footer({ setPage }: { setPage: (p: string) => void }) {
  const go = (p: string) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <footer style={{ background: C.navy900, borderTop: `1px solid ${C.navy700}`, padding: "68px 28px 36px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 48, marginBottom: 52 }}>
          <div>
            <Logo />
            <p style={{ color: C.gray500, fontSize: 14, lineHeight: 1.75, marginTop: 22, maxWidth: 280 }}>
              Nigeria's trusted logistics partner. Speed, reliability, and peace of mind across 36 states.
            </p>
          </div>
          {([
            { t: "Company", links: [["About Us", "about"], ["Services", "services"], ["Track", "track"], ["Contact", "contact"]] },
            { t: "Services", links: [["Same-Day Express", "services"], ["Interstate", "services"], ["Business Solutions", "services"], ["Insured Shipping", "services"]] },
            { t: "Coverage", links: [["Lagos", ""], ["Abuja", ""], ["Port Harcourt", ""], ["Nationwide", ""]] },
          ]).map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "'Bebas Neue'", fontSize: 16, color: C.white, marginBottom: 22, letterSpacing: ".1em" }}>{col.t}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {col.links.map(([label, page], j) => (
                  <span key={j} onClick={() => page && go(page)} style={{ color: C.gray500, fontSize: 14, cursor: page ? "pointer" : "default", transition: "color .2s" }}
                    onMouseEnter={e => page && ((e.target as HTMLElement).style.color = C.orange400)}
                    onMouseLeave={e => page && ((e.target as HTMLElement).style.color = C.gray500)}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.navy700}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ color: C.gray500, fontSize: 12 }}>© 2026 SOSASA Logistics Services Limited. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map(t => <span key={t} style={{ color: C.gray500, fontSize: 12, cursor: "pointer" }}>{t}</span>)}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){footer div[style*="1.6fr"]{grid-template-columns:1fr 1fr!important}}`}</style>
    </footer>
  );
}

/* ═══════════════ APP ═══════════════ */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("home");

  const pages: Record<string, ReactNode> = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage />,
    services: <ServicesPage setPage={setPage} />,
    contact: <ContactPage />,
    track: <TrackPage />,
  };

  return (
    <div style={{ background: C.navy950, minHeight: "100vh", color: C.white }}>
      <GlobalStyles />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar page={page} setPage={setPage} />
          {pages[page] || pages.home}
          <Footer setPage={setPage} />
        </>
      )}
    </div>
  );
}
