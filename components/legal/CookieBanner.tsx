'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import {
  getStoredConsent,
  saveConsent,
  openCookieBanner,
  type MutablePrefs,
  ACCEPT_ALL,
  REJECT_ALL,
  CONSENT_VERSION,
} from '@/lib/cookies/consent'

// ─── Category metadata ────────────────────────────────────────────────────────

const CATEGORIES: {
  key: keyof MutablePrefs
  label: string
  description: string
}[] = [
  {
    key: 'analytics',
    label: 'Analíticas',
    description: 'GA4, Hotjar, Mixpanel — páginas vistas, sesiones y flujo de usuarios.',
  },
  {
    key: 'performance',
    label: 'Rendimiento',
    description: 'Core Web Vitals y seguimiento de errores (Sentry). Datos técnicos anónimos.',
  },
  {
    key: 'functional',
    label: 'Funcionales',
    description: 'Preferencia de idioma, ajustes de interfaz y widgets de soporte.',
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Meta Pixel, Google Ads y LinkedIn Insight Tag para publicidad relevante.',
  },
  {
    key: 'personalization',
    label: 'Personalización',
    description: 'Pruebas A/B, feature flags y perfilado de comportamiento de usuario.',
  },
]

// ─── Toggle switch ────────────────────────────────────────────────────────────

function Toggle({
  id,
  checked,
  disabled = false,
  onChange,
  label,
}: {
  id: string
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent',
        'transition-colors duration-200 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-card',
        checked ? 'bg-sky-400' : 'bg-white/10',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block size-5 rounded-full bg-white shadow-md',
          'transition-transform duration-200 ease-in-out',
          checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  )
}

// ─── Category row ─────────────────────────────────────────────────────────────

function CategoryRow({
  catKey,
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  catKey: string
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {disabled ? (
        <span className="mt-0.5 shrink-0 text-[11px] font-medium text-sky-400/70 tracking-wide">
          Siempre activo
        </span>
      ) : (
        <Toggle
          id={`cookie-${catKey}`}
          checked={checked}
          onChange={onChange}
          label={label}
        />
      )}
    </div>
  )
}

// ─── Main Banner ──────────────────────────────────────────────────────────────

export function CookieBanner() {
  const [visible,     setVisible]     = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [prefs,       setPrefs]       = useState<MutablePrefs>({ ...REJECT_ALL })
  const dialogRef = useRef<HTMLDivElement>(null)

  // ── Show on load if no consent stored ──────────────────────────────────────
  useEffect(() => {
    if (!getStoredConsent()) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  // ── Re-open from footer ────────────────────────────────────────────────────
  useEffect(() => {
    const handle = () => {
      const stored = getStoredConsent()
      if (stored) {
        const { essential: _e, timestamp: _t, version: _v, ...mutable } = stored
        setPrefs(mutable as MutablePrefs)
        setShowDetails(true)
      } else {
        setPrefs({ ...REJECT_ALL })
        setShowDetails(false)
      }
      setVisible(true)
    }
    window.addEventListener('cookie:reopen', handle)
    return () => window.removeEventListener('cookie:reopen', handle)
  }, [])

  // ── Focus trap ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return
    const dialog = dialogRef.current
    if (!dialog) return

    const sel = 'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(sel))

    const first = focusable()[0]
    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      const els = focusable()
      if (!els.length) return

      if (e.key === 'Escape') {
        if (showDetails) setShowDetails(false)
        return
      }

      if (e.key !== 'Tab') return
      const first = els[0]
      const last  = els[els.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [visible, showDetails])

  // ── Dismiss ────────────────────────────────────────────────────────────────
  const dismiss = useCallback((chosen: MutablePrefs) => {
    saveConsent(chosen)
    setVisible(false)
  }, [])

  const pref = useCallback((key: keyof MutablePrefs, value: boolean) =>
    setPrefs((p) => ({ ...p, [key]: value })), [])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            aria-hidden="true"
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Container: bottom sheet mobile / centered card desktop */}
          <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-4">
            <motion.div
              key="panel"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Preferencias de cookies"
              className={cn(
                // layout
                'w-full max-h-[92dvh] overflow-y-auto',
                'flex flex-col',
                // mobile: bottom sheet
                'rounded-t-3xl',
                // desktop: centered card
                'sm:max-w-lg sm:rounded-3xl',
                // surface
                'bg-[oklch(0.10_0.012_260)] border border-white/[0.08]',
                'shadow-[0_-20px_60px_rgba(0,0,0,0.6)] sm:shadow-[0_24px_80px_rgba(0,0,0,0.7)]',
              )}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.9 }}
            >
              {/* Drag handle (mobile) */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <span className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              <div className="flex flex-col gap-0 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">

                {/* ── Header ───────────────────────────────────────────── */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-400/80">
                      🍪 Privacidad y cookies
                    </p>
                    <h2 className="mt-1 text-base font-bold text-white">
                      Tus preferencias de privacidad
                    </h2>
                  </div>
                  <span className="mt-1 shrink-0 rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-white/30">
                    LFPDPPP 2025
                  </span>
                </div>

                {/* ── Description ──────────────────────────────────────── */}
                <p className="mb-4 text-sm leading-relaxed text-white/60">
                  Usamos cookies propias y de terceros para mejorar tu experiencia, analizar
                  el tráfico y mostrarte contenido relevante. Las esenciales siempre están activas;
                  el resto solo se cargan con tu consentimiento, conforme al{' '}
                  <Link href="/privacidad" className="text-sky-400 underline-offset-2 hover:underline">
                    Aviso de Privacidad
                  </Link>{' '}
                  y la{' '}
                  <strong className="font-semibold text-white/80">LFPDPPP 2025</strong>.
                </p>

                {/* ── Detail panel (expandable) ─────────────────────────── */}
                <AnimatePresence initial={false}>
                  {showDetails && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mb-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-1">
                        {/* Essential — always on */}
                        <CategoryRow
                          catKey="essential"
                          label="Estrictamente necesarias"
                          description="Sesión, autenticación y protección CSRF. Sin estas el sitio no funciona."
                          checked={true}
                          disabled
                          onChange={() => {}}
                        />
                        {CATEGORIES.map(({ key, label, description }) => (
                          <CategoryRow
                            key={key}
                            catKey={key}
                            label={label}
                            description={description}
                            checked={prefs[key]}
                            onChange={(v) => pref(key, v)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Actions ───────────────────────────────────────────── */}
                {showDetails ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => dismiss(ACCEPT_ALL)}
                      className={cn(
                        'flex-1 rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-black',
                        'transition-all hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.10_0.012_260)]',
                      )}
                    >
                      Aceptar todo
                    </button>
                    <button
                      onClick={() => dismiss(prefs)}
                      className={cn(
                        'flex-1 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white',
                        'transition-all hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.10_0.012_260)]',
                      )}
                    >
                      Guardar selección
                    </button>
                    <button
                      onClick={() => dismiss(REJECT_ALL)}
                      className="w-full rounded-xl px-4 py-2 text-sm text-white/40 underline-offset-2 hover:text-white/60 hover:underline transition-colors focus-visible:outline-none"
                    >
                      Rechazar todo
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => dismiss(ACCEPT_ALL)}
                      className={cn(
                        'flex-1 rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-black',
                        'transition-all hover:bg-sky-300 focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.10_0.012_260)]',
                      )}
                    >
                      Aceptar todo
                    </button>
                    <button
                      onClick={() => setShowDetails(true)}
                      className={cn(
                        'flex-1 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white',
                        'transition-all hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.10_0.012_260)]',
                      )}
                    >
                      Gestionar preferencias
                    </button>
                  </div>
                )}

                {/* ── Legal footer ──────────────────────────────────────── */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-white/[0.06] pt-4">
                  <Link
                    href="/privacidad"
                    className="text-[11px] text-white/35 underline-offset-2 hover:text-white/60 hover:underline transition-colors"
                  >
                    Aviso de Privacidad
                  </Link>
                  <span className="text-white/20 text-[11px]">·</span>
                  <Link
                    href="/cookies"
                    className="text-[11px] text-white/35 underline-offset-2 hover:text-white/60 hover:underline transition-colors"
                  >
                    Política de Cookies
                  </Link>
                  <span className="text-white/20 text-[11px]">·</span>
                  <span className="text-[11px] text-white/20">v{CONSENT_VERSION}</span>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Footer button ────────────────────────────────────────────────────────────

export function CookiePreferencesButton({
  className,
}: {
  className?: string
}) {
  return (
    <button
      onClick={openCookieBanner}
      className={cn(
        'text-sm text-white/40 underline-offset-2 hover:text-white/70 hover:underline transition-colors',
        className,
      )}
    >
      Preferencias de cookies
    </button>
  )
}
