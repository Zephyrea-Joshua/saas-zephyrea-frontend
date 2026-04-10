/**
 * Navegación AetherOZ: módulos y enlaces alineados a lo que la landing irá mostrando.
 */
export type SaasNavItem = {
  title: string;
  description: string;
  href: string;
};

export const SAAS_PRODUCT: SaasNavItem[] = [
  {
    title: "Vacantes y reclutamiento",
    description:
      "Publica vacantes, embudo de candidatos y etapas claras sin hojas sueltas.",
    href: "#vacantes",
  },
  {
    title: "Formación y capacitación",
    description:
      "Asigna cursos, avisos y seguimiento sin perder el hilo en el correo.",
    href: "#formacion",
  },
  {
    title: "Indicadores y reportes",
    description:
      "Métricas de equipo y procesos en vistas simples, listas para compartir.",
    href: "#indicadores",
  },
  {
    title: "Registro y cumplimiento",
    description:
      "Evidencias, fechas y responsables cuando entra auditoría o revisión legal.",
    href: "#registro",
  },
  {
    title: "Plataforma unificada",
    description:
      "Un solo lugar para RH: roles, permisos y trámites del día a día.",
    href: "#producto",
  },
  {
    title: "Seguridad y permisos",
    description:
      "Quién ve qué, registros de acceso y buenas prácticas para datos sensibles.",
    href: "#seguridad",
  },
];

export const SAAS_SOLUTIONS: SaasNavItem[] = [
  {
    title: "Equipos de RH",
    description:
      "Centraliza vacantes, expediente y comunicación con managers y colaboradores.",
    href: "#soluciones-rh",
  },
  {
    title: "Operaciones y retail",
    description:
      "Turnos, capacitación en tienda y reportes sin depender de mil sistemas.",
    href: "#soluciones-operaciones",
  },
  {
    title: "Servicios y consultoría",
    description:
      "Onboarding de clientes, entregables y control de horas sin caos en Drive.",
    href: "#soluciones-servicios",
  },
  {
    title: "Multi-sede y franquicias",
    description:
      "Misma política en todas las ubicaciones con visibilidad por sede o región.",
    href: "#soluciones-multisede",
  },
];

export const SAAS_RESOURCES: SaasNavItem[] = [
  {
    title: "Centro de ayuda",
    description:
      "Respuestas por tema: vacantes, formación, permisos y primeros pasos.",
    href: "#ayuda",
  },
  {
    title: "Guía de inicio",
    description:
      "Cómo migrar desde hojas de cálculo o herramientas sueltas en pocas semanas.",
    href: "#guia",
  },
  {
    title: "Blog y novedades",
    description:
      "Mejoras del producto, buenas prácticas de RH y cumplimiento.",
    href: "#blog",
  },
  {
    title: "Estado del servicio",
    description:
      "Disponibilidad, incidentes y ventanas de mantenimiento comunicadas.",
    href: "#estado",
  },
];
