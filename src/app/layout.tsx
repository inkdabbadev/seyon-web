import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBadge from "@/components/FloatingBadge";

export const metadata: Metadata = {
  title: "Seyon Studio — Branding for the Seriously Fun",
  description:
    "We transform brands through design and creativity. Social media, logos, banners, packaging — built in India.",
  keywords: ["Seyon Studio", "graphic design", "social media", "logo design", "branding", "India"],
  openGraph: {
    title: "Seyon Studio — Branding for the Seriously Fun",
    description: "Transforming brands through design and creativity.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-ss-cream text-ss-black antialiased overflow-x-hidden selection:bg-black selection:text-ss-orange">
        <Navbar />
        <FloatingBadge />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
