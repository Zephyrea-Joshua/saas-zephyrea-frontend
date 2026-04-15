import { type HTMLMotionProps, motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';
import React, { useLayoutEffect, useState } from 'react';

type TimelineContentProps<T extends keyof HTMLElementTagNameMap> = {
  children?: React.ReactNode;
  animationNum: number;
  className?: string;
  timelineRef: React.RefObject<HTMLElement | null>;
  as?: T;
  customVariants?: Variants;
  once?: boolean;
  /** Segundos entre cada `animationNum` (por defecto 0.5; el hero usa ~0.05). */
  delayStep?: number;
  duration?: number;
  /**
   * Evita esperar al IntersectionObserver (un frame o más tras hidratar).
   * Úsalo solo en hero / header above-the-fold.
   */
  instantInView?: boolean;
} & HTMLMotionProps<T>;

export const TimelineAnimation = <
  T extends keyof HTMLElementTagNameMap = 'div',
>({
  children,
  animationNum,
  timelineRef,
  className,
  as,
  customVariants,
  once = true,
  delayStep = 0.5,
  duration = 0.55,
  instantInView = false,
  ...props
}: TimelineContentProps<T>) => {
  const [layoutReady, setLayoutReady] = useState(false);

  useLayoutEffect(() => {
    if (instantInView) setLayoutReady(true);
  }, [instantInView]);

  /* Sin blur en hidden: el salto blur(20px)→0 provocaba movimiento/brinco al hidratar. */
  const defaultSequenceVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * delayStep,
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hidden: {
      y: 10,
      opacity: 0,
    },
  };

  const sequenceVariants = customVariants || defaultSequenceVariants;

  const isInView = useInView(timelineRef, {
    once,
    amount: 0.15,
    margin: '0px 0px -8% 0px',
  });

  const shouldAnimate = instantInView ? layoutReady : isInView;

  const MotionComponent = motion[as || 'div'] as React.ElementType;

  return (
    <MotionComponent
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={sequenceVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
