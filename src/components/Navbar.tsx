"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/",        label: "Home" },
  { href: "/work",    label: "Work" },
  { href: "/about",   label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: Youtube,   href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter,   href: "#" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [menuOpen]);

  return (
    <>
      {/* ── Minimal Floating Logo & Trigger ── */}
      <div className="fixed top-0 left-0 right-0 z-[70] pointer-events-none p-6 lg:p-12 flex justify-between items-start">
        <Link href="/" className="pointer-events-auto group">
           <Image
              src="/logo/logo.png"
              alt="Seyon Studio"
              width={120}
              height={36}
              className="h-6 lg:h-7 w-auto object-contain brightness-0 invert transition-all duration-500 group-hover:scale-105"
            />
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="pointer-events-auto group flex flex-col items-end gap-1.5 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-ss-pink hover:border-ss-pink transition-all duration-300 shadow-2xl"
        >
          <div className="w-8 h-[2px] bg-white group-hover:w-10 transition-all duration-300"></div>
          <div className="w-6 h-[2px] bg-white group-hover:w-10 transition-all duration-300"></div>
          <div className="w-10 h-[2px] bg-white transition-all duration-300"></div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 group-hover:text-white mt-1">Menu</span>
        </button>
      </div>

      {/* ── Aesthetic Side Navigation ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-end"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Content Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="relative w-full lg:w-[40vw] h-full bg-[#080808] border-l border-white/5 flex flex-col p-8 lg:p-16 overflow-hidden"
            >
              {/* Vertical Text Accent */}
              <div className="absolute left-6 bottom-16 -rotate-90 origin-left hidden lg:block">
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/10 whitespace-nowrap">
                  ESTD 2024 / SEYON STUDIO PROTOCAL
                </span>
              </div>

              {/* Close Button */}
              <div className="flex justify-end mb-16">
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="w-16 h-16 flex items-center justify-center rounded-full border border-white/10 hover:bg-ss-pink hover:border-ss-pink transition-all duration-500 group shadow-lg"
                >
                  <X size={28} className="text-white group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-6 lg:gap-8 flex-grow">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="group relative inline-block py-2"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-[10px] font-bold text-ss-pink opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">0{i + 1}</span>
                        <span className={`text-5xl lg:text-7xl font-black uppercase tracking-tighter transition-all duration-500 ${pathname === link.href ? "text-ss-pink" : "text-white/80 group-hover:text-ss-pink group-hover:pl-4"}`}>
                          {link.label}
                        </span>
                      </div>
                      <div className="h-0.5 w-0 group-hover:w-full bg-ss-pink transition-all duration-500 absolute bottom-0 left-0 shadow-[0_0_15px_rgba(229,74,99,0.5)]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer Section */}
              <div className="mt-auto pt-12 border-t border-white/10 flex flex-col gap-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20">Enquiries</p>
                    <a href="mailto:inkdabba.ai@gmail.com" className="text-sm font-bold hover:text-ss-pink transition-colors">inkdabba.ai@gmail.com</a>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20">Social</p>
                    <div className="flex gap-4">
                      {socialLinks.map((s, i) => (
                        <a key={i} href={s.href} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-ss-pink transition-all">
                          <s.icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] font-black tracking-[0.2em] text-white/10 uppercase">
                  <span>© 2026 Seyon Studio</span>
                  <Link href="/contact" className="flex items-center gap-2 text-ss-pink/60 hover:text-ss-pink transition-colors">
                    Start a project <ArrowRight size={10} />
                  </Link>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-ss-pink/10 blur-[120px] rounded-full pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}