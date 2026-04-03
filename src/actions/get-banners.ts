"use server";

import fs from "fs";
import path from "path";

export async function getBanners() {
  try {
    const dir = path.join(process.cwd(), "public/image/banner");
    if (!fs.existsSync(dir)) {
      return [];
    }

    const files = fs.readdirSync(dir);

    const validFiles = files.filter(file =>
      /\.(jpg|jpeg|png|webp|mp4)$/i.test(file)
    );

    // Encode spaces so Vercel CDN serves the URLs correctly
    return validFiles.map(file => `/image/banner/${file.replace(/ /g, "%20")}`);
  } catch (error) {
    console.error("Error reading banner images:", error);
    return [];
  }
}
