import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Actualización disponible',
    message: 'Hay una nueva versión del modelo de reservas técnicas. Actualiza para obtener mejores proyecciones.',
    dismissible: true,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Cálculo completado exitosamente',
    message: 'Las reservas de vida grupo han sido calculadas. Descarga el reporte en PDF.',
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Parámetros fuera de rango',
    message: 'La tasa de descuento ingresada (12%) supera el límite regulatorio recomendado (8%). Verifica antes de guardar.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error al calcular reservas',
    message: 'No fue posible procesar la tabla de mortalidad CNSF 2000-I. Verifica el archivo de entrada e intenta nuevamente.',
    dismissible: true,
  },
};

export const SinTitulo: Story = {
  args: {
    variant: 'info',
    message: 'Los datos de siniestralidad se actualizan automáticamente cada 24 horas.',
  },
};
