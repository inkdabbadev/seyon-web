"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const VALUES = [
  { n: "01", h: "Craft over templates", b: "Every pixel has a reason. We build from scratch with your brand — not from a drag-and-drop library." },
  { n: "02", h: "Speed without sacrifice", b: "Tight deadlines are just a constraint to design around. We deliver fast and we deliver right." },
  { n: "03", h: "Design with purpose", b: "Visuals that don't just look good — they work. Every element earns its place." },
  { n: "04", h: "Honest communication", b: "No jargon, no sugarcoating. We tell you exactly what will work and why." },
];

const PROCESS = [
  { s: "01", h: "Discovery", b: "We learn your brand, audience, and goals before touching a single tool." },
  { s: "02", h: "Concept", b: "Initial directions with rationale. You pick the direction, we push it further." },
  { s: "03", h: "Refine", b: "Iterations until every detail is exactly right. No guesswork involved." },
  { s: "04", h: "Deploy", b: "Print-ready or screen-ready files, organised and documented for your team." },
];

export default function AboutPage() {
  return (
    <div className="bg-ss-black text-white min-h-[100svh] selection:bg-ss-pink selection:text-white overflow-hidden">

      {/* ── Hero: The Manifesto ── */}
      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 relative border-b border-white/10">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-ss-orange/5 to-transparent rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-black text-[clamp(2.5rem,7vw,7rem)] text-white leading-[0.9] tracking-tighter max-w-4xl mb-12">
            We make design<br />
            work <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-ss-orange to-ss-pink">hard.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
            Not in a bad way. At Seyon Studio, we obsess over details so you don't
            have to. Based in India, building visual systems that command attention.
          </motion.p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-24 lg:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">

            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
              <p className="font-bold text-white/30 uppercase tracking-[0.3em] text-[10px] mb-6">Our Origins</p>
              <h2 className="font-black text-[2.5rem] lg:text-[4.5rem] text-white tracking-tighter leading-[0.9] mb-10">
                Ink, ideas & <br /><span className="text-ss-orange italic">raw potential.</span>
              </h2>
              <div className="space-y-6 text-white/50 text-lg font-light leading-relaxed">
                <p>
                  Seyon Studio started with a conviction: brands deserve design that isn't just functional, but makes people stop and feel something.
                </p>
                <p>
                  We've built entire campaign systems for hospitality, logo frameworks for startups, and packaging for artisan purveyors. Every project fundamentally shifted how that brand was perceived.
                </p>
                <p>
                  Today we're a lean, focused studio. No account managers. No layers. Just creatives executing at the highest level.
                </p>
              </div>
            </motion.div>

            {/* Cinematic Image Collage */}
            <div className="relative h-[600px] w-full">
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -5 }} whileInView={{ opacity: 1, y: 0, rotate: -2 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="absolute top-0 right-[10%] w-[60%] aspect-[3/4] bg-white/5 border border-white/10 p-2 rounded-2xl shadow-2xl z-20 overflow-hidden"
              >
                <div className="w-full h-full relative overflow-hidden rounded-xl">
                  <Image src="/image/logo/Wild%20Flour%20Mockup.jpg" alt="Wild Flour" fill quality={75} loading="lazy" sizes="(max-width: 1200px) 100vw, 50vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -40, rotate: 5 }} whileInView={{ opacity: 1, y: 0, rotate: 4 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-[10%] left-[5%] w-[55%] aspect-square bg-white/5 border border-white/10 p-2 rounded-2xl shadow-2xl z-10 overflow-hidden"
              >
                <div className="w-full h-full relative overflow-hidden rounded-xl">
                  <Image src="/image/poster/Poster%20(1).jpeg" alt="Poster" fill quality={75} loading="lazy" sizes="(max-width: 1200px) 100vw, 50vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 lg:py-40 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
            <p className="font-bold text-white/30 uppercase tracking-[0.3em] text-[10px] mb-6">The Ethos</p>
            <h2 className="font-black text-[3rem] lg:text-[5.5rem] tracking-tighter leading-[0.9]">
              How we <span className="italic text-ss-pink">think.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.n}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-black/50 backdrop-blur-sm rounded-[2rem] p-8 border border-white/5 hover:border-ss-pink/30 hover:-translate-y-2 transition-all duration-300 group"
              >
                <span className="font-black text-5xl text-white/10 group-hover:text-ss-pink transition-colors block mb-8">{val.n}</span>
                <h3 className="font-black text-xl text-white mb-4 leading-tight">{val.h}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed font-medium">{val.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 lg:py-40 relative">
        <div className="absolute left-0 top-[20%] w-[30vw] h-[30vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-ss-pink/5 to-transparent rounded-full pointer-events-none -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="font-bold text-white/30 uppercase tracking-[0.3em] text-[10px] mb-6">The Methodology</p>
            <h2 className="font-black text-[3rem] lg:text-[5.5rem] tracking-tighter leading-[0.9]">
              How it <span className="italic text-ss-orange">works.</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl">
            {PROCESS.map((pr, i) => (
              <motion.div
                key={pr.s}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="py-10 border-b border-white/10 grid md:grid-cols-[100px_1fr_1.5fr] gap-6 items-start group"
              >
                <span className="font-black text-2xl text-white/30 group-hover:text-white transition-colors">{pr.s}</span>
                <h3 className="font-black text-3xl text-white">{pr.h}</h3>
                <p className="text-white/50 text-lg leading-relaxed pt-1">{pr.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 lg:py-48 border-t border-white/10 relative overflow-hidden bg-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-black text-[clamp(2.5rem,6vw,5.5rem)] text-white tracking-tighter leading-[0.9] mb-12">
            Ready to break the <br />
            <span className="italic text-ss-pink">status quo?</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex justify-center items-center gap-3 px-10 py-5 text-[14px] font-black uppercase tracking-widest text-black bg-white rounded-full hover:bg-ss-pink hover:text-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(229,74,99,0.4)]">
              Initialize Project <ArrowRight size={16} />
            </Link>
            <Link href="/work" className="inline-flex justify-center items-center gap-3 px-10 py-5 text-[14px] font-black uppercase tracking-widest text-white border border-white/20 rounded-full hover:bg-white/10 transition-all">
              Inspect The Archive
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
