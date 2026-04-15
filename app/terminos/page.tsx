import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl, siteConfig } from '@/lib/seo/config'
import { LegalLayout, LegalSection, InfoCard, WarnCard } from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Términos y condiciones de uso',
  description: `Condiciones de acceso y uso del software ${siteConfig.name} y del sitio web de ${siteConfig.brand}.`,
  alternates: { canonical: absoluteUrl('/terminos') },
}

const SECTIONS = [
  { id: 'definiciones', label: 'Definiciones' },
  { id: 'aceptacion', label: 'Aceptación' },
  { id: 'objeto', label: 'Objeto y naturaleza del servicio' },
  { id: 'contratacion', label: 'Contratación y documentos' },
  { id: 'licencia', label: 'Licencia de uso del software' },
  { id: 'cuenta', label: 'Cuentas y seguridad' },
  { id: 'contenido-cliente', label: 'Contenidos y datos del cliente' },
  { id: 'uso-prohibido', label: 'Usos prohibidos' },
  { id: 'disponibilidad', label: 'Disponibilidad y cambios' },
  { id: 'propiedad', label: 'Propiedad intelectual' },
  { id: 'limitacion', label: 'Limitación de responsabilidad' },
  { id: 'vigencia', label: 'Vigencia y terminación' },
]

export default function TerminosPage() {
  return (
    <LegalLayout
      badge={`Legal · ${siteConfig.name}`}
      title="Términos y condiciones de uso"
      updated="10 de abril de 2026"
      sections={SECTIONS}
    >
      <LegalSection id="definiciones" title="Definiciones">
        <p>Para efectos de estos términos:</p>
        <ul className="flex flex-col gap-2 pl-1">
          <li className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
            <span>
              <strong className="font-semibold text-white">{siteConfig.brand}</strong>, «nosotros»
              o el «prestador»: quien comercializa y da acceso a la plataforma.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
            <span>
              <strong className="font-semibold text-white">{siteConfig.name}</strong> o el
              «servicio»: el software en modalidad SaaS (acceso vía web o aplicaciones asociadas)
              para gestión de procesos de recursos humanos según el plan contratado.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
            <span>
              «Usuario» o «usted»: la persona física o moral que accede al sitio o utiliza el
              servicio, ya sea como visitante, prospecto o cliente con cuenta activa.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
            <span>
              «Datos del cliente»: información que el cliente o sus usuarios autorizados cargan
              en la plataforma (por ejemplo datos de candidatos o colaboradores), sobre la cual
              el cliente actúa como responsable del tratamiento frente a sus titulares.
            </span>
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="aceptacion" title="Aceptación y documentos relacionados">
        <p>
          Al registrarse, contratar una prueba o demo, acceder a un entorno de cliente o, en
          su caso, marcar su conformidad en un flujo de alta, usted declara haber leído y aceptado
          estos términos, el{' '}
          <Link href="/aviso-legal" className="text-sky-400/90 underline-offset-2 hover:underline">
            aviso legal
          </Link>{' '}
          y el{' '}
          <Link href="/privacidad" className="text-sky-400/90 underline-offset-2 hover:underline">
            aviso de privacidad
          </Link>
          . Si actúa en nombre de una empresa, declara tener facultades para obligarla. Si no
          está de acuerdo, no debe utilizar el servicio.
        </p>
      </LegalSection>

      <LegalSection id="objeto" title="Objeto y naturaleza jurídica del servicio">
        <p>
          {siteConfig.name} es una herramienta de software para apoyar procesos de reclutamiento,
          capacitación e indicadores de recursos humanos, según módulos y límites del plan
          contratado. El servicio se presta por suscripción o modalidad acordada (mensual,
          anual, piloto, etc.) y puede incluir soporte, capacitación de uso o integraciones, tal
          como se describa en la propuesta comercial o el anexo técnico aplicable.
        </p>
        <WarnCard>
          Estos términos regulan la <strong className="font-semibold text-white">relación contractual</strong>{' '}
          de uso del software. Las obligaciones laborales entre empleador y trabajador, el
          cumplimiento de la NOM-035, la LFT o normas sectoriales siguen siendo exclusiva
          responsabilidad del cliente como empleador o responsable frente a sus trabajadores;
          la plataforma es un medio de apoyo, no un asesor legal sustituto.
        </WarnCard>
      </LegalSection>

      <LegalSection id="contratacion" title="Contratación, precios y documentos prevalecientes">
        <p>
          Las condiciones económicas (precio, moneda, facturación, vigencia del plan, número de
          usuarios o sedes) se establecerán en la cotización, orden de compra o contrato marco
          que se suscriba entre las partes. En caso de conflicto entre un documento firmado y
          estos términos, prevalecerá lo pactado expresamente por escrito en el contrato o anexo
          comercial, salvo que la ley impida ello.
        </p>
        <p>
          Los precios publicados en el sitio pueden ser orientativos; la oferta vinculante es
          la confirmada por {siteConfig.brand} por el canal oficial (correo, firma electrónica o
          plataforma de facturación acordada).
        </p>
      </LegalSection>

      <LegalSection id="licencia" title="Licencia de uso del software">
        <p>
          Sujeto al pago o condiciones de la prueba autorizada, {siteConfig.brand} le otorga una
          licencia <strong className="font-semibold text-white">limitada, no exclusiva,
          intransferible y revocable</strong> para acceder y usar {siteConfig.name} durante la
          vigencia del acuerdo, únicamente para fines internos de su organización y conforme a la
          documentación de usuario. No adquiere propiedad sobre el software ni derecho de
          sublicenciar, revender, realizar ingeniería inversa (salvo excepción legal), ni
          extraer masivamente datos no autorizados.
        </p>
      </LegalSection>

      <LegalSection id="cuenta" title="Cuentas, usuarios autorizados y seguridad">
        <p>
          El cliente designará usuarios con credenciales; es responsable de su actividad y de
          mantener contraseñas seguras y actualizadas. Deberá notificar de inmediato accesos no
          autorizados o incidentes de seguridad a{' '}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-sky-400/90 underline-offset-2 hover:underline"
          >
            {siteConfig.contact.email}
          </a>
          . {siteConfig.brand} podrá aplicar medidas razonables de bloqueo o restablecimiento de
          credenciales ante riesgo comprobado.
        </p>
      </LegalSection>

      <LegalSection id="contenido-cliente" title="Contenidos del cliente y tratamiento de datos">
        <p>
          Los datos que el cliente ingrese (candidatos, colaboradores, evaluaciones, etc.)
          permanecen bajo su responsabilidad en cuanto al cumplimiento de la LFPDPPP y avisos de
          privacidad que deba otorgar a sus titulares. {siteConfig.brand} actuará como{' '}
          <strong className="font-semibold text-white">encargado del tratamiento</strong> cuando
          así se prevea en el aviso de privacidad o contrato de encargo aplicable, tratando
          dichos datos solo para operar el servicio y según instrucciones documentadas del
          responsable.
        </p>
        <p>
          El cliente garantiza que tiene legitimidad para cargar la información y que no
          infringe derechos de terceros. Deberá conservar copias de respaldo cuando la naturaleza
          de su negocio lo exija, sin perjuicio de los mecanismos de respaldo que {siteConfig.brand}{' '}
          implemente en la infraestructura del servicio.
        </p>
      </LegalSection>

      <LegalSection id="uso-prohibido" title="Usos prohibidos">
        <p>Está prohibido, sin enumeración taxativa:</p>
        <ul className="flex flex-col gap-2 pl-1">
          {[
            'Usar el servicio para fines ilícitos, discriminatorios o que vulneren derechos humanos.',
            'Sobrecargar, vulnerar o intentar eludir medidas de seguridad o límites técnicos del plan.',
            'Introducir código malicioso o extraer bases de datos de forma no autorizada.',
            'Utilizar la marca o los contenidos de Zephyrea/AetherCore de modo que induzca a error sobre origen o patrocinio.',
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          El incumplimiento grave podrá motivar la suspensión temporal o la terminación del
          acceso, previa notificación cuando la ley o la buena fe lo permitan.
        </p>
      </LegalSection>

      <LegalSection id="disponibilidad" title="Disponibilidad, mantenimiento y evolución del producto">
        <p>
          {siteConfig.brand} procura mantener el servicio operativo de forma continua, sin
          perjuicio de ventanas de mantenimiento programado, actualizaciones de seguridad o
          causas de fuerza mayor. Las características del producto pueden evolucionar; se
          procurará avisar con antelación razonable cambios sustanciales que afecten flujos
          críticos del cliente.
        </p>
      </LegalSection>

      <LegalSection id="propiedad" title="Propiedad intelectual del prestador">
        <p>
          Todo el software, documentación, marcas distintivas de {siteConfig.brand} y materiales
          de capacitación asociados al servicio son propiedad del prestador o de sus
          licenciantes. La licencia concedida no implica cesión de derechos patrimoniales. Los
          comentarios o sugerencias que el cliente envíe podrán ser utilizados para mejorar el
          producto sin obligación de compensación, salvo acuerdo distinto.
        </p>
      </LegalSection>

      <LegalSection id="limitacion" title="Limitación de responsabilidad">
        <p>
          En el máximo alcance permitido por la legislación mexicana aplicable, la
          responsabilidad global de {siteConfig.brand} frente al cliente por un mismo hecho
          quedará limitada, en conjunto, al monto pagado por el cliente por el servicio en los
          doce meses anteriores al evento que origine el reclamo (o la parte proporcional si el
          periodo de facturación es distinto), salvo en casos de dolo o lesiones a la vida o la
          salud cuando la ley no permita limitación.
        </p>
        <p>
          No se responde por lucro cesante indirecto, pérdida de oportunidades de negocio o daños
          derivados de decisiones tomadas únicamente con base en indicadores mostrados en la
          plataforma sin validación profesional adicional del cliente.
        </p>
      </LegalSection>

      <LegalSection id="vigencia" title="Vigencia, suspensión y terminación">
        <p>
          El acuerdo rige desde la aceptación electrónica de estos términos, desde el alta en un
          entorno de prueba o desde la <strong className="font-semibold text-white">fecha de
          inicio</strong> indicada en la propuesta, orden de compra o contrato comercial, hasta
          el vencimiento del periodo contratado, su renovación automática (si aplica) o su
          rescisión conforme a lo pactado por escrito.
        </p>
        <p>
          El cliente puede solicitar la baja o dejar de utilizar el servicio respetando los{' '}
          <strong className="font-semibold text-white">plazos de preaviso</strong>, cargos
          proporcionales o periodos mínimos de permanencia que consten en el plan contratado.
          La mera inactividad en la plataforma no supone, por sí sola, rescisión contractual si
          el servicio sigue facturándose según lo acordado.
        </p>
        <p>
          {siteConfig.brand} podrá <strong className="font-semibold text-white">suspender
          temporalmente</strong> el acceso ante incumplimiento grave (incluido el impago,
          abuso de recursos o usos prohibidos), riesgo de seguridad o requerimiento de autoridad
          competente, procurando notificar por los medios de contacto registrados cuando no
          esté prohibido. La suspensión no exime, en su caso, del pago de cantidades devengadas
          hasta la fecha del evento.
        </p>
        <p>
          Concluida la relación por cualquier causa, el acceso a{' '}
          <strong className="font-semibold text-white">{siteConfig.name}</strong> se ajustará a
          los plazos de exportación, eliminación o conservación previstos en el{' '}
          <Link href="/privacidad" className="text-sky-400/90 underline-offset-2 hover:underline">
            aviso de privacidad
          </Link>{' '}
          y en el contrato o anexo de encargo aplicable. El cliente es responsable de descargar
          oportunamente la información que deba conservar por obligaciones legales o internas.
        </p>
        <h3 className="mb-3 mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
          Ley aplicable, jurisdicción y contacto
        </h3>
        <p>
          Estos términos se interpretan conforme a las leyes de los{' '}
          <strong className="font-semibold text-white">Estados Unidos Mexicanos</strong>. Salvo
          disposición imperativa en contrario, las partes se someten a la competencia de los
          tribunales de la{' '}
          <strong className="font-semibold text-white">Ciudad de México</strong>, renunciando a
          cualquier otro fuero que pudiera corresponderles por razón de domicilios presentes o
          futuros o por el lugar de prestación del servicio.
        </p>
        <InfoCard>
          <p className="text-[15px] leading-relaxed">
            <span className="text-white/45">Consultas generales sobre estos términos: </span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-semibold text-sky-300 underline-offset-2 hover:underline"
            >
              {siteConfig.contact.email}
            </a>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            Para ejercicio de derechos ARCO o privacidad, utilice el canal indicado en el{' '}
            <Link href="/privacidad" className="text-sky-400/90 underline-offset-2 hover:underline">
              aviso de privacidad integral
            </Link>
            .
          </p>
        </InfoCard>
      </LegalSection>
    </LegalLayout>
  )
}
