import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ['pruebatest.xyz']
    }
  },
  images: {
    domains: ["pruebatest.xyz"],
  },
};

export default nextConfig;
