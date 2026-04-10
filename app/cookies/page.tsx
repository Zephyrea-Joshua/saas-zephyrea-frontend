import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl, siteConfig } from '@/lib/seo/config'
import { CookiePreferencesButton } from '@/components/legal/CookieBanner'
import {
  LegalLayout,
  LegalSection,
  LegalTable,
  InfoCard,
  WarnCard,
} from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: `Información sobre el uso de cookies en ${siteConfig.name} conforme a la LFPDPPP 2025.`,
  alternates: { canonical: absoluteUrl('/cookies') },
}

const SECTIONS = [
  { id: 'que-son',    label: '¿Qué son las cookies?' },
  { id: 'tipos',      label: 'Tipos de cookies' },
  { id: 'esenciales', label: 'Estrictamente necesarias' },
  { id: 'funcionales',label: 'Funcionales' },
  { id: 'analiticas', label: 'Analíticas' },
  { id: 'rendimiento',label: 'Rendimiento' },
  { id: 'marketing',  label: 'Marketing' },
  { id: 'personalizacion', label: 'Personalización' },
  { id: 'gestion',    label: 'Cómo gestionarlas' },
  { id: 'base-legal', label: 'Base legal' },
]

export default function CookiesPage() {
  return (
    <LegalLayout
      badge={`Legal · ${siteConfig.name}`}
      title="Política de Cookies"
      updated="10 de abril de 2026"
      sections={SECTIONS}
    >

      <LegalSection id="que-son" title="¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando
          visitas un sitio web. Permiten al sitio recordar tus acciones y preferencias durante
          un período de tiempo determinado, para que no tengas que volver a configurarlas cada
          vez que visites el sitio o navegues entre páginas.
        </p>
        <InfoCard>
          En {siteConfig.name} usamos cookies conforme a la{' '}
          <strong className="font-semibold text-white">LFPDPPP 2025</strong> (Ley Federal de
          Protección de Datos Personales en Posesión de los Particulares). Solo cargamos
          cookies no esenciales después de recibir tu consentimiento explícito.
        </InfoCard>
      </LegalSection>

      <LegalSection id="tipos" title="Tipos de cookies que utilizamos">
        <p>
          Clasificamos las cookies en seis categorías según su propósito. Las estrictamente
          necesarias siempre están activas; las demás requieren tu consentimiento previo.
        </p>
      </LegalSection>

      <LegalSection id="esenciales" title="Estrictamente necesarias">
        <p>
          Son indispensables para el funcionamiento básico del sitio. Sin ellas no puedes
          navegar ni usar sus funciones. No pueden desactivarse conforme al Art. 14
          fracc. I de la LFPDPPP 2025, ya que su tratamiento se basa en interés legítimo
          y necesidad contractual.
        </p>
        <LegalTable
          headers={['Cookie', 'Propósito', 'Duración', 'Tipo']}
          rows={[
            ['aethercore_consent',              'Guarda tus preferencias de consentimiento de cookies',           '1 año',    'Propia'],
            ['__Host-next-auth.csrf-token',     'Protección CSRF para formularios y autenticación',              'Sesión',   'Propia'],
            ['__Secure-next-auth.session-token','Mantiene tu sesión activa cuando estás autenticado',            '30 días',  'Propia'],
          ]}
        />
      </LegalSection>

      <LegalSection id="funcionales" title="Funcionales">
        <p>
          Permiten que el sitio recuerde las elecciones que has realizado, como tu tema o
          idioma preferido, para ofrecerte una experiencia personalizada. Se activan
          únicamente con tu consentimiento previo.
        </p>
        <LegalTable
          headers={['Cookie', 'Propósito', 'Duración', 'Tipo']}
          rows={[
            ['aethercore_theme', 'Guarda el tema seleccionado (oscuro / claro)', '1 año', 'Propia'],
            ['aethercore_lang',  'Guarda el idioma preferido de la interfaz',    '1 año', 'Propia'],
          ]}
        />
      </LegalSection>

      <LegalSection id="analiticas" title="Analíticas">
        <p>
          Nos ayudan a entender cómo interactúan los usuarios con el sitio, qué páginas
          visitan con más frecuencia y dónde encuentran dificultades. Toda la información
          se recopila de forma anónima y agregada. Se activan únicamente con tu consentimiento
          previo.
        </p>
        <LegalTable
          headers={['Cookie', 'Propósito', 'Duración', 'Tipo']}
          rows={[
            ['_ga',   'Google Analytics: distingue sesiones de usuarios únicos', '2 años', 'Tercero (Google LLC, EUA)'],
            ['_ga_*', 'Google Analytics: almacena el estado de la sesión',       '2 años', 'Tercero (Google LLC, EUA)'],
          ]}
        />
      </LegalSection>

      <LegalSection id="rendimiento" title="Rendimiento">
        <p>
          Recopilan información técnica anónima sobre el rendimiento del sitio y errores,
          para que podamos diagnosticar y resolver problemas rápidamente. Se activan
          únicamente con tu consentimiento previo.
        </p>
        <LegalTable
          headers={['Cookie', 'Propósito', 'Duración', 'Tipo']}
          rows={[
            ['sentry-sc', 'Sentry: seguimiento de errores y métricas de rendimiento técnico', 'Sesión', 'Tercero (Functional Software, Inc., EUA)'],
          ]}
        />
      </LegalSection>

      <LegalSection id="marketing" title="Marketing">
        <p>
          Permiten rastrear visitantes en distintos sitios web con el objetivo de mostrar
          publicidad relevante y medible. Se activan únicamente con tu consentimiento previo.
        </p>
        <LegalTable
          headers={['Cookie', 'Propósito', 'Duración', 'Tipo']}
          rows={[
            ['_fbp',    'Meta Pixel: identificación de visitantes para anuncios en Facebook e Instagram', '3 meses', 'Tercero (Meta Platforms, EUA)'],
            ['_gcl_au', 'Google Ads: mide conversiones de campañas publicitarias',                       '3 meses', 'Tercero (Google LLC, EUA)'],
          ]}
        />
      </LegalSection>

      <LegalSection id="personalizacion" title="Personalización">
        <p>
          Nos permiten ejecutar pruebas A/B, activar feature flags y analizar el
          comportamiento del usuario para mejorar la experiencia del producto. Se activan
          únicamente con tu consentimiento previo.
        </p>
        <LegalTable
          headers={['Cookie', 'Propósito', 'Duración', 'Tipo']}
          rows={[
            ['ab_*',     'Pruebas A/B: asigna la variante de experiencia para optimización', '30 días', 'Propia'],
            ['ff_flags', 'Feature flags: activa funcionalidades en etapa de prueba',         'Sesión',  'Propia'],
          ]}
        />
      </LegalSection>

      <LegalSection id="gestion" title="Cómo gestionar tus cookies">
        <p className="font-semibold text-white">Desde nuestro panel</p>
        <p>
          Al ingresar por primera vez al sitio, aparece un banner donde puedes aceptar
          todas las cookies, rechazar las no esenciales, o configurar tus preferencias por
          categoría. Puedes cambiar tu decisión en cualquier momento:
        </p>
        <div>
          <CookiePreferencesButton className="inline-flex rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.05] hover:no-underline!" />
        </div>

        <p className="mt-2 font-semibold text-white">Desde tu navegador</p>
        <p>
          También puedes gestionar las cookies directamente en la configuración de tu
          navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar la
          funcionalidad del sitio.
        </p>
        <ul className="flex flex-col gap-2 pl-1">
          {[
            ['Google Chrome',  'https://support.google.com/chrome/answer/95647'],
            ['Mozilla Firefox','https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias'],
            ['Safari',         'https://support.apple.com/es-mx/guide/safari/sfri11471/mac'],
            ['Microsoft Edge', 'https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d'],
          ].map(([name, href]) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400/80 underline-offset-2 transition-colors hover:text-sky-300 hover:underline"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection id="base-legal" title="Base legal del tratamiento">
        <p>El uso de cookies en este sitio se fundamenta en:</p>
        <div className="flex flex-col gap-4">
          <WarnCard>
            <p>
              <strong className="font-semibold text-white">Cookies estrictamente necesarias —</strong>{' '}
              interés legítimo y necesidad contractual (Art. 14 fracc. I y IV LFPDPPP 2025).
              No requieren consentimiento.
            </p>
          </WarnCard>
          <WarnCard>
            <p>
              <strong className="font-semibold text-white">Cookies no esenciales —</strong>{' '}
              consentimiento previo, libre, específico e informado del titular
              (Art. 8 LFPDPPP 2025). Solo se activan tras aceptación explícita.
            </p>
          </WarnCard>
        </div>
      </LegalSection>

      <LegalSection id="contacto" title="Contacto">
        <p>
          Para cualquier consulta sobre el uso de cookies o para ejercer tus derechos ARCO
          (Acceso, Rectificación, Cancelación, Oposición):
        </p>
        <InfoCard>
          <ul className="flex flex-col gap-1.5">
            <li>
              <span className="text-white/45">Correo: </span>
              <a
                href={`mailto:${siteConfig.contact.privacy}`}
                className="text-sky-400/90 underline-offset-2 hover:underline"
              >
                {siteConfig.contact.privacy}
              </a>
            </li>
            <li>
              <span className="text-white/45">Plazo de respuesta: </span>
              <span className="text-white/80">20 días hábiles</span>
            </li>
            <li className="pt-1">
              <Link
                href="/privacidad"
                className="text-sky-400/80 underline-offset-2 hover:underline"
              >
                Consulta también nuestro Aviso de Privacidad
              </Link>
            </li>
          </ul>
        </InfoCard>
      </LegalSection>

    </LegalLayout>
  )
}
