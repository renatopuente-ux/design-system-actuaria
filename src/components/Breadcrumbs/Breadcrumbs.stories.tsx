import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const actuariaItems = [
  { label: 'Inicio',             href: '/' },
  { label: 'Análisis de Riesgo', href: '/riesgo' },
  { label: 'Reservas Técnicas',  href: '/riesgo/reservas' },
  { label: 'Capital Adecuado',   href: '/riesgo/reservas/capital' },
  { label: 'Resultados 2024' },
];

// ── Default — all items ────────────────────────────────────────
export const Default: Story = {
  args: {
    items: [
      { label: 'Inicio',        href: '/' },
      { label: 'Productos',     href: '/productos' },
      { label: 'Actuaria Plus' },
    ],
    collapsed: false,
  },
};

// ── Collapsed — first / … / last ──────────────────────────────
export const Collapsed: Story = {
  args: {
    items:     actuariaItems,
    collapsed: true,
  },
};

// ── Controlled expand ─────────────────────────────────────────
export const ControlledExpand: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(true);
    return (
      <Breadcrumbs
        items={actuariaItems}
        collapsed={collapsed}
        onExpandCollapsed={() => setCollapsed(false)}
      />
    );
  },
};

// ── 3 items ────────────────────────────────────────────────────
export const ThreeItems: Story = {
  args: {
    items: [
      { label: 'Reportes',         href: '/reportes' },
      { label: 'Solvencia',        href: '/reportes/solvencia' },
      { label: 'Índice Q3 2025' },
    ],
  },
};

// ── 2 items ────────────────────────────────────────────────────
export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Modelos', href: '/modelos' },
      { label: 'Deserción de clientes' },
    ],
  },
};

// ── Single item ────────────────────────────────────────────────
export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard' }],
  },
};

// ── Deep — 8 items ────────────────────────────────────────────
export const DeepNesting: Story = {
  args: {
    items: [
      { label: 'Inicio',          href: '/' },
      { label: 'Plataforma',      href: '/plataforma' },
      { label: 'Actuaria Plus',   href: '/plataforma/plus' },
      { label: 'Cálculo',         href: '/plataforma/plus/calculo' },
      { label: 'Reservas',        href: '/plataforma/plus/calculo/reservas' },
      { label: 'Vida individual',  href: '/plataforma/plus/calculo/reservas/vida' },
      { label: 'CNSF 2000-I',     href: '/plataforma/plus/calculo/reservas/vida/cnsf' },
      { label: 'Resultados' },
    ],
  },
};
