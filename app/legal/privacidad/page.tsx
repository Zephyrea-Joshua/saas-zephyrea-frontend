import type { Metadata } from 'next'
import { LegalExternalLinkPreview } from '@/app/components/legal-link-preview'
import { empresaMx, leyesReferencia } from '@/lib/legal/empresa-mx'

export const metadata: Metadata = {
  title: 'Aviso de privacidad integral',
  description:
    'Tratamiento de datos personales conforme a la LFPDPPP y Reglamento en México. Derechos ARCO, INAI.',
}

export default function PrivacidadPage() {
  return (
    <article className="legal-doc">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-950">
        Aviso de privacidad integral
      </h1>
      <p className="mb-8 text-sm text-zinc-500">
        Responsable en territorio mexicano. Vigencia: abril de 2026. El responsable actúa como
        persona física bajo el RESICO; conviene revisar este aviso con asesoría jurídica y de
        privacidad.
      </p>

      <section className="legal-section">
        <h2>1. Identidad y domicilio del responsable</h2>
        <p>
          {empresaMx.identidadResponsable}, en su carácter de responsable del tratamiento de
          datos personales (en adelante, el «Responsable»), con domicilio en{' '}
          {empresaMx.domicilioFiscal}, RFC {empresaMx.rfc}, pone a disposición del titular el
          presente Aviso de
          privacidad integral, en cumplimiento de la {leyesReferencia.lfpdppp}, del{' '}
          {leyesReferencia.reglamentoLfpdppp} y demás normatividad aplicable.
        </p>
        <p>
          <strong>Nombre comercial:</strong> {empresaMx.nombreComercial}.{' '}
          <strong>Correo para derechos ARCO y privacidad:</strong> {empresaMx.correoPrivacidad}.
          Atención: {empresaMx.responsableDatos}.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Datos personales objeto de tratamiento</h2>
        <p>Según la relación que entable el titular con el Responsable, podrán tratarse, entre otros:</p>
        <ul className="legal-list">
          <li>
            <strong>Identificación:</strong> nombre, correo electrónico, teléfono, cargo,
            empresa, RFC (si se proporciona voluntariamente en formularios comerciales).
          </li>
          <li>
            <strong>Contacto y comerciales:</strong> datos que el titular incluya en
            formularios de contacto, solicitudes de demostración o cotización.
          </li>
          <li>
            <strong>Técnicos y de uso del Sitio:</strong> dirección IP, tipo de navegador,
            páginas visitadas, tiempo de visita, identificadores de sesión y cookies,
            conforme a la Política de cookies.
          </li>
        </ul>
        <p>
          No se solicitan datos personales considerados sensibles en el sentido de la ley
          (salvo que un servicio específico lo requiera y se recabe consentimiento expreso por
          escrito), ni datos de menores de edad sin el consentimiento de quien ejerza la
          patria potestad o tutela, según corresponda.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Finalidades del tratamiento</h2>
        <p>
          <strong>Finalidades primarias</strong> (necesarias para la relación jurídica o
          solicitadas por el titular):
        </p>
        <ul className="legal-list">
          <li>Responder solicitudes de información, demostraciones o cotizaciones.</li>
          <li>Proveer los servicios contratados y dar cumplimiento a obligaciones contractuales.</li>
          <li>Facturación, administración y cobro, en su caso.</li>
          <li>Atención de requerimientos de autoridades competentes cuando la ley lo exija.</li>
        </ul>
        <p>
          <strong>Finalidades secundarias</strong> (que no impiden la relación si el titular
          no autoriza, salvo que la ley disponga lo contrario):
        </p>
        <ul className="legal-list">
          <li>Envío de comunicaciones informativas o comerciales sobre productos afines.</li>
          <li>Encuestas de satisfacción y mejora de servicios.</li>
          <li>Estadísticas internas y análisis de uso agregado del Sitio.</li>
        </ul>
        <p>
          El titular podrá oponerse a finalidades secundarias o revocar su consentimiento en
          los términos del apartado 6. Si no manifiesta negativa en el momento del
          tratamiento cuando la ley lo permita por silencio positivo, se entenderá
          conforme a lo indicado en formularios específicos; en caso contrario, se solicitará
          consentimiento expreso.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Transferencias y encargados</h2>
        <p>
          Los datos podrán ser compartidos con prestadores de servicios que actúen como
          encargados (por ejemplo, hospedaje, correo electrónico transaccional, analítica
          agregada), obligados contractualmente a tratar los datos conforme a las
          instrucciones del Responsable y este aviso.
        </p>
        <p>
          <strong>Transferencias nacionales o internacionales:</strong> solo se realizarán
          cuando sean necesarias para las finalidades descritas y exista el supuesto legal
          (consentimiento del titular, cláusula contractual tipo, consentimiento tácito en
          supuestos permitidos, etc.). Si los servidores se localizan fuera de México, el
          Responsable procurará que el país de destino ofrezca nivel adecuado de protección o
          se celebren cláusulas contractuales conforme al artículo 37 de la LFPDPPP.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Mecanismos para el ejercicio de derechos ARCO y limitación de uso</h2>
        <p>
          El titular o su representante legal podrán solicitar en cualquier momento el
          acceso, rectificación, cancelación u oposición al tratamiento de sus datos
          personales, así como limitar el uso o divulgación, mediante solicitud escrita al
          correo {empresaMx.correoPrivacidad}, indicando nombre completo, medio de contacto,
          copia de identificación oficial y descripción clara de la solicitud. El
          Responsable responderá en los plazos legales y comunicará la resolución por el
          mismo medio, o solicitará aclaraciones cuando proceda.
        </p>
        <p>
          Para revocar el consentimiento al tratamiento de datos personales (salvo casos en
          que la ley permita continuar el tratamiento), el titular podrá usar el mismo
          procedimiento. La revocación no tendrá efectos retroactivos cuando el tratamiento
          sea lícito por otra causa.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Opciones y medios para limitar el uso de datos</h2>
        <p>
          El Responsable pondrá a disposición mecanismos razonables para registrar la
          negativa al tratamiento para finalidades secundarias, inscripción en listas de
          exclusión de publicidad y, cuando aplique, bloqueo de datos conforme al Reglamento.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Cambios al aviso de privacidad</h2>
        <p>
          Cualquier cambio sustancial será publicado en {empresaMx.sitioWeb} con la fecha de
          actualización. En tratamientos basados en consentimiento, se recabará de nuevo
          cuando la ley lo exija.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Quejas y procedimiento ante el INAI</h2>
        <p>
          Si el titular considera que su derecho a la protección de datos personales ha sido
          lesionado por el Responsable, podrá interponer la queja o denuncia correspondiente
          ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección
          de Datos Personales (INAI), conforme a la LFPDPPP y su reglamento. Información:{' '}
          <LegalExternalLinkPreview url={leyesReferencia.inaiUrl}>
            {leyesReferencia.inaiUrl}
          </LegalExternalLinkPreview>
          .
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Conservación</h2>
        <p>
          Los datos se conservarán durante el tiempo necesario para cumplir las finalidades
          descritas y los plazos legales de conservación (fiscal, mercantil, laboral, etc.),
          después de lo cual serán bloqueados y suprimidos conforme a procedimientos seguros.
        </p>
      </section>

      <section className="legal-section">
        <h2>10. Uso de cookies y tecnologías similares</h2>
        <p>
          El tratamiento mediante cookies y similares se describe en la Política de
          cookies, la cual forma parte integrante de este aviso para efectos informativos al
          titular.
        </p>
      </section>
    </article>
  )
}
