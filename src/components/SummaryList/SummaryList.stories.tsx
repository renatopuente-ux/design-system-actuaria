import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SummaryList } from './SummaryList';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof SummaryList> = {
  title: 'Components/SummaryList',
  component: SummaryList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SummaryList>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      { label: 'Número de póliza', value: 'POL-2024-001' },
      { label: 'Contratante', value: 'Constructora Andina S.A.' },
      { label: 'Producto', value: 'Vida Grupo' },
      { label: 'Suma asegurada', value: '$7,843,200' },
      { label: 'Prima anual', value: '$312,480' },
    ],
  },
};

export const WithActions: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      {
        label: 'Número de póliza',
        value: 'POL-2024-001',
        action: { label: 'Editar', onClick: () => alert('Editar póliza') },
      },
      {
        label: 'Contratante',
        value: 'Constructora Andina S.A.',
        action: { label: 'Editar', onClick: () => alert('Editar contratante') },
      },
      {
        label: 'Vigencia',
        value: '01/02/2024 – 01/02/2025',
        action: { label: 'Renovar', onClick: () => alert('Renovar') },
      },
      { label: 'Suma asegurada', value: '$7,843,200' },
      { label: 'Prima anual', value: '$312,480' },
    ],
  },
};

/** Ficha de póliza completa con estado como Badge — flujo típico en Actuaria Plus */
export const PolicyDetail: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 520 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      { label: 'Número de póliza', value: 'POL-2024-003' },
      { label: 'Asegurado principal', value: 'Agropecuaria del Valle' },
      { label: 'Línea de negocio', value: 'Salud Colectivo' },
      { label: 'Fecha de emisión', value: '15/03/2024' },
      { label: 'Fecha de vencimiento', value: '15/03/2025' },
      {
        label: 'Estado',
        value: <Badge label="Próximo a vencer" variant="warning" size="sm" />,
        action: { label: 'Renovar', onClick: () => alert('Iniciar renovación') },
      },
      { label: 'Prima mensual', value: '$7,015' },
      { label: 'Suma asegurada total', value: '$2,104,500' },
      {
        label: 'Agente responsable',
        value: 'Lic. Patricia Garza',
        action: { label: 'Ver perfil', onClick: () => alert('Ver perfil de agente') },
      },
    ],
  },
};

/** Resumen de reserva matemática — panel lateral del dashboard de riesgos */
export const ReserveSummary: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      { label: 'Reserva matemática', value: '$45,832,100' },
      { label: 'Reserva de riesgo en curso', value: '$3,214,800' },
      { label: 'Reserva IBNR', value: '$1,204,000' },
      { label: 'Tasa técnica aplicada', value: '3.5% anual' },
      { label: 'Tabla de mortalidad', value: 'CNSF 2000-I' },
      { label: 'Total reservas técnicas', value: '$50,250,900' },
    ],
  },
};
