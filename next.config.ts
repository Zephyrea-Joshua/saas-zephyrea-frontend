import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  /** Tree-shake imports en barrel files (menos JS en el bundle cliente). */
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/legal/privacidad', destination: '/privacidad', permanent: true },
      { source: '/legal/cookies', destination: '/cookies', permanent: true },
      { source: '/legal/terminos', destination: '/terminos', permanent: true },
      { source: '/legal/aviso-legal', destination: '/aviso-legal', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
