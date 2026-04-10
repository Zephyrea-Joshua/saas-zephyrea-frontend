import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LegalSidebar } from './LegalSidebar'
import { LegalShaderBackground } from './LegalShaderBackground'

// ─── Page shell ───────────────────────────────────────────────────────────────

export function LegalLayout({
  badge,
  title,
  updated,
  sections,
  children,
}: {
  badge: string
  title: string
  updated: string
  sections: { id: string; label: string }[]
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Shader propio de páginas legales */}
      <LegalShaderBackground />
      {/* Overlay oscuro para legibilidad del texto blanco */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] bg-black/62" />
      {/* Contenido por encima del shader y el overlay */}
      <div className="relative z-[3] min-h-screen w-full">

      {/* ── Hero header ───────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.07] bg-white/[0.025] px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white/90"
          >
            <span className="text-base leading-none">←</span>
            Volver al inicio
          </Link>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sky-400">
            {badge}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-base text-white/55">
            Última actualización: {updated}
          </p>
        </div>
      </div>

      {/* ── Body: sidebar + content ────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12 lg:px-20">
        <div className="flex gap-16 lg:gap-24">

          {/* Animated timeline sidebar */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <div className="sticky top-12">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
                Contenido
              </p>
              <LegalSidebar sections={sections} />
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">
            <div className="flex flex-col gap-16">
              {children}
            </div>
          </main>

        </div>
      </div>
      </div>{/* z-[3] content wrapper */}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      <div className="flex flex-col gap-5 text-[15px] leading-[1.75] text-white/85">
        {children}
      </div>
    </section>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────

export function LegalTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.10]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.10] bg-white/[0.05]">
            {headers.map((h) => (
              <th
                key={h}
                className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/60"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/[0.06] last:border-0 transition-colors hover:bg-white/[0.03]"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    'px-5 py-4',
                    j === 0
                      ? 'font-mono text-xs text-sky-300'
                      : 'text-white/85',
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Cards ────────────────────────────────────────────────────────────────────

export function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-sky-400/25 bg-sky-400/[0.06] px-6 py-5 text-white/85">
      {children}
    </div>
  )
}

export function WarnCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] px-6 py-5 text-white/80">
      {children}
    </div>
  )
}
