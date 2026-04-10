# JSON-LD Schemas — Referencia Completa

Código listo para copiar. Todos usan App Router de Next.js.

---

## Organization (Root Layout — siempre)

```typescript
export const organizationJsonLd = (config: typeof siteConfig) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${config.url}/#organization`,
  name: config.brand,
  url: config.url,
  logo: {
    '@type': 'ImageObject',
    url: config.logo,
    width: 512,
    height: 512,
  },
  description: config.description,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+52-XX-XXXX-XXXX',
    contactType: 'customer support',
    email: 'contacto@tudominio.com',
    availableLanguage: ['Spanish'],
    areaServed: 'MX',
  },
  sameAs: [
    config.social.instagram,
    config.social.facebook,
    // Agregar LinkedIn, Twitter si aplica
  ],
  foundingLocation: {
    '@type': 'Place',
    name: 'Ciudad de México, México',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ciudad de México',
      addressRegion: 'CDMX',
      addressCountry: 'MX',
    },
  },
})
```

---

## WebSite + SearchAction (Root Layout — siempre)

```typescript
export const websiteJsonLd = (config: typeof siteConfig) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${config.url}/#website`,
  name: config.name,
  url: config.url,
  description: config.description,
  inLanguage: 'es',
  publisher: { '@id': `${config.url}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${config.url}/buscar?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
})
```

---

## SoftwareApplication (Landing de SaaS)

```typescript
export const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NombreApp',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Human Resources Software',
  operatingSystem: 'Web',
  description: 'Descripción del software.',
  url: 'https://www.tu-sitio.com',
  inLanguage: 'es',
  availableOnDevice: 'Desktop, Mobile',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'MXN',
    description: 'Demo gratuita disponible',
  },
  featureList: ['Feature 1', 'Feature 2', 'Feature 3'],
  audience: {
    '@type': 'Audience',
    audienceType: 'Empresas mexicanas',
    geographicArea: { '@type': 'Country', name: 'Mexico' },
  },
}
```

---

## FAQPage (muy recomendado — rich results)

```typescript
export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

// Uso en page.tsx:
const faqs = [
  { question: '¿Qué es [Producto]?', answer: 'Es un sistema que...' },
  { question: '¿Tiene versión de prueba?', answer: 'Sí, ofrecemos una demo...' },
]
// <JsonLd data={buildFaqJsonLd(faqs)} />
```

---

## LocalBusiness (negocio con dirección física)

```typescript
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',   // o subclase: 'SoftwareApplication', 'ProfessionalService'
  name: 'NOMBRE COMERCIAL',
  description: 'Descripción',
  url: 'https://www.tu-sitio.com',
  telephone: '+52-55-XXXX-XXXX',
  email: 'contacto@dominio.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle número, int.',
    addressLocality: 'Alcaldía/Municipio',
    addressRegion: 'Ciudad de México',
    postalCode: 'XXXXX',
    addressCountry: 'MX',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 19.4326, longitude: -99.1332 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
  ],
  priceRange: '$$',
  areaServed: { '@type': 'Country', name: 'Mexico' },
}
```

---

## BreadcrumbList

```typescript
export function buildBreadcrumbJsonLd(items: { name: string; path: string }[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  }
}
// Ejemplo:
// buildBreadcrumbJsonLd([
//   { name: 'Inicio', path: '/' },
//   { name: 'Blog', path: '/blog' },
//   { name: 'Artículo', path: '/blog/mi-articulo' },
// ], 'https://www.tu-sitio.com')
```

---

## Article / BlogPosting

```typescript
export function buildArticleJsonLd(post: {
  title: string; description: string; slug: string
  publishedAt: string; updatedAt: string; author: string
  image?: string
}, config: typeof siteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${config.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.image ?? config.ogImage.url,
    inLanguage: 'es',
    author: {
      '@type': 'Person',
      name: post.author,
      url: config.url,
    },
    publisher: {
      '@type': 'Organization',
      name: config.brand,
      logo: { '@type': 'ImageObject', url: config.logo },
    },
    isPartOf: { '@id': `${config.url}/#website` },
  }
}
```

---

## Person (portfolio personal)

```typescript
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nombre Completo',
  url: 'https://www.tu-sitio.com',
  jobTitle: 'Fundador',
  worksFor: { '@type': 'Organization', name: 'MARCA', url: 'https://www.tu-sitio.com' },
  sameAs: ['https://www.instagram.com/...', 'https://www.facebook.com/...'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad de México',
    addressCountry: 'MX',
  },
}
```

---

## Componente JsonLd universal

```typescript
// components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
// ⚠️ No uses next/script — usa <script> nativo para JSON-LD.
// ⚠️ El .replace() previene XSS si los datos vienen de una fuente externa.
```

---

## Validación

Siempre validar con:
1. https://search.google.com/test/rich-results — para ver qué rich results activa en Google
2. https://validator.schema.org/ — validación completa de schema.org