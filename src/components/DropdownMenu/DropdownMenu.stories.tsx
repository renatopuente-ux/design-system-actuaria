import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import type { DropdownItem } from './DropdownMenu';

// ---------------------------------------------------------------------------
// Generic trigger — no external component imports to avoid circular deps
// ---------------------------------------------------------------------------

const Trigger = ({ label = 'Abrir menú' }: { label?: string }) => (
  <button
    type="button"
    style={{
      height: 48,
      padding: '0 16px',
      borderRadius: 8,
      border: '1.5px solid rgba(21,31,71,0.8)',
      background: 'white',
      fontFamily: 'Nunito, sans-serif',
      fontSize: 16,
      fontWeight: 600,
      color: '#151f47',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}
  >
    {label}
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path
        d="M5 7.5l5 5 5-5"
        stroke="#151f47"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </button>
);

// ---------------------------------------------------------------------------
// Diamond icon (inline SVG, no external deps)
// ---------------------------------------------------------------------------

const DiamondIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L21 12L12 21L3 12L12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ChartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="6" width="4" height="15" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="16 17 21 12 16 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="21"
      y1="12"
      x2="9"
      y2="12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

// ---------------------------------------------------------------------------
// DefaultItems — 6 default items with diamond icons, one selected
// ---------------------------------------------------------------------------

const defaultItems: DropdownItem[] = [
  { type: 'default', label: 'Jubilación patronal', value: 'jubilacion', icon: <DiamondIcon />, selected: true },
  { type: 'default', label: 'Estudios actuariales', value: 'estudios', icon: <DiamondIcon /> },
  { type: 'default', label: 'Panel de proyecciones', value: 'panel', icon: <ChartIcon /> },
  { type: 'default', label: 'Configuración', value: 'configuracion', icon: <SettingsIcon /> },
  { type: 'default', label: 'Exportar reporte', value: 'exportar', icon: <DiamondIcon />, disabled: true },
  { type: 'default', label: 'Cerrar sesión', value: 'logout', icon: <LogoutIcon />, danger: true },
];

export const DefaultItems: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Trigger label="Servicios" />}
      items={defaultItems}
      onSelect={(value) => console.log('selected:', value)}
    />
  ),
};

// ---------------------------------------------------------------------------
// WithDividers — avatar + divider + 4 default + divider + 1 danger
// ---------------------------------------------------------------------------

const dividersItems: DropdownItem[] = [
  {
    type: 'avatar',
    value: 'profile',
    avatarName: 'Renato Puente',
    avatarEmail: 'renato.puente@actuaria.com',
  },
  { type: 'divider' },
  { type: 'default', label: 'Jubilación patronal', value: 'jubilacion', icon: <DiamondIcon /> },
  { type: 'default', label: 'Estudios actuariales', value: 'estudios', icon: <DiamondIcon /> },
  { type: 'default', label: 'Panel de proyecciones', value: 'panel', icon: <ChartIcon /> },
  { type: 'default', label: 'Configuración', value: 'configuracion', icon: <SettingsIcon /> },
  { type: 'divider' },
  { type: 'default', label: 'Cerrar sesión', value: 'logout', icon: <LogoutIcon />, danger: true },
];

export const WithDividers: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Trigger label="Mi cuenta" />}
      items={dividersItems}
      onSelect={(value) => console.log('selected:', value)}
    />
  ),
};

// ---------------------------------------------------------------------------
// WithCheckboxes — 5 checkbox items, 2 checked
// ---------------------------------------------------------------------------

const checkboxItems: DropdownItem[] = [
  { type: 'checkbox', label: 'Reservas técnicas', value: 'reservas', checked: true },
  { type: 'checkbox', label: 'Capital de solvencia', value: 'capital', checked: true },
  { type: 'checkbox', label: 'Prima de riesgo', value: 'prima', checked: false },
  { type: 'checkbox', label: 'Deserción de cartera', value: 'desercion', checked: false },
  { type: 'checkbox', label: 'Fraude actuarial', value: 'fraude', checked: false },
];

export const WithCheckboxes: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Trigger label="Filtros" />}
      items={checkboxItems}
      onSelect={(value) => console.log('toggled:', value)}
    />
  ),
};

// ---------------------------------------------------------------------------
// WithSecondaryText — 4 secondary-text items
// ---------------------------------------------------------------------------

const secondaryTextItems: DropdownItem[] = [
  {
    type: 'secondary-text',
    label: 'Jubilación patronal',
    value: 'jubilacion',
    secondaryText: 'Cálculo de reservas y capital',
    icon: <DiamondIcon />,
  },
  {
    type: 'secondary-text',
    label: 'Estudios actuariales',
    value: 'estudios',
    secondaryText: 'Valuación técnica independiente',
    icon: <DiamondIcon />,
  },
  {
    type: 'secondary-text',
    label: 'Panel de proyecciones',
    value: 'panel',
    secondaryText: 'Dashboards de analytics en tiempo real',
    icon: <ChartIcon />,
  },
  {
    type: 'secondary-text',
    label: 'Configuración',
    value: 'configuracion',
    secondaryText: 'Preferencias de la cuenta',
    icon: <SettingsIcon />,
  },
];

export const WithSecondaryText: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Trigger label="Módulos" />}
      items={secondaryTextItems}
      onSelect={(value) => console.log('selected:', value)}
    />
  ),
};

// ---------------------------------------------------------------------------
// WithHeadings — 2 heading sections with 2 default items each
// ---------------------------------------------------------------------------

const headingsItems: DropdownItem[] = [
  { type: 'heading', label: 'Productos' },
  { type: 'default', label: 'Jubilación patronal', value: 'jubilacion', icon: <DiamondIcon /> },
  { type: 'default', label: 'Estudios actuariales', value: 'estudios', icon: <DiamondIcon /> },
  { type: 'heading', label: 'Cuenta' },
  { type: 'default', label: 'Configuración', value: 'configuracion', icon: <SettingsIcon /> },
  { type: 'default', label: 'Cerrar sesión', value: 'logout', icon: <LogoutIcon />, danger: true },
];

export const WithHeadings: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Trigger label="Menú" />}
      items={headingsItems}
      onSelect={(value) => console.log('selected:', value)}
    />
  ),
};

// ---------------------------------------------------------------------------
// AlignBottomRight
// ---------------------------------------------------------------------------

const alignItems: DropdownItem[] = [
  { type: 'default', label: 'Jubilación patronal', value: 'jubilacion', icon: <DiamondIcon /> },
  { type: 'default', label: 'Panel de proyecciones', value: 'panel', icon: <ChartIcon /> },
  { type: 'default', label: 'Configuración', value: 'configuracion', icon: <SettingsIcon /> },
  { type: 'default', label: 'Cerrar sesión', value: 'logout', icon: <LogoutIcon />, danger: true },
];

export const AlignBottomRight: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Trigger label="Alinear derecha" />}
      items={alignItems}
      align="bottom-right"
      onSelect={(value) => console.log('selected:', value)}
    />
  ),
};

// ---------------------------------------------------------------------------
// AlignTopLeft
// ---------------------------------------------------------------------------

export const AlignTopLeft: Story = {
  render: () => (
    <div style={{ marginTop: 160 }}>
      <DropdownMenu
        trigger={<Trigger label="Alinear arriba" />}
        items={alignItems}
        align="top-left"
        onSelect={(value) => console.log('selected:', value)}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Playground — all props as controls, 5 default items
// ---------------------------------------------------------------------------

const playgroundItems: DropdownItem[] = [
  { type: 'default', label: 'Jubilación patronal', value: 'jubilacion', icon: <DiamondIcon /> },
  { type: 'default', label: 'Estudios actuariales', value: 'estudios', icon: <DiamondIcon />, selected: true },
  { type: 'default', label: 'Panel de proyecciones', value: 'panel', icon: <ChartIcon /> },
  { type: 'default', label: 'Configuración', value: 'configuracion', icon: <SettingsIcon /> },
  { type: 'default', label: 'Cerrar sesión', value: 'logout', icon: <LogoutIcon />, danger: true },
];

export const Playground: Story = {
  args: {
    trigger: <Trigger label="Playground" />,
    items: playgroundItems,
    align: 'bottom-left',
    onSelect: (value: string) => console.log('selected:', value),
  },
};
