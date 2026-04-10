'use client'
import Script from 'next/script'
import { useCookieConsent } from '@/hooks/useCookieConsent'

const GA_ID    = process.env.NEXT_PUBLIC_GA_ID
const FB_PIXEL = process.env.NEXT_PUBLIC_FB_PIXEL_ID

/**
 * Carga scripts de terceros SOLO después de obtener consentimiento por categoría.
 * Cumple LFPDPPP 2025, Art. 8 — consentimiento previo e informado.
 */
export function AnalyticsLoader() {
  const consent = useCookieConsent()

  // No renderizar nada hasta conocer el estado de consentimiento
  if (!consent) return null

  return (
    <>
      {/* ── Analytics: GA4 ───────────────────────────────────────────────── */}
      {consent.analytics && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `}</Script>
        </>
      )}

      {/* ── Performance: Sentry ──────────────────────────────────────────── */}
      {/* Sentry requiere `npx @sentry/wizard@latest -i nextjs` para configurarse.
          Una vez instalado, mueve su inicialización aquí condicionada a consent.performance */}

      {/* ── Marketing: Meta Pixel ────────────────────────────────────────── */}
      {consent.marketing && FB_PIXEL && (
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL}');
          fbq('track', 'PageView');
        `}</Script>
      )}
    </>
  )
}
