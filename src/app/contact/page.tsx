"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  "Social Media Design",
  "Logo & Brand Identity",
  "Digital Banners",
  "Event Posters",
  "Packaging / Labels",
  "Print Design",
];

type State = "idle" | "submitting" | "done" | "error";

export default function ContactPage() {
  const [picked, setPicked]   = useState<string[]>([]);
  const [status, setStatus]   = useState<State>("idle");
  const [form,   setForm]     = useState({ name: "", email: "", company: "", message: "" });

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1200)); 
    setStatus("done");
  };

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-ss-black flex items-center justify-center px-6 selection:bg-ss-pink selection:text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-ss-pink/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="text-center max-w-md relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}>
             <CheckCircle2 size={80} className="mx-auto mb-8 text-ss-pink drop-shadow-[0_0_20px_rgba(229,74,99,0.5)]" strokeWidth={1} />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-black text-[3rem] text-white mb-4 tracking-tighter uppercase">Transmission <br/><span className="text-ss-pink italic">Received.</span></motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-white/60 text-[15px] font-medium leading-relaxed mb-10">
            Secure connection established. The team will analyze your request and initialize contact within 24 hours.
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", message: "" }); setPicked([]); }}
            className="inline-flex items-center gap-3 px-8 py-4 text-[13px] font-bold uppercase tracking-widest text-black bg-white rounded-full hover:bg-ss-pink hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(229,74,99,0.4)]"
          >
            Send Another <ArrowRight size={14} />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-ss-black text-white min-h-screen selection:bg-ss-pink selection:text-white">
      {/* ── Header ── */}
      <section className="pt-32 pb-16 lg:pt-48 border-b border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-[60vh] bg-ss-pink/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-white/50 uppercase tracking-[0.3em] text-xs mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ss-pink animate-pulse"></span> The Commencement
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-black text-[10vw] lg:text-[8rem] uppercase leading-[0.85] tracking-tighter mb-8">
            Tell us<br/>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-ss-orange to-ss-pink">everything.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/60 text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
            You've seen the archive. Now it's time to build yours. Transmit your briefing below.
          </motion.p>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <form onSubmit={submit} className="space-y-12">

            {/* Inputs Wrapper */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-10">
              
              {/* Credentials */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Operator Name *</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-xl text-white placeholder:text-white/20 focus:outline-none focus:border-ss-pink transition-colors font-medium"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Transmission Relay (Email) *</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-xl text-white placeholder:text-white/20 focus:outline-none focus:border-ss-pink transition-colors font-medium"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Company / Faction</label>
                <input
                  type="text" value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Your brand name"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-xl text-white placeholder:text-white/20 focus:outline-none focus:border-ss-pink transition-colors font-medium"
                />
              </div>

              {/* Service chips */}
              <div className="space-y-6 pt-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Required Protocols</label>
                <div className="flex flex-wrap gap-3">
                  {SERVICES.map((s) => {
                    const on = picked.includes(s);
                    return (
                      <button
                        key={s} type="button" onClick={() => toggle(s)}
                        className={`px-5 py-3 rounded-xl text-[13px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                          on
                            ? "bg-ss-pink/10 text-ss-pink border-ss-pink shadow-[0_0_20px_rgba(229,74,99,0.2)]"
                            : "bg-white/5 text-white/50 border-white/10 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4 pt-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Briefing Details *</label>
                <textarea
                  required rows={4} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Provide parameters... the more detail, the better."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-ss-pink focus:bg-white/10 transition-all resize-none font-medium"
                />
              </div>

            </motion.div>

            {/* Submit */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="pt-8">
              <button
                type="submit" disabled={status === "submitting"}
                className="inline-flex w-full md:w-auto justify-center items-center gap-4 px-12 py-5 text-[14px] font-black uppercase tracking-[0.2em] text-black bg-white rounded-full hover:bg-ss-pink hover:text-white hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(229,74,99,0.4)]"
              >
                {status === "submitting" ? (
                  <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span> Transmitting...</>
                ) : (
                  <>Send Protocol <ArrowRight size={18} /></>
                )}
              </button>
            </motion.div>

          </form>
        </div>
      </section>

      {/* ── Info strip ── */}
      <section className="border-t border-white/10 bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-3 gap-12">
          {[
            ["Relay Point", "inkdabba.ai@gmail.com"],
            ["HQ Coordinates", "India"],
            ["Response Vector", "T-Minus 24 Hours"],
          ].map(([label, val], i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">{label}</p>
              <p className="font-bold text-lg text-white">{val}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
