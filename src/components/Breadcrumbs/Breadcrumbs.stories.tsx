import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Actuaria Plus' },
    ],
  },
};

export const DeepNesting: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Análisis de Riesgo', href: '/riesgo' },
      { label: 'Reservas Técnicas', href: '/riesgo/reservas' },
      { label: 'Capital Adecuado', href: '/riesgo/reservas/capital' },
      { label: 'Resultados 2024' },
    ],
  },
};

export const SingleLevel: Story = {
  args: {
    items: [{ label: 'Dashboard' }],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Reportes', href: '/reportes' },
      { label: 'Índice de Solvencia Q3 2025' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Modelos Predictivos', href: '/modelos' },
      { label: 'Deserción de Clientes' },
    ],
    separator: <span aria-hidden="true" style={{ color: 'var(--text-weak)' }}>›</span>,
  },
};
