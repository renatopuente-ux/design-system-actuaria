import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tracking } from './Tracking';

const meta: Meta<typeof Tracking> = {
  title: 'Components/Tracking',
  component: Tracking,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tracking>;

const POLICY_STEPS = [
  {
    id: 'received',
    label: 'Solicitud recibida',
    date: '15 Abr 2026',
    description: 'Tu solicitud de cobertura fue recibida correctamente.',
    status: 'completed' as const,
  },
  {
    id: 'review',
    label: 'Revisión actuarial',
    date: '17 Abr 2026',
    description: 'Un actuario está evaluando tu perfil de riesgo.',
    status: 'completed' as const,
  },
  {
    id: 'approval',
    label: 'Aprobación de póliza',
    date: '22 Abr 2026',
    description: 'Pendiente de firma del comité técnico.',
    status: 'current' as const,
  },
  {
    id: 'issuance',
    label: 'Emisión de póliza',
    date: 'Estimado: 25 Abr 2026',
    status: 'pending' as const,
  },
  {
    id: 'delivery',
    label: 'Entrega al cliente',
    status: 'pending' as const,
  },
];

export const Default: Story = {
  args: { steps: POLICY_STEPS },
  decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
};

export const AllCompleted: Story = {
  args: {
    steps: POLICY_STEPS.map((s) => ({ ...s, status: 'completed' as const })),
  },
  decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
};

export const SingleStep: Story = {
  args: {
    steps: [
      {
        id: 'only',
        label: 'En proceso',
        description: 'Este es el único paso del flujo.',
        status: 'current' as const,
      },
    ],
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
