'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  Users,
  GraduationCap,
  BarChart3,
  ClipboardCheck,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Building2,
  Zap,
  ShieldCheck,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PIPELINE_STAGES = [
  { label: 'Aplicó', count: 12, bar: 'bg-sky-400' },
  { label: 'Revisión', count: 7, bar: 'bg-indigo-400' },
  { label: 'Entrevista', count: 4, bar: 'bg-violet-400' },
  { label: 'Oferta', count: 2, bar: 'bg-emerald-400' },
]

const COURSES = [
  { title: 'Inducción corporativa', progress: 100, done: true },
  { title: 'Cumplimiento NOM-035', progress: 68, done: false },
  { title: 'Liderazgo efectivo', progress: 32, done: false },
]

const KPIS = [
  {
    label: 'Tiempo de contratación',
    value: '18 días',
    trend: -23,
    up: false,
    color: 'text-sky-400',
  },
  {
    label: 'Retención a 90 días',
    value: '94%',
    trend: +8,
    up: true,
    color: 'text-emerald-400',
  },
  {
    label: 'Cursos completados',
    value: '1,247',
    trend: +41,
    up: true,
    color: 'text-violet-400',
  },
]

const AUDIT_LOG = [
  {
    initials: 'MG',
    user: 'M. González',
    action: 'Firmó contrato de incorporación',
    time: 'Hace 2 min',
  },
  {
    initials: 'LR',
    user: 'L. Ramírez',
    action: 'Completó NOM-035 — 100 %',
    time: 'Hace 15 min',
  },
  {
    initials: 'AD',
    user: 'Admin',
    action: 'Publicó vacante: Desarrollador Sr.',
    time: 'Hace 1 h',
  },
  {
    initials: 'CM',
    user: 'C. Morales',
    action: 'Subió comprobante de capacitación',
    time: 'Hace 3 h',
  },
]

const STATS = [
  { value: '300+', label: 'Empresas activas', Icon: Building2 },
  { value: '85%', label: 'Menos tiempo en reclutamiento', Icon: Zap },
  { value: '12 k+', label: 'Colaboradores gestionados', Icon: Users },
  { value: '99.9%', label: 'Disponibilidad garantizada', Icon: ShieldCheck },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function FeaturesAetherCore() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[oklch(0.08_0.01_260)] py-28 scroll-mt-24"
    >
      {/* Ambient blue glow — matches the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[1100px] bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(37,99,235,0.11)_0%,transparent_70%)] blur-3xl"
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
            Funcionalidades
          </p>
          <h2 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white">
            Todo lo que tu equipo de RH necesita,{' '}
            <br className="hidden sm:block" />
            en un solo lugar
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            AetherCore centraliza reclutamiento, formación y trámites para que
            puedas enfocarte en tu gente, no en el papeleo.
          </p>
        </motion.div>

        {/* ── Bento grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-4">

          {/* ── CARD: Vacantes (wide) ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease }}
            className="col-span-12 lg:col-span-7 group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            {/* hover glow */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(56,189,248,0.07)_0%,transparent_70%)]"
            />

            <div className="relative z-10">
              <Pill color="sky" icon={<Users className="h-4 w-4 text-sky-400" />} label="Vacantes" />
              <h3 className="mb-2 mt-4 text-xl font-semibold text-white">Pipeline sin fricción</h3>
              <p className="mb-7 max-w-sm text-sm text-white/50">
                Sigue cada candidato, ve en qué etapa va y qué sigue, sin perder ningún detalle.
              </p>

              {/* Kanban mini */}
              <div className="grid grid-cols-4 gap-2">
                {PIPELINE_STAGES.map((stage, i) => (
                  <motion.div
                    key={stage.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.1, duration: 0.45, ease }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-3"
                  >
                    <div className={`mb-2 h-0.5 w-8 rounded-full ${stage.bar}`} />
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-white/40">
                      {stage.label}
                    </p>
                    <p className="text-2xl font-bold text-white">{stage.count}</p>

                    {/* avatar stack */}
                    <div className="mt-2 flex -space-x-1.5">
                      {Array.from({ length: Math.min(stage.count, 3) }).map((_, j) => (
                        <div
                          key={j}
                          className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-sky-400 to-indigo-500 text-[8px] font-bold text-white"
                        >
                          {String.fromCharCode(65 + ((i * 3 + j) % 26))}
                        </div>
                      ))}
                      {stage.count > 3 && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[8px] text-white/60">
                          +{stage.count - 3}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── CARD: Formación ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.2, duration: 0.65, ease }}
            className="col-span-12 sm:col-span-6 lg:col-span-5 group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(99,102,241,0.08)_0%,transparent_70%)]"
            />

            <div className="relative z-10">
              <Pill
                color="indigo"
                icon={<GraduationCap className="h-4 w-4 text-indigo-400" />}
                label="Formación"
              />
              <h3 className="mb-2 mt-4 text-xl font-semibold text-white">Capacitación continua</h3>
              <p className="mb-6 text-sm text-white/50">
                Asigna cursos y comunica avisos al equipo, con seguimiento sin cadenas de correo.
              </p>

              <div className="space-y-3">
                {COURSES.map((course, i) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.65 + i * 0.12, duration: 0.45, ease }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-3"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <p className="text-xs font-medium leading-snug text-white/80">
                        {course.title}
                      </p>
                      {course.done ? (
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      ) : (
                        <span className="shrink-0 text-[10px] text-white/40">{course.progress}%</span>
                      )}
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className={`h-full rounded-full ${course.done ? 'bg-emerald-400' : 'bg-indigo-400'}`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${course.progress}%` } : {}}
                        transition={{ delay: 0.85 + i * 0.12, duration: 0.9, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── CARD: Indicadores ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.28, duration: 0.65, ease }}
            className="col-span-12 sm:col-span-6 lg:col-span-5 group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_60%_50%_at_30%_70%,rgba(139,92,246,0.08)_0%,transparent_70%)]"
            />

            <div className="relative z-10">
              <Pill
                color="violet"
                icon={<BarChart3 className="h-4 w-4 text-violet-400" />}
                label="Indicadores"
              />
              <h3 className="mb-2 mt-4 text-xl font-semibold text-white">Métricas que importan</h3>
              <p className="mb-6 text-sm text-white/50">
                Datos claros en tiempo real, sin hojas de cálculo complicadas.
              </p>

              <div className="space-y-3">
                {KPIS.map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.4, ease }}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 py-2.5"
                  >
                    <p className="max-w-[55%] text-[11px] leading-snug text-white/50">{kpi.label}</p>
                    <div className="text-right">
                      <p className={`text-base font-bold ${kpi.color}`}>{kpi.value}</p>
                      <div
                        className={`flex items-center justify-end gap-0.5 text-[10px] font-medium ${kpi.up ? 'text-emerald-400' : 'text-red-400'}`}
                      >
                        {kpi.up ? (
                          <TrendingUp className="h-2.5 w-2.5" />
                        ) : (
                          <TrendingDown className="h-2.5 w-2.5" />
                        )}
                        {Math.abs(kpi.trend)}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── CARD: Registro (wide) ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.36, duration: 0.65, ease }}
            className="col-span-12 lg:col-span-7 group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,rgba(16,185,129,0.06)_0%,transparent_70%)]"
            />

            <div className="relative z-10">
              <Pill
                color="emerald"
                icon={<ClipboardCheck className="h-4 w-4 text-emerald-400" />}
                label="Registro"
              />
              <h3 className="mb-2 mt-4 text-xl font-semibold text-white">Auditoría lista siempre</h3>
              <p className="mb-6 text-sm text-white/50">
                Evidencias organizadas con fecha y responsable, listas para cualquier auditoría.
              </p>

              <div className="space-y-2">
                {AUDIT_LOG.map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.65 + i * 0.1, duration: 0.45, ease }}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 py-2.5"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-emerald-400/20 to-sky-400/20 text-[9px] font-bold text-white">
                      {entry.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium leading-snug text-white/80">
                        {entry.action}
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/30">
                        {entry.user} · {entry.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Stats strip ─────────────────────────────────────────────────── */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map(({ value, label, Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.55, ease }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-6 text-center"
            >
              <Icon className="mx-auto mb-3 h-5 w-5 text-sky-400/60" />
              <p className="text-[1.6rem] font-bold leading-none text-white">{value}</p>
              <p className="mt-2 text-xs text-white/40">{label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Small helper: feature pill badge ─────────────────────────────────────────

type PillColor = 'sky' | 'indigo' | 'violet' | 'emerald'

const pillStyles: Record<PillColor, string> = {
  sky: 'bg-sky-500/10 text-sky-300',
  indigo: 'bg-indigo-500/10 text-indigo-300',
  violet: 'bg-violet-500/10 text-violet-300',
  emerald: 'bg-emerald-500/10 text-emerald-300',
}

function Pill({
  color,
  icon,
  label,
}: {
  color: PillColor
  icon: React.ReactNode
  label: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold ${pillStyles[color]}`}
    >
      {icon}
      {label}
    </span>
  )
}
