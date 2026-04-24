# Design System Actuaria

Sistema centralizado de componentes, tokens y estilos para los productos digitales de Actuaria Consultores (40 años · 6,000+ clientes). Fuente única de verdad para **Actuaria Plus**, **ActuaFast** y **Actuaria.com**.

- **Stack:** React 18 + TypeScript estricto + CSS Modules
- **Figma (fuente de diseño):** fileKey `N1wh3u4sX3UGyUU5oWOaz6`
- **Repositorio:** `https://github.com/renatopuente-ux/design-system-actuaria`
- **Componentes:** 68 exportados desde `src/components/index.ts`

---

## Instalación / uso rápido

Este repositorio se referencia directamente — no requiere publicación en npm.

```bash
git clone https://github.com/renatopuente-ux/design-system-actuaria.git
```

```tsx
// Importar siempre desde el barrel export
import { Button, TextInput, Badge, Toggle } from './src/components/index';

// Cargar tokens CSS en el entry point del proyecto
import './design-tokens.css';
```

```tsx
// Ejemplo mínimo
<Button variant="Primary" tone="Brand" size="Medium">
  Calcular reserva
</Button>

<TextInput
  value={email}
  onChange={setEmail}
  label="Correo electrónico"
  required
/>
```

---

## Tokens de diseño

### Colores semánticos (CSS Custom Properties)

| Token | Valor / referencia | Uso |
|---|---|---|
| `--text-strong` | `rgba(0,6,38,0.9)` | Texto principal |
| `--text-weak` | `rgba(0,9,51,0.65)` | Texto secundario / placeholder |
| `--text-brand` | `#4c64d9` | Texto de marca |
| `--text-error` | `#EF4444` | Mensajes de error |
| `--fill-selected` | `#151f47` | Fondo de elementos seleccionados |
| `--interactive-action` | `#4c64d9` | Acciones interactivas (links, focus) |
| `--fill-hover` | `rgba(76,100,217,0.06)` | Hover sobre superficies |
| `--fill-press` | `rgba(76,100,217,0.12)` | Press / active state |
| `--stroke-strong` | `rgba(0,17,102,0.25)` | Bordes visibles |
| `--stroke-focus` | `#151f47` | Outline de foco accesible |
| `--fill-error-weak` | `rgba(239,68,68,0.08)` | Fondo de campo con error |

### Primitivos de marca

| Nombre | Hex | Uso |
|---|---|---|
| Navy | `#151f47` | Color corporativo principal, fondos oscuros |
| Indigo | `#4c64d9` | Acción, interacción, links |
| Dark Surface | `#12131a` | Superficies oscuras (dark mode) |
| Orange | `#E0592A` | Acento de alerta / destacado |

### Tipografía

| Token | Valor |
|---|---|
| `--font-family-body` | `'Nunito', sans-serif` |
| `--font-size-h1` | `32px` · weight 600 |
| `--font-size-h2` | `24px` · weight 600 |
| `--font-size-h3` | `20px` · weight 600 |
| `--font-size-h4` | `16px` · weight 600 |
| `--font-size-small` | `14px` · weight 400/600 |
| `--font-size-tiny` | `12px` · weight 400/600 |

Pesos permitidos: **400** (body) y **600** (headings) únicamente.

### Espaciado (escala 4px)

`0 · 4px · 8px · 12px · 16px · 24px · 32px · 48px · 64px · 96px`

### Radios

| Contexto | Valor |
|---|---|
| Card / panel | `16px` |
| Pill / botón | `48px` |
| Badge / tag | `5.333px` |

### Sombras

| Token | Uso |
|---|---|
| `--shadow-raised` | Tarjetas, dropdowns |
| `--shadow-overlay` | Modales, drawers, tooltips |
| `--shadow-focus` | Focus ring (box-shadow) |

---

## Catálogo de componentes

### Formularios

| Componente | Props clave | Notas |
|---|---|---|
| `TextInput` | `value, onChange, label?, hint?, error?, required?, optional?, disabled?, type?` | `React.forwardRef`. Error state: icono X Octagon 24px + texto bold 14px entre label y campo |
| `TextInputFloat` | Igual que TextInput | Label flotante CSS-only, sin JS |
| `TextArea` | `value, onChange, label?, hint?, error?, required?, optional?, disabled?, maxLength?` | Contador de caracteres cuando `maxLength` está definido |
| `Checkbox` | `checked, onChange, label?, disabled?, indeterminate?, size?('Large'\|'Small'), valid?` | `indeterminate` se aplica vía ref DOM. `valid=false` activa error styling |
| `CheckboxGroup` | `options, value[], onChange, label?, disabled?` | Wrapper accesible con fieldset + legend |
| `Toggle` | `checked, onChange, label?, size?('Medium'\|'Small'), disabled?, id?` | `role="switch"` + `aria-checked` |
| `Select` | `options, value?, onChange, placeholder?, label?, required?, optional?, hint?, valid?, errorMessage?, disabled?` | ARIA combobox completo. `error` prop deprecada, usar `valid=false + errorMessage` |
| `Slider` | `value, onChange, min?, max?, step?, label?, disabled?` | Track fill animado CSS-only |
| `Autocomplete` | `value, onChange, options, placeholder?, label?, disabled?` | Filtrado + navegación por teclado |
| `Combobox` | `value, onChange, options, placeholder?, label?, disabled?` | Input libre + selector estructurado |
| `RadioButton` | `checked, onChange, label?, disabled?, size?('Large'\|'Small')` | Usar dentro de RadioButtonGroup |
| `RadioButtonGroup` | `options, value, onChange, label?, disabled?` | fieldset + legend accesible |
| `FileUpload` | `onFilesAdded, accept?, multiple?, maxSize?, label?, hint?, optional?, required?, valid?, errorMessage?, files?, onRemove?` | Dropzone drag-over + lista de archivos controlada |
| `DatePicker` | `value?, onChange, label?, required?, optional?, hint?, valid?, errorMessage?, disabled?` | Calendario nativo sin dependencias |
| `SearchInput` | `value, onChange, onSearch?, onClear?, placeholder?, size?('Medium'\|'Small'), type?('Default'\|'Button'), disabled?, label?` | Icono lupa + botón limpiar |
| `Stepper` | `value, onChange, min?, max?, step?, label?, required?, optional?, hint?, valid?, errorMessage?, disabled?` | Numérico con controles +/- |

### Botones

| Componente | Props clave | Notas |
|---|---|---|
| `Button` | `variant?('Primary'\|'Secondary'\|'Tertiary'), tone?('Brand'\|'Neutral'\|'Inverse'\|'Destructive'), size?('Large'\|'Medium'\|'Small'), disabled?, loading?, iconLeft?, iconRight?, onClick?, type?, children` | `aria-busy` durante loading. Spinner CSS interno |
| `ButtonIcon` | `variant?, tone?, size?, shape?('Square'\|'Circle'), disabled?, onClick?, children` | Botón icónico sin texto |
| `ButtonGroup` | `children, orientation?('horizontal'\|'vertical')` | Agrupa botones con bordes unidos |

### Navegación

| Componente | Props clave | Notas |
|---|---|---|
| `NavigationHeader` | `type?('Desktop'\|'DesktopAlt'\|'MobileClosed'\|'MobileOpen'), logo?, menuItems?, showSearch?, showButtons?, showAvatar?, avatarSrc?, avatarName?, breadcrumbs?` | Header sticky 64px con logo, nav y avatar |
| `NavigationSide` | `type?, items?, collapsed?` | Sidebar 240px colapsable a 64px icon-only |
| `NavigationSideItem` | `label, icon?, active?, disabled?, href?, onClick?` | Ítem individual de sidebar |
| `Breadcrumbs` | `items: {label, href?}[], aria-label?` | `aria-current="page"` en último ítem |
| `Tabs` | `tabs: TabOption[], defaultTab?, value?, onChange?` | Navegación por teclado (flechas) |
| `TabItem` | `id, label, active?, disabled?, onClick?` | Pestaña individual |
| `Pagination` | `page, totalPages, onPageChange, pageSize?, totalItems?, device?('Desktop'\|'Mobile'), siblingCount?` | Elipsis automáticas. Label "X–Y de N" con `totalItems` |
| `PageSingle` | `page, state?` | Ítem de página individual para Pagination custom |
| `Accordion` | `items: AccordionItem[], allowMultiple?, defaultOpen?: string[]` | Animación de altura CSS |
| `ProgressIndicator` | `steps, currentStep, orientation?` | Indicador de pasos (wizard) |

### Overlay y feedback

| Componente | Props clave | Notas |
|---|---|---|
| `Modal` | `open, onClose, tone?('Default'\|'Destructive'), size?('Small'\|'Large'), dismissible?, icon?, heading?, secondaryText?, image?, slots?, primaryAction?, secondaryAction?, children?` | Portal con backdrop. Focus trap |
| `Drawer` | `open, onClose, title?, size?('Small'\|'Large'), children?, footer?` | Panel lateral con overlay |
| `Alert` | `tone?, size?, layout?('Horizontal'\|'Vertical'), heading?, children?, borderLeft?, dismissible?, onDismiss?, icon?, iconContainer?, customIcon?, link?, buttonGroup?` | Banner inline semántico |
| `AlertGlobal` | `tone?, heading?, children?, dismissible?, onDismiss?` | Banner fixed top full-width |
| `Tooltip` | `type?('Bottom left'\|'Bottom right'\|'Bottom centre'\|'Left'\|'Right'), size?('Small'\|'Large'), heading?, headingText?, bodyText?, children?` | Aparece en hover/focus |
| `LoadingBar` | `value?, indeterminate?, label?` | Barra determinate e indeterminate |
| `Rating` | `value, onChange?, layout?('Horizontal'\|'Vertical'), readonly?` | Estrellas interactivas con hover preview |
| `RatingIcon` | `type?, state?` | Icono de estrella individual |

### Datos y tablas

| Componente | Props clave | Notas |
|---|---|---|
| `Badge` | `tone?('Error'\|'Warning'\|'Success'\|'Information'\|'Neutral'\|'Brand'), size?('Medium'\|'Small'), icon?, badgeDot?, children` | Pill semántica con icono SVG inline |
| `BadgeCount` | `count, max?(default 99), emphasis?('Strong'\|'Moderate'\|'Weak')` | Contador circular. Sobre 99 muestra "99+" |
| `BadgeDot` | `type?('Online'\|'Busy'\|'Away'\|'Offline'\|'Notification'), size?('Large'\|'Medium'\|'Small'), outline?` | Punto de estado. `outline` para superficies de color |
| `Tag` | `label, onRemove?, icon?, disabled?` | Etiqueta removible |
| `Divider` | `type?('Horizontal'\|'Vertical'), label?` | Separador con texto opcional |
| `Table` | `columns: TableColumn[], rows: Record<string, ReactNode>[], striped?` | Striped rows, hover |
| `TableHeadingCell` | `label, type?, sortable?` | Celda de encabezado con sort |
| `TableDataCell` | `type?, colour?` | Celda de dato con variantes de color |
| `SummaryList` | `rows: SummaryListRow[]` | Lista label/valor con acciones de edición |

### Tipografía

| Componente | Props clave | Notas |
|---|---|---|
| `Text` | `variant?, as?, children, align?('left'\|'center'\|'right')` | 8 variantes tipográficas. `as` permite cambiar el tag HTML |
| `TextBlock` | `align?('Left'\|'Centre'), heading?, icon?, secondaryText?, textLink?, headingText?, bodyText?, linkText?, linkHref?, iconNode?` | Bloque editorial compuesto |
| `TextLink` | `children, href?, onClick?, tone?('Default'\|'Neutral strong'\|'Neutral weak'\|'Destructive'\|'Inverse strong'\|'Inverse weak'), size?('Small'\|'Tiny'), weight?('Bold'\|'Regular'), underline?, disabled?, iconLeft?, iconRight?` | Enlace inline. Icono ↗ automático en href externo |

### Layout y contenido

| Componente | Props clave | Notas |
|---|---|---|
| `Card` | `type?('Vertical'\|'Horizontal'), image?, icon?, label?, heading?, body?, footer?, children?, onClick?` | Hover con sombra. `onClick` añade `role="button"` |
| `CardFlip` | `front, back, children?` | Animación 3D de volteo CSS |
| `Hero` | `title, type?, image?, tag?, uppercase?, description?, primaryAction?, secondaryAction?, emailCapture?, socialProof?` | Sección portada |
| `Footer` | `columns?, links?, socialLinks?, size?` | Pie oscuro con columnas y legal |
| `BannerSlider` | `slides, autoplay?, interval?` | Carrusel full-width con dots |
| `Testimonial` | `quote, author?, role?, rating?` | Tarjeta de cita |
| `EmptyState` | `icon?, heading?, description?, action?` | Pantalla vacía con CTA |
| `Slot` | `label?, children?` | Placeholder de layout con borde punteado |

### Métricas y gráficas

| Componente | Props clave | Notas |
|---|---|---|
| `BarChart` | `data: BarChartDataPoint[], height?, title?, showValues?, maxValue?` | SVG nativo sin dependencias |
| `PieChart` | `segments: PieChartSegment[], size?, showLegend?` | SVG nativo |
| `ProgressBar` | `value, max?, size?, label?, showValue?` | Tres tamaños |
| `MotionBar` | `items: MotionBarItem[], animated?` | Conteo con `requestAnimationFrame` |

### Identidad y usuario

| Componente | Props clave | Notas |
|---|---|---|
| `Avatar` | `type?('Photo'\|'Icon'\|'Initials'\|'Logo'), size?('Small'\|'Medium'\|'Large'), src?, initials?, alt?, status?, notification?` | `status` = BadgeDot verde. `notification` = BadgeCount |
| `AvatarDropdown` | `avatarProps, menuItems: AvatarMenuItem[]` | Avatar + menú de usuario |
| `User` | `name, role?, avatarProps?, size?` | Avatar + nombre + rol |
| `Actuarin` | `expression?` | Mascota SVG de Actuaria, 3 expresiones |
| `Logotipo` | `variant?('Wordmark'\|'Monogram')` | Logo SVG inline |
| `IconContainer` | `tone?, style?, children` | Wrapper de icono con variante semántica |
| `SegmentedControl` | `options: SegmentOption[], value, onChange, size?('Medium'\|'Small'), aria-label?` | Selector exclusivo tipo pill |
| `SegmentedControlItem` | `label, value, active?, disabled?` | Ítem individual de SegmentedControl |
| `DropdownMenu` | `items: DropdownItem[], trigger?, align?` | Menú con items danger y disabled |
| `Tracking` | `steps, currentStep?` | Timeline vertical de seguimiento |
| `ProductCard` | `size?, badge?, badgeTone?, heading?, description?, price?, action?` | Tarjeta de producto con badge |

---

## Guia para Claude

Instrucciones directas para generar código con este DS correctamente.

**Importaciones**

Siempre importar desde el barrel:
```tsx
import { Button, TextInput, Badge } from './src/components/index';
```
Nunca importar desde rutas individuales como `./Button/Button`.

**Tokens CSS**

Usar con fallback para robustez:
```css
color: var(--text-strong, rgba(0,6,38,0.9));
background: var(--fill-selected, #151f47);
border-color: var(--stroke-strong, rgba(0,17,102,0.25));
```

**Stack — sin excepciones**

- Solo React + TypeScript + CSS Modules
- No Tailwind, no MUI, no styled-components, no inline styles con hex directos
- Cero dependencias externas en componentes del DS

**Convenciones CSS**

Cada componente usa un prefijo de 3 letras en sus clases CSS:

| Componente | Prefijo |
|---|---|
| Toggle | `tog-` |
| TextLink | `tl-` |
| Tooltip | `tt-` |
| Button | `btn-` |
| Badge | `bdg-` |
| Checkbox | `cb-` |
| TextInput | `ti-` |
| TextArea | `ta-` |
| Card | `card-` |
| Modal | `mdl-` |
| Drawer | `drw-` |

Seguir el patrón: `.{prefijo}-root`, `.{prefijo}-root--{variante}`, `.{prefijo}-{parte}`.

**Estados interactivos**

Siempre con pseudo-clases CSS, nunca con JavaScript:
```css
.btn-root:hover { background: var(--fill-hover); }
.btn-root:active { background: var(--fill-press); }
```

**Focus ring**

Estándar en todos los componentes interactivos:
```css
:focus-visible {
  outline: 2px solid #151f47;
  outline-offset: 4px;
}
```

Alternativa con box-shadow para campos con border-radius:
```css
box-shadow: 0 0 0 2px #151f47;
```

**Componentes de formulario**

Todos deben usar `React.forwardRef` para compatibilidad con bibliotecas de formularios:
```tsx
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => { ... }
);
```

**Error states**

Estructura exacta para campos con error:
1. Label con asterisco si `required`
2. Icono X Octagon SVG 24px + texto bold 14px en color `--text-error` (entre label y campo)
3. Campo con `border-color: var(--stroke-error)` y `background: var(--fill-error-weak)`

**Colores de marca — valores hardcoded permitidos solo en tokens CSS**

```
Navy:         #151f47
Indigo:       #4c64d9
Dark Surface: #12131a
Orange:       #E0592A
```

En componentes, usar siempre `var(--token)`, nunca hex directos.

**Dark mode**

Todos los tokens cambian bajo `[data-theme='dark']`:
```css
[data-theme='dark'] .ti-root { ... }
```

**Idioma**

Responder al equipo siempre en español. Código (nombres de variables, funciones, clases) en inglés.

---

## Figma

**Archivo de diseño:** `https://figma.com/file/N1wh3u4sX3UGyUU5oWOaz6`

Para obtener el `nodeId` de un componente en Figma:
1. Seleccionar el componente en el canvas
2. Copiar el link con `Cmd/Ctrl + L`
3. El `node-id` aparece en la URL como `?node-id=3433-80097`
4. Convertir el guión a dos puntos para la API: `3433:80097`

Cada componente `.tsx` incluye su Figma node en el comentario de cabecera:
```tsx
/* Button — Figma node: 3433:80097 · fileKey: N1wh3u4sX3UGyUU5oWOaz6 */
```

---

## Estructura del repositorio

```
design-system-actuaria/
├── tokens.ts                  # Tokens TypeScript exportables
├── design-tokens.css          # CSS Custom Properties (fuente canónica)
├── Tokens.stories.mdx         # Documentación de tokens en Storybook
└── src/
    └── components/
        ├── index.ts           # Barrel export — 68 componentes
        └── [Nombre]/
            ├── [Nombre].tsx          # Componente React + TS estricto
            ├── [Nombre].module.css   # CSS Modules con tokens semánticos
            └── [Nombre].stories.tsx  # Storybook 7 con todas las variantes
```

**Para visualizar en Storybook:**

```bash
npm install
npm run storybook
# → http://localhost:6006
```

---

## Estándares

| Norma | Aplicación |
|---|---|
| **ISO 9001:2015** | Trazabilidad en cada cambio: Figma node en cabecera de componente, versión en package.json |
| **ISO/IEC 27001:2022** | Sin datos sensibles ni credenciales en código. Ningún componente almacena PII |

Todos los componentes cumplen **WCAG AA**: contraste mínimo 4.5:1 en texto, roles ARIA correctos, navegación por teclado completa, `aria-live` en estados dinámicos.

---

MIT © 2026 Actuaria Consultores · Mantenido por el equipo de Producto
