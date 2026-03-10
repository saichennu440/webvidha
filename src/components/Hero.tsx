import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -999, y: -999 });
  const [loaded, setLoaded] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let time = 0;

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouse);

    // Flowing lava-lamp style blobs
    type Blob = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const blobs: Blob[] = Array.from({ length: 7 }, (_, i) => ({
      x: (W / 7) * i + W / 14,
      y: H * 0.3 + Math.random() * H * 0.4,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 220 + 160,
      hue: 210 + Math.random() * 30,
    }));

    // Bright stars
    type Star = { x: number; y: number; r: number; phase: number; speed: number };
    const stars: Star[] = Array.from({ length: 220 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.pow(Math.random(), 3) * 2.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.025 + 0.005,
    }));

    // DNA-helix style data streams on the sides
    type Stream = { x: number; offset: number; color: string };
    const streams: Stream[] = [
      { x: W * 0.05,  offset: 0,   color: '59,130,246' },
      { x: W * 0.95,  offset: 2.1, color: '34,211,238' },
      { x: W * 0.08,  offset: 1.0, color: '99,102,241' },
      { x: W * 0.92,  offset: 3.2, color: '59,130,246' },
    ];

    // Floating code chars
    type CodeChar = { x: number; y: number; char: string; alpha: number; speed: number; size: number };
    const chars = ['<', '>', '/', '{', '}', ';', '(', ')', '=', '0', '1'];
    const codeChars: CodeChar[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      char: chars[Math.floor(Math.random() * chars.length)],
      alpha: Math.random() * 0.12 + 0.03,
      speed: Math.random() * 0.3 + 0.1,
      size: Math.random() * 10 + 8,
    }));

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, W, H);

      // Rich deep background gradient
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   '#000b1e');
      bg.addColorStop(0.35,'#001030');
      bg.addColorStop(0.7, '#000c24');
      bg.addColorStop(1,   '#00060f');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Moving blobs - metaball-like glow
      blobs.forEach(b => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < -b.r) b.x = W + b.r;
        if (b.x > W + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = H + b.r;
        if (b.y > H + b.r) b.y = -b.r;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0,   `hsla(${b.hue},90%,55%,0.12)`);
        g.addColorStop(0.4, `hsla(${b.hue},80%,45%,0.06)`);
        g.addColorStop(1,   'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Mouse reactive spotlight
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      if (mx > 0) {
        const ms = ctx.createRadialGradient(mx, my, 0, mx, my, 350);
        ms.addColorStop(0,   'rgba(59,130,246,0.08)');
        ms.addColorStop(0.5, 'rgba(37,99,235,0.03)');
        ms.addColorStop(1,   'transparent');
        ctx.fillStyle = ms;
        ctx.fillRect(0, 0, W, H);
      }

      // Stars with twinkle
      stars.forEach(s => {
        s.phase += s.speed;
        const a = 0.4 + Math.sin(s.phase) * 0.35;
        const r = s.r * (0.8 + Math.sin(s.phase * 0.7) * 0.2);
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,230,255,${a})`;
        ctx.fill();
        if (s.r > 1.4) {
          ctx.strokeStyle = `rgba(180,210,255,${a * 0.4})`;
          ctx.lineWidth = 0.5;
          const arm = s.r * 3;
          ctx.beginPath(); ctx.moveTo(s.x - arm, s.y); ctx.lineTo(s.x + arm, s.y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(s.x, s.y - arm); ctx.lineTo(s.x, s.y + arm); ctx.stroke();
        }
      });

      // Side data streams
      streams.forEach(s => {
        for (let i = 0; i < 12; i++) {
          const y = ((time * 80 + s.offset * 100 + i * 55) % (H + 100)) - 50;
          const a = 0.4 + Math.sin(time * 2 + i) * 0.2;
          const grad = ctx.createLinearGradient(0, y - 30, 0, y + 30);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(0.5, `rgba(${s.color},${a})`);
          grad.addColorStop(1, 'transparent');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(s.x, y - 30);
          ctx.lineTo(s.x, y + 30);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(s.x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.color},${a * 0.8})`;
          ctx.fill();
        }
      });

      // Floating code chars
      codeChars.forEach(c => {
        c.y -= c.speed;
        if (c.y < -20) { c.y = H + 20; c.x = Math.random() * W; }
        ctx.font = `${c.size}px monospace`;
        ctx.fillStyle = `rgba(96,165,250,${c.alpha})`;
        ctx.fillText(c.char, c.x, c.y);
      });

      // Horizontal scanlines (very subtle)
      ctx.fillStyle = 'rgba(0,0,20,0.025)';
      for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);

      // Bottom aurora horizon
      const horizon = ctx.createLinearGradient(0, H * 0.75, 0, H);
      horizon.addColorStop(0, 'transparent');
      horizon.addColorStop(0.5, `rgba(37,99,235,${0.06 + Math.sin(time) * 0.02})`);
      horizon.addColorStop(1, `rgba(29,78,216,${0.12 + Math.sin(time * 0.7) * 0.03})`);
      ctx.fillStyle = horizon;
      ctx.fillRect(0, H * 0.75, W, H * 0.25);

      // Central radial glow behind content
      const cg = ctx.createRadialGradient(W/2, H*0.44, 0, W/2, H*0.44, 500);
      cg.addColorStop(0,   `rgba(37,99,235,${0.14 + Math.sin(time*0.5)*0.04})`);
      cg.addColorStop(0.3, `rgba(29,78,216,${0.06 + Math.sin(time*0.4)*0.02})`);
      cg.addColorStop(1,   'transparent');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const stats = [
    { value: '50+',  label: t('trust_clients') },
    { value: '100+', label: t('trust_projects') },
    { value: '5+',   label: t('trust_experience') },
    { value: '98%',  label: t('trust_satisfaction') },
  ];

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

        @keyframes fadeRise {
          from { opacity:0; transform:translateY(48px) scale(0.97); filter:blur(8px); }
          to   { opacity:1; transform:translateY(0)    scale(1);    filter:blur(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes glowBreathe {
          0%,100% { opacity:0.55; transform:scale(1); }
          50%     { opacity:1;    transform:scale(1.12); }
        }
        @keyframes badgeIn {
          from { opacity:0; transform:scale(0.75) translateY(-12px); }
          70%  { transform:scale(1.05); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes titleIn {
          from { opacity:0; transform:translateY(90px) skewY(4deg); filter:blur(6px); }
          to   { opacity:1; transform:translateY(0)    skewY(0deg); filter:blur(0); }
        }
        @keyframes lineGrow {
          from { width:0; opacity:0; }
          to   { width:100%; opacity:1; }
        }
        @keyframes dotPulse {
          0%,100% { transform:scale(1);    opacity:0.8; }
          50%     { transform:scale(1.6);  opacity:1; }
        }
        @keyframes statPop {
          from { opacity:0; transform:translateY(30px) scale(0.85); }
          to   { opacity:1; transform:translateY(0)    scale(1); }
        }
        @keyframes orbFloat {
          0%,100% { transform:translateY(0) rotate(0deg); }
          33%     { transform:translateY(-18px) rotate(3deg); }
          66%     { transform:translateY(-10px) rotate(-2deg); }
        }
        @keyframes ringSpinCW  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes ringSpinCCW { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position:-200% center; }
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 13vw, 11rem);
          line-height: 0.88;
          letter-spacing: 0.01em;
          background: linear-gradient(170deg, #ffffff 0%, #dbeafe 25%, #93c5fd 55%, #3b82f6 80%, #1d4ed8 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 6s linear infinite;
        }

        .hero-title-accent {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 13vw, 11rem);
          line-height: 0.88;
          letter-spacing: 0.01em;
          background: linear-gradient(135deg, #22d3ee, #60a5fa, #818cf8, #22d3ee);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .cta-primary {
          font-family: 'Inter', sans-serif;
          display:flex; align-items:center; gap:10px;
          padding: 18px 46px; border-radius:14px;
          background: linear-gradient(135deg, #1e3a8a, #1d4ed8, #2563eb, #3b82f6);
          color:white; font-weight:700; font-size:14px;
          border: 1px solid rgba(147,197,253,0.3);
          cursor:pointer; letter-spacing:0.06em; text-transform:uppercase;
          box-shadow: 0 0 0 1px rgba(37,99,235,0.3), 0 8px 40px rgba(37,99,235,0.55), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
          position:relative; overflow:hidden;
        }
        .cta-primary::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg,rgba(255,255,255,0.1),transparent);
          pointer-events:none;
        }
        .cta-primary:hover {
          transform: translateY(-5px) scale(1.04) !important;
          box-shadow: 0 0 0 2px rgba(99,179,237,0.6), 0 20px 70px rgba(37,99,235,0.75), inset 0 1px 0 rgba(255,255,255,0.2) !important;
        }
        .cta-secondary {
          font-family: 'Inter', sans-serif;
          padding:18px 46px; border-radius:14px;
          background: rgba(255,255,255,0.04);
          color:#cbd5e1; font-weight:600; font-size:14px;
          border:1px solid rgba(255,255,255,0.13);
          cursor:pointer; letter-spacing:0.06em; text-transform:uppercase;
          backdrop-filter:blur(20px);
          transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .cta-secondary:hover {
          background: rgba(59,130,246,0.12) !important;
          border-color: rgba(96,165,250,0.45) !important;
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 40px rgba(59,130,246,0.2) !important;
        }
        .stat-card {
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          cursor:default;
        }
        .stat-card:hover {
          transform: translateY(-8px) scale(1.06) !important;
          border-color: rgba(99,179,237,0.5) !important;
          box-shadow: 0 16px 50px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.08) !important;
        }
      `}</style>

      {/* FULL COVERAGE CANVAS */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
        display: 'block',
      }} />

      {/* Large decorative floating orbs */}
      <div style={{ position:'absolute', zIndex:1, top:'12%', right:'7%', pointerEvents:'none', animation:'orbFloat 7s ease-in-out infinite' }}>
        <div style={{
          width:140, height:140, borderRadius:'50%',
          background:'radial-gradient(circle at 35% 35%, rgba(59,130,246,0.4) 0%, rgba(29,78,216,0.15) 50%, transparent 100%)',
          border:'1px solid rgba(99,179,237,0.3)',
          boxShadow:'0 0 50px rgba(37,99,235,0.3), 0 0 100px rgba(37,99,235,0.1), inset 0 0 40px rgba(37,99,235,0.1)',
          animation:'ringSpinCW 30s linear infinite',
          position:'relative',
        }}>
          <div style={{ position:'absolute', inset:16, borderRadius:'50%', border:'1px dashed rgba(147,197,253,0.25)', animation:'ringSpinCCW 20s linear infinite' }} />
          <div style={{ position:'absolute', top:'10%', left:'50%', transform:'translateX(-50%)', width:8, height:8, borderRadius:'50%', background:'#60a5fa', boxShadow:'0 0 16px #60a5fa, 0 0 32px rgba(96,165,250,0.6)' }} />
        </div>
      </div>

      <div style={{ position:'absolute', zIndex:1, bottom:'22%', left:'6%', pointerEvents:'none', animation:'orbFloat 9s ease-in-out infinite 1.5s' }}>
        <div style={{
          width:100, height:100, borderRadius:'50%',
          background:'radial-gradient(circle at 35% 35%, rgba(34,211,238,0.3) 0%, rgba(6,182,212,0.1) 50%, transparent 100%)',
          border:'1px solid rgba(34,211,238,0.25)',
          boxShadow:'0 0 40px rgba(34,211,238,0.2), inset 0 0 30px rgba(34,211,238,0.08)',
          animation:'ringSpinCCW 25s linear infinite',
          position:'relative',
        }}>
          <div style={{ position:'absolute', top:'8%', left:'50%', transform:'translateX(-50%)', width:6, height:6, borderRadius:'50%', background:'#22d3ee', boxShadow:'0 0 14px #22d3ee' }} />
        </div>
      </div>

      <div style={{ position:'absolute', zIndex:1, top:'55%', right:'4%', pointerEvents:'none', animation:'orbFloat 6s ease-in-out infinite 3s' }}>
        <div style={{
          width:65, height:65, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(129,140,248,0.25) 0%, transparent 70%)',
          border:'1px solid rgba(129,140,248,0.2)',
          boxShadow:'0 0 25px rgba(129,140,248,0.2)',
        }} />
      </div>

      {/* MAIN CONTENT */}
      <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:1000, margin:'0 auto', padding:'120px 32px 80px', textAlign:'center' }}>

        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:10,
          padding:'10px 26px', borderRadius:99, marginBottom:44,
          background:'linear-gradient(135deg,rgba(37,99,235,0.15),rgba(34,211,238,0.07))',
          border:'1px solid rgba(59,130,246,0.32)',
          backdropFilter:'blur(24px)',
          boxShadow:'0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'badgeIn 0.8s cubic-bezier(0.23,1,0.32,1) 0.1s both' : 'none',
        }}>
          <Sparkles size={14} color="#22d3ee" />
          <span style={{ fontSize:11, color:'#7dd3fc', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:"'Inter',sans-serif" }}>
            Full-Stack Web Development Agency
          </span>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#22d3ee', display:'inline-block', boxShadow:'0 0 12px #22d3ee', animation:'dotPulse 2s infinite' }} />
        </div>

        {/* HUGE TITLE */}
        <div style={{ marginBottom:30, overflow:'hidden' }}>
          <div style={{
            opacity: loaded ? 1 : 0,
            animation: loaded ? 'titleIn 1s cubic-bezier(0.16,1,0.3,1) 0.25s both' : 'none',
          }}>
            {/* Line 1 */}
            <div style={{ display:'block' }}>
              <span className="hero-title">{t('hero_title').split(' ').slice(0,3).join(' ')}</span>
            </div>
            {/* Line 2 accent */}
            <div style={{ display:'block', marginTop:'-0.05em' }}>
              <span className="hero-title-accent">{t('hero_title').split(' ').slice(3).join(' ') || 'Solutions'}</span>
            </div>
          </div>
        </div>

        {/* Glowing separator */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:28,
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'fadeUp 0.7s ease 0.8s both' : 'none',
        }}>
          <div style={{ flex:1, maxWidth:120, height:1, background:'linear-gradient(90deg,transparent,rgba(59,130,246,0.7))' }} />
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            {[['#3b82f6','2s'],['#22d3ee','2.3s'],['#818cf8','2.6s']].map(([c,d],i)=>(
              <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:c as string, boxShadow:`0 0 14px ${c}, 0 0 28px ${c}55`, animation:`dotPulse 2s infinite ${d}` }} />
            ))}
          </div>
          <div style={{ flex:1, maxWidth:120, height:1, background:'linear-gradient(90deg,rgba(59,130,246,0.7),transparent)' }} />
        </div>

        {/* Subtitle */}
        <p style={{
          fontSize:'clamp(1.1rem,2.2vw,1.35rem)', color:'#7dd3fc', fontWeight:500,
          marginBottom:12, fontFamily:"'Inter',sans-serif",
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'fadeUp 0.7s ease 0.9s both' : 'none',
        }}>
          {t('hero_subtitle')}
        </p>
        <p style={{
          fontSize:'clamp(0.92rem,1.6vw,1.08rem)', color:'rgba(148,163,184,0.8)',
          maxWidth:560, margin:'0 auto 52px', lineHeight:1.9,
          fontFamily:"'Inter',sans-serif",
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'fadeUp 0.7s ease 1.05s both' : 'none',
        }}>
          {t('hero_description')}
        </p>

        {/* CTAs */}
        <div style={{
          display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:72,
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'fadeUp 0.7s ease 1.2s both' : 'none',
        }}>
          <button className="cta-primary" onClick={() => scrollToSection('contact')}>
            {t('hero_cta_primary')} <ArrowRight size={17} />
          </button>
          <button className="cta-secondary" onClick={() => scrollToSection('portfolio')}>
            {t('hero_cta_secondary')}
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(4,1fr)',
          gap:16, maxWidth:800, margin:'0 auto',
        }}>
          {stats.map((s,i) => (
            <div key={i} className="stat-card" style={{
              padding:'26px 14px', textAlign:'center',
              background:'linear-gradient(160deg,rgba(10,20,55,0.85),rgba(8,15,40,0.75))',
              border:'1px solid rgba(59,130,246,0.18)',
              borderRadius:20, backdropFilter:'blur(28px)',
              boxShadow:'0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
              opacity: loaded ? 1 : 0,
              animation: loaded ? `statPop 0.8s cubic-bezier(0.23,1,0.32,1) ${1.4+i*0.1}s both` : 'none',
              position:'relative', overflow:'hidden',
            }}>
              {/* Glow top accent */}
              <div style={{ position:'absolute', top:0, left:'20%', right:'20%', height:1, background:'linear-gradient(90deg,transparent,rgba(96,165,250,0.6),transparent)' }} />
              <div style={{
                fontSize:'clamp(2rem,4.5vw,2.8rem)', fontWeight:900, lineHeight:1,
                letterSpacing:'-0.03em', marginBottom:8,
                background:'linear-gradient(160deg,#ffffff,#93c5fd)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                fontFamily:"'Inter',sans-serif",
                textShadow:'none',
                filter:'drop-shadow(0 0 20px rgba(96,165,250,0.4))',
              }}>
                {s.value}
              </div>
              <div style={{ fontSize:10, color:'#475569', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:"'Inter',sans-serif" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to white */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:180, background:'linear-gradient(to top,white 0%,rgba(255,255,255,0.8) 40%,transparent 100%)', zIndex:5, pointerEvents:'none' }} />
    </section>
  );
}