import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'radio', options: ['Horizontal', 'Vertical'] },
    size:   { control: 'radio', options: ['Large', 'Medium', 'Small'] },
  },
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// ── Default — Primary + Secondary horizontal ───────────────────
export const Default: Story = {
  args: { layout: 'Horizontal', size: 'Medium' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="Primary" tone="Brand" size={args.size}>Calcular reservas</Button>
      <Button variant="Secondary" tone="Brand" size={args.size}>Ver detalle</Button>
    </ButtonGroup>
  ),
};

// ── Horizontal ─────────────────────────────────────────────────
export const Horizontal: Story = {
  render: () => (
    <ButtonGroup layout="Horizontal" size="Medium">
      <Button variant="Primary"   tone="Brand" size="Medium">Guardar</Button>
      <Button variant="Secondary" tone="Brand" size="Medium">Cancelar</Button>
      <Button variant="Tertiary"  tone="Brand" size="Medium">Ver más</Button>
    </ButtonGroup>
  ),
};

// ── Vertical ───────────────────────────────────────────────────
export const Vertical: Story = {
  render: () => (
    <ButtonGroup layout="Vertical" size="Medium">
      <Button variant="Primary"   tone="Brand" size="Medium">Calcular reservas</Button>
      <Button variant="Secondary" tone="Brand" size="Medium">Exportar resultados</Button>
      <Button variant="Tertiary"  tone="Brand" size="Medium">Ver documentación</Button>
    </ButtonGroup>
  ),
};

// ── Reversed order: Secondary first ───────────────────────────
export const ReversedOrder: Story = {
  render: () => (
    <ButtonGroup layout="Horizontal" size="Medium">
      <Button variant="Secondary" tone="Brand" size="Medium">Cancelar</Button>
      <Button variant="Primary"   tone="Brand" size="Medium">Confirmar</Button>
    </ButtonGroup>
  ),
};

// ── Large ──────────────────────────────────────────────────────
export const Large: Story = {
  render: () => (
    <ButtonGroup layout="Horizontal" size="Large">
      <Button variant="Primary"   tone="Brand" size="Large">Calcular</Button>
      <Button variant="Secondary" tone="Brand" size="Large">Cancelar</Button>
    </ButtonGroup>
  ),
};

// ── Small ──────────────────────────────────────────────────────
export const Small: Story = {
  render: () => (
    <ButtonGroup layout="Horizontal" size="Small">
      <Button variant="Primary"   tone="Brand" size="Small">Guardar</Button>
      <Button variant="Secondary" tone="Brand" size="Small">Descartar</Button>
    </ButtonGroup>
  ),
};

// ── Destructive ────────────────────────────────────────────────
export const Destructive: Story = {
  render: () => (
    <ButtonGroup layout="Horizontal" size="Medium">
      <Button variant="Primary"   tone="Destructive" size="Medium">Eliminar póliza</Button>
      <Button variant="Secondary" tone="Neutral"     size="Medium">Cancelar</Button>
    </ButtonGroup>
  ),
};

// ── Vertical Large ─────────────────────────────────────────────
export const VerticalLarge: Story = {
  render: () => (
    <ButtonGroup layout="Vertical" size="Large">
      <Button variant="Primary"   tone="Brand" size="Large">Calcular reservas técnicas</Button>
      <Button variant="Secondary" tone="Brand" size="Large">Exportar a Excel</Button>
    </ButtonGroup>
  ),
};
