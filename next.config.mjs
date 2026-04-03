/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimisation is ON (default).
  // Vercel handles this for free — images are auto-converted to WebP/AVIF,
  // resized to the requested size, and cached on the CDN edge.
  // This is the biggest single performance win for an image-heavy site.
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow any image sourced from the same origin (local /public folder)
    remotePatterns: [],
  },

  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
