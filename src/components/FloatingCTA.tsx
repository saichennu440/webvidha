// import { useState } from "react";
// import { X, Zap, Phone, Mail, CheckCircle, ChevronRight } from "lucide-react";

// // ✅ Make sure ContactForm is exported from AdPopup.tsx like this:
// // export function ContactForm({ onClose }: { onClose: () => void }) { ... }

// import { ContactForm } from "./AdPopup"; // adjust path as needed

// export default function FloatingCTA() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Floating Button */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: 32,
//           right: 24,
//           zIndex: 1000,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: 8,
//           fontFamily: "'Segoe UI', system-ui, sans-serif",
//         }}
//       >
//         <style>{`
//           @keyframes floatBtn {
//             0%, 100% { transform: translateY(0); }
//             50% { transform: translateY(-6px); }
//           }
//           @keyframes ripple {
//             0% { transform: scale(1); opacity: 0.6; }
//             100% { transform: scale(2.2); opacity: 0; }
//           }
//           @keyframes popUp {
//             from { opacity: 0; transform: translateY(20px) scale(0.95); }
//             to { opacity: 1; transform: translateY(0) scale(1); }
//           }
//         `}</style>

//         {/* Ripple rings */}
//         {!open && (
//           <>
//             <div style={{
//               position: "absolute", bottom: 0, right: 0,
//               width: 60, height: 60, borderRadius: "50%",
//               background: "rgba(59,130,246,0.3)",
//               animation: "ripple 2s ease-out infinite",
//               pointerEvents: "none",
//             }} />
//             <div style={{
//               position: "absolute", bottom: 0, right: 0,
//               width: 60, height: 60, borderRadius: "50%",
//               background: "rgba(59,130,246,0.2)",
//               animation: "ripple 2s ease-out 0.6s infinite",
//               pointerEvents: "none",
//             }} />
//           </>
//         )}

//         {/* Label pill */}
//         {!open && (
//           <div style={{
//             background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
//             color: "white",
//             fontSize: 11,
//             fontWeight: 700,
//             letterSpacing: "0.05em",
//             padding: "5px 12px",
//             borderRadius: 99,
//             whiteSpace: "nowrap",
//             boxShadow: "0 4px 14px rgba(59,130,246,0.5)",
//             pointerEvents: "none",
//           }}>
//             Site in 48hrs ⚡
//           </div>
//         )}

//         {/* Circle button */}
//         <button
//           onClick={() => setOpen(o => !o)}
//           style={{
//             width: 60, height: 60, borderRadius: "50%",
//             background: open
//               ? "linear-gradient(135deg,#1e293b,#334155)"
//               : "linear-gradient(135deg,#1d4ed8,#3b82f6)",
//             border: "2px solid rgba(255,255,255,0.15)",
//             boxShadow: open
//               ? "0 4px 20px rgba(0,0,0,0.4)"
//               : "0 4px 24px rgba(59,130,246,0.6)",
//             cursor: "pointer",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             animation: open ? "none" : "floatBtn 3s ease-in-out infinite",
//             transition: "all 0.3s ease",
//             position: "relative", zIndex: 2,
//           }}
//           onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
//           onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
//         >
//           {open
//             ? <X size={20} color="white" />
//             : <Zap size={22} color="white" fill="white" />
//           }
//         </button>
//       </div>

//       {/* Form Panel */}
//       {open && (
//         <div style={{
//           position: "fixed",
//           bottom: 110,
//           right: 24,
//           zIndex: 999,
//           width: 320,
//           borderRadius: 16,
//           background: "linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%)",
//           border: "1px solid rgba(59,130,246,0.35)",
//           boxShadow: "0 0 60px rgba(59,130,246,0.2), 0 20px 60px rgba(0,0,0,0.5)",
//           overflow: "hidden",
//           animation: "popUp 0.35s cubic-bezier(0.23,1,0.32,1) forwards",
//           fontFamily: "'Segoe UI', system-ui, sans-serif",
//         }}>
//           {/* Top accent bar */}
//           <div style={{ height: 3, background: "linear-gradient(90deg,#1d4ed8,#60a5fa,#93c5fd)" }} />
//           <div style={{ padding: "20px 20px 20px" }}>
//             <ContactForm onClose={() => setOpen(false)} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }