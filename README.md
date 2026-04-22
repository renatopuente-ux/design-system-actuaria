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
├── tokens.ts                      # Tokens TypeScript — colores, tipografía, espaciado
├── design-tokens.css              # CSS Custom Properties (fuente canónica de variables)
├── Tokens.stories.mdx             # Documentación de tokens en Storybook
│
└── src/
    └── components/
        ├── index.ts               # Barrel export de los 60 componentes
        │
        ├── Accordion/             # Acordeón con transición de altura y allowMultiple
        ├── Actuarin/              # Mascota SVG de Actuaria, 3 expresiones
        ├── Alert/                 # Banner inline con borde semántico y dismiss
        ├── AlertGlobal/           # Banner fixed top full-width por variante
        ├── Autocomplete/          # Input con filtrado y navegación por teclado
        ├── Avatar/                # Círculo con imagen o iniciales, 5 tamaños
        ├── AvatarDropdown/        # Avatar con menú desplegable de usuario
        ├── Badge/                 # Etiqueta pill con 5 variantes semánticas
        ├── BadgeCount/            # Contador circular para notificaciones
        ├── BadgeDot/              # Punto de estado con animación pulse
        ├── BannerSlider/          # Carrusel full-width con autoplay y dots
        ├── BarChart/              # Gráfica de barras SVG nativa sin dependencias
        ├── Breadcrumbs/           # Migaja de pan con aria-current
        ├── Button/                # Variantes: primary, secondary, ghost, danger
        ├── ButtonGroup/           # Grupo horizontal o vertical de botones
        ├── ButtonIcon/            # Botón icónico cuadrado
        ├── Card/                  # Contenedor con padding, sombra y hover
        ├── CardFlip/              # Tarjeta con animación 3D de volteo CSS
        ├── Checkbox/              # Casilla personalizada con estado indeterminate
        ├── Combobox/              # Input libre + selector estructurado con filtro
        ├── DatePicker/            # Calendario nativo sin dependencias externas
        ├── Divider/               # Separador horizontal/vertical con label opcional
        ├── Drawer/                # Panel lateral izquierdo o derecho con overlay
        ├── DropdownMenu/          # Menú desplegable con items danger y disabled
        ├── EmptyState/            # Pantalla vacía con icono, título y acción
        ├── FileUpload/            # Dropzone con drag-over y lista de archivos
        ├── Footer/                # Pie de página oscuro con columnas y legal
        ├── Hero/                  # Sección portada con badge, título y CTAs
        ├── IconContainer/         # Wrapper de icono con variantes semánticas
        ├── LoadingBar/            # Barra determinate e indeterminate animada
        ├── Logotipo/              # Logo SVG inline: wordmark o monograma A
        ├── Modal/                 # Diálogo centrado sm/md/lg con backdrop
        ├── MotionBar/             # Barra animada con conteo requestAnimationFrame
        ├── NavigationHeader/      # Header sticky 64px con logo, nav y avatar
        ├── NavigationSide/        # Sidebar 240px colapsable a 64px icon-only
        ├── Pagination/            # Paginación con elipsis automáticas
        ├── ProgressBar/           # Barra de progreso con tres tamaños
        ├── RadioButton/           # Radio individual con label accesible
        ├── RadioButtonGroup/      # Grupo de radios con fieldset y legend
        ├── Rating/                # Estrellas interactivas con preview hover
        ├── SearchInput/           # Input con icono de búsqueda y botón limpiar
        ├── SegmentedControl/      # Selector pill de opciones exclusivas
        ├── Select/                # Selector custom con ARIA combobox completo
        ├── Slider/                # Control deslizante con fill de track animado
        ├── Slot/                  # Placeholder de layout con borde punteado
        ├── Stepper/               # Indicador de pasos horizontal y vertical
        ├── SummaryList/           # Lista label/valor con acciones de edición
        ├── Table/                 # Tabla con striped rows, hover y alineación
        ├── Tabs/                  # Pestañas con navegación por teclado
        ├── Tag/                   # Etiqueta removible con icono opcional
        ├── Testimonial/           # Tarjeta de cita con autor y rating
        ├── Text/                  # 8 variantes tipográficas con prop as
        ├── TextArea/              # Área de texto con contador de caracteres
        ├── TextBlock/             # Bloque editorial con icono, título y cuerpo
        ├── TextInput/             # Campo de texto con label, hint y error
        ├── TextLink/              # Enlace inline con soporte externo ↗
        ├── Toggle/                # Interruptor on/off en tamaños sm y md
        ├── Tooltip/               # Aparece en hover/focus, 4 posiciones
        ├── Tracking/              # Timeline vertical de seguimiento de estados
        └── User/                  # Avatar + nombre + rol en tres tamaños
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

## Componentes — 60 en total

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

Made with ❤️ by Actuaria Design Team — Last update: Abril 22, 2026 · 60 componentes
