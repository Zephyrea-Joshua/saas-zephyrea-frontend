import Link from 'next/link'
import { landingNavLinks } from '@/lib/nav-links'

const legalLinks = [
  { href: '/privacidad', label: 'Aviso de privacidad' },
  { href: '/cookies', label: 'Política de cookies' },
  { href: '/terminos', label: 'Términos de uso' },
  { href: '/aviso-legal', label: 'Aviso legal' },
] as const

export function BoldFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 w-full overflow-hidden border-t border-zinc-200 bg-white font-sans text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
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
