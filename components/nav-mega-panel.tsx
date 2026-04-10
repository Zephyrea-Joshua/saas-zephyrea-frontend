import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BookOpen,
  Briefcase,
  Building2,
  FileCheck,
  GraduationCap,
  Handshake,
  Layers,
  LifeBuoy,
  LineChart,
  Newspaper,
  Shield,
  Sparkles,
  Store,
  Users,
} from 'lucide-react'

import {
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import type { SaasNavItem } from '@/components/zephyrea-nav-data'
import { cn } from '@/lib/utils'

function iconForNavTitle(title: string): LucideIcon {
  const t = title.toLowerCase()
  if (t.includes('vacante') || t.includes('reclutamiento')) return Briefcase
  if (t.includes('formación') || t.includes('capacit')) return GraduationCap
  if (t.includes('indicador') || t.includes('reporte')) return LineChart
  if (t.includes('registro') || t.includes('cumplimiento')) return FileCheck
  if (t.includes('plataforma') || t.includes('unific')) return Layers
  if (t.includes('seguridad') || t.includes('permiso')) return Shield
  if (/equipos\s+de\s+rh|rr\.\s*hh/.test(t)) return Users
  if (t.includes('operaciones') || t.includes('retail')) return Store
  if (t.includes('servicios') || t.includes('consultor')) return Handshake
  if (t.includes('multi') || t.includes('franquicia') || t.includes('sede'))
    return Building2
  if (t.includes('ayuda')) return LifeBuoy
  if (t.includes('guía') || t.includes('inicio')) return BookOpen
  if (t.includes('blog') || t.includes('novedad')) return Newspaper
  if (t.includes('estado')) return Activity
  return Sparkles
}

const linkCardClass = cn(
  'group/navmega flex w-full min-w-0 gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] p-3 text-left no-underline outline-none transition-all',
  'hover:border-sky-400/35 hover:bg-sky-500/[0.12] focus-visible:ring-2 focus-visible:ring-sky-400/40',
  'data-active:border-sky-400/30 data-active:bg-white/[0.06]'
)

export type NavMegaPanelProps = {
  items: SaasNavItem[]
  asideEyebrow: string
  asideTitle: string
  asideDescription: string
}

export function NavMegaPanel({
  items,
  asideEyebrow,
  asideTitle,
  asideDescription,
}: NavMegaPanelProps) {
  return (
    <div className="flex w-full min-w-0 max-w-full flex-col rounded-xl sm:max-h-[min(78vh,620px)] sm:flex-row sm:overflow-hidden md:max-h-[min(82vh,680px)]">
      <div
        className={cn(
          'min-h-0 min-w-0 flex-1 basis-0 overscroll-contain p-3 sm:p-4',
          'overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable]',
          '[scrollbar-width:thin]'
        )}
      >
        <div className="grid w-full min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
          {items.map((item) => {
            const Icon = iconForNavTitle(item.title)
            return (
              <NavigationMenuLink
                key={item.title}
                href={item.href}
                className={linkCardClass}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20 transition-colors group-hover/navmega:bg-sky-400/20 group-hover/navmega:text-sky-200"
                  aria-hidden
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex flex-col gap-1">
                  <span className="text-sm font-semibold leading-tight text-white">
                    {item.title}
                  </span>
                  <span className="line-clamp-3 text-sm leading-snug text-zinc-400 group-hover/navmega:text-zinc-300">
                    {item.description}
                  </span>
                </span>
              </NavigationMenuLink>
            )
          })}
        </div>
      </div>

      <aside className="relative flex min-h-0 w-full shrink-0 flex-col justify-center overflow-hidden border-t border-white/10 bg-gradient-to-br from-sky-500/[0.12] via-zinc-950 to-violet-950/30 p-4 sm:w-[min(34%,14rem)] sm:border-l sm:border-t-0 sm:p-0 sm:py-6 md:w-[15rem] lg:w-[16rem] lg:py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 90% 70% at 100% 0%, rgba(56,189,248,0.22), transparent 58%)',
          }}
          aria-hidden
        />
        <div className="relative z-[1] flex flex-col gap-3 p-5 lg:py-6 lg:pl-5 lg:pr-4">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-300/90">
            {asideEyebrow}
          </span>
          <p className="text-base font-semibold leading-snug text-white">
            {asideTitle}
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">{asideDescription}</p>
        </div>
      </aside>
    </div>
  )
}
