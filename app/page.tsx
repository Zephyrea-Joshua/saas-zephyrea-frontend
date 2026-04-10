import type { Metadata } from 'next'
import { HeroDigitalSuccess } from '@/components/digital-succes'
import { DashboardPreview } from '@/components/dashboard-preview'
import { FeaturesAetherCore } from '@/components/features-aethercore'
import { BoldFooter } from '@/components/ui/footer-bold'
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
      <DashboardPreview />
      <FeaturesAetherCore />
      <BoldFooter />
    </div>
  )
}
