"use server";

// All 26 banners listed statically — works on Vercel (fs does not).
// To add a new banner: upload to /public/image/banner/ and add the path below.

const BANNERS: string[] = [
  "/image/banner/Banner%20(1).jpeg",
  "/image/banner/Banner%20(2).jpeg",
  "/image/banner/Banner%20(3).jpeg",
  "/image/banner/Banner%20(4).jpeg",
  "/image/banner/Banner%20(5).jpeg",
  "/image/banner/Banner%20(6).jpeg",
  "/image/banner/Banner%20(7).jpeg",
  "/image/banner/Banner%20(8).jpeg",
  "/image/banner/Banner%20(9).jpeg",
  "/image/banner/Banner%20(10).jpeg",
  "/image/banner/Banner%20(11).jpeg",
  "/image/banner/Banner%20(12).jpeg",
  "/image/banner/Banner%20(13).jpeg",
  "/image/banner/Banner%20(14).jpeg",
  "/image/banner/Banner%20(15).jpeg",
  "/image/banner/Banner%20(16).jpeg",
  "/image/banner/Banner%20(17).jpeg",
  "/image/banner/Banner%20(18).jpeg",
  "/image/banner/Banner%20(19).jpeg",
  "/image/banner/Banner%20(20).jpeg",
  "/image/banner/Banner%20(21).jpeg",
  "/image/banner/Banner%20(22).jpeg",
  "/image/banner/Banner%20(23).jpeg",
  "/image/banner/Banner%20(24).jpeg",
  "/image/banner/Banner%20(25).jpeg",
  "/image/banner/Banner%20(26).jpeg",
];

export async function getBanners(): Promise<string[]> {
  return BANNERS;
}
