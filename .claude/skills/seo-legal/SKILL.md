---
name: nextjs-seo-legal-mx
description: >
  Experto en SEO técnico para Next.js (App Router) y cumplimiento legal en México (LFPDPPP 2025,
  LFPC, RESICO). Úsalo SIEMPRE que el usuario pida mejorar el SEO de un sitio Next.js, generar
  metadata, sitemap, robots.txt, datos estructurados JSON-LD, imágenes Open Graph, o cuando
  mencione indexación, Google Search Console, Core Web Vitals, schema.org, o posicionamiento.
  También dispara cuando el usuario mencione aviso de privacidad, cookies, LFPDPPP, derechos ARCO,
  banner de cookies, términos y condiciones, legalidad web en México, INAI, Secretaría de
  Anticorrupción, o cumplimiento legal para una empresa mexicana (persona física o moral).
  Incluye conocimiento específico de RESICO para persona física con actividad empresarial.
---

# Next.js SEO + Legal México

Skill de referencia para implementar SEO técnico de nivel producción en Next.js 15 App Router
y cumplimiento legal conforme a la legislación mexicana vigente (LFPDPPP 2025).

## CONTEXTO DEL USUARIO

Antes de generar código, determina:
1. **¿Qué versión de Next.js?** — App Router (14+) o Pages Router. Este skill cubre App Router. Si usa Pages Router, adapta: usa `<Head>` de `next/head` en vez de `export const metadata`.
2. **¿Qué necesita?** — Solo SEO, solo legal, o ambos.
3. **¿Tiene `siteConfig` centralizado?** — Si no, créalo primero (ver §1).
4. **¿Persona física o moral?** — Afecta el aviso de privacidad y pie de página.

---

## §1 — CONFIG CENTRALIZADA (SIEMPRE primero)

Crea `lib/seo/config.ts`. **Nunca disperses URLs o nombres en cada archivo.**

```typescript
// lib/seo/config.ts
export const siteConfig = {
  url: 'https://www.tu-sitio.com',          // URL canónica con www o sin www, consistente
  name: 'Nombre del Producto',
  brand: 'MARCA',
  tagline: 'Descripción corta memorable',
  description: 'Descripción larga de 150 caracteres máximo para meta description.',
  locale: 'es_MX',
  lang: 'es',
  keywords: ['keyword 1', 'keyword 2'],
  ogImage: {
    url: 'https://www.tu-sitio.com/og/default.png', // 1200×630 px
    width: 1200,
    height: 630,
    alt: 'Descripción de la imagen OG',
  },
  logo: 'https://www.tu-sitio.com/logo.svg',
  social: {
    twitterHandle: 'handle_sin_arroba',
    instagram: 'https://www.instagram.com/...',
    facebook: 'https://www.facebook.com/...',
  },
} as const

export const buildTitle = (pageTitle?: string) =>
  pageTitle ? `${pageTitle} | ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`

export const absoluteUrl = (path = '/') =>
  `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
```

---

## §2 — METADATA (App Router)

### Root Layout — `app/layout.tsx`

Usa `title.template` para que todas las páginas hereden la marca automáticamente:

```typescript
import { type Metadata } from 'next'
import { siteConfig } from '@/lib/seo/config'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),  // ← OBLIGATORIO para resolver URLs relativas
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,  // Cada página solo define el título corto
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Nombre del autor' }],
  creator: siteConfig.brand,
  publisher: siteConfig.brand,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: `@${siteConfig.social.twitterHandle}`,
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
  applicationName: siteConfig.name,
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION, // Google Search Console
  },
}
```

### Por cada `page.tsx`

```typescript
import { type Metadata } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Precios',                        // El template añade " | NombreProducto" auto
  description: 'Descripción única de esta página, 120-155 caracteres.',
  alternates: {
    canonical: absoluteUrl('/precios'),    // ← SIEMPRE canonical en cada página
  },
  openGraph: {
    url: absoluteUrl('/precios'),
    title: 'Precios | NombreProducto',
    description: 'Descripción OG.',
    images: [siteConfig.ogImage],
  },
}
```

### `generateMetadata` para páginas dinámicas

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      images: [{ url: post.ogImage ?? siteConfig.ogImage.url, width: 1200, height: 630 }],
    },
  }
}
```

### Páginas que NO deben indexarse (auth, admin, dashboard)

```typescript
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
```

---

## §3 — SITEMAP (`app/sitemap.ts`)

```typescript
import { type MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()
  return [
    { url: base,              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/precios`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/blog`,    lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    // Páginas legales: siempre incluir
    { url: `${base}/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/terminos`,   lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/cookies`,    lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ]
}
// Genera /sitemap.xml automáticamente. Envíalo en Google Search Console.
```

**Prioridades de referencia:**
| Prioridad | Tipo de página |
|---|---|
| 1.0 | Homepage |
| 0.9 | Conversión (precios, demo, contacto) |
| 0.8 | Informativas (funciones, blog index) |
| 0.7 | Posts/artículos individuales |
| 0.5 | Legales |

---

## §4 — ROBOTS (`app/robots.ts`)

```typescript
import { type MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo/config'

export default function robots(): MetadataRoute.Robots {
  // Bloquear staging
  if (process.env.VERCEL_ENV !== 'production' && process.env.NODE_ENV !== 'production') {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [
      { userAgent: '*',          allow: '/', disallow: ['/api/', '/admin/', '/dashboard/', '/login'] },
      { userAgent: 'Googlebot',  allow: '/', disallow: ['/api/', '/admin/'], crawlDelay: 1 },
      { userAgent: 'GPTBot',     allow: '/' },   // OpenAI — dejar indexar para AI search
      { userAgent: 'ClaudeBot',  allow: '/' },   // Anthropic
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
```

---

## §5 — JSON-LD (Datos Estructurados)

**Regla:** Coloca el componente `<JsonLd>` directamente en el `<head>` del root layout, nunca en `next/script`.

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
```

### Schemas más importantes por tipo de sitio

Ver `references/json-ld-schemas.md` para todos los schemas con código completo.

| Schema | Cuándo usar |
|---|---|
| `Organization` | Siempre — en root layout |
| `WebSite` + `SearchAction` | Siempre — en root layout (activa Sitelinks Search Box) |
| `SoftwareApplication` | SaaS / app |
| `LocalBusiness` | Negocio con dirección física |
| `FAQPage` | Sección FAQ (mejora CTR con rich results) |
| `BreadcrumbList` | Páginas internas con navegación |
| `Article` / `BlogPosting` | Blog |
| `Product` | E-commerce |
| `Person` | Portfolio personal |

### hreflang en root layout (México)

```tsx
// En app/layout.tsx → <head>
<link rel="alternate" hrefLang="es-MX" href={siteConfig.url} />
<link rel="alternate" hrefLang="es"    href={siteConfig.url} />
<link rel="alternate" hrefLang="x-default" href={siteConfig.url} />
```

---

## §6 — OG IMAGE DINÁMICA (`app/og/route.tsx`)

Genera imágenes 1200×630 al vuelo con la paleta del sitio. Usa `ImageResponse` de Next.js (edge runtime, sin dependencias externas).

```typescript
import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'
export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const title = new URL(req.url).searchParams.get('title') ?? 'Título'
  return new ImageResponse(
    (<div style={{ /* diseño */ }}>{title}</div>),
    { width: 1200, height: 630 }
  )
}
// Uso en metadata: ogImageUrl: `/og?title=${encodeURIComponent(title)}`
```

---

## §7 — PERFORMANCE (Core Web Vitals)

### Imágenes — siempre `next/image`
```tsx
import Image from 'next/image'
// Hero (above-the-fold): priority obligatorio
<Image src="/hero.png" alt="Descripción" width={1200} height={600} priority />
// Resto: lazy por defecto, sin priority
<Image src="/feature.png" alt="Descripción" width={600} height={400} />
```

### Fonts — `next/font` local (nunca Google Fonts directo)
```typescript
import localFont from 'next/font/local'
const displayFont = localFont({
  src: './fonts/MiFuente.woff2',
  variable: '--font-display',
  display: 'swap',         // Evita FOIT (Flash of Invisible Text)
  preload: true,
})
```

### Renderizado correcto por tipo de página
| Tipo | Estrategia | Por qué |
|---|---|---|
| Landing / marketing | SSG (sin `async`, sin `'use client'`) | Máximo SEO + velocidad |
| Blog posts | SSG + ISR (`revalidate: 3600`) | Fresco sin rebuild |
| Dashboard / app | SSR o CSR con `'use client'` | Datos en tiempo real |
| Auth pages | CSR — marcar `noIndex: true` | No indexar |

### `next.config.ts` imprescindible
```typescript
const nextConfig = {
  trailingSlash: false,          // /precios no /precios/
  compress: true,
  poweredByHeader: false,        // No exponer "X-Powered-By: Next.js"
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    }]
  },
}
```

---

## §8 — LEGAL MÉXICO (LFPDPPP 2025)

Ver `references/legal-mexico.md` para el contenido completo de cada documento legal.

### Panorama actual (actualizado marzo 2025)

- La **LFPDPPP 2025** entró en vigor el **21 de marzo de 2025** (DOF 20-03-2025).
- El **INAI fue disuelto**. La nueva autoridad es la **Secretaría de Anticorrupción y Buen Gobierno**.
- Las sanciones van de 100 a 320,000 veces la UMA (~$1,200 a ~$3.8M USD).
- Para persona física RESICO: aplica la ley en su totalidad; el RFC persona física es suficiente como identificación del responsable.

### Páginas legales obligatorias

| Ruta | Documento | Obligatorio por |
|---|---|---|
| `/privacidad` | Aviso de Privacidad Integral | Art. 14-15 LFPDPPP |
| `/terminos` | Términos y Condiciones | LFPC + Código Civil Federal |
| `/cookies` | Política de Cookies | Art. 8 LFPDPPP + best practice |

### Aviso de privacidad — secciones obligatorias (Art. 15 LFPDPPP 2025)

1. **Identidad y domicilio** del responsable (nombre, RFC, domicilio, correo)
2. **Datos personales** que se recaban (listar explícitamente, identificar sensibles)
3. **Finalidades** — separar primarias (no requieren consentimiento) de secundarias (requieren consentimiento)
4. **Consentimiento** — mecanismo y forma de otorgarlo/revocarlo
5. **Transferencias** — a quién, para qué, en qué país
6. **Derechos ARCO** — Acceso, Rectificación, Cancelación, Oposición + canal para ejercerlos
7. **Medidas de seguridad** — descripción general
8. **Cambios al aviso** — cómo se notifican

**Nuevo en 2025:** distinguir finalidades con/sin consentimiento, y el aviso simplificado ahora también debe listar datos y sensibles.

### Canal ARCO obligatorio

- Correo dedicado: `privacidad@tudominio.com` o `contacto@tudominio.com`
- Plazo de respuesta: **20 días hábiles** (prorrogable 20 días adicionales)
- Documentar todas las solicitudes

### Cookies — reglas

```
Esenciales (session, CSRF, consent):  NO requieren consentimiento
Preferencias (tema, idioma):          Requieren consentimiento
Analíticas (GA4, Vercel Analytics):   Requieren consentimiento  
Marketing (FB Pixel, retargeting):    Requieren consentimiento
```

**Implementación correcta:**
1. Por defecto: cargar SOLO cookies esenciales
2. Mostrar banner antes de cargar scripts de terceros
3. Cargar analytics/marketing SOLO después de consentimiento explícito
4. Guardar preferencia en `localStorage` con versión para invalidar cuando cambie la política

### Persona física RESICO — identificación en documentos

```
Responsable del tratamiento:
"[Nombre Completo], persona física con actividad empresarial,
contribuyente acogido al Régimen Simplificado de Confianza (RESICO)"
RFC: [13 caracteres]
```

Aclaración importante a incluir: la persona física no opera como sociedad mercantil constituida ante notario. Los CFDI se emiten como persona física.

---

## §9 — FOOTER SEO + LEGAL

El footer es crítico para SEO local y cumplimiento legal. Debe incluir:

**SEO:**
- NAP (Name, Address, Phone) con `itemScope itemType="https://schema.org/Organization"` — para Google Knowledge Graph
- Links a redes sociales con `rel="me"` — señal de identidad
- Link al sitio corporativo si hay múltiples dominios

**Legal (obligatorio):**
- Link a `/privacidad` — Aviso de Privacidad
- Link a `/terminos` — Términos y Condiciones
- Link a `/cookies` — Política de Cookies
- Botón "Preferencias de cookies" que reabre el banner

**Formularios:**
- Siempre incluir "Al enviar, aceptas nuestro [Aviso de Privacidad]" con link

---

## §10 — GOOGLE SEARCH CONSOLE (Setup)

Pasos después de deployar:

1. Ir a https://search.google.com/search-console
2. Agregar propiedad con URL exacta (www vs no-www, consistente)
3. Verificar con meta tag: `verification: { google: 'CODIGO' }` en `metadata` del root layout
4. Enviar sitemap: `https://tu-sitio.com/sitemap.xml`
5. Monitorear semanalmente: cobertura, CWV, consultas, rich results

---

## §11 — AEO (Answer Engine Optimization, 2025+)

Los crawlers de IA (ChatGPT/GPTBot, Perplexity, Claude/ClaudeBot, Gemini) indexan sitios.
Para aparecer en respuestas de IA:

- Permitir GPTBot, ClaudeBot, PerplexityBot en `robots.ts` ✅
- Sección FAQ con preguntas naturales + `@type: FAQPage` en JSON-LD
- Respuestas directas en 2-3 oraciones al inicio de cada sección
- Encabezados h2/h3 descriptivos (no creativos: "Módulo de Reclutamiento", no "El poder de encontrar talento")
- Mencionar ubicación geográfica explícitamente: "empresas en México", "Ciudad de México", "CDMX"

---

## Reference Files

Leer cuando sea necesario:
- `references/json-ld-schemas.md` — Código completo de todos los schemas JSON-LD
- `references/legal-mexico.md` — Contenido completo para aviso de privacidad, términos y política de cookies

## Herramientas de validación

| Herramienta | URL | Para qué |
|---|---|---|
| Rich Results Test | search.google.com/test/rich-results | Validar JSON-LD |
| Schema Markup Validator | validator.schema.org | Validar schema.org |
| PageSpeed Insights | pagespeed.web.dev | Core Web Vitals |
| OpenGraph Preview | opengraph.xyz | Preview imagen OG |
| Google Search Console | search.google.com/search-console | Todo lo demás |