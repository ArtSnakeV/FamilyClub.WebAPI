import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  allowedDevOrigins: ["26.15.231.182", "localhost", "127.0.0.1"],
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https: http://localhost:* https://localhost:*",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
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
export default nextConfig


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   allowedDevOrigins: ["26.15.231.182", "localhost", "127.0.0.1"],
//   reactStrictMode: false,
//   images: {
//     unoptimized: true,
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "https://localhost:7069/api/:path*",
//       },
//       //створити .env і видалити цей блок для фото //
//       {
//         source: "/images/:path*",
//         destination: "https://localhost:7069/images/:path*",
//       },
//     ];
//   },
// };

// export default nextConfig;