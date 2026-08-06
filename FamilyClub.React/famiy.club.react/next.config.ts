import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["26.15.231.182", "localhost", "127.0.0.1"],
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://localhost:7069/api/:path*",
      },
      //створити .env і видалити цей блок для фото //
      {
        source: "/images/:path*",
        destination: "https://localhost:7069/images/:path*",
      },
    ];
  },
};

export default nextConfig;