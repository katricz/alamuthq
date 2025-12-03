/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () => 'build',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.krcg.org',
        port: '',
        pathname: '/card/**',
      },
    ],
    unoptimized: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig