// lib/seo/config.ts

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL!,
  name: 'AetherCore',
  brand: 'Zephyrea',
  tagline: 'Reclutamiento, capacitación y RH en un solo sistema',
  description:
    'AetherCore centraliza vacantes, formación y trámites de recursos humanos: contratación transparente, aprendizaje continuo y flujos de trabajo automatizados para empresas en México.',
  locale: 'es_MX',
  lang: 'es',
  keywords: [
    'software de recursos humanos México',
    'sistema de reclutamiento',
    'plataforma de capacitación empresarial',
    'gestión de RH',
    'software RH México',
    'AetherCore',
    'reclutamiento digital',
    'administración de personal',
    'onboarding empresas',
    'indicadores de RH',
  ] as string[],
  ogImage: {
    url: '/og/default.png',
    width: 1200,
    height: 630,
    alt: 'AetherCore — Sistema de RH para empresas en México',
  },
  logo: '/zephyrea-logos/logo-horizontal.svg',
  social: {
    twitterHandle: 'ZephyreaDigital',
    instagram: 'https://www.instagram.com/zephyrea_site',
    facebook: [
      'https://www.facebook.com/profile.php?id=61588389483869',
      'https://www.facebook.com/profile.php?id=61579548736379',
    ] as string[],
  },
  contact: {
    email: 'contacto@zephyrea.site',
    privacy: 'contacto@zephyrea.site',
  },
  // Sitio corporativo (ya indexado por Google)
  corporateUrl: 'https://zephyrea.com.mx',
} as const

export const buildTitle = (pageTitle?: string) =>
  pageTitle
    ? `${pageTitle} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`

export const absoluteUrl = (path = '/') =>
  `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
