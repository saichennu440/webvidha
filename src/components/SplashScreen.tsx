import { useState, useEffect, useRef } from "react";

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<"init" | "rings" | "logo" | "text" | "tagline" | "exit">("init");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
    const colors = ["#3b82f6", "#60a5fa", "#1d4ed8", "#93c5fd", "#0ea5e9"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#3b82f6";
            ctx.globalAlpha = (1 - dist / 100) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animFrameRef.current); window.removeEventListener("resize", resize); };
  }, []);

  // Phase orchestration
  useEffect(() => {
    const seq = [
      { phase: "rings" as const, delay: 100 },
      { phase: "logo" as const, delay: 600 },
      { phase: "text" as const, delay: 1300 },
      { phase: "tagline" as const, delay: 1900 },
      { phase: "exit" as const, delay: 3600 },
    ];
    const timers = seq.map(({ phase, delay }) => setTimeout(() => setPhase(phase), delay));
    const done = setTimeout(() => onComplete?.(), 4400);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onComplete]);

  const isExit = phase === "exit";

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column",
        background: "radial-gradient(ellipse at 60% 40%, #0c1e3d 0%, #060d1a 60%, #000 100%)",
        overflow: "hidden",
        transition: isExit ? "opacity 0.8s ease, transform 0.8s ease" : "none",
        opacity: isExit ? 0 : 1,
        transform: isExit ? "scale(1.04)" : "scale(1)",
        pointerEvents: isExit ? "none" : "all",
        fontFamily: "Splash",
      }}
    >
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Onest:wght@100..900&family=Splash&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
        @keyframes ringExpand {
          0% { transform: scale(0); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes logoReveal {
          0% { opacity: 0; transform: scale(0.6) rotate(-8deg); filter: blur(20px); }
          60% { opacity: 1; transform: scale(1.08) rotate(1deg); filter: blur(0); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0); }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(59,130,246,0.7)) drop-shadow(0 0 40px rgba(29,78,216,0.4)); }
          50% { filter: drop-shadow(0 0 32px rgba(96,165,250,1)) drop-shadow(0 0 70px rgba(59,130,246,0.6)); }
        }
        @keyframes textSlide {
          0% { opacity: 0; transform: translateY(18px) skewX(-4deg); letter-spacing: 0.35em; }
          100% { opacity: 1; transform: translateY(0) skewX(0); letter-spacing: 0.18em; }
        }
        @keyframes tagFade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes shimmerBar {
          0% { left: -60%; }
          100% { left: 110%; }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.04); }
        }
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinRingRev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Scan line effect */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.6), transparent)",
        animation: "scanline 3s linear infinite", pointerEvents: "none",
      }} />

      {/* Background orbs */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)",
        top: "10%", left: "20%", animation: "orbFloat 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
        bottom: "15%", right: "15%", animation: "orbFloat 8s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />

      {/* Rings burst */}
      {phase !== "init" && [0, 1, 2].map(i => (
        <div key={i} style={{
          position: "absolute",
          width: 200, height: 200,
          borderRadius: "50%",
          border: `1.5px solid rgba(59,130,246,${0.6 - i * 0.15})`,
          animation: `ringExpand ${1.2 + i * 0.3}s cubic-bezier(0.2,0.8,0.4,1) ${i * 0.15}s forwards`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Spinning decorative rings */}
      {phase === "logo" || phase === "text" || phase === "tagline" ? (
        <>
          <div style={{
            position: "absolute",
            width: 220, height: 220, borderRadius: "50%",
            border: "1px dashed rgba(59,130,246,0.25)",
            animation: "spinRing 12s linear infinite",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            width: 280, height: 280, borderRadius: "50%",
            border: "1px solid rgba(96,165,250,0.12)",
            animation: "spinRingRev 18s linear infinite",
            pointerEvents: "none",
          }}>
            {/* Ring dots */}
            {[0, 90, 180, 270].map(deg => (
              <div key={deg} style={{
                position: "absolute", width: 5, height: 5, borderRadius: "50%",
                background: "#3b82f6", opacity: 0.7,
                top: "50%", left: "50%",
                transform: `rotate(${deg}deg) translateX(140px) translateY(-50%)`,
              }} />
            ))}
          </div>
        </>
      ) : null}

      {/* LOGO */}
      {(phase === "logo" || phase === "text" || phase === "tagline") && (
        <div style={{
          position: "relative", zIndex: 10,
          animation: "logoReveal 0.9s cubic-bezier(0.23,1,0.32,1) forwards, glowPulse 2.5s ease-in-out 1s infinite",
          marginBottom: 28,
        }}>
          {/* Glow plate behind logo */}
          <div style={{
            position: "absolute", inset: -20,
            background: "radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }} />
          <img
            src="/webvidha-high-resolution-logo-transparent.png"
            alt="WebVidha"
            style={{ width: 260, height: "auto", position: "relative", display: "block" }}
          />
        </div>
      )}

      {/* Brand name text */}
      {(phase === "text" || phase === "tagline") && (
        <div style={{
          position: "relative", zIndex: 10, textAlign: "center",
          animation: "textSlide 0.7s cubic-bezier(0.23,1,0.32,1) forwards",
          marginBottom: 10,
          overflow: "hidden",
        }}>
          {/* Shimmer over text */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: "60%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            animation: "shimmerBar 1.8s ease 0.2s forwards",
            pointerEvents: "none",
          }} />
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(13px, 2.5vw, 15px)",
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "#60a5fa",
            textTransform: "uppercase",
          }}>
            Full-Stack Web Development
          </div>
        </div>
      )}

      {/* Tagline */}
      {phase === "tagline" && (
        <div style={{
          position: "relative", zIndex: 10, textAlign: "center",
          animation: "tagFade 0.6s ease forwards",
          marginTop: 6,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            justifyContent: "center",
          }}>
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5))" }} />
            <span style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "clamp(11px, 2vw, 13px)",
              fontWeight: 300,
              color: "rgba(148,163,184,0.9)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              Building the Web, One Vision at a Time
            </span>
            <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, rgba(59,130,246,0.5), transparent)" }} />
          </div>

          {/* Progress bar */}
          <div style={{
            marginTop: 40,
            width: 180, height: 2,
            background: "rgba(255,255,255,0.07)",
            borderRadius: 99, overflow: "hidden",
            margin: "40px auto 0",
          }}>
            <div style={{
              height: "100%", borderRadius: 99,
              background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
              animation: "progressFill 1.8s cubic-bezier(0.4,0,0.2,1) forwards",
              boxShadow: "0 0 10px rgba(96,165,250,0.6)",
            }} />
          </div>
          <div style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: 10, color: "rgba(96,165,250,0.6)",
            letterSpacing: "0.2em", marginTop: 10,
            textTransform: "uppercase",
          }}>
            Loading...
          </div>
        </div>
      )}

      {/* Corner accents */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <div key={i} style={{
          position: "absolute",
          [pos.includes("top") ? "top" : "bottom"]: 20,
          [pos.includes("left") ? "left" : "right"]: 20,
          width: 20, height: 20,
          borderTop: pos.includes("top") ? "1.5px solid rgba(59,130,246,0.4)" : "none",
          borderBottom: pos.includes("bottom") ? "1.5px solid rgba(59,130,246,0.4)" : "none",
          borderLeft: pos.includes("left") ? "1.5px solid rgba(59,130,246,0.4)" : "none",
          borderRight: pos.includes("right") ? "1.5px solid rgba(59,130,246,0.4)" : "none",
          pointerEvents: "none",
        }} />
      ))}
    </div>
  );
}