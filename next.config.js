/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ add your options here, but only once
  eslint: { ignoreDuringBuilds: true }, // optional: to bypass ESLint during build
  // typescript: { ignoreBuildErrors: true }, // optional: not recommended long-term
  // experimental: { /* … */ },
  // images: { /* … */ },
};

module.exports = nextConfig;

