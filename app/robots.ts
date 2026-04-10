import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo/config'

export default function robots(): MetadataRoute.Robots {
  // Bloquear todo en entornos que no sean producción
  if (
    process.env.VERCEL_ENV !== 'production' &&
    process.env.NODE_ENV !== 'production'
  ) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/', '/login'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1,
      },
      // AI crawlers — permitir para aparecer en respuestas de IA (AEO)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Googlebot-Extended', allow: '/' },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
