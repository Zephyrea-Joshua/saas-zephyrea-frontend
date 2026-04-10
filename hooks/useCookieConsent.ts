'use client'
import { useState, useEffect } from 'react'
import { type ConsentRecord, getStoredConsent } from '@/lib/cookies/consent'

export function useCookieConsent(): ConsentRecord | null {
  const [consent, setConsent] = useState<ConsentRecord | null>(null)

  useEffect(() => {
    setConsent(getStoredConsent())

    const handler = (e: Event) =>
      setConsent((e as CustomEvent<ConsentRecord>).detail)

    window.addEventListener('cookieConsentUpdate', handler)
    return () => window.removeEventListener('cookieConsentUpdate', handler)
  }, [])

  return consent
}
