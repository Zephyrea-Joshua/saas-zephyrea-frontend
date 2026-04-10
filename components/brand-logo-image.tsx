'use client'

import Image, { type ImageProps } from 'next/image'

import { cn } from '@/lib/utils'

export type BrandLogoImageProps = Omit<
  ImageProps,
  'draggable' | 'onDragStart' | 'onContextMenu'
>

/**
 * Imagen de marca: reduce arrastre, guardado por clic derecho y selección.
 * No sustituye medidas legales ni evita que alguien copie desde red/DevTools.
 */
export function BrandLogoImage({ className, ...props }: BrandLogoImageProps) {
  return (
    <Image
      {...props}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      className={cn('select-none [-webkit-user-drag:none]', className)}
    />
  )
}
