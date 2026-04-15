'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import Lenis from 'lenis'

/**
 * Lenis smooth-scroll + API para anclajes (#id) compatibles con el scroll suavizado.
 * scrollIntoView() nativo a veces falla o se “pega” cuando Lenis controla el documento.
 */
type LenisScrollContextValue = {
  /** Desplaza hasta el elemento con id; compensa scroll-margin del layout legal. */
  scrollToElementId: (id: string) => void
}

const LenisScrollContext = createContext<LenisScrollContextValue | null>(null)

export function useLenisScrollTo() {
  const ctx = useContext(LenisScrollContext)
  return (
    ctx?.scrollToElementId ??
    ((id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  )
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  const scrollToElementId = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const lenis = lenisRef.current
    /** Alineado con scroll-mt-12 (~48px) + margen para títulos */
    const offset = -72

    if (lenis) {
      lenis.scrollTo(el, {
        offset,
        duration: 1.05,
      })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      /** 0 anulaba el delta táctil: en móvil/tablet el scroll no recorría toda la página. */
      touchMultiplier: 1,
      /** Arrastre táctil nativo alineado con Lenis (páginas largas como /cookies). */
      syncTouch: true,
    })

    lenisRef.current = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const value = useMemo(
    () => ({ scrollToElementId }),
    [scrollToElementId],
  )

  return (
    <LenisScrollContext.Provider value={value}>
      {children}
    </LenisScrollContext.Provider>
  )
}
