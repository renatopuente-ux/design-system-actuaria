import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tabs>;

const financialTabs = [
  {
    id: 'reservas',
    label: 'Reservas Matemáticas',
    content: (
      <div>
        <p>
          Valuación actuarial de reservas técnicas al cierre del ejercicio 2024. El monto total de
          reservas matemáticas asciende a <strong>$4,821,350,000 MXN</strong>, un incremento del
          6.3% respecto al ejercicio anterior.
        </p>
      </div>
    ),
  },
  {
    id: 'solvencia',
    label: 'Índice de Solvencia',
    content: (
      <div>
        <p>
          El índice de cobertura de capital de solvencia (SCR) se sitúa en <strong>189%</strong>,
          superando el mínimo regulatorio del 100%. La holgura de capital disponible es de
          $1,203,000,000 MXN.
        </p>
      </div>
    ),
  },
  {
    id: 'primas',
    label: 'Prima Neta Devengada',
    content: (
      <div>
        <p>
          La prima neta devengada acumulada al tercer trimestre asciende a{' '}
          <strong>$987,240,000 MXN</strong>. La tasa de crecimiento anual compuesta (CAGR) de los
          últimos 5 años es del 8.4%.
        </p>
      </div>
    ),
  },
  {
    id: 'siniestros',
    label: 'Siniestralidad',
    content: (
      <div>
        <p>
          El índice de siniestralidad combinado es de <strong>94.7%</strong>, reflejando una
          siniestralidad neta del 68.2% más gastos de adquisición del 26.5%.
        </p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs: financialTabs,
    defaultTab: 'reservas',
  },
};

export const SecondTabActive: Story = {
  args: {
    tabs: financialTabs,
    defaultTab: 'solvencia',
  },
};

export const TwoTabs: Story = {
  args: {
    tabs: financialTabs.slice(0, 2),
    defaultTab: 'reservas',
  },
};

export const WithChangeHandler: Story = {
  args: {
    tabs: financialTabs,
    defaultTab: 'primas',
    onChange: (id: string) => console.info('[Tabs] onChange:', id),
  },
};
