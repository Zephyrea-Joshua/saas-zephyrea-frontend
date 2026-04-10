import type { Metadata } from 'next'
import Link from 'next/link'
import { empresaMx, leyesReferencia } from '@/lib/legal/empresa-mx'

export const metadata: Metadata = {
  title: 'Términos y condiciones de uso del sitio',
  description:
    'Condiciones de uso del sitio web ZEPHYREA en México: propiedad intelectual, responsabilidad y ley aplicable.',
}

export default function TerminosPage() {
  return (
    <article className="legal-doc">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-950">
        Términos y condiciones de uso del sitio web
      </h1>
      <p className="mb-8 text-sm text-zinc-500">
        Última actualización: abril de 2026. Ámbito: Estados Unidos Mexicanos. Operador: persona
        física (RESICO). Revisar con asesoría legal los términos aplicables a tus servicios.
      </p>

      <section className="legal-section">
        <h2>1. Aceptación</h2>
        <p>
          El acceso y uso del sitio {empresaMx.sitioWeb} (el «Sitio») operado por{' '}
          {empresaMx.identidadResponsable} («{empresaMx.nombreComercial}») implica la aceptación
          de
          estos Términos, del <Link href="/legal/aviso-legal">Aviso legal</Link>, del{' '}
          <Link href="/legal/privacidad">Aviso de privacidad</Link> y de la{' '}
          <Link href="/legal/cookies">Política de cookies</Link>. Si no está de acuerdo,
          deberá abstenerse de utilizar el Sitio.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Objeto</h2>
        <p>
          El Sitio tiene fines informativos y de promoción de productos y servicios de
          software y acompañamiento profesional. La contratación de servicios pagados se
          regirá por el contrato o orden de compra que se formalice por separado, el cual
          prevalecerá en caso de conflicto con estos Términos en lo relativo a obligaciones
          de pago, nivel de servicio y duración.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Registro y cuentas</h2>
        <p>
          Cuando el Sitio permita crear una cuenta, el Usuario garantiza que la información
          es veraz y se compromete a mantenerla actualizada. Las credenciales son personales
          e intransferibles. El Usuario es responsable de las actividades realizadas con su
          cuenta, salvo demostrar uso fraudulento por terceros sin culpa o negligencia propia
          conforme a la {leyesReferencia.lfpc} y legislación aplicable.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Propiedad intelectual</h2>
        <p>
          Los contenidos del Sitio están protegidos por las leyes mexicanas de propiedad
          intelectual y propiedad industrial. No se concede licencia alguna salvo la
          estrictamente necesaria para visualizar el Sitio en un dispositivo personal.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Limitación de responsabilidad</h2>
        <p>
          En el marco de la {leyesReferencia.lfpc} y el {leyesReferencia.codigoCivil}, el
          Sitio se ofrece sin garantías de disponibilidad continua. {empresaMx.nombreComercial}{' '}
          no será responsable de daños indirectos o lucro cesante derivados del uso o
          imposibilidad de uso del Sitio, salvo dolo o culpa grave demostrable o lo que la
          ley imperativa disponga en protección al consumidor.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Enlaces a terceros</h2>
        <p>
          Los enlaces a sitios de terceros se ofrecen como cortesía. {empresaMx.nombreComercial}{' '}
          no controla ni respalda su contenido ni sus políticas de privacidad.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Suspensión</h2>
        <p>
          {empresaMx.nombreComercial} podrá suspender temporal o definitivamente el acceso al
          Sitio por mantenimiento o por incumplimiento de estos Términos, sin perjuicio de las
          acciones legales que correspondan.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Ley aplicable y jurisdicción</h2>
        <p>
          Se aplicarán las leyes federales de los Estados Unidos Mexicanos. Las partes se
          someten a la competencia de los tribunales de la Ciudad de México, renunciando a
          cualquier otro fuero, salvo normas imperativas en materia de consumidor o
          protección de datos que establezcan otro foro o autoridad.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Contacto</h2>
        <p>
          {empresaMx.correoContacto}, domicilio {empresaMx.domicilioFiscal}.
        </p>
      </section>
    </article>
  )
}
