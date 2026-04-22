import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Slot } from './Slot';

const meta: Meta<typeof Slot> = {
  title: 'Components/Slot',
  component: Slot,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Slot>;

export const Empty: Story = {
  args: {},
  decorators: [(Story) => <div style={{ width: 300, height: 120 }}><Story /></div>],
};

export const WithFallback: Story = {
  args: {
    fallback: (
      <div
        style={{
          padding: 16,
          background: 'rgba(76,100,217,0.08)',
          borderRadius: 12,
          width: '100%',
          textAlign: 'center',
          fontFamily: 'Nunito, sans-serif',
          color: '#4c64d9',
        }}
      >
        Contenido de respaldo
      </div>
    ),
  },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export const WithChildren: Story = {
  args: {
    children: (
      <div
        style={{
          padding: 24,
          background: '#f0f2ff',
          borderRadius: 12,
          width: '100%',
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        Contenido real del componente
      </div>
    ),
  },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};
