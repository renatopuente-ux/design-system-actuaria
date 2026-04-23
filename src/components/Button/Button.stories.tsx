import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from './Button';
import type { ButtonVariant, ButtonTone, ButtonSize } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select',  options: ['Primary', 'Secondary', 'Tertiary'] },
    tone:     { control: 'select',  options: ['Brand', 'Neutral', 'Inverse', 'Destructive'] },
    size:     { control: 'radio',   options: ['Large', 'Medium', 'Small'] },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

const VARIANTS: ButtonVariant[] = ['Primary', 'Secondary', 'Tertiary'];
const TONES: ButtonTone[]       = ['Brand', 'Neutral', 'Destructive'];
const SIZES: ButtonSize[]       = ['Large', 'Medium', 'Small'];

// ── Default / playground ───────────────────────────────────────
export const Default: Story = {
  args: { variant: 'Primary', tone: 'Brand', size: 'Medium', children: 'Calcular reservas' },
};

// ── All variants × tones ───────────────────────────────────────
export const AllVariantsAndTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {TONES.map((tone) => (
            <Button key={tone} variant={variant} tone={tone} size="Medium">
              {variant} · {tone}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── All sizes ──────────────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      {SIZES.map((size) => (
        <Button key={size} variant="Primary" tone="Brand" size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

// ── Inverse tones (dark surface) ──────────────────────────────
export const InverseTones: Story = {
  render: () => (
    <div style={{ background: '#151f47', padding: 24, borderRadius: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="Primary"   tone="Inverse" size="Medium">Primary Inverse</Button>
      <Button variant="Secondary" tone="Inverse" size="Medium">Secondary Inverse</Button>
      <Button variant="Tertiary"  tone="Inverse" size="Medium">Tertiary Inverse</Button>
    </div>
  ),
};

// ── States ─────────────────────────────────────────────────────
export const Disabled: Story = {
  args: { variant: 'Primary', tone: 'Brand', size: 'Medium', children: 'No disponible', disabled: true },
};

export const Loading: Story = {
  args: { variant: 'Primary', tone: 'Brand', size: 'Medium', children: 'Procesando…', loading: true },
};

// ── Individual stories ─────────────────────────────────────────
export const PrimaryBrand: Story = {
  args: { variant: 'Primary', tone: 'Brand', children: 'Calcular reservas' },
};

export const PrimaryDestructive: Story = {
  args: { variant: 'Primary', tone: 'Destructive', children: 'Eliminar póliza' },
};

export const SecondaryBrand: Story = {
  args: { variant: 'Secondary', tone: 'Brand', children: 'Ver detalle' },
};

export const SecondaryDestructive: Story = {
  args: { variant: 'Secondary', tone: 'Destructive', children: 'Cancelar operación' },
};

export const TertiaryBrand: Story = {
  args: { variant: 'Tertiary', tone: 'Brand', children: 'Ver más información' },
};

export const TertiaryNeutral: Story = {
  args: { variant: 'Tertiary', tone: 'Neutral', children: 'Descartar cambios' },
};

// ── Icon slots ─────────────────────────────────────────────────
const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WithIconLeft: Story = {
  args: {
    variant: 'Primary', tone: 'Brand', size: 'Medium',
    children: 'Nueva póliza',
    iconLeft: <PlusIcon />,
  },
};

export const WithIconRight: Story = {
  args: {
    variant: 'Secondary', tone: 'Brand', size: 'Medium',
    children: 'Exportar',
    iconRight: <PlusIcon />,
  },
};
