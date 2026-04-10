import type { Metadata } from 'next'
import Link from 'next/link'
import { empresaMx, leyesReferencia } from '@/lib/legal/empresa-mx'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Uso de cookies y tecnologías similares en el sitio ZEPHYREA (México, LFPDPPP).',
}

export default function CookiesPage() {
  return (
    <article className="legal-doc">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-950">
        Política de cookies y tecnologías similares
      </h1>
      <p className="mb-8 text-sm text-zinc-500">
        Responsable: {empresaMx.identidadResponsable}. Territorio: México. Vigencia: abril de
        2026.
      </p>

      <section className="legal-section">
        <h2>1. Marco aplicable</h2>
        <p>
          El uso de cookies y tecnologías de almacenamiento local puede implicar el
          tratamiento de datos personales cuando permiten identificar a un usuario o
          dispositivo. En esos supuestos, el Responsable tratará la información conforme a la{' '}
          {leyesReferencia.lfpdppp}, el {leyesReferencia.reglamentoLfpdppp}, el presente
          documento y el{' '}
          <Link href="/legal/privacidad">Aviso de privacidad integral</Link>.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos que el Sitio almacena en el navegador del Usuario
          para recordar preferencias, mantener sesiones seguras o medir el uso agregado del
          Sitio. También pueden utilizarse tecnologías similares (p. ej. almacenamiento
          local, «local storage», píxeles o identificadores de sesión).
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Tipos de cookies que pueden utilizarse</h2>
        <ul className="legal-list">
          <li>
            <strong>Técnicas o necesarias:</strong> permiten la navegación, el uso de
            funciones básicas y la seguridad (por ejemplo, equilibrio de carga, preferencias
            de consentimiento). Su uso se fundamenta en el interés legítimo o en la ejecución
            de la relación con el Usuario, según el caso.
          </li>
          <li>
            <strong>De preferencia o funcionalidad:</strong> recuerdan opciones (idioma,
            región). Pueden basarse en consentimiento cuando la ley lo exija.
          </li>
          <li>
            <strong>Analíticas:</strong> estadísticas agregadas de visitas (por ejemplo,
            Plausible u otra herramienta configurada para minimizar datos personales). Se
            cargan cuando el Usuario acepta el banner de cookies, en su caso.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Cookies de terceros</h2>
        <p>
          Si el Sitio incorpora contenidos o scripts de terceros (mapas, reproductores,
          widgets de redes sociales), dichos terceros podrían establecer sus propias cookies.
          El Responsable no controla en su totalidad esas tecnologías; se recomienda revisar
          las políticas de privacidad de cada proveedor.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Cómo gestionar o deshabilitar cookies</h2>
        <p>
          El Usuario puede eliminar o bloquear cookies desde la configuración de su
          navegador (Chrome, Firefox, Safari, Edge, etc.). La desactivación de cookies
          técnicas puede afectar el funcionamiento del Sitio.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Consentimiento</h2>
        <p>
          Cuando el Responsable utilice cookies no esenciales que requieran consentimiento
          conforme a la normativa aplicable, se mostrará un mecanismo claro (banner o
          configurador) para aceptar o rechazar categorías, sin condicionar el acceso a
          información esencial del Sitio salvo lo necesario para fines técnicos legítimos.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Actualizaciones</h2>
        <p>
          Esta política puede modificarse. La versión vigente estará publicada en el Sitio
          con la fecha de última actualización.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Contacto</h2>
        <p>
          Para dudas sobre cookies y datos personales: {empresaMx.correoPrivacidad}.
        </p>
      </section>
    </article>
  )
}
