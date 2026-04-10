'use client'

import Link from 'next/link'
import { NavbarIsotipo } from '@/app/components/navbar-isotipo'
import { ThemeTogglerButton } from '@/app/components/theme-tlogger'
import { cn } from '@/lib/utils'

const legalNav = [
  { href: '/legal/aviso-legal', label: 'Aviso legal' },
  { href: '/legal/privacidad', label: 'Privacidad (LFPDPPP)' },
  { href: '/legal/cookies', label: 'Cookies' },
  { href: '/legal/terminos', label: 'Términos' },
] as const

export function LegalSiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg text-zinc-900 transition-opacity hover:opacity-90 dark:text-white"
        >
          <NavbarIsotipo className="size-9" />
          <span className="font-semibold tracking-tight">ZEPHYREA</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <nav
            className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs font-medium sm:gap-x-4 sm:text-sm"
            aria-label="Documentos legales"
          >
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-blue-700 hover:text-blue-900 hover:underline dark:text-sky-400 dark:hover:text-sky-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeTogglerButton
            type="button"
            variant="outline"
            size="default"
            className={cn(
              'shrink-0 border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100',
              'dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800'
            )}
            aria-label="Cambiar tema"
          />
        </div>
      </div>
    </header>
  )
}
