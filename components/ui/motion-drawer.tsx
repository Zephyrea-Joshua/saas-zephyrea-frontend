'use client';
import React, { useState, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SideMenuDirection = 'left' | 'right';
export type ButtonOpeningVariants = 'push' | 'merge' | 'stay';

interface SideMenuProps {
  overlayColor?: string;
  width?: number;
  direction?: SideMenuDirection;
  backgroundColor?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  showToggleButton?: boolean;
  toggleButtonText?: { open: string; close: string };
  btnClassName?: string;
  className?: string;
  contentClassName?: string;
  clsBtnClassName?: string;
  overlayClassName?: string;
  animationConfig?: {
    type?: 'spring' | 'tween';
    damping?: number;
    stiffness?: number;
    duration?: number;
  };
  enableDrag?: boolean;
  dragThreshold?: number;
  buttonOpeningVariants?: ButtonOpeningVariants;
}

/**
 * Button open/close variants.
 * borderRadius removed intentionally — it triggers paint, not compositor.
 * Only transform (x, scale) and opacity are GPU-safe.
 */
const getOpenButtonVariants = (
  direction: SideMenuDirection,
  width: number,
  type: ButtonOpeningVariants
) => {
  switch (type) {
    case 'merge':
      return direction === 'left'
        ? { closed: { x: 0, opacity: 1, scale: 1 }, open: { x: width - 68, opacity: 0, scale: 0.9 } }
        : { closed: { x: 0, opacity: 1, scale: 1 }, open: { x: 68 - width, opacity: 0, scale: 0.9 } };
    case 'push':
      return direction === 'left'
        ? { closed: { x: 0, opacity: 1 }, open: { x: width + 20, opacity: 0 } }
        : { closed: { x: 0, opacity: 1 }, open: { x: -(width + 20), opacity: 0 } };
    case 'stay':
    default:
      return { closed: { x: 0, opacity: 1 }, open: { x: 0, opacity: 0 } };
  }
};

const MotionDrawer: React.FC<SideMenuProps> = ({
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  width = 250,
  direction = 'left',
  backgroundColor = '#ffffff',
  children,
  isOpen: controlledIsOpen,
  onToggle,
  showToggleButton = true,
  btnClassName = '',
  clsBtnClassName = '',
  className = '',
  contentClassName = '',
  overlayClassName = '',
  /*
   * Near-critically-damped spring (ratio ≈ 0.89).
   * restDelta/restSpeed cut the tail so motion stops early.
   * Old default { damping:25, stiffness:120 } had ratio 1.14 → overdamped/sluggish.
   */
  animationConfig = { type: 'spring', damping: 32, stiffness: 320, restDelta: 0.5, restSpeed: 0.5 } as any,
  enableDrag = true,
  dragThreshold = 0.3,
  buttonOpeningVariants = 'merge',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (value: boolean) => {
    if (controlledIsOpen === undefined) setInternalIsOpen(value);
    onToggle?.(value);
  };

  /**
   * Scroll lock.
   * useLayoutEffect = synchronous before paint, so the layout is already stable
   * when the first animation frame is rendered (no mid-animation reflow).
   * We compensate for scrollbar width to avoid a layout shift on desktop.
   * On mobile, innerWidth − clientWidth is typically 0 (overlay scrollbar).
   */
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (isOpen) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (sw > 0) document.body.style.paddingRight = `${sw}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const closedX = direction === 'left' ? -width : width;
  const buttonVariants = getOpenButtonVariants(direction, width, buttonOpeningVariants);
  const drawerPositionClass = direction === 'left' ? 'left-0' : 'right-0';
  const openBtnPositionClass = direction === 'left' ? 'top-4 left-4' : 'top-4 right-4';

  const getDragConstraints = () =>
    direction === 'left' ? { left: -width, right: 0 } : { left: 0, right: width };

  const handleDragEnd = (_e: any, info: any) => {
    if (!enableDrag) return;
    const threshold = width * dragThreshold;
    if (direction === 'left') {
      if (info.offset.x < 0 && Math.abs(info.offset.x) > threshold && isOpen) setIsOpen(false);
    } else {
      if (info.offset.x > 0 && Math.abs(info.offset.x) > threshold && isOpen) setIsOpen(false);
    }
  };

  return (
    <>
      {/* Open button */}
      {showToggleButton && (
        <motion.button
          className={cn(`fixed z-[99] cursor-pointer text-primary ${openBtnPositionClass}`, btnClassName)}
          onClick={() => setIsOpen(true)}
          variants={buttonVariants}
          animate={isOpen ? 'open' : 'closed'}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu />
        </motion.button>
      )}

      {/*
       * ── Drawer shell — ALWAYS in the DOM ────────────────────────────────
       *
       * Core optimisation: we never mount/unmount the panel.
       * Opening the drawer = changing `animate.x` on an already-composited
       * GPU layer → 0 layout, 0 paint, pure compositor work.
       *
       * With AnimatePresence + conditional render (previous impl), React had
       * to create ~60 DOM nodes (nav items, SVG icons…) in the same frame
       * the animation started, stealing the first 2–3 frames → jank.
       *
       * `inert` blocks focus traversal and pointer events for all descendants
       * while closed, without removing them from the DOM.
       */}
      <div
        className={`fixed inset-0 z-[9999] ${className}`}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        inert={!isOpen || undefined}
      >
        {/* Overlay — fade in/out, no mount cost */}
        <motion.div
          className={`absolute inset-0 ${overlayClassName}`}
          style={{ backgroundColor: overlayColor }}
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={() => setIsOpen(false)}
        />

        {/*
         * Panel — always composited on GPU via willChange: transform.
         * initial={false} skips the mount animation; on first render the panel
         * is immediately placed at x=closedX (off-screen) with no animation.
         */}
        <motion.div
          className={`absolute h-full ${drawerPositionClass} ${contentClassName}`}
          style={{
            backgroundColor,
            width: `${width}px`,
            padding: '60px 24px 24px 24px',
            boxSizing: 'border-box',
            willChange: 'transform',
            boxShadow: '8px 0 32px rgba(0,0,0,0.35)',
          }}
          initial={false}
          animate={{ x: isOpen ? 0 : closedX }}
          transition={animationConfig}
          drag={enableDrag ? 'x' : false}
          dragElastic={0.08}
          dragConstraints={getDragConstraints()}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
        >
          {/* Close button */}
          {showToggleButton && (
            <motion.button
              className={cn('absolute top-3 right-4 cursor-pointer p-2 text-black', clsBtnClassName)}
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <X size={20} />
            </motion.button>
          )}

          {/* Content */}
          <div className="h-full overflow-y-auto">{children}</div>
        </motion.div>
      </div>
    </>
  );
};

export default MotionDrawer;
