'use client'

import { openCookieBanner } from '@/lib/cookies/consent'

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openCookieBanner}
      className="text-sm font-medium text-zinc-700 hover:text-blue-700 hover:underline dark:text-zinc-300 dark:hover:text-sky-400"
    >
      Preferencias de cookies
    </button>
  )
}
