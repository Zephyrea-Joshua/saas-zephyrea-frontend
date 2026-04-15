'use client'

import type { FC } from 'react'
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '@/components/ui/scroll-infinite'
import { cn } from '@/lib/utils'

// —— Marcas SVG neutras (geométricas, estilo “logo de empresa” sin marcas registradas) ——

const LogoMesh: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 88 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('shrink-0 text-zinc-900 drop-shadow-sm drop-shadow-black/10', className)}
    aria-hidden
  >
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.75" />
    <circle cx="44" cy="10" r="4" stroke="currentColor" strokeWidth="1.75" />
    <circle cx="72" cy="18" r="4" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M20 16 L40 12 M48 12 L68 17 M20 16 L40 20 M48 20 L68 17"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      opacity={0.88}
    />
  </svg>
)

const LogoStack: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 72 32"
    fill="none"
    className={cn('shrink-0 text-zinc-900 drop-shadow-sm drop-shadow-black/10', className)}
    aria-hidden
  >
    <rect x="8" y="6" width="56" height="6" rx="2" stroke="currentColor" strokeWidth="1.7" />
    <rect x="12" y="13" width="48" height="6" rx="2" stroke="currentColor" strokeWidth="1.7" opacity={0.85} />
    <rect x="16" y="20" width="40" height="6" rx="2" stroke="currentColor" strokeWidth="1.7" opacity={0.65} />
  </svg>
)

const LogoOrbit: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 64 32"
    fill="none"
    className={cn('shrink-0 text-zinc-900 drop-shadow-sm drop-shadow-black/10', className)}
    aria-hidden
  >
    <circle cx="32" cy="16" r="11" stroke="currentColor" strokeWidth="1.65" opacity={0.85} />
    <circle cx="32" cy="16" r="3" fill="currentColor" opacity={0.9} />
    <circle cx="46" cy="10" r="2.5" fill="currentColor" opacity={0.45} />
  </svg>
)

const LogoShield: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 56 32"
    fill="none"
    className={cn('shrink-0 text-zinc-900 drop-shadow-sm drop-shadow-black/10', className)}
    aria-hidden
  >
    <path
      d="M28 6 L42 10 V18 C42 24 28 28 28 28 C28 28 14 24 14 18 V10 L28 6Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M22 16 L26 20 L34 12" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LogoSpark: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 48 32"
    fill="none"
    className={cn('shrink-0 text-sky-700 drop-shadow-sm drop-shadow-sky-900/15', className)}
    aria-hidden
  >
    <path
      d="M24 5 L26.5 13 L35 14 L27 18.5 L29.5 27 L24 22 L18.5 27 L21 18.5 L13 14 L21.5 13 L24 5Z"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity={0.12}
    />
  </svg>
)

const LogoGlobe: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 64 32"
    fill="none"
    className={cn('shrink-0 text-zinc-900 drop-shadow-sm drop-shadow-black/10', className)}
    aria-hidden
  >
    <circle cx="32" cy="16" r="12" stroke="currentColor" strokeWidth="1.65" />
    <path
      d="M20 16 H44 M32 6 C26 12 26 20 32 26 C38 20 38 12 32 6"
      stroke="currentColor"
      strokeWidth="1.45"
      opacity={0.82}
    />
  </svg>
)

// —— Segmentos: palabras + marcas intercaladas ——

type Segment =
  | { kind: 'text'; label: string; tone?: 'hero' | 'muted' }
  | { kind: 'mark'; Mark: FC<{ className?: string }> }

const ROW_TRUST: Segment[] = [
  { kind: 'text', label: 'Equipos de', tone: 'muted' },
  { kind: 'text', label: 'RH', tone: 'hero' },
  { kind: 'mark', Mark: LogoMesh },
  { kind: 'text', label: 'Retail', tone: 'hero' },
  { kind: 'mark', Mark: LogoStack },
  { kind: 'text', label: 'Manufactura', tone: 'hero' },
  { kind: 'mark', Mark: LogoOrbit },
  { kind: 'text', label: 'Servicios', tone: 'hero' },
  { kind: 'mark', Mark: LogoGlobe },
  { kind: 'text', label: 'Nearshoring', tone: 'hero' },
]

const ROW_PRODUCT: Segment[] = [
  { kind: 'text', label: 'AetherCore', tone: 'hero' },
  { kind: 'mark', Mark: LogoSpark },
  { kind: 'text', label: 'Vacantes', tone: 'hero' },
  { kind: 'mark', Mark: LogoShield },
  { kind: 'text', label: 'Capacitación', tone: 'hero' },
  { kind: 'text', label: 'Puesto · campaña · normativa', tone: 'muted' },
  { kind: 'mark', Mark: LogoStack },
  { kind: 'text', label: 'Indicadores', tone: 'hero' },
  { kind: 'text', label: 'ZEPHYREA', tone: 'hero' },
]

function MarqueeStrip({
  segments,
  /** Fila sobre hero oscuro: copy e iconos blancos. Fila inferior: negro + degradado azul sobre blanco. */
  variant,
}: {
  segments: readonly Segment[]
  variant: 'onDark' | 'onLight'
}) {
  const onDark = variant === 'onDark'
  const onLight = variant === 'onLight'

  return (
    <div className="inline-flex items-center gap-10 pr-16 sm:gap-12 sm:pr-20 md:gap-16 md:pr-28 lg:gap-20 lg:pr-36">
      {segments.map((seg, i) => {
        if (seg.kind === 'mark') {
          const Mark = seg.Mark
          const isSpark = Mark === LogoSpark
          return (
            <Mark
              key={`m-${i}`}
              className={cn(
                'h-8 w-auto md:h-10',
                onDark && 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]',
                onLight &&
                  !isSpark &&
                  'text-zinc-900 drop-shadow-sm drop-shadow-black/10',
                onLight &&
                  isSpark &&
                  'text-sky-700 drop-shadow-sm drop-shadow-sky-900/20',
              )}
            />
          )
        }

        const isHero = seg.tone !== 'muted'
        return (
          <span
            key={`t-${i}-${seg.label}`}
            className={cn(
              'inline-block font-[family-name:var(--font-trust-marquee)] leading-[1.05] tracking-tight',
              isHero
                ? onDark
                  ? [
                      'text-[clamp(1.85rem,4.8vw,3.35rem)] font-extrabold text-white',
                      'drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)]',
                    ]
                  : [
                      'text-[clamp(1.85rem,4.8vw,3.35rem)] font-extrabold',
                      'bg-linear-to-br from-zinc-950 via-blue-800 to-sky-500 bg-clip-text text-transparent',
                      '[-webkit-background-clip:text] [background-clip:text] [-webkit-text-fill-color:transparent]',
                    ]
                : [
                    'text-[clamp(0.8rem,1.85vw,1.15rem)] font-semibold uppercase leading-none tracking-[0.12em]',
                    onDark ? 'text-white/55' : 'text-zinc-600',
                  ],
            )}
          >
            {seg.label}
          </span>
        )
      })}
    </div>
  )
}

/**
 * Dos filas: arriba (onDark) blanco sobre hero negro; abajo (onLight) negro + degradado azul sobre velo blanco.
 */
export function HeroServicesMarquee() {
  return (
    <section
      className="relative z-[5] isolate w-full overflow-hidden bg-transparent pb-8 pt-10 md:pb-12 md:pt-14"
      aria-labelledby="services-marquee-heading"
    >
      <h2 id="services-marquee-heading" className="sr-only">
        Sectores y capacidades de la plataforma
      </h2>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(42vh,20rem)] bg-gradient-to-t from-white from-0% via-50% via-white/55 to-transparent to-100%"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-black/12 to-transparent md:h-20"
      />

      <ScrollVelocityContainer className="relative z-[2] flex flex-col gap-9 px-4 pb-2 pt-1 md:gap-11 md:px-6 lg:gap-12 lg:px-8">
        <ScrollVelocityRow
          baseVelocity={3.2}
          direction={1}
          className="relative isolate bg-transparent py-1 mt-6 md:mt-8"
          scrollReactivity
        >
          <MarqueeStrip segments={ROW_TRUST} variant="onDark" />
        </ScrollVelocityRow>
        <ScrollVelocityRow
          baseVelocity={2.8}
          direction={-1}
          className="relative isolate bg-transparent py-1"
          scrollReactivity
        >
          <MarqueeStrip segments={ROW_PRODUCT} variant="onLight" />
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  )
}
