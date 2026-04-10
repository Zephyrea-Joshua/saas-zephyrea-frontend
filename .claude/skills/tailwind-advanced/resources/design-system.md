# Design System Reference

## TOKEN NAMING CONVENTION (Tailwind v4)

Tokens MUST use these prefixes to auto-generate utilities:

| Prefix | Generates | Example |
|--------|-----------|---------|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `ring-*`, `shadow-*` | `--color-brand-500` |
| `--font-*` | `font-*` | `--font-display` |
| `--text-*` | `text-*` (size) | `--text-hero` |
| `--spacing-*` | `p-*`, `m-*`, `w-*`, `h-*`, `gap-*` | `--spacing-18` |
| `--breakpoint-*` | `sm:`, `md:`, `lg:` prefixes | `--breakpoint-3xl` |
| `--radius-*` | `rounded-*` | `--radius-card` |
| `--shadow-*` | `shadow-*` | `--shadow-glow` |
| `--animate-*` | `animate-*` | `--animate-float` |
| `--ease-*` | Used in `duration-*/ease-*` | `--ease-spring` |

---

## OKLCH COLOR SYSTEM (v4 default)

v4 uses **P3 wide-gamut colors** by default via OKLCH. They are 25% more vibrant than sRGB and fall back automatically on older displays.

```css
/* OKLCH syntax: oklch(lightness chroma hue) */

/* Hue reference */
/* 0–30    = Red/Pink */
/* 30–90   = Orange/Yellow */
/*90–150  = Yellow/Green */
/* 150–210 = Green/Teal */
/* 210–270 = Cyan/Blue */
/* 270–330 = Blue/Violet */
/* 330–360 = Violet/Pink */

@theme {
  /* Complete palette generation */
  --color-brand-50:  oklch(0.97 0.02 280);
  --color-brand-100: oklch(0.94 0.05 280);
  --color-brand-200: oklch(0.89 0.09 280);
  --color-brand-300: oklch(0.82 0.14 280);
  --color-brand-400: oklch(0.72 0.20 280);
  --color-brand-500: oklch(0.60 0.25 280);  /* PRIMARY */
  --color-brand-600: oklch(0.52 0.27 280);
  --color-brand-700: oklch(0.44 0.24 280);
  --color-brand-800: oklch(0.34 0.19 280);
  --color-brand-900: oklch(0.22 0.13 280);
  --color-brand-950: oklch(0.14 0.09 280);
}
```

### Semantic color tokens
```css
@theme {
  /* Semantic layer — these change in dark mode */
  --color-background:    var(--color-gray-950);
  --color-surface:       var(--color-gray-900);
  --color-surface-hover: var(--color-gray-800);
  --color-border:        oklch(0.25 0 0);
  --color-border-hover:  oklch(0.35 0 0);
  --color-text:          oklch(0.96 0 0);
  --color-text-muted:    oklch(0.55 0 0);
  --color-text-subtle:   oklch(0.35 0 0);
  --color-primary:       var(--color-brand-500);
  --color-primary-hover: var(--color-brand-600);
}
```

---

## TYPOGRAPHY SCALE

### Fluid type with `clamp()`
```css
@theme {
  /* Fluid — scales smoothly between viewport sizes */
  --text-hero:       clamp(3.5rem, 12vw, 10rem);
  --text-display:    clamp(2.5rem, 7vw, 6rem);
  --text-title:      clamp(1.75rem, 4vw, 3rem);
  --text-subtitle:   clamp(1.25rem, 2.5vw, 1.75rem);

  /* Fixed scale */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
}
```

### Font pairing rules
```
Display font → headings, hero, brand names (Unbounded, Clash, Cabinet)
Body font    → paragraphs, labels, UI text (DM Sans, Inter, Geist)
Mono font    → code, data, numbers (JetBrains Mono, Geist Mono)

Line heights:
  Hero:      0.85–0.92 (tight)
  Heading:   1.1–1.2
  Body:      1.5–1.7 (readable)
  Label:     1.0–1.2

Tracking (letter-spacing):
  Display:   -0.03em to -0.05em (negative = modern)
  Body:      0 to 0.01em
  Eyebrow:   0.15em to 0.3em (UPPERCASE labels)
  Caption:   0.05em to 0.1em
```

---

## SPACING SYSTEM

Tailwind v4 default: `--spacing: 0.25rem` (1 unit = 4px)

```
1 = 4px
2 = 8px
3 = 12px
4 = 16px
5 = 20px
6 = 24px
8 = 32px
10 = 40px
12 = 48px
16 = 64px
20 = 80px
24 = 96px
32 = 128px
```

### Section spacing pattern
```css
@theme { --spacing-section: clamp(4rem, 10vw, 10rem); }
```

```html
<section class="py-[--spacing-section]">
```

---

## Z-INDEX LAYERS

```css
@theme {
  --z-below:       -1;
  --z-base:        0;
  --z-raised:      10;
  --z-dropdown:    100;
  --z-sticky:      200;
  --z-overlay:     300;
  --z-modal:       400;
  --z-toast:       500;
  --z-tooltip:     600;
}
```

---

## RESPONSIVE STRATEGY

```
1. Mobile-first default (no prefix)
2. sm: (640px) — tablet portrait
3. md: (768px) — tablet landscape
4. lg: (1024px) — desktop
5. xl: (1280px) — wide desktop
6. 2xl: (1536px) — ultrawide

Custom breakpoints in @theme:
  --breakpoint-xs: 30rem    (480px, large phone)
  --breakpoint-3xl: 120rem  (1920px, 4K)
```

```html
<!-- Pattern: stack on mobile, side-by-side on desktop -->
<div class="flex flex-col gap-4 md:flex-row">

<!-- Pattern: single col → auto-fit responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- or better with container queries: -->
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
```

---

## ELEVATION SYSTEM

```css
@theme {
  /* Cards at different heights above background */
  --shadow-sm:       0 1px 2px oklch(0 0 0 / 0.4);
  --shadow-DEFAULT:  0 4px 6px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(1 0 0 / 0.04);
  --shadow-md:       0 6px 24px oklch(0 0 0 / 0.4), 0 0 0 1px oklch(1 0 0 / 0.06);
  --shadow-lg:       0 12px 48px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.08);
  --shadow-xl:       0 24px 80px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 0.1);

  /* Glow shadows (colored) */
  --shadow-glow-brand:  0 0 60px var(--color-brand-500) / 0.25;
  --shadow-glow-sm:     0 0 20px var(--color-brand-500) / 0.15;
}
```
