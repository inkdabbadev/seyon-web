"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";

// ─── Services data ─────────────────────────────────────────────────────────
const SERVICES = [
  {
    n: "01",
    title: "Social Media Design",
    short: "Posts, stories, reels covers & campaigns.",
    desc: "We design scroll-stopping social media content — posts, story templates, carousel slides, highlight covers, and full campaign assets. Whether you need a weekly content pack or a launch campaign, we build visuals that grow your audience and keep your feed on-brand.",
    deliverables: ["Post designs", "Story templates", "Carousel slides", "Highlight covers", "Campaign kits"],
    img: "/image/poster/Poster%20(1).jpeg",
  },
  {
    n: "02",
    title: "Logo & Brand Identity",
    short: "Marks, wordmarks & complete brand systems.",
    desc: "A great logo is the foundation of everything. We create logos, wordmarks, and full brand identity systems — including colour palettes, typography, usage guidelines, and brand stationery — that capture who you are and give your business a visual voice.",
    deliverables: ["Primary logo", "Logo variations", "Colour palette", "Typography system", "Brand guidelines"],
    img: "/image/logo/Wild%20Flour%20Mockup.jpg",
  },
  {
    n: "03",
    title: "Digital Banners",
    short: "E-commerce, ads & marketing banners.",
    desc: "Banners that convert. We design e-commerce banners, digital advertising creatives, and marketing visuals built for performance. Clean, bold, and always on-brand — whether you need a single hero banner or a full ad set across multiple sizes.",
    deliverables: ["Hero banners", "Ad creatives", "E-commerce sliders", "Promotional banners", "Multi-size sets"],
    img: "/image/banner/Banner%20(1).jpeg",
  },
  {
    n: "04",
    title: "Event Posters",
    short: "Event, promotional & announcement posters.",
    desc: "Event posters that demand attention — online and offline. From nightlife events and music gigs to brand launches and festivals, we create poster designs that people photograph, share, and remember long after the event.",
    deliverables: ["Event posters", "A3 / A4 print files", "Digital versions", "Social adaptations", "Series designs"],
    img: "/image/poster/Poster%20(2).jpeg",
  },
  {
    n: "05",
    title: "Packaging & Labels",
    short: "Product labels, boxes & packaging design.",
    desc: "Packaging that sells on the shelf. We design product labels, sticker designs, box packaging, and full packaging systems for food, beverage, beauty, and consumer goods brands. Every design is crafted to attract, communicate, and convert at the point of sale.",
    deliverables: ["Product labels", "Box / bag design", "Sticker designs", "Print-ready files", "Mockup presentations"],
    img: "/image/label/Agni%20Masala%20Branding-12.jpg",
  },
  {
    n: "06",
    title: "Print Design",
    short: "Business cards, brochures, flyers & more.",
    desc: "Offline materials that leave a lasting impression. Business cards, brochures, flyers, menus, letterheads, certificates — we handle all print design needs with attention to typography, layout, and print specifications.",
    deliverables: ["Business cards", "Brochures", "Flyers", "Menus & leaflets", "Print-ready PDFs"],
    img: "/image/banner/Banner%20(3).jpeg",
  },
];

// ─── Service row (expandable) ─────────────────────────────────────────────
function ServiceRow({ s }: { s: typeof SERVICES[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ss-border">
      <button
        className="w-full text-left flex items-start gap-6 py-8 group"
        onClick={() => setOpen(!open)}
      >
        <span className="label text-ss-gray w-7 flex-shrink-0 pt-1">{s.n}</span>
        <div className="flex-1 min-w-0">
          <p className="font-black text-[clamp(1.4rem,2.5vw,2rem)] text-ss-black leading-tight tracking-tight group-hover:translate-x-1 transition-transform duration-200">
            {s.title}
          </p>
          {!open && (
            <p className="text-ss-gray text-[14px] mt-1.5">{s.short}</p>
          )}
        </div>
        <Plus
          size={20}
          className={`text-ss-gray flex-shrink-0 mt-1.5 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-400 ${open ? "max-h-[500px] pb-10" : "max-h-0"}`}
      >
        <div className="grid md:grid-cols-[1fr_260px] gap-10 pl-[52px]">
          <div>
            <p className="text-ss-gray text-[15px] leading-relaxed mb-8 max-w-lg">{s.desc}</p>
            <div>
              <p className="label text-ss-gray mb-4">What you get</p>
              <ul className="space-y-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-[14px] text-ss-black font-medium">
                    <span className="w-1 h-1 rounded-full bg-ss-black flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-white bg-ss-black px-5 py-2.5 rounded-full hover:opacity-75 transition-opacity"
            >
              Start this project <ArrowRight size={13} />
            </Link>
          </div>
          <div className="hidden md:block rounded-xl overflow-hidden aspect-square border border-ss-border bg-ss-light">
            <Image
              src={s.img}
              alt={s.title}
              width={260}
              height={260}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Process steps ─────────────────────────────────────────────────────────
const PROCESS = [
  { n: "01", h: "Discovery",   b: "We learn your brand, your audience, and your goals before we open a single file." },
  { n: "02", h: "Concept",     b: "Two or three initial directions with rationale. You choose a path and we push it further." },
  { n: "03", h: "Refinement",  b: "Rounds of revisions until every detail is exactly right. No vague approval loops." },
  { n: "04", h: "Delivery",    b: "Print-ready or screen-ready files, organised and documented for your team to use." },
];

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <>
      {/* ── Page header ── */}
      <section className="bg-ss-white pt-32 pb-20 lg:pt-44 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="label text-ss-gray mb-5">What We Do</p>
          <h1
            className="font-black text-ss-black leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: "clamp(3rem,6vw,5.5rem)" }}
          >
            Our Services.
          </h1>
          <p className="text-ss-gray text-[16px] leading-relaxed max-w-lg">
            Six focused disciplines. Each one built around helping your brand
            communicate clearly, look great, and leave a mark.
          </p>
        </div>
      </section>

      {/* ── Service accordion ── */}
      <section className="bg-ss-white border-t border-ss-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="border-t border-ss-border">
            {SERVICES.map((s) => (
              <ServiceRow key={s.n} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-ss-light py-24 lg:py-32 border-t border-ss-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="label text-ss-gray mb-5">How It Works</p>
          <h2
            className="font-black text-ss-black tracking-tight mb-14"
            style={{ fontSize: "clamp(2rem,3.5vw,2.8rem)" }}
          >
            Our process.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p) => (
              <div key={p.n} className="bg-white rounded-2xl p-7 border border-ss-border">
                <p className="label text-ss-gray mb-5">{p.n}</p>
                <h3 className="font-bold text-xl text-ss-black mb-3">{p.h}</h3>
                <p className="text-ss-gray text-[13px] leading-relaxed">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ss-black py-24 lg:py-36">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="label text-white/30 mb-6">Ready to Start?</p>
          <h2
            className="font-black text-white leading-[0.95] tracking-tight mb-10"
            style={{ fontSize: "clamp(2.5rem,5vw,4.2rem)" }}
          >
            Pick a service.<br />Let&apos;s get to{" "}
            <em
              className="italic"
              style={{
                background: "linear-gradient(135deg,#8B1FBD,#E8175E,#FF6426)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              work.
            </em>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-[14px] font-semibold text-ss-black bg-white rounded-full hover:bg-white/90 hover:scale-[1.02] transition-all"
          >
            Start a project <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
