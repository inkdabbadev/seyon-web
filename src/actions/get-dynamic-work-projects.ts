"use server";

import fs from "fs";
import path from "path";

type Cat = "All" | "Social Media" | "Banners" | "Logos" | "Packaging";

export interface Project {
  id: string;
  title: string;
  client: string;
  cat: Cat;
  tags: string[];
  img: string;
}

const PREDEFINED: Record<string, Partial<Project>> = {
  "/image/poster/Poster (1).jpeg": { title: "Fantastic Friday", client: "The Cycle Gap", tags: ["#poster", "#event", "#nightlife"] },
  "/image/poster/Poster (2).jpeg": { title: "Event Night", client: "The Cycle Gap", tags: ["#poster", "#socialmedia"] },
  "/image/poster/Poster (3).jpeg": { title: "Weekend Special", client: "Brand Campaign", tags: ["#poster", "#promotion"] },
  "/image/poster/Poster (4).jpeg": { title: "Offer Post", client: "Brand Campaign", tags: ["#socialmedia", "#offer"] },
  "/image/poster/Poster (5).jpeg": { title: "Brand Campaign", client: "Retail Client", tags: ["#socialmedia", "#branding"] },
  "/image/logo/Wild Flour Mockup.jpg": { title: "Wild Flour", client: "Wild Flour", tags: ["#logo", "#branding", "#packaging"] },
  "/image/logo/Zen Enterprises Logo-04.jpg": { title: "Zen Enterprises", client: "Zen Enterprises", tags: ["#logo", "#identity", "#branding"] },
  "/image/logo/Conectr.png": { title: "Conectr", client: "Conectr", tags: ["#logo", "#tech", "#startup"] },
  "/image/label/Agni Masala Branding-12.jpg": { title: "Agni Masala Brand", client: "Agni Masala", tags: ["#packaging", "#label", "#branding"] },
  "/image/label/Agni Masala Branding-16.jpg": { title: "Agni Masala Series", client: "Agni Masala", tags: ["#packaging", "#label"] },
  "/image/label/Plumoeasy Mockup-1.jpg": { title: "Plumoeasy", client: "Plumoeasy", tags: ["#packaging", "#mockup", "#label"] }
};

export async function getDynamicWorkProjects(): Promise<Project[]> {
  const categoriesToScan = [
    { folder: "poster", cat: "Social Media" as Cat, defaultTags: ["#social", "#poster"], defaultTitle: "Social Media Campaign" },
    { folder: "logo", cat: "Logos" as Cat, defaultTags: ["#logo", "#branding"], defaultTitle: "Brand Identity" },
    { folder: "label", cat: "Packaging" as Cat, defaultTags: ["#packaging", "#label"], defaultTitle: "Packaging Design" },
    { folder: "banner", cat: "Banners" as Cat, defaultTags: ["#banner", "#digital"], defaultTitle: "Digital Banner" }
  ];

  const allProjects: Project[] = [];

  for (const group of categoriesToScan) {
    const dir = path.join(process.cwd(), "public/image", group.folder);
    try {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file)) {
            const imgPath = `/image/${group.folder}/${file}`;
            const predefined = PREDEFINED[imgPath] || {};
            
            // Format ID by stripping extension and sanitizing spaces
            const id = file.replace(/\.[^/.]+$/, "").replace(/\s+/g, '-').toLowerCase();

            allProjects.push({
              id: id,
              title: predefined.title || group.defaultTitle,
              client: predefined.client || "Seyon Archive",
              cat: group.cat,
              tags: predefined.tags || group.defaultTags,
              img: imgPath
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error reading ${group.folder} directory:`, error);
    }
  }

  // Shuffle projects randomly to maintain archive feel, but optionally sort if needed
  return allProjects.sort(() => Math.random() - 0.5);
}
