'use client'

import dynamic from 'next/dynamic'

/** Demo pesada (Chart.js, etc.): chunk separado, sin SSR para aligerar el bundle inicial. */
export const DashboardPreviewLazy = dynamic(
  () =>
    import('@/components/dashboard-preview').then((m) => m.DashboardPreview),
  {
    ssr: false,
    loading: () => (
      <section className="relative min-h-dvh w-full bg-white" aria-hidden />
    ),
  },
)
