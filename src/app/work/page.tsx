"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { getDynamicWorkProjects } from "@/actions/get-dynamic-work-projects";

interface Project {
  id: string;
  title: string;
  client: string;
  cat: string;
  tags: string[];
  img: string;
}

const SECTIONS = [
  { id: "archive", label: "01. The Vault" },
  { id: "featured", label: "02. Featured Work" },
  { id: "connect", label: "03. The Exit" },
];

function WalkthroughTracker() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const ob = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = SECTIONS.findIndex((s) => s.id === e.target.id);
          if (idx !== -1) setActiveSection(idx);
        }
      });
    }, { threshold: 0.3 });
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) ob.observe(el);
    });
    return () => ob.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="fixed left-6 lg:left-12 top-1/2 -translate-y-1/2 z-[60] hidden xl:flex flex-col gap-6 mix-blend-difference pointer-events-none">
      {SECTIONS.map((sec, i) => (
        <button
          key={sec.id} onClick={() => scrollTo(sec.id)}
          className={`pointer-events-auto flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 origin-left text-left ${activeSection === i ? "opacity-100 scale-110 text-ss-pink" : "opacity-30 hover:opacity-70 text-white"}`}
        >
          <span>{String(i + 1).padStart(2, '0')}</span>
          <div className={`transition-all duration-300 h-[2px] ${activeSection === i ? "w-8 bg-ss-pink" : "w-0 bg-white"}`} />
          {activeSection === i && <span>{sec.label.split('.')[1]}</span>}
        </button>
      ))}
    </div>
  );
}

export default function WorkPage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    getDynamicWorkProjects().then((data) => {
      // Pick first 6 projects for the featured section
      setFeaturedProjects(data.slice(0, 6));
    });
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="bg-ss-black text-white selection:bg-ss-pink selection:text-white">
      {/* Sticky Tracker */}
      <WalkthroughTracker />

      {/* ── 1. The Vault ── */}
      <section id="archive" className="pt-32 lg:pt-48 pb-16 border-b border-white/10 overflow-hidden relative flex flex-col min-h-[90svh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ss-pink/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:pl-48 relative z-10 w-full flex-grow flex flex-col justify-center">

          <h1 className="text-[12vw] lg:text-[10rem] leading-[0.85] font-black tracking-tighter uppercase text-white mb-10 flex flex-col">
            <span className="overflow-hidden inline-block pb-[1vw]">
              <motion.span className="inline-block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}>The Deep</motion.span>
            </span>
            <span className="overflow-hidden inline-block pb-[1vw]">
              <motion.span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-ss-orange to-ss-pink italic pr-4" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}>Archive.</motion.span>
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-white/60 text-xl lg:text-2xl font-light max-w-2xl leading-relaxed">
            A carefully curated collection of brands, identities, and visual systems forged to command attention.
          </motion.p>
        </div>

        {/* Floating Marquee replacing straight massive block */}
        <div className="relative w-[110%] -left-[5%] h-[12vh] min-h-[90px] bg-ss-pink flex items-center overflow-hidden -rotate-[2deg] shadow-[0_0_60px_rgba(229,74,99,0.2)] z-20 mt-16 blur-[1px] hover:blur-none transition-all duration-500 hover:rotate-0">
          <div className="absolute top-0 bottom-0 flex items-center whitespace-nowrap animate-marquee">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="text-white font-black uppercase text-4xl lg:text-5xl tracking-tighter mx-6 mix-blend-overlay">
                THE DEEP ARCHIVE * VISUAL RECORDS *
              </span>
            ))}
          </div>
        </div>

        <button onClick={() => scrollTo('featured')} className="mt-16 mx-auto flex flex-col items-center gap-3 text-white/50 hover:text-white transition-opacity relative z-20 pb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Featured Work</span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </section>

      {/* ── 2. Featured Work ── */}
      <section id="featured" className="py-24 relative flex flex-col min-h-[100svh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:pl-48 w-full flex-grow flex flex-col">

          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">Highlighted Projects</h2>
            <p className="text-white/50 font-light text-lg">A glance at some of our finest design and branding execution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mb-24">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative text-left"
              >
                <div className="aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden bg-white/5 rounded-3xl relative mb-6">
                  <Image src={p.img} alt={p.title} fill priority={i < 2} quality={80} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ss-pink mb-2">[ {p.cat} ]</p>
                  <h3 className="font-black text-3xl text-white leading-tight mb-2">{p.title}</h3>
                  <p className="font-light text-white/60 mb-4">{p.tags.join(" ")}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DIVE INTO THE ARCHIVE CTA */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="w-full flex justify-center py-12">
            <Link href="/work/archive" className="group relative overflow-hidden bg-ss-pink rounded-[2.5rem] px-12 md:px-20 py-8 md:py-12 flex flex-col items-center justify-center border border-white/10 hover:shadow-[0_0_80px_rgba(229,74,99,0.4)] transition-all duration-500 w-full max-w-4xl">
              <span className="text-4xl md:text-7xl font-black uppercase text-white tracking-tighter text-center flex items-center gap-6 relative z-10">
                Explore Archive <ArrowRight className="w-12 h-12 md:w-16 md:h-16 group-hover:translate-x-4 transition-transform duration-500" strokeWidth={3} />
              </span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 z-0" />
            </Link>
          </motion.div>

        </div>

        <button onClick={() => scrollTo('connect')} className="mt-16 mx-auto flex flex-col items-center gap-3 text-white/50 hover:text-white transition-opacity relative z-20">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next: The Exit</span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>

      </section>

      {/* ── 3. The Exit ── */}
      <section id="connect" className="min-h-[80svh] flex flex-col items-center justify-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-ss-orange/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-white/50 uppercase tracking-[0.3em] font-bold text-xs mb-6">Chapter 03: The Exit</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-black text-[clamp(3rem,6vw,5rem)] text-white tracking-tight mb-12 leading-[0.9]">
            The archive is vast. <br />
            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-white to-white/30">Ready to add your piece?</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 text-[15px] font-black uppercase tracking-widest border border-white/20 text-white rounded-full hover:scale-105 hover:bg-white hover:text-black hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300"
            >
              Initiate Contact <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}