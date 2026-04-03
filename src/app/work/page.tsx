"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";
import { DynamicFrameLayout, Frame } from "@/components/ui/dynamic-frame-layout";
import { getBanners } from "@/actions/get-banners";
import { getDynamicWorkProjects } from "@/actions/get-dynamic-work-projects";

const poster = (n: number) => `/image/poster/Poster%20(${n}).jpeg`;
const banner = (n: number) => `/image/banner/Banner%20(${n}).jpeg`;

type Cat = "All" | "Social Media" | "Banners" | "Logos" | "Packaging";

interface Project {
  id: string;
  title: string;
  client: string;
  cat: Cat;
  tags: string[];
  img: string;
}

const PROJECTS: Project[] = [
  { id: "p01", title: "Fantastic Friday", client: "The Cycle Gap", cat: "Social Media", tags: ["#poster", "#event", "#nightlife"], img: poster(1) },
  { id: "p02", title: "Event Night", client: "The Cycle Gap", cat: "Social Media", tags: ["#poster", "#socialmedia"], img: poster(2) },
  { id: "p03", title: "Weekend Special", client: "Brand Campaign", cat: "Social Media", tags: ["#poster", "#promotion"], img: poster(3) },
  { id: "p04", title: "Offer Post", client: "Brand Campaign", cat: "Social Media", tags: ["#socialmedia", "#offer"], img: poster(4) },
  { id: "p05", title: "Brand Campaign", client: "Retail Client", cat: "Social Media", tags: ["#socialmedia", "#branding"], img: poster(5) },
  { id: "b01", title: "Baking Essentials", client: "E-Commerce", cat: "Banners", tags: ["#banner", "#ecommerce", "#food"], img: banner(1) },
  { id: "b02", title: "Product Banner", client: "Online Store", cat: "Banners", tags: ["#banner", "#product"], img: banner(2) },
  { id: "b03", title: "Sale Banner", client: "Retail Brand", cat: "Banners", tags: ["#banner", "#sale", "#ecommerce"], img: banner(3) },
  { id: "l01", title: "Wild Flour", client: "Wild Flour", cat: "Logos", tags: ["#logo", "#branding", "#packaging"], img: "/image/logo/Wild%20Flour%20Mockup.jpg" },
  { id: "l02", title: "Zen Enterprises", client: "Zen Enterprises", cat: "Logos", tags: ["#logo", "#identity", "#branding"], img: "/image/logo/Zen%20Enterprises%20Logo-04.jpg" },
  { id: "l03", title: "Conectr", client: "Conectr", cat: "Logos", tags: ["#logo", "#tech", "#startup"], img: "/image/logo/Conectr.png" },
  { id: "k01", title: "Agni Masala Brand", client: "Agni Masala", cat: "Packaging", tags: ["#packaging", "#label", "#branding"], img: "/image/label/Agni%20Masala%20Branding-12.jpg" },
  { id: "k02", title: "Agni Masala Series", client: "Agni Masala", cat: "Packaging", tags: ["#packaging", "#label"], img: "/image/label/Agni%20Masala%20Branding-16.jpg" },
  { id: "k03", title: "Plumoeasy", client: "Plumoeasy", cat: "Packaging", tags: ["#packaging", "#mockup", "#label"], img: "/image/label/Plumoeasy%20Mockup-1.jpg" },
];

const CATS: Cat[] = ["All", "Social Media", "Banners", "Logos", "Packaging"];

// Smooth Glassmorphism Lightbox
function Lightbox({ p, close }: { p: Project; close: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 selection:bg-ss-pink selection:text-white"
      onClick={close}
    >
      <button
        onClick={close}
        className="absolute top-8 right-8 bg-white/5 hover:bg-ss-pink hover:text-white text-white/50 border border-white/10 rounded-full p-3 transition-all duration-300 backdrop-blur-md"
      >
        <X size={20} />
      </button>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}
        className="relative max-w-4xl w-full bg-ss-black border border-white/10 rounded-[2rem] overflow-hidden max-h-[90vh] flex flex-col shadow-[0_0_80px_rgba(255,255,255,0.05)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-auto max-h-[70vh] bg-black/50 p-6 flex justify-center">
          <Image src={p.img} alt={p.title} width={800} height={600} className="w-full h-auto object-contain rounded-xl max-h-[60vh]" />
        </div>
        <div className="px-6 py-6 sm:px-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-ss-black">
          <div>
            <p className="font-black text-xl sm:text-2xl text-white mb-2">{p.title}</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {p.tags.map((t) => (
                <span key={t} className="text-[9px] sm:text-[11px] uppercase tracking-widest text-ss-pink font-bold">{t}</span>
              ))}
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 border sm:border-0 border-white/10 px-3 py-1 sm:p-0 rounded-full">{p.client}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const SECTIONS = [
  { id: "archive", label: "01. The Vault" },
  { id: "gallery", label: "02. The Gallery" },
  { id: "connect", label: "03. The Exit" },
];

export default function WorkPage() {
  const [active, setActive] = useState<Cat>("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [bannerFrames, setBannerFrames] = useState<Frame[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [cols, setCols] = useState(6);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    // Dynamically fetch ALL projects from folders
    getDynamicWorkProjects().then((data) => {
      setDynamicProjects(data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCols(window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 4 : 6);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    getBanners().then((paths) => {
      setBannerFrames(paths.map((src, i) => ({ id: `dyn-banner-${i}`, src, defaultPos: { x: 0, y: 0 } })));
    });
  }, []);

  const filtered = active === "All" ? dynamicProjects : dynamicProjects.filter((p) => p.cat === active);

  return (
    <div className="bg-ss-black text-white selection:bg-ss-pink selection:text-white">
      {/* Sticky Tracker */}
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


      {/* ── 1. The Vault ── */}
      <section id="archive" className="pt-32 lg:pt-48 pb-16 border-b border-white/10 overflow-hidden relative flex flex-col min-h-[90svh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ss-pink/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:pl-48 relative z-10 w-full flex-grow flex flex-col justify-center">
           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-bold font-mono text-[10px] text-white/50 uppercase tracking-[0.3em] mb-8">
             [ CH.01 / THE_VAULT ]
           </motion.p>
           
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

        <button onClick={() => scrollTo('gallery')} className="mt-16 mx-auto flex flex-col items-center gap-3 text-white/50 hover:text-white transition-opacity relative z-20 pb-4">
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Enter Gallery</span>
           <ArrowDown size={14} className="animate-bounce" />
        </button>
      </section>

      {/* ── Filter / Navigation ── */}
      <div className="sticky top-[80px] z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:pl-48">
          <div className="flex gap-6 py-5 overflow-x-auto hide-scroll">
            {CATS.map((c) => (
              <button
                key={c} onClick={() => setActive(c)}
                className={`flex-shrink-0 text-[11px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${active === c ? "text-ss-pink scale-110 drop-shadow-[0_0_10px_rgba(229,74,99,0.8)]" : "text-white/40 hover:text-white/80"}`}
              >
                {c} <span className="ml-1 opacity-50 font-mono text-[9px] tracking-normal">[ {c === "All" ? dynamicProjects.length : dynamicProjects.filter((p) => p.cat === c).length} ]</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. The Gallery ── */}
      <section id="gallery" className="py-20 min-h-[100svh] relative flex flex-col">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:pl-48 w-full flex-grow">
          {active === "Banners" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[75vh] min-h-[600px] w-full bg-white/5 rounded-[2rem] overflow-hidden p-4 border border-white/10 backdrop-blur-md">
              {bannerFrames.length > 0 ? (
                <DynamicFrameLayout frames={bannerFrames} className="w-full h-full" hoverSize={5} gapSize={8} cols={cols} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-xs tracking-widest uppercase">Initializing Archive...</div>
              )}
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <motion.button
                  layout key={p.id} onClick={() => setLightbox(p)}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative bg-white/5 rounded-2xl overflow-hidden text-left border border-white/5 hover:border-ss-pink/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(229,74,99,0.15)] transition-all duration-500"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-black relative">
                    <Image src={p.img} alt={p.title} width={400} height={500} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10 translate-y-4 group-hover:translate-y-0 relative">
                       <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ss-pink mb-1">[ {p.cat} ]</p>
                       <p className="font-black text-xl text-white leading-tight">{p.title}</p>
                    </div>
                    {/* UI Technical Brackets */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20 pointer-events-none" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        <button onClick={() => scrollTo('connect')} className="mt-32 mx-auto flex flex-col items-center gap-3 text-white/50 hover:text-white transition-opacity relative z-20">
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
            The archive is vast. <br/>
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

      {lightbox && <Lightbox p={lightbox} close={() => setLightbox(null)} />}
    </div>
  );
}