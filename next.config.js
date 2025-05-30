/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  experimental: {
    // Add any experimental features here
  },
  // Enable the App Router
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  // Configure page extensions for the App Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig
