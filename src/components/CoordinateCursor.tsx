"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CoordinateCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    if (window.innerWidth > 768) {
      setIsDesktop(true);
    }
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full border border-ss-orange mix-blend-difference pointer-events-none z-[100] flex items-center justify-center bg-transparent"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      >
        <div className="w-[2px] h-[2px] bg-ss-pink rounded-full" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] text-[10px] font-mono tracking-widest text-white/50 mix-blend-difference whitespace-nowrap"
        animate={{
          x: mousePosition.x + 16,
          y: mousePosition.y + 16,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        [X:{Math.round(mousePosition.x)} Y:{Math.round(mousePosition.y)}]
      </motion.div>
    </>
  );
}
