"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const links = [
  { href: "/work",    label: "Work" },
  { href: "/about",   label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Main header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[80px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex items-center py-1.5 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/logo.png"
                alt="Seyon Studio"
                width={120}
                height={36}
                className="h-8 w-auto object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                priority
              />
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <MagneticButton key={l.href} strength={0.15}>
                <Link
                  href={l.href}
                  className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 relative group px-2 py-2 ${
                    pathname === l.href
                      ? "text-ss-pink drop-shadow-[0_0_10px_rgba(229,74,99,0.5)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {l.label}
                  {pathname === l.href && (
                     <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-ss-pink shadow-[0_0_10px_rgba(229,74,99,1)]"></span>
                  )}
                </Link>
              </MagneticButton>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-6">
            <MagneticButton strength={0.3}>
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[11px] font-black tracking-[0.2em] uppercase border border-white/20 text-white rounded-full hover:bg-ss-pink hover:border-ss-pink hover:text-white hover:shadow-[0_0_20px_rgba(229,74,99,0.4)] transition-all duration-300"
              >
                Start Protocol
              </Link>
            </MagneticButton>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:text-ss-pink hover:bg-white/5 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 z-[65] md:hidden transition-all duration-500 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[80vw] bg-ss-black border-l border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] flex flex-col ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Image src="/logo/logo.png" alt="Seyon Studio" width={100} height={30} className="h-7 w-auto object-contain brightness-0 invert" />
            <button onClick={() => setMenuOpen(false)} className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full">
              <X size={20} />
            </button>
          </div>
          <nav className="p-8 flex flex-col gap-6 flex-grow">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Navigation</p>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-3xl font-black uppercase tracking-tighter transition-all duration-300 flex items-center gap-4 ${pathname === l.href ? "text-ss-pink" : "text-white/70 hover:text-white"}`}
              >
                {l.label}
                {pathname === l.href && <span className="w-2 h-2 rounded-full bg-ss-pink shadow-[0_0_10px_rgba(229,74,99,0.8)]"></span>}
              </Link>
            ))}
          </nav>

          <div className="p-8 border-t border-white/10 bg-white/5">
             <Link
               href="/contact"
               className="flex items-center justify-center w-full py-5 text-[12px] font-black tracking-[0.2em] uppercase bg-white text-black rounded-full hover:bg-ss-pink hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
             >
               Start Protocol
             </Link>
          </div>
        </div>
      </div>
    </>
  );
}