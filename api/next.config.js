/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Esto evita que el build falle si TypeScript encuentra advertencias
    ignoreBuildErrors: true,
  },
  eslint: {
    // Esto evita que el build falle si ESLint encuentra advertencias
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;