import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Esto soluciona el warning de "workspace root"
    turbopack: {
      root: "."
    }
  }
};

export default nextConfig;