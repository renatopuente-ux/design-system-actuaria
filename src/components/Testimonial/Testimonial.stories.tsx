import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Testimonial } from './Testimonial';

const meta: Meta<typeof Testimonial> = {
  title: 'Components/Testimonial',
  component: Testimonial,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Testimonial>;

export const Default: Story = {
  args: {
    quote:
      'Actuaria transformó la forma en que gestionamos nuestras reservas técnicas. La precisión matemática del sistema nos permitió reducir el margen de error en un 40% en el primer trimestre.',
    author: 'Alejandra Mondragón',
    role: 'CFO',
    company: 'Grupo Asegurador del Norte',
    rating: 5,
  },
};

export const WithAvatar: Story = {
  args: {
    quote:
      'La plataforma Actuaria Plus nos da visibilidad en tiempo real de nuestros KPIs de solvencia. Para una empresa con 200,000 pólizas activas, eso es una ventaja competitiva enorme.',
    author: 'Roberto Fuentes',
    role: 'Director Actuarial',
    company: 'Pensiones del Pacífico',
    avatar: 'https://i.pravatar.cc/88?img=12',
    rating: 5,
  },
};

export const FourStars: Story = {
  args: {
    quote:
      'Los modelos predictivos de deserción nos ayudaron a identificar 1,200 clientes en riesgo antes de que cancelen. La rentabilidad de la cartera mejoró significativamente.',
    author: 'Claudia Herrera',
    role: 'Gerente de Análisis de Riesgos',
    company: 'Seguros Metropolitanos',
    rating: 4,
  },
};

export const NoRating: Story = {
  args: {
    quote:
      'Llevamos 8 años trabajando con Actuaria Consultores y su equipo sigue sorprendiéndonos con la profundidad de sus modelos matemáticos. Una firma de referencia en el mercado.',
    author: 'Miguel Ángel Torres',
    role: 'CEO',
    company: 'Finanzas y Riesgos SA',
  },
};

export const MinimalTestimonial: Story = {
  args: {
    quote: 'Actuaria es el estándar de la industria actuarial en México.',
    author: 'Laura Vásquez',
  },
};
