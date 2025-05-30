/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'uwbwtnabdqbznhotpbun.supabase.co',
      'uwbwtnabdqbznhotpbun.supabase.in',
      'uwbwtnabdqbznhotpbun.supabase.in'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uwbwtnabdqbznhotpbun.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  // Configure page extensions for the App Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Enable SWC minification
  swcMinify: true,
  // Enable static export
  output: 'standalone',
}

module.exports = nextConfig
