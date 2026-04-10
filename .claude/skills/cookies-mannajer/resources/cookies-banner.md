'use client'

/**
 * CookieBanner — LFPDPPP 2025 compliant
 *
 * Copiar a: components/legal/CookieBanner.tsx
 *
 * Dependencias: lib/cookies/consent.ts (§1 del skill)
 * Ajustar colores con las variables CSS del tema del proyecto.
 */

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { saveConsent, getStoredConsent, type ConsentCategories } from '@/lib/cookies/consent'

type TogglePrefs = Omit<ConsentCategories, 'essential'>

export function CookieBanner() {
  const [visible, setVisible]         = useState(false)
  const [leaving, setLeaving]         = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [prefs, setPrefs]             = useState<TogglePrefs>({
    preferences: false,
    analytics:   false,
    marketing:   false,
  })

  // ── Mostrar banner si no hay consentimiento guardado ──────────────────────
  useEffect(() => {
    if (!getStoredConsent()) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  // ── Dismiss con animación de salida ───────────────────────────────────────
  const dismiss = useCallback((cats: TogglePrefs) => {
    setLeaving(true)
    saveConsent(cats)
    setTimeout(() => setVisible(false), 420)
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(0,0,0,0.45)',
          opacity: leaving ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Banner */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Preferencias de cookies"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: 9999,
          // ── Ajustar colores al tema del proyecto ──
          background: 'var(--color-surface, #0A0D12)',
          borderTop: '1px solid var(--color-border, rgba(255,255,255,0.1))',
          boxShadow: '0 -16px 48px rgba(0,0,0,0.5)',
          padding: '1.5rem clamp(1rem, 4vw, 2.5rem)',
          maxHeight: '90dvh',
          overflowY: 'auto',
          // ── Animaciones ──────────────────────────
          transform: leaving ? 'translateY(100%)' : 'translateY(0)',
          opacity:   leaving ? 0 : 1,
          transition: 'transform 0.42s cubic-bezier(0.32,0.72,0,1), opacity 0.35s ease',
          animation: 'cookieBannerIn 0.48s cubic-bezier(0.32,0.72,0,1) both',
        }}
      >
        <style>{`
          @keyframes cookieBannerIn {
            from { transform: translateY(110%); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
          .cookie-btn-primary {
            background: var(--color-accent, #2F80ED);
            color: #fff; border: none; border-radius: 8px;
            padding: .6rem 1.25rem; font-size: .875rem; font-weight: 600;
            cursor: pointer; transition: filter .15s ease;
          }
          .cookie-btn-primary:hover  { filter: brightness(1.12); }
          .cookie-btn-secondary {
            background: transparent;
            color: var(--color-text, #B9C0C8);
            border: 1px solid var(--color-border, rgba(255,255,255,0.15));
            border-radius: 8px; padding: .6rem 1.25rem;
            font-size: .875rem; font-weight: 500; cursor: pointer;
            transition: background .15s ease;
          }
          .cookie-btn-secondary:hover { background: rgba(255,255,255,0.05); }
          .cookie-btn-ghost {
            background: none; border: none; cursor: pointer;
            color: var(--color-muted, rgba(185,192,200,0.7));
            font-size: .875rem; text-decoration: underline;
            text-underline-offset: 3px; padding: .6rem .5rem;
          }
          .cookie-btn-ghost:hover { color: var(--color-text, #B9C0C8); }
        `}</style>

        <div style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.75rem' }}>
            <div>
              <p style={{ margin: 0, fontSize: '.7rem', textTransform: 'uppercase',
                          letterSpacing: '.1em', color: 'var(--color-accent, #2F80ED)' }}>
                🍪 Cookies
              </p>
              <h2 style={{ margin: '.2rem 0 0', fontSize: '1rem', fontWeight: 600,
                           color: 'var(--color-heading, #F4F6F8)' }}>
                Tus preferencias de privacidad
              </h2>
            </div>
            <span style={{ fontSize: '.68rem', color: 'var(--color-muted, rgba(185,192,200,0.5))',
                           paddingTop: '.35rem', whiteSpace: 'nowrap' }}>
              LFPDPPP 2025
            </span>
          </div>

          {/* ── Texto ──────────────────────────────────────────────────── */}
          <p style={{ margin: '0 0 1.1rem', fontSize: '.875rem', lineHeight: 1.65,
                      color: 'var(--color-text, #B9C0C8)' }}>
            Usamos cookies propias y de terceros conforme a nuestro{' '}
            <Link href="/privacidad" style={{ color: 'var(--color-accent, #2F80ED)', textDecoration: 'none' }}>
              Aviso de Privacidad
            </Link>{' '}
            y la <strong style={{ color: 'var(--color-heading, #F4F6F8)' }}>LFPDPPP 2025</strong>.
            Las esenciales no pueden desactivarse; el resto solo se cargarán con tu consentimiento.
          </p>

          {/* ── Panel de toggles (expandible) ─────────────────────────── */}
          {showDetails && (
            <div style={{
              borderTop: '1px solid var(--color-border, rgba(255,255,255,0.08))',
              paddingTop: '1rem', marginBottom: '1.1rem',
              animation: 'cookieBannerIn .28s ease both',
            }}>
              <CategoryToggle
                id="essential"
                label="Esenciales"
                description="Sesión, seguridad y preferencias básicas. Siempre activas."
                checked={true}
                disabled
                onChange={() => {}}
              />
              <CategoryToggle
                id="preferences"
                label="Preferencias"
                description="Recuerdan tu tema y configuración visual."
                checked={prefs.preferences}
                onChange={(v) => setPrefs((p) => ({ ...p, preferences: v }))}
              />
              <CategoryToggle
                id="analytics"
                label="Analíticas"
                description="Nos ayudan a mejorar el sitio (Google Analytics, Vercel). Datos anónimos."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <CategoryToggle
                id="marketing"
                label="Marketing"
                description="Permiten mostrar anuncios relevantes en redes sociales."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>
          )}

          {/* ── Acciones ───────────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.625rem', alignItems: 'center' }}>
            <button className="cookie-btn-primary"
              onClick={() => dismiss({ preferences: true, analytics: true, marketing: true })}>
              Aceptar todas
            </button>
            <button className="cookie-btn-secondary"
              onClick={() => dismiss({ preferences: false, analytics: false, marketing: false })}>
              Solo esenciales
            </button>
            {showDetails
              ? <button className="cookie-btn-ghost" onClick={() => dismiss(prefs)}>Guardar selección</button>
              : <button className="cookie-btn-ghost" onClick={() => setShowDetails(true)}>Configurar</button>
            }
            <span style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/privacidad" style={{ color: 'var(--color-accent, #2F80ED)', fontSize: '.8rem', textDecoration: 'none' }}>
                Aviso de Privacidad
              </Link>
              <Link href="/cookies" style={{ color: 'var(--color-accent, #2F80ED)', fontSize: '.8rem', textDecoration: 'none' }}>
                Política de Cookies
              </Link>
            </span>
          </div>

        </div>
      </div>
    </>
  )
}

// ── Toggle de categoría ───────────────────────────────────────────────────────

function CategoryToggle({
  id, label, description, checked, disabled, onChange,
}: {
  id: string; label: string; description: string
  checked: boolean; disabled?: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      padding: '.75rem 0',
      borderBottom: '1px solid var(--color-border, rgba(255,255,255,0.06))',
      gap: '1rem',
    }}>
      <div>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '.875rem',
                    color: 'var(--color-heading, #F4F6F8)' }}>{label}</p>
        <p style={{ margin: '.2rem 0 0', fontSize: '.8rem', lineHeight: 1.5,
                    color: 'var(--color-text, #B9C0C8)' }}>{description}</p>
      </div>

      {/* Toggle switch */}
      <label htmlFor={id} style={{
        position: 'relative', display: 'inline-block',
        width: '44px', height: '24px', flexShrink: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? .55 : 1,
      }}>
        <input
          id={id} type="checkbox"
          checked={checked} disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
        />
        {/* Track */}
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '24px',
          background: checked
            ? 'var(--color-accent, #2F80ED)'
            : 'var(--color-border, rgba(185,192,200,0.2))',
          transition: 'background .22s ease',
        }} />
        {/* Thumb */}
        <span style={{
          position: 'absolute', top: '3px',
          left: checked ? '23px' : '3px',
          width: '18px', height: '18px',
          background: '#fff', borderRadius: '50%',
          boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
          transition: 'left .22s cubic-bezier(0.32,0.72,0,1)',
        }} />
      </label>
    </div>
  )
}