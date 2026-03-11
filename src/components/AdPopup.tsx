import { useState, useEffect, useRef } from "react";
import { X, Zap, Clock, ArrowRight, Star, Phone, Mail, CheckCircle, ChevronRight } from "lucide-react";

const TAGLINES = [
  { text: "Chesiche dammu maakundi.", lang: "Telugu (EN)" },
  { text: "చేసిచే దమ్ము మాకుంది.", lang: "Telugu" },
  { text: "Karne ka dum rakhte hain.", lang: "Hindi (EN)" },
  { text: "करने का दम रखते हैं।", lang: "Hindi" },
  { text: "Seiya ventum enru irukkirōm.", lang: "Tamil (EN)" },
  { text: "செய்ய வேண்டும் என்று இருக்கிறோம்.", lang: "Tamil" },
  { text: "Maduva sakti nammalli ide.", lang: "Kannada (EN)" },
  { text: "ಮಾಡುವ ಶಕ್ತಿ ನಮ್ಮಲ್ಲಿ ಇದೆ.", lang: "Kannada" },
];

function TypewriterText({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing" | "done">("typing");
  const idx = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setPhase("typing");
    idx.current = 0;
  }, [text]);

  useEffect(() => {
    if (phase === "typing") {
      if (idx.current < text.length) {
        const t = setTimeout(() => {
          setDisplayed(text.slice(0, idx.current + 1));
          idx.current++;
        }, 38);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("erasing"), 600);
        return () => clearTimeout(t);
      }
    }
    if (phase === "erasing") {
      if (idx.current > 0) {
        const t = setTimeout(() => {
          idx.current--;
          setDisplayed(text.slice(0, idx.current));
        }, 22);
        return () => clearTimeout(t);
      } else {
        setPhase("done");
        onDone();
      }
    }
  }, [phase, displayed, text, onDone]);

  return (
    <span>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.1em",
          background: "#60a5fa",
          marginLeft: "2px",
          verticalAlign: "text-bottom",
          animation: "blink 0.7s step-end infinite",
        }}
      />
    </span>
  );
}

export function ContactForm({ onClose }: { onClose: () => void }) {
  const [contact, setContact] = useState("");
  const [type, setType] = useState<"phone" | "email">("phone");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const validate = () => {
    if (!contact.trim()) return "Please enter your contact info.";
    if (type === "phone" && !/^\+?[\d\s\-]{7,15}$/.test(contact.trim()))
      return "Enter a valid mobile number.";
    if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim()))
      return "Enter a valid email address.";
    return "";
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/xqeypaek", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ [type]: contact, _subject: "New Website Booking Lead — 40% Off" }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <div style={{ animation: "popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)" }}>
          <CheckCircle size={56} color="#34d399" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-black text-white text-center">You're on the list! 🎉</h3>
        <p className="text-nunito-400 text-sm text-center max-w-xs">
          We'll reach out shortly with your <span style={{ color: "#fbbf24", fontWeight: 700 }}>40% discount</span> details. Get ready for your website!
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2.5 rounded-lg font-bold text-sm"
          style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.4)", color: "#60a5fa" }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-black text-white mb-1">Claim Your 40% Off</h3>
      <p className="text-nunito-400 text-sm mb-5">Enter your contact — we'll reach out instantly.</p>

      {/* Toggle */}
      <div className="flex gap-2 mb-4">
        {(["phone", "email"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setType(t); setContact(""); setError(""); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold flex-1 justify-center transition-all duration-200"
            style={
              type === t
                ? { background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "white", boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }
                : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#94a3b8" }
            }
          >
            {t === "phone" ? <Phone size={14} /> : <Mail size={14} />}
            {t === "phone" ? "Mobile" : "Email"}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="relative mb-2">
        <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#60a5fa" }}>
          {type === "phone" ? <Phone size={16} /> : <Mail size={16} />}
        </div>
        <input
          type={type === "phone" ? "tel" : "email"}
          placeholder={type === "phone" ? "+91 98765 43210" : "you@email.com"}
          value={contact}
          onChange={e => { setContact(e.target.value); setError(""); }}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: error ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(59,130,246,0.3)",
            color: "white",
            caretColor: "#60a5fa",
          }}
        />
      </div>
      {error && <p className="text-xs mb-3" style={{ color: "#f87171" }}>{error}</p>}

      {status === "error" && (
        <p className="text-xs mb-3" style={{ color: "#f87171" }}>Something went wrong. Please try again.</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-base mt-3 transition-all duration-300"
        style={{
          background: status === "loading" ? "rgba(59,130,246,0.4)" : "linear-gradient(135deg,#2563eb,#3b82f6)",
          color: "white",
          boxShadow: status === "loading" ? "none" : "0 4px 30px rgba(59,130,246,0.5)",
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
        onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.boxShadow = "0 8px 40px rgba(59,130,246,0.8)"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 30px rgba(59,130,246,0.5)"; }}
      >
        {status === "loading" ? (
          <span style={{ display: "inline-block", width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        ) : (
          <>Book Now — Claim 40% Off <ChevronRight size={18} /></>
        )}
      </button>
      <p className="text-center text-xs mt-3" style={{ color: "#475569" }}>We never spam. Your info is safe with us.</p>
    </div>
  );
}

export default function AdPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 59 });

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 7000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const pad = (n: number) => String(n).padStart(2, "0");

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @keyframes popIn { from { opacity:0; transform:scale(0.85) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes shimmer { 0% { transform:translateX(-100%) skewX(-15deg); } 100% { transform:translateX(300%) skewX(-15deg); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse-border { 0%,100% { border-color:rgba(59,130,246,0.4); } 50% { border-color:rgba(96,165,250,0.8); } }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(2,8,20,0.88)", backdropFilter: "blur(10px)" }} onClick={() => setIsVisible(false)} />

      {/* Card */}
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden" style={{
        background: "linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%)",
        border: "1px solid rgba(59,130,246,0.4)",
        boxShadow: "0 0 80px rgba(59,130,246,0.25),0 0 160px rgba(59,130,246,0.1),inset 0 1px 0 rgba(255,255,255,0.08)",
        animation: "popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)",
        maxHeight: "95vh",
        overflowY: "auto",
      }}>
        {/* Top bar */}
        <div style={{ height: "3px", background: "linear-gradient(90deg,#1d4ed8,#60a5fa,#93c5fd,#60a5fa,#1d4ed8)" }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle,#60a5fa 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

        {/* Close */}
        <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
          <X size={13} color="white" />
        </button>

        <div className="relative p-7">
          {!showForm ? (
            <>
              {/* Badge row */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider"
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.45)", color: "#f87171" }}>
                  <Zap size={10} fill="currentColor" /> LIMITED TIME
                </div>
                <div className="flex gap-0.5">{[...Array(5)].map((_,i) => <Star key={i} size={11} fill="#fbbf24" color="#fbbf24" />)}</div>
              </div>

              {/* Headline */}
              <div style={{ animation: "float 3s ease-in-out infinite" }}>
                <h2 className="text-4xl font-black leading-tight" style={{ color: "white", letterSpacing: "-0.02em" }}>Basic Website</h2>
                <h2 className="text-4xl font-black leading-tight mb-3" style={{
                  background: "linear-gradient(90deg,#60a5fa,#93c5fd,#3b82f6)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em"
                }}>in Just 48 Hours! ⚡</h2>
              </div>

              {/* Typewriter tagline */}
              <div className="min-h-[2.2rem] mb-5 flex items-center">
                <p className="text-base font-semibold" style={{ color: "#94a3b8", fontStyle: "italic" }}>
                  <TypewriterText
                    key={taglineIdx}
                    text={TAGLINES[taglineIdx].text}
                    onDone={() => setTaglineIdx(i => (i + 1) % TAGLINES.length)}
                  />
                  {/* <span className="ml-2 text-xs font-normal not-italic px-1.5 py-0.5 rounded" style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa" }}>
                    {TAGLINES[taglineIdx].lang}
                  </span> */}
                </p>
              </div>

              {/* Discount */}
              <div className="relative rounded-xl p-4 mb-4 overflow-hidden" style={{
                background: "linear-gradient(135deg,rgba(59,130,246,0.18),rgba(96,165,250,0.08))",
                border: "1px solid rgba(59,130,246,0.3)", animation: "pulse-border 2.5s infinite"
              }}>
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)",
                  width: "60%", animation: "shimmer 2.5s infinite"
                }} />
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#93c5fd" }}>Book Now & Save</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black" style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>40%</span>
                      <span className="text-xl font-bold text-white">OFF</span>
                    </div>
                    <div className="text-xs mt-1" style={{ color: "#ffffff" }}>On your first website project</div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-18 h-18 rounded-full text-center px-3 py-3"
                    style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", boxShadow: "0 0 25px rgba(59,130,246,0.55)", border: "2px dashed rgba(147,197,253,0.4)" }}>
                    <div className="text-xs font-bold leading-tight" style={{ color: "#bfdbfe" }}>CODE</div>
                    <div className="text-sm font-black text-white">WEB40</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {["🚀 Delivered in 48 hrs","📱 Mobile Responsive","⚡ Fast & Optimized","🎨 Custom Design"].map((item,i) => (
                  <div key={i} className="px-3 py-2 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#cbd5e1" }}>{item}</div>
                ))}
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-3 mb-5">
                <Clock size={13} color="#64748b" />
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#64748b" }}>Offer expires in</span>
                <div className="flex items-center gap-1">
                  {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((val, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="text-sm font-black px-2 py-0.5 rounded" style={{ background: "rgba(59,130,246,0.18)", color: "#60a5fa", minWidth: "34px", textAlign: "center", fontVariantNumeric: "tabular-nums" }}>{val}</span>
                      {i < 2 && <span style={{ color: "#3b82f6", fontWeight: 700 }}>:</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setShowForm(true)}
                className="w-full relative flex items-center justify-center gap-2 py-4 rounded-xl font-black text-lg overflow-hidden transition-all duration-300"
                style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)", color: "white", boxShadow: "0 4px 28px rgba(59,130,246,0.5)", border: "none" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(59,130,246,0.8)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 28px rgba(59,130,246,0.5)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)", width: "50%", animation: "shimmer 2s infinite" }} />
                <span className="relative">🔥 Book Now — Get 40% Off</span>
                <ArrowRight size={19} className="relative" />
              </button>

              <p className="text-center text-xs mt-3" style={{ color: "#64748b" }}>No hidden charges · 100% Satisfaction Guaranteed</p>
            </>
          ) : (
            <div style={{ animation: "slideUp 0.4s ease" }}>
              <button onClick={() => setShowForm(false)} className="flex items-center gap-1 text-xs mb-5 transition-colors" style={{ color: "#64748b", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = "#94a3b8"}
                onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>
                ← Back
              </button>
              <ContactForm onClose={() => setIsVisible(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}