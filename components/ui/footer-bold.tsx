import Link from 'next/link'
import { landingNavLinks } from '@/lib/nav-links'
import { ContactForm } from '@/app/components/contact-form'
import { CookiePreferencesButton } from '@/app/components/cookie-preferences-button'

const legalLinks = [
  { href: '/legal/aviso-legal', label: 'Aviso legal' },
  { href: '/legal/privacidad', label: 'Privacidad' },
  { href: '/legal/cookies', label: 'Cookies' },
  { href: '/legal/terminos', label: 'Términos' },
] as const

export function BoldFooter() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()

  return (
    <footer
      id="contact"
      className="scroll-mt-20 w-full overflow-hidden border-t border-zinc-200 bg-white font-sans text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-lg">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-sky-400">
              ZEPHYREA
            </p>
            <div className="mb-6">
              <img
                src="/zephyrea-logos/logo-horizontal.svg"
                alt="ZEPHYREA"
                width={220}
                height={48}
                className="h-10 w-auto max-w-[220px]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight">
              ¿Quieres ver cómo se ve en tu día a día?
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Escríbenos o deja tus datos: vacantes, formación o lo que más os esté quitando
              tiempo hoy.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="mailto:contacto@zephyrea.site"
                className="w-fit border-b-2 border-zinc-900 pb-1 text-lg font-medium transition-all hover:border-zinc-500 hover:text-zinc-500 dark:border-zinc-100 dark:hover:border-zinc-400 dark:hover:text-zinc-300"
              >
                contacto@zephyrea.site
              </a>
              {calendlyUrl ? (
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:border-blue-400 hover:text-blue-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-sky-500 dark:hover:text-sky-300"
                >
                  Agendar 15 minutos
                </a>
              ) : null}
            </div>
          </div>
          <ContactForm />
        </div>

        <div className="grid gap-12 border-t border-zinc-200 pt-12 dark:border-zinc-800 md:grid-cols-3">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
              Horario
            </p>
            <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              <p>Lun a vie</p>
              <p>9:00 – 18:00 (hora local)</p>
              <p className="pt-2 text-zinc-500 dark:text-zinc-500">Atención en español</p>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
              En esta página
            </p>
            <nav className="flex flex-col gap-2" aria-label="Enlaces del pie de página">
              {landingNavLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-medium text-zinc-700 hover:text-blue-700 hover:underline dark:text-zinc-300 dark:hover:text-sky-400"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
              Legal
            </p>
            <nav className="flex flex-col gap-2" aria-label="Enlaces legales">
              {legalLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-zinc-700 hover:text-blue-700 hover:underline dark:text-zinc-300 dark:hover:text-sky-400"
                >
                  {label}
                </Link>
              ))}
              <CookiePreferencesButton />
            </nav>
          </div>
        </div>

        <div className="relative mt-14 w-full">
          <p
            className="pointer-events-none -mb-[2vw] select-none text-[11vw] font-black leading-none tracking-tighter text-zinc-950 opacity-[0.06] dark:text-white dark:opacity-[0.08] sm:text-[12vw]"
            aria-hidden
          >
            ZEPHYREA
          </p>
          <div className="relative z-10 flex flex-col gap-4 border-t border-zinc-200 pt-8 pb-2 backdrop-blur dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
              © {new Date().getFullYear()} ZEPHYREA
            </span>
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-xs text-zinc-400">RH sin complicarse la vida</span>
              <a
                href="#hero"
                className="text-xs font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                Volver arriba ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
