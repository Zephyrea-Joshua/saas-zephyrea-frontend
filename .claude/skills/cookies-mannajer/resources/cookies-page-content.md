# Contenido — Página `/cookies`

Plantilla de contenido lista para adaptar. Reemplaza `[MARCA]`, `[dominio]` y las tablas.

---

## Metadatos de la página

```typescript
export const metadata: Metadata = buildMetadata({
  title: 'Política de Cookies',
  description: 'Información sobre el uso de cookies en [dominio] conforme a la LFPDPPP 2025.',
  path: '/cookies',
})
```

---

## Estructura de la página

```
H1: Política de Cookies
    Última actualización: [fecha]

H2: ¿Qué son las cookies?
H2: Tipos de cookies que utilizamos
    H3: 🔒 Cookies esenciales (siempre activas)
        [tabla]
    H3: ⚙️ Cookies de preferencias
        [tabla]
    H3: 📊 Cookies analíticas
        [tabla]
    H3: 📣 Cookies de marketing
        [tabla]
H2: Cómo gestionar sus cookies
    H3: Desde nuestro panel
    H3: Desde su navegador
H2: Base legal del tratamiento
H2: Contacto
```

---

## Texto para cada sección

### ¿Qué son las cookies?

Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita
un sitio web. Permiten al sitio recordar sus acciones y preferencias durante un período de
tiempo determinado, para que no tenga que volver a configurarlas cada vez que visite el sitio
o navegue entre páginas.

### Texto intro para esenciales

Son estrictamente necesarias para el funcionamiento básico del sitio web.
Sin ellas, el sitio no puede operar correctamente. **No pueden desactivarse** conforme
al Art. 14 fracc. I de la LFPDPPP 2025, ya que su tratamiento se basa en interés legítimo
y necesidad contractual.

### Texto intro para preferencias

Permiten que el sitio recuerde las elecciones que ha realizado (como su tema preferido o
idioma) para ofrecerle una experiencia personalizada. Se activan únicamente con su
consentimiento previo.

### Texto intro para analíticas

Nos ayudan a entender cómo interactúan los usuarios con el sitio, qué páginas visitan
con más frecuencia y dónde encuentran dificultades. Toda la información se recopila de
forma anónima y agregada. Se activan únicamente con su consentimiento previo.

### Texto intro para marketing

Permiten rastrear visitantes en distintos sitios web con el objetivo de mostrar publicidad
relevante y medida. Se activan únicamente con su consentimiento previo.

---

## Tablas de cookies por categoría

### Esenciales

| Cookie | Propósito | Duración | Tipo |
|--------|-----------|----------|------|
| `[app]_cookie_consent` | Guarda sus preferencias de consentimiento de cookies | 1 año | Propia |
| `__Host-next-auth.csrf-token` | Protección CSRF para formularios y autenticación | Sesión | Propia |
| `__Secure-next-auth.session-token` | Mantiene su sesión activa cuando está autenticado | 30 días | Propia |

### Preferencias

| Cookie | Propósito | Duración | Tipo |
|--------|-----------|----------|------|
| `[app]_theme` | Guarda el tema seleccionado (oscuro / claro) | 1 año | Propia |
| `[app]_lang` | Guarda el idioma preferido | 1 año | Propia |

### Analíticas

| Cookie | Propósito | Duración | Tipo |
|--------|-----------|----------|------|
| `_ga` | Google Analytics: distingue sesiones de usuarios únicos | 2 años | Tercero (Google LLC, EUA) |
| `_ga_*` | Google Analytics: almacena el estado de la sesión | 2 años | Tercero (Google LLC, EUA) |
| `_vercel_*` | Vercel Analytics: métricas de rendimiento del sitio | Sesión | Tercero (Vercel, Inc., EUA) |

### Marketing

| Cookie | Propósito | Duración | Tipo |
|--------|-----------|----------|------|
| `_fbp` | Facebook Pixel: identificación de visitantes para anuncios | 3 meses | Tercero (Meta Platforms, EUA) |

---

## Sección "Cómo gestionar sus cookies"

### Desde nuestro panel

Al ingresar por primera vez al sitio, aparece un banner donde puede aceptar todas las cookies,
rechazar las no esenciales, o configurar sus preferencias por categoría. Puede cambiar su
decisión en cualquier momento haciendo clic en **«Preferencias de cookies»** en el pie de página.

### Desde su navegador

También puede controlar las cookies directamente desde la configuración de su navegador:

- [Google Chrome](https://support.google.com/chrome/answer/95647)
- [Mozilla Firefox](https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias)
- [Safari](https://support.apple.com/es-mx/guide/safari/sfri11471/mac)
- [Microsoft Edge](https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d)

> **Nota:** deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web.

---

## Base legal del tratamiento

El uso de cookies en este sitio se fundamenta en:

- **Cookies esenciales:** interés legítimo y necesidad contractual (Art. 14 fracc. I y IV
  LFPDPPP 2025). No requieren consentimiento.
- **Cookies no esenciales:** consentimiento previo, libre, específico e informado del titular
  (Art. 8 LFPDPPP 2025). Solo se activan tras aceptación explícita.

---

## Contacto

Para cualquier consulta sobre el uso de cookies o para ejercer sus derechos ARCO:

- Correo: [correo de privacidad]
- También consulte nuestro [Aviso de Privacidad](/privacidad)