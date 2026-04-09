"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin, Globe } from "lucide-react";
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
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<State>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="min-h-screen bg-ss-black flex items-center justify-center px-6 selection:bg-ss-pink selection:text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-ss-pink/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-ss-pink" strokeWidth={1.5} />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Message Sent.</h2>
          <p className="text-white/50 text-lg font-light leading-relaxed mb-10">
            Thank you for reaching out. Our team will review your message and get back to you shortly.
          </p>
          <button
            onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", message: "" }); setPicked([]); }}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black bg-white rounded-full hover:bg-ss-pink hover:text-white transition-all shadow-lg"
          >
            Go Back <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-ss-black text-white min-h-screen selection:bg-ss-pink selection:text-white font-sans overflow-x-hidden">

      {/* ── Header Section ── */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display font-bold text-6xl lg:text-[5rem] leading-[1.1] mb-8 tracking-tight">
                Let's create <span className="text-ss-pink italic">something</span>
                <br />
                remarkable.
              </h1>
              <p className="text-white/40 text-xl lg:text-2xl font-light leading-relaxed">
                Have a project in mind? We'd love to hear about it. Fill out the form below or reach out directly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Main Contact Grid ── */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left Col: Contact Info */}
            <div className="lg:col-span-4 space-y-16">
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-ss-pink mb-2">
                    <Mail size={18} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Email</span>
                  </div>
                  <a href="mailto:inkdabba.ai@gmail.com" className="text-2xl font-medium hover:text-ss-pink transition-colors block underline underline-offset-8 decoration-white/10 hover:decoration-ss-pink">
                    inkdabba.ai@gmail.com
                  </a>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-ss-pink mb-2">
                    <MapPin size={18} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Location</span>
                  </div>
                  <p className="text-2xl font-medium">Tamil Nadu, India</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-ss-pink mb-2">
                    <Globe size={18} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Social</span>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    {["Instagram", "Behance", "Twitter"].map((social) => (
                      <a key={social} href="#" className="text-lg font-medium hover:text-ss-pink transition-colors">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Form */}
            <div className="lg:col-span-8">
              <form onSubmit={submit} className="space-y-12">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Full Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Cooper"
                      className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-ss-pink transition-colors placeholder:text-white/10"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Email Address</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-ss-pink transition-colors placeholder:text-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Company / Organization</label>
                  <input
                    type="text" value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-ss-pink transition-colors placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">What can we help with?</label>
                  <div className="flex flex-wrap gap-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s} type="button" onClick={() => toggle(s)}
                        className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${picked.includes(s)
                          ? "bg-white text-black border-white"
                          : "border-white/10 hover:border-white/30 text-white/60 hover:text-white"
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Message</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us more about your project goals..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:outline-none focus:border-ss-pink transition-all placeholder:text-white/10 resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={status === "submitting"}
                  className="group relative inline-flex items-center gap-4 px-12 py-6 bg-ss-pink text-white rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Sending...</>
                  ) : (
                    <>Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
