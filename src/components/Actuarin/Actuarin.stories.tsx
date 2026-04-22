import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Actuarin } from './Actuarin';

const meta: Meta<typeof Actuarin> = {
  title: 'Components/Actuarin',
  component: Actuarin,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    expression: { control: 'select', options: ['happy', 'thinking', 'celebrating'] },
    message: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Actuarin>;

export const Happy: Story = {
  args: { size: 'md', expression: 'happy' },
};

export const Thinking: Story = {
  args: { size: 'md', expression: 'thinking', message: 'Calculando tu reserva técnica...' },
};

export const Celebrating: Story = {
  args: { size: 'md', expression: 'celebrating', message: '¡Tu póliza fue aprobada!' },
};

export const AllExpressions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end' }}>
      <Actuarin size="md" expression="happy" message="Hola, soy Actuarín" />
      <Actuarin size="md" expression="thinking" message="Analizando riesgo..." />
      <Actuarin size="md" expression="celebrating" message="¡Excelente resultado!" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <Actuarin size="sm" expression="happy" />
      <Actuarin size="md" expression="happy" />
      <Actuarin size="lg" expression="happy" />
    </div>
  ),
};
