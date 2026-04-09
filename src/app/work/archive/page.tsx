"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { DynamicFrameLayout, Frame } from "@/components/ui/dynamic-frame-layout";
import dynamic from "next/dynamic";
const StellarCardGallerySingle = dynamic(() => import("@/components/ui/3d-image-gallery"), { ssr: false });
import { getBanners } from "@/actions/get-banners";
import { getDynamicWorkProjects } from "@/actions/get-dynamic-work-projects";

type Cat = "All" | "Social Media" | "Banners" | "Logos" | "Packaging";

interface Project {
  id: string;
  title: string;
  client: string;
  cat: Cat;
  tags: string[];
  img: string;
}

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
        <div className="relative w-full h-[65vh] bg-black/50 overflow-hidden flex items-center justify-center">
          <Image src={p.img} alt={p.title} fill sizes="100vw" quality={90} priority className="object-contain p-6" />
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

export default function ArchivePage() {
  const [active, setActive] = useState<Cat>("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [bannerFrames, setBannerFrames] = useState<Frame[]>([]);
  const [cols, setCols] = useState(6);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);

  useEffect(() => {
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
    getBanners().then((paths) => {
      setBannerFrames(paths.map((src, i) => ({ id: `dyn-banner-${i}`, src, defaultPos: { x: 0, y: 0 } })));
    });
  }, []);

  const filtered = active === "All" ? dynamicProjects : dynamicProjects.filter((p) => p.cat === active);

  return (
    <div className="bg-ss-black min-h-screen text-white pt-24 pb-20 selection:bg-ss-pink selection:text-white flex flex-col">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:pl-48 w-full mb-8">
        <Link href="/work" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
          <ArrowLeft size={14} /> Back to Work Overview
        </Link>
        <h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter">The Full Archive</h1>
      </div>

      {/* ── Filter / Navigation ── */}
      <div className="sticky top-[80px] z-50 bg-black/80 backdrop-blur-xl border-b border-t border-white/10 mb-8">
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
      <section className={`relative flex flex-col flex-grow ${active === "Social Media" ? "h-[100svh] w-full" : ""}`}>
        <div className={`w-full flex-grow ${active === "Social Media" ? "h-full w-full px-0" : "max-w-7xl mx-auto px-6 lg:px-12 xl:pl-48"}`}>
          {active === "Banners" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[75vh] min-h-[600px] w-full bg-white/5 rounded-[2rem] overflow-hidden p-4 border border-white/10 backdrop-blur-md">
              {bannerFrames.length > 0 ? (
                <DynamicFrameLayout frames={bannerFrames} className="w-full h-full" hoverSize={5} gapSize={8} cols={cols} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-xs tracking-widest uppercase">Initializing Archive...</div>
              )}
            </motion.div>
          ) : active === "Social Media" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
               <StellarCardGallerySingle cards={filtered.map(p => ({
                 id: p.id,
                 title: p.title,
                 alt: p.title,
                 imageUrl: p.img
               }))} />
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <motion.button
                  layout key={p.id} onClick={() => setLightbox(p)}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative bg-white/5 rounded-2xl overflow-hidden text-left border border-white/5 hover:border-ss-pink/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(229,74,99,0.15)] transition-all duration-500"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-black relative grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image src={p.img} alt={p.title} fill priority={i < 4} quality={75} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {lightbox && <Lightbox p={lightbox} close={() => setLightbox(null)} />}
    </div>
  );
}
