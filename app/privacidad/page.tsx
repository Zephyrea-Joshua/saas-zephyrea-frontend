import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl, siteConfig } from '@/lib/seo/config'
import {
  LegalLayout,
  LegalSection,
  LegalTable,
  InfoCard,
  WarnCard,
} from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad',
  description: `Aviso de Privacidad Integral de ${siteConfig.name} conforme a la LFPDPPP 2025. Conoce cómo tratamos tus datos personales.`,
  alternates: { canonical: absoluteUrl('/privacidad') },
}

const SECTIONS = [
  { id: 'responsable',   label: 'Responsable del tratamiento' },
  { id: 'datos',         label: 'Datos que recabamos' },
  { id: 'finalidades',   label: 'Finalidades del tratamiento' },
  { id: 'consentimiento',label: 'Consentimiento' },
  { id: 'transferencias',label: 'Transferencias' },
  { id: 'arco',          label: 'Derechos ARCO' },
  { id: 'seguridad',     label: 'Medidas de seguridad' },
  { id: 'cookies',       label: 'Cookies' },
  { id: 'cambios',       label: 'Cambios al aviso' },
]

export default function PrivacidadPage() {
  return (
    <LegalLayout
      badge={`Legal · ${siteConfig.name}`}
      title="Aviso de Privacidad"
      updated="10 de abril de 2026"
      sections={SECTIONS}
    >

      {/* ── 1. Responsable ─────────────────────────────────────────────── */}
      <LegalSection id="responsable" title="Responsable del tratamiento">
        <p>
          En cumplimiento con la{' '}
          <strong className="font-semibold text-white">
            Ley Federal de Protección de Datos Personales en Posesión de los Particulares
            (LFPDPPP 2025)
          </strong>
          , con última reforma publicada en el DOF el 20 de marzo de 2025, le informamos que
          el responsable del tratamiento de sus datos personales es:
        </p>
        <InfoCard>
          <ul className="flex flex-col gap-2">
            <li><span className="text-white/50">Empresa: </span><span className="font-semibold text-white">{siteConfig.brand}</span></li>
            <li><span className="text-white/50">Sitio web: </span><span className="text-white/80">{siteConfig.url}</span></li>
            <li><span className="text-white/50">Correo: </span>
              <a href={`mailto:${siteConfig.contact.privacy}`} className="text-sky-400/90 hover:underline underline-offset-2">
                {siteConfig.contact.privacy}
              </a>
            </li>
            <li><span className="text-white/50">Domicilio: </span><span className="text-white/80">Ciudad de México, México</span></li>
          </ul>
        </InfoCard>
        <p>
          La autoridad supervisora competente es la{' '}
          <strong className="font-semibold text-white">
            Secretaría de Anticorrupción y Buen Gobierno
          </strong>{' '}
          (antes INAI, disuelto por decreto del 20 de marzo de 2025).
        </p>
      </LegalSection>

      {/* ── 2. Datos ───────────────────────────────────────────────────── */}
      <LegalSection id="datos" title="Datos personales que recabamos">
        <p>
          Para las finalidades señaladas en el presente aviso, recabamos las siguientes
          categorías de datos personales:
        </p>

        <p className="font-semibold text-white">Datos de identificación y contacto</p>
        <LegalTable
          headers={['Dato', 'Ejemplo', 'Sensible']}
          rows={[
            ['Nombre completo',       'Nombre y apellidos',          'No'],
            ['Correo electrónico',    'usuario@empresa.com',         'No'],
            ['Número de teléfono',    'Número móvil o fijo',         'No'],
            ['Nombre de la empresa',  'Razón social o nombre comercial', 'No'],
            ['Cargo o puesto',        'Director, Gerente, etc.',     'No'],
          ]}
        />

        <p className="font-semibold text-white">Datos de uso del servicio</p>
        <LegalTable
          headers={['Dato', 'Descripción', 'Sensible']}
          rows={[
            ['Dirección IP',         'Registrada automáticamente al navegar',         'No'],
            ['Datos de navegación',  'Páginas visitadas, duración, interacciones',    'No'],
            ['Dispositivo y SO',     'Tipo de dispositivo, sistema operativo, idioma','No'],
            ['Historial de sesiones','Fecha, hora y acciones dentro del sistema',     'No'],
          ]}
        />

        <WarnCard>
          <p>
            <strong className="font-semibold text-white">Datos sensibles —</strong>{' '}
            {siteConfig.name} no recaba datos sensibles (salud, vida sexual, origen racial,
            creencias religiosas, opiniones políticas, datos biométricos) salvo que el
            usuario los proporcione voluntariamente en campos de texto libre. En ese caso
            se solicitará consentimiento expreso por escrito.
          </p>
        </WarnCard>
      </LegalSection>

      {/* ── 3. Finalidades ─────────────────────────────────────────────── */}
      <LegalSection id="finalidades" title="Finalidades del tratamiento">
        <p className="font-semibold text-white">
          Finalidades primarias — no requieren consentimiento adicional
        </p>
        <p>
          Son las finalidades que dan origen a la relación jurídica entre usted y{' '}
          {siteConfig.brand}:
        </p>
        <ul className="flex flex-col gap-2 pl-1">
          {[
            'Proveer, operar y mantener la plataforma AetherCore y sus funcionalidades.',
            'Crear y gestionar su cuenta de usuario.',
            'Procesar solicitudes de demostración, cotización o soporte técnico.',
            'Enviar notificaciones operativas y transaccionales del servicio.',
            'Cumplir con obligaciones contractuales y legales aplicables.',
            'Prevenir fraudes, actividades ilícitas y garantizar la seguridad de la plataforma.',
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-2 font-semibold text-white">
          Finalidades secundarias — requieren consentimiento
        </p>
        <p>
          Las siguientes finalidades no son necesarias para la prestación del servicio.
          Puede negar o revocar su consentimiento sin que ello afecte el uso de la
          plataforma:
        </p>
        <ul className="flex flex-col gap-2 pl-1">
          {[
            'Envío de comunicaciones de marketing, novedades del producto y contenido educativo.',
            'Realización de encuestas de satisfacción y estudios de mercado.',
            'Elaboración de perfiles de uso para personalizar la experiencia del producto.',
            'Compartir información con socios comerciales para actividades promocionales conjuntas.',
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/25" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <WarnCard>
          Si no desea que sus datos sean tratados para finalidades secundarias, envíe un
          correo a{' '}
          <a href={`mailto:${siteConfig.contact.privacy}`} className="text-sky-400/80 hover:underline underline-offset-2">
            {siteConfig.contact.privacy}
          </a>{' '}
          indicando "No consentimiento de finalidades secundarias" dentro de los 5 días
          hábiles siguientes a la recepción de este aviso.
        </WarnCard>
      </LegalSection>

      {/* ── 4. Consentimiento ──────────────────────────────────────────── */}
      <LegalSection id="consentimiento" title="Consentimiento">
        <p>
          El tratamiento de datos para finalidades primarias se realiza con base en la
          relación contractual y el interés legítimo de {siteConfig.brand}
          (Art. 14 LFPDPPP 2025). Para finalidades secundarias, el consentimiento se
          obtiene mediante:
        </p>
        <ul className="flex flex-col gap-2 pl-1">
          {[
            'Marcación de casillas de consentimiento en formularios del sitio.',
            'Aceptación de comunicaciones de marketing al registrarse.',
            'Configuración de preferencias de cookies en nuestro banner de consentimiento.',
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          Puede revocar su consentimiento en cualquier momento enviando un correo a{' '}
          <a href={`mailto:${siteConfig.contact.privacy}`} className="text-sky-400/80 hover:underline underline-offset-2">
            {siteConfig.contact.privacy}
          </a>
          . La revocación no tiene efectos retroactivos sobre tratamientos ya realizados.
        </p>
      </LegalSection>

      {/* ── 5. Transferencias ──────────────────────────────────────────── */}
      <LegalSection id="transferencias" title="Transferencias de datos personales">
        <p>
          {siteConfig.brand} puede transferir sus datos personales a los siguientes terceros,
          sin que se requiera su consentimiento cuando la transferencia se realice en los
          supuestos del Art. 37 LFPDPPP 2025:
        </p>
        <LegalTable
          headers={['Destinatario', 'País', 'Finalidad', 'Requiere consentimiento']}
          rows={[
            ['Vercel, Inc.',              'EUA', 'Infraestructura de hosting y despliegue de la aplicación',       'No — necesaria para el servicio'],
            ['Google LLC (Google Cloud)', 'EUA', 'Servicios de analítica (GA4) y almacenamiento en la nube',       'Sí — solo con consentimiento de cookies analíticas'],
            ['Meta Platforms, Inc.',      'EUA', 'Medición de campañas publicitarias (Meta Pixel)',                'Sí — solo con consentimiento de cookies de marketing'],
            ['Sentry (Functional Soft.)', 'EUA', 'Monitoreo de errores y rendimiento técnico',                    'Sí — solo con consentimiento de cookies de rendimiento'],
          ]}
        />
        <WarnCard>
          Las transferencias a destinatarios en los Estados Unidos de América se realizan
          bajo los mecanismos de adecuación disponibles conforme a la LFPDPPP 2025.
          {siteConfig.brand} exige a estos proveedores garantías contractuales equivalentes
          al nivel de protección mexicano.
        </WarnCard>
      </LegalSection>

      {/* ── 6. ARCO ────────────────────────────────────────────────────── */}
      <LegalSection id="arco" title="Derechos ARCO">
        <p>
          Usted tiene derecho a{' '}
          <strong className="font-semibold text-white">Acceder</strong> a sus datos
          personales,{' '}
          <strong className="font-semibold text-white">Rectificarlos</strong> cuando sean
          inexactos,{' '}
          <strong className="font-semibold text-white">Cancelarlos</strong> cuando ya no
          sean necesarios para la finalidad que los originó, u{' '}
          <strong className="font-semibold text-white">Oponerse</strong> a su tratamiento
          para fines específicos.
        </p>

        <p className="font-semibold text-white">Procedimiento para ejercer sus derechos</p>
        <ol className="flex flex-col gap-2 pl-1">
          {[
            `Envíe su solicitud al correo ${siteConfig.contact.privacy} con el asunto "Solicitud ARCO".`,
            'Incluya: nombre completo, correo registrado, descripción del derecho que desea ejercer y documentación de identidad.',
            `Recibirá acuse de recibo en un plazo máximo de ${siteConfig.brand} días hábiles.`,
            'El plazo de respuesta es de 20 días hábiles, prorrogables por 20 días adicionales en casos complejos.',
            'La respuesta puede ser: procedente (con ejecución en 15 días hábiles), improcedente (con motivación), o solicitud de información adicional.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-xs font-bold text-sky-400">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>

        <InfoCard>
          <p>
            <strong className="font-semibold text-white">Canal ARCO exclusivo: </strong>
            <a href={`mailto:${siteConfig.contact.privacy}`} className="text-sky-400/90 hover:underline underline-offset-2">
              {siteConfig.contact.privacy}
            </a>
            <br />
            <span className="text-white/50 text-sm">
              Tiempo de respuesta: 20 días hábiles · Prorrogable 20 días adicionales
            </span>
          </p>
        </InfoCard>
      </LegalSection>

      {/* ── 7. Seguridad ───────────────────────────────────────────────── */}
      <LegalSection id="seguridad" title="Medidas de seguridad">
        <p>
          {siteConfig.brand} implementa medidas técnicas, administrativas y físicas para
          proteger sus datos personales contra daño, pérdida, alteración, destrucción,
          acceso o divulgación no autorizada. Entre las medidas adoptadas se encuentran:
        </p>
        <ul className="flex flex-col gap-2 pl-1">
          {[
            'Cifrado TLS 1.3 en todas las comunicaciones entre su dispositivo y nuestros servidores.',
            'Autenticación multifactor (MFA) para acceso a sistemas internos y administrativos.',
            'Control de acceso basado en roles (RBAC) con principio de mínimo privilegio.',
            'Revisiones periódicas de seguridad y pruebas de penetración.',
            'Procedimientos documentados de respuesta a incidentes y notificación de brechas de seguridad.',
            'Copias de seguridad cifradas con retención controlada.',
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          En caso de una brecha de seguridad que afecte significativamente sus derechos
          patrimoniales o morales, {siteConfig.brand} le notificará de manera inmediata por
          correo electrónico, conforme al Art. 20 LFPDPPP 2025.
        </p>
      </LegalSection>

      {/* ── 8. Cookies ─────────────────────────────────────────────────── */}
      <LegalSection id="cookies" title="Cookies y tecnologías de rastreo">
        <p>
          Este sitio utiliza cookies y tecnologías similares. Puede conocer los detalles
          completos, las categorías disponibles y gestionar sus preferencias en nuestra:
        </p>
        <div>
          <Link
            href="/cookies"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.05]"
          >
            Política de Cookies
            <span className="text-white/40">→</span>
          </Link>
        </div>
      </LegalSection>

      {/* ── 9. Cambios ─────────────────────────────────────────────────── */}
      <LegalSection id="cambios" title="Cambios al aviso de privacidad">
        <p>
          {siteConfig.brand} se reserva el derecho de modificar el presente aviso de
          privacidad en cualquier momento para adaptarlo a cambios legislativos, jurisprudenciales,
          editoriales o de política interna.
        </p>
        <p>
          Los cambios serán notificados mediante:
        </p>
        <ul className="flex flex-col gap-2 pl-1">
          {[
            `Publicación de la versión actualizada en ${siteConfig.url}/privacidad con nueva fecha de actualización.`,
            'Correo electrónico a usuarios registrados cuando los cambios sean materiales.',
            'Banner de notificación en el sitio durante los 30 días posteriores a la modificación.',
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <WarnCard>
          El uso continuado de {siteConfig.name} después de la notificación de cambios
          constituirá su aceptación de los mismos. Si no está de acuerdo con las
          modificaciones, deberá dejar de usar el servicio y solicitar la cancelación
          de su cuenta.
        </WarnCard>
      </LegalSection>

      {/* ── 10. Contacto ───────────────────────────────────────────────── */}
      <LegalSection id="contacto" title="Contacto">
        <p>
          Para cualquier consulta relacionada con este aviso de privacidad, el tratamiento
          de sus datos personales o el ejercicio de sus derechos ARCO:
        </p>
        <InfoCard>
          <ul className="flex flex-col gap-3">
            <li className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-white/35">Empresa</span>
              <span className="font-semibold text-white">{siteConfig.brand}</span>
            </li>
            <li className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-white/35">Correo de privacidad</span>
              <a href={`mailto:${siteConfig.contact.privacy}`} className="text-sky-400/90 hover:underline underline-offset-2">
                {siteConfig.contact.privacy}
              </a>
            </li>
            <li className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-white/35">Sitio web</span>
              <span className="text-white/75">{siteConfig.url}</span>
            </li>
            <li className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-white/35">Autoridad competente</span>
              <span className="text-white/75">Secretaría de Anticorrupción y Buen Gobierno</span>
            </li>
          </ul>
        </InfoCard>
      </LegalSection>

    </LegalLayout>
  )
}
