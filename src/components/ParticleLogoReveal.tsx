import { useEffect, useRef, useState } from "react";

interface ParticleLogoRevealProps {
  logoSrc: string;
  onComplete: () => void;
}

export default function ParticleLogoReveal({ logoSrc, onComplete }: ParticleLogoRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [phase, setPhase] = useState<"running" | "fading" | "done">("running");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // ── Load logo, sample its pixels ──────────────────────────────
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logoSrc;

    img.onload = () => {
      // Render logo into an offscreen canvas to sample pixels
      const LOGO_W = Math.min(520, W * 0.62);
      const LOGO_H = (img.naturalHeight / img.naturalWidth) * LOGO_W;
      const logoX = (W - LOGO_W) / 2;
      const logoY = (H - LOGO_H) / 2;

      const offscreen = document.createElement("canvas");
      offscreen.width = LOGO_W;
      offscreen.height = LOGO_H;
      const oc = offscreen.getContext("2d")!;
      oc.drawImage(img, 0, 0, LOGO_W, LOGO_H);
      const imageData = oc.getImageData(0, 0, LOGO_W, LOGO_H);
      const pixels = imageData.data;

      // Sample target positions from non-transparent pixels
      type Target = { x: number; y: number; r: number; g: number; b: number };
      const targets: Target[] = [];
      const step = 3; // sample every N pixels for density
      for (let py = 0; py < LOGO_H; py += step) {
        for (let px = 0; px < LOGO_W; px += step) {
          const idx = (py * LOGO_W + px) * 4;
          const alpha = pixels[idx + 3];
          if (alpha > 60) {
            targets.push({
              x: logoX + px,
              y: logoY + py,
              r: pixels[idx],
              g: pixels[idx + 1],
              b: pixels[idx + 2],
            });
          }
        }
      }

      // ── Build particles ──────────────────────────────────────────
      type Particle = {
        x: number; y: number;
        tx: number; ty: number;   // target
        vx: number; vy: number;
        r: number; g: number; b: number;
        size: number;
        scatter: number;          // how scattered it starts
        delay: number;
        assembled: boolean;
      };

      const EXTRA = 300; // extra ambient particles (never assemble)
      const particles: Particle[] = targets.map((t) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 200 + Math.random() * Math.max(W, H) * 0.55;
        return {
          x: t.x + Math.cos(angle) * dist,
          y: t.y + Math.sin(angle) * dist,
          tx: t.x,
          ty: t.y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          r: t.r, g: t.g, b: t.b,
          size: 1 + Math.random() * 2,
          scatter: dist,
          delay: Math.floor(Math.random() * 55),
          assembled: false,
        };
      });

      // extra ambient drifters
      for (let i = 0; i < EXTRA; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          tx: -999, ty: -999,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          r: 200 + Math.random() * 55,
          g: 200 + Math.random() * 55,
          b: 200 + Math.random() * 55,
          size: 0.6 + Math.random() * 1.2,
          scatter: 0,
          delay: 0,
          assembled: false,
        });
      }

      // ── Animation loop ───────────────────────────────────────────
      let frame = 0;
      // Phases: 0-60 = chaotic scatter, 60-180 = gather, 180-260 = hold, 260+ = fade
      const SCATTER_END = 60;
      const GATHER_END  = 200;
      const HOLD_END    = 290;

      function tick() {
        ctx!.fillStyle = "rgba(0,0,0,0.18)";
        ctx!.fillRect(0, 0, W, H);

        frame++;

        for (const p of particles) {
          const isAmbient = p.tx === -999;

          if (isAmbient) {
            // drift freely
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            const alpha = frame < SCATTER_END
              ? frame / SCATTER_END
              : frame > GATHER_END
              ? 1 - (frame - GATHER_END) / (HOLD_END - GATHER_END) * 0.8
              : 1;

            ctx!.beginPath();
            ctx!.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
            ctx!.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha * 0.5})`;
            ctx!.fill();
            continue;
          }

          if (frame < p.delay) continue;
          const f = frame - p.delay;

          if (f < SCATTER_END) {
            // chaotic drift outward
            p.vx += (Math.random() - 0.5) * 0.8;
            p.vy += (Math.random() - 0.5) * 0.8;
            p.vx *= 0.96;
            p.vy *= 0.96;
            p.x += p.vx;
            p.y += p.vy;
          } else {
            // magnetic pull toward target
            const progress = Math.min(1, (f - SCATTER_END) / (GATHER_END - SCATTER_END + 40));
            const ease = 1 - Math.pow(1 - progress, 3);
            const dx = p.tx - p.x;
            const dy = p.ty - p.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 1.5) {
              p.x = p.tx;
              p.y = p.ty;
              p.assembled = true;
            } else {
              const spring = 0.06 + ease * 0.1;
              p.vx += dx * spring;
              p.vy += dy * spring;
              p.vx *= 0.78;
              p.vy *= 0.78;
              p.x += p.vx;
              p.y += p.vy;
            }
          }

          // alpha
          const fadeProg = Math.min(1, f / 20);
          let alpha = fadeProg;

          // draw particle
          const glowSize = p.assembled ? p.size * 1.1 : p.size * (1 + Math.abs(p.vx + p.vy) * 0.15);

          // glow halo
          if (!p.assembled || frame < GATHER_END + 20) {
            const grd = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize * 3.5);
            grd.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${alpha * 0.35})`);
            grd.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, glowSize * 3.5, 0, Math.PI * 2);
            ctx!.fillStyle = grd;
            ctx!.fill();
          }

          // core dot
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
          ctx!.fill();
        }

        // ── Trigger fade-out overlay after HOLD_END ──
        if (frame >= HOLD_END) {
          cancelAnimationFrame(rafRef.current);
          setPhase("fading");
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 900);
          return;
        }

        rafRef.current = requestAnimationFrame(tick);
      }

      // Initial clear
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      rafRef.current = requestAnimationFrame(tick);
    };

    return () => cancelAnimationFrame(rafRef.current);
  }, [logoSrc, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        transition: phase === "fading" ? "opacity 0.9s ease" : "none",
        opacity: phase === "fading" ? 0 : 1,
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}