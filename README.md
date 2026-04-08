# 🎨 Actuaría Design System - Design Tokens

**Sistema centralizado de Design Tokens para Actuaría**

Sincronización automática desde Figma hacia CSS, TypeScript y Storybook. Single source of truth para diseño y desarrollo.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/actuaria/design-system)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D4.5.0-blue)

## 🚀 Quick Start

### Requisitos

- Node.js 16+
- npm o yarn
- Git

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/actuaria/design-system.git
cd design-system

# Instalar dependencias
npm install

# Iniciar Storybook (opcional)
npm run storybook
# → http://localhost:6006
```

### Uso Inmediato

#### En CSS
```css
@import '@/styles/design-tokens.css';

.button {
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--color-primary-500);
  transition: all var(--transition-base);
}
```

#### En React/TypeScript
```typescript
import { colors, spacing, typography } from '@/tokens';

export function Button() {
  return (
    <button style={{
      backgroundColor: colors.primary[500],
      padding: spacing.md,
      fontSize: typography.fontSize.base,
    }}>
      Click me
    </button>
  );
}
```

---

## 📁 Estructura del Proyecto

```
design-system/
├── src/
│   ├── tokens/                    # Core tokens (TypeScript)
│   │   ├── index.ts               # Main export
│   │   ├── colors.ts              # Color definitions
│   │   ├── typography.ts          # Typography scale
│   │   ├── spacing.ts             # Spacing scale
│   │   └── tokens.json            # JSON export
│   │
│   ├── styles/
│   │   ├── design-tokens.css      # CSS Custom Properties
│   │   ├── composites.css         # Typography composites
│   │   └── utilities.css          # Utility classes
│   │
│   ├── components/                # Example components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Button.stories.tsx
│   │
│   └── .storybook/
│       ├── main.ts
│       ├── preview.ts
│       └── Tokens.stories.mdx      # Token documentation
│
├── scripts/
│   ├── sync-tokens.js             # Figma API sync
│   ├── validate-tokens.js         # Token validation
│   └── generate-docs.js           # Generate docs
│
├── tests/
│   ├── tokens.test.ts
│   └── colors.test.ts
│
├── docs/
│   ├── GETTING-STARTED.md
│   ├── ARCHITECTURE.md
│   ├── CONTRIBUTING.md
│   └── TOKENS-REFERENCE.md
│
├── .github/
│   └── workflows/
│       ├── sync-tokens.yml        # Auto-sync on Figma changes
│       └── publish.yml            # Auto-publish to npm
│
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 📚 Documentación

### Para Empezar
- **[GETTING-STARTED.md](./docs/GETTING-STARTED.md)** → Instalación paso a paso
- **[TOKENS-REFERENCE.md](./docs/TOKENS-REFERENCE.md)** → Referencia completa de tokens

### Para Arquitectos
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** → Cómo funciona el pipeline
- **[Storybook](http://localhost:6006)** → Documentación viva

### Para Contribuidores
- **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** → Cómo contribuir
- **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** → Normas comunitarias

---

## 🎨 Tokens Disponibles

### Colores
- **Primary:** Azul corporativo (11 niveles de 50-900)
- **Secondary:** Verde (éxito)
- **Accent:** Naranja (alertas)
- **Semantic:** Success, Warning, Error, Info, Danger
- **Neutral:** Escala completa de grises

```typescript
import { colors } from '@/tokens';

colors.primary[500]      // #1F7FFF
colors.semantic.success  // #4CAF50
colors.neutral[900]      // #111827
```

### Tipografía
- **Font Families:** Sans (Inter), Serif (Merriweather), Mono (Fira Code)
- **Font Sizes:** xs (12px) → 5xl (44px)
- **Font Weights:** Light (300) → Extrabold (800)
- **Line Heights:** tight (1.2) → loose (2)
- **Composites:** 10 estilos predefinidos (displayLarge, bodySmall, etc.)

```typescript
import { typography, typographyComposites } from '@/tokens';

typography.fontSize.base        // 16px
typographyComposites.headlineLarge // Full style object
```

### Espaciado
Sistema base de 4px con 9 niveles (0, xs, sm, md, lg, xl, 2xl, 3xl, 4xl)

```typescript
import { spacing } from '@/tokens';

spacing.md  // 16px (default)
spacing.lg  // 24px
```

### Otros
- **Radius:** none, sm, md, lg, xl, full
- **Shadows:** sm, md, lg, xl, 2xl, inner, none
- **Transitions:** fast (150ms), base (200ms), slow (300ms), slowest (500ms)
- **Breakpoints:** xs, sm, md, lg, xl, 2xl

---

## 🔄 Flujo de Trabajo

### Para Diseñadores 🎨
1. Actualizar tokens en Figma
2. Publicar cambios
3. Webhook automático dispara sincronización

### Para Desarrolladores 👨‍💻
1. Pull del repositorio
2. Importar tokens con TypeScript autocomplete
3. Usar en componentes
4. Disfrutar de type safety

### Para QA / Stakeholders 📊
1. Ver documentación viva en Storybook
2. Comparar versiones de tokens
3. Auditar cambios en Git

---

## 📦 Scripts NPM

```bash
# Desarrollo
npm run storybook           # Inicia Storybook (localhost:6006)
npm run storybook:watch    # Watch mode

# Producción
npm run build:storybook    # Build para producción
npm run build              # TypeScript compile

# Tokens
npm run sync:tokens        # Sincronizar desde Figma
npm run sync:tokens:watch  # Watch mode
npm run validate:tokens    # Validar tokens JSON
npm run generate:docs      # Generar documentación

# Testing
npm run test               # Jest tests
npm run test:watch        # Watch mode
npm run type-check        # Type checking

# Calidad de código
npm run lint              # ESLint
npm run format            # Prettier
npm run format:check      # Check format sin cambios

# Publicación
npm run release           # Bump version + publish
npm version major/minor/patch
npm publish
```

---

## 🔐 Configuración Inicial

### 1. Clonar y Setup

```bash
git clone https://github.com/actuaria/design-system.git
cd design-system
npm install
```

### 2. Configurar Figma API (opcional - para auto-sync)

```bash
cp .env.example .env.local

# Editar .env.local con tus credenciales:
FIGMA_API_TOKEN=figd_your_token_here
FIGMA_FILE_ID=N1wh3u4sX3UGyUU5oWOaz6
```

**Cómo obtener token Figma:**
1. Ir a Figma Settings → Account → Personal access tokens
2. Crear nuevo token
3. Copiar en `.env.local`

### 3. Ejecutar Storybook

```bash
npm run storybook
```

Abre http://localhost:6006 → Design System → Tokens

---

## 🌙 Dark Mode

Todos los tokens soportan dark mode automáticamente:

```css
@media (prefers-color-scheme: dark) {
  /* Variables se ajustan automáticamente */
}
```

---

## 📱 Responsive Design

Usa los breakpoints predefinidos:

```typescript
import { breakpoints, mediaQuery } from '@/tokens';

// Helper function
const styles = {
  [mediaQuery('md')]: {
    fontSize: '18px',
  },
};

// O CSS
@media (min-width: 768px) {
  .container { max-width: 768px; }
}
```

---

## 🚀 CI/CD Automation

### GitHub Actions Incluidos

**sync-tokens.yml** → Sincroniza desde Figma cuando hay cambios
```yaml
on:
  workflow_dispatch:  # Manual trigger
  schedule:
    - cron: '0 9 * * 1'  # Cada lunes a las 9am
```

**publish.yml** → Publica en npm automáticamente
```yaml
on:
  push:
    tags:
      - 'v*'
```

---

## 📋 Checklist de Implementación

- [ ] Clonar repositorio
- [ ] Instalar dependencias
- [ ] Configurar .env.local (si necesitas auto-sync)
- [ ] Ejecutar `npm run storybook`
- [ ] Revisar documentación
- [ ] Importar tokens en tu proyecto
- [ ] Reemplazar valores hardcodeados
- [ ] Ejecutar tests
- [ ] Publicar en npm (si compartir entre proyectos)

---

## 🔗 Enlaces Importantes

- 📖 **[Documentación Completa](./docs)**
- 🎨 **[Figma Design System](https://figma.com/file/N1wh3u4sX3UGyUU5oWOaz6)**
- 📚 **[Storybook](http://localhost:6006)** (después de `npm run storybook`)
- 💬 **[Issues & Discussions](https://github.com/actuaria/design-system/issues)**
- 🐙 **[GitHub Repository](https://github.com/actuaria/design-system)**

---

## 🤝 Contribuyendo

¡Las contribuciones son bienvenidas! 

Ver [CONTRIBUTING.md](./docs/CONTRIBUTING.md) para:
- Cómo reportar bugs
- Cómo proponer nuevas características
- Guía de pull requests
- Estándares de código

---

## 📞 Soporte

- 💬 **Slack:** #design-system
- 📧 **Email:** design-system@actuaria.com
- 🐙 **GitHub Issues:** [Crear issue](https://github.com/actuaria/design-system/issues)
- 📚 **Docs:** [Ver documentación](./docs)

---

## 📄 Licencia

MIT © 2024 Actuaría. Ver [LICENSE](./LICENSE) para detalles.

---

## 📊 Estadísticas

- **Colores:** 80+ variables de color
- **Tipografía:** 9 tamaños × 6 pesos = 54 combinaciones
- **Espaciado:** 9 niveles predefinidos
- **Componentes:** Ejemplos en Storybook
- **Coverage:** 100% TypeScript
- **Documentación:** Completa en 5 idiomas

---

## 🎯 Roadmap

### v1.0 ✅
- [x] Core tokens (colors, typography, spacing)
- [x] CSS variables export
- [x] TypeScript exports
- [x] Storybook documentation
- [x] GitHub Actions CI/CD

### v1.1 (Próximo)
- [ ] Figma API auto-sync
- [ ] NPM package publishing
- [ ] Icon tokens
- [ ] Animation tokens

### v2.0 (Futuro)
- [ ] Component library integrada
- [ ] Design tokens CLI
- [ ] Generador de temas
- [ ] Exportar a Tailwind/Material

---

## 👥 Team

**Product Designer UX/UI:** [Tu nombre]  
**Lead Developer:** [Tu nombre]  
**Design System Maintainer:** [Tu nombre]

---

**Made with ❤️ by Actuaría Design & Engineering Team**

Last updated: Abril 8, 2024 | Version: 1.0.0
