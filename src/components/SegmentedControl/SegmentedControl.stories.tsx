import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const OPTIONS = [
  { value: 'monthly', label: 'Mensual' },
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'annual', label: 'Anual' },
];

const Controlled = ({ size }: { size?: 'sm' | 'md' }) => {
  const [value, setValue] = useState('monthly');
  return (
    <SegmentedControl
      options={OPTIONS}
      value={value}
      onChange={setValue}
      size={size}
      aria-label="Periodo de reporte"
    />
  );
};

export const Default: Story = {
  render: () => <Controlled />,
};

export const Small: Story = {
  render: () => <Controlled size="sm" />,
};

export const TwoOptions: Story = {
  render: () => {
    const [value, setValue] = useState('risk');
    return (
      <SegmentedControl
        options={[
          { value: 'risk', label: 'Riesgo' },
          { value: 'return', label: 'Retorno' },
        ]}
        value={value}
        onChange={setValue}
        aria-label="Vista"
      />
    );
  },
};
