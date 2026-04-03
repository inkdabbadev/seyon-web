"use server";

// NOTE: fs.readdirSync does NOT work on Vercel — the public/ folder is served
// via CDN and is not present in the serverless Lambda filesystem.
// Banner paths are declared statically here instead.
// To add a new banner: upload to /public/image/banner/ and add the path below.

const BANNERS: string[] = [
  "/image/banner/Banner%20(1).jpeg",
  "/image/banner/Banner%20(2).jpeg",
  "/image/banner/Banner%20(3).jpeg",
];

export async function getBanners(): Promise<string[]> {
  return BANNERS;
}
