import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Select>;

const tablaMortalidadOptions = [
  { value: 'cnsf-2000-i', label: 'CNSF 2000-I (Vida individual)' },
  { value: 'cnsf-2000-g', label: 'CNSF 2000-G (Grupo)' },
  { value: 'cnsf-2000-r', label: 'CNSF 2000-R (Rentas)' },
  { value: 'cnsf-2015', label: 'CNSF 2015 (Actualizada)' },
  { value: 'soa-2014', label: 'SOA RP-2014 (Internacional)' },
];

const productoOptions = [
  { value: 'vida-individual', label: 'Vida individual' },
  { value: 'vida-grupo', label: 'Vida grupo' },
  { value: 'pension-retiro', label: 'Pensión y retiro' },
  { value: 'accidentes', label: 'Accidentes personales' },
  { value: 'gmm', label: 'Gastos médicos mayores' },
];

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 360 }}>
        <Select
          label="Tabla de mortalidad"
          value={val}
          onChange={setVal}
          options={tablaMortalidadOptions}
          placeholder="Selecciona una tabla"
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [val, setVal] = useState('cnsf-2000-i');
    return (
      <div style={{ width: 360 }}>
        <Select
          label="Tabla de mortalidad"
          value={val}
          onChange={setVal}
          options={tablaMortalidadOptions}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 360 }}>
        <Select
          label="Tipo de producto"
          value={val}
          onChange={setVal}
          options={productoOptions}
          placeholder="Selecciona un producto"
          error="Debes seleccionar un tipo de producto para continuar."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Régimen regulatorio',
    value: 'lisf-2015',
    onChange: () => {},
    options: [{ value: 'lisf-2015', label: 'LISF 2015 (vigente)' }],
    disabled: true,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
