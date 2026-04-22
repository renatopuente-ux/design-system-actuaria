# Actuaria Design System

**Sistema centralizado de componentes, tokens y estilos para Actuaria Consultores.**

Actuaria Consultores es una firma con 40 años de experiencia en soluciones matemáticas y tecnológicas para la mitigación de riesgos financieros. Este design system es la fuente única de verdad para el diseño y desarrollo de sus productos digitales: **Actuaria Plus**, **Actuafast** y **Actuaria.com**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/renatopuente-ux/design-system-actuaria)
![TypeScript](https://img.shields.io/badge/typescript-strict-blue)

---

## Uso principal

Este repositorio se referencia directamente desde **Claude Design** como fuente de tokens y componentes. No requiere instalación por npm.

**URL del repositorio:**
```
https://github.com/renatopuente-ux/design-system-actuaria
```

**Archivo Figma de referencia:**
```
https://figma.com/file/N1wh3u4sX3UGyUU5oWOaz6
```

---

## Estructura del Repositorio

```
design-system-actuaria/
├── tokens.ts                  # Tokens TypeScript — colores, tipografía, espaciado
├── design-tokens.css          # CSS Custom Properties (fuente canónica de variables)
├── Tokens.stories.mdx         # Documentación de tokens en Storybook
│
└── src/
    └── components/
        ├── index.ts           # Barrel export de todos los componentes
        │
        ├── Button/            # Variantes: primary, secondary, ghost, danger
        ├── ButtonIcon/        # Botón icónico cuadrado
        ├── ButtonGroup/       # Grupo horizontal o vertical de botones
        ├── RadioButton/       # Radio individual con label
        ├── RadioButtonGroup/  # Grupo de radios con fieldset
        ├── DropdownMenu/      # Menú desplegable con items y danger state
        ├── SearchInput/       # Input con icono de búsqueda y botón limpiar
        ├── AvatarDropdown/    # Avatar con menú de usuario
        ├── DatePicker/        # Calendario nativo sin dependencias externas
        ├── Text/              # Variantes tipográficas: heading, body, tiny, link
        ├── TextBlock/         # Bloque editorial con icono, título y cuerpo
        ├── NavigationHeader/  # Header sticky 64px con logo, nav y avatar
        ├── EmptyState/        # Pantalla vacía con icono, título y acción
        ├── User/              # Avatar + nombre + rol en tres tamaños
        ├── Card/              # Contenedor con padding y sombra
        ├── Drawer/            # Panel lateral izquierdo o derecho
        ├── BarChart/          # Gráfica de barras SVG nativa
        ├── ProgressBar/       # Barra de progreso con tres tamaños
        └── MotionBar/         # Barra animada con conteo de valor hacia target
```

---

## Tokens de Diseño

### Colores semánticos (CSS Custom Properties)

| Token | Valor | Uso |
|---|---|---|
| `--text-strong` | `rgba(0,6,38,0.9)` | Texto principal |
| `--text-weak` | `rgba(0,9,51,0.65)` | Texto secundario |
| `--text-brand` | `#4c64d9` | Texto de marca |
| `--background-base` | `#ffffff` | Fondo base |
| `--fill-brand-weak` | `rgba(76,100,217,0.08)` | Relleno de acento suave |
| `--stroke-weak` | `rgba(0,17,102,0.1)` | Bordes sutiles |
| `--interactive-action` | `#4c64d9` | Acciones interactivas |

### Paleta base

- **Navy:** `#151f47` — color corporativo principal
- **Indigo:** `#4c64d9` — acción e interacción
- **Success:** `#10B981`
- **Warning:** `#F59E0B`
- **Error:** `#EF4444`

### Tipografía

- **Familia:** Nunito (Regular 400, SemiBold 600)
- **Escala:** heading-1 / heading-3 / heading-4 / small / tiny / uppercase
- **Pesos permitidos:** 400 y 600 únicamente

### Espaciado

`0 · 8px · 12px · 16px · 24px · 32px · 48px · 64px · 96px`

### Radios

- Card: `16px`
- Pill / botones: `48px`
- Badge: `5.333px`

---

## Componentes — 56 en total

Cada componente incluye:
- `[Name].tsx` — React 18 + TypeScript estricto
- `[Name].module.css` — CSS Modules con tokens semánticos (cero valores HEX directos)
- `[Name].stories.tsx` — Storybook 7 con todas las variantes

**Estándares aplicados en todos los componentes:**
- Dark mode vía `[data-theme='dark']`
- Focus ring accesible: `box-shadow: var(--shadow-focus)`
- `aria-*` y `role` correctos para WCAG AA
- Navegación por teclado completa
- Sin dependencias externas (DatePicker, BarChart, Slider en HTML/SVG nativo)

### Listado completo

| Categoría | Componentes |
|---|---|
| **Formularios** | TextInput, TextArea, Checkbox, Toggle, Select, Slider, Autocomplete, Combobox, DatePicker, FileUpload, RadioButton, RadioButtonGroup |
| **Botones** | Button, ButtonIcon, ButtonGroup |
| **Navegación** | NavigationHeader, NavigationSide, Breadcrumbs, Tabs, Pagination, Accordion, Stepper |
| **Overlay & Feedback** | Modal, Drawer, Alert, AlertGlobal, Tooltip, LoadingBar, Rating |
| **Datos & Tablas** | Table, SummaryList, Badge, BadgeCount, BadgeDot, Tag, Divider |
| **Tipografía** | Text, TextBlock, TextLink |
| **Layout & Contenido** | Hero, Footer, Card, CardFlip, BannerSlider, Testimonial, EmptyState |
| **Métricas** | BarChart, ProgressBar, MotionBar |
| **Identidad & Especiales** | Avatar, AvatarDropdown, User, Actuarín, Logotipo, IconContainer, SegmentedControl, Slot, Tracking, DropdownMenu, SearchInput |

---

## Flujo de trabajo

### Diseñadores
1. Actualizar componentes en Figma (`N1wh3u4sX3UGyUU5oWOaz6`)
2. Solicitar sincronización al equipo de desarrollo
3. Revisar cambios en Storybook

### Desarrolladores
1. Referenciar este repo como fuente de componentes
2. Importar desde `src/components/index.ts`
3. Usar tokens de `design-tokens.css` en el proyecto anfitrión

### Claude Design
Usar la URL del repo directamente como contexto de design system al generar interfaces para los productos de Actuaria:

- **Actuaria Plus** — Plataforma SaaS de gestión actuarial
- **Actuafast** — Herramienta de cálculo actuarial rápido
- **Actuaria.com** — Sitio corporativo y portal de servicios

---

## Storybook

Para visualizar los componentes localmente:

```bash
git clone https://github.com/renatopuente-ux/design-system-actuaria.git
cd design-system-actuaria
npm install
npm run storybook
# → http://localhost:6006
```

---

## Soporte

- 📧 **Email:** figma-admin@actuaria.com
- 🐙 **Issues:** [Crear issue](https://github.com/renatopuente-ux/design-system-actuaria/issues)

---

## Licencia

MIT © 2026 Actuaria Consultores.

---

Made with ❤️ by Actuaria Design Team — Last update: Abril 22, 2026 · 56 componentes
