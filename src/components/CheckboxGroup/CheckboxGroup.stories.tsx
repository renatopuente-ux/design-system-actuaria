import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from '../Checkbox/Checkbox';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['Large', 'Small'] },
    valid: { control: 'boolean' },
    optional: { control: 'boolean' },
    required: { control: 'boolean' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
    legend: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

/* ─── Stateful wrapper helper ────────────────────────────────────────────── */

type Option = { id: string; label: string };

const GROUP_OPTIONS: Option[] = [
  { id: 'jubilacion', label: 'Jubilación patronal' },
  { id: 'desahucio', label: 'Bonificación por desahucio' },
  { id: 'desempleo', label: 'Desempleo involuntario' },
];

function StatefulGroup({
  size = 'Large',
  hint,
  optional,
  required,
  valid = true,
  errorMessage,
  initialSelected = new Set<string>(),
}: {
  size?: 'Large' | 'Small';
  hint?: string;
  optional?: boolean;
  required?: boolean;
  valid?: boolean;
  errorMessage?: string;
  initialSelected?: Set<string>;
}) {
  const [selected, setSelected] = useState<Set<string>>(initialSelected);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <CheckboxGroup
      legend="Coberturas del seguro"
      hint={hint}
      optional={optional}
      required={required}
      size={size}
      valid={valid}
      errorMessage={errorMessage}
      style={{ minWidth: 320 } as React.CSSProperties}
    >
      {GROUP_OPTIONS.map((opt) => (
        <Checkbox
          key={opt.id}
          checked={selected.has(opt.id)}
          onChange={() => toggle(opt.id)}
          label={opt.label}
          size={size}
        />
      ))}
    </CheckboxGroup>
  );
}

/* ─── Stories ────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => <StatefulGroup />,
};

export const WithHint: Story = {
  render: () => (
    <StatefulGroup hint="Selecciona todas las coberturas que aplican al contrato." />
  ),
};

export const Required: Story = {
  render: () => <StatefulGroup required={true} />,
};

export const Optional: Story = {
  render: () => <StatefulGroup optional={true} />,
};

export const Invalid: Story = {
  render: () => (
    <StatefulGroup
      valid={false}
      errorMessage="Debes seleccionar al menos una opción"
    />
  ),
};

export const SmallGroup: Story = {
  render: () => <StatefulGroup size="Small" />,
};

export const Playground: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const toggle = (id: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    };
    return (
      <CheckboxGroup {...args}>
        {GROUP_OPTIONS.map((opt) => (
          <Checkbox
            key={opt.id}
            checked={selected.has(opt.id)}
            onChange={() => toggle(opt.id)}
            label={opt.label}
            size={args.size}
          />
        ))}
      </CheckboxGroup>
    );
  },
  args: {
    legend: 'Coberturas del seguro',
    size: 'Large',
    valid: true,
    optional: false,
    required: false,
    hint: '',
    errorMessage: '',
  },
};
