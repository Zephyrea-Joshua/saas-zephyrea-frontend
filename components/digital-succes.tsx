'use client'
import { useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { AnimatedButton } from '@/components/ui/animated-button'
import { TimelineAnimation } from '@/components/ui/timeline-animation'
import { ZephyreaNavbar } from '@/components/zephyrea-navbar'

/** Stagger mínimo + `instantInView` evita esperar al IntersectionObserver tras hidratar. */
const HERO_MOTION = {
  delayStep: 0.05,
  duration: 0.28,
  instantInView: true,
} as const

const HERO_FEATURE_PILLS = [
  {
    title: 'Vacantes',
    description:
      'Sigue cada candidato, ve en qué etapa va y qué sigue, sin perder ningún detalle.',
  },
  {
    title: 'Formación',
    description:
      'Asigna cursos y comunica avisos al equipo, con seguimiento real sin cadenas de correo.',
  },
  {
    title: 'Indicadores',
    description:
      'Métricas que importan, en tiempo real: datos claros sin hojas de cálculo complicadas.',
  },
  {
    title: 'Registro',
    description:
      'Evidencias organizadas con fecha y responsable, siempre listas para cualquier auditoría.',
  },
] as const

export const HeroDigitalSuccess = () => {
  const timelineRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="producto"
      ref={timelineRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-transparent pt-[4.5rem] text-white md:pt-20 scroll-mt-24"
    >
      {/* Resplandor azul radial detrás del copy (referencia visual) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] z-[1] h-[min(75vh,560px)] w-[min(100vw,920px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(56,189,248,0.38)_0%,rgba(37,99,235,0.14)_42%,transparent_70%)] blur-2xl md:top-[40%]"
        aria-hidden
      />

      <ZephyreaNavbar timelineRef={timelineRef} />

      <div className="relative z-10 flex grow flex-col justify-center px-6 pb-8 pt-8 md:px-16 lg:px-24">
        <TimelineAnimation
          once={true}
          as="h1"
          animationNum={0}
          {...HERO_MOTION}
          timelineRef={timelineRef}
          className="max-w-[min(100%,1400px)] pb-7 text-[clamp(3rem,11.5vw,7rem)] font-bold leading-[0.98] tracking-[-0.02em] text-sky-300 drop-shadow-[0_0_60px_rgba(56,189,248,0.35)] md:pb-9"
        >
          AetherCore
        </TimelineAnimation>

        <TimelineAnimation
          once={true}
          as="p"
          animationNum={1}
          {...HERO_MOTION}
          timelineRef={timelineRef}
          className="max-w-5xl pb-10 text-[clamp(1.25rem,4.2vw,2.125rem)] font-normal leading-snug text-white md:pb-12 md:leading-[1.38]"
        >
          <span className="font-extrabold text-white">
            Reclutamiento, capacitación y RH
          </span>{' '}
            —todo desde un solo sistema: contratación transparente, aprendizaje continuo 
            y flujos de trabajo automatizados con criterios definidos.
        </TimelineAnimation>

        <div className="flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <TimelineAnimation
            once={true}
            as="div"
            animationNum={2}
            {...HERO_MOTION}
            timelineRef={timelineRef}
            className="flex flex-shrink-0 flex-wrap items-center gap-3 md:gap-4"
          >
            <AnimatedButton
              type="button"
              variant="default"
              size="lg"
              rounded="full"
              className="shadow-[0_0_40px_rgba(56,189,248,0.12)]"
            >
              <span className="flex items-center gap-3">
                <MessageCircle
                  className="h-6 w-6 shrink-0 text-sky-600"
                  aria-hidden
                  strokeWidth={2}
                />
                Solicita una Demo
              </span>
            </AnimatedButton>
            <AnimatedButton
              type="button"
              variant="outline"
              size="lg"
              rounded="full"
              className="text-white"
            >
              Ver cómo funciona
            </AnimatedButton>
          </TimelineAnimation>

          <TimelineAnimation
            once={true}
            as="p"
            animationNum={3}
            {...HERO_MOTION}
            timelineRef={timelineRef}
            className="max-w-md flex-1 text-sm leading-relaxed text-white/95 md:text-base md:leading-relaxed lg:pt-0.5"
          >
            Centraliza toda la operación de tu equipo en un solo lugar: olvídate de correos interminables y documentos perdidos. Con un Equipo conciente de que hacer.
          </TimelineAnimation>
        </div>
      </div>

      {/* Footer info: misma estructura que la plantilla (abajo a la derecha), copy AetherOZ */}
      <div
        id="caracteristicas"
        className="relative z-10 flex flex-wrap items-end justify-end p-6 md:p-12 scroll-mt-24"
      >
        <h2 className="sr-only">Funciones principales</h2>
        <TimelineAnimation
          once={true}
          animationNum={4}
          {...HERO_MOTION}
          timelineRef={timelineRef}
          className="grid w-full max-w-4xl grid-cols-2 gap-x-8 gap-y-4 rounded-lg bg-black/20 p-4 backdrop-blur-lg sm:max-w-5xl md:grid-cols-4 md:gap-x-12"
        >
          {HERO_FEATURE_PILLS.map((item) => (
            <div key={item.title}>
              <p className="mb-1 text-sm text-white">{item.title}</p>
              <p className="text-xs text-neutral-300">{item.description}</p>
            </div>
          ))}
        </TimelineAnimation>
      </div>
    </section>
  )
}
