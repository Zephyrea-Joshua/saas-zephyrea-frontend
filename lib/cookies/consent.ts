// lib/cookies/consent.ts
// Sistema de consentimiento LFPDPPP 2025 — 6 categorías granulares

export const CONSENT_KEY     = 'aethercore_consent'
export const CONSENT_VERSION = '1.0'  // ← incrementar si cambia la política

// ─── Types ────────────────────────────────────────────────────────────────────

export type ConsentCategory =
  | 'essential'
  | 'analytics'
  | 'performance'
  | 'functional'
  | 'marketing'
  | 'personalization'

export type ConsentPreferences = {
  essential:       true
  analytics:       boolean
  performance:     boolean
  functional:      boolean
  marketing:       boolean
  personalization: boolean
}

export type ConsentRecord = ConsentPreferences & {
  timestamp: string
  version:   string
}

export type MutablePrefs = Omit<ConsentPreferences, 'essential'>

// ─── Storage ─────────────────────────────────────────────────────────────────

export function getStoredConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    // Versión diferente → consentimiento caducado, pedir de nuevo
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function saveConsent(prefs: MutablePrefs): ConsentRecord {
  const record: ConsentRecord = {
    essential:       true,
    ...prefs,
    timestamp: new Date().toISOString(),
    version:   CONSENT_VERSION,
  }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record))

  const allAccepted  = Object.values(prefs).every(Boolean)
  const allRejected  = Object.values(prefs).every((v) => !v)
  const specificEvent = allAccepted ? 'cookie:accepted' : allRejected ? 'cookie:rejected' : 'cookie:updated'

  window.dispatchEvent(new CustomEvent(specificEvent,        { detail: record }))
  window.dispatchEvent(new CustomEvent('cookieConsentUpdate', { detail: record }))

  return record
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CONSENT_KEY)
}

// Reabre el banner sin recargar la página
export function openCookieBanner(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('cookie:reopen'))
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const ACCEPT_ALL: MutablePrefs = {
  analytics:       true,
  performance:     true,
  functional:      true,
  marketing:       true,
  personalization: true,
}

export const REJECT_ALL: MutablePrefs = {
  analytics:       false,
  performance:     false,
  functional:      false,
  marketing:       false,
  personalization: false,
}
