import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BannerSlider } from './BannerSlider';

const meta: Meta<typeof BannerSlider> = {
  title: 'Components/BannerSlider',
  component: BannerSlider,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BannerSlider>;

const actuariaSlides = [
  {
    id: 'slide-1',
    title: 'Protege tu patrimonio con precisión actuarial',
    description:
      'Calcula reservas técnicas y capital adecuado con modelos validados por más de 35 años de experiencia en el mercado asegurador.',
    action: { label: 'Conocer Actuaria Plus', onClick: () => alert('slide 1') },
  },
  {
    id: 'slide-2',
    title: 'Analytics financiero en tiempo real para tu cartera',
    description:
      'Dashboards de KPIs que integran datos de solvencia, cobertura y deserción. Decisiones estratégicas basadas en datos actuariales.',
    action: { label: 'Ver demo interactivo', onClick: () => alert('slide 2') },
  },
  {
    id: 'slide-3',
    title: 'Modelos predictivos de deserción y liquidez',
    description:
      'Algoritmos de Machine Learning calibrados sobre carteras reales del mercado latinoamericano de seguros y pensiones.',
    action: { label: 'Explorar modelos', onClick: () => alert('slide 3') },
  },
];

export const Default: Story = {
  args: {
    slides: actuariaSlides,
    autoPlay: true,
    interval: 5000,
  },
};

export const SingleSlide: Story = {
  args: {
    slides: [actuariaSlides[0]],
    autoPlay: false,
  },
};

export const ManualOnly: Story = {
  args: {
    slides: actuariaSlides,
    autoPlay: false,
  },
};

export const FastInterval: Story = {
  args: {
    slides: actuariaSlides,
    autoPlay: true,
    interval: 2000,
  },
};
