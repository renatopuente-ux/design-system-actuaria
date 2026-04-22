import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'Nombre del asegurado',
    placeholder: 'Ej. Juan Pérez Ramírez',
    hint: 'Ingresa el nombre completo tal como aparece en la póliza.',
    value: '',
    onChange: () => {},
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState('María González López');
    return (
      <div style={{ width: 360 }}>
        <TextInput
          label="Nombre del asegurado"
          value={val}
          onChange={setVal}
          placeholder="Ej. Juan Pérez Ramírez"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Tasa de descuento anual',
    value: '105',
    onChange: () => {},
    error: 'La tasa debe estar entre 0% y 100%.',
    hint: 'Ingresa la tasa en porcentaje (ej. 4.5).',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Disabled: Story = {
  args: {
    label: 'RFC del contratante',
    value: 'PEGJ800101ABC',
    onChange: () => {},
    disabled: true,
    hint: 'Este campo es de solo lectura.',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Required: Story = {
  args: {
    label: 'Suma asegurada (MXN)',
    value: '',
    onChange: () => {},
    placeholder: '0.00',
    required: true,
    hint: 'Monto máximo cubierto por la póliza.',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
