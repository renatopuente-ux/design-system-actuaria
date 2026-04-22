import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: 'Vigente',
    variant: 'default',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    label: 'Activo',
    variant: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    label: 'Próximo a vencer',
    variant: 'warning',
    size: 'md',
  },
};

export const Error: Story = {
  args: {
    label: 'Siniestro reportado',
    variant: 'error',
    size: 'md',
  },
};

export const Info: Story = {
  args: {
    label: 'En revisión actuarial',
    variant: 'info',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    label: 'Vigente',
    variant: 'success',
    size: 'sm',
  },
};

/** All variants rendered together for design review */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge label="Default" variant="default" />
      <Badge label="Activo" variant="success" />
      <Badge label="Próximo a vencer" variant="warning" />
      <Badge label="Siniestro" variant="error" />
      <Badge label="En revisión" variant="info" />
    </div>
  ),
};

/** Actuarial policy status badges used in tabla de pólizas */
export const PolicyStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge label="Vigente" variant="success" size="sm" />
      <Badge label="Vencida" variant="error" size="sm" />
      <Badge label="Suspendida" variant="warning" size="sm" />
      <Badge label="En trámite" variant="info" size="sm" />
      <Badge label="Cancelada" variant="default" size="sm" />
    </div>
  ),
};
