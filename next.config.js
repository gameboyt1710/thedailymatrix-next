/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable ISR - pages will revalidate data
  experimental: {
    // Enable PPR for faster initial loads
  },
}

module.exports = nextConfig
