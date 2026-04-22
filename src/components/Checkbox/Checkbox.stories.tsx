import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ width: 360 }}>
        <Checkbox
          checked={checked}
          onChange={setChecked}
          label="Acepto los términos y condiciones de la póliza"
        />
      </div>
    );
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: 'Cobertura de invalidez total incluida',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ width: 360 }}>
        <Checkbox
          checked={checked}
          onChange={setChecked}
          indeterminate={true}
          label="Seleccionar todas las coberturas (3 de 7)"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: 'Cobertura catastrófica (no disponible en este plan)',
    disabled: true,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: 'Cobertura básica de vida (incluida en todos los planes)',
    disabled: true,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const GroupExample: Story = {
  render: () => {
    const options = [
      'Cobertura de vida',
      'Invalidez total y permanente',
      'Enfermedades graves',
      'Gastos funerarios',
    ];
    const [selected, setSelected] = useState<Set<string>>(new Set(['Cobertura de vida']));

    const toggle = (opt: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(opt) ? next.delete(opt) : next.add(opt);
        return next;
      });
    };

    return (
      <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {options.map((opt) => (
          <Checkbox
            key={opt}
            checked={selected.has(opt)}
            onChange={() => toggle(opt)}
            label={opt}
          />
        ))}
      </div>
    );
  },
};
