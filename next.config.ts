import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.worldweatheronline.com",
        pathname: "/images/wsymbols01_png_64/**",
      },
      {
        protocol: "http",
        hostname: "cdn.worldweatheronline.com",
        pathname: "/images/wsymbols01_png_64/**",
      },
    ],
  },
};

export default nextConfig;
