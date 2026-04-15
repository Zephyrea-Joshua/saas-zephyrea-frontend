'use client'

import { useMemo, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { LayoutGrid, ShieldCheck, Cpu, CreditCard, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/seo/config'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'technical' | 'billing' | 'account'
}

type FAQCategory = FAQItem['category']

const FAQ_DATA: FAQItem[] = [
  // ── General ──
  {
    id: 'g1',
    category: 'general',
    question: '¿Qué es AetherCore?',
    answer: `${siteConfig.name} es el software de recursos humanos de ${siteConfig.brand}: centraliza vacantes, capacitación, indicadores y expediente en un solo lugar, con flujos claros para equipos de RH en México.`,
  },
  {
    id: 'g2',
    category: 'general',
    question: '¿Para qué empresas está pensado?',
    answer:
      'Para organizaciones que necesitan reclutar, capacitar y dar seguimiento a personal en uno o varios puntos de operación: retail, manufactura, servicios, nearshoring y equipos que quieren dejar de depender de hojas sueltas y correos sueltos.',
  },
  {
    id: 'g3',
    category: 'general',
    question: '¿Qué puedo hacer con la plataforma?',
    answer:
      'Gestionar vacantes y etapas de candidatos, asignar formación (puesto, campaña o cumplimiento normativo), comunicar avisos al equipo, ver indicadores de RH y mantener evidencias listas para auditoría o revisiones internas.',
  },
  {
    id: 'g4',
    category: 'general',
    question: '¿Cómo puedo conocer el producto?',
    answer:
      'Puedes solicitar una demostración desde la página principal o escribirnos a contacto@zephyrea.site para coordinar una sesión y ver cómo encaja en tu operación.',
  },
  {
    id: 'g5',
    category: 'general',
    question: '¿Quién desarrolla AetherCore?',
    answer: `AetherCore es una solución desarrollada por ${siteConfig.brand}. Información corporativa y canales en ${siteConfig.corporateUrl}.`,
  },
  // ── Plataforma (técnico / producto) ──
  {
    id: 't1',
    category: 'technical',
    question: '¿Funciona en celular y tablet?',
    answer:
      'Sí. La interfaz está pensada para usarse en navegador en escritorio y dispositivos móviles, para que RH y líderes consulten información donde estén.',
  },
  {
    id: 't2',
    category: 'technical',
    question: '¿Cómo se protegen los accesos y los datos?',
    answer:
      'El acceso se gestiona por roles y permisos definidos en el sistema; el trato de datos personales de colaboradores y candidatos sigue criterios alineados a la LFPDPPP y buenas prácticas de seguridad (controles por perfil, trazabilidad y mínima exposición de información).',
  },
  {
    id: 't3',
    category: 'technical',
    question: '¿Soportan varias sedes o equipos?',
    answer:
      'La plataforma está orientada a operaciones que requieren visibilidad por área, ubicación o unidad de negocio, manteniendo políticas coherentes en toda la organización.',
  },
  {
    id: 't4',
    category: 'technical',
    question: '¿La capacitación incluye solo normas oficiales?',
    answer:
      'No solo NOM o temas regulatorios: puedes abordar formación por puesto, por campaña interna o por requisitos legales y de cumplimiento, según lo que tu empresa necesite documentar y dar seguimiento.',
  },
  {
    id: 't5',
    category: 'technical',
    question: '¿Dónde consulto avisos legales y privacidad?',
    answer:
      'En este sitio encontrarás aviso de privacidad, cookies, términos de uso y aviso legal. Para dudas específicas sobre tratamiento de datos escríbenos a contacto@zephyrea.site.',
  },
  // ── Facturación ──
  {
    id: 'b1',
    category: 'billing',
    question: '¿Cómo funcionan los planes?',
    answer:
      'Los planes y precios se acuerdan según tamaño de empresa, módulos y alcance (por ejemplo usuarios o sedes). Te compartimos una cotización clara antes de contratar.',
  },
  {
    id: 'b2',
    category: 'billing',
    question: '¿Qué formas de pago aceptan?',
    answer:
      'Aceptamos medios habituales para empresas en México (transferencia, tarjetas donde aplique y opciones acordadas en la propuesta comercial). Detalle concretos en tu contrato o factura.',
  },
  {
    id: 'b3',
    category: 'billing',
    question: '¿Emiten factura fiscal en México?',
    answer:
      'Sí. Facturamos conforme a las disposiciones aplicables (CFDI / Régimen correspondiente) para que tu área de finanzas pueda contabilizar el gasto correctamente.',
  },
  {
    id: 'b4',
    category: 'billing',
    question: '¿Puedo cancelar o bajar de plan?',
    answer:
      'Los cambios de plan o la baja se gestionan según lo pactado en tu contrato o anexo de servicios, con periodos de aviso razonables para migrar datos o exportar información.',
  },
  {
    id: 'b5',
    category: 'billing',
    question: '¿Hay renovación automática?',
    answer:
      'Los servicios por suscripción suelen renovarse al término del periodo facturado, salvo que se notifique la no renovación con la antelación indicada en tu acuerdo comercial.',
  },
  // ── Cuenta y datos ──
  {
    id: 'a1',
    category: 'account',
    question: '¿Cómo restablezco mi contraseña?',
    answer:
      'Desde la pantalla de inicio de sesión utiliza la opción de recuperación de acceso; recibirás instrucciones en el correo registrado para definir una nueva contraseña de forma segura.',
  },
  {
    id: 'a2',
    category: 'account',
    question: '¿Está permitido compartir un mismo usuario?',
    answer:
      'No es recomendable: cada persona debe operar con su propio acceso para cumplir buenas prácticas de seguridad y auditoría. Para más usuarios, evaluamos planes o perfiles adicionales.',
  },
  {
    id: 'a3',
    category: 'account',
    question: '¿Cómo ejercen mis colaboradores sus derechos ARCO?',
    answer:
      'Los titulares pueden solicitar acceso, rectificación, cancelación u oposición según la LFPDPPP. Canal general: contacto@zephyrea.site, indicando el motivo y datos de contacto para dar seguimiento.',
  },
  {
    id: 'a4',
    category: 'account',
    question: '¿Cómo actualizo datos de contacto de la empresa?',
    answer:
      'Los administradores pueden coordinar cambios de datos de facturación o contacto operativo con nuestro equipo para mantener alineados contrato, avisos y soporte.',
  },
  {
    id: 'a5',
    category: 'account',
    question: '¿Qué pasa si dejamos de usar AetherCore?',
    answer:
      'Se define un cierre ordenado: exportación o entrega de información según plazos contractuales, baja de accesos y conservación o borrado de datos conforme a la LFPDPPP y a lo acordado por escrito.',
  },
]

const CATEGORY_TABS: {
  id: FAQCategory
  icon: typeof LayoutGrid
  label: string
}[] = [
  { id: 'general', icon: LayoutGrid, label: 'General' },
  { id: 'technical', icon: Cpu, label: 'Plataforma' },
  { id: 'billing', icon: CreditCard, label: 'Facturación' },
  { id: 'account', icon: ShieldCheck, label: 'Cuenta y datos' },
]

export const FaqTabbedExplorer = () => {
  const [activeTab, setActiveTab] = useState<FAQCategory>('general')

  const filteredItems = FAQ_DATA.filter((item) => item.category === activeTab)
  const firstId = filteredItems[0]?.id

  const activeLabel = useMemo(
    () => CATEGORY_TABS.find((c) => c.id === activeTab)?.label ?? 'FAQ',
    [activeTab],
  )

  return (
    <section
      id="preguntas-frecuentes"
      className="relative w-full overflow-hidden bg-linear-to-b from-zinc-50/95 via-white to-white py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-sky-50/60 to-transparent"
      />
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-12 md:text-left">
          <p className="mb-2 font-[family-name:var(--font-trust-marquee)] text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
            Soporte
          </p>
          <h2
            id="faq-heading"
            className="font-[family-name:var(--font-trust-marquee)] text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl"
          >
            Preguntas frecuentes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 md:mx-0">
            Respuestas sobre {siteConfig.name}, operación en México y tratamiento de datos personales.
          </p>
        </div>

        <div className="flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.14),0_0_0_1px_rgba(15,23,42,0.04)] md:flex-row md:rounded-[2rem]">
          <div className="w-full shrink-0 border-b border-slate-100 bg-linear-to-br from-slate-50/95 to-sky-50/30 p-5 sm:p-6 md:w-[min(100%,17.5rem)] md:border-b-0 md:border-r md:border-slate-100 md:p-8">
            <h3 className="mb-5 font-spaceGrotesk text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Categorías
            </h3>
            <nav className="flex flex-row gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0 md:pr-0" aria-label="Categorías de ayuda">
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(
                    'flex min-w-[9.5rem] shrink-0 items-center gap-3 rounded-xl border px-3 py-3 text-left font-spaceGrotesk text-sm font-medium transition-all duration-200 md:min-w-0',
                    activeTab === cat.id
                      ? 'border-sky-300/80 bg-white text-slate-900 shadow-md shadow-sky-500/10 ring-1 ring-sky-500/20'
                      : 'border-transparent bg-white/40 text-slate-600 hover:border-slate-200 hover:bg-white hover:text-slate-900',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg',
                      activeTab === cat.id
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-200/80 text-slate-600',
                    )}
                  >
                    <cat.icon size={16} aria-hidden strokeWidth={2} />
                  </span>
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="min-w-0 flex-1 p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="mb-8 border-b border-slate-100 pb-6">
              <p className="font-spaceGrotesk text-xs font-semibold uppercase tracking-wider text-sky-600">
                {activeLabel}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Selecciona una pregunta para ver el detalle.
              </p>
            </div>

            <Accordion
              key={activeTab}
              type="single"
              collapsible
              defaultValue={firstId}
              className="w-full space-y-3"
            >
              {filteredItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/40 transition-colors hover:border-sky-200/80 hover:bg-white data-[state=open]:border-sky-300/60 data-[state=open]:bg-white data-[state=open]:shadow-sm data-[state=open]:shadow-sky-500/5"
                >
                  <AccordionHeader className="flex w-full border-0 bg-transparent p-0">
                    <AccordionTrigger className="group flex w-full items-start justify-between gap-4 px-5 py-5 text-left font-spaceGrotesk text-[15px] font-semibold leading-snug text-slate-900 outline-none transition-colors hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:ring-offset-2 [&[data-state=open]]:pb-3">
                      <span className="min-w-0 flex-1 pr-2">{item.question}</span>
                      <ChevronDown
                        aria-hidden
                        className="mt-0.5 size-5 shrink-0 text-sky-500/80 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180"
                      />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent className="border-t border-slate-100/90 bg-white px-5 pb-5 pt-0 text-[15px] leading-relaxed text-slate-600">
                    <p className="pt-1">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
