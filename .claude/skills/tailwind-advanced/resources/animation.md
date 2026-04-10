# Animation Reference — Tailwind + Motion Library

## PURE CSS ANIMATIONS (zero JS, Tailwind v4)

### `@starting-style` — Entry animations on mount
```html
<!-- Fade up on mount -->
<div class="
  starting:opacity-0
  starting:translate-y-6
  starting:blur-sm
  opacity-100 translate-y-0 blur-0
  transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
">

<!-- Scale in -->
<div class="starting:scale-90 starting:opacity-0 scale-100 opacity-100 transition-all duration-500">

<!-- Slide from right -->
<div class="starting:translate-x-8 starting:opacity-0 transition-all duration-500 delay-150">
```

### CSS Stagger via `nth-*` + `animation-delay`
```html
<ul>
  <li class="nth-1:delay-0 nth-2:delay-75 nth-3:delay-150 nth-4:delay-225
             starting:opacity-0 starting:translate-y-3
             transition-all duration-500">
```

### Pure CSS Hover effects (no JS)
```html
<!-- Card tilt on hover (CSS only, no JS) -->
<div class="
  group relative
  transition-transform duration-300
  hover:rotate-x-2 hover:rotate-y-1
  perspective-1000 transform-style-3d
">

<!-- Underline reveal -->
<a class="
  relative
  after:absolute after:bottom-0 after:left-0
  after:h-px after:w-0 after:bg-current
  after:transition-[width] after:duration-300
  hover:after:w-full
">

<!-- Fill button -->
<button class="
  relative overflow-hidden
  before:absolute before:inset-0
  before:translate-x-[-100%] before:bg-white/10
  before:transition-transform before:duration-300
  hover:before:translate-x-0
">
```

---

## MOTION LIBRARY PATTERNS (for Next.js)

### Page entrance (stagger children)
```tsx
import { motion } from "motion/react"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.div key={i} variants={item}>{i}</motion.div>
  ))}
</motion.div>
```

### Scroll-triggered reveal
```tsx
import { motion, useInView } from "motion/react"
import { useRef } from "react"

function RevealSection({ children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

### Letter-by-letter split text
```tsx
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden:  { opacity: 0, y: '0.4em', scaleY: 0.7, filter: 'blur(6px)' },
            visible: {
              opacity: 1, y: 0, scaleY: 1, filter: 'blur(0px)',
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            },
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
```

### Magnetic button
```tsx
function MagneticButton({ children, className }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const handleMove = (e: MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className={className}
    >
      {children}
    </motion.button>
  )
}
```

### Smooth number counter
```tsx
import { useSpring, useTransform, motion, animate } from "motion/react"

function Counter({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [to])

  return <motion.span>{rounded}</motion.span>
}
```

---

## PERFORMANCE RULES (Animation)

```
✅ SAFE: transform, opacity, filter (blur), clip-path
✅ SAFE: backdrop-filter (GPU layer)
✅ USE: will-change-transform on known animation targets
✅ USE: motion-safe: prefix for accessibility
✅ USE: contain-layout on card grids

❌ AVOID: width/height animation
❌ AVOID: top/left/right/bottom
❌ AVOID: margin/padding
❌ AVOID: background-color direct (use opacity wrapper)
❌ AVOID: box-shadow changes (causes repaint; use opacity on ::after instead)

SHADOW ANIMATION TRICK:
- Add ::after with shadow, opacity: 0
- On hover: opacity: 1 (GPU-safe)
- Instead of: hover:shadow-xl (causes layout repaint)
```

```html
<!-- Shadow on hover — GPU optimized via ::after -->
<div class="
  relative
  after:absolute after:inset-0 after:rounded-2xl after:opacity-0
  after:shadow-[0_20px_60px_violet-500/30]
  after:transition-opacity after:duration-300
  hover:after:opacity-100
">
```
