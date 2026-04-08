// Design Tokens - TypeScript
// Auto-generated from Figma Design System
// Last updated: 2024

// ===== COLORS =====

export const colors = {
  primary: {
    light: '#0066FF',
    dark: '#0052CC',
    50: '#F0F7FF',
    100: '#E0EEFF',
    200: '#C1DDFF',
    300: '#A2CCFF',
    400: '#83BBFF',
    500: '#0066FF',
    600: '#0052CC',
    700: '#003D99',
    800: '#002966',
    900: '#001433',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
} as const;

// ===== TYPOGRAPHY =====

export const typography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Courier New", monospace',
    serif: '"Playfair Display", serif',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
} as const;

// ===== SPACING =====

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

// ===== BORDER RADIUS =====

export const radius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

// ===== SHADOWS =====

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
} as const;

// ===== TRANSITIONS =====

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
} as const;

// ===== COMPOSITE TOKENS =====

export const typographyComposites = {
  headlineXl: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  } as const,
  headlineLg: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  } as const,
  headlineMd: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  } as const,
  body: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  } as const,
  bodySm: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  } as const,
  caption: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  } as const,
} as const;

// ===== SEMANTIC COLOR ALIASES =====

export const semanticColors = {
  background: {
    primary: colors.neutral.white,
    secondary: colors.neutral.gray[50],
    tertiary: colors.neutral.gray[100],
  },
  text: {
    primary: colors.neutral.gray[900],
    secondary: colors.neutral.gray[600],
    tertiary: colors.neutral.gray[400],
  },
  border: {
    light: colors.neutral.gray[200],
    default: colors.neutral.gray[300],
    dark: colors.neutral.gray[500],
  },
  status: {
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    error: colors.semantic.error,
    info: colors.semantic.info,
  },
} as const;

// ===== TYPE DEFINITIONS =====

export type Color = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Radius = typeof radius;
export type Shadow = typeof shadows;
export type Transition = typeof transitions;

export type ColorValue = typeof colors[keyof typeof colors];
export type FontSize = typeof typography.fontSize;
export type FontWeight = typeof typography.fontWeight;
export type SpacingValue = typeof spacing;
export type RadiusValue = typeof radius;
export type ShadowValue = typeof shadows;

// ===== UTILITY FUNCTIONS =====

/**
 * Obtener valor de spacing con multiplicador
 * @param base - Token base (xs, sm, md, lg, xl, 2xl, 3xl)
 * @param multiplier - Multiplicador (1, 2, 3, etc.)
 */
export function getSpacing(
  base: keyof typeof spacing,
  multiplier: number = 1
): string {
  const value = parseInt(spacing[base]);
  return `${value * multiplier}px`;
}

/**
 * Combinar tokens de tipografía
 * @param size - Tamaño de fuente
 * @param weight - Peso de fuente
 */
export function getTypography(
  size: keyof typeof typography.fontSize,
  weight: keyof typeof typography.fontWeight = 'regular'
) {
  return {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize[size],
    fontWeight: typography.fontWeight[weight],
  };
}

/**
 * Obtener color con opacidad
 * @param color - Valor de color hex
 * @param opacity - Opacidad (0-100)
 */
export function withOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

/**
 * Aplicar variable CSS
 * @param tokenName - Nombre del token
 */
export function getCSSVariable(tokenName: string): string {
  return `var(--${tokenName})`;
}

// ===== EXPORT ALL =====

export default {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  transitions,
  typographyComposites,
  semanticColors,
};
