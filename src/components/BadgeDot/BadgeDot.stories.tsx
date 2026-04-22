import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BadgeDot } from './BadgeDot';

const meta: Meta<typeof BadgeDot> = {
  title: 'Components/BadgeDot',
  component: BadgeDot,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    size: { control: { type: 'number', min: 4, max: 24 } },
    pulse: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof BadgeDot>;

export const Default: Story = {
  args: {
    size: 8,
    pulse: false,
  },
};

export const Pulsing: Story = {
  args: {
    size: 8,
    pulse: true,
  },
};

export const Large: Story = {
  args: {
    size: 12,
    pulse: false,
  },
};

/** Green dot — used in data-source connection status panels */
export const Connected: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <BadgeDot color="var(--text-success, #059669)" size={8} pulse />
      <span style={{ fontSize: 14 }}>Fuente de datos conectada</span>
    </div>
  ),
};

/** All semantic states used in monitoring dashboards */
export const StatusRow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <BadgeDot color="var(--text-success, #059669)" pulse />
        <span style={{ fontSize: 14 }}>Sistema de cálculo activo</span>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <BadgeDot color="var(--text-warning, #d97706)" />
        <span style={{ fontSize: 14 }}>Procesando reservas técnicas</span>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <BadgeDot color="var(--text-error, #dc2626)" />
        <span style={{ fontSize: 14 }}>Error en modelo predictivo</span>
      </div>
    </div>
  ),
};
