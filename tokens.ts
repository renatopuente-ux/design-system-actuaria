/**
 * DESIGN TOKENS — ACTUARIA DESIGN SYSTEM
 * Source: Figma — Design-System-Actuaria (Actualizado)
 * fileKey: N1wh3u4sX3UGyUU5oWOaz6
 * Last updated: 2026-04-08
 *
 * Uso: importar los valores tipados aquí cuando necesites tokens
 * en lógica JavaScript/TypeScript. Para estilos, importa
 * design-tokens.css y usa las CSS custom properties directamente.
 */

// ═══════════════════════════════════════════════════════════════
// COLORS — BRAND PRIMITIVES
// ═══════════════════════════════════════════════════════════════

export const brand = {
  /** Brand Navy — identidad principal, texto de marca */
  navy: '#151f47',
  /** Brand Indigo — CTAs, botones primarios, acciones interactivas */
  indigo: '#4c64d9',
  /** Dark Surface — fondo base modo oscuro */
  darkSurface: '#12131a',

  /** Escala Brand (azul marino) */
  scale: {
    50:   '#edf0fb',
    100:  '#d0d8f5',
    200:  '#a1b0eb',
    300:  '#7289e1',
    400:  '#4c64d9',
    500:  '#3a4fb8',
    600:  '#2d3d99',
    700:  '#212d7a',
    800:  '#151f47',
    900:  '#0c1230',
    1000: '#060917',
  },

  /** Escala Brand Alt (azul interactivo) */
  alt: {
    50:   '#eef1fd',
    100:  '#d5dcfa',
    200:  '#aab9f5',
    300:  '#7f95f0',
    400:  '#6078ec',
    500:  '#4c64d9',
    600:  '#3a4fb8',
    700:  '#2d3d99',
    800:  '#212d7a',
    1000: '#0d1540',
  },

  /** Escala Brand Dark Compass (azul profundo — navegación) */
  compass: {
    50:  '#e8eaf4',
    200: '#b3bbdf',
    500: '#4c5a9e',
    800: '#151f47',
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// COLORS — NEUTRAL
// ═══════════════════════════════════════════════════════════════

export const neutral = {
  white:   '#FFFFFF',
  black:   '#000000',
  0:       '#FFFFFF',
  50:      '#F9FAFB',
  100:     '#F3F4F6',
  200:     '#E5E7EB',
  300:     '#D1D5DB',
  400:     '#9CA3AF',
  500:     '#6B7280',
  600:     '#4B5563',
  700:     '#374151',
  800:     '#1F2937',
  900:     '#111827',
  1000:    '#000000',
} as const;

// ═══════════════════════════════════════════════════════════════
// COLORS — STATUS
// ═══════════════════════════════════════════════════════════════

export const status = {
  success:   '#10B981',
  successBg: 'rgba(16, 185, 129, 0.08)',
  warning:   '#F59E0B',
  warningBg: 'rgba(245, 158, 11, 0.08)',
  error:     '#EF4444',
  errorBg:   'rgba(239, 68, 68, 0.08)',
  info:      '#3B82F6',
  infoBg:    'rgba(59, 130, 246, 0.08)',
} as const;

// ═══════════════════════════════════════════════════════════════
// COLORS — SEMANTIC (light mode)
// ═══════════════════════════════════════════════════════════════

export const semantic = {
  text: {
    /** H1–H3, máxima jerarquía */
    strong:  'rgba(0, 6, 38, 0.9)',
    /** Secundario, labels, metadatos */
    weak:    'rgba(0, 9, 51, 0.65)',
    /** Links de marca, texto interactivo */
    brand:   '#151f47',
  },
  background: {
    /** Tarjetas y contenedores principales */
    base:      'white',
    secondary: '#F9FAFB',
    tertiary:  '#F3F4F6',
  },
  fill: {
    /** Footer, secciones terciarias */
    weaker:    'rgba(0, 21, 128, 0.02)',
    /** Fondo de contenedores de ícono */
    brandWeak: 'rgba(21, 31, 71, 0.05)',
  },
  stroke: {
    /** Bordes de tarjeta, divisores, headers */
    weak:      'rgba(0, 17, 102, 0.1)',
    /** Borde de contenedor de ícono */
    brandWeak: 'rgba(21, 31, 71, 0.2)',
  },
  interactive: {
    /** Botones primarios, badges de logo */
    action: '#4c64d9',
  },
} as const;

// Alias de conveniencia
export const colors = { brand, neutral, status, semantic } as const;

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════

/**
 * Nunito es la única familia tipográfica del sistema.
 * La distinción heading/body controla el contexto de uso, no la familia.
 */
export const typography = {
  family: {
    heading: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body:    "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  size: {
    /** Hero, títulos de página principales */
    heading1:  '40px',
    /** Títulos de sección, nombres de componente */
    heading3:  '24px',
    /** Subtítulos, descripciones de componente */
    heading4:  '20px',
    /** Cuerpo de texto general */
    small:     '16px',
    /** Metadatos, pie de página, etiquetas secundarias */
    tiny:      '14px',
    /** Labels de categoría en mayúsculas */
    uppercase: '14px',
  },
  lineHeight: {
    heading1:  '48px',
    heading3:  '32px',
    heading4:  '28px',
    small:     '24px',
    tiny:      '20px',
    uppercase: '20px',
  },
  weight: {
    /** SemiBold — títulos y énfasis */
    strong: 600,
    /** Regular — cuerpo y texto secundario */
    weak:   400,
  },
  tracking: {
    heading1:  '-0.5px',
    uppercase: '2px',
    default:   '0',
  },
} as const;

// Estilos tipográficos compuestos (para referencias en código)
export const textStyles = {
  heading1: {
    fontFamily:    typography.family.heading,
    fontSize:      typography.size.heading1,
    lineHeight:    typography.lineHeight.heading1,
    fontWeight:    typography.weight.strong,
    letterSpacing: typography.tracking.heading1,
    color:         semantic.text.strong,
  },
  heading3: {
    fontFamily:    typography.family.heading,
    fontSize:      typography.size.heading3,
    lineHeight:    typography.lineHeight.heading3,
    fontWeight:    typography.weight.strong,
    letterSpacing: typography.tracking.default,
    color:         semantic.text.strong,
  },
  heading4: {
    fontFamily:    typography.family.heading,
    fontSize:      typography.size.heading4,
    lineHeight:    typography.lineHeight.heading4,
    fontWeight:    typography.weight.weak,
    letterSpacing: typography.tracking.default,
    color:         semantic.text.strong,
  },
  body: {
    fontFamily: typography.family.body,
    fontSize:   typography.size.small,
    lineHeight: typography.lineHeight.small,
    fontWeight: typography.weight.weak,
    color:      semantic.text.weak,
  },
  bodyBold: {
    fontFamily: typography.family.body,
    fontSize:   typography.size.small,
    lineHeight: typography.lineHeight.small,
    fontWeight: typography.weight.strong,
    color:      semantic.text.weak,
  },
  textLink: {
    fontFamily:     typography.family.body,
    fontSize:       typography.size.small,
    lineHeight:     typography.lineHeight.small,
    fontWeight:     typography.weight.strong,
    textDecoration: 'underline',
    color:          semantic.text.brand,
  },
  tiny: {
    fontFamily: typography.family.body,
    fontSize:   typography.size.tiny,
    lineHeight: typography.lineHeight.tiny,
    fontWeight: typography.weight.weak,
    color:      semantic.text.weak,
  },
  uppercase: {
    fontFamily:    typography.family.body,
    fontSize:      typography.size.uppercase,
    lineHeight:    typography.lineHeight.uppercase,
    fontWeight:    typography.weight.strong,
    letterSpacing: typography.tracking.uppercase,
    textTransform: 'uppercase' as const,
    color:         semantic.text.weak,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// SPACING (escala base 4px)
// ═══════════════════════════════════════════════════════════════

export const spacing = {
  0:   '0px',
  8:   '8px',    // gap mínimo, padding de íconos
  12:  '12px',   // padding interior de icon container
  16:  '16px',   // gap entre elementos de tarjeta
  24:  '24px',   // gap entre grupos, padding horizontal interno
  32:  '32px',   // padding vertical de footer
  48:  '48px',   // radio de icon pill; gap entre secciones
  64:  '64px',   // padding vertical de header
  96:  '96px',   // padding horizontal principal; gap entre bloques grandes
} as const;

export type SpacingKey = keyof typeof spacing;

/** Obtener valor de spacing en número (sin 'px') */
export function spacingPx(key: SpacingKey): number {
  return parseInt(spacing[key]);
}

// ═══════════════════════════════════════════════════════════════
// BORDER RADIUS
// ═══════════════════════════════════════════════════════════════

export const radius = {
  sm:       '4px',       // badges, chips pequeños
  md:       '8px',       // inputs, selects
  lg:       '12px',      // modales, drawers
  card:     '16px',      // tarjetas, contenedores principales
  iconPill: '48px',      // contenedores de ícono circulares
  badge:    '5.333px',   // logo symbol en headers
  full:     '9999px',    // pills, avatares
} as const;

// ═══════════════════════════════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════════════════════════════

export const shadows = {
  /** Sombra compuesta — tarjetas, modales, drawers (fuente Figma) */
  overlay: '0px 8px 8px -4px rgba(0, 0, 0, 0.04), 0px 20px 24px -4px rgba(0, 0, 0, 0.08)',
  sm:      '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md:      '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
  xl:      '0px 24px 48px -8px rgba(0, 0, 0, 0.12), 0px 8px 16px -4px rgba(0, 0, 0, 0.06)',
  /** Focus ring accesible */
  focus:   '0 0 0 3px rgba(76, 100, 217, 0.25)',
} as const;

// ═══════════════════════════════════════════════════════════════
// GRID Y BREAKPOINTS
// ═══════════════════════════════════════════════════════════════

export const grid = {
  maxWidth:   '1112px',
  columns:    2,
  paddingH:   '96px',
  contentCol: '364px',  // ancho útil de contenido por columna
} as const;

export const breakpoints = {
  mobile:  768,   // < 768px — una columna, padding reducido
  tablet:  1024,  // 768–1024px — contenido adaptado
  desktop: 1112,  // >= 1112px — layout dos columnas
} as const;

// ═══════════════════════════════════════════════════════════════
// TRANSITIONS
// ═══════════════════════════════════════════════════════════════

export const transitions = {
  fast: '150ms ease',
  base: '250ms ease',
  slow: '400ms ease',
} as const;

// ═══════════════════════════════════════════════════════════════
// CHARTS — PALETA DE VISUALIZACIÓN DE DATOS
// ═══════════════════════════════════════════════════════════════

export const chartPalette = [
  '#4c64d9',  // 1 — Brand Indigo
  '#151f47',  // 2 — Brand Navy
  '#6078ec',  // 3 — Brand Alt 400
  '#a1b0eb',  // 4 — Brand 200
  '#10B981',  // 5 — Success
  '#F59E0B',  // 6 — Warning
  '#3B82F6',  // 7 — Info
  '#9CA3AF',  // 8 — Neutral
] as const;

// ═══════════════════════════════════════════════════════════════
// Z-INDEX
// ═══════════════════════════════════════════════════════════════

export const zIndex = {
  dropdown: 100,
  sticky:   200,
  drawer:   300,
  modal:    400,
  toast:    500,
} as const;

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Aplica opacidad a un color hex.
 * @example withOpacity('#151f47', 20) → 'rgba(21, 31, 71, 0.2)'
 */
export function withOpacity(hex: string, opacity: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

// Export default — barrel export de todos los tokens
export default {
  colors,
  typography,
  textStyles,
  spacing,
  radius,
  shadows,
  grid,
  breakpoints,
  transitions,
  chartPalette,
  zIndex,
} as const;
