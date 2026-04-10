import type { Metadata } from 'next'
import { LegalExternalLinkPreview } from '@/app/components/legal-link-preview'
import { empresaMx, leyesReferencia } from '@/lib/legal/empresa-mx'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description:
    'Identificación del proveedor, marco aplicable en México (LFPC, LFPI) y condiciones generales del sitio ZEPHYREA.',
}

export default function AvisoLegalPage() {
  return (
    <article className="legal-doc">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-950">Aviso legal</h1>
      <p className="mb-8 text-sm text-zinc-500">
        Vigencia: abril de 2026. Territorio: Estados Unidos Mexicanos. El proveedor actúa como
        persona física bajo el RESICO; revisar con asesoría legal cualquier obligación sectorial.
      </p>

      <section className="legal-section">
        <h2>1. Objeto y ámbito</h2>
        <p>
          El presente aviso regula el acceso y uso del sitio web y, en su caso, la aplicación
          o plataforma accesible desde {empresaMx.sitioWeb} (en adelante, el «Sitio»),
          operado por {empresaMx.identidadResponsable}, en adelante «{empresaMx.nombreComercial}»
          o
          «el Responsable», con domicilio en {empresaMx.domicilioFiscal}, RFC{' '}
          {empresaMx.rfc}.
        </p>
        <p>
          El uso del Sitio implica que el usuario («Usuario») ha leído y acepta las
          condiciones del presente Aviso legal, la Política de privacidad, la Política de
          cookies y, cuando corresponda, los Términos y condiciones de contratación o uso de
          servicios, en los términos previstos por la legislación mexicana aplicable,
          incluida la {leyesReferencia.lfpc}, la Ley Federal de Protección a la Propiedad
          Industrial y demás ordenamientos federales y locales conducentes.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Información del proveedor (México)</h2>
        <p>
          En cumplimiento de la información prevista para medios digitales y comercio
          electrónico, se informa:
        </p>
        <ul className="legal-list">
          <li>
            <strong>Identidad del responsable:</strong> {empresaMx.nombreCompletoContribuyente}{' '}
            (persona física, RESICO).
          </li>
          <li>
            <strong>Nombre comercial:</strong> {empresaMx.nombreComercial}
          </li>
          <li>
            <strong>RFC:</strong> {empresaMx.rfc}
          </li>
          <li>
            <strong>Domicilio fiscal:</strong> {empresaMx.domicilioFiscal}
          </li>
          <li>
            <strong>Correo electrónico:</strong> {empresaMx.correoContacto}
          </li>
          <li>
            <strong>Teléfono:</strong> {empresaMx.telefono}
          </li>
          <li>
            <strong>Sitios web:</strong> {empresaMx.sitioWeb}
            {empresaMx.sitiosWebAdicionales.map((u) => (
              <span key={u}>, {u}</span>
            ))}
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {empresaMx.aclaracionPersonaFisica}
        </p>
        <p>
          Para reclamaciones en materia de consumo, el Usuario puede acudir ante la
          Procuraduría Federal del Consumidor (PROFECO) conforme a la {leyesReferencia.lfpc}{' '}
          y sus disposiciones reglamentarias. Información:{' '}
          <LegalExternalLinkPreview url={leyesReferencia.profecoUrl}>
            {leyesReferencia.profecoUrl}
          </LegalExternalLinkPreview>
          .
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Propiedad intelectual e industrial</h2>
        <p>
          Los contenidos del Sitio (textos, gráficos, logotipos, iconografía, software,
          bases de datos, diseño, marcas y, en general, obras y signos distintivos) son
          titularidad de {empresaMx.nombreComercial} o de sus licenciantes, y se encuentran
          protegidos por la legislación mexicana e internacional en materia de propiedad
          intelectual y propiedad industrial.
        </p>
        <p>
          Queda prohibida la reproducción, distribución, comunicación pública, transformación
          o cualquier explotación no autorizada por escrito, salvo las excepciones legales
          (cita, uso legítimo u otras previstas en la Ley Federal del Derecho de Autor y la
          Ley Federal de Protección a la Propiedad Industrial).
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Uso del Sitio y conductas prohibidas</h2>
        <p>El Usuario se obliga a utilizar el Sitio de conformidad con la ley, la moral y el orden público. Queda prohibido:</p>
        <ul className="legal-list">
          <li>Introducir virus, malware o código dañino.</li>
          <li>
            Realizar ingeniería inversa, descompilar o intentar extraer el código fuente
            salvo lo permitido por ley.
          </li>
          <li>
            Utilizar sistemas automatizados de extracción masiva de datos (scraping) sin
            consentimiento expreso.
          </li>
          <li>Suplantar identidades o manipular encabezados o metadatos de forma engañosa.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>5. Limitación de responsabilidad</h2>
        <p>
          El Sitio y sus contenidos se ofrecen «en el estado en que se encuentran». En la
          medida permitida por la {leyesReferencia.lfpc}, el {leyesReferencia.codigoCivil} y
          demás leyes aplicables, {empresaMx.nombreComercial} no garantiza disponibilidad
          ininterrumpida ni ausencia total de errores, y no será responsable por daños
          indirectos, lucro cesante o pérdida de datos salvo que la ley imperativa disponga
          lo contrario.
        </p>
        <p>
          Los enlaces a sitios de terceros se ofrecen como referencia; el Responsable no
          controla dichos sitios ni su contenido, sin perjuicio de lo que se establezca en
          contratos específicos con el Usuario.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Legislación aplicable y jurisdicción</h2>
        <p>
          Para la interpretación y cumplimiento del presente Aviso, serán aplicables las
          leyes federales de los Estados Unidos Mexicanos. Para todo lo no previsto, se
          aplicarán supletoriamente las disposiciones del Código Civil Federal y, en su
          caso, las del estado que corresponda al domicilio del Responsable.
        </p>
        <p>
          El Usuario y {empresaMx.nombreComercial} se someten a la competencia de los
          tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero
          que pudiera corresponderles por razón de sus domicilios presentes o futuros, salvo
          disposición legal imperativa en materia de consumo o de protección de datos que
          establezca otro procedimiento o autoridad.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Modificaciones</h2>
        <p>
          {empresaMx.nombreComercial} podrá actualizar el presente Aviso en cualquier
          momento. La versión vigente se publicará en el Sitio con indicación de fecha de
          actualización. El uso continuado implica conocimiento de los cambios cuando así lo
          prevea la ley.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Contacto</h2>
        <p>
          Para cualquier aclaración sobre este documento: {empresaMx.correoContacto}, con
          domicilio en {empresaMx.domicilioCorrespondencia}.
        </p>
      </section>
    </article>
  )
}
