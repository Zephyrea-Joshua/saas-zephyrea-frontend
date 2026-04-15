'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useLenisScrollTo } from '@/components/lenis-provider'

type Section = { id: string; label: string }

export function LegalSidebar({ sections }: { sections: Section[] }) {
  const scrollToId = useLenisScrollTo()
  const [activeIndex, setActiveIndex] = useState(0)
  const [dotY,        setDotY]        = useState(0)
  const [lineH,       setLineH]       = useState(0)

  const navRef   = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Measure the position of the active item inside the nav container
  const measure = useCallback((index: number) => {
    const container = navRef.current
    const item      = itemRefs.current[index]
    if (!container || !item) return

    const cRect = container.getBoundingClientRect()
    const iRect = item.getBoundingClientRect()
    const center = iRect.top - cRect.top + iRect.height / 2

    setDotY(center)
    setLineH(center)
  }, [])

  /**
   * Scroll espía por posición (no solo IntersectionObserver): secciones cortas o fin de página
   * activan bien el último ítem del menú y el scroll táctil recorre todo el documento.
   */
  useEffect(() => {
    const updateActive = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const doc = document.documentElement
      const maxScroll = Math.max(0, doc.scrollHeight - vh)

      if (maxScroll > 0 && scrollY >= maxScroll - 6) {
        setActiveIndex(sections.length - 1)
        return
      }

      const boundary = scrollY + Math.min(152, vh * 0.2)
      let active = 0
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + scrollY
        if (top <= boundary) active = i
      }
      setActiveIndex(active)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [sections])

  // Re-measure whenever active index changes or window resizes
  useEffect(() => {
    measure(activeIndex)
    const onResize = () => measure(activeIndex)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeIndex, measure])

  return (
    <div ref={navRef} className="relative">

      {/* ── Track line (full height) ───────────────────────────────────── */}
      <div className="absolute left-[9px] top-0 bottom-0 w-px bg-white/[0.07]" />

      {/* ── Progress line (fills down to active section) ──────────────── */}
      <motion.div
        className="absolute left-[9px] top-0 w-px origin-top rounded-full bg-gradient-to-b from-sky-400 to-sky-500/60"
        animate={{ height: lineH }}
        transition={{ type: 'spring', damping: 32, stiffness: 280, mass: 0.8 }}
      />

      {/* ── Animated dot ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute left-[4px] z-10 flex items-center justify-center"
        animate={{ top: dotY - 6 }}
        transition={{ type: 'spring', damping: 32, stiffness: 280, mass: 0.8 }}
      >
        {/* Glow ring */}
        <span className="absolute size-5 rounded-full bg-sky-400/15 blur-[3px]" />
        {/* Dot */}
        <span className="relative size-[11px] rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]" />
      </motion.div>

      {/* ── Nav items ─────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        {sections.map((s, i) => (
          <a
            key={s.id}
            ref={(el) => { itemRefs.current[i] = el }}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToId(s.id)
            }}
            className={cn(
              'relative py-[9px] pl-7 pr-2 text-sm transition-all duration-200',
              i === activeIndex
                ? 'font-semibold text-white'
                : 'text-white/40 hover:text-white/70',
            )}
          >
            {/* Static dot for inactive items */}
            {i !== activeIndex && (
              <span
                className={cn(
                  'absolute left-[7px] top-1/2 -translate-y-1/2 size-[5px] rounded-full transition-colors duration-200',
                  i < activeIndex ? 'bg-sky-500/50' : 'bg-white/15',
                )}
              />
            )}
            {s.label}
          </a>
        ))}
      </div>

    </div>
  )
}
