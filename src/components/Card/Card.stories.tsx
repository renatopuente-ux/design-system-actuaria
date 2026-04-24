import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from './Card';
import { AvatarLabelled } from '../AvatarLabelled/AvatarLabelled';
import { Tag } from '../Tag/Tag';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['Vertical', 'Horizontal'] },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

// ── Shared content ─────────────────────────────────────────────
const DiamondIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M12 3L21 12L12 21L3 12L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
    <path d="M4 10h12M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SampleImage = () => (
  <img
    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop"
    alt="Playa con dunas"
  />
);

const TextLink = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
    <span style={{
      fontFamily: 'Nunito, sans-serif', fontSize: 16, fontWeight: 600,
      lineHeight: '24px', color: 'rgba(0,6,38,0.9)',
    }}>
      Ver más
    </span>
    <ArrowIcon />
  </div>
);

const AvatarSection = () => (
  <AvatarLabelled
    name="Cristopher Palacios"
    email="cristopher.palacios@actuaria.com"
  />
);

const TagSection = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 4px' }}>
    <Tag label="Reservas" />
    <Tag label="Capital" />
    <Tag label="Solvencia" />
  </div>
);

// ── Vertical — Default ─────────────────────────────────────────
export const VerticalDefault: Story = {
  args: {
    type: 'Vertical',
    image: <SampleImage />,
    icon: <DiamondIcon />,
    heading: 'Cálculo de Reservas',
    body: 'Determina las reservas técnicas de tu cartera conforme a los lineamientos de la CNSF 2024.',
    footer: (
      <>
        <TextLink />
        <AvatarSection />
        <TagSection />
      </>
    ),
  },
};

// ── Vertical — Sin imagen ──────────────────────────────────────
export const VerticalNoImage: Story = {
  args: {
    type: 'Vertical',
    icon: <DiamondIcon />,
    label: 'Actuaria Plus',
    heading: 'Cálculo de Reservas',
    body: 'Determina las reservas técnicas de tu cartera conforme a los lineamientos de la CNSF 2024.',
    footer: <TextLink />,
  },
};

// ── Vertical — Con label ───────────────────────────────────────
export const VerticalWithLabel: Story = {
  args: {
    type: 'Vertical',
    image: <SampleImage />,
    icon: <DiamondIcon />,
    label: 'Módulo',
    heading: 'Análisis de Solvencia',
    body: 'Evalúa la solidez financiera bajo distintos escenarios de estrés regulatorio.',
    footer: (
      <>
        <TextLink />
        <TagSection />
      </>
    ),
  },
};

// ── Vertical — Clickable ───────────────────────────────────────
export const VerticalClickable: Story = {
  args: {
    type: 'Vertical',
    image: <SampleImage />,
    icon: <DiamondIcon />,
    heading: 'Modelo de Deserción',
    body: 'Predice la probabilidad de abandono de clientes mediante técnicas de machine learning.',
    footer: <TagSection />,
    onClick: () => alert('Card clicked'),
    'aria-label': 'Ver modelo de deserción',
  },
};

// ── Vertical — Minimal ─────────────────────────────────────────
export const VerticalMinimal: Story = {
  args: {
    type: 'Vertical',
    heading: 'Reservas de Vida',
    body: 'Cálculo automatizado conforme a tablas de mortalidad vigentes.',
  },
};

// ── Horizontal — Default ───────────────────────────────────────
export const HorizontalDefault: Story = {
  args: {
    type: 'Horizontal',
    image: <SampleImage />,
    icon: <DiamondIcon />,
    heading: 'Cálculo de Reservas',
    body: 'Determina las reservas técnicas de tu cartera conforme a los lineamientos de la CNSF 2024.',
    footer: (
      <>
        <TextLink />
        <AvatarSection />
        <TagSection />
      </>
    ),
  },
};

// ── Horizontal — Sin imagen ────────────────────────────────────
export const HorizontalNoImage: Story = {
  args: {
    type: 'Horizontal',
    icon: <DiamondIcon />,
    label: 'Actuaria Plus',
    heading: 'Análisis de Solvencia',
    body: 'Evalúa la solidez financiera bajo distintos escenarios de estrés regulatorio.',
    footer: <TextLink />,
  },
};

// ── Horizontal — Clickable ─────────────────────────────────────
export const HorizontalClickable: Story = {
  args: {
    type: 'Horizontal',
    image: <SampleImage />,
    icon: <DiamondIcon />,
    heading: 'Data Wave Dashboard',
    body: 'Visualiza tus KPIs actuariales en tiempo real con dashboards personalizados.',
    footer: <TagSection />,
    onClick: () => alert('Card clicked'),
    'aria-label': 'Ver Data Wave Dashboard',
  },
};

// ── Ambos tipos side by side ───────────────────────────────────
export const BothTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      <Card
        type="Vertical"
        image={<SampleImage />}
        icon={<DiamondIcon />}
        heading="Reservas Técnicas"
        body="Cálculo conforme a CNSF 2024."
        footer={<TextLink />}
      />
      <Card
        type="Horizontal"
        image={<SampleImage />}
        icon={<DiamondIcon />}
        heading="Reservas Técnicas"
        body="Cálculo conforme a CNSF 2024."
        footer={<TextLink />}
      />
    </div>
  ),
};
