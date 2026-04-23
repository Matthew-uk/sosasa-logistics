import { C } from "../_lib/tokens";

export default function GlobalStyles() {
  return (
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

    .btn-p{background:linear-gradient(135deg,${C.orange500},${C.orange600});color:#fff;border:none;padding:15px 34px;border-radius:14px;font-family:'Lexend';font-weight:700;font-size:15px;cursor:pointer;transition:all .35s;display:inline-flex;align-items:center;gap:10px;position:relative;overflow:hidden;text-decoration:none}
    .btn-p:hover{transform:translateY(-3px);box-shadow:0 12px 40px ${C.orange500}55}
    .btn-o{background:transparent;color:#fff;border:2px solid ${C.orange500}33;padding:13px 30px;border-radius:14px;font-family:'Lexend';font-weight:600;font-size:15px;cursor:pointer;transition:all .35s;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
    .btn-o:hover{border-color:${C.orange500};background:${C.orange500}11;transform:translateY(-3px)}

    .img-cover{width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.16,1,.3,1)}

    @media(max-width:768px){.hide-m{display:none!important}.mob-menu-btn{display:flex!important}}
  `}</style>
  );
}
