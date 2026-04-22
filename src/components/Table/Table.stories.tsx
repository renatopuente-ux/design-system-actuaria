import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Table } from './Table';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Table>;

const policyColumns = [
  { key: 'poliza', label: 'Póliza', align: 'left' as const },
  { key: 'asegurado', label: 'Asegurado', align: 'left' as const },
  { key: 'producto', label: 'Producto', align: 'left' as const },
  { key: 'reserva', label: 'Reserva (USD)', align: 'right' as const },
  { key: 'prima', label: 'Prima Anual (USD)', align: 'right' as const },
  { key: 'estado', label: 'Estado', align: 'center' as const },
];

const policyRows = [
  {
    poliza: 'POL-2024-001',
    asegurado: 'Constructora Andina S.A.',
    producto: 'Vida Grupo',
    reserva: '7,843,200',
    prima: '312,480',
    estado: <Badge label="Vigente" variant="success" size="sm" />,
  },
  {
    poliza: 'POL-2024-002',
    asegurado: 'Manufacturas del Norte',
    producto: 'Daños Industriales',
    reserva: '15,200,000',
    prima: '608,000',
    estado: <Badge label="En revisión" variant="info" size="sm" />,
  },
  {
    poliza: 'POL-2024-003',
    asegurado: 'Agropecuaria del Valle',
    producto: 'Salud Colectivo',
    reserva: '2,104,500',
    prima: '84,180',
    estado: <Badge label="Próximo a vencer" variant="warning" size="sm" />,
  },
  {
    poliza: 'POL-2024-004',
    asegurado: 'Servicios Logísticos SRL',
    producto: 'Vida Individual',
    reserva: '980,000',
    prima: '39,200',
    estado: <Badge label="Vigente" variant="success" size="sm" />,
  },
  {
    poliza: 'POL-2024-005',
    asegurado: 'Minera Continental',
    producto: 'Riesgos Catastróficos',
    reserva: '48,000,000',
    prima: '1,920,000',
    estado: <Badge label="Siniestro" variant="error" size="sm" />,
  },
];

export const Default: Story = {
  args: {
    columns: policyColumns,
    rows: policyRows,
    striped: false,
    hoverable: false,
  },
};

export const Striped: Story = {
  args: {
    columns: policyColumns,
    rows: policyRows,
    striped: true,
    hoverable: false,
  },
};

export const Hoverable: Story = {
  args: {
    columns: policyColumns,
    rows: policyRows,
    striped: false,
    hoverable: true,
  },
};

export const StripedAndHoverable: Story = {
  args: {
    columns: policyColumns,
    rows: policyRows,
    striped: true,
    hoverable: true,
  },
};

/** Tabla de reservas técnicas por línea de negocio */
export const ReservasTable: Story = {
  args: {
    columns: [
      { key: 'linea', label: 'Línea de negocio', align: 'left' },
      { key: 'polizas', label: 'Pólizas activas', align: 'right' },
      { key: 'reserva_mat', label: 'Reserva matemática', align: 'right' },
      { key: 'reserva_riesgo', label: 'Reserva de riesgo', align: 'right' },
      { key: 'total', label: 'Total reservas', align: 'right' },
    ],
    rows: [
      {
        linea: 'Vida Individual',
        polizas: '1,240',
        reserva_mat: '$45,832,100',
        reserva_riesgo: '$3,214,800',
        total: '$49,046,900',
      },
      {
        linea: 'Vida Grupo',
        polizas: '387',
        reserva_mat: '$112,004,500',
        reserva_riesgo: '$8,900,200',
        total: '$120,904,700',
      },
      {
        linea: 'Pensiones',
        polizas: '94',
        reserva_mat: '$203,441,000',
        reserva_riesgo: '$0',
        total: '$203,441,000',
      },
      {
        linea: 'Salud',
        polizas: '2,108',
        reserva_mat: '$0',
        reserva_riesgo: '$18,200,400',
        total: '$18,200,400',
      },
    ],
    striped: true,
    hoverable: true,
  },
};
