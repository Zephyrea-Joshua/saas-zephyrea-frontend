'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Lenis smooth-scroll provider.
 *
 * - smoothTouch: false  → deja el scroll nativo en móvil intacto (sin conflicto
 *   con el MotionDrawer que hace su propio scroll-lock en mobile).
 * - El RAF loop usa cancelAnimationFrame en el cleanup para no dejar timers huérfanos.
 * - Lenis se adjunta al html element globalmente, sin importar dónde esté este
 *   componente en el árbol de React.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0, // sin smooth touch — móvil usa scroll nativo
    })

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
