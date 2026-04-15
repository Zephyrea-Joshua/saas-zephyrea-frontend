"use client";

import { Suspense, useEffect, useState } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

/** Props exportadas desde Shader Gradient (editor); runtime acepta más campos que el .d.ts */
/** Valores del editor (waterPlane): si los colores son casi #000 + brightness muy bajo, el WebGL se ve “apagado” sobre fondo negro. */
const ZEPHYREA_GRADIENT_PROPS = {
  axesHelper: "off",
  brightness: 1,
  cAzimuthAngle: 180,
  cDistance: 4.4,
  cPolarAngle: 80,
  cameraZoom: 9.1,
  color1: "#606080",
  color2: "#4956ca",
  color3: "#212121",
  destination: "onCanvas",
  embedMode: "off",
  envPreset: "city" as const,
  format: "gif",
  fov: 50,
  frameRate: 10,
  gizmoHelper: "hide",
  grain: "on" as const,
  lightType: "3d" as const,
  pixelDensity: 1,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  range: "disabled" as const,
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 20,
  rotationY: 0,
  rotationZ: -60,
  shader: "defaults",
  type: "waterPlane" as const,
  uAmplitude: 0,
  uDensity: 1.5,
  uFrequency: 0,
  uSpeed: 0.5,
  uStrength: 1.5,
  uTime: 8,
  wireframe: false,
};

/**
 * Fondo WebGL global: fijo detrás de todo el sitio, sin lazy-load (no depende del viewport).
 * Optimización: pixelDensity 1, frameRate 10, animación pausada con pestaña oculta (ahorra GPU).
 */
export function ZephyreaShaderBackground() {
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const sync = () => setTabVisible(!document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full bg-[#020203] [&_canvas]:h-full [&_canvas]:w-full"
    >
      <Suspense fallback={<div className="h-full w-full bg-[#020203]" />}>
        <ShaderGradientCanvas
          className="h-full w-full"
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
          lazyLoad={true}
          pixelDensity={1}
          fov={50}
          pointerEvents="none"
          powerPreference="default"
        >
          <ShaderGradient
            {...ZEPHYREA_GRADIENT_PROPS}
            animate={tabVisible ? "on" : "off"}
          />
        </ShaderGradientCanvas>
      </Suspense>
    </div>
  );
}
