import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/webp"],
  },
  allowedDevOrigins: ["192.168.100.53"],
};

export default nextConfig;
