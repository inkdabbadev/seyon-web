import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ss: {
          orange:  "#EE7037",
          cream:   "#F0EEE2",
          light:   "#F5F4EF",
          pink:    "#E54A63",
          black:   "#000000",
          white:   "#FFFFFF",
          gray:    "#717171",
          border:  "#1A1A1A",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"],
        body:    ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      animation: {
        marquee:  "marquee 30s linear infinite",
        marquee2: "marquee2 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marquee2: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
