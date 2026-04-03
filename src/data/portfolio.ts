"use server";

import fs from "fs";
import path from "path";

export type Category =
  | "All"
  | "Business Cards"
  | "Flyers"
  | "Brochure"
  | "Social Media"
  | "Packaging"
  | "Identity"
  | "Other";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: Exclude<Category, "All">;
  image: string;
  bg: string;
  featured?: boolean;
}

export const categories: Category[] = [
  "All",
  "Business Cards",
  "Flyers",
  "Social Media",
  "Packaging",
  "Brochure",
  "Identity",
  "Other"
];

// Pre-defined explicit metadata so existing designs don't lose their specific details
const predefinedMetadata: Record<string, Partial<Project>> = {
  "biz-card-01.jpg": { title: "Business Card", client: "Agni Masala", category: "Business Cards", bg: "#FFE4ED", featured: true },
  "biz-card-02.jpg": { title: "Business Card", client: "Sree Amalgamation", category: "Business Cards", bg: "#FEFAE8", featured: true },
  "biz-card-03.jpg": { title: "Business Card", client: "We Source", category: "Business Cards", bg: "#DCF5EE" },
  "flyer-01.jpg": { title: "Flyer", client: "Chinmaya Academy", category: "Flyers", bg: "#E2F0FF", featured: true },
  "flyer-02.jpg": { title: "Flyer", client: "Easy Market", category: "Flyers", bg: "#E8FFEE" },
  "flyer-03.jpg": { title: "Flyer", client: "FitCamp", category: "Flyers", bg: "#F0EAFF", featured: true },
  "brochure-01.jpg": { title: "Brochure", client: "Newtons", category: "Brochure", bg: "#FEFAE8", featured: true },
  "social-01.jpg": { title: "Social Media Campaign", client: "The Cycle Gap", category: "Social Media", bg: "#E2F0FF", featured: true },
  "social-02.jpg": { title: "Social Media Posts", client: "Brand Campaign", category: "Social Media", bg: "#FFE4ED" },
  "social-03.jpg": { title: "Social Media Posts", client: "Restaurant Brand", category: "Social Media", bg: "#DCF5EE" },
  "social-04.jpg": { title: "Social Media Posts", client: "Lifestyle Brand", category: "Social Media", bg: "#F0EAFF" },
  "social-05.jpg": { title: "Social Media Campaign", client: "Chennai Grocers", category: "Social Media", bg: "#FDFBE4" },
  "social-06.jpg": { title: "Social Media Posts", client: "Retail Brand", category: "Social Media", bg: "#FFE4ED" },
  "social-07.jpg": { title: "Social Media Posts", client: "F&B Brand", category: "Social Media", bg: "#E2F0FF" },
  "packaging-01.jpg": { title: "Product Packaging", client: "Paper Flower", category: "Packaging", bg: "#F0EAFF", featured: true },
  "label-01.jpg": { title: "Label Design", client: "Bioville", category: "Packaging", bg: "#DCF5EE" },
  "id-card-01.jpg": { title: "ID Card Design", client: "Sree Amalgamation", category: "Identity", bg: "#E2F0FF" },
  "newspaper-01.jpg": { title: "Newspaper Ad", client: "Naga's Gold", category: "Identity", bg: "#FEFAE8" },
  "new-1.jpg": { title: "Social Media Campaign", client: "The Cycle Gap", category: "Social Media", bg: "#E2F0FF" },
  "new-2.jpg": { title: "Design Work", client: "Client Project", category: "Identity", bg: "#FFE4ED" },
  "new-3.jpg": { title: "Design Work", client: "Client Project", category: "Identity", bg: "#DCF5EE" },
  "new-4.jpg": { title: "Social Media", client: "Client Project", category: "Social Media", bg: "#FDFBE4" },
  "new-5.jpg": { title: "Social Media Campaign", client: "Chennai Grocers", category: "Social Media", bg: "#FEFAE8" },
  "new-6.jpg": { title: "Design Work", client: "Client Project", category: "Identity", bg: "#F0EAFF" },
  "new-7.jpg": { title: "Social Media", client: "Client Project", category: "Social Media", bg: "#E2F0FF" },
  "new-8.jpg": { title: "Design Work", client: "Client Project", category: "Identity", bg: "#FFE4ED" },
  "new-9.jpg": { title: "Design Work", client: "Client Project", category: "Flyers", bg: "#DCF5EE" },
  "new-10.jpg": { title: "Design Work", client: "Client Project", category: "Social Media", bg: "#FDFBE4" },
};

// Fallback background colors to iterate through for new files
const fallbackBgs = ["#FFE4ED", "#FEFAE8", "#DCF5EE", "#E2F0FF", "#E8FFEE", "#F0EAFF", "#FDFBE4"];

function getCategoryFromFilename(filename: string): { cat: Exclude<Category, "All">, title: string } {
  const lower = filename.toLowerCase();
  if (lower.startsWith("biz") || lower.includes("card")) return { cat: "Business Cards", title: "Business Card" };
  if (lower.startsWith("flyer")) return { cat: "Flyers", title: "Flyer Design" };
  if (lower.startsWith("brochure")) return { cat: "Brochure", title: "Brochure Design" };
  if (lower.startsWith("social") || lower.includes("post")) return { cat: "Social Media", title: "Social Media Post" };
  if (lower.startsWith("package") || lower.startsWith("pack") || lower.includes("label")) return { cat: "Packaging", title: "Packaging Design" };
  if (lower.startsWith("id") || lower.includes("brand") || lower.includes("news")) return { cat: "Identity", title: "Identity Design" };
  return { cat: "Other", title: "Design Project" }; // Fallback
}

/**
 * Dynamically fetches and constructs the projects list from the public/portfolio directory.
 * If new images are added, they are automatically categorized based on their filename!
 */
export async function getPortfolioProjects(): Promise<Project[]> {
  const dir = path.join(process.cwd(), "public/portfolio");
  let files: string[] = [];
  
  try {
    if (fs.existsSync(dir)) {
      files = fs.readdirSync(dir).filter(file => 
        /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file) && !file.startsWith("preview-")
      );
    }
  } catch (error) {
    console.error("Error reading portfolio directory:", error);
  }

  // Construct the array
  const dynamicProjects: Project[] = files.map((file, index) => {
    const predefined = predefinedMetadata[file];
    const autoCat = getCategoryFromFilename(file);
    
    return {
      id: file.replace(/\.[^/.]+$/, ""), // e.g. "biz-card-01"
      title: predefined?.title || autoCat.title,
      client: predefined?.client || "Custom Project",
      category: predefined?.category || autoCat.cat,
      image: `/portfolio/${file}`,
      bg: predefined?.bg || fallbackBgs[index % fallbackBgs.length],
      featured: predefined?.featured || false
    };
  });

  return dynamicProjects;
}

/**
 * Helper to get only featured projects dynamically
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getPortfolioProjects();
  return allProjects.filter(p => p.featured);
}
