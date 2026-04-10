'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'motion/react'
import {
  Users, BarChart3, Settings, Bell,
  Search, TrendingUp, TrendingDown, Clock,
  CheckCircle2, Plus, ChevronRight, UserCheck,
  GraduationCap, ShieldCheck, Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

// ─── Types & Data ─────────────────────────────────────────────────────────────

const MODULES = [
  { id: 'reclutamiento', label: 'Reclutamiento',    Icon: Users          },
  { id: 'formacion',     label: 'Capacitación',     Icon: GraduationCap },
  { id: 'indicadores',   label: 'Recursos Humanos', Icon: BarChart3     },
] as const
type ModuleId = (typeof MODULES)[number]['id']

const SIDEBAR_NAV = [
  { id: 'reclutamiento', label: 'Reclutamiento',    Icon: Users          },
  { id: 'formacion',     label: 'Capacitación',     Icon: GraduationCap },
  { id: 'indicadores',   label: 'Recursos Humanos', Icon: BarChart3     },
]

// Reclutamiento
const PIPELINE = [
  { label: 'Nuevos',     value: 24, max: 24, color: 'bg-zinc-400'    },
  { label: 'Entrevista', value: 14, max: 24, color: 'bg-sky-500'     },
  { label: 'Evaluación', value: 8,  max: 24, color: 'bg-amber-500'   },
  { label: 'Oferta',     value: 4,  max: 24, color: 'bg-emerald-500' },
]
const CANDIDATES = [
  { name: 'María García',  role: 'Dev Backend',     stage: 'Entrevista', days: 2, color: 'from-sky-300 to-blue-400'      },
  { name: 'Luis Torres',   role: 'Frontend React',  stage: 'Evaluación', days: 5, color: 'from-violet-300 to-purple-400' },
  { name: 'Sofía León',    role: 'Project Mgr',     stage: 'Oferta',     days: 8, color: 'from-emerald-300 to-teal-400'  },
  { name: 'Ana Martínez',  role: 'Data Analyst',    stage: 'Nuevos',     days: 1, color: 'from-pink-300 to-rose-400'     },
]

// Capacitación (cursos demo)
const COURSES = [
  { name: 'Seguridad e Higiene Industrial', done: 48, total: 58, color: 'bg-sky-500',     light: 'bg-sky-50 text-sky-700'        },
  { name: 'Inducción Corporativa',          done: 32, total: 32, color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700' },
  { name: 'NOM-035 STPS',                   done: 21, total: 39, color: 'bg-amber-500',   light: 'bg-amber-50 text-amber-700'    },
  { name: 'Servicio al Cliente',            done: 38, total: 48, color: 'bg-violet-500',  light: 'bg-violet-50 text-violet-700'  },
]

// ─── Small helpers ────────────────────────────────────────────────────────────

function Users2Inner({ size = 16, className = '' }: { size?: number; className?: string }) {
  return <Users size={size} className={className} />
}

const SIDEBAR_BOTTOM = [
  { id: 'equipo',  label: 'Equipo',        Icon: Users2Inner },
  { id: 'config',  label: 'Configuración', Icon: Settings    },
]

// ─── Module info cards (left column) ─────────────────────────────────────────

const MODULE_CARDS = [
  {
    id: 'reclutamiento' as ModuleId,
    Icon: Users,
    title: 'Reclutamiento',
    description: 'Publica vacantes y sigue candidatos en un embudo visual. Sin hojas de cálculo, sin correos perdidos.',
    activeBg: 'bg-sky-50',      activeBorder: 'border-sky-200',
    activeIconBg: 'bg-sky-100', activeIconText: 'text-sky-600', activeStat: 'text-sky-600',
    stats: [{ value: '3×', label: 'más rápido' }, { value: '40%', label: 'menos admin' }],
  },
  {
    id: 'formacion' as ModuleId,
    Icon: GraduationCap,
    title: 'Capacitación',
    description: 'Asigna cursos, registra avances y cumple con NOM-035 y STPS sin archivos separados.',
    activeBg: 'bg-violet-50',      activeBorder: 'border-violet-200',
    activeIconBg: 'bg-violet-100', activeIconText: 'text-violet-600', activeStat: 'text-violet-600',
    stats: [{ value: '100%', label: 'trazabilidad' }, { value: 'NOM-035', label: 'cumplimiento' }],
  },
  {
    id: 'indicadores' as ModuleId,
    Icon: BarChart3,
    title: 'Recursos Humanos',
    description: 'Rotación, tiempo de contratación y satisfacción en tiempo real para decidir con datos.',
    activeBg: 'bg-emerald-50',      activeBorder: 'border-emerald-200',
    activeIconBg: 'bg-emerald-100', activeIconText: 'text-emerald-600', activeStat: 'text-emerald-600',
    stats: [{ value: 'Tiempo real', label: 'datos vivos' }, { value: 'Multi-sede', label: 'visibilidad' }],
  },
] as const

// ─── Chart primitives ─────────────────────────────────────────────────────────

/** Animated horizontal progress bar — scaleX from left (GPU-safe, no layout reflow). */
function HBar({ value, max, color, delay }: { value: number; max: number; color: string; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  return (
    <div ref={ref} className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
      <motion.div
        className={cn('h-full rounded-full', color)}
        style={{ width: `${(value / max) * 100}%`, transformOrigin: 'left', willChange: 'transform' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

/** Animated SVG donut — strokeDashoffset (single scalar, compositor-friendly on SVG layer). */
function DonutChart({ pct, color = '#0ea5e9', label }: { pct: number; color?: string; label?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView       = useInView(containerRef, { once: true, margin: '-5%' })
  const R = 15.9155
  const C = 100
  return (
    <div ref={containerRef} className="relative inline-flex items-center justify-center">
      <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
        <circle cx="18" cy="18" r={R} fill="none" stroke="#f1f5f9" strokeWidth="3" />
        <motion.circle
          cx="18" cy="18" r={R} fill="none"
          stroke={color} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: C * (1 - pct / 100) } : { strokeDashoffset: C }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-zinc-900">{pct}%</span>
        {label && <span className="text-[9px] text-zinc-400 font-medium mt-0.5">{label}</span>}
      </div>
    </div>
  )
}

/**
 * Chart.js — tres líneas (Reclutamiento, Capacitación, Recursos Humanos).
 * SSR-safe: todo el trabajo de Chart.js en useEffect (solo cliente).
 */
function MonthlyHiresChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef  = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    Chart.register(
      LineController,
      LineElement,
      PointElement,
      CategoryScale,
      LinearScale,
      Tooltip,
      Legend,
    )

    const labels = ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr']

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Reclutamiento',
            data: [12, 15, 11, 18, 21, 24],
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14, 165, 233, 0.12)',
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 4,
            tension: 0.35,
            fill: false,
          },
          {
            label: 'Capacitación',
            data: [9, 10, 14, 13, 16, 19],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.12)',
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 4,
            tension: 0.35,
            fill: false,
          },
          {
            label: 'Recursos Humanos',
            data: [7, 9, 10, 12, 14, 17],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 4,
            tension: 0.35,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        animation: { duration: 900, easing: 'easeOutQuart' },
        scales: {
          x: {
            grid:   { display: false },
            border: { display: false },
            ticks:  { font: { size: 9, family: 'inherit' }, color: '#94a3b8' },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(148, 163, 184, 0.15)' },
            border: { display: false },
            ticks: {
              font: { size: 8, family: 'inherit' },
              color: '#94a3b8',
              maxTicksLimit: 5,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 8,
              boxHeight: 8,
              padding: 10,
              font: { size: 9, family: 'inherit' },
              color: '#64748b',
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const v = ctx.raw
                const n = typeof v === 'number' ? v : Number(v)
                return `${ctx.dataset.label ?? ''}: ${n} actividades`
              },
            },
          },
        },
      },
    })

    return () => { chartRef.current?.destroy(); chartRef.current = null }
  }, [])

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

// ─── Stage badge ──────────────────────────────────────────────────────────────

function StageBadge({ stage }: { stage: string }) {
  const map: Record<string, string> = {
    Nuevos:     'bg-zinc-100 text-zinc-600',
    Entrevista: 'bg-sky-50 text-sky-700',
    Evaluación: 'bg-amber-50 text-amber-700',
    Oferta:     'bg-emerald-50 text-emerald-700',
  }
  return (
    <span className={cn('text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0', map[stage] ?? 'bg-zinc-100 text-zinc-600')}>
      {stage}
    </span>
  )
}

// ─── Module panels ────────────────────────────────────────────────────────────
//
// KEY: these use @container queries (not viewport breakpoints).
// The tab panel wrapper has `@container`, so panels adapt to their actual
// available width — not the viewport. This prevents the "cramped on laptop"
// issue where lg: fires at 1024px viewport even when the content area is narrow.
//
// @md = container ≥ 448px (kicks in when the module panel has enough room)
// ─────────────────────────────────────────────────────────────────────────────

function ReclutamientoModule() {
  return (
    <div className="flex flex-col @md:flex-row @md:items-stretch gap-4">

      {/* Left col: KPI grid + funnel */}
      <div className="w-full @md:w-[44%] flex flex-col gap-3 shrink-0">

        {/* 2×2 KPI grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: '24',  label: 'Candidatos',    Icon: Users,        cls: 'bg-sky-50 text-sky-600'         },
            { value: '14d', label: 'T. Contrat.',    Icon: Clock,        cls: 'bg-amber-50 text-amber-600'     },
            { value: '3',   label: 'Ofertas env.',   Icon: CheckCircle2, cls: 'bg-emerald-50 text-emerald-600' },
            { value: '+6',  label: 'Esta semana',    Icon: TrendingUp,   cls: 'bg-violet-50 text-violet-600'   },
          ].map(k => (
            <div key={k.label} className="rounded-xl border border-zinc-100 bg-white p-2.5 flex items-center gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <span className={cn('p-1.5 rounded-lg shrink-0', k.cls)}>
                <k.Icon size={11} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-black text-zinc-900 leading-none tabular-nums">{k.value}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5 truncate">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline funnel */}
        <div className="rounded-xl border border-zinc-100 bg-white p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Embudo</p>
          <div className="flex flex-col gap-2.5">
            {PIPELINE.map((s, i) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-zinc-700">{s.label}</span>
                  <span className="text-[11px] font-bold text-zinc-900 tabular-nums">{s.value}</span>
                </div>
                <HBar value={s.value} max={s.max} color={s.color} delay={i * 0.1} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right col: candidate list + conversion card */}
      <div className="flex-1 flex flex-col gap-2.5 min-w-0">

        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Candidatos recientes</p>
          <button className="flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-700 shrink-0">
            <Plus size={10} /> Nueva vacante
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {CANDIDATES.map(c => {
            const initials = c.name.split(' ').map(n => n[0]).join('')
            return (
              <div key={c.name} className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white px-3 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_3px_10px_rgba(0,0,0,0.08)] transition-shadow cursor-pointer group">
                <div className={cn('size-8 rounded-full bg-gradient-to-br flex items-center justify-center text-[10px] font-bold text-white shrink-0', c.color)}>
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-zinc-900 truncate">{c.name}</p>
                  <p className="text-[10px] text-zinc-400 truncate">{c.role}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <StageBadge stage={c.stage} />
                  <span className="hidden @lg:flex items-center gap-0.5 text-[10px] text-zinc-300 tabular-nums">
                    <Clock size={8} />{c.days}d
                  </span>
                  <ChevronRight size={12} className="text-zinc-200 group-hover:text-zinc-400 transition-colors" />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-auto rounded-xl bg-sky-50 border border-sky-100 p-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-sky-700">Conversión Nuevo → Oferta</p>
            <p className="text-[10px] text-sky-500 mt-0.5">Promedio del trimestre</p>
          </div>
          <div className="text-xl font-black text-sky-600 tabular-nums">16.7%</div>
        </div>

      </div>
    </div>
  )
}

function FormacionModule() {
  return (
    <div className="flex flex-col @md:flex-row @md:items-stretch gap-4">

      {/* Left col: donut summary + per-course legend */}
      <div className="w-full @md:w-[44%] flex flex-col gap-3 shrink-0">

        <div className="rounded-xl border border-zinc-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col items-center gap-3">
          <DonutChart pct={76} color="#0ea5e9" label="completado" />
          <div className="flex items-center gap-3 text-center w-full">
            {[
              { val: '94',  label: 'colaboradores',  cls: 'text-zinc-900' },
              { val: '4',   label: 'cursos activos',  cls: 'text-zinc-900' },
              { val: '12',  label: 'esta semana',     cls: 'text-emerald-600' },
            ].map((s, i) => (
              <div key={s.label} className="flex-1 flex flex-col items-center">
                {i > 0 && <div className="hidden" />}
                <p className={cn('text-base font-black tabular-nums', s.cls)}>{s.val}</p>
                <p className="text-[10px] text-zinc-400">{s.label}</p>
              </div>
            ))}
          </div>
          {/* Dividers between stats */}
        </div>

        <div className="rounded-xl border border-zinc-100 bg-white p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex-1">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Por curso</p>
          <div className="flex flex-col gap-2.5">
            {COURSES.map(c => {
              const pct = Math.round((c.done / c.total) * 100)
              return (
                <div key={c.name} className="flex items-center gap-2">
                  <span className={cn('size-2 rounded-full shrink-0', c.color)} />
                  <span className="text-[11px] text-zinc-600 truncate flex-1 min-w-0">{c.name.split(' ').slice(0, 2).join(' ')}</span>
                  <span className="text-[11px] font-bold text-zinc-900 shrink-0 tabular-nums">{pct}%</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Right col: animated progress bars per course */}
      <div className="flex-1 flex flex-col gap-2.5 min-w-0">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Avance por curso</p>
        <div className="flex flex-col gap-2.5">
          {COURSES.map((c, i) => {
            const pct = Math.round((c.done / c.total) * 100)
            return (
              <div key={c.name} className="rounded-xl border border-zinc-100 bg-white p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-zinc-800 leading-tight truncate">{c.name}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5 tabular-nums">{c.done} de {c.total} completados</p>
                  </div>
                  <span className={cn('text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 tabular-nums', c.light)}>{pct}%</span>
                </div>
                <HBar value={c.done} max={c.total} color={c.color} delay={i * 0.12} />
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

function IndicadoresModule() {
  return (
    <div className="flex flex-col @md:flex-row @md:items-stretch gap-4">

      {/* Left col: 4 KPI cards */}
      <div className="w-full @md:w-[44%] flex flex-col gap-2.5 shrink-0">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">KPIs del mes</p>
        {[
          { value: '48',   label: 'Equipo',          sub: '+3 este mes',      color: 'border-l-sky-500'     },
          { value: '14d',  label: 'T. Contratación', sub: '−2 días vs marzo', color: 'border-l-emerald-500' },
          { value: '8.2%', label: 'Rotación',         sub: '↓ tendencia baja', color: 'border-l-violet-500'  },
          { value: '94%',  label: 'Satisfacción',     sub: '+2% vs trim. ant', color: 'border-l-amber-500'   },
        ].map(kpi => (
          <div key={kpi.label} className={cn('rounded-xl border border-zinc-100 bg-white px-3.5 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-l-4 flex items-center justify-between', kpi.color)}>
            <div>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">{kpi.label}</p>
              <p className="text-xl font-black text-zinc-900 leading-tight mt-0.5 tabular-nums">{kpi.value}</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-0.5">
                <TrendingUp size={9} className="shrink-0" />{kpi.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right col: line chart + insight chips */}
      <div className="flex-1 flex flex-col gap-2.5 min-w-0">

        {/* Chart card — grows to fill height */}
        <div className="rounded-xl border border-zinc-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col flex-1">
          <div className="flex items-start justify-between mb-4 shrink-0">
            <div>
              <p className="text-[12px] font-bold text-zinc-800">Actividad mensual por módulo</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                Reclutamiento · Capacitación · Recursos Humanos · últimos 6 meses
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-1 rounded-full border border-sky-100 shrink-0">
              3 módulos
            </div>
          </div>
          {/* Chart fills remaining card height — Chart.js needs explicit height on container */}
          <div className="flex-1 min-h-[130px]">
            <MonthlyHiresChart />
          </div>
        </div>

        {/* 3 insight chips */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: '35',    label: 'Total Q1–Q2',       Icon: UserCheck,    bg: 'bg-sky-50 border-sky-100',         text: 'text-sky-700'     },
            { value: '100%',  label: 'Vacantes cubiertas', Icon: CheckCircle2, bg: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-700' },
            { value: '$3.2k', label: 'Costo / contrat.',   Icon: TrendingDown, bg: 'bg-violet-50 border-violet-100',   text: 'text-violet-700'  },
          ].map(s => (
            <div key={s.label} className={cn('rounded-xl border p-2.5 flex flex-col gap-1', s.bg)}>
              <s.Icon size={12} className={cn('shrink-0', s.text)} />
              <p className={cn('text-base font-black leading-none tabular-nums', s.text)}>{s.value}</p>
              <p className="text-[9px] text-zinc-500 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ active, onSelect }: { active: ModuleId; onSelect: (id: ModuleId) => void }) {
  return (
    <div className="flex flex-col w-44 shrink-0 h-full bg-white">

      {/* Logo */}
      <div className="flex items-center gap-2 px-3.5 py-3.5 border-b border-zinc-100">
        <div className="size-6 rounded-lg bg-sky-500 flex items-center justify-center shrink-0">
          <ShieldCheck size={12} className="text-white" />
        </div>
        <span className="text-[12px] font-bold text-zinc-900 truncate">AetherCore</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5" aria-label="Módulos">
        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-1.5">Módulos</p>
        {SIDEBAR_NAV.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id as ModuleId)}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all duration-150',
              active === item.id
                ? 'bg-sky-50 text-sky-700 font-semibold'
                : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800',
            )}
          >
            <item.Icon size={13} className="shrink-0" />
            <span className="text-[11px] truncate">{item.label}</span>
            {active === item.id && <span className="ml-auto size-1.5 rounded-full bg-sky-500 shrink-0" />}
          </button>
        ))}

        <div className="mt-4 pt-3.5 border-t border-zinc-100">
          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest px-2 mb-1.5">Ajustes</p>
          {SIDEBAR_BOTTOM.map(item => (
            <button
              key={item.id}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 transition-colors"
            >
              <item.Icon size={13} className="shrink-0" />
              <span className="text-[11px] truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="px-2 py-3 border-t border-zinc-100">
        <div className="flex items-center gap-2 px-1.5 py-1.5 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors">
          <div className="size-6 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-zinc-800 truncate">Admin</p>
            <p className="text-[9px] text-zinc-400 truncate">Empresa Demo</p>
          </div>
        </div>
      </div>

    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

const DURATION = 7000

export function DashboardPreview() {
  const [active, setActive]           = useState<ModuleId>('reclutamiento')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tabResetKey, setTabResetKey] = useState(0)
  const [isPaused, setIsPaused]       = useState(false)

  const isPausedRef = useRef(false)
  const timeoutRef  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const sectionRef  = useRef<HTMLDivElement>(null)
  const inView      = useInView(sectionRef, { once: true, margin: '-8%' })

  const currentModule = MODULES.find(m => m.id === active)!

  const moduleHeaders: Record<ModuleId, { title: string; sub: string }> = {
    reclutamiento: { title: 'Pipeline de candidatos', sub: 'Vacante activa: Dev Full Stack' },
    formacion:     { title: 'Plan de capacitación',    sub: 'Q2 2026 · 94 colaboradores'     },
    indicadores:   { title: 'Panel Recursos Humanos', sub: 'Abril 2026 · vista mensual'      },
  }

  // ── Auto-rotating tabs ────────────────────────────────────────────────────

  const startTimer = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setTabResetKey(k => k + 1)
    timeoutRef.current = setTimeout(() => {
      setActive(prev => {
        const idx = MODULES.findIndex(m => m.id === prev)
        return MODULES[(idx + 1) % MODULES.length].id
      })
    }, DURATION)
  }, [])

  useEffect(() => {
    if (!isPausedRef.current) startTimer()
    return () => clearTimeout(timeoutRef.current)
  }, [active, startTimer]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseEnter = useCallback(() => {
    isPausedRef.current = true
    setIsPaused(true)
    clearTimeout(timeoutRef.current)
  }, [])

  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false
    setIsPaused(false)
    startTimer()
  }, [startTimer])

  return (
    <>
      <div className="h-px w-full bg-zinc-200" />

      <section
        ref={sectionRef}
        id="plataforma"
        className="relative bg-white min-h-dvh flex flex-col justify-center py-12 sm:py-16 overflow-hidden"
        aria-labelledby="dashboard-heading"
      >
        {/* Ambient blurs */}
        <div aria-hidden className="pointer-events-none absolute -top-16 -right-32 size-[480px] rounded-full bg-sky-50/70 blur-[80px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 -left-24 size-[320px] rounded-full bg-violet-50/50 blur-[80px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/*
           * Outer two-column layout.
           * Uses xl:flex-row (1280 px) so that on laptops < 1280px the layout
           * is single-column and the dashboard takes full available width —
           * preventing the "cramped" look at 1024-1279px.
           * items-stretch ensures the right card always matches the left col height.
           */}
          <div className="flex flex-col xl:flex-row xl:items-stretch gap-10 xl:gap-12 2xl:gap-16">

            {/* ── LEFT: copy + module selector ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="w-full xl:w-[38%] 2xl:w-[36%] xl:shrink-0 flex flex-col"
            >
              <p className="text-[11px] font-bold text-sky-600 uppercase tracking-[0.2em] mb-3">
                Plataforma
              </p>
              <h2
                id="dashboard-heading"
                className="text-2xl sm:text-3xl xl:text-[1.875rem] 2xl:text-4xl font-bold text-zinc-900 tracking-tight leading-tight"
              >
                Reclutamiento, Capacitación y RH en un solo sistema
              </h2>
              <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-zinc-500">
                Contratar, dar cursos y ver cómo va el equipo, todo en un solo lugar — sin tantas
                hojas sueltas ni el mismo dato en tres sistemas. Eso es AetherCore.
              </p>

              {/* Module selector cards with auto-rotation */}
              <div
                className="flex flex-col gap-3 mt-8 flex-1"
                role="tablist"
                aria-label="Módulos de AetherCore"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {MODULE_CARDS.map((card, i) => {
                  const isActive = active === card.id
                  return (
                    <motion.button
                      key={card.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(card.id)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        'text-left w-full rounded-2xl border p-4 transition-all duration-200 cursor-pointer',
                        isActive
                          ? `${card.activeBg} ${card.activeBorder} shadow-sm`
                          : 'border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-sm',
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn('p-2 rounded-xl shrink-0 transition-colors', isActive ? card.activeIconBg : 'bg-zinc-100')}>
                          <card.Icon size={15} className={cn('transition-colors', isActive ? card.activeIconText : 'text-zinc-500')} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-zinc-900">{card.title}</p>
                          <p className="text-[12px] text-zinc-500 mt-0.5 leading-relaxed">{card.description}</p>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="flex gap-5 mt-3 overflow-hidden"
                            >
                              {card.stats.map(s => (
                                <div key={s.label}>
                                  <p className={cn('text-base font-black leading-none tabular-nums', card.activeStat)}>{s.value}</p>
                                  <p className="text-[10px] text-zinc-400 mt-0.5">{s.label}</p>
                                </div>
                              ))}
                            </motion.div>
                          )}
                          {/* Progress bar — CSS animation, GPU-safe via scaleX */}
                          <div className="h-0.5 w-full bg-zinc-100 rounded-full mt-2.5 overflow-hidden">
                            {isActive && (
                              <div
                                key={tabResetKey}
                                className="h-full w-full bg-sky-500 origin-left rounded-full"
                                style={{
                                  animation: `tab-progress ${DURATION}ms linear forwards`,
                                  animationPlayState: isPaused ? 'paused' : 'running',
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <ChevronRight
                          size={14}
                          className={cn('shrink-0 mt-1 transition-all duration-200', isActive ? `${card.activeIconText} translate-x-0.5` : 'text-zinc-300')}
                        />
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Feature chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-2 mt-6"
              >
                {[
                  { Icon: ShieldCheck,  text: 'LFPDPPP 2025'            },
                  { Icon: TrendingUp,   text: 'Reportes en tiempo real' },
                  { Icon: Users,        text: 'Multi-sede'              },
                  { Icon: CheckCircle2, text: 'Sin límite'              },
                ].map(f => (
                  <div key={f.text} className="flex items-center gap-1.5 text-[11px] text-zinc-400 bg-zinc-50 border border-zinc-100 px-3 py-1.5 rounded-full">
                    <f.Icon size={10} className="text-sky-500 shrink-0" />
                    {f.text}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Dashboard mockup ────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="w-full xl:flex-1 min-w-0"
            >
              {/*
               * min-h-[600px]: guarantees visible height when stacked (< xl).
               * xl:min-h-0 xl:h-full: stretches to match left column via items-stretch.
               * flex flex-col: topbar auto + body flex-1.
               */}
              <div className="rounded-2xl border border-zinc-200 shadow-[0_20px_70px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden bg-white flex flex-col min-h-[600px] xl:min-h-0 xl:h-full">

                {/* Topbar */}
                <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 border-b border-zinc-100 bg-zinc-50/80 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Hamburger: only below xl (overlay sidebar) */}
                    <button
                      className="flex xl:hidden p-1.5 rounded-lg hover:bg-zinc-200 text-zinc-500 transition-colors"
                      onClick={() => setSidebarOpen(o => !o)}
                      aria-label="Abrir módulos"
                    >
                      <Menu size={14} />
                    </button>
                    <div className="hidden sm:flex gap-1.5 shrink-0" aria-hidden>
                      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="size-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <span>AetherCore</span>
                      <ChevronRight size={10} />
                      <span className="text-zinc-700 font-semibold">{currentModule.label}</span>
                    </span>
                    <span className="flex sm:hidden text-[11px] font-semibold text-zinc-700 truncate">
                      {currentModule.label}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-[11px] text-zinc-400 w-36">
                    <Search size={11} className="shrink-0" />
                    <span>Buscar…</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 transition-colors relative">
                      <Bell size={13} />
                      <span className="absolute top-1 right-1 size-1.5 rounded-full bg-sky-500" />
                    </button>
                    <div className="size-7 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-[9px] font-bold text-white">
                      AD
                    </div>
                  </div>
                </div>

                {/*
                 * Body — positioning context for overlay sidebar.
                 * flex-1 fills remaining card height.
                 */}
                <div className="relative flex flex-1 overflow-hidden">

                  {/* Backdrop — below xl when sidebar open */}
                  <div
                    aria-hidden
                    className={cn(
                      'absolute inset-0 z-[8] bg-black/20 transition-opacity duration-300 xl:hidden',
                      sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
                    )}
                    onClick={() => setSidebarOpen(false)}
                  />

                  {/*
                   * Sidebar wrapper.
                   * Below xl: absolute overlay (slides in from left).
                   * xl+: relative, always in flow.
                   */}
                  <div
                    className={cn(
                      'absolute inset-y-0 left-0 z-[9] border-r border-zinc-100',
                      'transition-transform duration-300',
                      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                      'xl:relative xl:inset-auto xl:translate-x-0',
                    )}
                  >
                    <Sidebar
                      active={active}
                      onSelect={(id) => { setActive(id); setSidebarOpen(false) }}
                    />
                  </div>

                  {/* Main content area */}
                  <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

                    {/* Content header */}
                    <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-zinc-100 bg-white shrink-0">
                      <div className="min-w-0">
                        <h3 className="text-[13px] font-bold text-zinc-900 leading-tight truncate">
                          {moduleHeaders[active].title}
                        </h3>
                        <p className="text-[10px] text-zinc-400 mt-0.5 truncate">{moduleHeaders[active].sub}</p>
                      </div>
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-[11px] font-semibold rounded-lg transition-colors shrink-0">
                        <Plus size={10} /> Nuevo
                      </button>
                    </div>

                    {/*
                     * Tab panel — scrollable.
                     * @container enables container queries inside module panels
                     * so they adapt to THIS container's width, not the viewport.
                     */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-zinc-50/50 @container">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        role="tabpanel"
                        aria-label={currentModule.label}
                      >
                        {active === 'reclutamiento' && <ReclutamientoModule />}
                        {active === 'formacion'     && <FormacionModule />}
                        {active === 'indicadores'   && <IndicadoresModule />}
                      </motion.div>
                    </div>

                  </main>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
