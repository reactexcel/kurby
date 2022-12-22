/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'maps.googleapis.com', 'app.kurby.ai'],
    unoptimized: true
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "maps.googleapis.com",
    },
    {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
    },
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
