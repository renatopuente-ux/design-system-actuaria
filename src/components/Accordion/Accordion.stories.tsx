import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Accordion>;

const actuarialItems = [
  {
    id: 'reservas',
    title: 'Reservas Matemáticas',
    content: (
      <p>
        Las reservas matemáticas representan el valor presente actuarial de las obligaciones futuras
        contraídas por la aseguradora. Se calculan como la diferencia entre el valor presente de
        beneficios futuros y el valor presente de primas futuras esperadas.
      </p>
    ),
  },
  {
    id: 'solvencia',
    title: 'Índice de Solvencia',
    content: (
      <p>
        El índice de solvencia II (Solvency II) mide la relación entre los fondos propios admisibles
        y el capital de solvencia obligatorio (SCR). Un índice superior al 100% indica que la
        entidad dispone de recursos suficientes para cubrir sus compromisos.
      </p>
    ),
  },
  {
    id: 'capital',
    title: 'Capital Adecuado',
    content: (
      <p>
        El capital adecuado es el nivel mínimo de recursos financieros que una institución debe
        mantener para absorber pérdidas inesperadas. Incluye el capital regulatorio, el capital
        económico y el margen de solvencia dinámico.
      </p>
    ),
  },
  {
    id: 'mortalidad',
    title: 'Tablas de Mortalidad',
    content: (
      <p>
        Las tablas de mortalidad (o tablas de vida) son herramientas estadísticas que describen la
        probabilidad de fallecimiento de un individuo en función de su edad. ACTUARIA utiliza las
        tablas EMSSA 2009 y CNSF 2000-I/II para valuaciones de seguros de vida.
      </p>
    ),
  },
];

export const Default: Story = {
  args: {
    items: actuarialItems,
    allowMultiple: false,
    defaultOpen: ['reservas'],
  },
};

export const AllowMultiple: Story = {
  args: {
    items: actuarialItems,
    allowMultiple: true,
    defaultOpen: ['reservas', 'capital'],
  },
};

export const AllClosed: Story = {
  args: {
    items: actuarialItems,
    allowMultiple: false,
    defaultOpen: [],
  },
};

export const SingleItem: Story = {
  args: {
    items: [actuarialItems[0]],
    allowMultiple: false,
    defaultOpen: [],
  },
};
