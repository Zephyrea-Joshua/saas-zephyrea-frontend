import Link from 'next/link'
import { CookiePreferencesButton } from '@/app/components/cookie-preferences-button'
import { LegalSiteHeader } from '@/app/legal/legal-site-header'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <LegalSiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
        <p className="mb-2">
          Contenidos con fines informativos. Sustituir datos marcados y validar con abogado
          en México.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/"
            className="font-medium text-blue-700 hover:underline dark:text-sky-400"
          >
            Volver al sitio principal
          </Link>
          <CookiePreferencesButton className="text-xs text-zinc-500 hover:text-blue-700 dark:text-zinc-400 dark:hover:text-sky-400" />
        </div>
      </footer>
    </div>
  )
}
