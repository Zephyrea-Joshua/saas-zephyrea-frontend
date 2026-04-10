import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl, siteConfig } from '@/lib/seo/config'
import { CookiePreferencesButton } from '@/components/legal/CookieBanner'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: `Información sobre el uso de cookies en ${siteConfig.url} conforme a la LFPDPPP 2025.`,
  alternates: { canonical: absoluteUrl('/cookies') },
  robots: { index: true, follow: true },
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const ESSENTIAL_COOKIES = [
  { name: 'aethercore_consent', purpose: 'Guarda tus preferencias de consentimiento de cookies', duration: '1 año', type: 'Propia' },
  { name: '__Host-next-auth.csrf-token', purpose: 'Protección CSRF para formularios y autenticación', duration: 'Sesión', type: 'Propia' },
  { name: '__Secure-next-auth.session-token', purpose: 'Mantiene tu sesión activa cuando estás autenticado', duration: '30 días', type: 'Propia' },
]

const FUNCTIONAL_COOKIES = [
  { name: 'aethercore_theme', purpose: 'Guarda el tema seleccionado (oscuro / claro)', duration: '1 año', type: 'Propia' },
  { name: 'aethercore_lang', purpose: 'Guarda el idioma preferido de la interfaz', duration: '1 año', type: 'Propia' },
]

const ANALYTICS_COOKIES = [
  { name: '_ga', purpose: 'Google Analytics: distingue sesiones de usuarios únicos', duration: '2 años', type: 'Tercero (Google LLC, EUA)' },
  { name: '_ga_*', purpose: 'Google Analytics: almacena el estado de la sesión', duration: '2 años', type: 'Tercero (Google LLC, EUA)' },
]

const PERFORMANCE_COOKIES = [
  { name: 'sentry-sc', purpose: 'Sentry: seguimiento de errores y rendimiento técnico', duration: 'Sesión', type: 'Tercero (Functional Software, EUA)' },
]

const MARKETING_COOKIES = [
  { name: '_fbp', purpose: 'Facebook Pixel: identificación de visitantes para anuncios', duration: '3 meses', type: 'Tercero (Meta Platforms, EUA)' },
  { name: '_gcl_au', purpose: 'Google Ads: mide conversiones de campañas publicitarias', duration: '3 meses', type: 'Tercero (Google LLC, EUA)' },
]

const PERSONALIZATION_COOKIES = [
  { name: 'ab_*', purpose: 'Pruebas A/B: asigna variante de experiencia para optimización', duration: '30 días', type: 'Propia' },
  { name: 'ff_flags', purpose: 'Feature flags: activa funcionalidades en prueba', duration: 'Sesión', type: 'Propia' },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function CookieTable({ rows }: { rows: typeof ESSENTIAL_COOKIES }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border border-white/[0.07]">
      <table className="w-full min-w-[540px] text-sm">
        <thead>
          <tr className="border-b border-white/[0.07] bg-white/[0.03]">
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Cookie</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Propósito</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Duración</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-white/40">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-4 py-3 font-mono text-xs text-sky-400/80">{row.name}</td>
              <td className="px-4 py-3 text-white/60">{row.purpose}</td>
              <td className="px-4 py-3 text-white/40 whitespace-nowrap">{row.duration}</td>
              <td className="px-4 py-3 text-white/40 text-xs">{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Section({ emoji, title, badge, intro, children }: {
  emoji: string
  title: string
  badge?: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2.5 text-base font-semibold text-white">
        <span>{emoji}</span>
        {title}
        {badge && (
          <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-normal text-white/40">
            {badge}
          </span>
        )}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{intro}</p>
      {children}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CookiesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">

      {/* Back */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
      >
        ← Volver al inicio
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-sky-400/70">
          Legal · {siteConfig.name}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Política de Cookies
        </h1>
        <p className="mt-3 text-sm text-white/40">
          Última actualización: 10 de abril de 2026
        </p>
      </div>

      <div className="flex flex-col gap-12">

        {/* §1 — Qué son */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">¿Qué son las cookies?</h2>
          <p className="text-sm leading-relaxed text-white/60">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
            un sitio web. Permiten al sitio recordar tus acciones y preferencias durante un período de
            tiempo determinado, para que no tengas que volver a configurarlas cada vez que visites el
            sitio o navegues entre páginas.
          </p>
        </section>

        {/* §2 — Tipos */}
        <section>
          <h2 className="mb-6 text-xl font-semibold text-white">Tipos de cookies que utilizamos</h2>
          <div className="flex flex-col gap-8">

            <Section
              emoji="🔒"
              title="Estrictamente necesarias"
              badge="Siempre activas"
              intro="Son estrictamente necesarias para el funcionamiento básico del sitio. Sin ellas el sitio no puede operar correctamente. No pueden desactivarse conforme al Art. 14 fracc. I de la LFPDPPP 2025, ya que su tratamiento se basa en interés legítimo y necesidad contractual."
            >
              <CookieTable rows={ESSENTIAL_COOKIES} />
            </Section>

            <Section
              emoji="⚙️"
              title="Funcionales"
              intro="Permiten que el sitio recuerde las elecciones que has realizado (como tu idioma o tema preferido) para ofrecerte una experiencia personalizada. Se activan únicamente con tu consentimiento previo."
            >
              <CookieTable rows={FUNCTIONAL_COOKIES} />
            </Section>

            <Section
              emoji="📊"
              title="Analíticas"
              intro="Nos ayudan a entender cómo interactúan los usuarios con el sitio, qué páginas visitan con más frecuencia y dónde encuentran dificultades. Toda la información se recopila de forma anónima y agregada. Se activan únicamente con tu consentimiento previo."
            >
              <CookieTable rows={ANALYTICS_COOKIES} />
            </Section>

            <Section
              emoji="⚡"
              title="Rendimiento"
              intro="Recopilan información técnica anónima sobre el rendimiento del sitio y errores, para que podamos diagnosticar y solucionar problemas rápidamente. Se activan únicamente con tu consentimiento previo."
            >
              <CookieTable rows={PERFORMANCE_COOKIES} />
            </Section>

            <Section
              emoji="📣"
              title="Marketing"
              intro="Permiten rastrear visitantes en distintos sitios web con el objetivo de mostrar publicidad relevante y medida. Se activan únicamente con tu consentimiento previo."
            >
              <CookieTable rows={MARKETING_COOKIES} />
            </Section>

            <Section
              emoji="🎯"
              title="Personalización"
              intro="Nos permiten ejecutar pruebas A/B, activar feature flags y perfilar el comportamiento del usuario para mejorar la experiencia del producto. Se activan únicamente con tu consentimiento previo."
            >
              <CookieTable rows={PERSONALIZATION_COOKIES} />
            </Section>

          </div>
        </section>

        {/* §3 — Gestión */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Cómo gestionar tus cookies</h2>

          <h3 className="mb-2 text-base font-semibold text-white/80">Desde nuestro panel</h3>
          <p className="mb-4 text-sm leading-relaxed text-white/60">
            Al ingresar por primera vez al sitio, aparece un banner donde puedes aceptar todas las cookies,
            rechazar las no esenciales, o configurar tus preferencias por categoría. Puedes cambiar tu
            decisión en cualquier momento haciendo clic en el botón de abajo o en el pie de página.
          </p>
          <CookiePreferencesButton className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:no-underline!" />

          <h3 className="mb-2 mt-6 text-base font-semibold text-white/80">Desde tu navegador</h3>
          <p className="mb-3 text-sm leading-relaxed text-white/60">
            También puedes controlar las cookies directamente desde la configuración de tu navegador:
          </p>
          <ul className="flex flex-col gap-1 text-sm text-white/60">
            {[
              ['Google Chrome', 'https://support.google.com/chrome/answer/95647'],
              ['Mozilla Firefox', 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias'],
              ['Safari', 'https://support.apple.com/es-mx/guide/safari/sfri11471/mac'],
              ['Microsoft Edge', 'https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d'],
            ].map(([name, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer"
                   className="text-sky-400/80 underline-offset-2 hover:underline">
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-white/50">
            <strong className="font-semibold text-white/70">Nota:</strong> deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
          </p>
        </section>

        {/* §4 — Base legal */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Base legal del tratamiento</h2>
          <p className="mb-3 text-sm leading-relaxed text-white/60">
            El uso de cookies en este sitio se fundamenta en:
          </p>
          <ul className="flex flex-col gap-3 text-sm leading-relaxed text-white/60">
            <li>
              <strong className="font-semibold text-white/80">Cookies esenciales:</strong>{' '}
              interés legítimo y necesidad contractual (Art. 14 fracc. I y IV LFPDPPP 2025). No requieren consentimiento.
            </li>
            <li>
              <strong className="font-semibold text-white/80">Cookies no esenciales:</strong>{' '}
              consentimiento previo, libre, específico e informado del titular (Art. 8 LFPDPPP 2025). Solo se activan tras aceptación explícita.
            </li>
          </ul>
        </section>

        {/* §5 — Contacto */}
        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
          <h2 className="mb-3 text-xl font-semibold text-white">Contacto</h2>
          <p className="text-sm leading-relaxed text-white/60">
            Para cualquier consulta sobre el uso de cookies o para ejercer tus derechos ARCO
            (Acceso, Rectificación, Cancelación, Oposición):
          </p>
          <ul className="mt-3 flex flex-col gap-1 text-sm">
            <li>
              <span className="text-white/40">Correo: </span>
              <a href={`mailto:${siteConfig.contact.privacy}`}
                 className="text-sky-400/80 underline-offset-2 hover:underline">
                {siteConfig.contact.privacy}
              </a>
            </li>
            <li className="text-white/40">
              Consulta también nuestro{' '}
              <Link href="/privacidad" className="text-sky-400/80 underline-offset-2 hover:underline">
                Aviso de Privacidad
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </main>
  )
}
