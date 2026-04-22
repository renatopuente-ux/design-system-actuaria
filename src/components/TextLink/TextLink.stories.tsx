import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TextLink } from './TextLink';

const meta: Meta<typeof TextLink> = {
  title: 'Components/TextLink',
  component: TextLink,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof TextLink>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Ver documentación técnica',
    size: 'md',
    external: false,
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://actuaria.com',
    children: 'Visitar actuaria.com',
    external: true,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    href: '#',
    children: 'Leer caso de éxito',
    size: 'sm',
    external: false,
  },
};

export const SmallExternal: Story = {
  args: {
    href: 'https://actuaria.com/blog',
    children: 'Blog actuarial',
    size: 'sm',
    external: true,
  },
};

export const ButtonMode: Story = {
  name: 'Sin href (button)',
  args: {
    children: 'Calcular reservas',
    onClick: () => alert('Navegando al calculador'),
    size: 'md',
  },
};

export const InlineUsage: Story = {
  name: 'Uso inline en párrafo',
  render: () => (
    <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '16px', lineHeight: '24px', color: 'rgba(0,6,38,0.9)', maxWidth: '480px' }}>
      Actuaria Consultores cuenta con más de 35 años de experiencia.{' '}
      <TextLink href="#" size="md">Conoce nuestra historia</TextLink>{' '}
      y descubre cómo hemos ayudado a más de 6,000 clientes a gestionar sus riesgos financieros con precisión actuarial.
    </p>
  ),
};
