import type { Metadata } from 'next'
import { Geist, Geist_Mono, Montserrat } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ZephyreaShaderBackground } from '@/components/zephyrea-shader-background'
import { JsonLd } from '@/components/seo/JsonLd'
import { CookieBanner } from '@/components/legal/CookieBanner'
import { AnalyticsLoader } from '@/components/analytics/AnalyticsLoader'
import { LenisProvider } from '@/components/lenis-provider'
import { siteConfig, absoluteUrl } from '@/lib/seo/config'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.brand }],
  creator: siteConfig.brand,
  publisher: siteConfig.brand,
  applicationName: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
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
  twitter: {
    card: 'summary_large_image',
    site: `@${siteConfig.social.twitterHandle}`,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'es-MX': siteConfig.url,
      es: siteConfig.url,
      'x-default': siteConfig.url,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
}

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.brand,
  url: siteConfig.corporateUrl,         // sitio corporativo ya indexado
  logo: absoluteUrl(siteConfig.logo),
  contactPoint: {
    '@type': 'ContactPoint',
    email: siteConfig.contact.email,
    contactType: 'customer service',
    availableLanguage: 'Spanish',
  },
  // sameAs: perfiles oficiales de la empresa (NO el dominio del producto)
  sameAs: [
    siteConfig.social.instagram,
    ...siteConfig.social.facebook,
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.lang,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/buscar?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteConfig.name,
  url: siteConfig.url,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: siteConfig.description,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'MXN',
    availability: 'https://schema.org/InStock',
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.brand,
    url: siteConfig.corporateUrl,   // ← empresa en zephyrea.com.mx
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es AetherCore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AetherCore es un sistema de recursos humanos todo-en-uno para empresas en México que centraliza reclutamiento, capacitación, indicadores y registro de cumplimiento en una sola plataforma.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo funciona el módulo de vacantes y reclutamiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AetherCore permite publicar vacantes, seguir cada candidato por etapa en un embudo visual y registrar avances sin hojas de cálculo. Todo el equipo ve en qué paso va cada proceso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo asignar cursos de capacitación a mi equipo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Desde AetherCore asignas cursos, comunicas avisos y das seguimiento real al avance de formación de cada colaborador, sin cadenas de correo ni hojas separadas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿AetherCore funciona para empresas con múltiples sedes en México?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. AetherCore soporta operaciones multi-sede y franquicias, con visibilidad diferenciada por ubicación y la misma política aplicada en toda la organización.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Los datos de mis colaboradores están protegidos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AetherCore cumple con la LFPDPPP 2025 de México. Los datos personales se tratan con fines exclusivamente laborales, con controles de acceso por rol y registros de auditoría.',
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang={siteConfig.lang}
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        montserrat.variable,
      )}
    >
      <head>
        {/* hreflang: mercado México */}
        <link rel="alternate" hrefLang="es-MX" href={siteConfig.url} />
        <link rel="alternate" hrefLang="es" href={siteConfig.url} />
        <link rel="alternate" hrefLang="x-default" href={siteConfig.url} />

        {/* rel="me": conecta esta propiedad con el sitio corporativo ya indexado */}
        <link rel="me" href={siteConfig.corporateUrl} />
        <link rel="me" href={siteConfig.social.instagram} />
        {siteConfig.social.facebook.map((url) => (
          <link key={url} rel="me" href={url} />
        ))}

        {/* JSON-LD */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={softwareAppSchema} />
        <JsonLd data={faqSchema} />
      </head>
      <body className="bg-background text-foreground relative flex min-h-full flex-col">
        <ZephyreaShaderBackground />
        <LenisProvider>
          <div className="relative z-10 flex min-h-full flex-1 flex-col">{children}</div>
        </LenisProvider>
        <CookieBanner />
        <AnalyticsLoader />
      </body>
    </html>
  )
}
