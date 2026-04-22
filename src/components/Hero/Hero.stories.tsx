import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: { type: 'radio' },
      options: ['left', 'center'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    badge: 'Plataforma actuarial',
    title: 'Protege tu patrimonio con precisión actuarial',
    subtitle: 'Soluciones de riesgo',
    description:
      'Más de 35 años mitigando riesgos financieros para 6,000+ clientes. Calcula reservas técnicas, proyecta flujos y toma decisiones con la exactitud que merece tu empresa.',
    primaryAction: { label: 'Comenzar ahora', onClick: () => alert('primary') },
    secondaryAction: { label: 'Ver demo', onClick: () => alert('secondary') },
    align: 'center',
  },
};

export const LeftAligned: Story = {
  args: {
    badge: 'Nuevo producto',
    title: 'Gestión de reservas en tiempo real',
    description:
      'Calcula el capital adecuado y las reservas técnicas con modelos matemáticos validados. Actuaria Plus integra los datos de tu cartera al instante.',
    primaryAction: { label: 'Solicitar acceso', onClick: () => {} },
    secondaryAction: { label: 'Conocer más', onClick: () => {} },
    align: 'left',
  },
};

export const NoBadge: Story = {
  args: {
    title: 'Analytics financiero para el mercado asegurador',
    description:
      'Dashboards personalizados que convierten datos actuariales complejos en decisiones estratégicas claras.',
    primaryAction: { label: 'Ver planes', onClick: () => {} },
    align: 'center',
  },
};

export const MinimalHero: Story = {
  args: {
    title: 'Modelos predictivos de deserción y liquidez',
    align: 'center',
  },
};
