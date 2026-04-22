import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlertGlobal } from './AlertGlobal';

const meta: Meta<typeof AlertGlobal> = {
  title: 'Components/AlertGlobal',
  component: AlertGlobal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AlertGlobal>;

export const Info: Story = {
  args: {
    variant: 'info',
    message: 'Mantenimiento programado el 25 de abril de 2026 de 02:00 a 04:00 hrs. Los cálculos estarán suspendidos.',
    action: { label: 'Ver detalles', onClick: () => {} },
    onDismiss: () => {},
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    message: 'Importación masiva completada: 1,240 pólizas procesadas exitosamente.',
    onDismiss: () => {},
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    message: 'Tu sesión expirará en 5 minutos. Guarda los cambios para evitar pérdida de datos.',
    action: { label: 'Extender sesión', onClick: () => {} },
    onDismiss: () => {},
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    message: 'Fallo en la sincronización con el servidor de cálculo. Los resultados pueden no estar actualizados.',
    action: { label: 'Reintentar', onClick: () => {} },
    onDismiss: () => {},
  },
};
