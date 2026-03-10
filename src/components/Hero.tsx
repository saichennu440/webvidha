import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, MousePointer2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    // Grid nodes
    const cols = Math.ceil(W / 80) + 1;
    const rows = Math.ceil(H / 80) + 1;
    type Node = { bx: number; by: number; x: number; y: number; vx: number; vy: number };
    const nodes: Node[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        nodes.push({ bx: c * 80, by: r * 80, x: c * 80, y: r * 80, vx: 0, vy: 0 });
      }
    }

    // Shooting stars
    type Star = { x: number; y: number; len: number; speed: number; alpha: number; angle: number };
    const stars: Star[] = Array.from({ length: 6 }, () => ({
      x: Math.random() * W, y: Math.random() * H * 0.5,
      len: Math.random() * 120 + 60, speed: Math.random() * 4 + 3,
      alpha: 0, angle: Math.PI / 5,
    }));

    let time = 0;
    const draw = () => {
      time += 0.012;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Animate nodes
      nodes.forEach(n => {
        const dx = mx - n.bx;
        const dy = my - n.by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 120 - dist) / 120;
        n.vx += (n.bx - n.x) * 0.08 + (dx / dist || 0) * force * 3;
        n.vy += (n.by - n.y) * 0.08 + (dy / dist || 0) * force * 3;
        n.vx *= 0.75; n.vy *= 0.75;
        n.x += n.vx; n.y += n.vy;
      });

      // Draw grid lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const n = nodes[i];
          if (c < cols - 1) {
            const nr = nodes[i + 1];
            const alpha = 0.06 + Math.sin(time + c * 0.3 + r * 0.2) * 0.03;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nr.x, nr.y);
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
          if (r < rows - 1) {
            const nb = nodes[i + cols];
            const alpha = 0.06 + Math.sin(time + r * 0.3 + c * 0.2) * 0.03;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
          // Nodes dots
          const ddx = mx - n.x, ddy = my - n.y;
          const dd = Math.sqrt(ddx * ddx + ddy * ddy);
          const bright = Math.max(0, 1 - dd / 160);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.5 + bright * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96,165,250,${0.15 + bright * 0.7})`;
          ctx.fill();
        }
      }

      // Shooting stars
      stars.forEach(s => {
        s.alpha += 0.04;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        if (s.alpha > 1) s.alpha = 1;
        if (s.x > W + 200 || s.y > H) {
          s.x = Math.random() * W * 0.7;
          s.y = Math.random() * H * 0.3 - 50;
          s.alpha = 0;
          s.len = Math.random() * 120 + 60;
          s.speed = Math.random() * 4 + 3;
        }
        const grad = ctx.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );
        grad.addColorStop(0, `rgba(255,255,255,${s.alpha * 0.9})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

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
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const words = (t('hero_title') as string).split(' ');

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #000510 0%, #050d20 40%, #071428 70%, #030810 100%)',
      overflow: 'hidden', color: 'white',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes wordReveal {
          from { opacity:0; transform: translateY(60px) rotateX(-40deg); filter:blur(8px); }
          to   { opacity:1; transform: translateY(0)   rotateX(0deg);   filter:blur(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes badgePop {
          0%   { opacity:0; transform:scale(0.7) translateY(-10px); }
          70%  { transform:scale(1.05) translateY(0); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes glowBreath {
          0%,100% { opacity:0.5; transform:scale(1); }
          50%     { opacity:0.9; transform:scale(1.08); }
        }
        @keyframes scrollBounce {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(8px); }
        }
        @keyframes statIn {
          from { opacity:0; transform:translateX(-20px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes numberCount {
          from { opacity:0; transform:scale(0.5); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes borderPulse {
          0%,100% { border-color: rgba(59,130,246,0.3); }
          50%     { border-color: rgba(96,165,250,0.7); }
        }
        .cta-primary { transition: all 0.35s cubic-bezier(0.23,1,0.32,1); }
        .cta-primary:hover {
          transform: translateY(-4px) scale(1.04) !important;
          box-shadow: 0 20px 60px rgba(59,130,246,0.6) !important;
        }
        .cta-secondary { transition: all 0.35s cubic-bezier(0.23,1,0.32,1); }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.1) !important;
          transform: translateY(-4px) !important;
          border-color: rgba(255,255,255,0.5) !important;
        }
        .stat-item:hover .stat-num {
          text-shadow: 0 0 30px rgba(96,165,250,0.9) !important;
          transform: scale(1.1);
        }
        .stat-num { transition: all 0.3s ease; display:inline-block; }
      `}</style>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }} />

      {/* Ambient glows */}
      <div style={{ position:'absolute', width:800, height:800, borderRadius:'50%', background:'radial-gradient(circle, rgba(29,78,216,0.14) 0%, transparent 65%)', top:'-20%', left:'-15%', zIndex:0, animation:'glowBreath 8s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 65%)', bottom:'-15%', right:'-10%', zIndex:0, animation:'glowBreath 10s ease-in-out infinite 2s', pointerEvents:'none' }} />

      {/* Vertical lines */}
      {[15, 35, 65, 85].map((left, i) => (
        <div key={i} style={{
          position:'absolute', top:0, bottom:0, left:`${left}%`, width:1,
          background:`linear-gradient(to bottom, transparent, rgba(59,130,246,${0.04 + i * 0.01}), transparent)`,
          zIndex:0, pointerEvents:'none',
        }} />
      ))}

      {/* Main content */}
      <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:1100, margin:'0 auto', padding:'120px 32px 80px', textAlign:'center' }}>

        {/* Badge */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8,
          padding:'9px 22px', borderRadius:99, marginBottom:48,
          background:'rgba(59,130,246,0.07)',
          border:'1px solid rgba(59,130,246,0.25)',
          backdropFilter:'blur(16px)',
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'badgePop 0.7s cubic-bezier(0.23,1,0.32,1) forwards' : 'none',
        }}>
          <Sparkles size={13} color="#60a5fa" />
          <span style={{ fontSize:12, color:'#93c5fd', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' }}>
            Full-Stack Web Development Agency
          </span>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#3b82f6', animation:'glowBreath 2s infinite' }} />
        </div>

        {/* Word-by-word title */}
        <h1 style={{
          fontFamily:" 'Syne', sans-serif",
          fontSize:'clamp(3rem, 8vw, 6.5rem)',
          fontWeight:800, lineHeight:1.0,
          letterSpacing:'-0.04em', marginBottom:0,
          perspective:800,
        }}>
          {words.map((word, i) => (
            <span key={i} style={{ display:'inline-block', overflow:'hidden', marginRight:'0.25em', verticalAlign:'bottom' }}>
              <span style={{
                display:'inline-block',
                opacity: loaded ? 1 : 0,
                animation: loaded ? `wordReveal 0.8s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.12}s both` : 'none',
                background: i % 3 === 2
                  ? 'linear-gradient(135deg,#60a5fa,#3b82f6)'
                  :'none',
                WebkitBackgroundClip: i % 3 === 2 ? 'text' : undefined,
                WebkitTextFillColor: i % 3 === 2 ? 'transparent' : undefined,
              }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Animated underline */}
        <div style={{
          height:3, width:160, margin:'24px auto 32px',
          background:'linear-gradient(90deg,#1d4ed8,#60a5fa,#93c5fd)',
          borderRadius:99, transformOrigin:'left',
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'lineGrow 1s cubic-bezier(0.23,1,0.32,1) 0.9s both' : 'none',
        }} />

        {/* Subtitle */}
        <p style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'clamp(1.1rem,2.5vw,1.4rem)', color:'#7dd3fc',
          fontWeight:500, marginBottom:16,
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'fadeSlideUp 0.8s ease 1.1s both' : 'none',
        }}>
          {t('hero_subtitle')}
        </p>

        <p style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize:'clamp(0.9rem,1.8vw,1.1rem)', color:'#64748b',
          maxWidth:580, margin:'0 auto 48px', lineHeight:1.8,
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'fadeSlideUp 0.8s ease 1.25s both' : 'none',
        }}>
          {t('hero_description')}
        </p>

        {/* CTAs */}
        <div style={{
          display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:80,
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'fadeSlideUp 0.8s ease 1.4s both' : 'none',
        }}>
          <button className="cta-primary" onClick={() => scrollToSection('contact')} style={{
            display:'flex', alignItems:'center', gap:10,
            padding:'15px 38px', borderRadius:10,
            background:'linear-gradient(135deg,#1e40af,#2563eb,#3b82f6)',
            color:'white', fontWeight:700, fontSize:14,
            border:'none', cursor:'pointer',
            boxShadow:'0 8px 32px rgba(37,99,235,0.45)',
            letterSpacing:'0.04em', textTransform:'uppercase',
            fontFamily:"'DM Sans', sans-serif",
          }}>
            {t('hero_cta_primary')} <ArrowRight size={16} />
          </button>

          <button className="cta-secondary" onClick={() => scrollToSection('portfolio')} style={{
            padding:'15px 38px', borderRadius:10,
            background:'transparent',
            color:'#e2e8f0', fontWeight:600, fontSize:14,
            border:'1px solid rgba(255,255,255,0.2)',
            cursor:'pointer',
            letterSpacing:'0.04em', textTransform:'uppercase',
            fontFamily:"'DM Sans', sans-serif",
          }}>
            {t('hero_cta_secondary')}
          </button>
        </div>

        {/* Stats — horizontal with dividers */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'center',
          gap:0, flexWrap:'wrap',
          opacity: loaded ? 1 : 0,
          animation: loaded ? 'fadeSlideUp 0.8s ease 1.6s both' : 'none',
          padding:'28px 40px',
          background:'rgba(255,255,255,0.02)',
          border:'1px solid rgba(59,130,246,0.12)',
          borderRadius:20, backdropFilter:'blur(20px)',
          maxWidth:720, margin:'0 auto',
          animation: loaded ? 'fadeSlideUp 0.8s ease 1.6s both, borderPulse 4s ease-in-out infinite 2s' : 'none',
        }}>
          {[
            { value:'50+', label: t('trust_clients') },
            { value:'100+', label: t('trust_projects') },
            { value:'5+', label: t('trust_experience') },
            { value:'98%', label: t('trust_satisfaction') },
          ].map((s, i) => (
            <>
              <div key={i} className="stat-item" style={{ flex:1, textAlign:'center', padding:'0 24px', minWidth:120 }}>
                <div className="stat-num" style={{
                  fontFamily:"'Syne', sans-serif",
                  fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:800,
                  color:'#60a5fa', lineHeight:1,
                  textShadow:'0 0 20px rgba(96,165,250,0.4)',
                  animation: loaded ? `numberCount 0.6s cubic-bezier(0.23,1,0.32,1) ${1.6 + i * 0.15}s both` : 'none',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize:11, color:'#475569', marginTop:6,
                  fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase',
                  fontFamily:"'DM Sans', sans-serif",
                }}>
                  {s.label}
                </div>
              </div>
              {i < 3 && (
                <div key={`div-${i}`} style={{ width:1, height:48, background:'rgba(59,130,246,0.15)', flexShrink:0 }} />
              )}
            </>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          marginTop:56, display:'flex', flexDirection:'column', alignItems:'center', gap:8,
          opacity: loaded ? 0.4 : 0,
          animation: loaded ? 'fadeSlideUp 0.8s ease 2s both' : 'none',
        }}>
          <span style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#475569', fontFamily:"'DM Sans', sans-serif" }}>Scroll</span>
          <div style={{ width:1, height:40, background:'linear-gradient(to bottom, rgba(59,130,246,0.6), transparent)', animation:'scrollBounce 2s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:140, background:'linear-gradient(to top,white,transparent)', zIndex:5, pointerEvents:'none' }} />
    </section>
  );
}