import { type HTMLMotionProps, motion, useInView } from 'motion/react';
import type React from 'react';
import type { Variants } from 'motion/react';

type TimelineContentProps<T extends keyof HTMLElementTagNameMap> = {
  children?: React.ReactNode;
  animationNum: number;
  className?: string;
  timelineRef: React.RefObject<HTMLElement | null>;
  as?: T;
  customVariants?: Variants;
  once?: boolean;
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
  ...props
}: TimelineContentProps<T>) => {
  /* Sin blur en hidden: el salto blur(20px)→0 provocaba movimiento/brinco al hidratar. */
  const defaultSequenceVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.5,
        duration: 0.55,
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

  const MotionComponent = motion[as || 'div'] as React.ElementType;

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={sequenceVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
