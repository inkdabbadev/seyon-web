/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable telemetry reaching out during build
  // (also set NEXT_TELEMETRY_DISABLED=1 in your env / CI)

  images: {
    // Keep unoptimized so the site works on any static host / local IP preview.
    // Switch to `unoptimized: false` if you deploy to Vercel or a Node server
    // that supports Next.js image optimisation.
    unoptimized: true,
  },

  // Silence the "use client" / "use server" boundary warnings in production logs
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
