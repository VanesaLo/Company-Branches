import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ['pruebatest.xyz']
    }
  }
};

export default nextConfig;
