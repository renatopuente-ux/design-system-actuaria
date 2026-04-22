import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    spacing: { control: { type: 'number', min: 0, max: 48 } },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    orientation: 'horizontal',
  },
};

export const WithLabel: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    orientation: 'horizontal',
    label: 'Datos del asegurado',
  },
};

export const WithSpacing: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    orientation: 'horizontal',
    label: 'Coberturas adicionales',
    spacing: 16,
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: 40, gap: 16 }}>
      <span style={{ fontSize: 14 }}>Póliza POL-2024-001</span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: 14 }}>Asegurado: Juan Pérez</span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: 14 }}>Reserva: $7,843,200</span>
    </div>
  ),
};

/** Típico uso en formulario de cotización — secciones separadas con label */
export const FormSections: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, fontSize: 14 }}>Datos generales del contratante</p>
      <Divider label="Información de cobertura" spacing={8} />
      <p style={{ margin: 0, fontSize: 14 }}>Suma asegurada y primas de riesgo</p>
      <Divider label="Beneficiarios" spacing={8} />
      <p style={{ margin: 0, fontSize: 14 }}>Designación de beneficiarios</p>
    </div>
  ),
};
