import type { Metadata } from 'next'
import { HeroDigitalSuccess } from '@/components/digital-succes'
import { siteConfig, absoluteUrl } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    url: absoluteUrl('/'),
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage.url,
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
      },
    ],
  },
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <HeroDigitalSuccess />
    </div>
  )
}
