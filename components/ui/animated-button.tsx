'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface CustomCSSProperties extends React.CSSProperties {
  '--shimmer-color'?: string;
  '--radius'?: string;
  '--speed'?: string;
  '--cut'?: string;
  '--bg'?: string;
  '--spread'?: string;
  '--border-width'?: string;
  '--border-segment'?: string;
}

/** Paleta alineada al hero (sky-300/400, fondo #020203) */
const buttonVariants = cva(
  'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap bg-transparent transform-gpu transition-all duration-300 ease-in-out active:translate-y-px',
  {
    variants: {
      variant: {
        default:
          'border border-sky-400/30 text-white hover:text-sky-100',
        outline:
          'border border-sky-400/45 text-sky-100 hover:border-sky-300/70 hover:text-white',
        ghost:
          'border border-transparent text-sky-200/90 hover:bg-sky-500/10 hover:text-white',
        glow: 'border border-sky-400/35 text-white hover:text-sky-50',
        whatsapp:
          'border border-emerald-400/40 text-white hover:border-emerald-300/60 hover:text-white',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 py-1 text-xs',
        lg: 'min-h-[3rem] px-8 py-3.5 text-base md:min-h-[3.25rem] md:px-8 md:py-4 md:text-lg',
        icon: 'h-10 w-10',
      },
      glow: {
        true: 'hover:shadow-[0_0_8px_rgba(56,189,248,0.45),0_0_28px_rgba(56,189,248,0.2)]',
        false: '',
      },
      textEffect: {
        normal: 'group-hover:tracking-normal',
        spread: 'group-hover:tracking-wider',
      },
      uppercase: {
        true: '',
        false: '',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
        none: 'rounded-none',
        custom: 'rounded-[0.95rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: false,
      textEffect: 'normal',
      uppercase: false,
      rounded: 'custom',
    },
  },
);

export interface AnimatedButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  hideAnimations?: boolean;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  style?: CustomCSSProperties;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      textEffect,
      uppercase,
      rounded,
      asChild = false,
      hideAnimations = false,
      shimmerColor = '#38bdf8',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(2, 2, 3, 0.94)',
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const combinedStyle: CustomCSSProperties = {
      ...style,
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
      '--spread': '90deg',
      borderRadius: rounded === 'custom' ? borderRadius : undefined,
    };

    const buttonStyle = `
      @keyframes animatedButton-shimmer-slide {
        to {
          transform: translate(calc(100cqw - 100%), 0);
        }
      }
      
      @keyframes animatedButton-spin-around {
        0% {
          transform: translateZ(0) rotate(0);
        }
        15%, 35% {
          transform: translateZ(0) rotate(90deg);
        }
        65%, 85% {
          transform: translateZ(0) rotate(270deg);
        }
        100% {
          transform: translateZ(0) rotate(360deg);
        }
      }
      
      @keyframes animatedButton-spread {
        0% {
          letter-spacing: normal;
          transform: perspective(var(--radius)) rotateY(0deg);
        }
        50% {
          letter-spacing: var(--cut);
          transform: perspective(var(--radius)) rotateY(var(--spread));
        }
        100% {
          letter-spacing: normal;
          transform: perspective(var(--radius)) rotateY(0deg);
        }
      }
      
      .animate-shimmer-slide-scoped {
        animation: animatedButton-shimmer-slide var(--speed) ease-in-out infinite alternate;
      }
      
      .animate-spin-around-scoped {
        animation: animatedButton-spin-around calc(var(--speed) * 2) infinite linear;
      }
      
      .has-animate-spread > span {
        animation: animatedButton-spread calc(var(--speed) * 3) ease-in-out infinite;
      }
      
      .shadow-glow-scoped {
        box-shadow: 0 0 6px var(--shimmer-color), 0 0 22px var(--shimmer-color);
      }

      /* Mobile optimization scoped to this component */
      @media (max-width: 768px) {
        .animated-button-mobile {
          --radius: 60px;
          --speed: 2.5s;
          --cut: 0.03em;
        }
      }
    `;

    return (
      <Comp
        className={cn(
          'animated-button animated-button-mobile',
          buttonVariants({
            variant,
            size,
            glow,
            textEffect,
            uppercase,
            rounded,
            className,
          }),
          glow && 'shadow-glow-scoped',
        )}
        style={combinedStyle}
        ref={ref}
        {...props}
      >
        <style jsx>{buttonStyle}</style>

        {!hideAnimations && (
          <div className='absolute inset-0 overflow-visible -z-30 blur-[2px] @container-[size]'>
            <div className='absolute inset-0 h-[100cqh] animate-shimmer-slide-scoped aspect-[1]'>
              <div className='absolute -inset-full w-auto rotate-0 animate-spin-around-scoped [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]' />
            </div>
          </div>
        )}

        <div className='absolute size-full rounded-2xl px-4 py-1.5 text-sm font-medium' />

        <div
          className='absolute -z-20 [background:var(--bg)]'
          style={{ inset: shimmerSize, borderRadius }}
        />

        <span
          className={cn(
            'relative z-10 transition-all duration-300 flex items-center justify-center',
            textEffect === 'spread' && 'group-hover:tracking-wider',
          )}
        >
          {children}
        </span>
      </Comp>
    );
  },
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton, buttonVariants };
