"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const services = [
  "Social Media Design",
  "Logo & Brand Identity",
  "Digital Banners",
  "Event Posters",
  "Packaging & Labels",
  "Print Design",
];

const pages = [
  { href: "/",        label: "Home" },
  { href: "/work",    label: "Work" },
  { href: "/about",   label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide the footer entirely on the /work page as requested
  if (pathname?.startsWith("/work")) {
    return null;
  }

  return (
    <footer className="bg-black text-white pt-24 pb-12 rounded-t-[3rem] mt-[-3rem] relative z-[60] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        
        {/* Massive Headline */}
        <h2 className="text-[12vw] leading-[0.9] font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
          We're all <br/> ears.
        </h2>

        <div className="mb-24">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-5 text-[13px] font-black tracking-[0.2em] uppercase bg-white text-black rounded-full hover:bg-ss-pink hover:text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(229,74,99,0.4)] transition-all duration-300"
          >
            Initiate Contact
          </Link>
        </div>

        {/* Footer links grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left border-t border-white/10 pt-16">
          
          <div>
            <Image
              src="/logo/logo.png"
              alt="Seyon Studio"
              width={100}
              height={30}
              className="h-8 w-auto object-contain brightness-0 invert mb-6 opacity-80"
            />
            <p className="text-white/40 text-[13px] font-medium leading-relaxed">
              Branding for the Seriously Fun.<br/>
              Engineered in India.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 mb-6">Directory</p>
            <ul className="space-y-4">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[14px] font-medium text-white/70 hover:text-ss-pink transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 mb-6">Protocols</p>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s} className="text-[14px] font-medium text-white/50">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 mb-6">Network</p>
            <ul className="space-y-4">
              <li><a href="#" className="text-[14px] font-medium text-white/70 hover:text-ss-pink transition-colors">Instagram</a></li>
              <li><a href="#" className="text-[14px] font-medium text-white/70 hover:text-ss-pink transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-[14px] font-medium text-white/70 hover:text-ss-pink transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-20 pt-8 border-t border-white/5 text-[11px] text-white/30 font-bold uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Seyon Studio.</p>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors mt-6 sm:mt-0 flex items-center gap-2">
            Return to orbit <span className="text-[14px]">↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
