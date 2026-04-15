import type { Metadata } from 'next'
import { HeroDigitalSuccess } from '@/components/digital-succes'
import { HeroServicesMarquee } from '@/components/hero-services-marquee'
import { DashboardPreviewLazy } from '@/components/dashboard-preview-lazy'
import { FaqTabbedExplorer } from '@/components/ui/faq-questions'
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
      <HeroServicesMarquee />
      <DashboardPreviewLazy />
      <FaqTabbedExplorer />
      <BoldFooter />
    </div>
  )
}
