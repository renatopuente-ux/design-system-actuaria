import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonIcon } from './ButtonIcon';
import type { ButtonIconVariant, ButtonIconTone, ButtonIconSize } from './ButtonIcon';

const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17H3v-3L14.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M3 6h14M8 6V4h4v2M5 6l1 11h8l1-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VARIANTS: ButtonIconVariant[] = ['Primary', 'Secondary', 'Tertiary'];
const TONES: ButtonIconTone[]       = ['Brand', 'Neutral', 'Destructive'];
const SIZES: ButtonIconSize[]       = ['Medium', 'Small'];

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant:    { control: 'select',  options: ['Primary', 'Secondary', 'Tertiary'] },
    tone:       { control: 'select',  options: ['Brand', 'Neutral', 'Inverse', 'Destructive'] },
    size:       { control: 'radio',   options: ['Medium', 'Small'] },
    shape:      { control: 'radio',   options: ['Square', 'Circle'] },
    loading:    { control: 'boolean' },
    disabled:   { control: 'boolean' },
    badgeDot:   { control: 'boolean' },
    badgeCount: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<typeof ButtonIcon>;

// ── Default / playground ───────────────────────────────────────
export const Default: Story = {
  args: { variant: 'Primary', tone: 'Brand', size: 'Medium', shape: 'Square', icon: <PlusIcon />, ariaLabel: 'Agregar' },
};

// ── All variants × tones ───────────────────────────────────────
export const AllVariantsAndTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {TONES.map((tone) => (
            <ButtonIcon key={tone} variant={variant} tone={tone} size="Medium" shape="Square"
              icon={<PlusIcon />} ariaLabel={`${variant} ${tone}`} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── Circle shape ───────────────────────────────────────────────
export const CircleShape: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <ButtonIcon variant="Primary"   tone="Brand" size="Medium" shape="Circle" icon={<PlusIcon />} ariaLabel="Agregar" />
      <ButtonIcon variant="Secondary" tone="Brand" size="Medium" shape="Circle" icon={<EditIcon />} ariaLabel="Editar" />
      <ButtonIcon variant="Tertiary"  tone="Brand" size="Medium" shape="Circle" icon={<TrashIcon />} ariaLabel="Eliminar" />
    </div>
  ),
};

// ── All sizes ──────────────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {SIZES.map((size) => (
        <ButtonIcon key={size} variant="Primary" tone="Brand" size={size} shape="Square"
          icon={<PlusIcon />} ariaLabel={`Agregar ${size}`} />
      ))}
    </div>
  ),
};

// ── Inverse (dark surface) ─────────────────────────────────────
export const InverseTones: Story = {
  render: () => (
    <div style={{ background: '#151f47', padding: 24, borderRadius: 12, display: 'flex', gap: 12 }}>
      <ButtonIcon variant="Primary"   tone="Inverse" size="Medium" shape="Square" icon={<PlusIcon />} ariaLabel="Agregar" />
      <ButtonIcon variant="Secondary" tone="Inverse" size="Medium" shape="Square" icon={<EditIcon />} ariaLabel="Editar" />
      <ButtonIcon variant="Tertiary"  tone="Inverse" size="Medium" shape="Square" icon={<TrashIcon />} ariaLabel="Eliminar" />
    </div>
  ),
};

// ── States ─────────────────────────────────────────────────────
export const Disabled: Story = {
  args: { variant: 'Primary', tone: 'Brand', size: 'Medium', shape: 'Square', icon: <PlusIcon />, ariaLabel: 'Agregar', disabled: true },
};

export const Loading: Story = {
  args: { variant: 'Primary', tone: 'Brand', size: 'Medium', shape: 'Square', icon: <PlusIcon />, ariaLabel: 'Procesando', loading: true },
};

// ── Badge dot ──────────────────────────────────────────────────
export const WithBadgeDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ButtonIcon variant="Primary"   tone="Brand" size="Medium" shape="Square" badgeDot icon={<PlusIcon />} ariaLabel="Notificaciones" />
      <ButtonIcon variant="Secondary" tone="Brand" size="Medium" shape="Square" badgeDot icon={<EditIcon />} ariaLabel="Mensajes" />
      <ButtonIcon variant="Primary"   tone="Brand" size="Small"  shape="Square" badgeDot icon={<PlusIcon />} ariaLabel="Notificaciones pequeño" />
    </div>
  ),
};

// ── Badge count ────────────────────────────────────────────────
export const WithBadgeCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', paddingTop: 16 }}>
      <ButtonIcon variant="Primary"   tone="Brand" size="Medium" shape="Square" badgeCount={3}  icon={<PlusIcon />} ariaLabel="Notificaciones: 3" />
      <ButtonIcon variant="Secondary" tone="Brand" size="Medium" shape="Square" badgeCount={12} icon={<EditIcon />} ariaLabel="Mensajes: 12" />
      <ButtonIcon variant="Primary"   tone="Brand" size="Small"  shape="Square" badgeCount={99} icon={<PlusIcon />} ariaLabel="Notificaciones: 99" />
      <ButtonIcon variant="Primary"   tone="Brand" size="Medium" shape="Circle" badgeCount={5}  icon={<PlusIcon />} ariaLabel="Notificaciones: 5" />
    </div>
  ),
};

// ── Individual ─────────────────────────────────────────────────
export const PrimaryBrand: Story = {
  args: { variant: 'Primary', tone: 'Brand', size: 'Medium', shape: 'Square', icon: <PlusIcon />, ariaLabel: 'Agregar' },
};

export const SecondaryBrand: Story = {
  args: { variant: 'Secondary', tone: 'Brand', size: 'Medium', shape: 'Square', icon: <EditIcon />, ariaLabel: 'Editar' },
};

export const TertiaryBrand: Story = {
  args: { variant: 'Tertiary', tone: 'Brand', size: 'Medium', shape: 'Square', icon: <TrashIcon />, ariaLabel: 'Eliminar' },
};

export const Destructive: Story = {
  args: { variant: 'Primary', tone: 'Destructive', size: 'Medium', shape: 'Square', icon: <TrashIcon />, ariaLabel: 'Eliminar póliza' },
};
