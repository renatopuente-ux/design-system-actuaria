# CLAUDE.md — Design System Actuaria

Convenciones que Claude debe seguir al trabajar en este repositorio.

## Stack — sin excepciones

- React 18 + TypeScript estricto
- CSS Modules (archivos `.module.css` por componente)
- Sin Tailwind, sin MUI, sin styled-components, sin inline styles con valores hex

## Importaciones

Siempre desde el barrel export:

```tsx
import { Button, TextInput, Badge } from './src/components/index';
```

Nunca desde rutas individuales.

## Tokens CSS

Usar con fallback:

```css
color: var(--text-strong, rgba(0,6,38,0.9));
background: var(--interactive-action, #4c64d9);
```

Cargar `design-tokens.css` en el entry point del proyecto anfitrión.

## Colores de marca

```
Navy:         #151f47  →  --fill-selected, --stroke-focus
Indigo:       #4c64d9  →  --interactive-action, --text-brand
Dark Surface: #12131a  →  superficies oscuras
Orange:       #E0592A  →  acento de alerta
```

En componentes usar siempre `var(--token)`. Los valores hex solo van en `design-tokens.css`.

## Convenciones CSS

Prefijo de 3 letras por componente en nombres de clase:

```
tog-   Toggle          btn-   Button         bdg-   Badge
cb-    Checkbox        ti-    TextInput       ta-    TextArea
tl-    TextLink        tt-    Tooltip         mdl-   Modal
drw-   Drawer          card-  Card
```

Patrón de clases: `.{prefijo}-root` / `.{prefijo}-root--{variante}` / `.{prefijo}-{parte}`

## Estados interactivos

Siempre con pseudo-clases CSS, nunca con JavaScript:

```css
.btn-root:hover  { background: var(--fill-hover); }
.btn-root:active { background: var(--fill-press); }
```

## Focus ring

```css
:focus-visible {
  outline: 2px solid #151f47;
  outline-offset: 4px;
}
```

## Componentes de formulario

Todos usan `React.forwardRef`:

```tsx
export const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>(
  ({ ...props }, ref) => <input ref={ref} {...props} />
);
MyInput.displayName = 'MyInput';
```

## Error states

Orden visual exacto:
1. Label (con `*` si `required`)
2. Icono X Octagon SVG 24px + texto bold 14px color `var(--text-error, #EF4444)`
3. Campo con `border-color: var(--stroke-error)` + `background: var(--fill-error-weak)`

## Dark mode

Tokens sobrescritos bajo `[data-theme='dark']`:

```css
[data-theme='dark'] .component-root {
  background: var(--fill-selected);
  color: var(--text-strong);
}
```

## Estructura de un nuevo componente

```
src/components/NombreComponente/
├── NombreComponente.tsx          # Lógica + JSX
├── NombreComponente.module.css   # Estilos con tokens semánticos
└── NombreComponente.stories.tsx  # Storybook 7
```

Cabecera obligatoria en el `.tsx`:

```tsx
/* NombreComponente — Actuaria Design System
   Figma node: XXXX:XXXXX  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6 */
```

## Figma

FileKey: `N1wh3u4sX3UGyUU5oWOaz6`

Para obtener el nodeId: seleccionar componente en Figma → `Cmd/Ctrl+L` → extraer `node-id` de la URL → convertir guión a dos puntos (`3433-80097` → `3433:80097`).

## Accesibilidad

- Contraste mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande)
- `aria-*` y `role` correctos en todos los componentes interactivos
- Navegación por teclado completa (Tab, Enter, Space, Escape, flechas donde aplica)
- `aria-live="polite"` en mensajes de error y estados dinámicos

## Idioma

Responder al equipo siempre en **español**. Código (variables, funciones, clases CSS) en **inglés**.

## Normas ISO

- **ISO 9001:2015**: trazabilidad — Figma node en cada componente, versión en `package.json`
- **ISO/IEC 27001:2022**: sin datos sensibles ni credenciales en código fuente
