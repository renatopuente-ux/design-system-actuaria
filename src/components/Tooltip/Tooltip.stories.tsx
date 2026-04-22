import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

const TriggerButton = ({ label }: { label: string }) => (
  <button
    style={{
      padding: '8px 16px',
      borderRadius: 8,
      border: '1px solid var(--stroke-weak)',
      background: 'var(--fill-weaker)',
      cursor: 'pointer',
      fontFamily: 'var(--font-family-body)',
      fontWeight: 600,
      color: 'var(--text-brand)',
      fontSize: 14,
    }}
  >
    {label}
  </button>
);

export const Arriba: Story = {
  args: {
    content: 'Tasa de descuento utilizada en el cálculo de valor presente neto de reservas.',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton label="Tasa de descuento" />
    </Tooltip>
  ),
};

export const Abajo: Story = {
  args: {
    content: 'Mortalidad calculada con tabla CNSF 2000-I para asegurados hombres.',
    placement: 'bottom',
  },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton label="qx (mortalidad)" />
    </Tooltip>
  ),
};

export const Izquierda: Story = {
  args: {
    content: 'Reserva matemática mínima requerida por la CNSF.',
    placement: 'left',
  },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton label="Reserva mínima" />
    </Tooltip>
  ),
};

export const Derecha: Story = {
  args: {
    content: 'Prima neta calculada bajo el método actuarial prospectivo.',
    placement: 'right',
  },
  render: (args) => (
    <Tooltip {...args}>
      <TriggerButton label="Prima neta" />
    </Tooltip>
  ),
};
