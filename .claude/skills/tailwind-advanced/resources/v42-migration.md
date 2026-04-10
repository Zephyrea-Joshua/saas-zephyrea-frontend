# Migración v3 → v4.2 y Breaking Changes

## MIGRACIÓN AUTOMÁTICA

```bash
npx @tailwindcss/upgrade   # maneja ~90% de cambios mecánicos
```

Revisa manualmente: plugins custom, configuraciones complejas, usos de `@apply`.

---

## BREAKING CHANGES v3 → v4

### 1. Instalación
```bash
# v3
npm install tailwindcss postcss autoprefixer

# v4.2
npm install tailwindcss @tailwindcss/vite   # Vite
npm install @tailwindcss/webpack            # webpack (nuevo en v4.2)
npm install @tailwindcss/postcss            # PostCSS (si no es Vite/webpack)
```

### 2. CSS Entry Point
```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4.2 — una sola línea */
@import "tailwindcss";
```

### 3. Configuración
```js
// v3 — tailwind.config.js requerido
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { brand: '#6C2BFF' } } },
}

// v4.2 — todo en CSS, config.js opcional
```

```css
/* v4.2 — globals.css */
@import "tailwindcss";

@theme {
  --color-brand: #6C2BFF;
  /* content detection: automático, no se configura */
}

/* Si necesitas JS config (plugins legacy): */
@config "./tailwind.config.js";
```

### 4. Clases renombradas (v3 → v4 canonical)
```
bg-gradient-to-r        → bg-linear-to-r     (o bg-linear-90)
bg-gradient-to-br       → bg-linear-to-br
bg-opacity-50           → bg-black/50         (opacity modifier nativo)
text-opacity-75         → text-white/75
border-opacity-25       → border-white/25
flex-shrink             → shrink              ← CUIDADO: breaking rename
flex-shrink-0           → shrink-0
flex-grow               → grow
flex-grow-0             → grow-0
overflow-ellipsis       → text-ellipsis
decoration-clone        → box-decoration-clone
decoration-slice        → box-decoration-slice
shadow-sm               → shadow-sm           (sin cambio)
ring-offset-*           → outline-offset-* (en muchos casos)
```

### 5. `@apply` en v4 — comportamiento diferente
```css
/* v3: @apply funcionaba en cualquier lugar */
.btn { @apply px-4 py-2 rounded; }

/* v4: usa cascade layers — si no funciona, envuelve en @layer */
@layer components {
  .btn { @apply px-4 py-2 rounded; }
}

/* Mejor práctica v4: usar @utility para utilities custom */
@utility scrollbar-hidden {
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
```

### 6. Plugins — nueva API
```js
// v3
const plugin = require('tailwindcss/plugin')
module.exports = plugin(({ addUtilities }) => {
  addUtilities({ '.clip-text': { '-webkit-background-clip': 'text' } })
})

// v4 — directamente en CSS con @utility
@utility clip-text {
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

---

## v4.2 DEPRECACIONES

```html
<!-- ❌ DEPRECATED en v4.2 -->
<div class="start-4">   → <div class="inline-s-4">
<div class="end-4">     → <div class="inline-e-4">

<!-- El upgrade tool los renombra automáticamente -->
```

---

## BROWSER SUPPORT v4.x

```
✅ Chrome 111+     (Marzo 2023)
✅ Safari 16.4+    (Marzo 2023)
✅ Firefox 128+    (Julio 2024)
✅ Edge 111+

❌ IE11 — no soportado
❌ Safari 15 — v4.0 tenía bugs; v4.1+ mejora degradación pero no es ideal

Si necesitas Safari 15: usa v3 o aplica polyfills selectivos.
```

---

## PERFORMANCE v4.x — Números Reales

| Métrica | v3 | v4.0 | v4.2 |
|---------|----|----|-----|
| Full build | baseline | 3.5–5x faster | ← |
| Incremental (nuevo CSS) | baseline | 8x faster | ← |
| Incremental (sin nuevo CSS) | baseline | 100x faster | ← |
| Recompilación | baseline | ← | **+3.8x** |
| CSS output (gzip) | 22–35KB | 15–25KB | ← |
| Instalación footprint | ~35MB | ~23MB (-35%) | ← |

---

## MANTENER JS CONFIG (proyectos existentes)

Si tienes plugins v3 que no puedes migrar aún:

```css
/* globals.css */
@import "tailwindcss";
@config "./tailwind.config.js";  /* carga tu config legacy */
```

```js
// tailwind.config.js — funciona en v4 con @config
module.exports = {
  theme: { extend: {} },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
```

> Los plugins oficiales de Tailwind (forms, typography, aspect-ratio) tienen versiones v4-compatible. Actualiza con `npm update`.
