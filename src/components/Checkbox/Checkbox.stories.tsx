import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['Large', 'Small'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    valid: { control: 'boolean' },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

/* ─── Large variants ─────────────────────────────────────────────────── */

export const LargeUnselected: Story = {
  args: {
    checked: false,
    onChange: () => {},
    size: 'Large',
    label: 'Jubilación patronal',
  },
};

export const LargeSelected: Story = {
  args: {
    checked: true,
    onChange: () => {},
    size: 'Large',
    label: 'Jubilación patronal',
  },
};

export const LargeIndeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        indeterminate={true}
        size="Large"
        label="Seleccionar todas las coberturas (3 de 7)"
      />
    );
  },
};

/* ─── Small variants ─────────────────────────────────────────────────── */

export const SmallUnselected: Story = {
  args: {
    checked: false,
    onChange: () => {},
    size: 'Small',
    label: 'Bonificación por desahucio',
  },
};

export const SmallSelected: Story = {
  args: {
    checked: true,
    onChange: () => {},
    size: 'Small',
    label: 'Bonificación por desahucio',
  },
};

export const SmallIndeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        indeterminate={true}
        size="Small"
        label="Seleccionar coberturas parciales (2 de 5)"
      />
    );
  },
};

/* ─── Disabled ───────────────────────────────────────────────────────── */

export const LargeDisabled: Story = {
  args: {
    checked: false,
    onChange: () => {},
    size: 'Large',
    label: 'Desempleo involuntario (no disponible en este plan)',
    disabled: true,
  },
};

export const SmallDisabled: Story = {
  args: {
    checked: false,
    onChange: () => {},
    size: 'Small',
    label: 'Cobertura catastrófica (no disponible en este plan)',
    disabled: true,
  },
};

/* ─── Invalid ────────────────────────────────────────────────────────── */

export const LargeInvalid: Story = {
  args: {
    checked: false,
    onChange: () => {},
    size: 'Large',
    label: 'Acepto los términos y condiciones',
    valid: false,
  },
};

export const SmallInvalid: Story = {
  args: {
    checked: false,
    onChange: () => {},
    size: 'Small',
    label: 'Acepto los términos y condiciones',
    valid: false,
  },
};

/* ─── With label ─────────────────────────────────────────────────────── */

export const WithLabelLarge: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        size="Large"
        label="Jubilación patronal"
      />
    );
  },
};

export const WithLabelSmall: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        size="Small"
        label="Jubilación patronal"
      />
    );
  },
};

/* ─── Playground ─────────────────────────────────────────────────────── */

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  args: {
    size: 'Large',
    checked: false,
    label: 'Jubilación patronal',
    disabled: false,
    indeterminate: false,
    valid: true,
  },
};
