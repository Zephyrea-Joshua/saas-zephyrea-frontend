export const landingNavLinks = [
  { href: '#producto', label: 'Producto' },
  { href: '#features', label: 'Funcionalidades' },
  { href: '#contact', label: 'Contacto' },
] as const

export type NavLink = (typeof landingNavLinks)[number]
