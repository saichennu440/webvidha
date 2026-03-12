// import { useState, useEffect, useRef } from "react";
// import { X, Zap, Clock, ArrowRight, Star, CheckCircle, ChevronRight } from "lucide-react";

// const TAGLINES = [
//   { text: "Chesiche dammu maakundi.", lang: "Telugu (EN)" },
//   { text: "చేసిచే దమ్ము మాకుంది.", lang: "Telugu" },
//   { text: "Karne ka dum rakhte hain.", lang: "Hindi (EN)" },
//   { text: "करने का दम रखते हैं।", lang: "Hindi" },
//   { text: "Seiya ventum enru irukkirōm.", lang: "Tamil (EN)" },
//   { text: "செய்ய வேண்டும் என்று இருக்கிறோம்.", lang: "Tamil" },
//   { text: "Maduva sakti nammalli ide.", lang: "Kannada (EN)" },
//   { text: "ಮಾಡುವ ಶಕ್ತಿ ನಮ್ಮಲ್ಲಿ ಇದೆ.", lang: "Kannada" },
// ];

// const SERVICES = [
//   "Basic Website (48hrs)",
//   "Business Website",
//   "E-Commerce Store",
//   "Landing Page",
//   "Portfolio Website",
//   "Other",
// ];

// function TypewriterText({ text, onDone }: { text: string; onDone: () => void }) {
//   const [displayed, setDisplayed] = useState("");
//   const [phase, setPhase] = useState<"typing" | "erasing" | "done">("typing");
//   const idx = useRef(0);

//   useEffect(() => {
//     setDisplayed("");
//     setPhase("typing");
//     idx.current = 0;
//   }, [text]);

//   useEffect(() => {
//     if (phase === "typing") {
//       if (idx.current < text.length) {
//         const t = setTimeout(() => {
//           setDisplayed(text.slice(0, idx.current + 1));
//           idx.current++;
//         }, 38);
//         return () => clearTimeout(t);
//       } else {
//         const t = setTimeout(() => setPhase("erasing"), 600);
//         return () => clearTimeout(t);
//       }
//     }
//     if (phase === "erasing") {
//       if (idx.current > 0) {
//         const t = setTimeout(() => {
//           idx.current--;
//           setDisplayed(text.slice(0, idx.current));
//         }, 22);
//         return () => clearTimeout(t);
//       } else {
//         setPhase("done");
//         onDone();
//       }
//     }
//   }, [phase, displayed, text, onDone]);

//   return (
//     <span>
//       {displayed}
//       <span
//         style={{
//           display: "inline-block",
//           width: "2px",
//           height: "1em",
//           background: "#7096c8",
//           marginLeft: "2px",
//           verticalAlign: "text-bottom",
//           animation: "blink 0.7s step-end infinite",
//         }}
//       />
//     </span>
//   );
// }

// export function ContactForm({ onClose }: { onClose: () => void }) {
//   const [form, setForm] = useState({ email: "", phone: "", service: "", message: "" });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
//       e.email = "Enter a valid email address.";
//     if (!form.phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(form.phone.trim()))
//       e.phone = "Enter a valid phone number.";
//     if (!form.service) e.service = "Please select a service.";
//     return e;
//   };

//   const handleChange = (field: string, value: string) => {
//     setForm(f => ({ ...f, [field]: value }));
//     setErrors(e => { const n = { ...e }; delete n[field]; return n; });
//   };

//   const handleSubmit = async () => {
//     const errs = validate();
//     if (Object.keys(errs).length) { setErrors(errs); return; }
//     setStatus("loading");
//     try {
//       const res = await fetch("https://formspree.io/f/xqeypaek", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json" },
//         body: JSON.stringify({ ...form, _subject: "New Website Booking Lead — 20% Off" }),
//       });
//       if (res.ok) setStatus("success");
//       else setStatus("error");
//     } catch {
//       setStatus("error");
//     }
//   };

//   if (status === "success") {
//     return (
//       <div className="flex flex-col items-center justify-center py-8 gap-4">
//         <div style={{ animation: "popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)" }}>
//           <CheckCircle size={52} color="#5a9e7a" strokeWidth={1.5} />
//         </div>
//         <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#e2e8f0", textAlign: "center" }}>
//           You're on the list! 🎉
//         </h3>
//         <p style={{ color: "#7a8fa6", fontSize: "0.85rem", textAlign: "center", maxWidth: "260px" }}>
//           We'll reach out shortly with your{" "}
//           <span style={{ color: "#c9a84c", fontWeight: 600 }}>20% discount</span> details.
//         </p>
//         <button
//           onClick={onClose}
//           style={{
//             marginTop: "8px", padding: "8px 24px", borderRadius: "8px",
//             background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
//             color: "#94a3b8", fontSize: "0.85rem", cursor: "pointer",
//           }}
//         >
//           Close
//         </button>
//       </div>
//     );
//   }

//   const inputStyle = (field: string) => ({
//     width: "100%",
//     padding: "10px 14px",
//     borderRadius: "10px",
//     background: "rgba(255,255,255,0.05)",
//     border: errors[field] ? "1px solid rgba(200,80,80,0.5)" : "1px solid rgba(255,255,255,0.1)",
//     color: "#d1dae6",
//     fontSize: "0.875rem",
//     outline: "none",
//     caretColor: "#7096c8",
//     boxSizing: "border-box" as const,
//   });

//   return (
//     <div>
//       <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "4px" }}>
//         Claim Your 20% Off
//       </h3>
//       <p style={{ color: "#64748b", fontSize: "0.8rem", marginBottom: "20px" }}>
//         Fill in your details — we'll reach out shortly.
//       </p>

//       <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//         {/* Email */}
//         <div>
//           <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", marginBottom: "5px", fontWeight: 500 }}>
//             Email *
//           </label>
//           <input
//             type="email"
//             placeholder="you@email.com"
//             value={form.email}
//             onChange={e => handleChange("email", e.target.value)}
//             style={inputStyle("email")}
//           />
//           {errors.email && <p style={{ color: "#c87070", fontSize: "0.72rem", marginTop: "4px" }}>{errors.email}</p>}
//         </div>

//         {/* Phone */}
//         <div>
//           <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", marginBottom: "5px", fontWeight: 500 }}>
//             Phone *
//           </label>
//           <input
//             type="tel"
//             placeholder="+91 98765 43210"
//             value={form.phone}
//             onChange={e => handleChange("phone", e.target.value)}
//             style={inputStyle("phone")}
//           />
//           {errors.phone && <p style={{ color: "#c87070", fontSize: "0.72rem", marginTop: "4px" }}>{errors.phone}</p>}
//         </div>

//         {/* Service */}
//         <div>
//           <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", marginBottom: "5px", fontWeight: 500 }}>
//             Service *
//           </label>
//           <select
//             value={form.service}
//             onChange={e => handleChange("service", e.target.value)}
//             style={{ ...inputStyle("service"), appearance: "none" as const }}
//           >
//             <option value="" disabled style={{ background: "#0f172a" }}>Select a service…</option>
//             {SERVICES.map(s => (
//               <option key={s} value={s} style={{ background: "#0f172a" }}>{s}</option>
//             ))}
//           </select>
//           {errors.service && <p style={{ color: "#c87070", fontSize: "0.72rem", marginTop: "4px" }}>{errors.service}</p>}
//         </div>

//         {/* Message */}
//         <div>
//           <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", marginBottom: "5px", fontWeight: 500 }}>
//             Message <span style={{ color: "#3d4e63" }}>(optional)</span>
//           </label>
//           <textarea
//             placeholder="Tell us a bit about your project…"
//             value={form.message}
//             onChange={e => handleChange("message", e.target.value)}
//             rows={3}
//             style={{ ...inputStyle("message"), resize: "none" as const }}
//           />
//         </div>
//       </div>

//       {status === "error" && (
//         <p style={{ color: "#c87070", fontSize: "0.75rem", marginTop: "8px" }}>
//           Something went wrong. Please try again.
//         </p>
//       )}

//       <button
//         onClick={handleSubmit}
//         disabled={status === "loading"}
//         style={{
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "8px",
//           padding: "13px",
//           borderRadius: "10px",
//           marginTop: "16px",
//           fontWeight: 700,
//           fontSize: "0.95rem",
//           background: status === "loading" ? "rgba(60,90,140,0.4)" : "linear-gradient(135deg,#1e4d8c,#2f6bbf)",
//           color: "white",
//           border: "none",
//           boxShadow: status === "loading" ? "none" : "0 4px 20px rgba(40,90,180,0.35)",
//           cursor: status === "loading" ? "not-allowed" : "pointer",
//           transition: "all 0.2s",
//         }}
//         onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.boxShadow = "0 6px 28px rgba(40,90,180,0.55)"; }}
//         onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(40,90,180,0.35)"; }}
//       >
//         {status === "loading" ? (
//           <span style={{ display: "inline-block", width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
//         ) : (
//           <>Book Now — Claim 20% Off <ChevronRight size={16} /></>
//         )}
//       </button>
//       <p style={{ textAlign: "center", fontSize: "0.72rem", marginTop: "10px", color: "#3d4e63" }}>
//         We never spam. Your info is safe with us.
//       </p>
//     </div>
//   );
// }

// export default function AdPopup() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [taglineIdx, setTaglineIdx] = useState(0);
//   const [showForm, setShowForm] = useState(false);
//   const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 59 });

//   useEffect(() => {
//     const t = setTimeout(() => setIsVisible(true), 7000);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;
//     const interval = setInterval(() => {
//       setTimeLeft(prev => {
//         let { hours, minutes, seconds } = prev;
//         if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
//         if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
//         if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
//         return prev;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [isVisible]);

//   const pad = (n: number) => String(n).padStart(2, "0");

//   if (!isVisible) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
//     >
//       <style>{`
//         @keyframes popIn { from { opacity:0; transform:scale(0.88) translateY(16px); } to { opacity:1; transform:scale(1) translateY(0); } }
//         @keyframes shimmer { 0% { transform:translateX(-100%) skewX(-15deg); } 100% { transform:translateX(300%) skewX(-15deg); } }
//         @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
//         @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
//         @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
//         @keyframes slideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         className="absolute inset-0"
//         style={{ background: "rgba(2,6,16,0.82)", backdropFilter: "blur(8px)" }}
//         onClick={() => setIsVisible(false)}
//       />

//       {/* Card */}
//       <div
//         className="relative w-full max-w-md rounded-2xl overflow-hidden"
//         style={{
//           background: "linear-gradient(160deg,#0d1a2e 0%,#111e33 60%,#0a1422 100%)",
//           border: "1px solid rgba(255,255,255,0.08)",
//           boxShadow: "0 0 60px rgba(30,70,140,0.18), 0 0 120px rgba(30,70,140,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
//           animation: "popIn 0.45s cubic-bezier(0.175,0.885,0.32,1.275)",
//           maxHeight: "95vh",
//           overflowY: "auto",
//         }}
//       >
//         {/* Top bar — muted gradient */}
//         <div style={{ height: "2px", background: "linear-gradient(90deg,#1a3a6e,#3d6baa,#5884b8,#3d6baa,#1a3a6e)" }} />

//         {/* Subtle dot grid */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{ opacity: 0.03, backgroundImage: "radial-gradient(circle,#90b4d8 1px,transparent 1px)", backgroundSize: "28px 28px" }}
//         />

//         {/* Close */}
//         <button
//           onClick={() => setIsVisible(false)}
//           className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
//           style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
//           onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.13)"}
//           onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
//         >
//           <X size={12} color="#7a8fa6" />
//         </button>

//         <div className="relative p-6">
//           {!showForm ? (
//             <>
//               {/* Badge row */}
//               <div className="flex items-center gap-2 mb-4">
//                 <div
//                   className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider"
//                   style={{ background: "rgba(180,80,60,0.1)", border: "1px solid rgba(180,80,60,0.3)", color: "#b87a70" }}
//                 >
//                   <Zap size={9} fill="currentColor" /> LIMITED TIME
//                 </div>
//                 <div className="flex gap-0.5">
//                   {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#b89550" color="#b89550" />)}
//                 </div>
//               </div>

//               {/* Headline — lighter weight */}
//               <div style={{ animation: "float 3.5s ease-in-out infinite" }}>
//                 <h2 style={{
//                   fontSize: "2.1rem",
//                   fontWeight: 600,
//                   lineHeight: 1.15,
//                   color: "#c8d8ea",
//                   letterSpacing: "-0.01em",
//                   margin: 0,
//                 }}>
//                   Basic Website
//                 </h2>
//                 <h2 style={{
//                   fontSize: "2.1rem",
//                   fontWeight: 600,
//                   lineHeight: 1.15,
//                   letterSpacing: "-0.01em",
//                   margin: "0 0 12px 0",
//                   background: "linear-gradient(90deg,#5a8ec4,#7aaad4,#4a7ab0)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}>
//                   in Just 48 Hours ⚡
//                 </h2>
//               </div>

//               {/* Typewriter tagline */}
//               <div style={{ minHeight: "2rem", marginBottom: "18px" }}>
//                 <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "#5a7590", fontStyle: "italic", margin: 0 }}>
//                   <TypewriterText
//                     key={taglineIdx}
//                     text={TAGLINES[taglineIdx].text}
//                     onDone={() => setTaglineIdx(i => (i + 1) % TAGLINES.length)}
//                   />
//                 </p>
//               </div>

//               {/* Discount block — muted */}
//               <div
//                 className="relative rounded-xl p-4 mb-4 overflow-hidden"
//                 style={{
//                   background: "rgba(30,60,100,0.2)",
//                   border: "1px solid rgba(60,100,160,0.2)",
//                 }}
//               >
//                 <div
//                   className="absolute inset-0 pointer-events-none"
//                   style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent)", width: "60%", animation: "shimmer 3s infinite" }}
//                 />
//                 <div className="relative flex items-center justify-between">
//                   <div>
//                     <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5a7a9e", marginBottom: "4px" }}>
//                       Book Now & Save
//                     </div>
//                     <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
//                       <span style={{ fontSize: "2.8rem", fontWeight: 700, background: "linear-gradient(135deg,#c9a84c,#b8923e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
//                         20%
//                       </span>
//                       <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "#c8d8ea" }}>OFF</span>
//                     </div>
//                     <div style={{ fontSize: "0.75rem", marginTop: "3px", color: "#5a7a9e" }}>
//                       On your first website project
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//                       padding: "10px 14px", borderRadius: "10px", textAlign: "center",
//                       background: "rgba(30,60,110,0.4)", border: "1px dashed rgba(80,120,180,0.35)",
//                     }}
//                   >
//                     <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "#5a7a9e", letterSpacing: "0.08em" }}>CODE</div>
//                     <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#8ab0d4" }}>WEB20</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="grid grid-cols-2 gap-2 mb-4">
//                 {["🚀 Delivered in 48 hrs", "📱 Mobile Responsive", "⚡ Fast & Optimized", "🎨 Custom Design"].map((item, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       padding: "8px 12px", borderRadius: "8px", fontSize: "0.8rem",
//                       background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
//                       color: "#7a8fa6",
//                     }}
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>

//               {/* Countdown */}
//               <div className="flex items-center gap-3 mb-5">
//                 <Clock size={12} color="#3d5068" />
//                 <span style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: "#3d5068" }}>
//                   Offer expires in
//                 </span>
//                 <div className="flex items-center gap-1">
//                   {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((val, i) => (
//                     <span key={i} className="flex items-center gap-1">
//                       <span style={{
//                         fontSize: "0.8rem", fontWeight: 700, padding: "2px 8px", borderRadius: "6px",
//                         background: "rgba(30,60,100,0.35)", color: "#5a80a8", minWidth: "32px",
//                         textAlign: "center", fontVariantNumeric: "tabular-nums", display: "inline-block",
//                       }}>
//                         {val}
//                       </span>
//                       {i < 2 && <span style={{ color: "#2a4060", fontWeight: 700 }}>:</span>}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* CTA */}
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="w-full relative flex items-center justify-center gap-2 rounded-xl font-bold overflow-hidden transition-all duration-300"
//                 style={{
//                   padding: "14px",
//                   fontSize: "1rem",
//                   background: "linear-gradient(135deg,#1a4278,#2a5ea0)",
//                   color: "#c8ddf0",
//                   boxShadow: "0 4px 22px rgba(30,70,160,0.3)",
//                   border: "1px solid rgba(60,110,180,0.3)",
//                 }}
//                 onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 30px rgba(30,70,160,0.5)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
//                 onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 22px rgba(30,70,160,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
//               >
//                 <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", width: "50%", animation: "shimmer 2.5s infinite" }} />
//                 <span className="relative">Book Now — Get 20% Off</span>
//                 <ArrowRight size={17} className="relative" />
//               </button>

//               <p style={{ textAlign: "center", fontSize: "0.72rem", marginTop: "10px", color: "#3d5068" }}>
//                 No hidden charges · 100% Satisfaction Guaranteed
//               </p>
//             </>
//           ) : (
//             <div style={{ animation: "slideUp 0.35s ease" }}>
//               <button
//                 onClick={() => setShowForm(false)}
//                 style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", marginBottom: "18px", color: "#4a6070", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.15s" }}
//                 onMouseEnter={e => e.currentTarget.style.color = "#7a9ab0"}
//                 onMouseLeave={e => e.currentTarget.style.color = "#4a6070"}
//               >
//                 ← Back
//               </button>
//               <ContactForm onClose={() => setIsVisible(false)} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }