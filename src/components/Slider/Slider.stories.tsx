import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState(4);
    return (
      <div style={{ width: 360 }}>
        <Slider
          label="Tasa de descuento anual (%)"
          value={val}
          onChange={setVal}
          min={0}
          max={20}
          step={0.5}
          showValue
        />
      </div>
    );
  },
};

export const ProjectionHorizon: Story = {
  render: () => {
    const [val, setVal] = useState(20);
    return (
      <div style={{ width: 360 }}>
        <Slider
          label="Horizonte de proyección (años)"
          value={val}
          onChange={setVal}
          min={1}
          max={40}
          step={1}
          showValue
        />
      </div>
    );
  },
};

export const MortalityFactor: Story = {
  render: () => {
    const [val, setVal] = useState(100);
    return (
      <div style={{ width: 360 }}>
        <Slider
          label="Factor de ajuste de mortalidad (%)"
          value={val}
          onChange={setVal}
          min={80}
          max={120}
          step={1}
          showValue
        />
      </div>
    );
  },
};

export const NoLabel: Story = {
  render: () => {
    const [val, setVal] = useState(50);
    return (
      <div style={{ width: 360 }}>
        <Slider value={val} onChange={setVal} min={0} max={100} />
      </div>
    );
  },
};
