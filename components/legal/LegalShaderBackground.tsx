'use client'
import { Suspense, useEffect, useState } from 'react'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

/** Runtime acepta más props que el .d.ts — igual que ZephyreaShaderBackground */
const LEGAL_GRADIENT_PROPS = {
  axesHelper:    'off',
  brightness:    1.5,
  cAzimuthAngle: 250,
  cDistance:     1.5,
  cPolarAngle:   140,
  cameraZoom:    12.5,
  color1:        '#00006c',
  color2:        '#572a9b',
  color3:        '#000000',
  destination:   'onCanvas',
  embedMode:     'off',
  envPreset:     'city'      as const,
  format:        'gif',
  fov:           45,
  frameRate:     10,
  gizmoHelper:   'hide',
  grain:         'on'        as const,
  lightType:     '3d'        as const,
  pixelDensity:  1,
  positionX:     0,
  positionY:     0,
  positionZ:     0,
  range:         'disabled'  as const,
  rangeEnd:      40,
  rangeStart:    0,
  reflection:    0.5,
  rotationX:     0,
  rotationY:     0,
  rotationZ:     140,
  shader:        'defaults',
  type:          'sphere'    as const,
  uAmplitude:    7,
  uDensity:      0.8,
  uFrequency:    5.5,
  uSpeed:        0.3,
  uStrength:     0.4,
  uTime:         0,
  wireframe:     false,
}

export function LegalShaderBackground() {
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const sync = () => setTabVisible(!document.hidden)
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] [&_canvas]:h-full [&_canvas]:w-full"
    >
      <Suspense fallback={<div className="h-full w-full bg-[#00004a]" />}>
        <ShaderGradientCanvas
          className="h-full w-full"
          style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}
          lazyLoad={false}
          pixelDensity={1}
          fov={45}
          pointerEvents="none"
          powerPreference="default"
        >
          <ShaderGradient
            {...LEGAL_GRADIENT_PROPS}
            animate={tabVisible ? 'on' : 'off'}
          />
        </ShaderGradientCanvas>
      </Suspense>
    </div>
  )
}
