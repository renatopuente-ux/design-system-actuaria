import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Stepper>;

const onboardingSteps = [
  {
    id: 'datos',
    label: 'Datos del Asegurado',
    description: 'Información personal y cobertura',
  },
  {
    id: 'valuacion',
    label: 'Valuación Actuarial',
    description: 'Cálculo de reservas y primas',
  },
  {
    id: 'solvencia',
    label: 'Análisis de Solvencia',
    description: 'Verificación de capital adecuado',
  },
  {
    id: 'emision',
    label: 'Emisión de Póliza',
    description: 'Generación del contrato final',
  },
];

const simpleSteps = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'calculo', label: 'Cálculo' },
  { id: 'revision', label: 'Revisión' },
  { id: 'cierre', label: 'Cierre' },
];

export const HorizontalFirstStep: Story = {
  args: {
    steps: onboardingSteps,
    currentStep: 0,
    orientation: 'horizontal',
  },
};

export const HorizontalMidStep: Story = {
  args: {
    steps: onboardingSteps,
    currentStep: 2,
    orientation: 'horizontal',
  },
};

export const HorizontalComplete: Story = {
  args: {
    steps: onboardingSteps,
    currentStep: 4, // beyond last = all completed
    orientation: 'horizontal',
  },
};

export const VerticalFirstStep: Story = {
  args: {
    steps: onboardingSteps,
    currentStep: 0,
    orientation: 'vertical',
  },
};

export const VerticalMidStep: Story = {
  args: {
    steps: onboardingSteps,
    currentStep: 2,
    orientation: 'vertical',
  },
};

export const SimpleHorizontal: Story = {
  args: {
    steps: simpleSteps,
    currentStep: 1,
    orientation: 'horizontal',
  },
};

export const SimpleVertical: Story = {
  args: {
    steps: simpleSteps,
    currentStep: 3,
    orientation: 'vertical',
  },
};
