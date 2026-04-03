import React from "react";

export default function FloatingBadge() {
  const text = "Branding for the Seriously Fun • Seyon Studio • ";
  const chars = text.split("");

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center justify-center w-28 h-28 mix-blend-difference pointer-events-none">
      <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
        {chars.map((char, i) => (
          <span
            key={i}
            className="absolute top-0 left-1/2 -ml-[4px] origin-[0_56px] text-[10px] font-bold uppercase tracking-widest text-ss-white"
            style={{ transform: `rotate(${i * (360 / chars.length)}deg)` }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="w-2 h-2 bg-ss-white rounded-full"></div>
    </div>
  );
}
