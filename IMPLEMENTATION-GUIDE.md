# 🚀 GUÍA DE IMPLEMENTACIÓN
# Design Tokens Pipeline - Actuaría Design System

## Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Instalación y Setup](#instalación-y-setup)
4. [Ejemplos Prácticos](#ejemplos-prácticos)
5. [Integración Figma → Code](#integración-figma--code)
6. [Testing y Validación](#testing-y-validación)
7. [Publicación y Versionado](#publicación-y-versionado)
8. [Troubleshooting](#troubleshooting)

---

## 📋 Configuración Inicial

### Requisitos Previos

```bash
# Node.js 16+
node --version  # v16.0.0 or higher

# npm o yarn
npm --version
# yarn --version

# Git
git --version
```

### Clonar Repositorio

```bash
git clone https://github.com/actuaria/design-system.git
cd design-system

npm install
# o
yarn install
```

---

## 📁 Estructura del Proyecto

```
design-system/
├── src/
│   ├── tokens/                          # Core tokens
│   │   ├── index.ts                     # Main export
│   │   ├── colors.ts                    # Color tokens
│   │   ├── typography.ts                # Typography tokens
│   │   ├── spacing.ts                   # Spacing tokens
│   │   └── tokens.json                  # JSON export
│   │
│   ├── styles/
│   │   ├── design-tokens.css            # CSS Custom Properties
│   │   ├── composites.css               # Composiciones tipográficas
│   │   └── utilities.css                # Clases de utilidad
│   │
│   ├── components/                      # Componentes de ejemplo
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Typography.tsx
│   │
│   └── .storybook/                      # Configuración Storybook
│       ├── main.ts
│       ├── preview.ts
│       └── tokens.mdx
│
├── scripts/
│   ├── sync-tokens.js                   # Sincronización Figma
│   ├── validate-tokens.js               # Validación
│   └── generate-docs.js                 # Generación de docs
│
├── tests/
│   ├── tokens.test.ts
│   └── colors.test.ts
│
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🔧 Instalación y Setup

### Paso 1: Clonar y Instalar

```bash
# Clonar repositorio
git clone https://github.com/actuaria/design-system.git
cd design-system

# Instalar dependencias
npm install

# Opcional: instalación global de herramientas
npm install -g @storybook/cli
```

### Paso 2: Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tus credenciales
FIGMA_API_TOKEN=your_figma_token_here
FIGMA_FILE_ID=N1wh3u4sX3UGyUU5oWOaz6
```

**Obtener Figma API Token:**
1. Ir a Figma Settings → Account → Personal access tokens
2. Crear nuevo token
3. Copiar en `.env.local`

### Paso 3: Scripts NPM

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build:storybook": "storybook build",
    "sync:tokens": "node scripts/sync-tokens.js",
    "sync:tokens:watch": "nodemon scripts/sync-tokens.js",
    "validate:tokens": "node scripts/validate-tokens.js",
    "test": "jest",
    "build": "tsc",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.{ts,tsx}",
    "format": "prettier --write src/**/*.{ts,tsx,css}"
  }
}
```

### Paso 4: Ejecutar Storybook

```bash
# Desarrollo
npm run storybook
# → Abre http://localhost:6006

# Build para producción
npm run build:storybook
# → Crea carpeta storybook-static/
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Componente Button Usando Tokens

#### React/TypeScript

```typescript
// components/Button.tsx
import React from 'react';
import { colors, spacing, typography, transitions } from '@/tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.semibold,
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: `all ${transitions.base}`,
    ...getSizeStyles(size),
    ...getVariantStyles(variant),
    width: fullWidth ? '100%' : 'auto',
  };

  return (
    <button style={baseStyles} {...props}>
      {children}
    </button>
  );
};

// Estilos por tamaño
function getSizeStyles(size: 'sm' | 'md' | 'lg'): React.CSSProperties {
  const sizes = {
    sm: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: typography.fontSize.sm,
    },
    md: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize.base,
    },
    lg: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: typography.fontSize.lg,
    },
  };
  return sizes[size];
}

// Estilos por variante
function getVariantStyles(variant: 'primary' | 'secondary' | 'outline'): React.CSSProperties {
  const variants = {
    primary: {
      backgroundColor: colors.primary[500],
      color: colors.neutral[0],
    },
    secondary: {
      backgroundColor: colors.secondary[500],
      color: colors.neutral[0],
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary[500],
      border: `1px solid ${colors.primary[500]}`,
    },
  };
  return variants[variant];
}

export default Button;
```

#### Uso en Componentes

```typescript
// pages/login.tsx
import Button from '@/components/Button';
import { spacing, typographyComposites } from '@/tokens';

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
      <h1 style={typographyComposites.headlineLarge}>
        Bienvenido a Actuaría
      </h1>
      
      <Button variant="primary" size="lg" fullWidth>
        Iniciar Sesión
      </Button>
      
      <Button variant="outline" size="md">
        Registrarse
      </Button>
    </div>
  );
}
```

#### Storybook Story

```typescript
// components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Click me',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};
```

---

### Ejemplo 2: Card Component

```typescript
// components/Card.tsx
import React from 'react';
import { colors, spacing, shadows, radius, semanticColors } from '@/tokens';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined';
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  variant = 'elevated',
}) => {
  const cardStyles: React.CSSProperties = {
    backgroundColor: semanticColors.background.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    boxShadow: variant === 'elevated' ? shadows.md : 'none',
    border: variant === 'outlined' ? `1px solid ${colors.neutral[200]}` : 'none',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: semanticColors.text.primary,
    marginBottom: spacing.md,
    margin: 0,
  };

  return (
    <div style={cardStyles}>
      {title && <h3 style={titleStyles}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
```

---

### Ejemplo 3: Usando CSS Variables

```css
/* styles/components.css */
@import './design-tokens.css';

/* ─────────────────────────────────────────────────────────────── */
/* CARD COMPONENT */
/* ─────────────────────────────────────────────────────────────── */

.card {
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card__title {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-md) 0;
}

.card__body {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

/* ─────────────────────────────────────────────────────────────── */
/* BUTTON COMPONENT */
/* ─────────────────────────────────────────────────────────────── */

.button {
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.button--primary {
  background-color: var(--color-primary-500);
  color: var(--color-primary-900);
}

.button--primary:hover {
  background-color: var(--color-primary-600);
  box-shadow: var(--shadow-md);
}

.button--primary:active {
  background-color: var(--color-primary-700);
  box-shadow: var(--shadow-sm);
}

.button--secondary {
  background-color: var(--color-secondary-500);
  color: white;
}

.button--secondary:hover {
  background-color: var(--color-secondary-600);
}

/* ─────────────────────────────────────────────────────────────── */
/* FORM INPUTS */
/* ─────────────────────────────────────────────────────────────── */

.input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
}

.input:hover {
  border-color: var(--color-border-dark);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input:disabled {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}

/* ─────────────────────────────────────────────────────────────── */
/* RESPONSIVE DESIGN */
/* ─────────────────────────────────────────────────────────────── */

@media (max-width: 768px) {
  .card {
    padding: var(--spacing-md);
  }

  .card__title {
    font-size: var(--font-size-xl);
  }
}
```

---

## 🔄 Integración Figma → Code

### Opción 1: Sincronización Manual

```bash
# Extraer tokens de Figma API
npm run sync:tokens

# Validar tokens
npm run validate:tokens

# Actualizar git
git add -A
git commit -m "chore: sync design tokens from Figma"
git push origin main
```

### Opción 2: Sincronización Automática (Webhook)

**Configurar Webhook en Figma:**

```bash
# 1. Crear endpoint en tu servidor
# POST /api/webhooks/figma-tokens

# 2. Registrar webhook
curl -X POST https://api.figma.com/v1/webhooks \
  -H "X-Figma-Token: $FIGMA_API_TOKEN" \
  -d '{
    "file_id": "N1wh3u4sX3UGyUU5oWOaz6",
    "team_id": "your_team_id",
    "event_type": "FILE_UPDATE",
    "callback_url": "https://your-domain.com/api/webhooks/figma-tokens",
    "description": "Sync tokens on Figma updates"
  }'

# 3. El webhook dispara automáticamente:
npm run sync:tokens && npm run build && npm run deploy
```

---

## ✅ Testing y Validación

### Test de Tokens

```typescript
// tests/tokens.test.ts
import { colors, spacing, typography } from '@/tokens';

describe('Design Tokens', () => {
  describe('Colors', () => {
    it('should have all primary colors', () => {
      expect(colors.primary[500]).toBe('#1F7FFF');
      expect(colors.primary[600]).toBe('#1563D6');
    });

    it('should have semantic colors', () => {
      expect(colors.semantic.success).toBe('#4CAF50');
      expect(colors.semantic.error).toBe('#F44336');
    });
  });

  describe('Spacing', () => {
    it('should follow 4px base scale', () => {
      expect(spacing.xs).toBe('4px');
      expect(spacing.sm).toBe('8px');
      expect(spacing.md).toBe('16px');
    });
  });

  describe('Typography', () => {
    it('should have complete font families', () => {
      expect(typography.fontFamily.sans).toBeDefined();
      expect(typography.fontFamily.mono).toBeDefined();
    });

    it('should have valid font sizes', () => {
      expect(typography.fontSize.base).toBe('16px');
    });
  });
});
```

**Ejecutar tests:**

```bash
npm test
# o
npm run test:watch
```

---

## 📦 Publicación y Versionado

### Versionado Semántico

```bash
# Patch (Bug fixes)
npm version patch
# v1.0.0 → v1.0.1

# Minor (New features)
npm version minor
# v1.0.0 → v1.1.0

# Major (Breaking changes)
npm version major
# v1.0.0 → v2.0.0
```

### Publicar en NPM

```bash
# Asegurar estar logged in
npm login

# Publicar
npm publish

# Publicar como scoped package
npm publish --access public
```

### Tag en Git

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## 🐛 Troubleshooting

### Problema: Tokens no se sincronizan

```bash
# Solución 1: Verificar token Figma
echo $FIGMA_API_TOKEN

# Solución 2: Verificar file ID
npm run sync:tokens -- --verbose

# Solución 3: Validar formato JSON
npm run validate:tokens
```

### Problema: CSS Variables no funcionan

```css
/* Asegurar que los estilos se importan en el orden correcto */
@import '@/styles/design-tokens.css';    /* Primero */
@import '@/styles/components.css';       /* Después */
@import '@/styles/utilities.css';        /* Al final */
```

### Problema: TypeScript errors en tokens

```bash
# Regenerar tipos
npm run type-check

# Limpiar cache
rm -rf node_modules/.cache
npm install
```

---

## 📚 Recursos Adicionales

- [Documentación Figma Variables](https://help.figma.com/hc/en-us/articles/15339657135991-Guide-to-variables)
- [Sistema de Tokens (Design Foundation)](https://www.youtube.com/watch?v=wDBEc3dJJV8)
- [Material Design Tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Storybook Design Tokens](https://storybook.js.org/docs/react/api/storybook-design-tokens)

---

## ✨ Mejores Prácticas

### ✅ Do's

- ✓ Usar alias semánticos (`background.primary` en lugar de `neutral.50`)
- ✓ Agrupar cambios relacionados en un commit
- ✓ Documentar nuevos tokens en Storybook
- ✓ Sincronizar desde Figma mínimo semanalmente
- ✓ Usar TypeScript para type-safety
- ✓ Validar tokens antes de publicar

### ❌ Don'ts

- ✗ Hardcodear valores de color/spacing
- ✗ Crear nuevos tokens sin validación
- ✗ Modificar tokens en código (source of truth es Figma)
- ✗ Ignorar breaking changes
- ✗ Publicar versiones sin tests
- ✗ Olvidar actualizar Storybook docs

---

**¡Listo para usar Design Tokens en tu proyecto Actuaría!** 🎉

Para más ayuda: design-system@actuaria.com
