---
name: tailwind-ui
description: >
  Expert-level Tailwind CSS v4.x UI development skill. Use this skill for ANY task involving
  Tailwind CSS, UI design, component styling, design systems, animations, responsive layouts,
  dark mode, glassmorphism, or modern CSS effects. Trigger whenever the user mentions Tailwind,
  CSS utilities, UI components, styling, design tokens, color palettes, typography systems,
  animations with Tailwind, @theme configuration, container queries, or asks to build any
  visual interface. Also trigger for questions about Tailwind v4 vs v3 differences, CSS-first
  configuration, the Oxide engine, or migrating existing Tailwind projects. Always use this
  skill proactively when building landing pages, dashboards, SaaS UIs, hero sections, cards,
  forms, navbars, or any component that needs polished, production-grade styling.
---

# Tailwind CSS v4.2 — Expert UI Skill

> Current stable: **v4.2.0** (released February 18, 2026).
> Timeline: v4.0 → Jan 2025 · v4.1 → Apr 2025 · v4.2 → Feb 2026
> Engine: **Oxide** (Rust-powered). Zero config JS required.
> Browser support: Safari 16.4+, Chrome 111+, Firefox 128+

---

## 0. THE BIG PICTURE: v3 → v4.2 COMPLETO

| Feature | v3 | v4.0 | v4.1 | v4.2 |
|---|---|---|---|---|
| Config file | `tailwind.config.js` | **`@theme {}`** | ← | ← |
| Directives | `@tailwind ...` | **`@import "tailwindcss"`** | ← | ← |
| Engine | PostCSS + Node.js | **Oxide (Rust)** | ← | **+3.8x recompile** |
| Content detection | Manual `content: []` | **Automático** | ← | ← |
| Container queries | Plugin separado | **Built-in core** | ← | ← |
| Webpack | PostCSS middleman | ← | ← | **`@tailwindcss/webpack`** |
| Build speed | baseline | 5x faster | ← | +3.8x recompile gain |
| CSS output | 22–35KB gzip | **15–25KB gzip** | ← | ← |
| Text shadows | ❌ | ❌ | **✅ built-in** | ← |
| Mask utilities | ❌ | ❌ | **✅ built-in** | ← |
| Inset shadows | ❌ | **✅** | ← | ← |
| `field-sizing` | ❌ | **✅** | ← | ← |
| `@starting-style` | ❌ | **✅** | ← | ← |
| Colors palette | 22 colors | ← | ← | **+4 nuevos (mauve, olive, mist, taupe)** |
| Logical properties | Parcial | ← | ← | **✅ Completas** |
| `font-features-*` | ❌ | ❌ | ❌ | **✅ nuevo** |
| `inline-*`/`block-*` size | ❌ | ❌ | ❌ | **✅ nuevo** |
| Pointer variants | ❌ | ❌ | **✅** | ← |
| Safe alignment | ❌ | ❌ | **✅** | ← |

---

## 1. INSTALLATION (2026 canonical)

### Next.js + Tailwind v4 (recommended stack)
```bash
npm install tailwindcss@latest @tailwindcss/vite@latest
```

```ts
// vite.config.ts (or next.config.ts with custom Vite)
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()],
}
```

```css
/* app/globals.css — that's it, no more directives */
@import "tailwindcss";
```

### PostCSS (non-Vite projects)
```bash
npm install tailwindcss @tailwindcss/postcss
```
```js
// postcss.config.js
export default { plugins: { '@tailwindcss/postcss': {} } }
```

### CLI (standalone, no bundler)
```bash
npx @tailwindcss/cli -i input.css -o output.css --watch
```

### Upgrade from v3
```bash
npx @tailwindcss/upgrade   # automated migration tool
```

---

## 2. CSS-FIRST CONFIGURATION (`@theme`)

This is the most important v4 concept. **No more `tailwind.config.js`.**

```css
@import "tailwindcss";

@theme {
  /* ── Colors ─────────────────────────────────────── */
  --color-negro-abismo:      #0A0D12;
  --color-plata-arq:         #B9C0C8;
  --color-azul-confianza:    #0E2F4F;
  --color-azul-cambio:       #2F80ED;
  --color-niebla:            #F4F6F8;

  /* Wide-gamut P3 colors (v4 native) */
  --color-magenta:           oklch(0.65 0.28 0);
  --color-violeta:           oklch(0.47 0.22 295);

  /* ── Typography ──────────────────────────────────── */
  --font-display:            "Unbounded", sans-serif;
  --font-body:               "DM Sans", sans-serif;

  /* ── Spacing scale ───────────────────────────────── */
  --spacing-18:              4.5rem;
  --spacing-88:              22rem;

  /* ── Breakpoints ─────────────────────────────────── */
  --breakpoint-xs:           30rem;    /* 480px */
  --breakpoint-3xl:          120rem;   /* 1920px */

  /* ── Radius ──────────────────────────────────────── */
  --radius-card:             1.5rem;
  --radius-pill:             9999px;

  /* ── Shadows ─────────────────────────────────────── */
  --shadow-glow-magenta:     0 0 40px oklch(0.65 0.28 0 / 0.35);
  --shadow-glow-violet:      0 0 60px oklch(0.47 0.22 295 / 0.3);

  /* ── Animations (registered @property under the hood) */
  --animate-float:           float 4s ease-in-out infinite;
  --animate-pulse-glow:      pulse-glow 2s ease-in-out infinite;
}

/* Custom keyframes */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}
@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
}
```

> All `@theme` tokens auto-generate utility classes AND CSS custom properties.
> `--color-magenta` → `bg-magenta`, `text-magenta`, `border-magenta`, `shadow-magenta/50`

### Additional sources (monorepos)
```css
@import "tailwindcss";
@source "../packages/ui/src";           /* scan external package */
@source not "../node_modules/.cache";   /* ignore heavy dirs (v4.1) */
@source inline("btn btn-primary btn-secondary"); /* safelist (v4.1) */
```

---

## 3. CORE UTILITY PATTERNS

### Layout — Flex & Grid
```html
<!-- Flex centering -->
<div class="flex items-center justify-between gap-4">

<!-- CSS Grid auto-fit (responsive without breakpoints) -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">

<!-- Named template areas -->
<div class="grid grid-cols-[1fr_300px] grid-rows-[auto_1fr_auto] min-h-screen">
  <header class="col-span-full">...</header>
  <main>...</main>
  <aside>...</aside>
</div>

<!-- Subgrid (v4 native support) -->
<div class="grid grid-cols-3">
  <div class="grid col-span-3 grid-cols-subgrid">
    <span>A</span><span>B</span><span>C</span>
  </div>
</div>
```

### Responsive — Breakpoints + Container Queries
```html
<!-- Viewport breakpoints -->
<h1 class="text-3xl md:text-5xl lg:text-7xl xl:text-9xl">

<!-- Container queries (NO plugin needed in v4) -->
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
    <!-- adapts to container width, not viewport -->
  </div>
</div>

<!-- Named containers -->
<section class="@container/card">
  <h2 class="text-sm @md/card:text-xl @xl/card:text-3xl">
</section>

<!-- Max-width container queries (v4) -->
<div class="@container">
  <div class="hidden @max-sm:block">Only shows when container is small</div>
</div>
```

### Typography
```html
<h1 class="
  font-display
  text-[clamp(2.5rem,8vw,8rem)]
  font-black
  tracking-tight
  leading-[0.9]
  text-white
  text-shadow-lg                        /* v4.1 built-in */
  text-shadow-violet-500/40
">DiproDance</h1>

<p class="
  font-body
  text-sm
  font-medium
  tracking-[0.25em]
  uppercase
  text-white/40
">Estudio de Danza · CDMX</p>
```

---

## 4. TAILWIND v4.0 — NEW UTILITIES REFERENCE

### Inset Shadows (stack up to 4 box-shadow layers)
```html
<!-- Inner glow for cards -->
<div class="
  bg-white/5
  shadow-xl
  inset-shadow-sm inset-shadow-white/10
  inset-ring-1    inset-ring-white/20
">

<!-- Form inputs — recessed look without JavaScript -->
<input class="
  bg-black/40
  border border-white/10
  inset-shadow-xs inset-shadow-black/60
  focus:inset-shadow-none
  focus:ring-2 focus:ring-violet-500/50
">
```

### Field Sizing (auto-resize textarea — zero JS)
```html
<textarea class="field-sizing-content resize-none min-h-[3rem] max-h-48">
  <!-- grows/shrinks with content automatically -->
</textarea>
```

### Color Scheme (dark mode scrollbars)
```html
<html class="color-scheme-dark">
<!-- or per-element: -->
<div class="color-scheme-dark bg-gray-900">
```

### 3D Transforms (v4 expanded)
```html
<div class="
  perspective-1000
  hover:rotate-x-12
  hover:rotate-y-6
  hover:-translate-z-4
  transform-style-3d
  transition-transform duration-500
">
```

### `@starting-style` — Animate from hidden (CSS entry animations)
```html
<!-- Card that fades in on DOM insertion — pure CSS -->
<div class="
  starting:opacity-0
  starting:translate-y-4
  opacity-100 translate-y-0
  transition-all duration-500
">
```

### Linear Gradients with angles (v4)
```html
<!-- Before: bg-gradient-to-r -->
<!-- After: -->
<div class="bg-linear-45 from-violet-600 via-fuchsia-500 to-pink-500">
<div class="bg-linear-135 from-blue-600 to-cyan-400">

<!-- Conic gradients -->
<div class="bg-conic from-violet-500 to-pink-500">

<!-- Radial gradients -->
<div class="bg-radial from-violet-500/30 to-transparent">
```

### `nth-*` Variants
```html
<ul>
  <li class="nth-[odd]:bg-white/5 nth-[even]:bg-black/20 nth-3:font-bold">
```

### `in-*` Variant (like `group-*` without needing `group`)
```html
<div>
  <button>Toggle</button>
  <!-- in-* checks ANY ancestor, not just group -->
  <span class="in-[details]:block hidden">Detail content</span>
</div>
```

---

## 5. TAILWIND v4.1 — NEW UTILITIES REFERENCE

### Text Shadows (finally!)
```html
<!-- Sizes: 2xs, xs, sm, md, lg -->
<h1 class="text-shadow-2xs">Subtle depth</h1>
<h1 class="text-shadow-sm">Small shadow</h1>
<h1 class="text-shadow-md">Medium shadow</h1>
<h1 class="text-shadow-lg">Large shadow</h1>

<!-- Colored text shadows -->
<h1 class="text-white text-shadow-lg text-shadow-violet-500/50">Violet glow</h1>
<h1 class="text-white text-shadow-lg text-shadow-pink-500/60">Pink glow</h1>

<!-- Opacity modifier -->
<h1 class="text-shadow-lg/30">30% opacity shadow</h1>

<!-- Embossed button effect -->
<button class="text-gray-900 text-shadow-2xs text-shadow-white/70">Embossed</button>

<!-- Custom text shadow in @theme -->
<!-- @theme { --text-shadow-neon: 0 0 10px currentColor, 0 0 40px currentColor; } -->
<span class="text-shadow-neon text-violet-400">Neon text</span>
```

### Mask Utilities (image/gradient masking)
```html
<!-- Fade bottom with gradient mask -->
<div class="mask-b-from-80%">
  Content that fades out at the bottom
</div>

<!-- Fade from center outward -->
<div class="mask-radial-from-50%">

<!-- Custom gradient mask -->
<div class="mask-[linear-gradient(to_bottom,black_60%,transparent)]">

<!-- Mask with image -->
<div class="mask-[url('/mask-shape.svg')] mask-no-repeat mask-center mask-contain">
```

### Pointer Variants (touch vs mouse)
```html
<!-- Bigger tap targets for touch devices -->
<button class="p-2 pointer-coarse:p-4 pointer-coarse:min-w-12">

<!-- Hide hover effects on touch -->
<div class="pointer-fine:hover:bg-white/10">

<!-- any-pointer: checks if ANY input is coarse (hybrid devices) -->
<div class="any-pointer-coarse:text-lg">
```

### Overflow Wrap
```html
<p class="wrap-break-word">Long URLs and technical strings won't break layout</p>
<p class="wrap-anywhere">Even flex containers handle line breaks correctly</p>
```

### Safe Alignment (content never disappears in overflow)
```html
<!-- Without safe: content vanishes when flexbox overflows -->
<!-- With safe: falls back to start alignment when overflow would hide content -->
<div class="flex justify-safe-center items-safe-center">
<div class="flex items-safe-center">
```

### New Variants (v4.1)
```html
<form class="noscript:hidden">Only shows when JS is enabled</form>
<input class="user-valid:border-green-500 user-invalid:border-red-500">  <!-- after user interaction -->
<div class="inverted-colors:border-2">Respects OS inverted colors setting</div>
```

### Colored Drop Shadows (v4.1)
```html
<!-- Before: always gray/black -->
<!-- After: brand-colored drop shadows -->
<img class="drop-shadow-xl drop-shadow-violet-500/50">
<div class="drop-shadow-lg drop-shadow-pink-400/40">

<!-- Neon icon effect -->
<svg class="text-cyan-400 drop-shadow-md drop-shadow-cyan-400/80">
```

---

## 6. TAILWIND v4.2 — TODO LO NUEVO (Febrero 18, 2026)

v4.2.0 agrega un plugin oficial de webpack, cuatro nuevas paletas de color, utilidades completas de logical properties para dirección de bloque, y nuevas utilidades de tamaño inline/block.

### Webpack Plugin (primer soporte oficial)
```js
// webpack.config.js — ya no necesitas PostCSS como middleman
import tailwindcss from '@tailwindcss/webpack';

export default {
  plugins: [new tailwindcss()],
};
```

```bash
npm install @tailwindcss/webpack --save-dev
```

> Para proyectos Next.js que aún usen webpack (no Turbopack), esto es el cambio más importante de v4.2. Paridad total con la integración Vite.

---

### 4 Nuevos Colores en el Default Theme

El tema default ahora incluye cuatro nuevas paletas: **mauve**, **olive**, **mist** y **taupe**. Funcionan con todas las utilidades estándar de color y sus escalas.

```html
<!-- Mauve — gris-violeta premium -->
<div class="bg-mauve-50 text-mauve-900">
<div class="bg-mauve-100 border border-mauve-300">
<button class="bg-mauve-500 hover:bg-mauve-600 text-white">

<!-- Olive — verde-tierra sofisticado -->
<div class="bg-olive-50 text-olive-800">
<div class="bg-olive-200 border border-olive-400">

<!-- Mist — azul-gris nebuloso -->
<div class="bg-mist-50 text-mist-700">
<div class="bg-mist-100 border border-mist-300">

<!-- Taupe — beige-gris neutro cálido -->
<div class="bg-taupe-100 text-taupe-800">
<div class="bg-taupe-300 hover:bg-taupe-400">
```

> Todos tienen escala completa: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

---

### Logical Properties Completas (RTL / i18n)

Logical properties respetan el `writing-mode` y la dirección del texto. Crítico para apps multilingual (árabe, hebreo, japonés vertical).

**Padding block (top/bottom lógico):**
```html
<div class="pbs-4 pbe-8">
<!-- padding-block-start: 1rem; padding-block-end: 2rem -->
<!-- En LTR = padding-top/bottom. En RTL = igual. En vertical = padding-left/right -->
```

**Margin block:**
```html
<div class="mbs-6 mbe-2">
<!-- margin-block-start: 1.5rem; margin-block-end: 0.5rem -->
```

**Border block:**
```html
<div class="border-bs border-be border-mauve-300">
<!-- border-block-start + border-block-end -->
<div class="border-bs-2 border-bs-violet-500">  <!-- grosor + color -->
```

**Scroll padding/margin block:**
```html
<div class="scroll-pbs-4 scroll-mbe-2">
<!-- Para snap scrolling que respeta writing mode -->
```

**Logical Inset (positioning):**
```html
<!-- Antes (físico, rompe RTL): -->
<div class="absolute top-0 bottom-0 left-4">

<!-- Ahora (lógico, RTL-safe): -->
<div class="absolute inset-bs-0 inset-be-0 inset-s-4">
<!-- inset-s = inline-start (left en LTR, right en RTL) -->
<!-- inset-e = inline-end  (right en LTR, left en RTL) -->
<!-- inset-bs = block-start (top en escritura horizontal) -->
<!-- inset-be = block-end   (bottom en escritura horizontal) -->
```

**Tabla completa de logical inset:**
```html
inset-s-*   → inset-inline-start (left en LTR)
inset-e-*   → inset-inline-end   (right en LTR)
inset-bs-*  → inset-block-start  (top en horizontal)
inset-be-*  → inset-block-end    (bottom en horizontal)
```

---

### Inline/Block Size Utilities (width/height lógico)

```html
<!-- width lógico (inline-size) — respeta writing-mode -->
<div class="inline-64">      <!-- inline-size: 16rem -->
<div class="min-inline-0">   <!-- min-inline-size: 0 -->
<div class="max-inline-full"> <!-- max-inline-size: 100% -->

<!-- height lógico (block-size) -->
<div class="block-32">       <!-- block-size: 8rem -->
<div class="min-block-screen"> <!-- min-block-size: 100vh -->
<div class="max-block-none">  <!-- max-block-none -->

<!-- Todas las variantes del scale están disponibles -->
<div class="inline-px inline-0.5 inline-1 ... inline-96 inline-full inline-auto inline-fit">
```

> En escritura horizontal (LTR/RTL): `inline-*` = width, `block-*` = height.
> En escritura vertical (japonés): se invierten automáticamente.

---

### `font-features-*` — OpenType Features

Control directo sobre `font-feature-settings`. Fundamental para tipografía premium.

```html
<!-- Ligaduras + alternates contextuales (ej: fi, fl, → ) -->
<p class="font-features-['liga','calt']">

<!-- Números tabulares (se alinean en columnas — ideal para dashboards) -->
<td class="font-features-['tnum']">1,234.56</td>
<td class="font-features-['tnum']">98,765.43</td>

<!-- Versalitas (small caps) -->
<span class="font-features-['smcp']">Small Caps Text</span>

<!-- Fracciones (1/2 → ½) -->
<span class="font-features-['frac']">1/4 cup</span>

<!-- Ordinals (1st → 1ˢᵗ) -->
<span class="font-features-['ordn']">1st 2nd 3rd</span>

<!-- Múltiples features combinadas -->
<p class="font-features-['liga','calt','kern','tnum']">

<!-- Con variable font axes -->
<p class="font-features-['ss01']">Stylistic Set 1 (depende de la fuente)</p>
```

> Con fuentes variables como Unbounded, DM Sans, Inter: `ss01`–`ss20` activan sets estilísticos.

---

### Deprecaciones en v4.2

```html
<!-- ❌ DEPRECATED (start-* / end-*) -->
<div class="start-4 end-0">

<!-- ✅ NUEVO PREFERIDO (inline-s-* / inline-e-*) -->
<div class="inline-s-4 inline-e-0">
```

---

### Performance: +3.8x en Recompilación

v4.2 mejora la velocidad de recompilación en 3.8x, particularmente beneficioso para equipos en proyectos establecidos.

Esto impacta directamente el DX en proyectos grandes:
- Hot reload con cambios de clase: subparseo de milisegundos
- Proyectos con 200+ componentes: notablemente más rápidos en watch mode

---

## 7. DESIGN TOKENS SYSTEM

### Complete `globals.css` for a Premium SaaS
```css
@import "tailwindcss";

@theme {
  /* Brand palette */
  --color-brand-50:    oklch(0.98 0.02 290);
  --color-brand-100:   oklch(0.95 0.05 290);
  --color-brand-500:   oklch(0.60 0.25 290);  /* Primary */
  --color-brand-600:   oklch(0.52 0.27 290);
  --color-brand-900:   oklch(0.20 0.15 290);

  --color-accent:      oklch(0.65 0.28 0);    /* Magenta */
  --color-surface:     oklch(0.08 0.01 240);  /* Near-black */
  --color-border:      oklch(0.20 0.01 240);
  --color-muted:       oklch(0.45 0.02 240);

  /* Typography */
  --font-display:      "Unbounded", sans-serif;
  --font-body:         "DM Sans", sans-serif;
  --font-mono:         "JetBrains Mono", monospace;

  /* Fluid type scale */
  --text-hero:         clamp(3rem, 10vw, 10rem);
  --text-display:      clamp(2rem, 6vw, 5rem);
  --text-title:        clamp(1.5rem, 4vw, 2.5rem);

  /* Spacing */
  --spacing-section:   clamp(4rem, 10vw, 10rem);

  /* Radius system */
  --radius-sm:         0.375rem;
  --radius-DEFAULT:    0.625rem;
  --radius-lg:         1rem;
  --radius-xl:         1.5rem;
  --radius-2xl:        2rem;

  /* Shadows */
  --shadow-card:       0 0 0 1px oklch(0.20 0.01 240), 0 4px 24px oklch(0 0 0 / 0.4);
  --shadow-glow:       0 0 60px oklch(0.60 0.25 290 / 0.25);
  --shadow-glow-sm:    0 0 20px oklch(0.60 0.25 290 / 0.20);

  /* Easing */
  --ease-spring:       cubic-bezier(0.16, 1, 0.3, 1);
  --ease-cinematic:    cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-bounce:       cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Animations */
  --animate-float:     float 5s ease-in-out infinite;
  --animate-shimmer:   shimmer 2s linear infinite;
  --animate-glow:      glow 3s ease-in-out infinite alternate;
}

@keyframes float     { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-16px) } }
@keyframes shimmer   { to { background-position: 200% center } }
@keyframes glow      { from { opacity: 0.5 } to { opacity: 1 } }
```

---

## 7. DARK MODE & THEME VARIANTS

```css
/* In globals.css — class-based dark mode */
@variant dark (&:where(.dark, .dark *));

/* Or media-query-based (default) — just use dark: prefix */
```

```html
<!-- Class-based dark mode -->
<html class="dark">
  <div class="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">

<!-- System preference (default) -->
<div class="bg-white dark:bg-gray-950">
```

### Three-theme system (Light / Dark / Black & White)
```css
/* globals.css */
@theme {
  --color-background: white;
  --color-foreground: #0A0D12;
  --color-primary:    #2F80ED;
}

[data-theme="dark"] {
  --color-background: #0A0D12;
  --color-foreground: #F4F6F8;
  --color-primary:    #2F80ED;
}

[data-theme="bw"] {
  --color-background: #000000;
  --color-foreground: #FFFFFF;
  --color-primary:    #FFFFFF;
}
```

```tsx
// Smooth theme transitions
<html
  data-theme={theme}
  style={{ transition: 'background-color 0.3s ease, color 0.3s ease' }}
>
```

---

## 8. ANIMATION PATTERNS (GPU-optimized)

### Rules — ONLY animate these (60fps guaranteed)
```
✅ transform (translate, scale, rotate, skew)
✅ opacity
✅ filter (blur, brightness — use sparingly)
✅ clip-path
❌ width / height
❌ top / left / right / bottom
❌ margin / padding
❌ background-color (use opacity wrapper instead)
```

### Tailwind animation classes
```html
<!-- Enter animations with @starting-style -->
<div class="starting:opacity-0 starting:-translate-y-2 transition-all duration-500 ease-spring">

<!-- Hover micro-interactions -->
<button class="transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]">

<!-- Stagger via CSS custom properties -->
<div style="--delay: 0ms"  class="animate-[fade-up_0.6s_var(--delay)_ease-spring_both]">
<div style="--delay: 80ms" class="animate-[fade-up_0.6s_var(--delay)_ease-spring_both]">
<div style="--delay: 160ms"class="animate-[fade-up_0.6s_var(--delay)_ease-spring_both]">

<!-- Infinite animations -->
<div class="animate-float">    <!-- float from @theme -->
<div class="animate-pulse">    <!-- built-in pulse -->
<div class="animate-spin">     <!-- built-in spin -->
<div class="animate-bounce">   <!-- built-in bounce -->

<!-- Pause animations on hover (accessibility) -->
<div class="animate-float hover:pause">

<!-- will-change for GPU promotion -->
<div class="will-change-transform will-change-opacity">
```

### Advanced: Shimmer / Skeleton
```html
<div class="
  relative overflow-hidden
  before:absolute before:inset-0
  before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
  before:animate-shimmer before:bg-[length:200%_100%]
  bg-white/5 rounded-xl
">
```

---

## 9. GLASSMORPHISM & VISUAL EFFECTS

```html
<!-- Glass card -->
<div class="
  bg-white/5
  backdrop-blur-xl
  border border-white/10
  shadow-[0_8px_32px_oklch(0_0_0/0.4)]
  inset-shadow-[0_1px_0_white/15]
  rounded-2xl
  p-6
">

<!-- Frosted navigation -->
<nav class="
  fixed top-0 inset-x-0 z-50
  bg-black/40
  backdrop-blur-2xl
  border-b border-white/[0.06]
  supports-backdrop-blur:bg-black/30
">

<!-- Neon glow border -->
<div class="
  relative rounded-2xl
  before:absolute before:inset-0 before:rounded-2xl
  before:bg-gradient-to-r before:from-violet-500 before:to-pink-500
  before:-z-10 before:blur-xl before:opacity-40
  bg-black border border-white/10
">

<!-- Noise texture overlay -->
<div class="
  relative
  before:absolute before:inset-0
  before:opacity-[0.03]
  before:bg-[url('/noise.png')]
  before:pointer-events-none
">
```

---

## 10. COMPONENT PATTERNS (PRODUCTION READY)

See `references/components.md` for full implementations.

### Button system
```html
<!-- Primary -->
<button class="
  inline-flex items-center gap-2 px-6 py-3
  bg-brand-500 hover:bg-brand-600
  text-white text-sm font-medium tracking-wide
  rounded-lg
  transition-all duration-200
  hover:scale-[1.02] hover:-translate-y-px
  active:scale-[0.98]
  shadow-lg shadow-brand-500/30
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
">

<!-- Ghost -->
<button class="
  inline-flex items-center gap-2 px-6 py-3
  bg-transparent hover:bg-white/5
  text-white/60 hover:text-white
  text-sm font-medium tracking-wide
  border border-white/10 hover:border-white/25
  rounded-lg
  transition-all duration-200
">

<!-- Icon button -->
<button class="
  size-10 flex items-center justify-center
  rounded-lg
  bg-white/5 hover:bg-white/10
  text-white/60 hover:text-white
  transition-all duration-150
  border border-white/[0.08]
">
```

### Card
```html
<div class="
  group
  relative rounded-2xl overflow-hidden
  bg-white/[0.03]
  border border-white/[0.06]
  p-6
  transition-all duration-300
  hover:border-white/15
  hover:bg-white/[0.05]
  hover:shadow-glow
">
  <!-- Gradient hover effect -->
  <div class="
    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
    bg-gradient-to-br from-brand-500/5 to-transparent
    transition-opacity duration-300
  "></div>
```

### Form input
```html
<input class="
  w-full px-4 py-3
  bg-white/5
  border border-white/10
  rounded-lg
  text-white text-sm
  placeholder:text-white/30
  inset-shadow-xs inset-shadow-black/40
  focus:outline-none
  focus:border-brand-500/50
  focus:ring-2 focus:ring-brand-500/20
  focus:inset-shadow-none
  transition-all duration-200
">
```

---

## 11. PERFORMANCE CHECKLIST

```html
<!-- ✅ GPU-optimized: use transform for all movement -->
<div class="translate-x-4">       <!-- not left-4 or margin-left -->
<div class="scale-90">            <!-- not width-[90%] -->
<div class="opacity-0">           <!-- for visibility changes -->

<!-- ✅ will-change for known animations -->
<div class="will-change-transform will-change-opacity">

<!-- ✅ contain for isolation -->
<div class="contain-layout contain-paint">

<!-- ✅ Reduce blur for mobile (expensive) -->
<div class="backdrop-blur-sm md:backdrop-blur-xl">

<!-- ✅ Prefers-reduced-motion -->
<div class="motion-safe:animate-float motion-reduce:transform-none">

<!-- ✅ Content-visibility for off-screen elements -->
<section class="content-visibility-auto [contain-intrinsic-size:_0_500px]">
```

---

## 12. ACCESSIBILITY BUILT-IN

```html
<!-- Screen reader only -->
<span class="sr-only">Alternative text for screen readers</span>

<!-- Focus visible (not focus — avoids annoying click outlines) -->
<button class="focus-visible:ring-2 focus-visible:ring-brand-500">

<!-- Skip link -->
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white">
  Skip to content
</a>

<!-- Aria-current for active nav -->
<a class="text-white/50 aria-[current=page]:text-white aria-[current=page]:font-semibold">

<!-- Disabled state -->
<button class="disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none">

<!-- Loading state -->
<button class="aria-busy:cursor-wait aria-busy:opacity-70">
```

---

## 13. `@layer` — CUSTOM UTILITIES & OVERRIDES

```css
/* Add custom utilities that work with Tailwind's system */
@layer utilities {
  .text-balance        { text-wrap: balance; }
  .text-pretty         { text-wrap: pretty; }
  .scrollbar-hidden    { scrollbar-width: none; &::-webkit-scrollbar { display: none } }
  .gpu                 { transform: translateZ(0); will-change: transform; }
  .clip-text           { -webkit-background-clip: text; background-clip: text; color: transparent; }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600
           text-white text-sm font-medium rounded-lg transition-all duration-200
           hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-500/30;
  }

  .card-glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6;
  }
}
```

> ⚠️ In v4, `@apply` uses cascade layers. Specificity behavior differs from v3.
> If `@apply` doesn't override, wrap in `@layer utilities { }`.

---

## 14. INTELLISENSE SETUP

VS Code: **Tailwind CSS IntelliSense v0.14+** (required for v4 utilities)

```json
// .vscode/settings.json
{
  "editor.quickSuggestions": { "strings": "on" },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### `cn()` / `clsx` + `cva` for conditional classes
```tsx
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

// Button variants with cva
const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        primary:  'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/30',
        ghost:    'bg-transparent text-white/60 hover:text-white border border-white/10',
        danger:   'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
      },
      size: {
        sm:  'text-xs px-3 py-1.5',
        md:  'text-sm px-5 py-2.5',
        lg:  'text-base px-7 py-3.5',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

// Usage
<button className={cn(button({ variant: 'ghost', size: 'lg' }), extraClass)}>
```

---

## 15. DEBUGGING v4

```
❌ Classes not applying?
   → Check: @import "tailwindcss" (not @tailwind directives)
   → Check: @tailwindcss/vite plugin registered in vite.config

❌ IntelliSense not showing v4 utilities?
   → Update to Tailwind CSS IntelliSense v0.14+

❌ @apply not overriding another style?
   → Wrap in @layer utilities { } for correct cascade specificity

❌ Custom colors not generating classes?
   → Naming must match: --color-* (not --colours-*, not --clr-*)
   → Same for --font-*, --breakpoint-*, --radius-*

❌ Colors broken in Safari 15?
   → v4.0 issue, fixed in v4.1 (oklab now falls back gracefully)

❌ @source not picking up files?
   → Add explicit: @source "../packages/ui/src";
```

---

## Quick Reference — v4.2 Cheat Sheet COMPLETO

| Need | v4 class | Versión |
|------|----------|---------|
| Text shadow (small) | `text-shadow-sm` | v4.1 |
| Text shadow (colored) | `text-shadow-lg text-shadow-violet-500/50` | v4.1 |
| Drop shadow (colored) | `drop-shadow-lg drop-shadow-pink-400/40` | v4.1 |
| Inner shadow | `inset-shadow-sm inset-shadow-black/40` | v4.0 |
| Inner ring | `inset-ring-1 inset-ring-white/20` | v4.0 |
| Auto-resize textarea | `field-sizing-content` | v4.0 |
| Entry animation | `starting:opacity-0 starting:translate-y-4 transition-all` | v4.0 |
| Container query | `@container` + `@sm:` `@md:` `@lg:` | v4.0 |
| Gradient angle | `bg-linear-45 from-violet-600 to-pink-500` | v4.0 |
| Gradient conic | `bg-conic from-blue-500 to-purple-500` | v4.0 |
| Gradient radial | `bg-radial from-violet-500/30 to-transparent` | v4.0 |
| Dark scrollbar | `color-scheme-dark` | v4.0 |
| 3D perspective | `perspective-1000 rotate-x-12 transform-style-3d` | v4.0 |
| Touch target | `pointer-coarse:p-5` | v4.1 |
| Gradient mask | `mask-b-from-80%` | v4.1 |
| Overflow wrap | `wrap-break-word` / `wrap-anywhere` | v4.1 |
| Safe alignment | `justify-safe-center items-safe-center` | v4.1 |
| Nth child | `nth-[odd]:bg-white/5 nth-3:font-bold` | v4.0 |
| Noscript | `noscript:hidden` | v4.1 |
| User valid | `user-valid:border-green-500` | v4.1 |
| **Webpack plugin** | `@tailwindcss/webpack` | **v4.2** |
| **Mauve color** | `bg-mauve-500 text-mauve-100` | **v4.2** |
| **Olive color** | `bg-olive-400 border-olive-600` | **v4.2** |
| **Mist color** | `bg-mist-200 text-mist-800` | **v4.2** |
| **Taupe color** | `bg-taupe-300 text-taupe-900` | **v4.2** |
| **Padding block** | `pbs-4 pbe-8` | **v4.2** |
| **Margin block** | `mbs-6 mbe-2` | **v4.2** |
| **Border block** | `border-bs border-be border-gray-300` | **v4.2** |
| **Logical inset** | `inset-bs-0 inset-be-0 inset-s-4` | **v4.2** |
| **Logical width** | `inline-64 min-inline-0 max-inline-full` | **v4.2** |
| **Logical height** | `block-32 min-block-screen` | **v4.2** |
| **Font features** | `font-features-['liga','tnum','frac']` | **v4.2** |
| **start-* deprecado** | Usar `inline-s-*` en su lugar | **v4.2** |
| **end-* deprecado** | Usar `inline-e-*` en su lugar | **v4.2** |

## Reference Files

- `references/components.md` — Full button, card, form, modal, nav patterns
- `references/animation.md` — Complex animation sequences, Motion library integration
- `references/design-system.md` — Design token naming conventions, OKLCH color scale, typography
- `references/v42-migration.md` — Guía de migración v3→v4, cambios breaking, deprecaciones
