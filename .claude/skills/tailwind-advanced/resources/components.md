# Component Patterns Reference

## NAVIGATION

### Top Nav (fixed, glassmorphism)
```tsx
<nav className="fixed top-0 inset-x-0 z-50 h-16 flex items-center px-6
                bg-black/40 backdrop-blur-2xl border-b border-white/[0.06]
                supports-[backdrop-filter]:bg-black/30">
  <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
    <span className="font-display text-sm font-bold tracking-widest text-white uppercase">
      ZEPHYREA®
    </span>
    <div className="hidden md:flex items-center gap-8">
      {['Producto', 'Precios', 'Docs', 'Blog'].map(link => (
        <a key={link}
           className="text-xs font-medium tracking-widest uppercase
                      text-white/40 hover:text-white transition-colors duration-200">
          {link}
        </a>
      ))}
    </div>
    <button className="text-xs font-medium tracking-wide px-5 py-2
                       bg-white text-black rounded-full
                       hover:bg-white/90 transition-all duration-200
                       hover:scale-[1.02] active:scale-[0.98]">
      Comenzar
    </button>
  </div>
</nav>
```

---

## HERO SECTION

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Ambient glows */}
  <div className="absolute top-1/4 -left-32 size-[600px] rounded-full
                  bg-violet-500/10 blur-[120px] pointer-events-none" />
  <div className="absolute bottom-1/4 -right-32 size-[400px] rounded-full
                  bg-pink-500/10 blur-[100px] pointer-events-none" />

  {/* Noise texture */}
  <div className="absolute inset-0 opacity-[0.03]
                  bg-[url('/noise.png')] pointer-events-none" />

  <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
    {/* Eyebrow */}
    <div className="starting:opacity-0 starting:-translate-y-2
                    inline-flex items-center gap-2 px-4 py-1.5 mb-8
                    rounded-full border border-violet-500/30 bg-violet-500/10
                    text-violet-300 text-xs font-medium tracking-widest uppercase
                    transition-all duration-700">
      <span className="size-1.5 rounded-full bg-violet-400 animate-pulse" />
      Plataforma HR · CDMX · 2025
    </div>

    {/* Headline */}
    <h1 className="starting:opacity-0 starting:scale-95
                   text-[clamp(3rem,10vw,9rem)] font-black leading-[0.88]
                   tracking-tight text-white
                   text-shadow-lg text-shadow-violet-500/20
                   transition-all duration-700 delay-100">
      La HR que<br />
      <span className="text-transparent bg-clip-text
                       bg-linear-45 from-violet-500 to-pink-500">
        tu empresa
      </span><br />
      merece.
    </h1>

    {/* Subheadline */}
    <p className="starting:opacity-0 starting:translate-y-4
                  mt-8 text-lg text-white/50 max-w-lg mx-auto leading-relaxed
                  transition-all duration-700 delay-200">
      Reclutamiento, capacitación y gestión de colaboradores en una sola plataforma.
    </p>

    {/* CTAs */}
    <div className="starting:opacity-0 starting:translate-y-4
                    mt-10 flex flex-col sm:flex-row gap-4 justify-center
                    transition-all duration-700 delay-300">
      <button className="px-8 py-4 bg-white text-black text-sm font-semibold
                         rounded-full hover:bg-white/90
                         transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                         shadow-[0_8px_32px_white/20]">
        Comenzar gratis →
      </button>
      <button className="px-8 py-4 bg-white/5 text-white text-sm font-medium
                         rounded-full border border-white/10 hover:border-white/25 hover:bg-white/10
                         transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
        Ver demo
      </button>
    </div>
  </div>
</section>
```

---

## CARDS

### Feature Card
```tsx
<div className="group relative rounded-2xl overflow-hidden
                bg-white/[0.03] border border-white/[0.06] p-6
                transition-all duration-300
                hover:border-white/15 hover:bg-white/[0.05]
                hover:shadow-[0_0_60px_violet-500/15]">
  {/* Hover gradient */}
  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                  bg-gradient-to-br from-violet-500/5 to-transparent
                  transition-opacity duration-300 pointer-events-none" />

  {/* Icon */}
  <div className="relative size-10 rounded-lg mb-5
                  bg-violet-500/10 border border-violet-500/20
                  flex items-center justify-center">
    <Icon className="size-5 text-violet-400" />
  </div>

  <h3 className="font-semibold text-white mb-2">{title}</h3>
  <p className="text-sm text-white/40 leading-relaxed">{description}</p>
</div>
```

### Pricing Card
```tsx
{/* Popular card — has glow ring */}
<div className="relative rounded-2xl p-px
                bg-gradient-to-b from-violet-500 to-pink-500">
  <div className="rounded-[calc(1rem-1px)] bg-gray-950 p-8">
    <div className="text-xs font-semibold tracking-widest uppercase
                    text-violet-400 mb-4">Más popular</div>
    <div className="text-4xl font-black text-white mb-1">$29</div>
    <div className="text-sm text-white/40 mb-8">/mes por empresa</div>

    <ul className="space-y-3 mb-8">
      {features.map(f => (
        <li key={f} className="flex items-center gap-3 text-sm text-white/60">
          <Check className="size-4 text-violet-400 shrink-0" />
          {f}
        </li>
      ))}
    </ul>

    <button className="w-full py-3 bg-violet-500 hover:bg-violet-600
                       text-white text-sm font-semibold rounded-xl
                       transition-all duration-200 hover:scale-[1.01]">
      Comenzar →
    </button>
  </div>
</div>
```

---

## FORMS

### Complete Form
```tsx
<form className="space-y-5">
  {/* Text input */}
  <div className="space-y-1.5">
    <label className="text-xs font-medium tracking-widest uppercase text-white/40">
      Correo electrónico
    </label>
    <input
      type="email"
      placeholder="tú@empresa.mx"
      className="w-full px-4 py-3 rounded-xl
                 bg-white/5 border border-white/10
                 text-white text-sm placeholder:text-white/25
                 inset-shadow-xs inset-shadow-black/40
                 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20
                 focus:inset-shadow-none
                 user-valid:border-green-500/40 user-invalid:border-red-500/40
                 transition-all duration-200"
    />
  </div>

  {/* Auto-resize textarea */}
  <div className="space-y-1.5">
    <label className="text-xs font-medium tracking-widest uppercase text-white/40">
      Mensaje
    </label>
    <textarea
      placeholder="Cuéntanos sobre tu empresa..."
      className="w-full px-4 py-3 rounded-xl
                 bg-white/5 border border-white/10
                 text-white text-sm placeholder:text-white/25
                 inset-shadow-xs inset-shadow-black/40
                 field-sizing-content resize-none min-h-[4rem] max-h-48
                 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20
                 transition-all duration-200"
    />
  </div>

  {/* Submit */}
  <button type="submit"
          className="w-full py-3.5 bg-violet-500 hover:bg-violet-600
                     text-white text-sm font-semibold rounded-xl
                     transition-all duration-200
                     hover:scale-[1.01] active:scale-[0.99]
                     disabled:opacity-40 disabled:cursor-not-allowed
                     disabled:hover:scale-100">
    Enviar →
  </button>
</form>
```

---

## STATS / METRICS ROW

```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]
                border border-white/[0.06] rounded-2xl overflow-hidden">
  {stats.map(({ value, label }) => (
    <div key={label} className="bg-black px-8 py-6">
      <div className="font-display text-3xl font-black text-white tracking-tight">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium tracking-widest uppercase text-white/30">
        {label}
      </div>
    </div>
  ))}
</div>
```

---

## TABLE (Dashboard)

```tsx
<div className="rounded-2xl border border-white/[0.06] overflow-hidden">
  <table className="w-full text-sm">
    <thead className="bg-white/[0.03] border-b border-white/[0.06]">
      <tr>
        {headers.map(h => (
          <th key={h} className="px-6 py-4 text-left text-xs font-semibold
                                  tracking-widest uppercase text-white/30">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-white/[0.04]">
      {rows.map((row, i) => (
        <tr key={i} className="hover:bg-white/[0.02] transition-colors duration-150">
          {cells.map(cell => (
            <td className="px-6 py-4 text-white/60">{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

---

## BADGE / PILL

```tsx
{/* Status badges */}
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                 bg-green-500/10 text-green-400 border border-green-500/20">
  <span className="size-1.5 rounded-full bg-green-400" />
  Activo
</span>

<span className="px-2.5 py-1 rounded-full text-xs font-medium
                 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
  Pendiente
</span>

<span className="px-2.5 py-1 rounded-full text-xs font-medium
                 bg-red-500/10 text-red-400 border border-red-500/20">
  Inactivo
</span>
```

---

## SKELETON LOADER

```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 rounded-full bg-white/10 w-3/4" />
  <div className="h-4 rounded-full bg-white/10 w-1/2" />
  <div className="h-32 rounded-2xl bg-white/5" />
</div>
```

---

## MARQUEE / TICKER

```css
/* globals.css */
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@theme { --animate-marquee: marquee 20s linear infinite; }
```

```tsx
<div className="overflow-hidden">
  <div className="flex animate-marquee will-change-transform">
    {[...items, ...items].map((item, i) => (
      <div key={i} className="shrink-0 px-8">{item}</div>
    ))}
  </div>
</div>
```
