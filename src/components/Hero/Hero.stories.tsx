import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Hero } from './Hero';
import type { HeroProps } from './Hero';

// ─── Shared placeholders ──────────────────────────────────────────────────────

const HeroImage = ({ height = 560 }: { height?: number }) => (
  <div
    style={{
      width: '100%',
      height,
      background: 'linear-gradient(135deg, #d8daeb 0%, #9b4f8e 100%)',
    }}
  />
);

const SocialProof = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ display: 'flex' }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#d4d6e2',
            border: '2px solid white',
            marginLeft: i > 1 ? -12 : 0,
          }}
        />
      ))}
    </div>
    <span style={{ fontSize: 14, color: 'rgba(0,9,51,0.65)' }}>
      +500 empresas confían en Actuaria
    </span>
  </div>
);

const EmailCapture = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <input
      type="email"
      placeholder="tu@empresa.com"
      style={{
        flex: 1,
        minWidth: 200,
        height: 48,
        padding: '0 16px',
        borderRadius: 8,
        border: '1.5px solid rgba(21,31,71,0.2)',
        fontSize: 16,
        fontFamily: 'inherit',
        outline: 'none',
        boxSizing: 'border-box',
      }}
    />
    <button
      type="button"
      style={{
        height: 48,
        padding: '0 24px',
        borderRadius: 8,
        background: '#151f47',
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Solicitar acceso
    </button>
  </div>
);

// ─── Shared content ───────────────────────────────────────────────────────────

const TITLE = 'Gestión actuarial inteligente para tu empresa';
const DESCRIPTION =
  'Calcula provisiones, gestiona riesgos y cumple normativas con la plataforma actuarial líder en Ecuador.';

const primaryAction = { label: 'Comenzar ahora', onClick: () => undefined };
const secondaryAction = { label: 'Ver demo', onClick: () => undefined };

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'horizontal',
        'horizontal-padded',
        'vertical',
        'vertical-large',
        'vertical-small',
      ],
    },
    uppercase: { control: 'boolean' },
    tag: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<HeroProps>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const HorizontalDesktop: Story = {
  args: {
    type: 'horizontal',
    image: <HeroImage height={712} />,
    title: TITLE,
    description: DESCRIPTION,
    primaryAction,
    secondaryAction,
    socialProof: <SocialProof />,
  },
};

export const HorizontalPadded: Story = {
  args: {
    type: 'horizontal-padded',
    image: <HeroImage height={560} />,
    title: TITLE,
    description: DESCRIPTION,
    primaryAction,
    secondaryAction,
    socialProof: <SocialProof />,
  },
};

export const VerticalDefault: Story = {
  args: {
    type: 'vertical',
    image: <HeroImage height={560} />,
    title: TITLE,
    description: DESCRIPTION,
    primaryAction,
    secondaryAction,
  },
};

export const VerticalLarge: Story = {
  args: {
    type: 'vertical-large',
    image: <HeroImage height={560} />,
    title: TITLE,
    description: DESCRIPTION,
    primaryAction,
    secondaryAction,
  },
};

export const VerticalSmall: Story = {
  args: {
    type: 'vertical-small',
    image: <HeroImage height={530} />,
    title: TITLE,
    description: DESCRIPTION,
    primaryAction,
    secondaryAction,
  },
};

export const WithTag: Story = {
  args: {
    type: 'horizontal',
    image: <HeroImage />,
    tag: 'Nuevo módulo',
    uppercase: false,
    title: TITLE,
    description: DESCRIPTION,
    primaryAction,
    secondaryAction,
  },
};

export const WithUppercaseTag: Story = {
  args: {
    type: 'horizontal',
    image: <HeroImage />,
    tag: 'Actuaria Plus',
    uppercase: true,
    title: TITLE,
    description: DESCRIPTION,
    primaryAction,
    secondaryAction,
  },
};

export const WithEmailCapture: Story = {
  args: {
    type: 'horizontal',
    image: <HeroImage />,
    title: TITLE,
    description: DESCRIPTION,
    emailCapture: <EmailCapture />,
    socialProof: <SocialProof />,
  },
};

export const Playground: Story = {
  args: {
    type: 'horizontal',
    image: <HeroImage />,
    tag: 'Actuaria Plus',
    uppercase: false,
    title: TITLE,
    description: DESCRIPTION,
    primaryAction,
    secondaryAction,
    socialProof: <SocialProof />,
  },
};
