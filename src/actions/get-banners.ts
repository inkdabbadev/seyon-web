"use server";

import fs from "fs";
import path from "path";

export async function getBanners() {
  try {
    const dir = path.join(process.cwd(), "public/image/banner");
    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      return [];
    }
    
    const files = fs.readdirSync(dir);
    
    // Filter for valid image formats
    const validFiles = files.filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.png') ||
      file.toLowerCase().endsWith('.webp') ||
      file.toLowerCase().endsWith('.mp4')
    );

    // Map to public paths
    return validFiles.map(file => `/image/banner/${file}`);
  } catch (error) {
    console.error("Error reading banner images:", error);
    return [];
  }
}
