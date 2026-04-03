"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const PROJECTS = [
  { title: "Wild Flour", tags: ["#packaging", "#branding"], img: "/image/logo/Wild%20Flour%20Mockup.jpg", cat: "physical" },
  { title: "Baking Essentials", tags: ["#banner", "#digital"], img: "/image/banner/Banner%20(1).jpeg", cat: "digital" },
  { title: "Fantastic Friday", tags: ["#poster", "#social"], img: "/image/poster/Poster%20(1).jpeg", cat: "digital" },
  { title: "Modern Minimalist", tags: ["#identity", "#typography"], img: "/image/logo/Conectr.png", cat: "physical" },
];

const OFFERINGS = [
  { num: "01", title: "Brand Strategy & Positioning", desc: "Defining a strategic foundation that speaks to global audiences." },
  { num: "02", title: "Visual Identity & Packaging", desc: "Crafting distinctive logomarks and packaging designs that win hearts." },
  { num: "03", title: "Digital & Implementation", desc: "Translating your brand into dynamic formats that stand out." },
];

const SECTIONS = [
  { id: "hero", label: "01. The Spark" },
  { id: "reel", label: "02. The Forge" },
  { id: "works", label: "03. The Artifacts" },
  { id: "offerings", label: "04. Your Story" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState("all");

  useEffect(() => {
    const ob = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = SECTIONS.findIndex((s) => s.id === e.target.id);
          if (idx !== -1) setActiveSection(idx);
        }
      });
    }, { threshold: 0.4 });
    
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) ob.observe(el);
    });
    return () => ob.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  // Scroll logic for The Forge parallax
  const forgeRef = useRef(null);
  const { scrollYProgress: forgeProgress } = useScroll({ target: forgeRef, offset: ["start end", "end start"] });
  const yImage1 = useTransform(forgeProgress, [0, 1], ["-10%", "20%"]);
  const rotateImage1 = useTransform(forgeProgress, [0, 1], [-10, 10]);
  const yImage2 = useTransform(forgeProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div className="bg-ss-black text-ss-white selection:bg-ss-pink selection:text-white overflow-hidden">
      
      {/* ── Sticky Walkthrough Tracker ── */}
      <div className="fixed left-6 lg:left-12 top-1/2 -translate-[50%] z-[60] hidden xl:flex flex-col gap-6 mix-blend-difference pointer-events-none">
        {SECTIONS.map((sec, i) => (
          <button 
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className={`pointer-events-auto flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 origin-left text-left ${activeSection === i ? "opacity-100 scale-110 text-ss-pink" : "opacity-30 hover:opacity-70 text-white"}`}
          >
            <span>{String(i + 1).padStart(2, '0')}</span>
            <div className={`transition-all duration-300 h-[2px] ${activeSection === i ? "w-8 bg-ss-pink" : "w-0 bg-white"}`} />
            {activeSection === i && <span>{sec.label.split('.')[1]}</span>}
          </button>
        ))}
      </div>

      {/* ── 1. CHAPTER 1: THE SPARK ── */}
      <section id="hero" className="min-h-[100svh] flex flex-col justify-center relative border-b border-white/10">
        
        {/* Abstract background elements signifying raw ideas */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <motion.div 
             animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
             className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full border-[1px] border-dashed border-white/30" />
          <motion.div 
             animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
             className="absolute top-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full border-[1px] border-white/20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pl-6 xl:pl-48 lg:px-12 w-full relative z-10">
          <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }}
             variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.2 } }, hidden: { opacity: 0 }}}
          >
            <motion.p variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }} className="text-ss-pink font-bold uppercase tracking-[0.3em] text-xs mb-8 flex items-center gap-2">
              <Sparkles size={14} /> Chapter 01: The Spark
            </motion.p>
            
            <motion.h1 variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 40 } }} className="text-[3rem] md:text-[5rem] lg:text-[7.5rem] leading-[0.9] font-black tracking-tighter uppercase mb-8 text-white max-w-5xl">
              Every great brand starts as a <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-ss-orange to-ss-pink">messy idea.</span>
            </motion.h1>

            <motion.p variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 30 } }} className="text-white/60 text-lg md:text-2xl font-light max-w-2xl leading-relaxed mb-16">
              We capture that raw potential and meticulously craft it into world-class digital and physical identities.
            </motion.p>

            <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}>
               <button
                 onClick={() => scrollTo('reel')}
                 className="inline-flex items-center gap-3 px-8 py-5 text-[13px] font-bold uppercase tracking-widest bg-white text-ss-black rounded-full hover:bg-ss-pink hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(229,74,99,0.4)]"
               >
                 Bring Order to Chaos <ArrowDown size={16} />
               </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. CHAPTER 2: THE FORGE ── */}
      <section id="reel" ref={forgeRef} className="min-h-[120svh] relative flex flex-col justify-center border-b border-white/10 py-32 overflow-hidden">
        
        {/* Floating background image fragments representing the "Forge" */}
        <motion.div style={{ y: yImage1, rotate: rotateImage1 }} className="absolute right-[10%] top-[10%] w-[30vw] aspect-[3/4] opacity-30 mix-blend-screen pointer-events-none z-0">
           <Image src="/image/logo/Wild%20Flour%20Mockup.jpg" alt="" fill className="object-cover grayscale brightness-150" />
        </motion.div>
        <motion.div style={{ y: yImage2 }} className="absolute left-[5%] bottom-[10%] w-[20vw] aspect-square opacity-20 mix-blend-screen pointer-events-none z-0">
           <Image src="/image/poster/Poster%20(5).jpeg" alt="" fill className="object-cover grayscale brightness-200" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 xl:pl-48 lg:px-12 w-full relative z-10 flex flex-col items-center">
            
            <motion.div 
               initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-100px", once: true }} transition={{ duration: 0.8 }}
               className="text-center w-full max-w-4xl"
            >
               <p className="text-ss-orange font-bold uppercase tracking-[0.3em] text-xs mb-8">Chapter 02: The Forge</p>
               <h2 className="text-[2.5rem] lg:text-[4.5rem] font-black uppercase tracking-tighter leading-[1] mb-16">
                 We forge potential into <br/><span className="text-ss-orange italic">undeniable identity.</span>
               </h2>
               
               <div className="w-full aspect-video bg-ss-border relative overflow-hidden rounded-[2rem] group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <Image src="/image/poster/Poster%20(1).jpeg" alt="Showreel" fill className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-24 h-24 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center font-bold uppercase tracking-widest text-xs group-hover:bg-ss-orange group-hover:text-black group-hover:border-ss-orange transition-all duration-500 hover:scale-110">
                        Play
                     </div>
                  </div>
               </div>
            </motion.div>
            
            <button onClick={() => scrollTo('works')} className="mt-32 flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors">
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next: The Artifacts</span>
               <ArrowDown size={14} className="animate-bounce" />
            </button>
        </div>
      </section>

      {/* ── 3. CHAPTER 3: THE ARTIFACTS (Branching Narrative) ── */}
      <section id="works" className="min-h-[100svh] py-32 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 xl:pl-48 lg:px-12 w-full">
          
          <motion.div 
             initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
             className="mb-20"
          >
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-xs mb-6">Chapter 03: The Artifacts</p>
            <h2 className="text-[3rem] lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.9] mb-12">
              The artifacts we <br/>leave behind.
            </h2>

            {/* Branching Narrative Prompt */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 max-w-2xl backdrop-blur-sm shadow-2xl">
              <h3 className="text-xl font-bold mb-6">What kind of story do you want to hear?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setGalleryFilter('digital')}
                  className={`flex-1 p-5 rounded-xl border text-left transition-all duration-300 ${galleryFilter === 'digital' ? 'bg-ss-pink border-ss-pink text-white shadow-[0_0_30px_rgba(229,74,99,0.3)] scale-105' : 'border-white/20 hover:border-white/50 bg-transparent text-white/70'}`}
                >
                  <p className="font-black text-lg mb-1">Digital</p>
                  <p className="text-xs opacity-70">Social campaigns & dynamic banners.</p>
                </button>
                <button 
                  onClick={() => setGalleryFilter('physical')}
                  className={`flex-1 p-5 rounded-xl border text-left transition-all duration-300 ${galleryFilter === 'physical' ? 'bg-ss-orange border-ss-orange text-white shadow-[0_0_30px_rgba(238,112,55,0.3)] scale-105' : 'border-white/20 hover:border-white/50 bg-transparent text-white/70'}`}
                >
                  <p className="font-black text-lg mb-1">Physical</p>
                  <p className="text-xs opacity-70">Logos, identities, & tactile packaging.</p>
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {PROJECTS.filter(p => galleryFilter === 'all' ? true : p.cat === galleryFilter).map((p, i) => (
              <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href="/work" className="group block relative">
                  <div className="w-full aspect-[4/5] overflow-hidden bg-white/5 rounded-[2rem] relative border border-white/5">
                    <Image src={p.img} alt={p.title} width={800} height={1000} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity hover:mix-blend-normal" />
                    
                    {/* Hover micro-narrative */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center backdrop-blur-sm">
                       <p className="font-bold text-xl italic drop-shadow-xl text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         "We made them look 10x bigger."
                       </p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-start pl-2">
                    <div>
                      <h3 className="font-black text-3xl tracking-tight mb-2 group-hover:text-ss-pink transition-colors">{p.title}</h3>
                      <p className="text-xs font-bold text-white/40 tracking-widest uppercase">{p.tags.join(" • ")}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center">
             <Link href="/work" className="inline-flex items-center gap-3 px-8 py-4 text-[13px] font-bold uppercase tracking-widest border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300">
                Enter the full archive <ArrowRight size={16} />
             </Link>
          </div>
          
        </div>
      </section>

      {/* ── 4. CHAPTER 4: EPILOGUE (Your Story) ── */}
      <section id="offerings" className="bg-white text-ss-black py-32 min-h-[100svh] flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 xl:pl-48 lg:px-12 w-full relative z-10">
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
             <p className="font-bold text-ss-black/40 uppercase tracking-[0.3em] text-xs mb-8">Chapter 04: The Epilogue</p>
             <h2 className="text-[4rem] lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] mb-24 pb-12">
               Your story <br/> <span className="text-ss-pink">is next.</span>
             </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-32">
            {OFFERINGS.map((offer, i) => (
              <motion.div 
                 key={offer.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                 className="group cursor-default relative"
              >
                <div className="w-12 h-1 bg-ss-pink mb-8 transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
                <h3 className="text-2xl font-black tracking-tight mb-4 leading-tight group-hover:text-ss-pink transition-colors">
                  {offer.title}
                </h3>
                <p className="text-base font-medium tracking-tight text-ss-black/60 leading-relaxed font-sans">
                  {offer.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Interactive Form Story Element */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
             className="bg-ss-light rounded-3xl p-10 lg:p-16 border border-ss-border/10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-ss-pink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-ss-pink/20 transition-colors duration-1000"></div>
            <h2 className="text-[2.5rem] md:text-[4rem] font-black uppercase tracking-tighter leading-[1] mb-10">
              What are you <br/>building?
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
               <input type="text" placeholder="I am creating a..." className="flex-1 bg-white border border-ss-border/10 rounded-2xl px-6 py-5 text-lg outline-none focus:border-ss-pink focus:shadow-[0_0_20px_rgba(229,74,99,0.1)] transition-all font-medium text-ss-black" />
               <Link
                 href="/contact"
                 className="inline-flex shrink-0 items-center justify-center gap-3 px-10 py-5 text-[15px] font-black uppercase tracking-widest bg-ss-black text-white rounded-2xl hover:scale-[1.02] hover:bg-ss-pink transition-all duration-300"
               >
                 Start <ArrowRight size={18} />
               </Link>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
