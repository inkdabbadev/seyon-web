"use server";

// NOTE: fs.readdirSync does NOT work on Vercel — the public/ folder is served
// via CDN and is not present in the serverless Lambda filesystem.
// All projects are declared statically here instead.
// To add a new project: upload the image to /public/image/<folder>/ and add
// an entry to the PROJECTS array below.

type Cat = "All" | "Social Media" | "Banners" | "Logos" | "Packaging";

export interface Project {
  id: string;
  title: string;
  client: string;
  cat: Cat;
  tags: string[];
  img: string;
}

const PROJECTS: Project[] = [
  // ── Social Media ──────────────────────────────────────────────────────────
  { id: "p01", title: "Fantastic Friday",   client: "The Cycle Gap",  cat: "Social Media", tags: ["#poster", "#event", "#nightlife"], img: "/image/poster/Poster%20(1).jpeg" },
  { id: "p02", title: "Event Night",        client: "The Cycle Gap",  cat: "Social Media", tags: ["#poster", "#socialmedia"],        img: "/image/poster/Poster%20(2).jpeg" },
  { id: "p03", title: "Weekend Special",    client: "Brand Campaign", cat: "Social Media", tags: ["#poster", "#promotion"],          img: "/image/poster/Poster%20(3).jpeg" },
  { id: "p04", title: "Offer Post",         client: "Brand Campaign", cat: "Social Media", tags: ["#socialmedia", "#offer"],         img: "/image/poster/Poster%20(4).jpeg" },
  { id: "p05", title: "Brand Campaign",     client: "Retail Client",  cat: "Social Media", tags: ["#socialmedia", "#branding"],      img: "/image/poster/Poster%20(5).jpeg" },

  // ── Banners ───────────────────────────────────────────────────────────────
  { id: "b01", title: "Baking Essentials",  client: "E-Commerce",     cat: "Banners",      tags: ["#banner", "#ecommerce", "#food"], img: "/image/banner/Banner%20(1).jpeg" },
  { id: "b02", title: "Product Banner",     client: "Online Store",   cat: "Banners",      tags: ["#banner", "#product"],            img: "/image/banner/Banner%20(2).jpeg" },
  { id: "b03", title: "Sale Banner",        client: "Retail Brand",   cat: "Banners",      tags: ["#banner", "#sale", "#ecommerce"], img: "/image/banner/Banner%20(3).jpeg" },

  // ── Logos ─────────────────────────────────────────────────────────────────
  { id: "l01", title: "Wild Flour",         client: "Wild Flour",       cat: "Logos",      tags: ["#logo", "#branding", "#packaging"], img: "/image/logo/Wild%20Flour%20Mockup.jpg" },
  { id: "l02", title: "Zen Enterprises",    client: "Zen Enterprises",  cat: "Logos",      tags: ["#logo", "#identity", "#branding"],  img: "/image/logo/Zen%20Enterprises%20Logo-04.jpg" },
  { id: "l03", title: "Conectr",            client: "Conectr",          cat: "Logos",      tags: ["#logo", "#tech", "#startup"],       img: "/image/logo/Conectr.png" },

  // ── Packaging ─────────────────────────────────────────────────────────────
  { id: "k01", title: "Agni Masala Brand",  client: "Agni Masala",    cat: "Packaging",    tags: ["#packaging", "#label", "#branding"], img: "/image/label/Agni%20Masala%20Branding-12.jpg" },
  { id: "k02", title: "Agni Masala Series", client: "Agni Masala",    cat: "Packaging",    tags: ["#packaging", "#label"],              img: "/image/label/Agni%20Masala%20Branding-16.jpg" },
  { id: "k03", title: "Plumoeasy",          client: "Plumoeasy",      cat: "Packaging",    tags: ["#packaging", "#mockup", "#label"],   img: "/image/label/Plumoeasy%20Mockup-1.jpg" },
];

export async function getDynamicWorkProjects(): Promise<Project[]> {
  // Shuffle on every call to keep the archive feel
  return [...PROJECTS].sort(() => Math.random() - 0.5);
}
