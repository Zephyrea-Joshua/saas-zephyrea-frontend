import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl, siteConfig } from '@/lib/seo/config'
import { LegalLayout, LegalSection, InfoCard, WarnCard } from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: `Identificación del titular, marco normativo y condiciones generales de navegación del sitio ${siteConfig.brand}.`,
  alternates: { canonical: absoluteUrl('/aviso-legal') },
}

const SECTIONS = [
  { id: 'naturaleza', label: 'Naturaleza del documento' },
  { id: 'titular', label: 'Titular del sitio' },
  { id: 'objeto', label: 'Objeto y destinatarios' },
  { id: 'condiciones-navegacion', label: 'Condiciones de navegación' },
  { id: 'propiedad', label: 'Propiedad intelectual e industrial' },
  { id: 'responsabilidad', label: 'Responsabilidad del contenido' },
  { id: 'privacidad', label: 'Datos personales y cookies' },
]

export default function AvisoLegalPage() {
  return (
    <LegalLayout
      badge={`Legal · ${siteConfig.brand}`}
      title="Aviso legal"
      updated="10 de abril de 2026"
      sections={SECTIONS}
    >
      <LegalSection id="naturaleza" title="Naturaleza y alcance de este aviso">
        <p>
          El presente <strong className="font-semibold text-white">aviso legal</strong> tiene
          por objeto cumplir con los requisitos de transparencia e identificación del prestador
          de servicios de la sociedad de la información previstos en la legislación mexicana
          aplicable —entre otras, la{' '}
          <strong className="font-semibold text-white">
            Ley Federal del Derecho de Autor
          </strong>
          , la{' '}
          <strong className="font-semibold text-white">
            Ley de Propiedad Industrial
          </strong>{' '}
          en lo relativo a signos distintivos, y las disposiciones de comercio electrónico y
          protección al consumidor cuando correspondan— sin sustituir un contrato particular de
          licencia, suscripción o prestación de servicios, que se regirá por sus propias
          cláusulas.
        </p>
        <WarnCard>
          Este aviso regula la <strong className="font-semibold text-white">información general</strong>{' '}
          publicada en el sitio y las reglas básicas de navegación. Las condiciones de uso del
          software <strong className="font-semibold text-white">{siteConfig.name}</strong> como
          servicio contratado se complementan con los{' '}
          <Link href="/terminos" className="text-sky-400/90 underline-offset-2 hover:underline">
            términos y condiciones de uso
          </Link>
          .
        </WarnCard>
      </LegalSection>

      <LegalSection id="titular" title="Identificación del titular del sitio">
        <p>
          El titular responsable del contenido alojado bajo el dominio y subrutas asociadas a{' '}
          <span className="text-white/90">{siteConfig.url}</span> es:
        </p>
        <InfoCard>
          <ul className="flex flex-col gap-2.5">
            <li>
              <span className="text-white/45">Razón social o marca comercial: </span>
              <span className="font-semibold text-white">{siteConfig.brand}</span>
            </li>
            <li>
              <span className="text-white/45">Producto o plataforma: </span>
              <span className="text-white/85">{siteConfig.name}</span>
            </li>
            <li>
              <span className="text-white/45">Sitio web: </span>
              <span className="text-white/85">{siteConfig.url}</span>
            </li>
            <li>
              <span className="text-white/45">Correo electrónico general: </span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sky-400/90 underline-offset-2 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <span className="text-white/45">Correo para privacidad y ARCO: </span>
              <a
                href={`mailto:${siteConfig.contact.privacy}`}
                className="text-sky-400/90 underline-offset-2 hover:underline"
              >
                {siteConfig.contact.privacy}
              </a>
            </li>
            <li>
              <span className="text-white/45">Domicilio para oír y recibir notificaciones: </span>
              <span className="text-white/80">Ciudad de México, México</span>
            </li>
          </ul>
        </InfoCard>
        <p>
          Cualquier comunicación oficial relativa al sitio deberá dirigirse a los correos
          indicados, salvo que la ley o un contrato vigente exija otro canal.
        </p>
      </LegalSection>

      <LegalSection id="objeto" title="Objeto del sitio y destinatarios">
        <p>
          El sitio web tiene como finalidades principales: (i) informar sobre las capacidades
          del software <strong className="font-semibold text-white">{siteConfig.name}</strong>{' '}
          orientado a procesos de recursos humanos (reclutamiento, capacitación e indicadores,
          según el producto contratado); (ii) permitir el contacto comercial o de soporte; (iii)
          en su caso, habilitar formularios de registro, demostración o alta como cliente,
          conforme a los flujos publicados en cada momento.
        </p>
        <p>
          Los contenidos de carácter informativo (textos, capturas, métricas de ejemplo o
          testimonios) tienen valor meramente ilustrativo y no constituyen garantía de
          resultados concretos, salvo pacto expreso por escrito en una propuesta o contrato
          comercial.
        </p>
      </LegalSection>

      <LegalSection id="condiciones-navegacion" title="Condiciones generales de navegación">
        <p>
          El acceso al sitio es libre y gratuito en lo que respecta a la información pública,
          sin perjuicio de que el uso de determinadas funciones (área de cliente, pruebas
          controladas, etc.) pueda exigir registro, credenciales o contrato previo. El usuario se
          compromete a utilizar el sitio de conformidad con la ley, la moral y el orden público,
          absteniéndose de realizar actos que dañen, inutilicen o sobrecarguen la infraestructura
          o interfieran con el uso por terceros.
        </p>
        <p>
          {siteConfig.brand} podrá modificar la estructura, los contenidos o la disponibilidad
          del sitio por mantenimiento, actualización legal o mejora técnica, procurando
          comunicar cambios relevantes cuando sea razonable.
        </p>
      </LegalSection>

      <LegalSection id="propiedad" title="Propiedad intelectual e industrial">
        <p>
          Los elementos que integran el sitio (diseño, código de front-end visible, textos,
          bases de datos en la medida en que proceda protección, logotipos, iconografía,
          combinaciones cromáticas distintivas y, en general, creaciones originales) están
          protegidos por la <strong className="font-semibold text-white">Ley Federal del
          Derecho de Autor</strong> y, en su caso, por la{' '}
          <strong className="font-semibold text-white">Ley de Propiedad Industrial</strong>{' '}
          respecto de marcas y avisos comerciales. Salvo licencia expresa, queda prohibida la
          reproducción, distribución, comunicación pública, transformación o extracción
          sistemática de contenidos.
        </p>
        <p>
          Las marcas de terceros mencionadas en el sitio pertenecen a sus titulares; su
          mención es meramente descriptiva o referencial y no implica patrocinio ni afiliación.
        </p>
      </LegalSection>

      <LegalSection id="responsabilidad" title="Limitación de responsabilidad sobre el contenido informativo">
        <p>
          {siteConfig.brand} procura que la información publicada sea veraz y esté actualizada;
          no obstante, no garantiza la ausencia total de errores tipográficos, omisiones o
          desfases temporales respecto de cambios legislativos o de producto. El uso de la
          información del sitio es bajo su propio criterio y riesgo.
        </p>
        <p>
          En la medida permitida por la legislación aplicable, no se responde por daños
          derivados del uso indebido de la información publicada, ni por decisiones empresariales
          adoptadas únicamente con base en contenidos de marketing o educativos del sitio sin
          asesoría profesional específica.
        </p>
        <h3 className="mb-3 mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
          Enlaces y servicios de terceros
        </h3>
        <p>
          El sitio puede incluir enlaces a páginas operadas por terceros (por ejemplo,
          proveedores de infraestructura, redes sociales o documentación técnica). Dichos
          enlaces se ofrecen como ayuda al usuario; {siteConfig.brand} no controla el contenido
          ni las políticas de privacidad de esos sitios y no asume responsabilidad por los
          mismos. Se recomienda revisar los términos y avisos de privacidad de cada destino.
        </p>
        <p>
          Cuando se integren servicios alojados fuera de nuestro dominio (por ejemplo,
          reproductores, mapas o herramientas de analítica sujetas a su propia política), el
          tratamiento de datos en esos entornos se regirá por lo que dispongan sus titulares.
          Para el uso de cookies y tecnologías similares en este sitio, consulte también la{' '}
          <Link href="/cookies" className="text-sky-400/90 underline-offset-2 hover:underline">
            Política de cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="privacidad" title="Protección de datos personales y cookies">
        <p>
          {siteConfig.brand} trata los datos personales que se recaban a través de este sitio
          (incluidos formularios de contacto o solicitud de información, cookies, herramientas
          de analítica y, en su caso, datos derivados de la navegación) conforme a los principios
          de licitud, consentimiento informado cuando corresponda, finalidad legítima,
          proporcionalidad y responsabilidad previstos en la{' '}
          <strong className="font-semibold text-white">
            Ley Federal de Protección de Datos Personales en Posesión de los Particulares
          </strong>{' '}
          (<strong className="font-semibold text-white">LFPDPPP</strong>) y demás normativa
          aplicable en México.
        </p>
        <p>
          El documento que regula en detalle qué datos se recaban, con qué finalidades, durante
          cuánto tiempo se conservan, si hay transferencias y cómo ejercer sus derechos es el{' '}
          <Link href="/privacidad" className="text-sky-400/90 underline-offset-2 hover:underline">
            Aviso de privacidad integral
          </Link>
          . Le recomendamos leerlo antes de enviar datos a través de cualquier formulario o
          canal publicado en el sitio. El tratamiento de datos vinculado al uso del software{' '}
          <strong className="font-semibold text-white">{siteConfig.name}</strong> como servicio
          contratado por empresas se regirá, además, por los acuerdos comerciales y avisos
          aplicables a cada relación contractual.
        </p>
        <p>
          Respecto de <strong className="font-semibold text-white">cookies y tecnologías
          similares</strong> (identificadores en el navegador, almacenamiento local o píxeles),
          su finalidad, tipología y las opciones de gestión o rechazo se explican en la{' '}
          <Link href="/cookies" className="text-sky-400/90 underline-offset-2 hover:underline">
            Política de cookies
          </Link>
          , complementaria de este aviso. Cuando el sitio muestre un banner o modal de
          preferencias, las decisiones que tome sobre categorías no esenciales se respetarán en
          la medida técnica posible.
        </p>
        <p>
          Usted puede ejercer los derechos de <strong className="font-semibold text-white">
          acceso, rectificación, cancelación, oposición, limitación del uso o divulgación de sus
          datos, y revocar el consentimiento</strong> cuando proceda, según lo previsto en la
          ley, dirigiendo una solicitud al correo indicado para privacidad. Responderemos en los
          plazos y términos que correspondan según la LFPDPPP y lineamientos del INAI.
        </p>
        <InfoCard>
          <p className="text-[15px] leading-relaxed">
            <span className="text-white/45">Correo para temas de privacidad y derechos ARCO: </span>
            <a
              href={`mailto:${siteConfig.contact.privacy}`}
              className="font-semibold text-sky-300 underline-offset-2 hover:underline"
            >
              {siteConfig.contact.privacy}
            </a>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Para el texto completo sobre datos personales, finalidades y medidas de seguridad,
            consulte el{' '}
            <Link href="/privacidad" className="text-sky-400/90 underline-offset-2 hover:underline">
              Aviso de privacidad integral
            </Link>
            .
          </p>
        </InfoCard>
      </LegalSection>
    </LegalLayout>
  )
}
