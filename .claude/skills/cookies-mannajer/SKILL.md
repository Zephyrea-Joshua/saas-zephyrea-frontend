---
name: cookie-consent-mx
description: >
  Implementa un sistema completo de consentimiento de cookies en Next.js conforme a la LFPDPPP 2025
  de México. Úsalo SIEMPRE que el usuario pida un banner de cookies, cookie consent, aviso de cookies,
  gestión de consentimiento, cargar Google Analytics solo con permiso, Facebook Pixel con consentimiento,
  o cualquier implementación de cookies en un sitio Next.js para México. También dispara cuando el
  usuario mencione "LFPDPPP y cookies", "banner GDPR México", "consentimiento previo cookies",
  "cookie banner animado", o quiera asegurarse de no cargar scripts de terceros sin permiso del usuario.
  Incluye: CookieBanner component con animaciones, hook useCookieConsent, carga condicional de analytics,
  lógica de versionado de consentimiento, y página /cookies.
---

# Cookie Consent — Next.js + LFPDPPP 2025

Sistema completo de gestión de consentimiento de cookies para Next.js App Router,
conforme a la legislación mexicana vigente.

---

## PRINCIPIOS OBLIGATORIOS (LFPDPPP 2025, Art. 8)

Antes de escribir una sola línea, entender estas reglas:

1. **Previo**: Cero scripts de terceros antes de obtener consentimiento
2. **Informado**: El usuario debe saber exactamente qué acepta
3. **Libre**: No puede haber cookie wall ni presión para aceptar
4. **Granular**: El usuario acepta o rechaza por categoría (no solo "todo o nada")
5. **Revocable**: Debe poder cambiar su decisión en cualquier momento
6. **Versionado**: Si cambia la política, invalidar consentimiento anterior

**Las cookies esenciales (sesión, CSRF, preferencias básicas) NO requieren consentimiento.**

---

## CATEGORÍAS DE COOKIES

```
ESENCIAL    → Siempre activa, no desactivable
PREFERENCIAS → Tema, idioma — opt-in
ANALÍTICAS  → GA4, Vercel Analytics — opt-in
MARKETING   → FB Pixel, retargeting — opt-in
```

---

## §1 — STORAGE HOOK + TIPOS

```typescript
// lib/cookies/consent.ts
// ─────────────────────────────────────────────────────
// Toda la lógica de estado vive aquí. El banner y los
// loaders solo consumen este módulo.
// ─────────────────────────────────────────────────────

export const CONSENT_KEY = 'cookie_consent'
export const CONSENT_VERSION = '1.0' // ← incrementar cuando cambie la política

export type ConsentCategories = {
  essential: true        // siempre true
  preferences: boolean
  analytics: boolean
  marketing: boolean
}

export type ConsentState = ConsentCategories & {
  timestamp: string
  version: string
}

export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    // Versión cambiada → pedir consentimiento de nuevo
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function saveConsent(cats: Omit<ConsentCategories, 'essential'>): ConsentState {
  const state: ConsentState = {
    essential: true,
    ...cats,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state))
  window.dispatchEvent(new CustomEvent('cookieConsentUpdate', { detail: state }))
  return state
}

export function clearConsent() {
  localStorage.removeItem(CONSENT_KEY)
}
```

---

## §2 — HOOK `useCookieConsent`

```typescript
// hooks/useCookieConsent.ts
'use client'
import { useState, useEffect } from 'react'
import { type ConsentState, getStoredConsent } from '@/lib/cookies/consent'

export function useCookieConsent(): ConsentState | null {
  const [consent, setConsent] = useState<ConsentState | null>(null)

  useEffect(() => {
    setConsent(getStoredConsent())
    const handler = (e: CustomEvent) => setConsent(e.detail as ConsentState)
    window.addEventListener('cookieConsentUpdate', handler as EventListener)
    return () => window.removeEventListener('cookieConsentUpdate', handler as EventListener)
  }, [])

  return consent
}
```

---

## §3 — COOKIE BANNER COMPONENT

Ver `references/cookie-banner.tsx` para el código completo del componente.

### Estructura del banner

```
┌─────────────────────────────────────────────────────────────┐
│ 🍪 Uso de cookies                              versión 1.0  │
│                                                              │
│ [Texto legal en español — qué son, por qué, ley aplicable]  │
│                                                              │
│ [Aceptar todas] [Solo esenciales] [Configurar ↓]            │
│                              [Aviso de Privacidad] [Cookies] │
├─────────────────────────────────────────────────────────────┤
│ Panel expandido (al clicar "Configurar"):                    │
│                                                              │
│ Esenciales     ████████ [siempre activo — gris]              │
│ Preferencias   ○──────  [toggle]                             │
│ Analíticas     ○──────  [toggle]                             │
│ Marketing      ○──────  [toggle]                             │
│                                                              │
│ [Guardar selección]                                          │
└─────────────────────────────────────────────────────────────┘
```

### Animaciones requeridas

- **Entrada**: `translateY(100%) → translateY(0)` con `cubic-bezier(0.32, 0.72, 0, 1)` (spring física)
- **Salida**: `translateY(0) → translateY(100%)` + `opacity: 0`, duración ~400ms
- **Toggle**: transición de posición del thumb con `cubic-bezier(0.32, 0.72, 0, 1)`
- **Panel de detalle**: `max-height` o fade-in suave al expandir
- **Overlay**: fade `opacity 0 → 0.4` al abrir, inverso al cerrar
- **Delay de aparición**: 800ms después de cargar la página (no interrumpir la primera impresión)

### Comportamiento

```
Al cargar:
  getStoredConsent() → null  → mostrar banner después de 800ms
  getStoredConsent() → state → NO mostrar banner

Al "Aceptar todas":
  saveConsent({ preferences: true, analytics: true, marketing: true })
  → animación de salida → desmontar

Al "Solo esenciales":
  saveConsent({ preferences: false, analytics: false, marketing: false })
  → animación de salida → desmontar

Al "Guardar selección":
  saveConsent(prefs)  ← prefs = estado de los toggles
  → animación de salida → desmontar

Botón "Preferencias de cookies" en footer:
  clearConsent() → window.location.reload()
  → banner aparece de nuevo
```

---

## §4 — CARGA CONDICIONAL DE SCRIPTS DE TERCEROS

**Este paso es el más crítico para cumplir la ley.**

```typescript
// components/analytics/AnalyticsLoader.tsx
'use client'
import Script from 'next/script'
import { useCookieConsent } from '@/hooks/useCookieConsent'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function AnalyticsLoader() {
  const consent = useCookieConsent()

  // ← No renderizar nada hasta saber el estado de consentimiento
  if (!consent) return null

  return (
    <>
      {/* Google Analytics — solo si analytics: true */}
      {consent.analytics && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}</Script>
        </>
      )}

      {/* Facebook Pixel — solo si marketing: true */}
      {consent.marketing && (
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){...}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}</Script>
      )}
    </>
  )
}

// En app/layout.tsx:
// <AnalyticsLoader />  ← agregar dentro de <body>
```

### Vercel Analytics (con consentimiento)

```typescript
// components/analytics/VercelAnalytics.tsx
'use client'
import { Analytics } from '@vercel/analytics/react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export function ConditionalVercelAnalytics() {
  const consent = useCookieConsent()
  if (!consent?.analytics) return null
  return <Analytics />
}
```

---

## §5 — INTEGRACIÓN EN ROOT LAYOUT

```typescript
// app/layout.tsx
import { CookieBanner } from '@/components/legal/CookieBanner'
import { AnalyticsLoader } from '@/components/analytics/AnalyticsLoader'
import { ConditionalVercelAnalytics } from '@/components/analytics/VercelAnalytics'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <CookieBanner />          {/* ← siempre presente, decide si mostrarse */}
        <AnalyticsLoader />       {/* ← solo carga scripts si hay consentimiento */}
        <ConditionalVercelAnalytics />
      </body>
    </html>
  )
}
```

---

## §6 — BOTÓN "PREFERENCIAS" EN FOOTER

```tsx
// En el footer, obligatorio por LFPDPPP 2025
'use client'
import { clearConsent } from '@/lib/cookies/consent'

export function CookiePreferencesButton() {
  return (
    <button
      onClick={() => { clearConsent(); window.location.reload() }}
      style={{ background: 'none', border: 'none', cursor: 'pointer',
               color: 'inherit', fontSize: 'inherit', textDecoration: 'underline' }}
    >
      Preferencias de cookies
    </button>
  )
}
```

---

## §7 — PÁGINA `/cookies`

La página `/cookies` debe existir y estar linkeada desde el banner y el footer.
Contenido mínimo obligatorio:

```
1. ¿Qué son las cookies?
2. Tipos de cookies que utilizamos
   - Tabla por categoría: nombre, propósito, duración, tipo (propia/tercero)
3. Cómo gestionar sus cookies
   - Desde el banner (link a "Preferencias de cookies")
   - Desde el navegador (links a Chrome, Firefox, Safari, Edge)
4. Base legal del tratamiento (LFPDPPP 2025)
5. Contacto (correo de privacidad)
```

Ver `references/cookies-page-content.md` para el contenido completo en español.

---

## §8 — CHECKLIST DE IMPLEMENTACIÓN

```
[ ] lib/cookies/consent.ts          — tipos, getStoredConsent, saveConsent, clearConsent
[ ] hooks/useCookieConsent.ts       — hook React con event listener
[ ] components/legal/CookieBanner  — banner con animaciones + toggles granulares
[ ] components/analytics/*          — loaders condicionales (GA4, FB Pixel, Vercel)
[ ] app/layout.tsx                  — CookieBanner + AnalyticsLoaders dentro de <body>
[ ] app/cookies/page.tsx            — página /cookies con tabla completa
[ ] Footer                          — link /cookies + botón "Preferencias de cookies"
[ ] Formularios                     — link a /privacidad en cada formulario de datos
[ ] CONSENT_VERSION                 — incrementar si cambia la política de cookies
```

---

## Reference Files

- `references/cookie-banner.tsx` — Código completo del CookieBanner component con animaciones
- `references/cookies-page-content.md` — Contenido para la página /cookies en español